CREATE TABLE `spotify_tokens` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`expires_at` integer NOT NULL,
	`access_token` text NOT NULL,
	`refresh_token` text NOT NULL
);
