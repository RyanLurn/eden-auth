import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const user = Route.useRouteContext();
  return <div>Hello, {user.name}! Welcome to the Dashboard page.</div>;
}
