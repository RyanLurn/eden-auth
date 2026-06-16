import { createFileRoute, redirect, Link } from "@tanstack/react-router";

import { errorSearchParamValidator } from "@/features/auth/utils/validators";
import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/(auth)/email-verification/check/")({
  validateSearch: errorSearchParamValidator,
  loaderDeps: ({ search }) => ({ error: search.error }),
  loader: ({ deps }) => {
    if (deps.error === undefined) {
      throw redirect({
        to: "/onboard",
      });
    }
    return {
      errorCode: deps.error,
    };
  },
  component: CheckEmailVerificationPage,
});

function CheckEmailVerificationPage() {
  const { errorCode } = Route.useLoaderData();

  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-4">
      <h1 className="text-2xl font-bold text-destructive">
        {errorCode === "TOKEN_EXPIRED" ? "Expired" : "Invalid"} email
        verification link
      </h1>
      <div className="flex flex-col text-center text-muted-foreground">
        <p>
          The email verification link you provided{" "}
          {errorCode === "TOKEN_EXPIRED" ? "has expired" : "is invalid"}.
        </p>
        <p>
          Please make sure to use the{" "}
          {errorCode === "TOKEN_EXPIRED" ? "latest" : "correct"} link we sent
          you.
        </p>
        <p>
          You can also click the button below to request a new verification
          email.
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
