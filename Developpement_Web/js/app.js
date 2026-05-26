// Fichier principal JavaScript
// Objectif : Gérer les interactions UI (Menu burger, animations, preloader)

// Timing global pour le préchargeur (page transition)
window.preloaderStartTime = Date.now();
window.isAsyncLoading = false; // Sera mis à true par les pages chargeant des données dynamiques (comme produit.html, boutique.html, index.html)

window.hidePreloader = function() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    const minDuration = 2800; // Affichage minimum de 2.8 secondes pour admirer l'animation
    const elapsed = Date.now() - window.preloaderStartTime;
    const remainingTime = Math.max(0, minDuration - elapsed);
    
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800); // Temps de la transition d'opacité en CSS
    }, remainingTime);
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('Application initialisée. Prêt pour la SAE 2.02 !');

    // Masquage automatique du preloader pour les pages statiques (concept, panier...)
    // On laisse un court délai pour permettre aux autres scripts d'initialiser window.isAsyncLoading si nécessaire
    setTimeout(() => {
        if (!window.isAsyncLoading) {
            window.hidePreloader();
        }
    }, 50);

    // Initialiser AOS (Animations au défilement)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }

    // Logique du menu burger pour mobile
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('toggle');
            burgerMenu.setAttribute('aria-expanded', isActive);
        });
    }
});
