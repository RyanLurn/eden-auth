import z from "zod";

const serverEnvValidator = z.object({
  SQLITE_FILE_PATH: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.url(),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
});

export const serverEnv = serverEnvValidator.parse(process.env);
