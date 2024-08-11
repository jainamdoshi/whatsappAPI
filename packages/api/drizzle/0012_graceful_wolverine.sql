ALTER TABLE "outgoing_messages" ALTER COLUMN "sent_timestamp" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "outgoing_messages" ADD COLUMN "failed_timestamp" timestamp;