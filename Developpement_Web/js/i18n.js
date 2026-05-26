/**
 * Gestion de l'internationalisation (i18n)
 */

const LANG_KEY = "wara_preferred_language";

function getCurrentLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam === 'fr' || langParam === 'en') {
        localStorage.setItem(LANG_KEY, langParam);
        return langParam;
    }
    return localStorage.getItem(LANG_KEY) || "fr";
}

function setLanguage(lang) {
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
    applyTranslations();
    updateLinksWithLanguage();
    // Dispatch event for other scripts (like api.js or page-specific scripts)
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
}

function updateLinksWithLanguage() {
    const lang = getCurrentLanguage();
    document.querySelectorAll('a').forEach(link => {
        let href = link.getAttribute('href');
        if (!href) return;
        
        // Ignorer les liens externes, ancres pures, liens vides ou javascript/mail/tel
        if (
            href.startsWith('http://') || 
            href.startsWith('https://') || 
            href.startsWith('#') || 
            href.startsWith('javascript:') || 
            href.startsWith('mailto:') || 
            href.startsWith('tel:')
        ) {
            return;
        }

        // Séparer l'ancre si elle existe
        let hash = "";
        const hashIdx = href.indexOf('#');
        if (hashIdx !== -1) {
            hash = href.substring(hashIdx);
            href = href.substring(0, hashIdx);
        }

        // Séparer les paramètres existants si présents
        let search = "";
        const searchIdx = href.indexOf('?');
        if (searchIdx !== -1) {
            search = href.substring(searchIdx);
            href = href.substring(0, searchIdx);
        }

        const urlParams = new URLSearchParams(search);
        urlParams.set('lang', lang);
        
        link.setAttribute('href', href + '?' + urlParams.toString() + hash);
    });
}

function applyTranslations() {
    const lang = getCurrentLanguage();
    const t = translations[lang];

    if (!t) return;

    // Rechercher tous les éléments avec l'attribut data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.tagName === 'INPUT' && (el.type === 'submit' || el.type === 'button')) {
                el.value = t[key];
            } else if (el.hasAttribute('placeholder')) {
                el.placeholder = t[key];
            } else {
                el.innerText = t[key];
            }
        }
    });

    // Mettre à jour les attributs aria-label si nécessaire
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
        const key = el.getAttribute('data-i18n-aria');
        if (t[key]) {
            el.setAttribute('aria-label', t[key]);
        }
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    const currentLang = getCurrentLanguage();
    document.documentElement.lang = currentLang;
    applyTranslations();
    updateLinksWithLanguage();

    // Gestionnaire pour les boutons de changement de langue
    const langSwitchers = document.querySelectorAll('.lang-switch');
    langSwitchers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
            
            // Mettre à jour l'état actif des boutons
            langSwitchers.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });

        // Marquer le bouton actif au chargement
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        }
    });
});
