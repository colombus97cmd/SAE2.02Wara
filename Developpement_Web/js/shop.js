/**
 * Gestion de la page Boutique WARA
 */

async function displayProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'fr';
    const t = translations[lang];

    // Afficher un message de chargement
    productsGrid.innerHTML = `<p class="loading-msg">${t['featured_loading']}</p>`;

    // Récupérer les produits depuis Strapi via l'API optimisée
    const products = await fetchProducts();

    if (products.length === 0) {
        productsGrid.innerHTML = `<p class="empty-msg">${t['shop_empty']}</p>`;
        return;
    }

    // Vider la grille et afficher les produits
    productsGrid.innerHTML = ""; 

    products.forEach(product => {
        // Utilisation du composant unifié
        productsGrid.innerHTML += createProductCard(product, t);
    });
}

// Lancer l'affichage au chargement de la page
document.addEventListener('DOMContentLoaded', displayProducts);

// Recharger si la langue change
window.addEventListener('languageChanged', displayProducts);
