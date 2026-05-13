/**
 * Composants UI réutilisables pour WARA
 */

/**
 * Génère le HTML d'une carte produit unifiée
 * @param {Object} product - Les données du produit venant de Strapi
 * @param {Object} translations - Les traductions actuelles
 * @returns {string} - Le HTML de la carte
 */
function createProductCard(product, t) {
    const attrs = product.attributes || product; // Gère Strapi 4 et 5
    const id = product.id;
    
    // Optimisation Image : Utiliser le format 'small' ou 'thumbnail' si disponible, sinon l'original
    let imageUrl = 'https://via.placeholder.com/300x400?text=WARA';
    // Strapi v5 : image est directement un objet (pas de .data.attributes)
    // Strapi v4 : image.data.attributes.url
    const imgData = attrs.image?.data?.attributes || attrs.image;
    if (imgData?.url) {
        const formats = imgData.formats;
        const path = formats?.small?.url || formats?.thumbnail?.url || imgData.url;
        imageUrl = path.startsWith('http') ? path : `${CONFIG.STRAPI_BASE_URL}${path}`;
    }

    return `
        <article class="product-card" data-aos="fade-up">
            <div class="product-image">
                <img src="${imageUrl}" alt="Photo de ${attrs.nom}" loading="lazy">
                ${attrs.eco_score ? `<span class="eco-badge">${t['shop_eco_score']} ${attrs.eco_score}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${attrs.nom}</h3>
                <p class="price" aria-label="Prix : ${attrs.prix.toFixed(2)} euros">${attrs.prix.toFixed(2)} €</p>
                ${attrs.temps_biodegradation ? `
                    <p class="bio-time" title="${t['shop_bio_time']}">
                        <span class="icon">⏳</span> ${attrs.temps_biodegradation}
                    </p>
                ` : ''}
                <div class="product-actions">
                    <a href="produit.html?id=${id}" class="btn-secondary full-width" aria-label="${t['shop_view_product']} ${attrs.nom}">
                        ${t['shop_view_product']}
                    </a>
                </div>
            </div>
        </article>
    `;
}

/**
 * Affiche une notification (Toast)
 * @param {string} message - Le message à afficher
 * @param {string} type - 'success', 'info', 'error'
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
