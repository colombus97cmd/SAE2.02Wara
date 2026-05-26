document.addEventListener('DOMContentLoaded', () => {
    const cartContainer = document.getElementById('cart-container');
    const totalDisplay = document.getElementById('cart-total');
    const subtotalDisplay = document.getElementById('cart-subtotal');
    const impactBox = document.getElementById('eco-impact');
    const impactText = document.getElementById('impact-text');

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'fr';
        const t = translations[lang];
        
        if (cart.length === 0) {
            cartContainer.innerHTML = `<p>${t['cart_empty']}</p>`;
            if (totalDisplay) totalDisplay.innerText = "0,00 €";
            if (subtotalDisplay) subtotalDisplay.innerText = "0,00 €";
            if (impactBox) impactBox.style.display = 'none';
            return;
        }

        let total = 0;
        let sargasseWeight = 0;
        let waterSaved = 0;

        const productHead = lang === 'fr' ? 'Produit' : 'Product';
        const qtyHead = lang === 'fr' ? 'Quantité' : 'Quantity';
        const priceHead = lang === 'fr' ? 'Prix' : 'Price';

        let cartHTML = `
            <table>
                <thead>
                    <tr>
                        <th>${productHead}</th>
                        <th>${qtyHead}</th>
                        <th>${priceHead}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
        `;

        cart.forEach((item, index) => {
            const itemTotal = item.prix * item.quantite;
            total += itemTotal;
            sargasseWeight += item.quantite * 0.4; // 400g par vêtement
            waterSaved += item.quantite * (2700 - 450); // Différence coton vs WARA

            cartHTML += `
                <tr>
                    <td>
                        <div class="cart-product">
                            <img src="${item.image || 'https://via.placeholder.com/50'}" alt="${item.nom}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 1rem; border-radius: 4px;">
                            <span>${item.nom} (${item.taille})</span>
                        </div>
                    </td>
                    <td>
                        <button class="btn-qty minus" data-index="${index}">-</button>
                        <span>${item.quantite}</span>
                        <button class="btn-qty plus" data-index="${index}">+</button>
                    </td>
                    <td>${itemTotal.toFixed(2)} €</td>
                    <td>
                        <button class="btn-remove-item" data-index="${index}" title="${t['cart_remove']}" style="background: none; border: none; cursor: pointer; font-size: 1.1rem; padding: 4px; transition: transform 0.2s;">
                            🗑️
                        </button>
                    </td>
                </tr>
            `;
        });

        cartHTML += `</tbody></table>`;
        cartContainer.innerHTML = cartHTML;

        if (totalDisplay) totalDisplay.innerText = `${total.toFixed(2)} €`;
        if (subtotalDisplay) subtotalDisplay.innerText = `${total.toFixed(2)} €`;
        
        if (impactBox && impactText) {
            impactBox.style.display = 'block';
            if (lang === 'fr') {
                impactText.innerHTML = `En choisissant WARA, vous retirez <strong>${sargasseWeight.toFixed(1)} kg de sargasses</strong> de nos plages et préservez <strong>${waterSaved.toLocaleString()} L d'eau</strong>.`;
            } else {
                impactText.innerHTML = `By choosing WARA, you remove <strong>${sargasseWeight.toFixed(1)} kg of sargassum</strong> from our beaches and save <strong>${waterSaved.toLocaleString()} L of water</strong>.`;
            }
        }

        setupQtyButtons();
    }

    function setupQtyButtons() {
        // Gestion des quantités +/-
        document.querySelectorAll('.btn-qty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                let cart = JSON.parse(localStorage.getItem('cart'));

                if (e.target.classList.contains('plus')) {
                    cart[index].quantite += 1;
                } else {
                    cart[index].quantite -= 1;
                    if (cart[index].quantite <= 0) {
                        cart.splice(index, 1);
                    }
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });

        // Gestion du bouton supprimer 🗑️
        document.querySelectorAll('.btn-remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.target.closest('.btn-remove-item');
                const index = button.getAttribute('data-index');
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            });
        });
    }

    renderCart();

    // Gestion du bouton de validation de commande
    const checkoutBtn = document.querySelector('[data-i18n="cart_checkout"]');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const user = JSON.parse(localStorage.getItem('wara_user'));
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'fr';
            
            if (cart.length === 0) return;
            
            if (!user) {
                // Utilisateur non connecté -> Redirection vers connexion.html
                if (typeof showToast === 'function') {
                    showToast(lang === 'fr' ? "Veuillez vous connecter pour valider votre commande !" : "Please log in to validate your order!", "info");
                } else {
                    alert(lang === 'fr' ? "Veuillez vous connecter pour valider votre commande !" : "Please log in to validate your order!");
                }
                setTimeout(() => {
                    window.location.href = "connexion.html";
                }, 1500);
                return;
            }
            
            // Calculer le total
            let total = 0;
            cart.forEach(item => {
                total += item.prix * item.quantite;
            });
            
            // Simuler l'enregistrement de la commande
            const orders = JSON.parse(localStorage.getItem('wara_orders')) || [];
            const newOrder = {
                id: `WR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                userId: user.id,
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                itemsCount: cart.length,
                total: total,
                status: lang === 'fr' ? 'En cours de préparation' : 'Preparing'
            };
            orders.push(newOrder);
            localStorage.setItem('wara_orders', JSON.stringify(orders));
            
            // Vider le panier
            localStorage.removeItem('cart');
            
            // Créditer des éco-points à l'utilisateur (ex: 1 point par euro)
            user.ecoPoints = (user.ecoPoints || 0) + Math.floor(total);
            localStorage.setItem('wara_user', JSON.stringify(user));
            
            if (typeof showToast === 'function') {
                showToast(lang === 'fr' ? "Commande validée avec succès ! Merci de protéger nos plages. 🌴" : "Order validated successfully! Thank you for protecting our beaches. 🌴", "success");
            }
            
            setTimeout(() => {
                window.location.href = "connexion.html";
            }, 1800);
        });
    }

    // Recharger si la langue change
    window.addEventListener('languageChanged', renderCart);
});
