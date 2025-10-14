# 🎬 Système d'Animation avec Motion

Ce projet utilise Motion (la version moderne et optimisée de Framer Motion) pour créer des animations fluides et performantes tout en préservant le SSG (Static Site Generation) de Next.js.

## 📋 Table des matières

- [Architecture](#architecture)
- [Composants d'animation](#composants-danimation)
- [Variants disponibles](#variants-disponibles)
- [Exemples d'utilisation](#exemples-dutilisation)
- [Optimisations de performance](#optimisations-de-performance)
- [Bonnes pratiques](#bonnes-pratiques)

## 🏗️ Architecture

```
src/
├── lib/animation/
│   └── variants.ts           # Tous les variants d'animation réutilisables
├── components/animation/
│   ├── animated-section.tsx  # Wrapper pour sections avec whileInView
│   ├── animated-grid.tsx     # Grid avec effet stagger
│   ├── animated-card.tsx     # Cartes avec hover/tap
│   ├── animated-hero-content.tsx      # Animation spécifique au hero
│   └── animated-page-hero.tsx         # Animation spécifique au page hero
└── app/(frontend)/
    └── template.tsx           # Transitions entre pages
```

## 🎨 Composants d'animation

### AnimatedSection

Wrapper universel pour animer des sections au scroll. Utilise `whileInView` pour déclencher les animations.

```tsx
import { AnimatedSection } from '@/components/animation/animated-section'
import { fadeInUp } from '@/lib/animation/variants'

<AnimatedSection variants={fadeInUp} delay={0.2}>
  <h1>Titre animé</h1>
  <p>Contenu animé</p>
</AnimatedSection>
```

**Props:**
- `variants`: Variants d'animation (défaut: `fadeInUp`)
- `delay`: Délai avant l'animation en secondes (défaut: 0)
- `viewportConfig`: Configuration du viewport observer
- `className`: Classes CSS
- `as`: Element HTML à utiliser (défaut: `div`)

### AnimatedGrid

Grid avec effet stagger (les enfants apparaissent séquentiellement).

```tsx
import { AnimatedGrid } from '@/components/animation/animated-grid'

<AnimatedGrid className="grid grid-cols-3 gap-4">
  {items.map(item => (
    <Card key={item.id}>{item.title}</Card>
  ))}
</AnimatedGrid>
```

**Props:**
- `containerVariants`: Variants du conteneur (défaut: `staggerContainer`)
- `itemVariants`: Variants des items (défaut: `staggerItem`)
- `viewportConfig`: Configuration du viewport observer
- `className`: Classes CSS
- `as`: Element HTML à utiliser (défaut: `div`)

### AnimatedCard

Carte avec animations hover et tap.

```tsx
import { AnimatedCard } from '@/components/animation/animated-card'

<AnimatedCard enableHover={true}>
  <h3>Titre de la carte</h3>
  <p>Contenu de la carte</p>
</AnimatedCard>
```

**Props:**
- `enableHover`: Activer les animations hover/tap (défaut: `true`)
- `className`: Classes CSS
- `as`: Element HTML à utiliser (défaut: `div`)
- `onClick`: Callback au clic

## 🎯 Variants disponibles

Tous les variants sont définis dans `/src/lib/animation/variants.ts`.

### Animations de base

- **fadeIn**: Fade in simple
- **fadeInUp**: Fade in depuis le bas (le plus commun)
- **fadeInDown**: Fade in depuis le haut
- **fadeInLeft**: Fade in depuis la gauche
- **fadeInRight**: Fade in depuis la droite
- **scaleIn**: Scale + fade in
- **scaleInLarge**: Scale + fade in plus prononcé

### Animations stagger

- **staggerContainer**: Conteneur pour stagger normal
- **staggerContainerFast**: Stagger rapide (0.05s)
- **staggerContainerSlow**: Stagger lent (0.15s)
- **staggerItem**: Item pour les animations stagger

### Animations spéciales

- **heroText**: Animation pour les titres de hero (scale + fade + translateY)
- **imageReveal**: Animation pour les images (fade + zoom out)
- **cardHover**: Animation hover pour cartes
- **buttonHover**: Animation hover pour boutons
- **slidePanel**: Pour les panneaux latéraux
- **pageTransition**: Pour les transitions de page

### Configuration viewport

- **defaultViewportConfig**: Configuration par défaut
  ```ts
  {
    once: true,           // Animer une seule fois
    margin: '-80px',      // Déclencher 80px avant d'être visible
    amount: 0.2           // 20% de l'élément doit être visible
  }
  ```

- **bottomViewportConfig**: Pour les éléments en bas de page
  ```ts
  {
    once: true,
    margin: '-50px',
    amount: 0.1
  }
  ```

## 💡 Exemples d'utilisation

### Section simple avec animation

```tsx
import { AnimatedSection } from '@/components/animation/animated-section'
import { fadeInUp } from '@/lib/animation/variants'

export function MySection() {
  return (
    <AnimatedSection variants={fadeInUp}>
      <h2>Mon titre</h2>
      <p>Mon contenu</p>
    </AnimatedSection>
  )
}
```

### Grille de cartes avec stagger

```tsx
import { AnimatedGrid } from '@/components/animation/animated-grid'
import { AnimatedCard } from '@/components/animation/animated-card'

export function CardGrid({ items }) {
  return (
    <AnimatedGrid className="grid grid-cols-3 gap-6">
      {items.map(item => (
        <AnimatedCard key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </AnimatedCard>
      ))}
    </AnimatedGrid>
  )
}
```

### Section avec plusieurs animations

```tsx
import { AnimatedSection } from '@/components/animation/animated-section'
import { fadeInUp, fadeInRight } from '@/lib/animation/variants'

export function ComplexSection() {
  return (
    <div className="grid grid-cols-2 gap-8">
      <AnimatedSection variants={fadeInUp}>
        <h2>Colonne gauche</h2>
      </AnimatedSection>

      <AnimatedSection variants={fadeInRight} delay={0.2}>
        <h2>Colonne droite (avec délai)</h2>
      </AnimatedSection>
    </div>
  )
}
```

### Animation personnalisée

```tsx
import { AnimatedSection } from '@/components/animation/animated-section'

const customVariants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.8 }
  }
}

<AnimatedSection variants={customVariants}>
  <div>Contenu avec rotation</div>
</AnimatedSection>
```

## ⚡ Optimisations de performance

### 1. GPU Acceleration

Toutes les animations utilisent uniquement `opacity` et `transform` qui sont GPU-accelerated :

```ts
// ✅ BON - GPU accelerated
{ opacity: 0, y: 20, scale: 0.9 }

// ❌ MAUVAIS - CPU reflow
{ width: '100%', height: '200px' }
```

### 2. willChange

Tous les composants d'animation utilisent `willChange` automatiquement :

```tsx
style={{
  willChange: 'opacity, transform'
}}
```

### 3. viewport={{ once: true }}

Par défaut, les animations ne se déclenchent qu'une seule fois pour économiser les ressources :

```tsx
viewport={{ once: true }}
```

### 4. Préservation du SSG

- Tous les composants d'animation sont `'use client'`
- Les Server Components restent des Server Components
- Le contenu est rendu en SSG, seules les animations sont client-side

### 5. Transitions de page

Le fichier `template.tsx` gère les transitions entre pages sans affecter le SSG :

```tsx
// src/app/(frontend)/template.tsx
export default function Template({ children }) {
  return (
    <motion.div variants={pageTransition}>
      {children}
    </motion.div>
  )
}
```

## ✅ Bonnes pratiques

### 1. Utiliser les variants existants

```tsx
// ✅ BON - Utiliser les variants existants
import { fadeInUp } from '@/lib/animation/variants'
<AnimatedSection variants={fadeInUp} />

// ❌ MAUVAIS - Créer des variants inline
<AnimatedSection variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} />
```

### 2. Ajouter des délais pour les animations multiples

```tsx
// ✅ BON - Délais pour animations séquentielles
<AnimatedSection variants={fadeInUp} />
<AnimatedSection variants={fadeInUp} delay={0.2} />
<AnimatedSection variants={fadeInUp} delay={0.4} />
```

### 3. Utiliser AnimatedGrid pour les listes

```tsx
// ✅ BON - Effet stagger automatique
<AnimatedGrid>
  {items.map(item => <Card key={item.id} />)}
</AnimatedGrid>

// ❌ MAUVAIS - Pas d'effet stagger
{items.map(item => (
  <AnimatedSection key={item.id}>
    <Card />
  </AnimatedSection>
))}
```

### 4. Wrapper uniquement ce qui doit être animé

```tsx
// ✅ BON - Wrapper minimal
<section>
  <AnimatedSection>
    <h2>Titre animé</h2>
  </AnimatedSection>
  <p>Paragraphe statique</p>
</section>

// ❌ MAUVAIS - Tout wrapper
<AnimatedSection>
  <section>
    <h2>Titre animé</h2>
    <p>Paragraphe statique</p>
  </section>
</AnimatedSection>
```

### 5. Tester les performances

- Ouvrir les DevTools > Performance
- Vérifier que les animations restent à 60 FPS
- Utiliser `willChange` uniquement quand nécessaire
- Éviter d'animer trop d'éléments simultanément

## 📚 Ressources

- [Motion Documentation](https://motion.dev/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [GPU Acceleration CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)

## 🎬 Résumé

Le système d'animation est conçu pour être :
- ✅ **Performant** : GPU acceleration, willChange, animations optimisées
- ✅ **Simple** : Composants réutilisables, variants prédéfinis
- ✅ **SSG-friendly** : Client-side uniquement, préserve le SSG
- ✅ **Flexible** : Personnalisable, extensible
- ✅ **Élégant** : Animations douces, timing professionnel
