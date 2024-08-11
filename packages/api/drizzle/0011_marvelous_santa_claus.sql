ALTER TABLE "outgoing_messages" RENAME COLUMN "conversation_id" TO "whatsapp_message_id";--> statement-breakpoint
ALTER TABLE "outgoing_messages" DROP CONSTRAINT "outgoing_messages_conversation_id_conversations_id_fk";
--> statement-breakpoint
ALTER TABLE "outgoing_messages" ALTER COLUMN "whatsapp_message_id" SET DATA TYPE char(58);--> statement-breakpoint
ALTER TABLE "outgoing_messages" ADD COLUMN "from_contact_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "outgoing_messages" ADD COLUMN "to_contact_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "outgoing_messages" ADD CONSTRAINT "outgoing_messages_from_contact_id_sender_contacts_id_fk" FOREIGN KEY ("from_contact_id") REFERENCES "public"."sender_contacts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "outgoing_messages" ADD CONSTRAINT "outgoing_messages_to_contact_id_contacts_id_fk" FOREIGN KEY ("to_contact_id") REFERENCES "public"."contacts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
