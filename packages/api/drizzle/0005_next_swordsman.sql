ALTER TABLE "users" RENAME TO "contacts";--> statement-breakpoint
ALTER TABLE "conversations" RENAME COLUMN "user_id" TO "contact_id";--> statement-breakpoint
ALTER TABLE "conversations" RENAME COLUMN "user_id2" TO "contact_id2";--> statement-breakpoint
ALTER TABLE "user_groups" RENAME COLUMN "user_id" TO "contact_id";--> statement-breakpoint
ALTER TABLE "contacts" DROP CONSTRAINT "users_phone_number_unique";--> statement-breakpoint
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "conversations" DROP CONSTRAINT "conversations_user_id2_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_groups" DROP CONSTRAINT "user_groups_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_groups" DROP CONSTRAINT "user_groups_user_id_group_id_pk";--> statement-breakpoint
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_contact_id_group_id_pk" PRIMARY KEY("contact_id","group_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversations" ADD CONSTRAINT "conversations_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversations" ADD CONSTRAINT "conversations_contact_id2_contacts_id_fk" FOREIGN KEY ("contact_id2") REFERENCES "public"."contacts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_phone_number_unique" UNIQUE("phone_number");