import {
  type ErrorComponentProps,
  createFileRoute,
  useRouter,
  redirect,
  Outlet,
} from "@tanstack/react-router";
import { useState } from "react";

import { getUserFn } from "@/features/auth/get-user-fn";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const getUserResult = await getUserFn();

    if (!getUserResult.success) {
      const error = getUserResult.error;
      if (error.code === "UNAUTHENTICATED_ERROR") {
        throw redirect({
          to: "/sign-in",
          search: { redirect: location.href },
        });
      }
      throw new Error(error.message);
    }

    return getUserResult.data;
  },
  errorComponent: ErrorPage,
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}

function ErrorPage({ error }: ErrorComponentProps) {
  const router = useRouter();
  const [isRetrying, setIsRetrying] = useState(false);

  async function retry() {
    setIsRetrying(true);
    await router.invalidate();
    setIsRetrying(false);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-3">
      <h1 className="text-lg text-destructive">500 - Internal server error</h1>
      <p>{error.message}</p>
      <Button
        onClick={() => {
          void retry();
        }}
        disabled={isRetrying}
        variant="destructive"
      >
        {isRetrying ? "Retrying..." : "Retry"}
      </Button>
    </div>
  );
}
