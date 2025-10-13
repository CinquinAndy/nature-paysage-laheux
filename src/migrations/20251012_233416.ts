import { type MigrateDownArgs, type MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
	await db.execute(sql`
   CREATE TYPE "public"."enum_services_category" AS ENUM('entretien', 'creation', 'accompagnement');
  CREATE TYPE "public"."enum_realisations_category" AS ENUM('entretien', 'amenagement', 'potager', 'taille');
  CREATE TYPE "public"."enum_faq_category" AS ENUM('general', 'services', 'tarifs', 'ecologie');
  CREATE TYPE "public"."enum_homepage_values_values_list_icon" AS ENUM('leaf', 'wrench', 'map-pin', 'trending-down');
  CREATE TYPE "public"."enum_homepage_philosophy_philosophy_points_icon" AS ENUM('leaf', 'heart', 'award', 'shield');
  CREATE TYPE "public"."enum_faq_page_category_descriptions_category" AS ENUM('general', 'services', 'tarifs', 'ecologie');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "services_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "services_cta_section_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"short_description" varchar NOT NULL,
  	"full_description" jsonb NOT NULL,
  	"image_id" integer NOT NULL,
  	"category" "enum_services_category" DEFAULT 'entretien' NOT NULL,
  	"eligible_tax_credit" boolean DEFAULT true,
  	"price" varchar DEFAULT 'Sur devis personnalisé',
  	"order" numeric DEFAULT 0,
  	"cta_section_title" varchar DEFAULT 'Intéressé par cette prestation ?',
  	"cta_section_description" varchar DEFAULT 'Demandez votre devis gratuit et bénéficiez de 50% de crédit d''impôt sur toutes mes prestations.',
  	"cta_section_button_text" varchar DEFAULT 'Demander un devis gratuit',
  	"cta_section_button_url" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "realisations_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "realisations_cta_section_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar
  );
  
  CREATE TABLE "realisations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"location" varchar,
  	"date" timestamp(3) with time zone,
  	"image_id" integer NOT NULL,
  	"short_description" varchar NOT NULL,
  	"description" jsonb NOT NULL,
  	"category" "enum_realisations_category" DEFAULT 'entretien' NOT NULL,
  	"testimonial_quote" varchar,
  	"testimonial_author" varchar,
  	"testimonial_location" varchar,
  	"cta_section_title" varchar DEFAULT 'Un projet similaire ?',
  	"cta_section_description" varchar DEFAULT 'Discutons de votre jardin et créons ensemble un espace écologique qui vous ressemble. Bénéficiez de 50% de crédit d''impôt sur toutes mes prestations.',
  	"cta_section_button_text" varchar DEFAULT 'Demander un devis gratuit',
  	"cta_section_button_url" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "realisations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"category" "enum_faq_category" DEFAULT 'general' NOT NULL,
  	"show_on_homepage" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "third_party_access" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"services_id" integer,
  	"realisations_id" integer,
  	"faq_id" integer,
  	"third_party_access_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"third_party_access_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage_values_values_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_homepage_values_values_list_icon" NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_philosophy_philosophy_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_homepage_philosophy_philosophy_points_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_philosophy_preferences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "homepage_philosophy_refusals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "homepage_intervention_zone_communes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_tax_credit_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" numeric NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image1_id" integer,
  	"image2_id" integer
  );
  
  CREATE TABLE "homepage_final_cta_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_background_image_id" integer NOT NULL,
  	"hero_title" varchar NOT NULL,
  	"values_section_title" varchar NOT NULL,
  	"values_image_id" integer,
  	"services_preview_title" varchar DEFAULT 'Mes Prestations d''Entretien de Jardin',
  	"services_preview_subtitle" varchar DEFAULT 'Toutes mes prestations bénéficient de 50% de réduction d''impôt',
  	"services_preview_cta_label" varchar DEFAULT 'Voir Toutes Mes Prestations',
  	"services_preview_cta_url" varchar DEFAULT '/prestations',
  	"philosophy_title" varchar NOT NULL,
  	"philosophy_intro_text" varchar,
  	"philosophy_quote" varchar,
  	"philosophy_primary_image_id" integer,
  	"philosophy_image_overlay_title" varchar,
  	"philosophy_image_overlay_description" varchar,
  	"philosophy_engagement_banner_title" varchar,
  	"philosophy_engagement_banner_description" varchar,
  	"philosophy_engagement_banner_cta_label" varchar,
  	"philosophy_engagement_banner_cta_url" varchar DEFAULT '/contact',
  	"intervention_zone_title" varchar,
  	"intervention_zone_subtitle" varchar,
  	"intervention_zone_map_center_lat" numeric DEFAULT 47.1339,
  	"intervention_zone_map_center_lng" numeric DEFAULT -1.3433,
  	"intervention_zone_radius_km" numeric DEFAULT 20,
  	"intervention_zone_cta_section_title" varchar,
  	"intervention_zone_cta_section_description" varchar,
  	"intervention_zone_cta_section_cta_label" varchar,
  	"intervention_zone_cta_section_cta_url" varchar DEFAULT '/contact',
  	"realisations_preview_title" varchar DEFAULT 'Découvrez Mes Réalisations',
  	"realisations_preview_description" varchar,
  	"realisations_preview_cta_label" varchar DEFAULT 'Voir Toutes Mes Réalisations',
  	"realisations_preview_cta_url" varchar DEFAULT '/realisations',
  	"faq_short_title" varchar DEFAULT 'Questions Fréquentes',
  	"faq_short_description" varchar,
  	"faq_short_cta_label" varchar DEFAULT 'Voir Toutes les Questions',
  	"faq_short_cta_url" varchar DEFAULT '/faq',
  	"tax_credit_title" varchar DEFAULT 'Comment Profiter de 50% de Réduction d''Impôt ?',
  	"tax_credit_subtitle" varchar,
  	"final_cta_title" varchar DEFAULT 'Prêt à Redonner Vie à Votre Jardin ?',
  	"final_cta_description" varchar,
  	"final_cta_button_text" varchar DEFAULT 'Demander un Devis Gratuit',
  	"final_cta_button_url" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "prestations_page_tax_credit_eligibility_eligible_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "prestations_page_tax_credit_eligibility_non_eligible_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "prestations_page_cta_section_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar
  );
  
  CREATE TABLE "prestations_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Mes Prestations Écologiques',
  	"hero_image_id" integer,
  	"tax_credit_eligibility_title" varchar,
  	"tax_credit_eligibility_description" varchar,
  	"tax_credit_eligibility_eligible_title" varchar,
  	"tax_credit_eligibility_eligible_description" varchar,
  	"tax_credit_eligibility_eligible_image_id" integer,
  	"tax_credit_eligibility_non_eligible_title" varchar,
  	"tax_credit_eligibility_non_eligible_description" varchar,
  	"tax_credit_eligibility_non_eligible_image_id" integer,
  	"tax_credit_eligibility_important_note" varchar,
  	"cta_section_title" varchar,
  	"cta_section_description" varchar,
  	"cta_section_button_text" varchar,
  	"cta_section_button_url" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "realisations_page_cta_section_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar
  );
  
  CREATE TABLE "realisations_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Mes Réalisations en Loire-Atlantique',
  	"hero_image_id" integer,
  	"introduction_paragraph1" varchar,
  	"introduction_paragraph2" varchar,
  	"cta_section_title" varchar DEFAULT 'Envie du Même Résultat Pour Votre Jardin ?',
  	"cta_section_description" varchar,
  	"cta_section_button_text" varchar,
  	"cta_section_button_url" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "faq_page_category_descriptions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" "enum_faq_page_category_descriptions_category",
  	"description" varchar
  );
  
  CREATE TABLE "faq_page_cta_section_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar
  );
  
  CREATE TABLE "faq_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Questions Fréquentes',
  	"hero_image_id" integer,
  	"cta_section_title" varchar DEFAULT 'Une Autre Question ?',
  	"cta_section_description" varchar,
  	"cta_section_button_text" varchar DEFAULT 'Me Contacter',
  	"cta_section_button_url" varchar DEFAULT '/contact',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_page_form_section_garden_size_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "contact_page_contact_info_sidebar_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar
  );
  
  CREATE TABLE "contact_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Contactez-Moi',
  	"hero_image_id" integer,
  	"form_section_title" varchar DEFAULT 'Parlons de Votre Jardin',
  	"form_section_subtitle" varchar,
  	"form_section_privacy_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "mentions_legales_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Mentions Légales',
  	"hero_image_id" integer,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_phone" varchar NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"contact_company_name" varchar DEFAULT 'SASU Nature et Paysage Laheux',
  	"contact_company_representative" varchar DEFAULT 'Jean-Luc Laheux',
  	"contact_company_legal_form" varchar DEFAULT 'SASU',
  	"contact_address_postal_code" varchar,
  	"contact_address_city" varchar,
  	"contact_address_region" varchar,
  	"contact_address_country" varchar DEFAULT 'France',
  	"contact_social_facebook" varchar,
  	"contact_social_linkedin" varchar,
  	"contact_hours_weekday" varchar,
  	"contact_hours_saturday" varchar,
  	"contact_hours_sunday" varchar,
  	"contact_hours_note" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_cta_section_benefits" ADD CONSTRAINT "services_cta_section_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "realisations_features" ADD CONSTRAINT "realisations_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."realisations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "realisations_cta_section_benefits" ADD CONSTRAINT "realisations_cta_section_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."realisations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "realisations" ADD CONSTRAINT "realisations_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "realisations_rels" ADD CONSTRAINT "realisations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."realisations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "realisations_rels" ADD CONSTRAINT "realisations_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_realisations_fk" FOREIGN KEY ("realisations_id") REFERENCES "public"."realisations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faq_fk" FOREIGN KEY ("faq_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_third_party_access_fk" FOREIGN KEY ("third_party_access_id") REFERENCES "public"."third_party_access"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_third_party_access_fk" FOREIGN KEY ("third_party_access_id") REFERENCES "public"."third_party_access"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_values_values_list" ADD CONSTRAINT "homepage_values_values_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_philosophy_philosophy_points" ADD CONSTRAINT "homepage_philosophy_philosophy_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_philosophy_preferences" ADD CONSTRAINT "homepage_philosophy_preferences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_philosophy_refusals" ADD CONSTRAINT "homepage_philosophy_refusals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_intervention_zone_communes" ADD CONSTRAINT "homepage_intervention_zone_communes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_tax_credit_steps" ADD CONSTRAINT "homepage_tax_credit_steps_image1_id_media_id_fk" FOREIGN KEY ("image1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_tax_credit_steps" ADD CONSTRAINT "homepage_tax_credit_steps_image2_id_media_id_fk" FOREIGN KEY ("image2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_tax_credit_steps" ADD CONSTRAINT "homepage_tax_credit_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_final_cta_benefits" ADD CONSTRAINT "homepage_final_cta_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_background_image_id_media_id_fk" FOREIGN KEY ("hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_values_image_id_media_id_fk" FOREIGN KEY ("values_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_philosophy_primary_image_id_media_id_fk" FOREIGN KEY ("philosophy_primary_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prestations_page_tax_credit_eligibility_eligible_items" ADD CONSTRAINT "prestations_page_tax_credit_eligibility_eligible_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prestations_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prestations_page_tax_credit_eligibility_non_eligible_items" ADD CONSTRAINT "prestations_page_tax_credit_eligibility_non_eligible_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prestations_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prestations_page_cta_section_benefits" ADD CONSTRAINT "prestations_page_cta_section_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prestations_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prestations_page" ADD CONSTRAINT "prestations_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prestations_page" ADD CONSTRAINT "prestations_page_tax_credit_eligibility_eligible_image_id_media_id_fk" FOREIGN KEY ("tax_credit_eligibility_eligible_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "prestations_page" ADD CONSTRAINT "prestations_page_tax_credit_eligibility_non_eligible_image_id_media_id_fk" FOREIGN KEY ("tax_credit_eligibility_non_eligible_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "realisations_page_cta_section_benefits" ADD CONSTRAINT "realisations_page_cta_section_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."realisations_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "realisations_page" ADD CONSTRAINT "realisations_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "faq_page_category_descriptions" ADD CONSTRAINT "faq_page_category_descriptions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_page_cta_section_benefits" ADD CONSTRAINT "faq_page_cta_section_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_page" ADD CONSTRAINT "faq_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact_page_form_section_garden_size_options" ADD CONSTRAINT "contact_page_form_section_garden_size_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page_contact_info_sidebar_benefits" ADD CONSTRAINT "contact_page_contact_info_sidebar_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_page" ADD CONSTRAINT "contact_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mentions_legales_page" ADD CONSTRAINT "mentions_legales_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "services_features_order_idx" ON "services_features" USING btree ("_order");
  CREATE INDEX "services_features_parent_id_idx" ON "services_features" USING btree ("_parent_id");
  CREATE INDEX "services_cta_section_benefits_order_idx" ON "services_cta_section_benefits" USING btree ("_order");
  CREATE INDEX "services_cta_section_benefits_parent_id_idx" ON "services_cta_section_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_media_id_idx" ON "services_rels" USING btree ("media_id");
  CREATE INDEX "realisations_features_order_idx" ON "realisations_features" USING btree ("_order");
  CREATE INDEX "realisations_features_parent_id_idx" ON "realisations_features" USING btree ("_parent_id");
  CREATE INDEX "realisations_cta_section_benefits_order_idx" ON "realisations_cta_section_benefits" USING btree ("_order");
  CREATE INDEX "realisations_cta_section_benefits_parent_id_idx" ON "realisations_cta_section_benefits" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "realisations_slug_idx" ON "realisations" USING btree ("slug");
  CREATE INDEX "realisations_image_idx" ON "realisations" USING btree ("image_id");
  CREATE INDEX "realisations_updated_at_idx" ON "realisations" USING btree ("updated_at");
  CREATE INDEX "realisations_created_at_idx" ON "realisations" USING btree ("created_at");
  CREATE INDEX "realisations_rels_order_idx" ON "realisations_rels" USING btree ("order");
  CREATE INDEX "realisations_rels_parent_idx" ON "realisations_rels" USING btree ("parent_id");
  CREATE INDEX "realisations_rels_path_idx" ON "realisations_rels" USING btree ("path");
  CREATE INDEX "realisations_rels_media_id_idx" ON "realisations_rels" USING btree ("media_id");
  CREATE INDEX "faq_updated_at_idx" ON "faq" USING btree ("updated_at");
  CREATE INDEX "faq_created_at_idx" ON "faq" USING btree ("created_at");
  CREATE INDEX "third_party_access_updated_at_idx" ON "third_party_access" USING btree ("updated_at");
  CREATE INDEX "third_party_access_created_at_idx" ON "third_party_access" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_realisations_id_idx" ON "payload_locked_documents_rels" USING btree ("realisations_id");
  CREATE INDEX "payload_locked_documents_rels_faq_id_idx" ON "payload_locked_documents_rels" USING btree ("faq_id");
  CREATE INDEX "payload_locked_documents_rels_third_party_access_id_idx" ON "payload_locked_documents_rels" USING btree ("third_party_access_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_third_party_access_id_idx" ON "payload_preferences_rels" USING btree ("third_party_access_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "homepage_values_values_list_order_idx" ON "homepage_values_values_list" USING btree ("_order");
  CREATE INDEX "homepage_values_values_list_parent_id_idx" ON "homepage_values_values_list" USING btree ("_parent_id");
  CREATE INDEX "homepage_philosophy_philosophy_points_order_idx" ON "homepage_philosophy_philosophy_points" USING btree ("_order");
  CREATE INDEX "homepage_philosophy_philosophy_points_parent_id_idx" ON "homepage_philosophy_philosophy_points" USING btree ("_parent_id");
  CREATE INDEX "homepage_philosophy_preferences_order_idx" ON "homepage_philosophy_preferences" USING btree ("_order");
  CREATE INDEX "homepage_philosophy_preferences_parent_id_idx" ON "homepage_philosophy_preferences" USING btree ("_parent_id");
  CREATE INDEX "homepage_philosophy_refusals_order_idx" ON "homepage_philosophy_refusals" USING btree ("_order");
  CREATE INDEX "homepage_philosophy_refusals_parent_id_idx" ON "homepage_philosophy_refusals" USING btree ("_parent_id");
  CREATE INDEX "homepage_intervention_zone_communes_order_idx" ON "homepage_intervention_zone_communes" USING btree ("_order");
  CREATE INDEX "homepage_intervention_zone_communes_parent_id_idx" ON "homepage_intervention_zone_communes" USING btree ("_parent_id");
  CREATE INDEX "homepage_tax_credit_steps_order_idx" ON "homepage_tax_credit_steps" USING btree ("_order");
  CREATE INDEX "homepage_tax_credit_steps_parent_id_idx" ON "homepage_tax_credit_steps" USING btree ("_parent_id");
  CREATE INDEX "homepage_tax_credit_steps_image1_idx" ON "homepage_tax_credit_steps" USING btree ("image1_id");
  CREATE INDEX "homepage_tax_credit_steps_image2_idx" ON "homepage_tax_credit_steps" USING btree ("image2_id");
  CREATE INDEX "homepage_final_cta_benefits_order_idx" ON "homepage_final_cta_benefits" USING btree ("_order");
  CREATE INDEX "homepage_final_cta_benefits_parent_id_idx" ON "homepage_final_cta_benefits" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_hero_background_image_idx" ON "homepage" USING btree ("hero_background_image_id");
  CREATE INDEX "homepage_values_values_image_idx" ON "homepage" USING btree ("values_image_id");
  CREATE INDEX "homepage_philosophy_philosophy_primary_image_idx" ON "homepage" USING btree ("philosophy_primary_image_id");
  CREATE INDEX "prestations_page_tax_credit_eligibility_eligible_items_order_idx" ON "prestations_page_tax_credit_eligibility_eligible_items" USING btree ("_order");
  CREATE INDEX "prestations_page_tax_credit_eligibility_eligible_items_parent_id_idx" ON "prestations_page_tax_credit_eligibility_eligible_items" USING btree ("_parent_id");
  CREATE INDEX "prestations_page_tax_credit_eligibility_non_eligible_items_order_idx" ON "prestations_page_tax_credit_eligibility_non_eligible_items" USING btree ("_order");
  CREATE INDEX "prestations_page_tax_credit_eligibility_non_eligible_items_parent_id_idx" ON "prestations_page_tax_credit_eligibility_non_eligible_items" USING btree ("_parent_id");
  CREATE INDEX "prestations_page_cta_section_benefits_order_idx" ON "prestations_page_cta_section_benefits" USING btree ("_order");
  CREATE INDEX "prestations_page_cta_section_benefits_parent_id_idx" ON "prestations_page_cta_section_benefits" USING btree ("_parent_id");
  CREATE INDEX "prestations_page_hero_hero_image_idx" ON "prestations_page" USING btree ("hero_image_id");
  CREATE INDEX "prestations_page_tax_credit_eligibility_tax_credit_eligi_idx" ON "prestations_page" USING btree ("tax_credit_eligibility_eligible_image_id");
  CREATE INDEX "prestations_page_tax_credit_eligibility_tax_credit_eli_1_idx" ON "prestations_page" USING btree ("tax_credit_eligibility_non_eligible_image_id");
  CREATE INDEX "realisations_page_cta_section_benefits_order_idx" ON "realisations_page_cta_section_benefits" USING btree ("_order");
  CREATE INDEX "realisations_page_cta_section_benefits_parent_id_idx" ON "realisations_page_cta_section_benefits" USING btree ("_parent_id");
  CREATE INDEX "realisations_page_hero_hero_image_idx" ON "realisations_page" USING btree ("hero_image_id");
  CREATE INDEX "faq_page_category_descriptions_order_idx" ON "faq_page_category_descriptions" USING btree ("_order");
  CREATE INDEX "faq_page_category_descriptions_parent_id_idx" ON "faq_page_category_descriptions" USING btree ("_parent_id");
  CREATE INDEX "faq_page_cta_section_benefits_order_idx" ON "faq_page_cta_section_benefits" USING btree ("_order");
  CREATE INDEX "faq_page_cta_section_benefits_parent_id_idx" ON "faq_page_cta_section_benefits" USING btree ("_parent_id");
  CREATE INDEX "faq_page_hero_hero_image_idx" ON "faq_page" USING btree ("hero_image_id");
  CREATE INDEX "contact_page_form_section_garden_size_options_order_idx" ON "contact_page_form_section_garden_size_options" USING btree ("_order");
  CREATE INDEX "contact_page_form_section_garden_size_options_parent_id_idx" ON "contact_page_form_section_garden_size_options" USING btree ("_parent_id");
  CREATE INDEX "contact_page_contact_info_sidebar_benefits_order_idx" ON "contact_page_contact_info_sidebar_benefits" USING btree ("_order");
  CREATE INDEX "contact_page_contact_info_sidebar_benefits_parent_id_idx" ON "contact_page_contact_info_sidebar_benefits" USING btree ("_parent_id");
  CREATE INDEX "contact_page_hero_hero_image_idx" ON "contact_page" USING btree ("hero_image_id");
  CREATE INDEX "mentions_legales_page_hero_hero_image_idx" ON "mentions_legales_page" USING btree ("hero_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
	await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "services_features" CASCADE;
  DROP TABLE "services_cta_section_benefits" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "realisations_features" CASCADE;
  DROP TABLE "realisations_cta_section_benefits" CASCADE;
  DROP TABLE "realisations" CASCADE;
  DROP TABLE "realisations_rels" CASCADE;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "third_party_access" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "homepage_values_values_list" CASCADE;
  DROP TABLE "homepage_philosophy_philosophy_points" CASCADE;
  DROP TABLE "homepage_philosophy_preferences" CASCADE;
  DROP TABLE "homepage_philosophy_refusals" CASCADE;
  DROP TABLE "homepage_intervention_zone_communes" CASCADE;
  DROP TABLE "homepage_tax_credit_steps" CASCADE;
  DROP TABLE "homepage_final_cta_benefits" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "prestations_page_tax_credit_eligibility_eligible_items" CASCADE;
  DROP TABLE "prestations_page_tax_credit_eligibility_non_eligible_items" CASCADE;
  DROP TABLE "prestations_page_cta_section_benefits" CASCADE;
  DROP TABLE "prestations_page" CASCADE;
  DROP TABLE "realisations_page_cta_section_benefits" CASCADE;
  DROP TABLE "realisations_page" CASCADE;
  DROP TABLE "faq_page_category_descriptions" CASCADE;
  DROP TABLE "faq_page_cta_section_benefits" CASCADE;
  DROP TABLE "faq_page" CASCADE;
  DROP TABLE "contact_page_form_section_garden_size_options" CASCADE;
  DROP TABLE "contact_page_contact_info_sidebar_benefits" CASCADE;
  DROP TABLE "contact_page" CASCADE;
  DROP TABLE "mentions_legales_page" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_services_category";
  DROP TYPE "public"."enum_realisations_category";
  DROP TYPE "public"."enum_faq_category";
  DROP TYPE "public"."enum_homepage_values_values_list_icon";
  DROP TYPE "public"."enum_homepage_philosophy_philosophy_points_icon";
  DROP TYPE "public"."enum_faq_page_category_descriptions_category";`)
}
