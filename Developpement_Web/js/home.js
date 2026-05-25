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

    // Re-déclencher l'analyse AOS pour les cartes ajoutées dynamiquement
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

/**
 * Diaporama des vidéos de bannière Hero en arrière-plan avec fondu doux
 */
function initHeroVideoSlideshow() {
    const v1 = document.getElementById('hero-video-1');
    const v2 = document.getElementById('hero-video-2');
    if (!v1 || !v2) return;

    // Liste des vidéos locales à faire défiler
    const videos = [
        "assets/vid%C3%A9o%20bani%C3%A8re/vid.mp4",
        "assets/vid%C3%A9o%20bani%C3%A8re/vid%C3%A9obanni%C3%A8re%202.mp4",
        "assets/vid%C3%A9o%20bani%C3%A8re/vid%C3%A9obanni%C3%A8re%203.mp4"
    ];

    let currentIdx = 0;
    let activeVideo = v1;
    let inactiveVideo = v2;
    let transitionStarted = false;

    // Lancer la lecture de la première vidéo
    activeVideo.play().catch(err => {
        console.log("Lecture automatique bloquée par le navigateur :", err);
    });

    function transitionToNext() {
        if (transitionStarted) return;
        transitionStarted = true;

        // Passer à la vidéo suivante
        currentIdx = (currentIdx + 1) % videos.length;
        const nextSrc = videos[currentIdx];

        // Charger et démarrer le décodage de la vidéo inactive en tâche de fond
        inactiveVideo.src = nextSrc;
        inactiveVideo.load();
        
        inactiveVideo.play().then(() => {
            // Activer la transition CSS par opacité
            activeVideo.classList.remove('active');
            inactiveVideo.classList.add('active');

            // Permuter les rôles des éléments vidéo
            const temp = activeVideo;
            activeVideo = inactiveVideo;
            inactiveVideo = temp;

            // Pause et nettoyage de l'ancienne vidéo après la fin de l'effet de fondu (1.2s)
            setTimeout(() => {
                inactiveVideo.pause();
                inactiveVideo.src = "";
                transitionStarted = false;
            }, 1200);
        }).catch(err => {
            console.error("Erreur lors de la lecture de la vidéo suivante :", err);
            transitionStarted = false;
        });
    }

    // Surveiller la progression pour lancer le fondu juste avant la fin (1.5 seconde avant la fin)
    function checkProgress(e) {
        const video = e.target;
        if (video.duration && video.currentTime > video.duration - 1.5) {
            transitionToNext();
        }
    }

    v1.addEventListener('timeupdate', checkProgress);
    v2.addEventListener('timeupdate', checkProgress);
    
    // Sécurité si timeupdate rate la transition de fin
    v1.addEventListener('ended', transitionToNext);
    v2.addEventListener('ended', transitionToNext);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    initHeroVideoSlideshow();
});

// Recharger si la langue change
window.addEventListener('languageChanged', loadFeaturedProducts);
