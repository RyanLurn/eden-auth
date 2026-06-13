import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

import { InternalServerErrorPage } from "@/components/error-pages/internal-server";
import { InternalServerError } from "@/error/classes/internal-server";
import { DefaultErrorPage } from "@/components/error-pages/default";
import { getUserFn } from "@/features/auth/get-user-fn";

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
      throw new InternalServerError();
    }

    return getUserResult.data;
  },
  errorComponent: ({ error }) => {
    if (error instanceof InternalServerError) {
      return <InternalServerErrorPage error={error} />;
    }
    return <DefaultErrorPage error={error} />;
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
