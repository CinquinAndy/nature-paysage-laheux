import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "partners_section_title" varchar DEFAULT 'Mes **Partenaires** & Collaborations';
    ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "partners_section_description" varchar DEFAULT 'Je travaille en étroite collaboration avec des professionnels passionnés pour vous offrir le meilleur du paysagisme écologique.';

    CREATE TABLE IF NOT EXISTS "homepage_partners_section_partners" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "image_id" integer NOT NULL,
        "name" varchar NOT NULL,
        "title" varchar,
        "link" varchar
    );

    DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'homepage_partners_section_partners_image_id_media_id_fk') THEN
            ALTER TABLE "homepage_partners_section_partners" ADD CONSTRAINT "homepage_partners_section_partners_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'homepage_partners_section_partners_parent_id_fk') THEN
            ALTER TABLE "homepage_partners_section_partners" ADD CONSTRAINT "homepage_partners_section_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
        END IF;
    END
    $$;

    CREATE INDEX IF NOT EXISTS "homepage_partners_section_partners_order_idx" ON "homepage_partners_section_partners" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "homepage_partners_section_partners_parent_id_idx" ON "homepage_partners_section_partners" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "homepage_partners_section_partners_image_idx" ON "homepage_partners_section_partners" USING btree ("image_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "homepage_partners_section_partners" CASCADE;
    ALTER TABLE "homepage" DROP COLUMN IF EXISTS "partners_section_title";
    ALTER TABLE "homepage" DROP COLUMN IF EXISTS "partners_section_description";
  `)
}
