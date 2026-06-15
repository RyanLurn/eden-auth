import { z } from "zod";

export const redirectSearchParamValidator = z.object({
  redirect: z
    .string()
    .trim()
    .refine((value) => value.startsWith("/") && !value.startsWith("//"), {
      error: "Invalid redirect target.",
    })
    .optional()
    .catch(undefined),
});
export type RedirectSearchParam = z.infer<typeof redirectSearchParamValidator>;
