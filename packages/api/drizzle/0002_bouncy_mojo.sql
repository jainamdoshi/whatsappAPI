ALTER TABLE "groups" ADD COLUMN "parent_group_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "groups" ADD CONSTRAINT "groups_parent_group_id_groups_id_fk" FOREIGN KEY ("parent_group_id") REFERENCES "public"."groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
