/**
 * Configuration globale de l'application WARA
 */

const CONFIG = {
    API_URL: "http://localhost:1337",
    STRAPI_BASE_URL: "http://localhost:1337",
    ENDPOINTS: {
        PRODUCTS: "/api/products",
        CONCEPT: "/api/concept"
    },
    // Optimisation Strapi 5 : Ne demander que les champs nécessaires pour les grilles
    GRID_FIELDS: ["nom", "prix", "eco_score", "temps_biodegradation"],
    POPULATE_IMAGE: "populate[image][fields][0]=url&populate[image][fields][1]=formats"
};

// Exporter pour usage (si environnement module, sinon global)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
