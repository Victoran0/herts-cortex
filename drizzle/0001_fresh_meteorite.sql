CREATE TABLE `herts-cortex_documents` (
	`chatId` text(255) PRIMARY KEY NOT NULL,
	`title` text(255) NOT NULL,
	`doc_content` text NOT NULL,
	`userId` text(255) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE INDEX `chat_id_idx` ON `herts-cortex_documents` (`chatId`);--> statement-breakpoint
CREATE INDEX `title_idx` ON `herts-cortex_documents` (`title`);