DO $$ BEGIN
 CREATE TYPE "public"."category" AS ENUM('marketing', 'utility');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."language" AS ENUM('en_US');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_groups" (
	"contact_id" integer NOT NULL,
	"group_id" integer NOT NULL,
	CONSTRAINT "user_groups_contact_id_group_id_pk" PRIMARY KEY("contact_id","group_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	CONSTRAINT "contacts_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "conversations" (
	"id" char(32) PRIMARY KEY NOT NULL,
	"contact_id" integer NOT NULL,
	"contact_id2" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"parent_group_id" integer,
	CONSTRAINT "groups_name_parent_group_id_unique" UNIQUE("name","parent_group_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "incoming_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"from_contact_id" integer NOT NULL,
	"to_contact_id" integer NOT NULL,
	"timestamp" timestamp NOT NULL,
	"message" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "outgoing_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"whatsapp_message_id" char(58) NOT NULL,
	"from_contact_id" integer NOT NULL,
	"to_contact_id" integer NOT NULL,
	"sent_timestamp" timestamp,
	"delivered_timestamp" timestamp,
	"read_timestamp" timestamp,
	"failed_timestamp" timestamp,
	"message" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sender_contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	"whatsapp_phone_number_id" char(15) NOT NULL,
	CONSTRAINT "sender_contacts_whatsapp_phone_number_id_unique" UNIQUE("whatsapp_phone_number_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"sender_contact_id" serial NOT NULL,
	"name" varchar(256) NOT NULL,
	"language" "language" NOT NULL,
	"category" "category" NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
 ALTER TABLE "groups" ADD CONSTRAINT "groups_parent_group_id_groups_id_fk" FOREIGN KEY ("parent_group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "incoming_messages" ADD CONSTRAINT "incoming_messages_from_contact_id_contacts_id_fk" FOREIGN KEY ("from_contact_id") REFERENCES "public"."contacts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "incoming_messages" ADD CONSTRAINT "incoming_messages_to_contact_id_sender_contacts_id_fk" FOREIGN KEY ("to_contact_id") REFERENCES "public"."sender_contacts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templates" ADD CONSTRAINT "templates_sender_contact_id_sender_contacts_id_fk" FOREIGN KEY ("sender_contact_id") REFERENCES "public"."sender_contacts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
