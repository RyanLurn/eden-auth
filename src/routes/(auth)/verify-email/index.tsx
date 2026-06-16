import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/verify-email/")({
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  return <div>Hello "/(auth)/verify-email/"!</div>;
}
