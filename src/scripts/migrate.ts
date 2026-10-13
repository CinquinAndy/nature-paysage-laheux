/**
 * Applique les migrations de `src/migrations` avant `next build` (voir le script "build" du package.json).
 *
 * Lancé directement avec tsx, et non avec `payload migrate` ni `payload run`, car la CLI Payload :
 * - sort parfois en code 0 sans rien exécuter (Node 22), ce qui laisserait `next build` partir sur une base non migrée ;
 * - pose une question sur stdin (et bloque le build) si `payload_migrations` contient la ligne "dev" (batch -1)
 *   laissée par un `pnpm dev` lancé sur cette base ;
 * - échoue si la table `payload_migrations` n'existe pas.
 *
 * Ici : aucune question, la ligne "dev" est ignorée et laissée telle quelle, chaque migration tourne dans sa
 * transaction et n'est enregistrée qu'une fois. Le code 0 n'est possible qu'après la dernière ligne de log
 * ("Migrations applied: N" ou "No migration to apply.") ; toute erreur ou sortie prématurée donne un code non nul :
 * le build s'arrête et l'ancien conteneur continue de servir le site.
 *
 * À savoir :
 * - `pnpm build` ÉCRIT donc dans la base désignée par DATABASE_URI (fichiers .env compris) : ne pas builder en local
 *   avec le DATABASE_URI de production, et donner leur propre base aux éventuels déploiements de preview.
 * - Les migrations doivent rester idempotentes et additives : elles peuvent être rejouées sur une base déjà à jour,
 *   et l'ancien build tourne encore sur la base pendant que le nouveau se construit.
 * - Chaque migration reçoit son propre numéro de batch. Ne jamais lancer `payload migrate:down` (ni refresh, reset,
 *   fresh) sur la production sans avoir lu `payload_migrations` : les `down` suppriment des colonnes et du contenu.
 */
// Imports statiques uniquement : un `await import()` au premier niveau fait sortir Node 22 en code 13 par intermittence
import './load-env'
import config from '@payload-config'
import { type PostgresAdapter, sql } from '@payloadcms/db-postgres'
import { commitTransaction, createLocalReq, getPayload, initTransaction, killTransaction } from 'payload'
import { migrations } from '../migrations'

// Jamais de "push" du schéma depuis ce script, quel que soit NODE_ENV
process.env.PAYLOAD_MIGRATING = 'true'

const payload = await getPayload({ config, disableOnInit: true })
const adapter = payload.db as unknown as PostgresAdapter

// Même définition que celle générée par Payload (cf. snapshots .json).
// Une seule requête = une seule transaction : le verrou consultatif sérialise deux builds simultanés.
await adapter.drizzle.execute(sql`
  SELECT pg_advisory_xact_lock(hashtext('payload_migrations'));
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar,
    "batch" numeric,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
`)

let applied = 0

for (const migration of migrations) {
	const req = await createLocalReq({}, payload)
	await initTransaction(req)

	try {
		const db = adapter.sessions[String(await req.transactionID)].db

		// Ne jamais attendre longtemps un verrou (et bloquer le site derrière) : mieux vaut échouer et relancer.
		// Le verrou consultatif sérialise deux déploiements simultanés.
		await db.execute(sql`
      SET LOCAL lock_timeout = '3s';
      SELECT pg_advisory_xact_lock(hashtext('payload_migrations'));
    `)

		const { docs } = await payload.find({ collection: 'payload-migrations', limit: 0, pagination: false, req })

		if (!docs.some(doc => doc.name === migration.name)) {
			// Un batch par migration (dernier + 1, la ligne "dev" en batch -1 ne compte pas) :
			// un `migrate:down` ne défait ainsi que la dernière migration, jamais tout l'historique d'un coup
			const batch = Math.max(0, ...docs.map(doc => Number(doc.batch))) + 1

			payload.logger.info(`Migrating: ${migration.name}`)
			await migration.up({ db, payload, req })
			await payload.create({ collection: 'payload-migrations', data: { name: migration.name, batch }, req })
			applied++
		}

		await commitTransaction(req)
	} catch (err) {
		await killTransaction(req)
		throw err
	}
}

payload.logger.info(applied ? `Migrations applied: ${applied}` : 'No migration to apply.')
await payload.destroy()
// Sortie explicite, en toute dernière instruction : sans elle le processus reste en vie et le build ne se termine pas
process.exit(0)
