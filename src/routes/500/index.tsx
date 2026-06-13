import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

import { INTERNAL_SERVER_ERROR_MESSAGE } from "@/error/constants";
import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/500/")({
  validateSearch: z.object({
    redirect: z.string().min(1).optional().catch(undefined),
  }),
  component: InternalServerErrorPage,
});

function InternalServerErrorPage() {
  const { redirect } = Route.useSearch();
  const linkClassName = buttonVariants({ variant: "outline" });

  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-3">
      <h1 className="text-lg text-destructive">500 - Internal server error</h1>
      <p>{INTERNAL_SERVER_ERROR_MESSAGE}</p>
      {redirect ? (
        <Link className={linkClassName} to={redirect}>
          Retry
        </Link>
      ) : (
        <Link className={linkClassName} to="..">
          Back to Home page
        </Link>
      )}
    </div>
  );
}
