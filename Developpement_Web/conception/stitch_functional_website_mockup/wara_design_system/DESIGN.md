---
name: WARA Design System
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#434843'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#737973'
  outline-variant: '#c3c8c1'
  surface-tint: '#4d6453'
  primary: '#061b0e'
  on-primary: '#ffffff'
  primary-container: '#1b3022'
  on-primary-container: '#819986'
  inverse-primary: '#b4cdb8'
  secondary: '#8d4d30'
  on-secondary: '#ffffff'
  secondary-container: '#feaa87'
  on-secondary-container: '#783c21'
  tertiary: '#211500'
  on-tertiary: '#ffffff'
  tertiary-container: '#3b2800'
  on-tertiary-container: '#ad8e5a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d0e9d4'
  primary-fixed-dim: '#b4cdb8'
  on-primary-fixed: '#0b2013'
  on-primary-fixed-variant: '#364c3c'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#ffb597'
  on-secondary-fixed: '#360f00'
  on-secondary-fixed-variant: '#70361c'
  tertiary-fixed: '#ffdea8'
  tertiary-fixed-dim: '#e4c288'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5a4316'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
  sargasse-gold: '#9B7E4B'
  deep-ocean: '#1B3022'
  sand-white: '#F9F7F2'
  leaf-green: '#4A5D45'
  earth-terracotta: '#C27858'
typography:
  display-lg:
    fontFamily: ebGaramond
    fontSize: 4rem
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: ebGaramond
    fontSize: 2.5rem
    fontWeight: '500'
    lineHeight: '1.2'
  headline-h1:
    fontFamily: ebGaramond
    fontSize: 3rem
    fontWeight: '500'
    lineHeight: '1.2'
  headline-h2:
    fontFamily: ebGaramond
    fontSize: 2.25rem
    fontWeight: '500'
    lineHeight: '1.3'
  headline-h3:
    fontFamily: ebGaramond
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: outfit
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: outfit
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
  label-bold:
    fontFamily: outfit
    fontSize: 0.875rem
    fontWeight: '700'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: outfit
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

# WARA | Design System & Spécifications Visuelles
## "Born from the Caribbean plague"

Ce document définit l'identité visuelle et les directives de design pour le projet WARA. Il sert de guide pour assurer la cohérence entre la vision de la marque et son intégration technique.

---

## 1. Vision & Identité
- **Concept :** Transformation des sargasses (fléau) en textile premium (solution).
- **Vibe :** Brut, organique, luxueux mais accessible, engagé, tropical-minimaliste.
- **Mots-clés :** Régénératif, Guadeloupe, Innovation, Terre, Océan.

## 2. Palette de Couleurs (Eco-Palette)
La palette s'inspire directement du cycle de vie de la sargasse et des paysages de la Guadeloupe.

| Couleur | Hex | Usage | Signification |
| :--- | :--- | :--- | :--- |
| **Sargasse Gold** | `#9B7E4B` | Accents, badges | La sargasse séchée au soleil |
| **Deep Ocean** | `#1B3022` | Textes, Header, Boutons Primaires | La mer des Caraïbes profonde |
| **Sand White** | `#F9F7F2` | Background principal | Le sable de Grande-Anse |
| **Leaf Green** | `#4A5D45` | Éléments bio, Eco-score | La forêt tropicale |
| **Earth Terracotta** | `#C27858` | Boutons secondaires, Hover | La terre de Basse-Terre |

## 3. Typographie
Mélange d'une Serif élégante pour l'aspect premium et d'une Sans-Serif moderne pour l'accessibilité.

- **Titres (H1, H2, H3) :** `Cormorant Garamond` (Serif) - *Élégance, Histoire, Nature.*
- **Corps de texte & UI :** `Outfit` (Sans-Serif) - *Modernité, Clarté, Technique.*

## 4. Composants UI
### Les Boutons
- **Primaire :** Fond `Deep Ocean`, texte `Sand White`, coins 4px. Transition 0.3s.
- **Secondaire :** Bordure 1px `Sargasse Gold`, texte `Sargasse Gold`, fond transparent.
- **Eco-Badge :** Pillule verte avec icône `leaf` (usage de `Leaf Green`).

### Les Cartes Produits
- **Style :** Minimaliste, sans bordures visibles, ombres très légères (`rgba(0,0,0,0.05)`).
- **Image :** Ratio 3:4, effet de zoom doux au survol.
- **Typo :** Titre en `Cormorant`, prix en `Outfit` bold.

## 5. Structure des Pages (Layouts)

### Accueil (Index)
- **Hero :** Titre Serif + Image immersive.
- **Grid Engagements :** 3 colonnes avec icônes SVG organiques.
- **Featured :** Grille de 3 produits (Composant unifié).

### Page Produit
- **Layout :** 2 colonnes asymétriques.
- **Interactive :** Timeline de biodégradation (0 -> 61 jours).

---

## 6. Accessibilité & Éco-conception
- **Contrastes :** Minimum 4.5:1 (WCAG 2.1 AA).
- **Navigation :** Focus visible, ordre de tabulation logique.
- **Assets :** Images optimisées (Strapi thumbnails), Lazy-loading.
