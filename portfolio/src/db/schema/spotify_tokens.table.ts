import { sqliteTable } from "drizzle-orm/sqlite-core";
import { integer, text } from "drizzle-orm/sqlite-core";

export const SpotifyTokensTable = sqliteTable("spotify_tokens", {
  id: integer().primaryKey({ autoIncrement: true }),
  expiresAt: integer("expires_at").notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
});

export type NewSpotifyTokens = typeof SpotifyTokensTable.$inferInsert;
export type SpotifyTokens = typeof SpotifyTokensTable.$inferSelect;
