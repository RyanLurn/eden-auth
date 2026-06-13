import type { SerializedUser, InferredUser } from "@/features/auth/types";

export function serializeUser(user: InferredUser): SerializedUser {
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
