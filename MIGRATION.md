# 📦 Guide de Migration et Export des Données Payload

Ce document explique comment gérer les données de votre CMS Payload.

## 🔐 Prérequis

Tous les endpoints nécessitent la variable d'environnement `PAYLOAD_SECRET` pour des raisons de sécurité.

```bash
# Vérifier que PAYLOAD_SECRET est défini
grep PAYLOAD_SECRET .env
```

## 📥 Importer des Données

### Option 1 : Via API (Recommandé)

```bash
# En développement
curl "http://localhost:3000/api/migrate-all?secret=YOUR_PAYLOAD_SECRET"

# Ou directement depuis le navigateur
http://localhost:3000/api/migrate-all?secret=YOUR_PAYLOAD_SECRET
```

**Ce qui est importé :**
- ✅ 6 Services (prestations)
- ✅ 6 Réalisations
- ✅ 16 Questions FAQ
- ✅ Homepage (toutes les sections)
- ✅ Site Settings (contact, horaires, etc.)
- ✅ Tous les globals de pages
- ✅ Upload automatique des images vers S3

**Détection de doublons :**
Le script vérifie automatiquement si les données existent déjà et les saute pour éviter les doublons.

### Option 2 : Via Script CLI

```bash
pnpm tsx src/scripts/migrate-data.ts
```

### Option 3 : Via Ancien Endpoint

```bash
curl -X POST http://localhost:3000/api/migrate
```

## 💾 Exporter des Données (Backup)

### Via API

```bash
# Créer un backup de toutes les données
curl "http://localhost:3000/api/export-data?secret=YOUR_PAYLOAD_SECRET"
```

**Résultat :**
```json
{
  "success": true,
  "message": "Data exported successfully",
  "filename": "payload-backup-2025-10-13.json",
  "filepath": "/backups/payload-backup-2025-10-13.json",
  "stats": {
    "services": 6,
    "realisations": 6,
    "faq": 16,
    "media": 16,
    "users": 1
  }
}
```

**Le fichier de backup contient :**
- Toutes les collections avec leurs relations (depth: 2)
- Tous les globals
- Métadonnées d'export (date, version)

**Emplacement :** `/backups/payload-backup-YYYY-MM-DD.json`

## 📂 Structure des Fichiers de Migration

```
src/
├── app/api/
│   ├── migrate/route.ts           # Ancien endpoint de migration
│   ├── migrate-all/route.ts       # Nouveau endpoint optimisé
│   └── export-data/route.ts       # Endpoint d'export/backup
├── scripts/
│   └── migrate-data.ts            # Script CLI de migration
└── lib/data/
    ├── services.ts                # Données sources services
    ├── realisations.ts            # Données sources réalisations
    ├── faq.ts                     # Données sources FAQ
    └── contact-info.ts            # Données sources contact
```

## 🖼️ Gestion des Images

### Images Sources

Les images sont dans `/public/clean_images/` :
- `background.webp` - Hero background homepage
- `jardin_paysagiste_travail.webp` - Philosophy section
- `ex1.webp` à `ex9.webp` - Services et réalisations
- `abeille.webp`, `copeau_de_bois.webp`, etc.

### Upload vers S3

Lors de la migration, les images sont automatiquement :
1. Lues depuis `/public/clean_images/`
2. Uploadées vers S3 via Payload
3. Liées aux collections Services/Realisations

## 🔄 Workflow Recommandé

### 1. Développement Local

```bash
# 1. Réinitialiser la DB (attention: efface tout)
pnpm run payload migrate:fresh --force

# 2. Importer les données
curl "http://localhost:3000/api/migrate-all?secret=YOUR_SECRET"

# 3. Vérifier dans l'admin
http://localhost:3000/admin
```

### 2. Sauvegarder Régulièrement

```bash
# Créer un backup avant modifications importantes
curl "http://localhost:3000/api/export-data?secret=YOUR_SECRET"
```

### 3. Production

En production, utilisez l'admin Payload pour gérer le contenu.
Les backups peuvent être automatisés via un cron job.

## 🎨 Personnalisation du Contenu

### Support des Retours à la Ligne

Dans tous les champs `textarea` de Payload, vous pouvez utiliser `\n` pour créer des retours à la ligne :

**Exemple :**
```
Première ligne\nDeuxième ligne\nTroisième ligne
```

**S'affichera comme :**
```
Première ligne
Deuxième ligne
Troisième ligne
```

### Support du Texte en Gras

Dans certains champs (titres), utilisez `**texte**` pour mettre en gras :

**Exemple :**
```
Une Approche **Écologique** et Sur-Mesure
```

## 📋 Checkliste Avant Production

- [ ] Toutes les données sont migrées
- [ ] Les images sont uploadées sur S3
- [ ] Un backup a été créé
- [ ] Le contenu a été vérifié dans l'admin
- [ ] Les variables d'environnement de production sont configurées
- [ ] Les migrations ont été appliquées en production

## 🆘 Dépannage

### Erreur "Unauthorized" lors de l'export

Vérifiez que `PAYLOAD_SECRET` est bien défini dans `.env`

### Images non uploadées

Vérifiez que les chemins d'images dans `services.ts` et `realisations.ts` correspondent aux fichiers dans `/public/clean_images/`

### Doublons créés

Les scripts vérifient les doublons par `slug` pour Services/Realisations et par `question` pour FAQ. Si vous avez des doublons, supprimez-les manuellement via l'admin.

## 🔗 Endpoints API

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/migrate-all` | GET/POST | Import complet avec détection doublons |
| `/api/migrate` | POST | Ancien endpoint de migration |
| `/api/export-data` | GET/POST | Export/backup de toutes les données |

Tous nécessitent `?secret=PAYLOAD_SECRET` en query parameter.

