ALTER TABLE "incoming_messages" ADD COLUMN "to_contact_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "incoming_messages" ADD CONSTRAINT "incoming_messages_to_contact_id_sender_contacts_id_fk" FOREIGN KEY ("to_contact_id") REFERENCES "public"."sender_contacts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
