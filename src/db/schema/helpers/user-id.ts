import { text } from "drizzle-orm/sqlite-core";

import { userTable } from "@/db/schema/tables/user";

export const userId = text("user_id")
  .notNull()
  .references(() => userTable.id, { onDelete: "cascade" });
