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
