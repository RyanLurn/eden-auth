import type { StrictOmit } from "@/types/utils";
import type { auth } from "@/features/auth";

export type AuthenticatedSession = typeof auth.$Infer.Session;
export type AuthenticatedUser = typeof auth.$Infer.Session.user;

export type SerializedUser = StrictOmit<
  AuthenticatedUser,
  "createdAt" | "updatedAt"
> & {
  createdAt: string;
  updatedAt: string;
};
