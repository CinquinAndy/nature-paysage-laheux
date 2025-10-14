# 🌿 Nature et Paysage Laheux

> Site web professionnel pour Jean-Luc Laheux, éco-paysagiste en Loire-Atlantique.
> Une plateforme moderne alliant performance, SEO et gestion de contenu simplifiée.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Payload CMS](https://img.shields.io/badge/Payload%20CMS-3.59.1-blue?style=flat-square)](https://payloadcms.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.14-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

🔗 **[nature-paysage-laheux.fr](https://nature-paysage-laheux.fr)**

---

## 📋 Table des matières

- [🎯 Vue d'ensemble](#-vue-densemble)
- [✨ Fonctionnalités principales](#-fonctionnalités-principales)
- [🎨 Stack technique](#-stack-technique)
- [🚀 Démarrage rapide](#-démarrage-rapide)
- [📁 Structure du projet](#-structure-du-projet)
- [🎭 Système d'animations](#-système-danimations)
- [🔌 Intégrations](#-intégrations)
- [📱 Fonctionnalités SEO](#-fonctionnalités-seo)
- [🛠️ Développement](#️-développement)
- [📦 Déploiement](#-déploiement)

---

## 🎯 Vue d'ensemble

**Nature et Paysage Laheux** est une application web full-stack moderne conçue pour présenter les services d'éco-paysagisme de Jean-Luc Laheux. Le projet combine un front en nextjs, et le CMS avec Payload.

### Objectifs du projet

- ✅ **Performance maximale** : SSG, optimisation des images, lazy loading
- ✅ **SEO optimisé** : Métadonnées dynamiques, sitemap, Open Graph
- ✅ **Animations fluides** : Motion (Framer Motion) avec déclenchement viewport
- ✅ **Gestion de contenu** : CMS headless avec Payload CMS 3.x
- ✅ **Accessibilité** : Composants accessibles, navigation au clavier
- ✅ **Responsive** : Mobile-first, adapté à tous les écrans

---

## ✨ Fonctionnalités principales

### 🎨 Frontend

- **Pages dynamiques** : Services, réalisations, FAQ avec contenu géré via CMS
- **Animations sophistiquées** : Transitions fluides, effets scroll-triggered avec Motion
- **Formulaire de contact** : Validation, auto-complétion d'adresse (API Gouv), envoi d'email
- **Galerie d'images** : Modal lightbox, navigation entre images
- **Zone d'intervention** : Carte interactive avec Leaflet et filtrage par communes
- **Crédit d'impôt** : Section dédiée avec onglets animés (éligible/non-éligible)

### 🎛️ Administration (Payload CMS)

- **Collections** :
  - **Services** : Gestion des prestations avec catégories, images, descriptions
  - **Réalisations** : Portfolio de projets avec galerie, témoignages clients
  - **FAQ** : Questions/réponses organisées par catégories
  - **Media Library** : Gestion centralisée des images avec stockage S3

- **Pages globales** :
  - **Homepage** : Toutes les sections éditables (hero, valeurs, philosophie, etc.)
  - **Prestations Page** : Introduction, CTA
  - **Réalisations Page** : Introduction, CTA
  - **FAQ Page** : Descriptions par catégorie
  - **Contact Page** : Formulaire personnalisable, bénéfices
  - **Site Settings** : Coordonnées, réseaux sociaux, horaires

### 🤖 IA et automatisation

- **Génération SEO** : Création automatique de métadonnées via Google Gemini
- **Alt text automatique** : Génération de descriptions d'images via Forvoyez API
- **Email transactionnel** : Templates React Email avec Resend

---

### Séparation Frontend / Admin

Le projet utilise **Next.js App Router** avec deux layouts distincts :

1. **`/src/app/(frontend)`** : Site public (SSG)
   - Layout personnalisé avec Header/Footer
   - Pages optimisées pour le SEO et la performance
   - Animations et interactions riches

2. **`/src/app/(payload)`** : Interface admin (SSR)
   - Dashboard Payload CMS accessible à `/admin`
   - Routes API à `/api`
   - Authentification intégrée

---

## 🎨 Stack technique

### Core

| Technologie | Version | Rôle |
|------------|---------|------|
| **Next.js** | 15.5.4 | Framework React avec App Router, SSG/SSR |
| **React** | 19.2.0 | Bibliothèque UI |
| **TypeScript** | 5.9.3 | Typage statique |
| **Tailwind CSS** | 4.1.14 | Styling utility-first |

### CMS & Base de données

| Technologie | Version | Rôle |
|------------|---------|------|
| **Payload CMS** | 3.59.1 | CMS headless |
| **PostgreSQL** | - | Base de données (via @payloadcms/db-postgres) |
| **AWS S3** | - | Stockage d'images (via @payloadcms/storage-s3) |

### UI & Animations

| Technologie | Version | Rôle |
|------------|---------|------|
| **Motion** | 12.23.24 | Animations fluides (version moderne de Framer Motion) |
| **Radix UI** | 1.x | Composants accessibles (Accordion, Dialog, Tabs, etc.) |
| **Lucide React** | 0.545.0 | Icônes |
| **Embla Carousel** | 8.6.0 | Carrousel d'images |
| **Leaflet** | 1.9.4 | Carte interactive |

### Intégrations & Services

| Service | Rôle |
|---------|------|
| **Resend** | Envoi d'emails transactionnels |
| **Google Gemini** | Génération de métadonnées SEO |
| **Forvoyez API** | Génération automatique d'alt text |
| **API Adresse Gouv** | Auto-complétion d'adresses |

### Développement

| Outil | Rôle |
|-------|------|
| **Biome** | Linter et formateur (remplace ESLint + Prettier) |
| **pnpm** | Gestionnaire de paquets |
| **Sharp** | Optimisation d'images |

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** : 18.20.2+ ou 20.9.0+
- **pnpm** : 9.x ou 10.x
- **PostgreSQL** : Base de données locale ou distante
- **Compte S3** : Pour le stockage d'images (AWS, Scaleway, etc.)

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/nature-paysage-laheux.git
cd nature-paysage-laheux

# Installer les dépendances
pnpm install

# Copier le fichier d'environnement
cp .env.example .env
```

### Configuration

Éditer le fichier `.env` :

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/nature_paysage

# Payload CMS
PAYLOAD_SECRET=votre-secret-securise-ici
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# S3 Storage
S3_ENDPOINT=https://s3.fr-par.scw.cloud
S3_REGION=fr-par
S3_BUCKET=nature-paysage-laheux
S3_ACCESS_KEY_ID=votre-access-key
S3_SECRET_ACCESS_KEY=votre-secret-key

# Email (Resend)
RESEND_TOKEN=re_votre_token_resend

# IA Services (optionnel)
GEMINI_API_KEY=votre-cle-gemini
FORVOYEZ_TOKEN=votre-token-forvoyez
```

### Lancer le projet

```bash
# Développement
pnpm dev

# Build production
pnpm build

# Démarrer en production
pnpm start
```

Le site sera accessible à :

- **Frontend** : [http://localhost:3000](http://localhost:3000)
- **Admin** : [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 📁 Structure du projet

```md
nature-paysage-laheux/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # Site public
│   │   │   ├── page.tsx          # Page d'accueil
│   │   │   ├── prestations/      # Services
│   │   │   ├── realisations/     # Portfolio
│   │   │   ├── contact/          # Contact
│   │   │   ├── faq/              # FAQ
│   │   │   ├── mentions-legales/ # Mentions légales
│   │   │   └── layout.tsx        # Layout avec Header/Footer
│   │   │
│   │   ├── (payload)/            # Admin Payload CMS
│   │   │   ├── admin/            # Interface admin
│   │   │   ├── api/              # Routes API
│   │   │   └── layout.tsx        # Layout admin
│   │   │
│   │   ├── robots.ts             # Robots.txt dynamique
│   │   └── sitemap.ts            # Sitemap dynamique
│   │
│   ├── components/
│   │   ├── animation/            # Composants d'animation
│   │   │   ├── animated-section.tsx
│   │   │   ├── animated-grid.tsx
│   │   │   └── animated-page-hero.tsx
│   │   │
│   │   ├── global/               # Composants globaux
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   │
│   │   ├── sections/             # Sections de pages
│   │   │   ├── home/
│   │   │   ├── shared/
│   │   │   ├── contact/
│   │   │   └── faq/
│   │   │
│   │   └── ui/                   # Composants UI réutilisables
│   │       ├── button.tsx
│   │       ├── tabs.tsx
│   │       ├── accordion.tsx
│   │       └── ...
│   │
│   ├── lib/
│   │   ├── animation/
│   │   │   └── variants.ts       # Variants d'animation Motion
│   │   │
│   │   ├── payload/              # Helpers Payload CMS
│   │   │   ├── get-homepage-data.ts
│   │   │   ├── get-services.ts
│   │   │   ├── get-realisations.ts
│   │   │   └── get-site-settings.ts
│   │   │
│   │   ├── seo/                  # Helpers SEO
│   │   │   └── generate-metadata.ts
│   │   │
│   │   └── utils.ts              # Fonctions utilitaires
│   │
│   ├── collections/              # Collections Payload CMS
│   │   ├── Services.ts
│   │   ├── Realisations.ts
│   │   ├── FAQ.ts
│   │   └── Media.ts
│   │
│   ├── globals/                  # Globals Payload CMS
│   │   ├── Homepage.ts
│   │   ├── SiteSettings.ts
│   │   ├── PrestationsPage.ts
│   │   └── ...
│   │
│   ├── actions/                  # Server Actions
│   │   └── contact.ts
│   │
│   ├── emails/                   # Templates d'emails
│   │   └── contact-notification.tsx
│   │
│   └── payload.config.ts         # Configuration Payload CMS
│
├── public/                       # Assets statiques
│   ├── logo.svg
│   ├── blob_bg.svg
│   └── usable/                   # Images du site
│
├── ANIMATIONS.md                 # Documentation animations
├── GUIDE_UTILISATION.md          # Guide CMS
└── README.md                     # Ce fichier
```

---

## 🎭 Système d'animations

Le projet utilise **Motion** (version moderne de Framer Motion) pour créer des animations fluides et performantes.

### Principes

1. **Viewport triggering** : Les animations se déclenchent quand l'élément entre dans le viewport
2. **GPU acceleration** : Utilisation exclusive de `opacity` et `transform`
3. **Variants réutilisables** : Bibliothèque centralisée dans `/src/lib/animation/variants.ts`
4. **Stagger effects** : Apparition progressive des listes et grids

### Composants d'animation

```tsx
import { AnimatedSection } from '@/components/animation/animated-section'
import { fadeInUp } from '@/lib/animation/variants'

// Animation simple
<AnimatedSection variants={fadeInUp}>
  <h2>Titre animé</h2>
</AnimatedSection>

// Grid avec stagger
<AnimatedGrid>
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</AnimatedGrid>
```

### Variants disponibles

- `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`
- `scaleIn`, `scaleInLarge`
- `staggerContainer`, `staggerItem`
- `heroText`, `imageReveal`
- `slidePanel`, `pageTransition`

---

## 🔌 Intégrations

### Envoi d'emails (Resend)

Les emails de contact sont envoyés via **Resend** avec des templates **React Email** :

```tsx
// src/emails/contact-notification.tsx
import { Html, Text, Button } from '@react-email/components'

export function ContactNotification({ name, email, message }) {
  return (
    <Html>
      <Text>Nouvelle demande de contact de {name}</Text>
      <Text>Email : {email}</Text>
      <Text>Message : {message}</Text>
    </Html>
  )
}
```

### Auto-complétion d'adresse

Le formulaire de contact utilise l'**API Adresse Gouv** pour l'auto-complétion :

```tsx
<AddressAutocomplete
  value={formData.address}
  onSelect={(address) => {
    setFormData({
      ...formData,
      address: address.properties.label,
      city: address.properties.city,
      postalCode: address.properties.postcode,
    })
  }}
/>
```

### Génération SEO avec IA

Les métadonnées SEO peuvent être générées automatiquement via **Google Gemini**

### Génération d'alt text

Les descriptions d'images sont générées automatiquement via **Forvoyez API**

---

## 📱 Fonctionnalités SEO

### Métadonnées dynamiques

Chaque page génère ses métadonnées via `generateMetadata()` :

```tsx
export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageData()

  return generateSEOMetadata(pageData, '/path', {
    title: pageData.seo?.title,
    description: pageData.seo?.description,
    keywords: pageData.seo?.keywords,
  })
}
```

### Open Graph et Twitter Cards

Génération automatique d'images OG pour chaque page :

```tsx
// src/app/(frontend)/prestations/[slug]/opengraph-image.tsx
export default async function Image({ params }) {
  const service = await getServiceBySlug(params.slug)

  return new ImageResponse(
    <div style={{ /* ... */ }}>
      <h1>{service.title}</h1>
      <img src={service.image} />
    </div>
  )
}
```

### Sitemap dynamique

```tsx
// src/app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getServices()
  const realisations = await getRealisations()

  return [
    { url: '/', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    ...services.map(s => ({ url: `/prestations/${s.slug}`, ... })),
    ...realisations.map(r => ({ url: `/realisations/${r.slug}`, ... })),
  ]
}
```

---

## 🛠️ Développement

### Scripts disponibles

```bash
# Développement
pnpm dev              # Lance le serveur de développement

# Build & Production
pnpm build            # Build de production
pnpm start            # Démarre le serveur de production

# Code quality
pnpm check            # Lint + format + fix (Biome)
pnpm lint             # Lint uniquement
pnpm format           # Format uniquement

# Payload CMS
pnpm generate:types   # Génère les types TypeScript depuis Payload
pnpm generate:importmap  # Génère l'import map pour les composants

# Emails
pnpm email            # Prévisualisation des emails (port 3001)
```

### Linting avec Biome

Le projet utilise **Biome** (remplaçant ESLint + Prettier) pour un linting ultra-rapide :

```json
// biome.json
{
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "lineWidth": 120
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  }
}
```

### Types TypeScript

Les types Payload CMS sont générés automatiquement :

```bash
pnpm generate:types
# Génère : src/payload-types.ts
```

---

## 📦 Déploiement

### Variables d'environnement en production

Assurez-vous de définir toutes les variables d'environnement sur votre plateforme :

```env
# Production
NODE_ENV=production
NEXT_PUBLIC_SERVER_URL=https://nature-paysage-laheux.fr

# Database
DATABASE_URL=postgresql://...

# Payload CMS
PAYLOAD_SECRET=***

# S3 Storage
S3_ENDPOINT=***
S3_BUCKET=***
S3_ACCESS_KEY_ID=***
S3_SECRET_ACCESS_KEY=***

# Services
RESEND_TOKEN=***
GEMINI_API_KEY=*** (optionnel)
FORVOYEZ_TOKEN=*** (optionnel)
```

---

## 👨‍💻 Développé par

**Andy Cinquin**
🌐 [andy-cinquin.fr](https://andy-cinquin.fr)
