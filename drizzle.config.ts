import { defineConfig } from "drizzle-kit";

import { serverEnv } from "@/lib/env/server";

export default defineConfig({
  dbCredentials: {
    url: serverEnv.SQLITE_FILE_PATH,
  },
  schema: "./src/db/schema/tables",
  out: "./migrations",
  dialect: "sqlite",
});
