# Documents de Production : Base de Données (Projet WARA)

Ce document regroupe l'ensemble des livrables techniques concernant la conception et la structure de la base de données du projet WARA (SAE 2.02).

---

## 1. Dictionnaire de Données

Le dictionnaire de données liste l'ensemble des propriétés stockées pour chaque entité du système.

### Table : Produit (Product)
| Champ | Type | Description | Contraintes |
| :--- | :--- | :--- | :--- |
| **id** | Entier | Identifiant unique du produit | PK, Auto-incrément |
| **nom** | Chaîne | Nom commercial du vêtement (ex: "T-shirt Sargasse") | Requis, Localisé |
| **description** | Texte Riche | Description détaillée (storytelling, caractéristiques) | Localisé |
| **prix** | Décimal | Prix de vente TTC en euros | Requis |
| **image** | Média | Relation vers le fichier image (stocké via Strapi) | Requis |
| **eco_score** | Enum | Score environnemental du produit (A, B, C, D, E) | - |
| **temps_biodegradation** | Chaîne | Texte indiquant la durée de décomposition | Localisé |
| **etapes_tracabilite** | Composant | Liste ordonnée des étapes de fabrication | Répétable |

### Table : Concept (Concept Page)
| Champ | Type | Description | Contraintes |
| :--- | :--- | :--- | :--- |
| **id** | Entier | Identifiant unique de la page | PK |
| **titre** | Chaîne | Titre principal de la page Concept | Requis, Localisé |
| **notre_histoire** | Texte Riche | Texte de présentation de la marque et du projet | Localisé |
| **image_banniere** | Média | Image de couverture de la page | - |
| **slogan** | Chaîne | Slogan de la marque WARA | Localisé |

### Composant : Etape de Traçabilité
| Champ | Type | Description | Contraintes |
| :--- | :--- | :--- | :--- |
| **id** | Entier | Identifiant de l'instance du composant | PK |
| **titre** | Chaîne | Nom de l'étape (ex: "Collecte des Sargasses") | Requis |
| **description** | Texte | Explications sur le processus technique de l'étape | Requis |
| **icone** | Chaîne | Identifiant ou classe de l'icône à afficher | - |

---

## 2. MCD (Modèle Conceptuel de Données)

Le MCD représente les entités et leurs relations logiques.

```mermaid
erDiagram
    PRODUIT ||--o{ ETAPE_TRACABILITE : "possède"
    PRODUIT ||--|| MEDIA : "est illustré par"
    CONCEPT ||--|| MEDIA : "utilise"

    PRODUIT {
        string nom
        richtext description
        decimal prix
        string eco_score
        string temps_biodegradation
    }

    ETAPE_TRACABILITE {
        string titre
        text description
        string icone
    }

    CONCEPT {
        string titre
        richtext notre_histoire
        string slogan
    }

    MEDIA {
        string url
        string mime
        integer size
    }
```

---

## 3. MLD (Modèle Logique de Données)

Le MLD traduit les relations en structure de tables prêtes pour une base relationnelle.

- **PRODUIT** (<u>id_produit</u>, nom, description, prix, eco_score, temps_biodegradation, #id_media)
- **ETAPE_TRACABILITE** (<u>id_etape</u>, titre, description, icone, #id_produit)
- **CONCEPT** (<u>id_concept</u>, titre, notre_histoire, slogan, #id_media_banniere)
- **MEDIA** (<u>id_media</u>, url, mime, size, hash, extension)

---

## 4. Schéma Physique (MPD / Script SQL)

Voici le script SQL théorique permettant de créer la structure de base de données correspondante.

```sql
-- Création de la table Media (Gestionnaire de fichiers)
CREATE TABLE media (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    mime VARCHAR(50),
    size INTEGER,
    extension VARCHAR(10)
);

-- Création de la table Produit
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix DECIMAL(10, 2) NOT NULL,
    eco_score VARCHAR(1) CHECK (eco_score IN ('A', 'B', 'C', 'D', 'E')),
    temps_biodegradation VARCHAR(255),
    image_id INTEGER REFERENCES media(id) ON DELETE SET NULL
);

-- Création de la table pour les Etapes de Traçabilité (Relation 1:N avec Produit)
CREATE TABLE product_tracabilite_steps (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icone VARCHAR(255),
    product_id INTEGER REFERENCES product(id) ON DELETE CASCADE
);

-- Création de la table pour la page Concept
CREATE TABLE concept_page (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    notre_histoire TEXT,
    slogan VARCHAR(255),
    image_banniere_id INTEGER REFERENCES media(id) ON DELETE SET NULL
);
```
