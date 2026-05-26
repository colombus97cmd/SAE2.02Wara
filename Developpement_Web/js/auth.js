/**
 * Gestion de l'authentification et de l'espace client WARA
 */

document.addEventListener('DOMContentLoaded', () => {
    // Éléments du DOM
    const loginState = document.getElementById('login-state');
    const registerState = document.getElementById('register-state');
    const authCard = document.getElementById('auth-card');
    const profileDashboard = document.getElementById('profile-dashboard');
    
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    const switchToRegisterBtn = document.getElementById('switch-to-register-btn');
    const switchToLoginBtn = document.getElementById('switch-to-login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    const userDisplayName = document.getElementById('user-display-name');
    const userDisplayEmail = document.getElementById('user-display-email');
    const userEcoPoints = document.getElementById('user-eco-points');
    const ordersContainer = document.getElementById('orders-container');
    const noOrdersBox = document.getElementById('no-orders-box');

    // Mettre la page en mode chargement dynamique pour le preloader
    window.isAsyncLoading = true;

    // Initialiser l'état au chargement
    initAuthState();

    // Rediriger vers l'état Inscription
    if (switchToRegisterBtn) {
        switchToRegisterBtn.addEventListener('click', () => {
            loginState.style.display = 'none';
            registerState.style.display = 'block';
        });
    }

    // Rediriger vers l'état Connexion
    if (switchToLoginBtn) {
        switchToLoginBtn.addEventListener('click', () => {
            registerState.style.display = 'none';
            loginState.style.display = 'block';
        });
    }

    // Gérer la déconnexion
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('wara_user');
            showToast("Déconnexion réussie !", "info");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
    }

    // Formulaire d'inscription (Register)
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            try {
                // Tentative d'enregistrement avec Strapi
                const response = await fetch(`${CONFIG.API_URL}/api/auth/local/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    // Enregistrer l'utilisateur dans localStorage
                    saveUserSession(data.user, data.jwt);
                    showToast(`Bienvenue chez WARA, ${username} !`, "success");
                    renderDashboard(data.user);
                } else {
                    throw new Error("Strapi register failed");
                }
            } catch (err) {
                console.warn("Strapi indisponible, basculement en mode local/simulation.");
                // Simuler la création de compte locale pour le jury de la soutenance
                const users = JSON.parse(localStorage.getItem('wara_registered_users')) || [];
                const userExists = users.some(u => u.email === email);

                if (userExists) {
                    showToast("Cette adresse e-mail est déjà utilisée !", "error");
                    return;
                }

                const newUser = {
                    id: Date.now(),
                    username,
                    email,
                    password, // Stocké localement de manière simplifiée pour la simulation
                    ecoPoints: 150
                };

                users.push(newUser);
                localStorage.setItem('wara_registered_users', JSON.stringify(users));
                
                // Connexion automatique du nouvel utilisateur
                saveUserSession(newUser, 'mock-jwt-token');
                
                // Générer une première commande de bienvenue pour remplir l'historique
                seedInitialOrder(newUser.id);
                
                showToast("Compte créé avec succès (Simulation) ! 🌴", "success");
                renderDashboard(newUser);
            }
        });
    }

    // Formulaire de connexion (Login)
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                // Tentative de connexion avec Strapi
                const response = await fetch(`${CONFIG.API_URL}/api/auth/local`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identifier: email, password })
                });

                if (response.ok) {
                    const data = await response.json();
                    saveUserSession(data.user, data.jwt);
                    showToast("Ravi de vous revoir !", "success");
                    renderDashboard(data.user);
                } else {
                    throw new Error("Strapi login failed");
                }
            } catch (err) {
                console.warn("Strapi indisponible pour connexion, authentification locale.");
                // Authentification locale de secours pour la soutenance
                const users = JSON.parse(localStorage.getItem('wara_registered_users')) || [];
                const user = users.find(u => u.email === email && u.password === password);

                if (user) {
                    saveUserSession(user, 'mock-jwt-token');
                    showToast("Connexion validée (Simulation) ! 🌊", "success");
                    renderDashboard(user);
                } else {
                    // Compte par défaut de secours si aucun n'a été créé
                    if (email === "client@wara.gp" && password === "guadeloupe") {
                        const defaultUser = { id: 999, username: "David Colombo", email: "client@wara.gp", ecoPoints: 320 };
                        saveUserSession(defaultUser, 'mock-jwt-token');
                        seedInitialOrder(defaultUser.id);
                        showToast("Connexion validée (Compte Démo) ! 🌴", "success");
                        renderDashboard(defaultUser);
                    } else {
                        showToast("Identifiants incorrects !", "error");
                    }
                }
            }
        });
    }

    // Initialisation
    function initAuthState() {
        const user = JSON.parse(localStorage.getItem('wara_user'));
        if (user) {
            // Afficher le dashboard et cacher la carte d'authentification
            authCard.style.display = 'none';
            profileDashboard.style.display = 'block';
            renderDashboard(user);
        } else {
            // Afficher la connexion
            authCard.style.display = 'block';
            profileDashboard.style.display = 'none';
            loginState.style.display = 'block';
            registerState.style.display = 'none';
        }
        
        // Cacher le préchargeur après l'initialisation du DOM
        setTimeout(() => {
            if (typeof window.hidePreloader === 'function') {
                window.hidePreloader();
            }
        }, 100);
    }

    // Enregistrer la session
    function saveUserSession(user, token) {
        localStorage.setItem('wara_user', JSON.stringify(user));
        localStorage.setItem('wara_jwt', token);
    }

    // Initialiser une commande de bienvenue
    function seedInitialOrder(userId) {
        const orders = JSON.parse(localStorage.getItem('wara_orders')) || [];
        const userHasOrders = orders.some(o => o.userId === userId);
        
        if (!userHasOrders) {
            const initialOrder = {
                id: `WR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                userId: userId,
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                itemsCount: 1,
                total: 85.00,
                status: getCurrentLanguage() === 'en' ? 'Preparing' : 'En cours de préparation'
            };
            orders.push(initialOrder);
            localStorage.setItem('wara_orders', JSON.stringify(orders));
        }
    }

    // Mettre à jour l'affichage du Dashboard
    function renderDashboard(user) {
        authCard.style.display = 'none';
        profileDashboard.style.display = 'block';
        
        const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'fr';
        
        userDisplayName.innerText = user.username || user.name || "Client WARA";
        userDisplayEmail.innerText = user.email || "client@wara.gp";
        
        // Calculer les éco-points (1 pt par euro dépensé, ou valeur existante)
        const points = user.ecoPoints || Math.floor(100 + Math.random() * 200);
        userEcoPoints.innerText = `${points} pts`;

        // Afficher les commandes de l'utilisateur
        const allOrders = JSON.parse(localStorage.getItem('wara_orders')) || [];
        const userOrders = allOrders.filter(o => o.userId === user.id);

        // Nettoyer les anciennes listes injectées
        const existingList = document.getElementById('dynamic-orders-list');
        if (existingList) existingList.remove();

        if (userOrders.length > 0) {
            noOrdersBox.style.display = 'none';
            
            const ordersList = document.createElement('div');
            ordersList.id = 'dynamic-orders-list';
            ordersList.className = 'orders-list';

            userOrders.forEach(order => {
                const statusLabel = lang === 'en' ? 'Preparing' : 'En cours de préparation';
                const statusText = order.status || statusLabel;
                const dateLabel = lang === 'en' ? 'Date' : 'Date';
                
                ordersList.innerHTML += `
                    <div class="order-item">
                        <div>
                            <span class="order-id">${order.id}</span>
                            <div class="order-date">${dateLabel} : ${order.date}</div>
                        </div>
                        <div>
                            <span class="order-total">${order.total.toFixed(2)} €</span>
                        </div>
                        <div>
                            <span class="order-status">${statusText}</span>
                        </div>
                    </div>
                `;
            });
            ordersContainer.appendChild(ordersList);
        } else {
            noOrdersBox.style.display = 'block';
        }
    }
});
