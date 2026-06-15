import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-form";
import { toast } from "sonner";

import {
  rememberMeValidator,
  passwordValidator,
  signInValidator,
  emailValidator,
} from "@/features/auth/validators";
import {
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  Card,
} from "@/components/ui/card";
import { Route as DashboardRoute } from "@/routes/_authenticated/dashboard";
import { MIN_PASSWORD_LENGTH } from "@/features/auth/utils/constants";
import { redirectSearchParamValidator } from "@/lib/validators";
import { useAppForm } from "@/components/form/hook";
import { authClient } from "@/features/auth/client";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/(auth)/sign-in/")({
  validateSearch: redirectSearchParamValidator,
  component: SignInPage,
});

function SignInPage() {
  const { redirect } = Route.useSearch();

  const signInForm = useAppForm({
    formId: "sign-in-form",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    validators: {
      onSubmit: signInValidator,
    },
    onSubmit: async ({ value, formApi }) => {
      // The signInValidator transforms email.
      // However, TanStack Form doesn't use the output of validators for the value.
      // So, we need to parse it again here to get the transformed email.
      const parsedValue = signInValidator.parse(value);

      const { error } = await authClient.signIn.email({
        ...parsedValue,
        // Unlike the signUp method, this callback url actually applies to both email verification and this method's success.
        // Which means it will automatically redirects the user without us calling `router.navigate` manually.
        callbackURL: redirect ? redirect : DashboardRoute.to,
      });

      if (error) {
        const fallbackErrorMessage =
          "Failed to sign in. Please try again later or contact support.";
        if (error.code) {
          switch (error.code) {
            case "INVALID_EMAIL_OR_PASSWORD": {
              toast.error("Invalid email or password");
              return;
            }
            case "INVALID_EMAIL": {
              formApi.setFieldMeta("email", (prev) => ({
                ...prev,
                errorMap: {
                  onServer: [{ message: error.message }],
                },
              }));
              return;
            }
          }
        }

        toast.error(fallbackErrorMessage);
        return;
      }

      toast.success("Welcome back!");
    },
  });

  const isSubmitting = useStore(
    signInForm.store,
    (state) => state.isSubmitting
  );

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Card className="w-full sm:max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign in</CardTitle>
          <CardDescription>
            Enter your credentials below to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Sign in form UI */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void signInForm.handleSubmit();
            }}
            id={signInForm.formId}
          >
            <FieldGroup>
              {/* Email input field */}
              <signInForm.AppField
                validators={{
                  onChange: emailValidator,
                }}
                name="email"
              >
                {(appField) => (
                  <appField.TextField
                    placeholder="youremail@example.com"
                    disabled={isSubmitting}
                    label="Email"
                    type="email"
                  />
                )}
              </signInForm.AppField>
              {/* Password input field */}
              <signInForm.AppField
                validators={{
                  onChange: passwordValidator,
                }}
                name="password"
              >
                {(appField) => (
                  <appField.TextField
                    placeholder={"*".repeat(MIN_PASSWORD_LENGTH)}
                    disabled={isSubmitting}
                    label="Password"
                    type="password"
                  />
                )}
              </signInForm.AppField>
              {/* Remember me checkbox */}
              <signInForm.AppField
                validators={{
                  onChange: rememberMeValidator,
                }}
                name="rememberMe"
              >
                {(appField) => (
                  <appField.CheckField
                    disabled={isSubmitting}
                    className="rounded-sm"
                    label="Remember me"
                  />
                )}
              </signInForm.AppField>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-y-2">
          <signInForm.AppForm>
            {/* Submit button */}
            <signInForm.SubmitButton
              submittingText="Signing in..."
              submitText="Sign in"
              className="w-full"
            />
          </signInForm.AppForm>
          <div className="w-full text-center text-muted-foreground">
            <span>Don&apos;t have an account?</span>{" "}
            <Link
              className={cn(
                isSubmitting
                  ? ""
                  : "underline underline-offset-2 hover:text-primary"
              )}
              search={{
                redirect,
              }}
              disabled={isSubmitting}
              to="/sign-up"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
