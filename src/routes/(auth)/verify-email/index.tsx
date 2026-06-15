import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/verify-email/")({
  component: VerifyEmailPage,
});

// Landing page for when we require email verification.
function VerifyEmailPage() {
  return <div>Please verify your email.</div>;
}
