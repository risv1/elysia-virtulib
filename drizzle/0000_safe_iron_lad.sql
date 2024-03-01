CREATE TABLE `book` (
	`id` varchar(30) NOT NULL,
	`src` text,
	`title` text,
	`author` text,
	`description` text,
	`genre` text,
	`year` text,
	`published` text,
	`active` text NOT NULL,
	CONSTRAINT `book_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reservations` (
	`id` varchar(30) NOT NULL,
	`book_id` text NOT NULL,
	`user_id` text NOT NULL,
	`reserved` text NOT NULL,
	`returned` text,
	`past_due` text,
	CONSTRAINT `reservations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(30) NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL,
	`email` text NOT NULL,
	`role` text NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
