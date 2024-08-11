DO $$ BEGIN
 ALTER TABLE "templates" ADD CONSTRAINT "templates_sender_contact_id_sender_contacts_id_fk" FOREIGN KEY ("sender_contact_id") REFERENCES "public"."sender_contacts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
