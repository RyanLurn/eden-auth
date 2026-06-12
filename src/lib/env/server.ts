import z from "zod";

const serverEnvValidator = z.object({
  SQLITE_FILE_PATH: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.url(),
});

export const serverEnv = serverEnvValidator.parse(process.env);
