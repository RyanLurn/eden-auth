import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/account/")({
  component: AccountPage,
});

function AccountPage() {
  const user = Route.useRouteContext();
  return <div>Hello, {user.name}! Welcome to the Account page.</div>;
}
