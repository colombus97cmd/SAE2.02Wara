/**
 * Service API pour WARA
 * Gère les appels vers le CMS Strapi 5
 */

/**
 * Récupère la langue actuelle depuis i18n.js
 */
function getLocale() {
    if (typeof getCurrentLanguage === 'function') {
        return getCurrentLanguage();
    }
    return 'fr';
}

/**
 * Récupère tous les produits depuis Strapi avec optimisation
 */
async function fetchProducts() {
    try {
        const locale = getLocale();
        // Construction de l'URL optimisée (éco-conception)
        const fields = CONFIG.GRID_FIELDS.map((f, i) => `fields[${i}]=${f}`).join('&');
        const url = `${CONFIG.API_URL}${CONFIG.ENDPOINTS.PRODUCTS}?locale=${locale}&${fields}&${CONFIG.POPULATE_IMAGE}`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        return result.data; 
    } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        return [];
    }
}

/**
 * Récupère un seul produit par son ID (détails complets)
 */
async function fetchProductById(id) {
    try {
        const locale = getLocale();
        const url = `${CONFIG.API_URL}${CONFIG.ENDPOINTS.PRODUCTS}/${id}?locale=${locale}&populate=*`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du produit:", error);
        return null;
    }
}

/**
 * Récupère le contenu de la page Concept
 */
async function fetchConceptData() {
    try {
        const locale = getLocale();
        const url = `${CONFIG.API_URL}${CONFIG.ENDPOINTS.CONCEPT}?locale=${locale}&populate=*`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du concept:", error);
        return null;
    }
}
