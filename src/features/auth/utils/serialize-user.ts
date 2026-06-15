import type { AuthenticatedUser, SerializedUser } from "@/features/auth/types";

export function serializeUser(user: AuthenticatedUser): SerializedUser {
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}
