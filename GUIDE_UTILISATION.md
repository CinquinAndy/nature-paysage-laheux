# Guide d'Utilisation - Nature Paysage Laheux

> **Guide complet pour gérer et modifier le contenu du site web**  
> Ce guide est conçu pour être accessible à tous, même sans connaissances techniques.

---

## 📖 Table des matières

1. [Concepts Importants](#concepts-importants)
2. [Connexion à Payload](#connexion-à-payload)
3. [Page d'Accueil](#page-daccueil)
4. [Prestations (Services)](#prestations-services)
5. [Réalisations (Portfolio)](#réalisations-portfolio)
6. [FAQ (Questions fréquentes)](#faq-questions-fréquentes)
7. [Paramètres du Site](#paramètres-du-site)
8. [Médias (Images)](#médias-images)
9. [Pages Statiques](#pages-statiques)
10. [Astuces et Bonnes Pratiques](#astuces-et-bonnes-pratiques)

---

## Concepts Importants

### 🎯 Qu'est-ce que le SEO ?

**SEO** signifie "Search Engine Optimization" (Optimisation pour les Moteurs de Recherche).

**En simple :** C'est l'art de rendre votre site visible sur Google.

Deux éléments clés :
- **Titre SEO** : Le titre qui apparaît dans les résultats Google (maximum 60 caractères)
- **Description SEO** : Le texte sous le titre dans Google (maximum 155 caractères)

**Exemple :**
```
Titre : Paysagiste écologique à Nantes | Nature Paysage
Description : Expert jardinier à Nantes. Entretien naturel, création jardins écologiques. Crédit d'impôt 50%. Devis gratuit.
```

**Pourquoi c'est important ?**
- Aide les gens à trouver votre site sur Google
- Augmente les chances qu'ils cliquent sur votre lien
- Améliore votre visibilité locale (Nantes, Loire-Atlantique, etc.)

---

### 🖼️ Qu'est-ce que l'Alt Text (Texte Alternatif) ?

**Alt Text** est une description textuelle d'une image.

**Pourquoi c'est important ?**
1. **Accessibilité** : Les personnes malvoyantes utilisent des lecteurs d'écran qui lisent cette description
2. **SEO** : Google ne "voit" pas les images, il lit l'alt text pour comprendre ce qu'elles représentent
3. **Fiabilité** : Si l'image ne charge pas, le texte s'affiche à la place

**Bon exemple :**
```
❌ Mauvais : "image1.jpg" ou "photo"
✅ Bon : "Jardin paysager écologique avec pelouse naturelle et massifs de fleurs à Monnières"
```

**Règles d'or :**
- Soyez descriptif et précis
- Mentionnez le lieu si pertinent (Nantes, Vallet, etc.)
- Décrivez ce qui est visible dans l'image
- Restez concis (1-2 phrases maximum)

---

### 🤖 Les Outils IA de l'Application

#### ForVoyez - Génération automatique d'Alt Text

**Qu'est-ce que c'est ?**  
ForVoyez est un service d'intelligence artificielle qui analyse vos images et génère automatiquement une description en français.

**Comment l'utiliser ?**
1. Téléchargez votre image dans la bibliothèque Médias
2. Cliquez sur le bouton **"✨ Générer alt text avec ForVoyez"**
3. Attendez quelques secondes
4. L'IA génère une description automatique
5. **Important :** Vérifiez toujours le résultat et ajustez si nécessaire

**Avantages :**
- Gain de temps considérable
- Descriptions cohérentes
- Optimisé pour le SEO

**Attention :**  
L'IA fait de son mieux, mais relisez toujours et ajustez pour que la description corresponde exactement à votre image et votre contexte (jardin, paysage, lieu, etc.).

---

#### Gemini - Génération automatique de SEO

**Qu'est-ce que c'est ?**  
Gemini (par Google) est une IA qui génère automatiquement les titres et descriptions SEO optimisés pour vos pages.

**Comment l'utiliser ?**
1. Ouvrez n'importe quelle page ou prestation dans Payload
2. Cherchez le bouton **"🤖 Générer SEO avec Gemini"** (en haut de la section SEO)
3. Cliquez dessus
4. L'IA analyse le contenu de votre page et génère :
   - Un titre SEO optimisé (max 60 caractères)
   - Une description SEO optimisée (max 155 caractères)
5. **Important :** Vérifiez et personnalisez si besoin

**Avantages :**
- Respecte les limites de caractères
- Intègre automatiquement les mots-clés pertinents
- Optimisé pour le référencement local (Nantes, Loire-Atlantique)

**Note :**  
Gemini connaît votre activité (paysagiste écologique) et votre zone (Nantes), donc les suggestions sont déjà bien ciblées. Mais vous pouvez toujours personnaliser !

---

## Connexion à Payload

### 🔐 Accéder à l'interface d'administration

**URL en développement (local) :**
```
http://localhost:3000/admin
```

**URL en production :**
```
https://nature-paysage-laheux.fr/admin
```

### 📝 Première connexion

1. Ouvrez l'URL d'administration dans votre navigateur
2. Vous verrez un écran de connexion
3. Entrez votre **email** et **mot de passe**
4. Cliquez sur **"Se connecter"**

**Si vous n'avez pas encore de compte :**  
Le premier utilisateur doit être créé via la base de données. Contactez votre développeur pour créer votre compte administrateur.

### 🗂️ Interface principale

Une fois connecté, vous verrez le tableau de bord avec :
- **Collections** (à gauche) : Prestations, Réalisations, FAQ, Médias, Utilisateurs
- **Globals** (en dessous) : Page d'Accueil, Paramètres du Site, etc.

**Différence entre Collections et Globals :**
- **Collections** : Listes d'éléments multiples (plusieurs prestations, plusieurs réalisations, etc.)
- **Globals** : Pages uniques (une seule page d'accueil, un seul ensemble de paramètres, etc.)

---

## Page d'Accueil

**Où la trouver ?**  
Menu de gauche → **Globals** → **Page d'Accueil**

La page d'accueil est divisée en plusieurs sections. Voici comment modifier chacune :

---

### 1. Section Hero (En-tête principal)

**Ce que les visiteurs voient :**  
La grande bannière en haut de la page avec l'image de fond et le titre principal.

**Champs à modifier :**

#### Image de fond
- Cliquez sur **"Choisir une image"**
- Sélectionnez une image dans votre bibliothèque ou téléchargez-en une nouvelle
- **Recommandation :** Image de haute qualité (1920x1080 minimum), représentant votre travail

#### Titre principal
- Le texte affiché en grand
- **Astuce :** Utilisez `**mot**` pour mettre un mot en gras avec effet visuel blob
- **Exemple :** `**Transformez** Votre Jardin en Espace Écologique`
- Le mot entre `**` aura un effet visuel spécial

---

### 2. Section Valeurs

**Ce que les visiteurs voient :**  
Une section expliquant vos valeurs et votre approche, avec 4 cartes numérotées.

**Champs à modifier :**

#### Titre de la section
- Utilisez `**mot**` pour la mise en gras
- **Exemple :** `Une Approche **Écologique** et Sur-Mesure`

#### Image de la section
- Une image illustrant vos valeurs
- Apparaît à côté des cartes de valeurs

#### Liste des valeurs (4 cartes obligatoires)
Chaque valeur contient :
- **Icône** : Choisissez parmi Feuille, Outil, Épingle de carte, Flèche descendante
- **Numéro affiché** : "01", "02", "03", "04"
- **Titre** : Nom de la valeur (ex: "Respect de la Nature")
- **Description** : Explication courte (2-3 phrases)

**Conseil :** Ces 4 valeurs doivent représenter votre philosophie de travail.

---

### 3. Section Aperçu des Prestations

**Ce que les visiteurs voient :**  
Un aperçu de vos services avec un bouton pour voir la liste complète.

**Champs à modifier :**
- **Titre de la section** : Ex: "Mes Prestations d'Entretien de Jardin"
- **Sous-titre** : Ex: "Toutes mes prestations bénéficient de 50% de réduction d'impôt"
- **Texte du bouton** : Ex: "Voir Toutes Mes Prestations"
- **Lien du bouton** : URL de destination (généralement `/prestations`)

**Note :**  
Les prestations affichées sont automatiquement récupérées depuis votre liste de prestations. Vous n'avez pas besoin de les ajouter ici. Modifiez-les dans la section **Prestations**.

---

### 4. Section Philosophie

**Ce que les visiteurs voient :**  
Une section détaillée expliquant votre approche écologique, avec vos préférences et refus.

**Champs à modifier :**

#### En-tête
- **Titre** : Avec `**mot**` pour effet gras (ex: `Mon Approche : **Nature & Respect**`)
- **Texte d'introduction** : Paragraphe introductif
- **Citation** : Une phrase mise en avant

#### Images
- **Image principale** : Grande photo illustrative
- **Titre sur l'image** : Texte superposé
- **Description sur l'image** : Explication courte

#### Points de philosophie (4 cartes obligatoires)
Chaque point contient :
- **Icône** : Feuille, Cœur, Récompense, ou Bouclier
- **Titre** : Ex: "Pas de Produits Chimiques"
- **Description** : Explication détaillée

#### Ce que je privilégie (Liste verte)
- Ajoutez autant d'éléments que vous voulez
- Chaque élément a un **Titre** et une **Description courte**
- **Exemple :** 
  - Titre : "Paillage naturel"
  - Description : "Protection du sol et économie d'eau"

#### Ce que je refuse (Liste rouge)
- Même principe que la liste verte
- **Exemple :**
  - Titre : "Pesticides chimiques"
  - Description : "Aucun produit toxique pour l'environnement"

#### Bannière d'engagement
- **Titre** : Message final (ex: "Un Jardin Écologique, C'est Possible")
- **Description** : Texte encourageant
- **Texte du bouton** : Ex: "Discutons de Votre Projet"
- **Lien du bouton** : URL (généralement `/contact`)

---

### 5. Section Zone d'Intervention

**Ce que les visiteurs voient :**  
Une carte interactive montrant votre zone de travail et les communes desservies.

**Champs à modifier :**

- **Titre de la section** : Ex: "Où J'Interviens ?"
- **Sous-titre** : Texte additionnel
- **Latitude du centre** : Coordonnée GPS (par défaut Monnières)
- **Longitude du centre** : Coordonnée GPS
- **Rayon d'intervention** : Distance en km (ex: 20 km)

**Ne modifiez les coordonnées GPS que si vous changez votre zone principale d'activité.**

#### Communes principales
- Liste des villes où vous travaillez
- Ajoutez autant de communes que nécessaire
- **Exemple :** Monnières, Vallet, Clisson, Gorges, etc.

#### Section appel à l'action
- **Titre**, **Description**, **Texte du bouton**, **Lien du bouton**
- Encourage les visiteurs à vous contacter

---

### 6. Section Aperçu des Réalisations

**Ce que les visiteurs voient :**  
Les 6 dernières réalisations (projets terminés) avec un bouton pour voir tout le portfolio.

**Champs à modifier :**
- **Titre** : Ex: "Découvrez Mes Réalisations"
- **Description** : Texte d'introduction
- **Texte du bouton** : Ex: "Voir Toutes Mes Réalisations"
- **Lien du bouton** : URL (généralement `/realisations`)

**Note :**  
Les 6 réalisations les plus récentes sont affichées automatiquement. Gérez vos réalisations dans la section **Réalisations**.

---

### 7. Section FAQ (Questions fréquentes)

**Ce que les visiteurs voient :**  
Les 4 questions FAQ marquées pour être affichées sur la page d'accueil.

**Champs à modifier :**
- **Titre** : Ex: "Questions Fréquentes"
- **Description** : Introduction
- **Texte du bouton** : Ex: "Voir Toutes les Questions"
- **Lien du bouton** : URL (généralement `/faq`)

**Note :**  
Les questions affichées ici sont celles que vous avez marquées dans la section **FAQ** avec la case **"Afficher sur la page d'accueil"** cochée.

---

### 8. Section Crédit d'Impôt

**Ce que les visiteurs voient :**  
Les 4 étapes pour profiter du crédit d'impôt de 50%.

**Champs à modifier :**

#### En-tête
- **Titre** : Ex: "Comment Profiter de 50% de Réduction d'Impôt ?"
- **Sous-titre** : Texte additionnel

#### Étapes (4 étapes obligatoires)
Chaque étape contient :
- **Numéro** : 1, 2, 3, ou 4
- **Titre** : Ex: "Demandez Votre Devis"
- **Description** : Explication détaillée de l'étape
- **Première image** : Illustration (facultatif)
- **Deuxième image** : Illustration (facultatif)

**Conseil :** Gardez les explications simples et rassurantes pour vos clients.

---

### 9. Section Appel à l'Action Final

**Ce que les visiteurs voient :**  
La dernière section de la page avec un bouton de contact et une liste d'avantages.

**Champs à modifier :**
- **Titre** : Ex: "Prêt à Redonner Vie à Votre Jardin ?"
- **Description** : Message encourageant
- **Texte du bouton** : Ex: "Demander un Devis Gratuit"
- **Lien du bouton** : URL (généralement `/contact`)

#### Liste des avantages
- Ajoutez autant d'avantages que vous voulez
- Chaque ligne est un argument pour convaincre le visiteur
- **Exemples :**
  - "Devis gratuit sous 48h"
  - "50% de crédit d'impôt"
  - "Approche écologique et respectueuse"

---

### 10. SEO de la Page d'Accueil

**En haut de la page, vous trouverez la section SEO :**

#### Générer automatiquement avec Gemini
1. Cliquez sur **"🤖 Générer SEO avec Gemini"**
2. L'IA analyse tout le contenu de votre page d'accueil
3. Elle génère un titre et une description optimisés
4. Vérifiez et ajustez si nécessaire

#### Ou remplir manuellement
- **Titre SEO** : Maximum 60 caractères
- **Description SEO** : Maximum 155 caractères
- **Image Open Graph** : Image qui apparaît quand on partage votre site sur les réseaux sociaux

**Conseil :** Utilisez Gemini pour gagner du temps, puis personnalisez le résultat selon votre style.

---

## Prestations (Services)

**Où les trouver ?**  
Menu de gauche → **Collections** → **Prestations**

Les prestations sont vos services : tonte de pelouse, taille de haies, création de jardins, etc.

---

### Créer une nouvelle prestation

1. Cliquez sur **"Create New"** (en haut à droite)
2. Remplissez tous les champs (voir ci-dessous)
3. Cliquez sur **"Save"** en haut à droite

---

### Champs d'une prestation

#### Nom de la prestation
- Le titre de votre service
- **Exemple :** "Tonte de Pelouse Écologique"

#### Identifiant URL (slug)
- Utilisé dans l'adresse web
- **Règles :** Lettres minuscules, chiffres, tirets uniquement
- **Exemple :** `tonte-pelouse-ecologique`
- **URL résultante :** `https://nature-paysage-laheux.fr/prestations/tonte-pelouse-ecologique`

**Important :** Ne modifiez pas le slug après la création, car cela casserait les liens existants.

#### Description courte
- 2-3 phrases maximum
- Utilisée dans les cartes d'aperçu
- Doit donner envie d'en savoir plus

#### Description complète
- Texte enrichi avec mise en forme
- Décrivez le service en détail
- **Fonctionnalités disponibles :**
  - Gras, italique, souligné
  - Listes à puces ou numérotées
  - Titres et sous-titres
  - Liens hypertextes

#### Image principale
- L'image qui représente ce service
- Apparaît dans les cartes et en haut de la page du service
- **Recommandation :** Photo de qualité montrant le résultat du service

#### Catégorie
Choisissez parmi :
- **Entretien** : Services réguliers (tonte, taille, etc.)
- **Création** : Projets de création (nouveau jardin, aménagement, etc.)
- **Accompagnement** : Conseils, formation, etc.

#### Points clés (4 à 6 éléments)
- Liste des avantages et caractéristiques du service
- Chaque point est une phrase courte
- **Exemples :**
  - "Tonte haute pour favoriser la biodiversité"
  - "Ramassage des déchets verts"
  - "Tarif au m² dégressif"

#### Galerie d'images
- Photos additionnelles du service
- Apparaissent quand le visiteur clique sur "Voir la galerie"
- **Recommandation :** 4-8 photos variées

#### Éligible au crédit d'impôt
- Cochez cette case si le service bénéficie du crédit d'impôt de 50%
- Par défaut : coché

#### Affichage du tarif
- Comment vous affichez le prix
- **Exemples :**
  - "Sur devis personnalisé"
  - "À partir de 45€/h"
  - "Forfait dès 80€"

#### Ordre d'affichage
- Numéro pour trier les prestations
- Plus petit numéro = apparaît en premier
- **Exemple :** 
  - Tonte : 1
  - Taille : 2
  - Création jardin : 3

#### Section Appel à l'Action
- Titre, description, texte du bouton, lien du bouton
- Apparaît en bas de la page du service
- **Liste des avantages :** Points clés pour encourager le visiteur à contacter

---

### SEO d'une prestation

#### Méthode automatique (recommandée)
1. Remplissez d'abord tous les champs de la prestation
2. Cliquez sur **"🤖 Générer SEO avec Gemini"**
3. L'IA analyse votre service et génère un SEO optimisé
4. Vérifiez et ajustez si besoin

#### Méthode manuelle
- **Titre SEO** : Ex: "Tonte Pelouse Écologique Nantes | Nature Paysage"
- **Description SEO** : Ex: "Service de tonte écologique près de Nantes. Méthode naturelle, sans produits chimiques. Crédit d'impôt 50%. Devis gratuit."

---

### Modifier une prestation existante

1. Allez dans **Collections** → **Prestations**
2. Cliquez sur la prestation à modifier
3. Modifiez les champs nécessaires
4. Cliquez sur **"Save"**

---

### Supprimer une prestation

1. Allez dans **Collections** → **Prestations**
2. Cochez la case à côté de la prestation à supprimer
3. Cliquez sur **"Delete"** en haut
4. Confirmez la suppression

**Attention :** La suppression est définitive. Assurez-vous que vous n'avez plus besoin de cette prestation.

---

## Réalisations (Portfolio)

**Où les trouver ?**  
Menu de gauche → **Collections** → **Réalisations**

Les réalisations sont vos projets terminés que vous souhaitez mettre en avant.

---

### Créer une nouvelle réalisation

1. Cliquez sur **"Create New"**
2. Remplissez tous les champs
3. Cliquez sur **"Save"**

---

### Champs d'une réalisation

#### Titre du projet
- Nom du projet
- **Exemples :**
  - "Jardin Écologique à Monnières"
  - "Création Potager Bio à Vallet"
  - "Réaménagement Complet à Clisson"

#### Identifiant URL (slug)
- Utilisé dans l'URL
- **Exemple :** `jardin-ecologique-monnieres`
- **Ne modifiez pas après création**

#### Ville / Commune
- Où le projet a été réalisé
- **Exemple :** "Monnières", "Vallet", "Clisson"
- **Important pour le SEO local**

#### Date du projet
- Date de réalisation ou de fin du projet
- Utilisée pour trier les réalisations (les plus récentes en premier)

#### Image principale
- Photo principale du projet terminé
- Doit être de haute qualité et montrer le meilleur angle

#### Description courte
- 2-3 phrases
- Utilisée dans les cartes d'aperçu
- Résumé du projet

#### Description complète
- Texte enrichi détaillé
- Expliquez :
  - La demande du client
  - Les travaux réalisés
  - Les défis rencontrés
  - Le résultat final
  - Les techniques écologiques utilisées

#### Catégorie
Choisissez parmi :
- **Entretien** : Projets d'entretien régulier
- **Aménagement** : Création ou réaménagement d'espaces
- **Potager** : Création de potagers
- **Taille** : Travaux de taille spécialisée

#### Caractéristiques principales
- Liste de points remarquables du projet
- **Exemples :**
  - "Surface de 500 m²"
  - "Installation d'un système de récupération d'eau"
  - "Plantation de 40 arbustes locaux"

#### Galerie d'images
- Photos du projet (avant/après, différentes étapes, détails)
- **Recommandation :** 6-12 photos variées

#### Témoignage client (facultatif)
Si vous avez un avis client pour ce projet :
- **Citation du client** : Le témoignage entre guillemets
- **Nom du client** : Prénom ou Prénom + initiale (ex: "Jean-Luc L.")
- **Ville du client** : Ex: "Monnières"

#### Section Appel à l'Action
- Même principe que pour les prestations
- Encourage les visiteurs à vous contacter pour un projet similaire

---

### SEO d'une réalisation

#### Générer avec Gemini (recommandé)
1. Remplissez tous les champs de la réalisation
2. Cliquez sur **"🤖 Générer SEO avec Gemini"**
3. L'IA génère un SEO optimisé incluant le lieu
4. Vérifiez le résultat

**Astuce :** Gemini intègre automatiquement le lieu (commune) dans le SEO pour améliorer le référencement local.

---

## FAQ (Questions fréquentes)

**Où les trouver ?**  
Menu de gauche → **Collections** → **FAQ**

La FAQ répond aux questions courantes de vos clients potentiels.

---

### Créer une nouvelle question

1. Cliquez sur **"Create New"**
2. Remplissez les champs
3. Cliquez sur **"Save"**

---

### Champs d'une question FAQ

#### Question
- La question posée par le client
- Formulez-la naturellement
- **Exemple :** "Quels sont vos tarifs pour la tonte de pelouse ?"

#### Réponse
- Texte enrichi (mise en forme possible)
- Soyez clair, précis et complet
- Utilisez des listes à puces si pertinent

#### Catégorie
Choisissez parmi :
- **Questions Générales** : Horaires, zone, disponibilité, etc.
- **Prestations & Services** : Détails sur vos services
- **Tarifs & Crédit d'Impôt** : Prix, modalités, crédit d'impôt
- **Approche Écologique** : Vos méthodes, philosophie, produits utilisés

#### Afficher sur la page d'accueil
- Cochez cette case si vous voulez que cette question apparaisse sur la page d'accueil
- **Maximum 4 questions sur la page d'accueil**
- Choisissez les questions les plus importantes

#### Ordre d'affichage
- Numéro pour trier les questions dans leur catégorie
- Plus petit = apparaît en premier

---

### Organiser vos questions

**Bonne pratique :**
1. Créez 10-20 questions couvrant tous les aspects
2. Répartissez-les dans les 4 catégories
3. Sélectionnez les 4 plus importantes pour la page d'accueil
4. Utilisez l'ordre pour mettre les questions essentielles en premier

**Exemples de questions essentielles :**
- "Intervenez-vous dans ma commune ?"
- "Comment fonctionne le crédit d'impôt ?"
- "Utilisez-vous des produits chimiques ?"
- "Quels sont vos tarifs ?"

---

## Paramètres du Site

**Où les trouver ?**  
Menu de gauche → **Globals** → **Paramètres du Site**

Les paramètres du site contiennent toutes les informations globales de votre entreprise.

---

### Informations de Contact

#### Téléphone et Email
- **Numéro de téléphone** : Format français (ex: 06 12 34 56 78)
- **Adresse email** : Votre email professionnel

#### Informations de l'entreprise
- **Nom de l'entreprise** : Ex: "SASU Nature et Paysage Laheux"
- **Représentant légal** : Votre nom
- **Forme juridique** : SASU, EURL, Auto-entrepreneur, etc.

#### Adresse
- **Code postal** : Ex: 44690
- **Ville** : Ex: Monnières
- **Région** : Ex: Pays de la Loire
- **Pays** : France

**Ces informations sont utilisées :**
- Dans le footer (pied de page)
- Dans la page de contact
- Dans les mentions légales
- Pour le référencement local

---

### Réseaux sociaux

- **URL Facebook** : Lien complet vers votre page Facebook
- **URL LinkedIn** : Lien complet vers votre profil LinkedIn

**Exemple :** `https://www.facebook.com/naturepaysagelaheux`

Ces liens apparaissent dans le footer du site.

---

### Horaires d'ouverture

- **Horaires en semaine** : Ex: "Lundi - Vendredi : 8h - 18h"
- **Horaires le samedi** : Ex: "Samedi : 9h - 12h"
- **Horaires le dimanche** : Ex: "Fermé" ou "Sur rendez-vous"
- **Note complémentaire** : Ex: "Disponible pour devis le soir sur rendez-vous"

**Conseil :** Soyez précis et honnête sur vos disponibilités.

---

## Médias (Images)

**Où les trouver ?**  
Menu de gauche → **Collections** → **Médias**

La bibliothèque de médias stocke toutes vos images.

---

### Télécharger une nouvelle image

1. Cliquez sur **"Upload New"**
2. Sélectionnez votre image (ou glissez-déposez)
3. Attendez le téléchargement

**Formats acceptés :** JPG, PNG, WebP, SVG  
**Taille recommandée :** Maximum 5 Mo par image

---

### Gérer une image

Une fois l'image téléchargée, vous pouvez :

#### Modifier l'Alt Text

**Méthode automatique (avec ForVoyez) :**
1. Ouvrez l'image dans la bibliothèque
2. Cliquez sur **"✨ Générer alt text avec ForVoyez"**
3. Attendez quelques secondes
4. L'IA analyse l'image et génère une description
5. **Vérifiez le résultat** et ajustez si nécessaire
6. Cliquez sur **"Save"**

**Méthode manuelle :**
1. Ouvrez l'image
2. Remplissez le champ **"Alt Text"**
3. Cliquez sur **"Save"**

#### Renommer l'image
- Vous pouvez changer le nom du fichier pour mieux l'organiser
- **Conseil :** Utilisez des noms descriptifs (ex: `jardin-monnieres-apres.jpg` au lieu de `IMG_1234.jpg`)

---

### Bonnes pratiques pour les images

#### Avant de télécharger
1. **Optimisez la taille** : Si votre photo fait 10 Mo, compressez-la avant (outils en ligne gratuits)
2. **Nommez correctement** : Utilisez des noms clairs (ex: `tonte-pelouse-vallet.jpg`)
3. **Vérifiez la qualité** : L'image doit être nette et bien cadrée

#### Après téléchargement
1. **Ajoutez toujours un Alt Text** : Soit avec ForVoyez, soit manuellement
2. **Soyez descriptif** : "Jardin paysager avec pelouse naturelle à Monnières" plutôt que "jardin"
3. **Incluez le lieu si pertinent** : Aide le SEO local

---

### Supprimer une image

**Attention :** Si vous supprimez une image utilisée quelque part sur le site, elle disparaîtra de cette page.

1. Cochez la case à côté de l'image
2. Cliquez sur **"Delete"**
3. Confirmez

**Avant de supprimer :**  
Vérifiez que l'image n'est utilisée nulle part (prestations, réalisations, page d'accueil, etc.).

---

## Pages Statiques

### Page Contact

**Où la trouver ?**  
Menu de gauche → **Globals** → **Page Contact**

#### Champs disponibles
- **Titre de la page** : Ex: "Contactez-Moi"
- **Description** : Texte d'introduction
- **SEO** : Titre et description (utilisez Gemini)

**Note :** Le formulaire de contact est automatique. Vous recevrez les demandes par email.

---

### Page Mentions Légales

**Où la trouver ?**  
Menu de gauche → **Globals** → **Mentions Légales**

#### Champs disponibles
- **Contenu** : Texte enrichi avec toutes les mentions légales
- **SEO** : Titre et description

**Conseil :** Les mentions légales sont obligatoires en France. Gardez-les à jour avec vos vraies informations (nom, adresse, SIRET, etc.).

---

### Page Prestations (Liste)

**Où la trouver ?**  
Menu de gauche → **Globals** → **Page Prestations**

#### Champs disponibles
- **Titre de la page** : Ex: "Mes Prestations"
- **Description** : Texte d'introduction
- **SEO** : Titre et description (utilisez Gemini)

**Note :** Les prestations listées proviennent de la collection **Prestations**. Modifiez-les là-bas, pas ici.

---

### Page Réalisations (Liste)

**Où la trouver ?**  
Menu de gauche → **Globals** → **Page Réalisations**

#### Champs disponibles
- **Titre de la page** : Ex: "Mes Réalisations"
- **Description** : Texte d'introduction
- **SEO** : Titre et description (utilisez Gemini)

**Note :** Les réalisations listées proviennent de la collection **Réalisations**. Modifiez-les là-bas, pas ici.

---

### Page FAQ (Liste)

**Où la trouver ?**  
Menu de gauche → **Globals** → **Page FAQ**

#### Champs disponibles
- **Titre de la page** : Ex: "Questions Fréquentes"
- **Description** : Texte d'introduction
- **SEO** : Titre et description (utilisez Gemini)

**Note :** Les questions affichées proviennent de la collection **FAQ**. Modifiez-les là-bas, pas ici.

---

## Astuces et Bonnes Pratiques

### 🚀 Pour un SEO optimal

1. **Utilisez Gemini pour gagner du temps**
   - Générez d'abord automatiquement
   - Puis personnalisez selon votre style

2. **Incluez toujours votre localisation**
   - Mentionnez Nantes, Loire-Atlantique, ou les communes
   - Améliore votre référencement local

3. **Restez dans les limites de caractères**
   - Titre SEO : Maximum 60 caractères
   - Description SEO : Maximum 155 caractères
   - Gemini respecte automatiquement ces limites

4. **Mettez à jour régulièrement**
   - Ajoutez de nouvelles réalisations
   - Actualisez vos prestations
   - Ajoutez des questions FAQ

---

### 📸 Pour des images parfaites

1. **Qualité avant tout**
   - Photos nettes et bien exposées
   - Résolution minimum : 1920x1080 pour les grandes images

2. **Optimisez le poids**
   - Compressez avant téléchargement
   - Cible : 200-500 Ko par image

3. **Alt Text systématique**
   - Utilisez ForVoyez pour gagner du temps
   - Relisez et ajustez toujours

4. **Nommage cohérent**
   - `service-nom-lieu.jpg` au lieu de `IMG_1234.jpg`
   - Facilite la gestion

---

### ✍️ Pour un contenu engageant

1. **Soyez authentique**
   - Parlez naturellement de votre travail
   - Partagez votre passion pour l'écologie

2. **Pensez à vos clients**
   - Répondez à leurs questions
   - Rassurez-les sur les tarifs, le crédit d'impôt, etc.

3. **Mettez en avant vos valeurs**
   - Approche écologique
   - Respect de la nature
   - Pas de produits chimiques

4. **Ajoutez des appels à l'action**
   - "Demander un devis gratuit"
   - "Discutons de votre projet"
   - "Contactez-moi"

---

### 🔄 Routine de mise à jour

**Chaque mois :**
- Ajoutez 2-3 nouvelles réalisations (si projets terminés)
- Vérifiez que vos horaires sont à jour
- Répondez aux questions fréquentes qui reviennent

**Tous les 3 mois :**
- Relisez vos prestations (tarifs, descriptions)
- Vérifiez les liens (réseaux sociaux, etc.)
- Ajoutez de nouvelles questions FAQ si nécessaire

**Annuellement :**
- Mettez à jour les mentions légales
- Relisez tout le contenu de la page d'accueil
- Vérifiez que toutes les images ont un Alt Text

---

### 🛟 En cas de problème

#### Vous ne voyez pas vos modifications sur le site
1. Assurez-vous d'avoir cliqué sur **"Save"**
2. Attendez 2-3 minutes (le site met à jour le cache)
3. Rafraîchissez la page (Ctrl+F5 ou Cmd+Shift+R)

#### Une image ne s'affiche pas
1. Vérifiez que l'image est bien téléchargée dans **Médias**
2. Vérifiez que vous avez bien sélectionné cette image dans le champ
3. Assurez-vous que l'image n'a pas été supprimée

#### ForVoyez ou Gemini ne fonctionne pas
1. Vérifiez que vous avez une connexion internet
2. Réessayez dans quelques minutes
3. Si le problème persiste, utilisez la méthode manuelle

#### Vous avez supprimé quelque chose par erreur
**Contactez immédiatement votre développeur.**  
Il peut restaurer depuis une sauvegarde (si faite récemment).

---

### 📞 Besoin d'aide ?

Si vous avez des questions sur :
- **L'utilisation de Payload** : Relisez ce guide ou contactez votre développeur
- **Le contenu à mettre** : Réfléchissez à ce que vos clients veulent savoir
- **Le SEO** : Utilisez Gemini, il fait déjà 80% du travail

**Règle d'or :** Si vous hésitez, utilisez les outils IA (Gemini, ForVoyez), vérifiez le résultat, puis ajustez selon votre ressenti.

---

## 🎉 Félicitations !

Vous savez maintenant comment gérer l'intégralité du contenu de votre site web.

**Rappelez-vous :**
- Soyez régulier dans les mises à jour
- Ajoutez du contenu au fil du temps
- Restez authentique et naturel
- Utilisez les outils IA pour gagner du temps

**Votre site est un outil vivant.** Plus vous l'alimentez avec de nouvelles réalisations, des photos de qualité et du contenu pertinent, plus il attirera de clients.

Bon courage ! 🌿

