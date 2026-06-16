import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  CardDescription,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle,
  Card,
} from "@/components/ui/card";
import { sendVerificationEmail } from "@/features/auth/operations/client-only/send-verification-email";
import { emailValidator } from "@/features/auth/utils/validators";
import { useAppForm } from "@/components/form/hook";
import { FieldGroup } from "@/components/ui/field";

export const Route = createFileRoute("/(auth)/email-verification/resend/")({
  component: ResendVerificationEmailPage,
});

function ResendVerificationEmailPage() {
  const resendVerificationEmailForm = useAppForm({
    formId: "resend-verification-email-form",
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: z.object({
        email: emailValidator,
      }),
    },
    onSubmit: async ({ value, formApi }) => {
      const email = emailValidator.parse(value.email);

      const sendVerificationEmailResult = await sendVerificationEmail(email);

      if (!sendVerificationEmailResult.success) {
        const error = sendVerificationEmailResult.error;
        if (error.code === "VALIDATION_ERROR") {
          formApi.setFieldMeta(error.entity, (prev) => ({
            ...prev,
            errorMap: {
              onServer: [{ message: error.message }],
            },
          }));
          return;
        }
        toast.error(error.message);
        return;
      }

      toast.success(`A new verification email has been sent to ${email}!`);
    },
  });

  const isSubmitting = useStore(
    resendVerificationEmailForm.store,
    (state) => state.isSubmitting
  );

  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Card className="w-full sm:max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Resend verification email</CardTitle>
          <CardDescription>
            Enter the email address you used to sign up so we can send you a new
            verification email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void resendVerificationEmailForm.handleSubmit();
            }}
            id={resendVerificationEmailForm.formId}
          >
            <FieldGroup>
              {/* Email input field */}
              <resendVerificationEmailForm.AppField
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
              </resendVerificationEmailForm.AppField>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <resendVerificationEmailForm.AppForm>
            {/* Submit button */}
            <resendVerificationEmailForm.SubmitButton
              submittingText="Resending..."
              submitText="Resend"
              className="w-full"
            />
          </resendVerificationEmailForm.AppForm>
        </CardFooter>
      </Card>
    </div>
  );
}
