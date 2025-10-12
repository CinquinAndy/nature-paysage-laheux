# Guide de Migration des Données vers Payload CMS

Ce guide explique comment migrer toutes les données existantes du site vers Payload CMS.

## 📋 Pré-requis

1. **Base de données PostgreSQL** configurée et accessible
2. **Payload CMS** correctement configuré dans `src/payload.config.ts`
3. **Variables d'environnement** configurées dans `.env`
4. **Server Payload** en cours d'exécution

## 🚀 Étapes de Migration

### 1. Démarrer le serveur Payload

Avant de lancer la migration, assurez-vous que le serveur Next.js/Payload est en cours d'exécution :

```bash
pnpm dev
```

Le serveur devrait être accessible sur `http://localhost:3002`

### 2. Créer un utilisateur admin (première fois uniquement)

Si c'est la première fois que vous utilisez Payload, vous devez créer un utilisateur admin :

1. Accédez à `http://localhost:3002/admin`
2. Cliquez sur "Create your first user"
3. Remplissez le formulaire :
   - **Email** : votre email
   - **Password** : un mot de passe sécurisé
   - **Confirm Password** : confirmation
4. Cliquez sur "Create"

### 3. Lancer la migration

Dans un **nouveau terminal** (pendant que le serveur dev tourne), exécutez :

```bash
pnpm migrate
```

Le script va :
1. ✅ Uploader toutes les images depuis `/public/usable/` vers la collection Media
2. ✅ Créer tous les **Services** (6 prestations)
3. ✅ Créer toutes les **Réalisations** (6 projets)
4. ✅ Créer toutes les **FAQ** (16 questions)
5. ✅ Populer le **Global Homepage** avec toutes les sections
6. ✅ Populer le **Global Site Settings** avec contact info, navigation, footer
7. ✅ Populer tous les autres **Globals** (Prestations Page, FAQ Page, Contact Page, etc.)

### 4. Vérifier les données migrées

Une fois la migration terminée, vous pouvez vérifier les données dans l'admin Payload :

1. **Collections** :
   - `http://localhost:3002/admin/collections/services` (6 services)
   - `http://localhost:3002/admin/collections/realisations` (6 réalisations)
   - `http://localhost:3002/admin/collections/faq` (16 questions)
   - `http://localhost:3002/admin/collections/media` (toutes les images)

2. **Globals** :
   - `http://localhost:3002/admin/globals/homepage`
   - `http://localhost:3002/admin/globals/site-settings`
   - `http://localhost:3002/admin/globals/prestations-page`
   - `http://localhost:3002/admin/globals/realisations-page`
   - `http://localhost:3002/admin/globals/faq-page`
   - `http://localhost:3002/admin/globals/contact-page`
   - `http://localhost:3002/admin/globals/mentions-legales-page`

## 📊 Ce qui est migré

### Collections

#### Services (6 entrées)
- Tonte & Entretien de Pelouse Écologique
- Désherbage Manuel & Naturel
- Taille Raisonnée de Haies & Arbustes
- Potager Écologique & Permaculture
- Entretien Naturel des Massifs
- Accompagnement Sur-Mesure

#### Réalisations (6 entrées)
- Entretien de pelouse naturelle (Monnières)
- Taille raisonnée de haies (Vignoble Nantais)
- Aménagement paysager écologique (Clisson)
- Potager en permaculture (La Haie-Fouassière)
- Entretien de massifs fleuris (Haute-Goulaine)
- Jardin naturel entretenu (Vallée de la Loire)

#### FAQ (16 entrées)
- 4 catégories : Général, Services, Tarifs, Écologie
- Les 4 premières FAQ marquées pour affichage sur la homepage

### Globals

#### Homepage
9 sections complètes :
1. **Hero** : Background image, titre avec mot en gras, subtitle
2. **Values** : 4 valeurs avec icônes (Respect Nature, Travail Artisanal, Expertise Locale, Crédit Impôt)
3. **Services Preview** : Titre, subtitle, CTA (services viennent de la collection)
4. **Philosophy** : Titre, intro, quote, image, 4 philosophy points, listes préférences/refus, engagement banner
5. **Intervention Zone** : Titre, subtitle, config carte (lat/lng/radius), 15 communes, CTA
6. **Réalisations Preview** : Titre, description, CTA (réalisations viennent de la collection)
7. **FAQ Short** : Titre, description, CTA (4 premières FAQ de la collection)
8. **Tax Credit** : Titre, subtitle, 4 étapes du processus
9. **Final CTA** : Titre, description, bouton, 4 bénéfices

#### Site Settings
- **Contact** : Téléphone, email, entreprise, adresse, réseaux sociaux, horaires
- **Tax Credit** : Pourcentage (50%), plafonds, étapes, exemple de calcul
- **Navigation** : Menu principal (5 liens) + CTA button
- **Footer** : Logo alt, tagline, copyright, développeur
- **SEO** : Titre et description par défaut

#### Autres Pages
- **Prestations Page** : Hero, section crédit d'impôt (prestations éligibles/non-éligibles), CTA
- **Realisations Page** : Hero, introduction, CTA
- **FAQ Page** : Hero, descriptions par catégorie, CTA
- **Contact Page** : Hero, config formulaire (options surface jardin), sidebar benefits
- **Mentions Legales Page** : Hero, contenu complet rich text
- **Prestations Detail Template** : Sections templates pour pages dynamiques
- **Realisations Detail Template** : Sections templates pour pages dynamiques

## 🎨 Format des Données

### Rich Text (Lexical)
Tous les champs `richText` utilisent le format Lexical JSON. Le script convertit automatiquement :
- Texte simple → Paragraphes Lexical
- `**mot**` → Texte en gras

### Images
Toutes les images de `/public/usable/` sont uploadées vers la collection Media et les IDs sont utilisés dans les relations.

### Slugs
- **Services** : utilisent les IDs existants comme slug (ex: `tonte-pelouse`)
- **Réalisations** : utilisent les IDs existants comme slug (ex: `entretien-pelouse-monnieres`)

## 🔧 Troubleshooting

### Erreur : "Cannot find module @payload-config"
→ Assurez-vous que le serveur dev est en cours d'exécution avant de lancer la migration.

### Erreur : "Image not found"
→ Certaines images peuvent manquer dans `/public/usable/`. Le script continuera avec un warning.

### Erreur : "Connection refused"
→ Vérifiez que PostgreSQL est démarré et que les variables d'environnement sont correctes.

### Données dupliquées
Si vous relancez la migration, les données seront dupliquées. Pour nettoyer :
1. Accédez à l'admin Payload
2. Supprimez manuellement les entrées en double
OU
3. Utilisez l'outil de reset de la base de données :
```bash
pnpm payload migrate:reset
```

## 📝 Notes Importantes

1. **Ne pas interrompre** la migration en cours
2. **Vérifier les logs** pour détecter d'éventuelles erreurs
3. **Tester l'admin** après migration pour s'assurer que tout est correct
4. **Sauvegarder la base de données** avant de relancer la migration

## 🎯 Prochaines Étapes

Après la migration réussie :

1. ✅ Tester l'interface admin Payload
2. ✅ Modifier quelques entrées pour vérifier le bon fonctionnement
3. ✅ Mettre à jour les composants React pour fetch depuis Payload au lieu de `/lib/data/`
4. ✅ Tester le rendu frontend avec les données Payload
5. ✅ Déployer en production

---

**Auteur** : Andy Cinquin
**Date** : 2025-01-12
**Version Payload** : 3.59.1
