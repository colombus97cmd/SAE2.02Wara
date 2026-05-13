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
