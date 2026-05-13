# Journal de Bord - Développement Web SAE 2.02
## Projet : Vêtements Biodégradables (Portail Web)

Ce document retrace l'avancée du développement du portail web pour la SAE 2.02. L'objectif est de concevoir une plateforme e-commerce éco-conçue pour la vente de vêtements biodégradables (notamment à base de sargasses).

### Objectifs Clés
- **Cible :** Millennials et Génération Z, éco-responsables.
- **Identité visuelle :** "Made in Guadeloupe" / Caraïbes.
- **Storytelling :** "Born from the Caribbean plague" (Transformer le fléau des sargasses en ressource).
- **Contraintes techniques :** Éco-conception web, accessibilité (WCAG), approche Mobile-First.

---

## 📅 Suivi des Tâches (To-Do List)

### Étape 1 : Initialisation & Cadrage
- [x] Création de l'arborescence du projet (HTML, CSS, JS).
- [x] Mise en place du Journal de Bord (README.md).
- [x] Définir l'arborescence exacte du site (Sitemap).
- [x] Lister les éléments de contenu par page pour Figma.

### Étape 2 : Conception UX/UI (Maquettage)
- [ ] Créer les wireframes (zoning) sur Figma basés sur la liste de contenu.
- [ ] Définir la charte graphique web (couleurs naturelles, typographies lisibles).
- [ ] Réaliser les wireframes (zoning) des pages principales (Mobile & Desktop).
- [ ] Définir la charte graphique web (couleurs naturelles, typographies lisibles).
- [ ] Valider les composants UI (boutons, cartes produits avec éco-score).

### Étape 3 : Développement Front-End (Intégration)
- [x] Développer la structure sémantique globale (`<header>`, `<main>`, `<footer>`).
- [x] Intégrer la page d'accueil (Hero banner "Sargasses", réassurance bio).
- [x] Intégrer la page "Boutique" (Grille de produits).
- [x] Intégrer la page "Produit" (Timeline de décomposition, composition exacte).
- [x] Ajouter les interactions en JavaScript (Menu burger, filtrage).

### Étape 4 : Backend & CMS (Strapi)
- [x] Installation de Strapi CMS dans le dossier `/backend`.
- [x] Configuration des Content-Types (Produit, Concept).
- [x] Création d'une API de liaison (`js/api.js`).
- [x] Dynamisation de la Boutique (`js/shop.js`).
- [x] Dynamisation des fiches produits (`js/product-detail.js`).
- [x] Dynamisation de la page Concept (`js/concept.js`).
- [x] Implémentation du système de Panier (LocalStorage + Calcul d'impact éco).

### Étape 5 : Optimisation & Tests
- [x] Internationalisation (i18n) : Mise en place du système bilingue FR/EN.
- [ ] Optimisation du poids des assets (images compressées) pour l'éco-conception.
- [x] Vérification du responsive design (Menu Burger activé sur tout le site).
- [x] Optimisation SEO (Balises meta, OpenGraph, attributs alt dynamiques).
- [ ] Tests d'accessibilité (contrastes, navigation clavier).

---

## 🌍 Internationalisation (i18n)
Le site supporte désormais le Français et l'Anglais.
- **Frontend :** Les textes statiques sont gérés par `js/translations.js` et injectés via `js/i18n.js` (attributs `data-i18n`).
- **Backend :** Les Content-Types Strapi sont configurés pour l'i18n.
- **Activation EN dans Strapi :**
    1. Aller dans *Settings* > *Internationalization*.
    2. Ajouter la locale "English (en)".
    3. Dans le *Content Manager*, vous pouvez maintenant traduire vos produits et contenus de page.
- **CMS :** Choix de **Strapi 5** (Headless CMS) pour sa flexibilité et sa modernité.
- **Architecture :** Séparation claire entre le `frontend` (HTML/JS pur) et le `backend` (API Strapi).
- **Éco-conception :** Utilisation de JavaScript pour ne charger que les données nécessaires, limitant le poids des pages.
- **Lancement du projet :**
    - Frontend : Ouvrir `index.html` avec Live Server.
    - Backend : `cd backend && npm run develop`.

