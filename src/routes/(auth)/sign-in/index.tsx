import { createFileRoute } from "@tanstack/react-router";
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
import { Route as AccountRoute } from "@/routes/_authenticated/account";
import { redirectSearchParamValidator } from "@/lib/validators";
import { useAppForm } from "@/components/form/hook";
import { authClient } from "@/features/auth/client";
import { FieldGroup } from "@/components/ui/field";

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
    onSubmit: async ({ value }) => {
      const { error } = await authClient.signIn.email({
        ...value,
        callbackURL: redirect ? redirect : AccountRoute.to,
      });

      if (error) {
        toast.error(error.message ?? "Failed to sign in.");
      }
    },
  });

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Card className="w-full sm:max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
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
                    placeholder="************"
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
                    className="rounded-sm"
                    label="Remember me"
                  />
                )}
              </signInForm.AppField>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <signInForm.AppForm>
            {/* Submit button */}
            <signInForm.SubmitButton
              submittingText="Signing in..."
              submitText="Sign in"
              className="w-full"
            />
          </signInForm.AppForm>
        </CardFooter>
      </Card>
    </div>
  );
}
