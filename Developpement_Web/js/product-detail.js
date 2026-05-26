async function loadProductDetail() {
    // 1. Récupérer l'ID dans l'URL (ex: produit.html?id=3)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'fr';
    const t = translations[lang];

    if (!productId) {
        document.querySelector('main').innerHTML = `<h2>${t['shop_empty']}</h2>`;
        hidePreloader();
        return;
    }

    let imgData = null;

    // 2. Récupérer les données depuis Strapi
    try {
        const product = await fetchProductById(productId);
        if (!product) {
            document.querySelector('main').innerHTML = `
                <div class="container" style="text-align: center; padding: var(--spacing-xl) 0; max-width: 600px; margin: 0 auto;">
                    <h2 style="margin-bottom: 1rem; color: var(--color-accent);">⚠️ Erreur de chargement</h2>
                    <p>Impossible de récupérer les détails de ce vêtement depuis le CMS Strapi (ID: ${productId}).</p>
                    <div style="background: #FFF5F5; border: 1px solid #FEB2B2; padding: 1.5rem; border-radius: 8px; text-align: left; margin: 20px 0; font-size: 0.9rem; line-height: 1.5; color: #9B2C2C;">
                        <strong>Vérifications recommandées :</strong>
                        <ul style="margin-left: 20px; margin-top: 10px;">
                            <li>Vérifie que la permission <strong>findOne</strong> est bien cochée pour la collection <strong>Product</strong> dans le rôle <strong>Public</strong> (Settings > Roles > Public > Product dans Strapi).</li>
                            <li>Vérifie que le produit avec l'ID ${productId} est bien <strong>publié</strong> (Published) et non en brouillon.</li>
                            <li>Vérifie que l'URL Render configurée dans ton <code>js/config.js</code> est correcte.</li>
                        </ul>
                    </div>
                    <a href="boutique.html" class="btn-primary" style="margin-top: 10px;">Retour à la boutique</a>
                </div>
            `;
            return;
        }

        // Strapi v5: champs directement sur data, v4: dans data.attributes
        const attrs = product.attributes || product;

    // 3. Mettre à jour la page principale
    document.title = `${attrs.nom} | WARA`;
    document.querySelector('h1').innerText = attrs.nom;
    document.querySelector('.price-large').innerText = `${attrs.prix.toFixed(2)} €`;
    document.querySelector('.description').innerHTML = attrs.description || "Pas de description disponible.";
    
    // Charger la composition de manière dynamique si elle est saisie dans le CMS
    const compList = document.getElementById('product-composition');
    if (compList && attrs.composition) {
        // La composition est saisie sous forme de valeurs séparées par des virgules
        const items = attrs.composition.split(',').map(item => `<li>${item.trim()}</li>`).join('');
        compList.innerHTML = items;
    }
    
    const ecoTag = document.querySelector('.eco-tag');
    if (ecoTag) {
        ecoTag.innerText = `${t['shop_eco_score']} ${attrs.eco_score} - 100% ${t['engagement_bio_title']}`;
    }
    
    const bioStep = document.querySelector('.timeline-step.highlight span');
    if (bioStep && attrs.temps_biodegradation) {
        bioStep.innerText = attrs.temps_biodegradation;
    }

    // Gestion de la galerie d'images multiple
    let images = attrs.image?.data || attrs.image;
    if (images) {
        // S'assurer qu'on manipule un tableau d'images
        if (!Array.isArray(images)) {
            images = [images];
        }

        // Nettoyer et filtrer les images valides (compatible Strapi 4 & 5)
        const imgList = images.map(img => img.attributes || img).filter(img => img && img.url);

        if (imgList.length > 0) {
            imgData = imgList[0];
            // Afficher la première image dans l'affichage principal
            const firstImgUrl = imgList[0].url.startsWith('http') ? imgList[0].url : `${CONFIG.STRAPI_BASE_URL}${imgList[0].url}`;
            const mainGallery = document.querySelector('.main-image-placeholder');
            if (mainGallery) {
                mainGallery.innerHTML = `<img id="main-product-img" src="${firstImgUrl}" alt="${attrs.nom}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
                mainGallery.classList.remove('main-image-placeholder');
            }

            // Générer et afficher les vignettes (thumbnails)
            const thumbnailsContainer = document.querySelector('.thumbnails');
            if (thumbnailsContainer) {
                thumbnailsContainer.innerHTML = imgList.map((img, index) => {
                    const thumbUrl = img.formats?.thumbnail?.url || img.url;
                    const fullUrl = img.url.startsWith('http') ? img.url : `${CONFIG.STRAPI_BASE_URL}${img.url}`;
                    const activeClass = index === 0 ? 'active' : '';
                    return `
                        <div class="thumb-item ${activeClass}" role="listitem" data-full="${fullUrl}">
                            <img src="${thumbUrl.startsWith('http') ? thumbUrl : `${CONFIG.STRAPI_BASE_URL}${thumbUrl}`}" alt="Vignette ${index + 1}">
                        </div>
                    `;
                }).join('');

                // Ajouter l'effet de clic pour alterner les images
                const thumbItems = thumbnailsContainer.querySelectorAll('.thumb-item');
                thumbItems.forEach(item => {
                    item.addEventListener('click', (e) => {
                        const target = e.currentTarget;
                        const fullUrl = target.getAttribute('data-full');
                        
                        // Modifier l'image principale
                        const mainImg = document.getElementById('main-product-img');
                        if (mainImg) mainImg.src = fullUrl;

                        // Mettre à jour l'état actif des bordures
                        thumbItems.forEach(t => t.classList.remove('active'));
                        target.classList.add('active');
                    });
                });
            }
        }
    }

    // 4. Charger la Timeline de Traçabilité
    loadTimeline(attrs.etapes_tracabilite);

    // --- Gestion du Panier ---
    const addToCartBtn = document.querySelector('.btn-primary');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const selectedSize = document.querySelector('input[name="size"]:checked')?.value || 'M';
            const cartItem = {
                id: product.id,
                nom: attrs.nom,
                prix: attrs.prix,
                taille: selectedSize,
                image: imgData?.url ? (imgData.url.startsWith('http') ? imgData.url : `${CONFIG.STRAPI_BASE_URL}${imgData.url}`) : null,
                quantite: 1
            };
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingIndex = cart.findIndex(item => item.id === cartItem.id && item.taille === cartItem.taille);
            if (existingIndex !== -1) {
                cart[existingIndex].quantite += 1;
            } else {
                cart.push(cartItem);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Notification "Pro" via Toast (défini dans components.js)
            const successMsg = lang === 'fr' 
                ? `${attrs.nom} (Taille ${selectedSize}) ajouté au panier !`
                : `${attrs.nom} (Size ${selectedSize}) added to cart!`;
            
            if (typeof showToast === 'function') {
                showToast(successMsg, 'success');
            } else {
                alert(successMsg);
            }
        });
    }
    } catch (error) {
        console.error("Erreur dans loadProductDetail :", error);
    } finally {
        hidePreloader();
    }
}

/**
 * Génère et affiche la timeline
 */
function loadTimeline(etapes) {
    const timelineContainer = document.getElementById('product-timeline');
    
    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'fr';

    // Étapes par défaut si aucune donnée Strapi (Traduites)
    const defaultEtapes = lang === 'fr' ? [
        { icone: "🌊", titre: "La côte guadeloupéenne", description: "Collecte manuelle des sargasses sur les plages de Capesterre-Belle-Eau." },
        { icone: "👨‍🌾", titre: "L'agriculteur local", description: "Partenariat avec Jean-Pierre pour la valorisation des déchets agricoles." },
        { icone: "⚗️", titre: "La transformation", description: "Extraction artisanale de la fibre dans notre laboratoire de recherche." },
        { icone: "✂️", titre: "L'atelier de confection", description: "Tissage et couture réalisés par les mains expertes de nos artisans à Basse-Terre." },
        { icone: "📦", titre: "Zéro déchet", description: "Emballage 100% compostable et bilan carbone neutre." },
        { icone: "⌛", titre: "Fin de vie", description: "Le vêtement retourne à la terre en seulement 61 jours." }
    ] : [
        { icone: "🌊", titre: "The Guadeloupean coast", description: "Manual collection of sargassum on the beaches of Capesterre-Belle-Eau." },
        { icone: "👨‍🌾", titre: "The local farmer", description: "Partnership with Jean-Pierre for the valorization of agricultural waste." },
        { icone: "⚗️", titre: "The transformation", description: "Artisanal fiber extraction in our research laboratory." },
        { icone: "✂️", titre: "The sewing workshop", description: "Weaving and sewing carried out by the expert hands of our artisans in Basse-Terre." },
        { icone: "📦", titre: "Zero waste", description: "100% compostable packaging and carbon neutral balance." },
        { icone: "⌛", titre: "End of life", description: "The garment returns to the earth in just 61 days." }
    ];

    const dataToUse = (etapes && etapes.length > 0) ? etapes : defaultEtapes;

    timelineContainer.innerHTML = dataToUse.map((step, index) => `
        <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'} animate-item">
            <div class="timeline-content">
                <h3><span>${step.icone || '🌱'}</span> ${step.titre}</h3>
                <p>${step.description}</p>
            </div>
        </div>
    `).join('');

    // Animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.animate-item').forEach(item => observer.observe(item));
}

document.addEventListener('DOMContentLoaded', loadProductDetail);

// Recharger si la langue change
window.addEventListener('languageChanged', loadProductDetail);

/**
 * Cache le préchargeur avec une animation de fondu
 */
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800); // Durée de la transition CSS (0.8s)
    }
}
