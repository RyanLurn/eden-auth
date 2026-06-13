import type { StrictOmit } from "@/types/utils";
import type { auth } from "@/features/auth";

export type InferredSession = typeof auth.$Infer.Session;
export type InferredUser = typeof auth.$Infer.Session.user;

export type SerializedUser = StrictOmit<
  InferredUser,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};
