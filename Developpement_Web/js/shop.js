/**
 * Gestion de la page Boutique WARA
 */

let allProducts = []; // Stockage global pour filtrer sans refaire de requêtes API

async function displayProducts() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'fr';
    const t = translations[lang];

    // Afficher un message de chargement si c'est la première requête
    if (allProducts.length === 0) {
        productsGrid.innerHTML = `<p class="loading-msg">${t['featured_loading']}</p>`;
        allProducts = await fetchProducts();
    }

    // Récupérer les filtres actifs
    const activeCategories = Array.from(document.querySelectorAll('.filter-category:checked')).map(el => el.value);
    const activeMaterials = Array.from(document.querySelectorAll('.filter-material:checked')).map(el => el.value);

    // Filtrer les produits localement (éco-conception)
    const filteredProducts = allProducts.filter(product => {
        const attrs = product.attributes || product;
        
        // Filtrer par catégorie (si aucun filtre coché, on garde tout)
        const matchCategory = activeCategories.length === 0 || activeCategories.includes(attrs.categorie);
        
        // Filtrer par matière (si aucun filtre coché, on garde tout)
        const matchMaterial = activeMaterials.length === 0 || activeMaterials.includes(attrs.matiere);

        return matchCategory && matchMaterial;
    });

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `<p class="empty-msg">${t['shop_empty']}</p>`;
        return;
    }

    // Vider la grille et afficher les produits filtrés
    productsGrid.innerHTML = ""; 

    filteredProducts.forEach(product => {
        // Utilisation du composant unifié
        productsGrid.innerHTML += createProductCard(product, t);
    });

    // Re-déclencher l'analyse AOS pour les cartes ajoutées dynamiquement
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Configurer les écouteurs d'événements sur les filtres
function initFilters() {
    const filters = document.querySelectorAll('.filter-category, .filter-material');
    filters.forEach(filter => {
        filter.addEventListener('change', displayProducts);
    });
}

// Lancer l'affichage au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    initFilters();
});

// Recharger si la langue change
window.addEventListener('languageChanged', displayProducts);
