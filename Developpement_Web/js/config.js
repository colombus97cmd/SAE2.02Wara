/**
 * Configuration globale de l'application WARA
 */

const CONFIG = {
    // Si le site tourne localement (localhost), on interroge le Strapi local.
    // Sinon (sur Vercel), on interroge le Strapi en ligne sur Render.
    API_URL: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:1337"
        : "https://sae2-02wara.onrender.com", 
    STRAPI_BASE_URL: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:1337"
        : "https://sae2-02wara.onrender.com",
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
