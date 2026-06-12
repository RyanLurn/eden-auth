import { tanstackStartCookies } from "better-auth/tanstack-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";

import {
  verificationTable,
  sessionTable,
  accountTable,
} from "@/db/schema/tables/auth";
import { userTable } from "@/db/schema/tables/user";
import { serverEnv } from "@/lib/env/server";
import { db } from "@/db";

export const auth = betterAuth({
  secret: serverEnv.BETTER_AUTH_SECRET,
  baseURL: serverEnv.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: userTable,
      session: sessionTable,
      account: accountTable,
      verification: verificationTable,
    },
  }),
  advanced: {
    database: {
      // Let Drizzle ORM generate the id.
      generateId: false,
    },
  },
  // Better Auth docs specifies that the tanstackStartCookies plugin must come last in the array.
  plugins: [tanstackStartCookies()],
});
