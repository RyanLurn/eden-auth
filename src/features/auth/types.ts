import type { auth } from "@/features/auth";

export type User = typeof auth.$Infer.Session.user;
