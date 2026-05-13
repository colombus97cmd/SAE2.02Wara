async function loadConcept() {
    const data = await fetchConceptData(); // Fonction définie dans api.js
    if (!data) return;

    // Si on a des données localisées de Strapi, on les utilise.
    // Sinon, i18n.js a déjà mis à jour les textes statiques via data-i18n.
    
    // Note: Dans Strapi, si la localisation n'est pas encore configurée côté admin,
    // data.attributes contiendra toujours le texte français par défaut.

    // Strapi v5: champs directement sur data, v4: dans data.attributes
    const attrs = data.attributes || data;

    // Mise à jour du titre et du slogan (Priorité aux données Strapi si présentes)
    if (document.querySelector('.storytelling h1') && attrs.titre) {
        document.querySelector('.storytelling h1').innerText = attrs.titre;
    }
    
    // Mise à jour de l'histoire
    if (document.querySelector('.concept-text p')) {
        document.querySelector('.concept-text p').innerHTML = attrs.notre_histoire || "Histoire à venir...";
    }

    // Mise à jour du slogan ou du lead
    const lead = document.querySelector('.lead');
    if (lead && attrs.slogan) {
        lead.innerText = attrs.slogan;
    }
}

document.addEventListener('DOMContentLoaded', loadConcept);

// Recharger si la langue change
window.addEventListener('languageChanged', loadConcept);
