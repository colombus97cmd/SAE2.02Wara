// Fichier principal JavaScript
// Objectif : Gérer les interactions UI (Menu burger, animations légères)

document.addEventListener('DOMContentLoaded', () => {
    console.log('Application initialisée. Prêt pour la SAE 2.02 !');

    // Initialiser AOS (Animations au défilement)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }

    // TODO: Implémenter la logique du menu burger pour mobile
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
