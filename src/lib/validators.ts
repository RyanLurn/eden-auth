import { z } from "zod";

export const redirectSearchParamValidator = z.object({
  redirect: z.string().min(1).optional().catch(undefined),
});
