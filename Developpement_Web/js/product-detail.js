async function loadProductDetail() {
    // 1. Récupérer l'ID dans l'URL (ex: produit.html?id=3)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'fr';
    const t = translations[lang];

    if (!productId) {
        document.querySelector('main').innerHTML = `<h2>${t['shop_empty']}</h2>`;
        return;
    }

    // 2. Récupérer les données depuis Strapi
    const product = await fetchProductById(productId);
    if (!product) return;

    // Strapi v5: champs directement sur data, v4: dans data.attributes
    const attrs = product.attributes || product;

    // 3. Mettre à jour la page principale
    document.title = `${attrs.nom} | WARA`;
    document.querySelector('h1').innerText = attrs.nom;
    document.querySelector('.price-large').innerText = `${attrs.prix.toFixed(2)} €`;
    document.querySelector('.description').innerHTML = attrs.description || "Pas de description disponible.";
    
    const ecoTag = document.querySelector('.eco-tag');
    if (ecoTag) {
        ecoTag.innerText = `${t['shop_eco_score']} ${attrs.eco_score} - 100% ${t['engagement_bio_title']}`;
    }
    
    const bioStep = document.querySelector('.timeline-step.highlight span');
    if (bioStep && attrs.temps_biodegradation) {
        bioStep.innerText = attrs.temps_biodegradation;
    }

    // Strapi v5 : image directe, v4 : image.data.attributes
    const imgData = attrs.image?.data?.attributes || attrs.image;
    if (imgData?.url) {
        const imageUrl = imgData.url.startsWith('http') ? imgData.url : `${CONFIG.STRAPI_BASE_URL}${imgData.url}`;
        const gallery = document.querySelector('.main-image-placeholder');
        gallery.innerHTML = `<img src="${imageUrl}" alt="${attrs.nom}" style="max-width: 100%; height: auto; border-radius: 8px;">`;
        gallery.classList.remove('main-image-placeholder');
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
