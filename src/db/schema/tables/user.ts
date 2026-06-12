import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

import { timestamps } from "@/db/schema/helpers/timestamps";
import { id } from "@/db/schema/helpers/id";

export const userTable = sqliteTable("users", {
  id,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
  image: text("image"),
  ...timestamps,
});
