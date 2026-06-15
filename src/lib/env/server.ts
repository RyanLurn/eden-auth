import z from "zod";

const serverEnvValidator = z.object({
  NODE_ENV: z.enum(["development", "testing", "staging", "production"]),
  // For db
  SQLITE_FILE_PATH: z.string().min(1),
  // For auth
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.url(),
  // For email
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.preprocess((value) => {
    if (typeof value === "string") {
      return Number.parseInt(value);
    }
    return value;
  }, z.int()),
  SMTP_SECURE: z.stringbool(),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
});

export const serverEnv = serverEnvValidator.parse(process.env);
