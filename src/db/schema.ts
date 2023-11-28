import { text, sqliteTable, numeric } from "drizzle-orm/sqlite-core";

export const notes = sqliteTable("notes", {
  id: text("id").notNull().unique().primaryKey(),
  content: text("content").notNull(),
  user: text("user").notNull(),
  createdAt: text("createdAt").notNull().default("CURRENT_TIMESTAMP"),
  updatedAt: text("updatedAt").notNull().default("CURRENT_TIMESTAMP"),
});
