/**
 * WARA Style Quiz
 * Objectif : Recommander des produits en fonction des préférences utilisateur.
 */

let currentStep = 0;
let userAnswers = [];

function getQuizData() {
    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'fr';
    return translations[lang].quiz_questions;
}

function startQuiz() {
    currentStep = 0;
    userAnswers = [];
    showStep();
}

function showStep() {
    const quizContent = document.getElementById('quiz-content');
    const quizData = getQuizData();
    
    if (currentStep < quizData.length) {
        const step = quizData[currentStep];
        quizContent.innerHTML = `
            <h3>${step.question}</h3>
            <div class="quiz-options">
                ${step.options.map((opt, index) => `
                    <button class="btn-secondary quiz-opt" onclick="selectOption('${opt.value}')">${opt.label}</button>
                `).join('')}
            </div>
        `;
    } else {
        showResults();
    }
}

window.selectOption = (value) => {
    userAnswers.push(value);
    currentStep++;
    showStep();
};

async function showResults() {
    const quizContent = document.getElementById('quiz-content');
    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'fr';
    const t = translations[lang];

    quizContent.innerHTML = `<p>${t.quiz_analyzing}</p>`;

    // Simulation de recommandation
    const allProducts = await fetchProducts();
    const recommendations = allProducts ? allProducts.slice(0, 2) : []; 

    if (recommendations.length > 0) {
        quizContent.innerHTML = `
            <h3>${t.quiz_result_title}</h3>
            <div class="products-grid">
                ${recommendations.map(p => {
                    const attrs = p.attributes || p;
                    let imageUrl = 'assets/img/placeholder.jpg';
                    let imgData = attrs.image?.data?.attributes || attrs.image;
                    if (Array.isArray(imgData)) imgData = imgData[0];
                    const singleImg = imgData?.attributes || imgData;
                    if (singleImg?.url) {
                        imageUrl = singleImg.url.startsWith('http') ? singleImg.url : `${CONFIG.STRAPI_BASE_URL}${singleImg.url}`;
                    }
                    const prodId = p.documentId || p.id;
                    return `
                        <div class="product-card">
                            <img src="${imageUrl}" alt="${attrs.nom}" style="width:100%">
                            <div class="product-info">
                                <h4>${attrs.nom}</h4>
                                <p>${attrs.prix.toFixed(2)} €</p>
                                <a href="produit.html?id=${prodId}" class="btn-secondary">${t.shop_view_product}</a>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
            <button class="btn-primary" onclick="startQuiz()" style="margin-top: 1rem;">${t.quiz_retry}</button>
        `;
    } else {
        quizContent.innerHTML = `
            <p>${t.quiz_no_result}</p>
            <button class="btn-primary" onclick="startQuiz()">${t.quiz_retry}</button>
        `;
    }
    
    // Mettre à jour les liens dynamiques pour propager la langue
    if (typeof updateLinksWithLanguage === 'function') {
        updateLinksWithLanguage();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-quiz');
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
});

// Recharger si la langue change (si le quiz est en cours)
window.addEventListener('languageChanged', () => {
    if (currentStep > 0) {
        showStep();
    }
});
