import { tanstackStartCookies } from "better-auth/tanstack-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/features/auth/utils/constants";
import {
  verificationTable,
  sessionTable,
  accountTable,
} from "@/db/schema/tables/auth";
import { verifyPassword, hashPassword } from "@/features/auth/utils/password";
import { userTable } from "@/db/schema/tables/user";
import { sendEmail } from "@/features/email/send";
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
  emailAndPassword: {
    enabled: true,
    minPasswordLength: MIN_PASSWORD_LENGTH,
    maxPasswordLength: MAX_PASSWORD_LENGTH,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },
  emailVerification: {
    // eslint-disable-next-line @typescript-eslint/require-await
    sendVerificationEmail: async ({ user, url }) => {
      // Avoid awaiting the email sending to prevent timing attacks.
      void sendEmail({
        from: serverEnv.SUPPORT_EMAIL,
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
        html: `<p>Click the link to verify your email: <a href="${url}">${url}</a></p>`,
      });
    },
  },
  advanced: {
    database: {
      // Let Drizzle ORM generate the id.
      generateId: false,
    },
  },
  // Better Auth docs specifies that the tanstackStartCookies plugin must come last in the array.
  plugins: [tanstackStartCookies()],
});
