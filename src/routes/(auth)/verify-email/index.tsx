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
    return {
      errorCode: deps.error,
    };
  },
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
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
      </div>
    </div>
  );
}
