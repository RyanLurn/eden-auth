import z from "zod";

const serverEnvValidator = z.object({
  SQLITE_FILE_PATH: z.string().min(1),
});

export const serverEnv = serverEnvValidator.parse(process.env);
