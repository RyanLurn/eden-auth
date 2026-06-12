import { createAuthClient } from "better-auth/react";

import { clientEnv } from "@/lib/env/client";

export const authClient = createAuthClient({
  baseURL: clientEnv.VITE_BETTER_AUTH_URL,
});
