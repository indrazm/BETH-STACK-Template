import { sqliteTable, text, blob } from "drizzle-orm/sqlite-core";

export const note = sqliteTable("note", {
  id: text("id").primaryKey(),
  title: text("name").notNull(),
  body: text("body").notNull(),
  createdAt: blob("created_at", {
    mode: "bigint",
  }).notNull(),
});
