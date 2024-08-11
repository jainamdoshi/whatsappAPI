CREATE TABLE IF NOT EXISTS "conversations" (
	"id" char(32) PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"user_id2" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "incoming_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"conversation_id" char(32) NOT NULL,
	"timestamp" timestamp NOT NULL,
	"message" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "outgoing_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"conversation_id" char(32) NOT NULL,
	"sent_timestamp" timestamp NOT NULL,
	"delivered_timestamp" timestamp,
	"read_timestamp" timestamp,
	"message" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"phone_number" varchar(15) NOT NULL,
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversations" ADD CONSTRAINT "conversations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversations" ADD CONSTRAINT "conversations_user_id2_users_id_fk" FOREIGN KEY ("user_id2") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "incoming_messages" ADD CONSTRAINT "incoming_messages_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "outgoing_messages" ADD CONSTRAINT "outgoing_messages_conversation_id_conversations_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
