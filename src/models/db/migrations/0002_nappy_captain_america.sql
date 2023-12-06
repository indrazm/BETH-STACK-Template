CREATE TABLE `note` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`body` text NOT NULL,
	`created_at` blob NOT NULL
);
