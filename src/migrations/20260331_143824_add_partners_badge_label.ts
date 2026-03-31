import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" ADD COLUMN IF NOT EXISTS "partners_section_badge_label" varchar DEFAULT 'Mes Partenariats';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" DROP COLUMN "partners_section_badge_label";`)
}
