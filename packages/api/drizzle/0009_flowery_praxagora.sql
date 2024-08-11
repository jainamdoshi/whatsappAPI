ALTER TABLE "incoming_messages" RENAME COLUMN "conversation_id" TO "from_contact_id";--> statement-breakpoint
ALTER TABLE "incoming_messages" DROP CONSTRAINT "incoming_messages_conversation_id_conversations_id_fk";
--> statement-breakpoint
ALTER TABLE "incoming_messages" ALTER COLUMN "from_contact_id" SET DATA TYPE integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "incoming_messages" ADD CONSTRAINT "incoming_messages_from_contact_id_contacts_id_fk" FOREIGN KEY ("from_contact_id") REFERENCES "public"."contacts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
