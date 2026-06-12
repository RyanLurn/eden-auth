import { drizzle } from "drizzle-orm/bun-sqlite";

import {
  verificationTable,
  sessionTable,
  accountTable,
} from "@/db/schema/tables/auth";
import { userTable } from "@/db/schema/tables/user";
import { serverEnv } from "@/lib/env/server";

export const db = drizzle(serverEnv.SQLITE_FILE_PATH, {
  schema: {
    userTable,
    sessionTable,
    accountTable,
    verificationTable,
  },
});
