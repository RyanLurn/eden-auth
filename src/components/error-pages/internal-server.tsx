import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

import type { InternalServerError } from "@/error/classes/internal-server";

import { Button } from "@/components/ui/button";

export function InternalServerErrorPage({
  error,
}: {
  error: InternalServerError;
}) {
  const router = useRouter();
  const [isRetrying, setIsRetrying] = useState(false);

  async function handleRetry() {
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
          void handleRetry();
        }}
        disabled={isRetrying}
        variant="destructive"
      >
        {isRetrying ? "Retrying..." : "Try again"}
      </Button>
    </div>
  );
}
