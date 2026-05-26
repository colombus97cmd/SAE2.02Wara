window.isAsyncLoading = true;

async function loadConcept() {
    try {
        const data = await fetchConceptData(); // Fonction définie dans api.js
        if (!data) return;

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

        // Mise à jour de l'image de bannière
        const bannerImg = document.getElementById('concept-banner-img');
        const bannerContainer = document.getElementById('concept-banner-container');
        const bannerData = attrs.image_banniere?.data || attrs.image_banniere;
        if (bannerImg && bannerContainer && bannerData) {
            const bannerAttr = bannerData.attributes || bannerData;
            if (bannerAttr && bannerAttr.url) {
                const imgUrl = bannerAttr.url.startsWith('http') ? bannerAttr.url : `${CONFIG.STRAPI_BASE_URL}${bannerAttr.url}`;
                bannerImg.src = imgUrl;
                bannerImg.alt = bannerAttr.alternativeText || attrs.titre || "Illustration Concept WARA";
                bannerContainer.style.display = 'block';
            }
        }
    } catch (error) {
        console.error("Erreur dans loadConcept :", error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadConcept();
    if (typeof window.hidePreloader === 'function') {
        window.hidePreloader();
    }
});

// Recharger si la langue change
window.addEventListener('languageChanged', loadConcept);
