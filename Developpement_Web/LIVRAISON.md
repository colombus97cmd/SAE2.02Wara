# 🔑 Kit de Livraison & Guide d'Exploitation — Projet WARA
## SAE 2.02 - BUT MMI Guadeloupe

Ce document constitue le livrable technique officiel pour la **remise des clés** du site WARA au client/prestataire fictif. Il regroupe les accès de production, la documentation technique et le guide d'utilisation du CMS Strapi.

---

## 1. 🌐 Liens de Production & Accès

### A. Hébergement
* **Site Web Public (Frontend)** : `https://[votre-projet].vercel.app` (Hébergé sur Vercel)
* **Code Source (Dépôt Git)** : `https://github.com/[votre-pseudo]/[nom-du-repo]` (GitHub)
* **CMS Strapi (Backend)** : 
  * En ligne (optionnel) : `https://[votre-api].render.com/admin` (Render)
  * Local (mode secours) : `http://localhost:1337/admin` (Exécution sur machine locale)

### B. Comptes d'Administration (Remise des Clés)
Ces accès sont remis au client pour lui transférer le contrôle total de la plateforme.

| Plateforme | Rôle | Identifiant / E-mail | Mot de passe |
| :--- | :--- | :--- | :--- |
| **GitHub** | Propriétaire du Code | `client@wara.gp` *(ou partage du repo)* | *Géré par GitHub* |
| **Vercel** | Gestionnaire Hébergement | `client@wara.gp` *(liaison GitHub)* | *Géré par Vercel* |
| **Strapi Admin** | Administrateur CMS | `admin.client@wara.gp` | `WaraGuadeloupe2026!` *(À modifier)* |

---

## 2. 📝 Guide d'Utilisation : Ajouter du Contenu sur Strapi

Pour modifier les textes du site ou ajouter de nouveaux vêtements biodégradables, connectez-vous à la console Strapi et suivez ces instructions.

### Ajouter un Vêtement dans la Boutique
1. Rendez-vous sur le panneau d'administration de Strapi dans l'onglet **Content Manager** > **Product**.
2. Cliquez sur **Create new entry**.
3. Remplissez les informations de base (Nom du vêtement, description, prix, éco-score, temps de biodégradation).
4. Ajoutez une photo du vêtement dans le champ **image**.
5. Renseignez les étapes de fabrication dans le bloc **etapes_tracabilite** (chaque étape possède un titre, une description narrative et une icône correspondante).
6. **Important (Multilingue)** : En haut à droite, basculez la locale sur **English (en)** et saisissez la version traduite du nom et de la description pour les utilisateurs anglophones.
7. Cliquez sur **Save** puis sur **Publish**.

### Modifier le Storytelling de la Page Concept
1. Rendez-vous dans **Content Manager** > **Concept Page** (Single Type).
2. Modifiez le titre principal, le récit historique ou le slogan (*"Ce qui détruit devient ce qui construit"*).
3. Modifiez l'image ou la vidéo de bannière si nécessaire.
4. Mettez à jour la traduction anglaise en changeant la locale en haut à droite.
5. Cliquez sur **Save** puis sur **Publish**.

---

## 3. 🛠️ Documentation Technique (Pour le Développeur)

### Prérequis Systèmes
- **Node.js** v18 ou v20+
- **NPM** v9 ou v10+

### Installation Locale
1. Clonez le dépôt Git :
   ```bash
   git clone https://github.com/[votre-pseudo]/[nom-du-repo].git
   cd [nom-du-repo]/Developpement_Web
   ```
2. Installez les dépendances du Backend (Strapi 5) :
   ```bash
   cd backend
   npm install
   ```
3. Créez un fichier `.env` dans le dossier `backend/` en copiant le fichier `.env.example`.

### Lancement en Mode Développement
* **Lancer le CMS Strapi (Backend)** :
  ```bash
  cd backend
  npm run develop
  ```
  Le serveur écoute sur [http://localhost:1337](http://localhost:1337).
* **Lancer le Frontend** :
  Ouvrez simplement le fichier `index.html` à la racine de `Developpement_Web` en utilisant l'extension *Live Server* de VS Code ou tout autre serveur local (ex: `npx serve .`).

---

## 4. 📄 Modèle de PV de Recette (À faire signer)

*(Ce document est à imprimer ou à signer numériquement pour clore contractuellement le projet)*

### **PROCÈS-VERBAL DE RÉCEPTION DU SITE WEB "WARA"**

Entre les soussignés :
- **L'Équipe Projet BUT MMI** (Le Prestataire)
- **Le Jury de la SAE 2.02 / Client fictif WARA** (Le Client)

Il a été procédé le **[Date de la soutenance]** à la recette globale du site internet WARA.

**Constats effectués :**
- [x] L'intégration de la charte graphique et du design responsive est conforme (Mobile First).
- [x] La liaison avec le CMS Strapi est opérationnelle (Dynamisation de la boutique et de la page concept).
- [x] Le module de traçabilité narrative ("De la plage au vêtement") est intégré et fonctionnel.
- [x] Le Style Quiz interactif recommande les looks adaptés aux utilisateurs.
- [x] Le site est entièrement bilingue (Français / Anglais).

**Décision :**
* `[ ]` **Réception prononcée sans réserve** : Le client accepte le site web en l'état.
* `[ ]` **Réception prononcée avec réserves** : Les ajustements listés en annexe doivent être réalisés par le prestataire sous un délai de 7 jours.

| Signature du Prestataire | Signature du Client |
| :--- | :--- |
| | |
