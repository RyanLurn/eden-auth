import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/onboard/")({
  component: RouteComponent,
});

// Placeholder page to test the sign up form.
function RouteComponent() {
  const user = Route.useRouteContext();
  return <div>Welcome, {user.name}! Thank you for signing up!</div>;
}
