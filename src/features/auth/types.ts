import type { StrictOmit } from "@/types/utils";
import type { auth } from "@/features/auth";

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;

export interface SerializedUser extends StrictOmit<
  User,
  "createdAt" | "updatedAt"
> {
  createdAt: string;
  updatedAt: string;
}
