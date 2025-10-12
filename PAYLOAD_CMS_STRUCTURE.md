# Structure Payload CMS - Nature & Paysage Laheux

Ce document détaille l'architecture complète des Collections et Globals pour le CMS Payload.

---

## 📚 **Collections** (Contenu Réutilisable)

### 1. **Collection: Services**

Toutes les prestations offertes (utilisées sur plusieurs pages)

**Champs:**

- `title` (text, required) - Titre du service
- `slug` (text, required, unique) - URL slug
- `shortDescription` (textarea) - Description courte pour les cartes
- `fullDescription` (richText) - Description complète
- `image` (upload → media) - Image principale
- `category` (select: 'entretien', 'creation', 'accompagnement')
- `features` (array) - Liste des caractéristiques
  - `feature` (text)
- `eligibleTaxCredit` (checkbox, default: true)
- `price` (text, default: "Sur devis personnalisé")
- `order` (number) - Ordre d'affichage

**Utilisé dans:**

- Page d'accueil (ServicesPreviewSection)
- Page /prestations
- Page /prestations/[slug]
- Footer

---

### 2. **Collection: Realisations**

Portfolio des réalisations client (utilisées sur plusieurs pages)

**Champs:**

- `title` (text, required) - Titre de la réalisation
- `slug` (text, required, unique) - URL slug
- `location` (text) - Ville/commune
- `date` (date) - Date de réalisation
- `image` (upload → media) - Image principale
- `shortDescription` (textarea) - Description courte
- `description` (richText) - Description complète
- `category` (select: 'entretien', 'amenagement', 'potager', 'taille')
- `features` (array) - Caractéristiques clés
  - `feature` (text)
- `images` (array) - Galerie d'images supplémentaires
  - `image` (upload → media)
- `testimonial` (group) - Témoignage client
  - `quote` (textarea)
  - `author` (text)
  - `location` (text)

**Utilisé dans:**

- Page d'accueil (RealisationsPreviewSection)
- Page /realisations
- Page /realisations/[id]
- Footer

---

### 3. **Collection: FAQ**

Questions fréquentes (réutilisables sur plusieurs pages)

**Champs:**

- `question` (text, required) - La question
- `answer` (richText) - La réponse détaillée
- `category` (select, required)
  - 'general' → Questions Générales
  - 'services' → Prestations & Services
  - 'tarifs' → Tarifs & Crédit d'Impôt
  - 'ecologie' → Approche Écologique
- `order` (number) - Ordre d'affichage
- `showOnHomepage` (checkbox) - Afficher sur la page d'accueil

**Utilisé dans:**

- Page d'accueil (FaqShortSection - top 4)
- Page /faq (toutes, groupées par catégorie)

---

## 🌍 **Globals** (Singletons)

### 1. **Global: Homepage**

Configuration de la page d'accueil

#### **Section: Hero**

```javascript
{
  name: 'hero',
  type: 'group',
  fields: [
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'imageAlt', type: 'text' },
    { 
      name: 'title', 
      type: 'richText',
      admin: { description: 'Utiliser le rich text pour le mot accentué avec le blob' }
    },
    { name: 'subtitle', type: 'text' }
  ]
}
```

**Contenu actuel:**

- Image: `/usable/bg.jpg`
- Titre: "**Transformez** Votre Jardin, Votre Paysagiste d'Exception en Loire-Atlantique"

---

#### **Section: Values**

```javascript
{
  name: 'values',
  type: 'group',
  fields: [
    { name: 'sectionTitle', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'imageAlt', type: 'text' },
    {
      name: 'valuesList',
      type: 'array',
      fields: [
        { 
          name: 'icon', 
          type: 'select', 
          options: [
            { label: 'Feuille (Leaf)', value: 'leaf' },
            { label: 'Outil (Wrench)', value: 'wrench' },
            { label: 'Carte (MapPin)', value: 'map-pin' },
            { label: 'Tendance (TrendingDown)', value: 'trending-down' }
          ]
        },
        { name: 'number', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true }
      ]
    }
  ]
}
```

**Contenu actuel:**

- Titre: "Une Approche Écologique et Sur-Mesure"
- Image: `/usable/bg.jpg`
- 4 valeurs:
  1. Respect de la Nature (01)
  2. Travail Artisanal (02)
  3. Expertise Locale (03)
  4. 50% de Crédit d'Impôt (04)

---

#### **Section: Services Preview**

```javascript
{
  name: 'servicesPreview',
  type: 'group',
  fields: [
    { name: 'title', type: 'text', defaultValue: "Mes Prestations d'Entretien de Jardin" },
    { name: 'subtitle', type: 'text', defaultValue: "Toutes mes prestations bénéficient de 50% de réduction d'impôt" },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Voir Toutes Mes Prestations' },
    { name: 'ctaUrl', type: 'text', defaultValue: '/prestations' }
  ]
}
```

**Note:** Les services affichés viennent de la **Collection Services**

---

#### **Section: Philosophy**

```javascript
{
  name: 'philosophy',
  type: 'group',
  fields: [
    { name: 'title', type: 'richText' },
    { name: 'introText', type: 'textarea' },
    { name: 'quote', type: 'text' },
    { name: 'primaryImage', type: 'upload', relationTo: 'media' },
    { name: 'imageAlt', type: 'text' },
    { name: 'imageOverlayTitle', type: 'text' },
    { name: 'imageOverlayDescription', type: 'textarea' },
    {
      name: 'philosophyPoints',
      label: 'Points de philosophie (4 cartes)',
      type: 'array',
      maxRows: 4,
      fields: [
        { 
          name: 'icon', 
          type: 'select', 
          options: [
            { label: 'Feuille (Leaf)', value: 'leaf' },
            { label: 'Coeur (Heart)', value: 'heart' },
            { label: 'Récompense (Award)', value: 'award' },
            { label: 'Bouclier (Shield)', value: 'shield' }
          ]
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true }
      ]
    },
    {
      name: 'preferences',
      label: 'Ce que je privilégie',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text' }
      ]
    },
    {
      name: 'refusals',
      label: 'Ce que je refuse',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'text' }
      ]
    },
    {
      name: 'engagementBanner',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ctaLabel', type: 'text' },
        { name: 'ctaUrl', type: 'text', defaultValue: '/contact' }
      ]
    }
  ]
}
```

**Contenu actuel:**

- Titre: "Mon Approche : **Nature & Respect**"
- Intro: "Passionné par le végétal et la biodiversité..."
- Quote: "travailler AVEC la nature, pas contre elle."
- 4 philosophy points (Méthodes Naturelles, Respect des Cycles, Valorisation, Engagement Qualité)
- 4 préférences (désherbage manuel, engrais bio, paillage, permaculture)
- 3 refus (phytosanitaires, désherbants chimiques, méthodes intensives)

---

#### **Section: Intervention Zone**

```javascript
{
  name: 'interventionZone',
  type: 'group',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'subtitle', type: 'text' },
    { name: 'mapCenterLat', type: 'number', defaultValue: 47.1339 },
    { name: 'mapCenterLng', type: 'number', defaultValue: -1.3433 },
    { name: 'radiusKm', type: 'number', defaultValue: 20 },
    {
      name: 'communes',
      label: 'Principales communes',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true }
      ]
    },
    {
      name: 'ctaSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ctaLabel', type: 'text' },
        { name: 'ctaUrl', type: 'text', defaultValue: '/contact' }
      ]
    }
  ]
}
```

**Contenu actuel:**

- Titre: "Zone d'Intervention en Loire-Atlantique"
- Subtitle: "Basé à Monnières, j'interviens dans un rayon de 20 km"
- 15 communes principales
- CTA: "Votre commune n'est pas dans la liste ?"

---

#### **Section: Realisations Preview**

```javascript
{
  name: 'realisationsPreview',
  type: 'group',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Découvrez Mes Réalisations' },
    { name: 'description', type: 'textarea' },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Voir Toutes Mes Réalisations' },
    { name: 'ctaUrl', type: 'text', defaultValue: '/realisations' }
  ]
}
```

**Note:** Les réalisations affichées viennent de la **Collection Realisations** (galerie de 6)

---

#### **Section: FAQ Short**

```javascript
{
  name: 'faqShort',
  type: 'group',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Questions Fréquentes' },
    { name: 'description', type: 'textarea' },
    { name: 'ctaLabel', type: 'text', defaultValue: 'Voir Toutes les Questions' },
    { name: 'ctaUrl', type: 'text', defaultValue: '/faq' }
  ]
}
```

**Note:** Les 4 premières FAQ viennent de la **Collection FAQ** (filtré par `showOnHomepage = true`)

---

#### **Section: Tax Credit**

```javascript
{
  name: 'taxCredit',
  type: 'group',
  fields: [
    { name: 'title', type: 'text', defaultValue: "Comment Profiter de 50% de Réduction d'Impôt ?" },
    { name: 'subtitle', type: 'text' },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'number', type: 'number', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'image1', type: 'upload', relationTo: 'media' },
        { name: 'image2', type: 'upload', relationTo: 'media' }
      ]
    }
  ]
}
```

**Contenu actuel:**

- 4 étapes du processus de crédit d'impôt

---

#### **Section: Final CTA**

```javascript
{
  name: 'finalCta',
  type: 'group',
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Prêt à Redonner Vie à Votre Jardin ?' },
    { name: 'description', type: 'textarea' },
    { name: 'buttonText', type: 'text', defaultValue: 'Demander un Devis Gratuit' },
    { name: 'buttonUrl', type: 'text', defaultValue: '/contact' },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        { name: 'benefit', type: 'text', required: true }
      ]
    }
  ]
}
```

**Contenu actuel:**

- 4 avantages listés

---

### 2. **Global: Prestations Page**

Configuration de la page /prestations

```javascript
{
  slug: 'prestations-page',
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Mes Prestations Écologiques' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageAlt', type: 'text' }
      ]
    },
    {
      name: 'taxCreditEligibility',
      label: 'Section Crédit d\'Impôt',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: "Crédit d'Impôt : Ce Qui Est Pris en Charge" },
        { name: 'description', type: 'textarea' },
        {
          name: 'eligibleItems',
          label: 'Prestations éligibles',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'text' }
          ]
        },
        {
          name: 'nonEligibleItems',
          label: 'Prestations non éligibles',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'text' }
          ]
        },
        { name: 'eligibleImage', type: 'upload', relationTo: 'media' },
        { name: 'nonEligibleImage', type: 'upload', relationTo: 'media' }
      ]
    },
    {
      name: 'ctaSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'buttonText', type: 'text' },
        { name: 'buttonUrl', type: 'text', defaultValue: '/contact' },
        {
          name: 'benefits',
          type: 'array',
          fields: [{ name: 'benefit', type: 'text' }]
        }
      ]
    }
  ]
}
```

**Contenu actuel:**

- Hero: "Mes Prestations Écologiques"
- 7 prestations éligibles
- 6 prestations non éligibles
- CTA: "Une Prestation Vous Intéresse ?"

**Note:** Les services eux-mêmes viennent de la **Collection Services**

---

### 3. **Global: Prestations Detail Template**

Template pour les pages /prestations/[slug]

```javascript
{
  slug: 'prestations-detail-template',
  fields: [
    {
      name: 'approachSection',
      label: 'Section "Approche écologique"',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Une approche écologique et respectueuse' },
        { name: 'description', type: 'richText' }
      ]
    },
    {
      name: 'pricingSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Tarification' },
        { name: 'description', type: 'textarea' }
      ]
    },
    {
      name: 'ctaSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Intéressé par cette prestation ?' },
        { name: 'description', type: 'textarea' },
        { name: 'buttonText', type: 'text', defaultValue: 'Demander un devis gratuit' },
        { name: 'buttonUrl', type: 'text', defaultValue: '/contact' }
      ]
    }
  ]
}
```

**Contenu actuel:**

- Sections statiques + contenu dynamique depuis **Collection Services**

---

### 4. **Global: Realisations Page**

Configuration de la page /realisations

```javascript
{
  slug: 'realisations-page',
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Mes Réalisations en Loire-Atlantique' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageAlt', type: 'text' }
      ]
    },
    {
      name: 'introduction',
      type: 'group',
      fields: [
        { name: 'paragraph1', type: 'textarea' },
        { name: 'paragraph2', type: 'richText' }
      ]
    },
    {
      name: 'ctaSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Envie du Même Résultat Pour Votre Jardin ?' },
        { name: 'description', type: 'textarea' },
        { name: 'buttonText', type: 'text' },
        { name: 'buttonUrl', type: 'text', defaultValue: '/contact' },
        {
          name: 'benefits',
          type: 'array',
          fields: [{ name: 'benefit', type: 'text' }]
        }
      ]
    }
  ]
}
```

**Contenu actuel:**

- Introduction: "Chaque jardin est unique et raconte une histoire..."
- CTA: "Envie du Même Résultat Pour Votre Jardin ?"

**Note:** Les réalisations affichées viennent de la **Collection Realisations**

---

### 5. **Global: Realisations Detail Template**

Template pour les pages /realisations/[id]

```javascript
{
  slug: 'realisations-detail-template',
  fields: [
    {
      name: 'processSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Une approche écologique et respectueuse' },
        { name: 'description', type: 'richText' }
      ]
    },
    {
      name: 'taxCreditInfo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: "Bénéficiez de 50% de crédit d'impôt" },
        { name: 'description', type: 'textarea' }
      ]
    },
    {
      name: 'testimonialSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Le mot du client' },
        { name: 'defaultTestimonial', type: 'richText' },
        { name: 'defaultAuthor', type: 'text' }
      ]
    },
    {
      name: 'ctaSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Un projet similaire ?' },
        { name: 'description', type: 'textarea' },
        { name: 'buttonText', type: 'text' },
        { name: 'buttonUrl', type: 'text', defaultValue: '/contact' }
      ]
    }
  ]
}
```

**Contenu actuel:**

- Contenu statique + contenu dynamique depuis **Collection Realisations**

---

### 6. **Global: FAQ Page**

Configuration de la page /faq

```javascript
{
  slug: 'faq-page',
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Questions Fréquentes' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageAlt', type: 'text' }
      ]
    },
    {
      name: 'categoryDescriptions',
      label: 'Descriptions par catégorie',
      type: 'array',
      fields: [
        { 
          name: 'category', 
          type: 'select',
          options: ['general', 'services', 'tarifs', 'ecologie']
        },
        { name: 'description', type: 'textarea' }
      ]
    },
    {
      name: 'ctaSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Une Autre Question ?' },
        { name: 'description', type: 'textarea' },
        { name: 'buttonText', type: 'text', defaultValue: 'Me Contacter' },
        { name: 'buttonUrl', type: 'text', defaultValue: '/contact' },
        {
          name: 'benefits',
          type: 'array',
          fields: [{ name: 'benefit', type: 'text' }]
        }
      ]
    }
  ]
}
```

**Contenu actuel:**

- Hero: "Questions Fréquentes"
- Questions groupées par catégorie (depuis **Collection FAQ**)
- CTA: "Une Autre Question ?"

---

### 7. **Global: Contact Page**

Configuration de la page /contact

```javascript
{
  slug: 'contact-page',
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Contactez-Moi' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageAlt', type: 'text' }
      ]
    },
    {
      name: 'formSection',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Parlons de Votre Jardin' },
        { name: 'subtitle', type: 'text' },
        {
          name: 'gardenSizeOptions',
          label: 'Options de surface de jardin',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'value', type: 'text', required: true }
          ]
        },
        { name: 'privacyText', type: 'textarea' }
      ]
    },
    {
      name: 'contactInfoSidebar',
      type: 'group',
      fields: [
        {
          name: 'benefits',
          type: 'array',
          fields: [{ name: 'benefit', type: 'text' }]
        }
      ]
    }
  ]
}
```

**Contenu actuel:**

- Hero: "Contactez-Moi"
- Formulaire: nom, email, téléphone, adresse, surface jardin, message
- Sidebar: infos de contact (depuis **Global SiteSettings**)
- 4 bénéfices listés

---

### 8. **Global: Mentions Legales Page**

Configuration de la page /mentions-legales

```javascript
{
  slug: 'mentions-legales-page',
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Mentions Légales' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageAlt', type: 'text' }
      ]
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Contenu complet des mentions légales en rich text'
      }
    }
  ]
}
```

**Contenu actuel:**

- Toutes les sections de mentions légales:
  - Éditeur du site
  - Agrément Services à la Personne
  - Hébergement
  - Création du site
  - Droit d'auteur
  - Crédits photographiques
  - Protection des données personnelles
  - Limitation de responsabilité
  - Droit applicable

---

### 9. **Global: Site Settings**

Configuration globale du site

```javascript
{
  slug: 'site-settings',
  fields: [
    // === CONTACT INFO ===
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        {
          name: 'company',
          type: 'group',
          fields: [
            { name: 'name', type: 'text', defaultValue: 'SASU Nature et Paysage Laheux' },
            { name: 'representative', type: 'text', defaultValue: 'Jean-Luc Laheux' },
            { name: 'legalForm', type: 'text', defaultValue: 'SASU' }
          ]
        },
        {
          name: 'address',
          type: 'group',
          fields: [
            { name: 'postalCode', type: 'text' },
            { name: 'city', type: 'text' },
            { name: 'region', type: 'text' },
            { name: 'country', type: 'text', defaultValue: 'France' }
          ]
        },
        {
          name: 'social',
          type: 'group',
          fields: [
            { name: 'facebook', type: 'text' },
            { name: 'linkedin', type: 'text' }
          ]
        },
        {
          name: 'hours',
          type: 'group',
          fields: [
            { name: 'weekday', type: 'text' },
            { name: 'saturday', type: 'text' },
            { name: 'sunday', type: 'text' },
            { name: 'note', type: 'textarea' }
          ]
        }
      ]
    },

    // === TAX CREDIT INFO ===
    {
      name: 'taxCredit',
      type: 'group',
      fields: [
        { name: 'percentage', type: 'number', defaultValue: 50 },
        { name: 'maxAnnualExpense', type: 'number', defaultValue: 12000 },
        { name: 'maxAnnualCredit', type: 'number', defaultValue: 6000 },
        {
          name: 'steps',
          label: 'Étapes pour bénéficier du crédit d\'impôt',
          type: 'array',
          fields: [
            { name: 'number', type: 'number', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' }
          ]
        },
        {
          name: 'example',
          type: 'group',
          fields: [
            { name: 'serviceCost', type: 'number' },
            { name: 'taxCredit', type: 'number' },
            { name: 'realCost', type: 'number' }
          ]
        }
      ]
    },

    // === NAVIGATION ===
    {
      name: 'navigation',
      type: 'group',
      fields: [
        {
          name: 'mainMenu',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true }
          ]
        },
        {
          name: 'ctaButton',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Devis Gratuit' },
            { name: 'url', type: 'text', defaultValue: '/contact' }
          ]
        }
      ]
    },

    // === FOOTER ===
    {
      name: 'footer',
      type: 'group',
      fields: [
        { name: 'logoAlt', type: 'text' },
        { name: 'tagline', type: 'text' },
        { name: 'copyrightText', type: 'text' },
        { name: 'developerName', type: 'text' },
        { name: 'developerUrl', type: 'text' }
      ]
    },

    // === SEO DEFAULT ===
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'siteTitle', type: 'text' },
        { name: 'siteDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' }
      ]
    }
  ]
}
```

**Contenu actuel:**

- Téléphone: 06 31 04 34 45
- Email: <nature.paysage.laheux@gmail.com>
- Adresse: 44690 Monnières
- Réseaux sociaux
- Horaires d'intervention
- Crédit d'impôt: 50%, max 12000€
- Navigation: 5 liens + CTA
- Footer info

---

## 🗂️ **Résumé de l'Architecture**

### **Collections (3)**

1. **Services** - Prestations réutilisables
2. **Realisations** - Portfolio client
3. **FAQ** - Questions fréquentes

### **Globals (9)**

1. **Homepage** - Page d'accueil complète
2. **Prestations Page** - Page liste des prestations
3. **Prestations Detail Template** - Template page détail prestation
4. **Realisations Page** - Page liste des réalisations
5. **Realisations Detail Template** - Template page détail réalisation
6. **FAQ Page** - Page FAQ complète
7. **Contact Page** - Page contact
8. **Mentions Legales Page** - Page mentions légales
9. **Site Settings** - Configuration globale du site

---

## 🎯 **Avantages de cette Architecture**

### ✅ **Simple & Pragmatique**

- Pas de sur-engineering
- 3 collections seulement (Service, Realisation, FAQ)
- Globals pour tout le reste

### ✅ **Maintenable**

- Structure claire pour 2-3 développeurs
- Séparation logique contenu réutilisable / pages statiques
- Facile à comprendre pour un client non-dev

### ✅ **Flexible**

- Services et Réalisations réutilisables partout
- FAQ avec catégories et filtre homepage
- Globals permettent de tout personnaliser sans toucher au code

### ✅ **Pas de Duplication**

- Les données réutilisables sont en Collections
- Les textes/configs de page sont en Globals
- Pas de données dupliquées

---

## 📋 **Ce qui est modifiable par le client**

### **Modifiable facilement:**

✅ Tous les textes de toutes les pages
✅ Toutes les images
✅ Tous les services (ajout/modification/suppression)
✅ Toutes les réalisations (ajout/modification/suppression)
✅ Toutes les FAQ (ajout/modification/suppression)
✅ Infos de contact (téléphone, email, horaires)
✅ Réseaux sociaux
✅ Crédit d'impôt (pourcentages, plafonds, étapes)
✅ Navigation (liens, labels)
✅ Textes CTA
✅ Mentions légales

### **NON modifiable (UI/UX fixe):**

❌ Structure des pages
❌ Layout des composants
❌ Animations
❌ Design system
❌ Responsive behavior
❌ Ordre des sections (peut être géré avec un field `order` si besoin futur)

---

## 🚀 **Prochaines Étapes**

1. Créer les 3 Collections (Services, Realisations, FAQ)
2. Créer les 9 Globals
3. Migrer les données existantes depuis `/lib/data/*.ts`
4. Mettre à jour le frontend pour fetch depuis Payload CMS
5. Tester l'interface admin Payload avec le client

---

**Date de création:** 2025-01-12  
**Auteur:** Documentation technique pour Payload CMS
