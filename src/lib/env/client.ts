import z from "zod";

const clientEnvValidator = z.object({
  VITE_BETTER_AUTH_URL: z.url(),
});

export const clientEnv = clientEnvValidator.parse(import.meta.env);
