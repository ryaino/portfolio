import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const twitchApplication = sqliteTable("twitch-application", {
  id: integer().primaryKey({ autoIncrement: true }),
  expiresAt: integer("expires_at").notNull(),
  access_token: text("access_token").notNull(),
});

export type NewTwitchApplication = typeof twitchApplication.$inferInsert;
export type TwitchApplication = typeof twitchApplication.$inferSelect;
