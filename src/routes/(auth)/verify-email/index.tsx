import { createFileRoute, redirect } from "@tanstack/react-router";

import { errorSearchParamValidator } from "@/features/auth/utils/validators";

export const Route = createFileRoute("/(auth)/verify-email/")({
  validateSearch: errorSearchParamValidator,
  loaderDeps: ({ search }) => ({ error: search.error }),
  loader: ({ deps }) => {
    if (deps.error === undefined) {
      throw redirect({
        to: "/onboard",
      });
    }
  },
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-4">
      <h1 className="text-2xl font-bold text-destructive">
        Invalid email verification link
      </h1>
      <div className="flex flex-col text-center text-muted-foreground">
        <p>
          The email verification link you provided is either invalid or has
          expired.
        </p>
        <p>Please make sure that you entered the right link.</p>
      </div>
    </div>
  );
}
