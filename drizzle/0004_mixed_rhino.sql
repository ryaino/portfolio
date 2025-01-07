CREATE TABLE `twitch-application` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`expires_at` integer NOT NULL,
	`access_token` text NOT NULL
);
