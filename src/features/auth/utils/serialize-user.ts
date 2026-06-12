import type { SerializedUser, User } from "@/features/auth/types";

export function serializeUser(user: User): SerializedUser {
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
