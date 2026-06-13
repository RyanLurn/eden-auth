import { createFileRoute, redirect } from "@tanstack/react-router";

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
      throw new Error(error.message);
    }

    return getUserResult.data;
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated"!</div>;
}
