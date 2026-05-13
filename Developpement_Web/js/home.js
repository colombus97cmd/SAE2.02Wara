/**
 * Gestion de la page d'accueil WARA
 */

async function loadFeaturedProducts() {
    const homeGrid = document.querySelector('.home-grid');
    if (!homeGrid) return;

    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'fr';
    const t = translations[lang];

    // Afficher un message de chargement
    homeGrid.innerHTML = `<p class="loading-msg">${t['featured_loading']}</p>`;

    // Récupérer les produits depuis l'API optimisée
    const products = await fetchProducts();
    
    if (products.length === 0) {
        homeGrid.innerHTML = `<p class="empty-msg">${t['featured_empty']}</p>`;
        return;
    }

    // On prend les 3 premiers (les plus récents si triés par Strapi)
    const featured = products.slice(0, 3);
    homeGrid.innerHTML = "";

    featured.forEach(product => {
        // Utilisation du composant unifié dans js/components.js
        homeGrid.innerHTML += createProductCard(product, t);
    });
}

document.addEventListener('DOMContentLoaded', loadFeaturedProducts);

// Recharger si la langue change
window.addEventListener('languageChanged', loadFeaturedProducts);
