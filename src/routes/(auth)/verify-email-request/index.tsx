import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/verify-email-request/")({
  component: VerifyEmailRequestPage,
});

function VerifyEmailRequestPage() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-4">
      <h1 className="text-2xl font-bold">Please verify your email address</h1>
      <div className="flex flex-col text-center text-muted-foreground">
        <p>Your account has been created successfully.</p>
        <p>Please check your inbox for a verification email.</p>
      </div>
    </div>
  );
}
