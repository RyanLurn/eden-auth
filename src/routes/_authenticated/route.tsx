import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

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
      throw redirect({
        to: "/500",
        search: { redirect: location.href },
      });
    }

    return getUserResult.data;
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
