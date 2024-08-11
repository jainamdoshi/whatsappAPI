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
