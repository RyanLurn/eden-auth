import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

import { getAuthenticatedUser } from "@/features/auth/operations/server-functions/get-authenticated-user";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const getAuthenticatedUserResult = await getAuthenticatedUser();

    if (!getAuthenticatedUserResult.success) {
      const error = getAuthenticatedUserResult.error;
      if (error.code === "UNAUTHENTICATED_ERROR") {
        throw redirect({
          to: "/sign-in",
          search: { redirect: location.href },
        });
      }
      throw redirect({
        to: "/500",
        search: { redirect: location.href },
      });
    }

    return getAuthenticatedUserResult.data;
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
