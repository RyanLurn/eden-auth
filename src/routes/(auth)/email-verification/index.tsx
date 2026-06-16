import { createFileRoute, Link } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/(auth)/email-verification/")({
  component: EmailVerificationPage,
});

function EmailVerificationPage() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-4">
      <h1 className="text-2xl font-bold">Please verify your email address</h1>
      <div className="flex flex-col text-center text-muted-foreground">
        <p>Your account has been created successfully.</p>
        <p>Please check your inbox for a verification email to continue.</p>
        <p>
          If you couldn't find that email, please check your spam or click the
          button below to request a new verification email.
        </p>
        <Link
          className={buttonVariants({ variant: "secondary" })}
          to="/email-verification/resend"
        >
          Get a new verification email
        </Link>
      </div>
    </div>
  );
}
