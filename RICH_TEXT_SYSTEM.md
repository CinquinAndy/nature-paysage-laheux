# Système Rich Text - Documentation Technique

Ce document explique le système de rendu Rich Text personnalisé mis en place pour transformer le contenu Lexical de Payload CMS en HTML stylé.

## 🎯 Objectif

Remplacer le composant de base `@payloadcms/richtext-lexical/react` par un serializer personnalisé qui offre :
- ✅ **Contrôle total** sur le rendu HTML
- ✅ **Styles cohérents** avec le design system Tailwind
- ✅ **Performance optimisée** (bundle size réduit)
- ✅ **Typographie professionnelle** sans dépendance à prose
- ✅ **Code maintenable** et extensible

## 📁 Architecture

```
src/
├── lib/
│   └── lexical/
│       └── serializer.tsx          # Serializer personnalisé Lexical → React
└── components/
    └── ui/
        └── rich-text.tsx            # Composant wrapper pour le rendu
```

## 🔧 Composants

### 1. Serializer (`src/lib/lexical/serializer.tsx`)

Le serializer transforme la structure JSON Lexical en composants React avec styling Tailwind.

#### Types de nœuds supportés

| Nœud Lexical | HTML | Styles Tailwind |
|--------------|------|-----------------|
| `text` | `<span>`, `<strong>`, `<em>`, etc. | Format inline avec couleurs thème |
| `paragraph` | `<p>` | `text-gray-600 leading-7 my-4` |
| `heading` (h1-h6) | `<h1>` à `<h6>` | Tailles et espacements progressifs |
| `list` (bullet/number) | `<ul>`, `<ol>` | `list-disc` ou `list-decimal` avec espacement |
| `listitem` | `<li>` | `text-gray-600 leading-7` |
| `link` | `<a>` | `text-emerald-600 hover:text-emerald-700` |
| `quote` | `<blockquote>` | `border-l-4 border-emerald-600 pl-6 italic` |
| `linebreak` | `<br>` | - |

#### Formats de texte supportés

Les formats sont gérés via des flags binaires (comme dans Lexical) :

| Format | Flag | Rendu |
|--------|------|-------|
| **Gras** | `IS_BOLD` (1) | `<strong className="font-semibold text-foreground">` |
| *Italique* | `IS_ITALIC` (2) | `<em className="italic">` |
| ~~Barré~~ | `IS_STRIKETHROUGH` (4) | `<s className="line-through">` |
| <u>Souligné</u> | `IS_UNDERLINE` (8) | `<u className="underline">` |
| `Code` | `IS_CODE` (16) | `<code className="px-1.5 py-0.5 bg-gray-100...">` |

#### Fonctions principales

```typescript
// Sérialise un nœud Lexical individuel
export function serializeLexicalNode(node: SerializedLexicalNode): React.ReactNode

// Sérialise le contenu complet d'un champ rich text
export function serializeLexicalContent(content: LexicalContent): React.ReactNode
```

### 2. Composant RichText (`src/components/ui/rich-text.tsx`)

Wrapper simple qui encapsule le serializer :

```tsx
import { serializeLexicalContent } from '@/lib/lexical/serializer'

export function RichText({ content, className = '' }: RichTextProps) {
  if (!content) return null
  
  return (
    <div className={`rich-text-content ${className}`}>
      {serializeLexicalContent(content)}
    </div>
  )
}
```

## 🎨 Système de styles

### Hiérarchie typographique

```
H1: text-4xl, mt-12, mb-6  (Titre principal de page)
H2: text-3xl, mt-16, mb-6  (Sections principales)
H3: text-2xl, mt-12, mb-4  (Sous-sections)
H4: text-xl,  mt-8,  mb-3  (Détails)
H5: text-lg,  mt-6,  mb-2  (Petits détails)
H6: text-base, mt-4, mb-2  (Notes)
```

### Palette de couleurs

- **Texte principal**: `text-gray-600`
- **Titres**: `text-foreground` (noir adaptatif)
- **Liens**: `text-emerald-600` → `text-emerald-700` (hover)
- **Éléments forts**: `text-foreground font-semibold`
- **Citations**: `text-gray-700 italic`

## 📝 Utilisation

### Dans une page Next.js

```tsx
import { RichText } from '@/components/ui/rich-text'
import { getServiceBySlug } from '@/lib/payload'

export default async function ServicePage({ params }) {
  const service = await getServiceBySlug(params.slug)
  
  return (
    <div>
      <h1>{service.title}</h1>
      <RichText content={service.fullDescription} />
    </div>
  )
}
```

### Avec classe personnalisée

```tsx
<RichText 
  content={pageData.content} 
  className="my-custom-spacing" 
/>
```

## ⚡ Avantages

### 1. Performance
- **Bundle size réduit** : Pas besoin de charger l'éditeur Lexical complet côté client
- **Rendu côté serveur** : HTML généré au build time pour les pages statiques

### 2. Contrôle
- **Styles personnalisés** pour chaque type d'élément
- **Comportement défini** pour tous les formats
- **Extensibilité** facile pour ajouter de nouveaux types de nœuds

### 3. Maintenance
- **Code centralisé** dans un seul fichier
- **Types TypeScript** pour la sécurité
- **Pas de dépendance à Tailwind prose** (conflicts évités)

## 🔄 Extension du système

### Ajouter un nouveau type de nœud

1. Définir l'interface du nœud :
```typescript
interface CodeBlockNode extends BaseNode {
  type: 'codeblock'
  language: string
  code: string
}
```

2. Ajouter au type union :
```typescript
type LexicalNode = 
  | TextNode
  | ParagraphNode
  // ... autres types
  | CodeBlockNode  // 👈 Nouveau
```

3. Gérer le rendu dans `serializeLexicalNode` :
```typescript
case 'codeblock': {
  const codeNode = lexicalNode as CodeBlockNode
  return (
    <pre className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
      <code className={`language-${codeNode.language}`}>
        {codeNode.code}
      </code>
    </pre>
  )
}
```

### Modifier les styles globaux

Tous les styles sont définis dans le serializer. Pour changer un style :

1. Ouvrir `src/lib/lexical/serializer.tsx`
2. Trouver le case correspondant au type d'élément
3. Modifier les classes Tailwind

Exemple - Changer la couleur des liens :
```typescript
case 'link': {
  return (
    <a 
      href={linkNode.url}
      className="text-blue-600 hover:text-blue-800"  // 👈 Changé
    >
      {serializeChildren(linkNode.children)}
    </a>
  )
}
```

## 🧪 Tests

Pour tester le rendu d'un type de contenu :

1. Créer le contenu dans Payload CMS (`/admin`)
2. Vérifier le rendu sur le frontend
3. Inspecter le HTML généré dans les DevTools

## 📚 Références

- [Payload CMS - Rich Text Lexical](https://payloadcms.com/docs/rich-text/lexical)
- [Lexical Framework](https://lexical.dev/)
- [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin)

## 🐛 Dépannage

### Le contenu ne s'affiche pas

1. Vérifier que `content` n'est pas `null` ou `undefined`
2. Vérifier la structure : `content.root.children` doit exister
3. Regarder la console pour les erreurs TypeScript

### Les styles ne sont pas appliqués

1. Vérifier que les classes Tailwind sont bien dans le fichier
2. Purge cache : `rm -rf .next && pnpm run build`
3. Vérifier qu'il n'y a pas de conflits avec d'autres styles

### Un type de nœud n'est pas rendu

Le serializer gère les types inconnus avec un fallback :
```typescript
default:
  // Essaye de rendre les enfants si présents
  if ('children' in lexicalNode) {
    return <>{serializeChildren(lexicalNode.children)}</>
  }
  return null
```

Pour ajouter le support, voir la section "Extension du système".

---

**Dernière mise à jour** : Octobre 2025  
**Auteur** : Cinquin Andy - andy-cinquin.fr

