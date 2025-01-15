import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const TwitchApplicationTable = sqliteTable("twitch-application", {
  id: integer().primaryKey({ autoIncrement: true }),
  expiresAt: integer("expires_at").notNull(),
  access_token: text("access_token").notNull(),
});

export type NewTwitchApplication = typeof TwitchApplicationTable.$inferInsert;
export type TwitchApplication = typeof TwitchApplicationTable.$inferSelect;
