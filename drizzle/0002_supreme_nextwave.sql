ALTER TABLE `herts-cortex_documents` RENAME COLUMN "chatId" TO "chat_id";--> statement-breakpoint
DROP INDEX `chat_id_idx`;--> statement-breakpoint
CREATE INDEX `chat_id_idx` ON `herts-cortex_documents` (`chat_id`);