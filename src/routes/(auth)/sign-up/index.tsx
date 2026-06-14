import { createFileRoute, Link } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-form";
import { toast } from "sonner";

import {
  confirmPasswordValidator,
  passwordValidator,
  signUpValidator,
  emailValidator,
} from "@/features/auth/validators";
import {
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import {
  PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE,
  MIN_PASSWORD_LENGTH,
} from "@/features/auth/constants";
import { Route as DashboardRoute } from "@/routes/_authenticated/dashboard";
import { redirectSearchParamValidator } from "@/lib/validators";
import { useAppForm } from "@/components/form/hook";
import { authClient } from "@/features/auth/client";
import { FieldGroup } from "@/components/ui/field";

export const Route = createFileRoute("/(auth)/sign-up/")({
  validateSearch: redirectSearchParamValidator,
  component: SignUpPage,
});

function SignUpPage() {
  const { redirect } = Route.useSearch();

  const signUpForm = useAppForm({
    formId: "sign-up-form",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: signUpValidator,
    },
    onSubmit: async ({ value, formApi }) => {
      // The signUpValidator transforms name and email.
      // However, TanStack Form doesn't use the output of validators for the value.
      // So, we need to parse it again here to get the transformed name and email.
      const { name, email, password } = signUpValidator.parse(value);

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: redirect ? redirect : DashboardRoute.to,
      });

      if (error) {
        const fallbackErrorMessage =
          "Failed to sign up. Please try again later or contact support.";
        if (error.code) {
          switch (error.code) {
            case "INVALID_EMAIL_OR_PASSWORD": {
              toast.error(error.message ?? "Invalid email or password");
              break;
            }
            case "FAILED_TO_CREATE_SESSION": {
              // We use the fallback message here because the message for this code isn't very user-friendly
              toast.error(fallbackErrorMessage);
              break;
            }
            case "INVALID_EMAIL": {
              formApi.setFieldMeta("email", (prev) => ({
                ...prev,
                errorMap: {
                  onServer: [{ message: error.message }],
                },
              }));
              break;
            }
            default: {
              toast.error(error.message ?? fallbackErrorMessage);
            }
          }
        } else {
          toast.error(fallbackErrorMessage);
        }
      }
    },
  });

  const isSubmitting = useStore(
    signUpForm.store,
    (state) => state.isSubmitting
  );

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Card className="w-full sm:max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign up</CardTitle>
          <CardDescription>
            Enter your information below to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Sign in form UI */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void signUpForm.handleSubmit();
            }}
            id={signUpForm.formId}
          >
            <FieldGroup>
              {/* Email input field */}
              <signUpForm.AppField
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
              </signUpForm.AppField>
              {/* Password input field */}
              <signUpForm.AppField
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
              </signUpForm.AppField>
              {/* Confirm password input field */}
              <signUpForm.AppField
                validators={{
                  onChangeListenTo: ["password"],
                  onChange: ({ value, fieldApi }) => {
                    const parseResult =
                      confirmPasswordValidator.safeParse(value);
                    if (!parseResult.success) {
                      return parseResult.error.message;
                    }

                    if (
                      parseResult.data !==
                      fieldApi.form.getFieldValue("password")
                    ) {
                      return PASSWORDS_DO_NOT_MATCH_ERROR_MESSAGE;
                    }
                    return undefined;
                  },
                }}
                name="confirmPassword"
              >
                {(appField) => (
                  <appField.TextField
                    placeholder={"*".repeat(MIN_PASSWORD_LENGTH)}
                    label="Confirm password"
                    disabled={isSubmitting}
                    type="password"
                  />
                )}
              </signUpForm.AppField>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-y-2">
          <signUpForm.AppForm>
            {/* Submit button */}
            <signUpForm.SubmitButton
              submittingText="Signing up..."
              submitText="Sign up"
              className="w-full"
            />
          </signUpForm.AppForm>
          <div className="w-full text-center text-muted-foreground">
            <span>Already have an account?</span>{" "}
            <Link
              className="underline underline-offset-2 hover:text-primary"
              search={{
                redirect,
              }}
              disabled={isSubmitting}
              to="/sign-in"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
