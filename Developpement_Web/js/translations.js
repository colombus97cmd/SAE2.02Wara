const translations = {
    fr: {
        // Navigation
        nav_concept: "Le Concept",
        nav_shop: "Boutique",
        nav_cart: "Panier",
        
        // Hero Section
        hero_title: "De la sargasse au vêtement.",
        hero_subtitle: "La première ligne de vêtements 100% biodégradables issue de la valorisation des sargasses en Guadeloupe.",
        hero_btn: "Découvrir la collection",
        
        // Concept Section
        concept_title: "De la pollution à la solution",
        concept_text: "Nous transformons un désastre écologique en une fibre textile innovante, durable et respectueuse de l'environnement.",
        concept_btn: "En savoir plus sur notre fibre",
        concept_hero_title: "De la pollution à la ressource",
        concept_hero_lead: "Chaque année, des millions de tonnes de sargasses s'échouent sur les côtes de la Guadeloupe, asphyxiant la biodiversité marine.",
        step1_title: "Collecte",
        step1_text: "Ramassage manuel sur les plages pour protéger les fonds marins.",
        step2_title: "Lavage",
        step2_text: "Dessalage à l'eau de pluie récupérée pour éliminer le sel et le sable.",
        step3_title: "Filature",
        step3_text: "Extraction de la cellulose et mélange avec du lin bio.",
        step4_title: "Confection",
        step4_text: "Tissage et couture dans notre atelier à Basse-Terre.",
        cert_title: "Nos Certifications",
        impact_title: "Transparence & Impact",
        table_indicator: "Indicateur",
        table_cotton: "Coton Classique",
        table_wara: "Fibre WARA",
        row_water: "Consommation d'eau (L/T-shirt)",
        row_bio: "Biodégradabilité",
        row_bio_cotton: "Plusieurs mois (si traité)",
        row_bio_wara: "61 jours",
        row_origin: "Origine matière",
        row_origin_cotton: "Agriculture intensive",
        row_origin_wara: "Valorisation de déchet",
        
        // Engagements
        engagement_local_title: "100% Local",
        engagement_local_text: "Récolté et transformé en Guadeloupe pour limiter l'empreinte carbone.",
        engagement_regen_title: "Économie Régénérative",
        engagement_regen_text: "Nous transformons un déchet encombrant en une ressource précieuse.",
        engagement_bio_title: "Biodégradable",
        engagement_bio_text: "Nos vêtements retournent à la terre en moins de 3 mois.",
        
        // Quiz
        quiz_title: "Trouvez votre Look WARA",
        quiz_text: "Découvrez les pièces qui correspondent le mieux à votre style et à vos engagements.",
        quiz_start: "Démarrer le Style Quiz",
        quiz_retry: "Refaire le quiz",
        quiz_analyzing: "Analyse de ton profil WARA...",
        quiz_result_title: "Ton look WARA idéal :",
        quiz_no_result: "Désolé, nous n'avons pas trouvé de pièces correspondant exactement à ton profil pour le moment.",
        quiz_questions: [
            {
                question: "Quel est ton style ?",
                options: [
                    { label: "Minimaliste", value: "minimaliste" },
                    { label: "Bohème", value: "boheme" },
                    { label: "Structuré", value: "structure" },
                    { label: "Nature", value: "nature" }
                ]
            },
            {
                question: "Pour quelle occasion ?",
                options: [
                    { label: "Quotidien", value: "quotidien" },
                    { label: "Sortie", value: "sortie" },
                    { label: "Voyage", value: "voyage" },
                    { label: "Événement", value: "evenement" }
                ]
            },
            {
                question: "Ta palette préférée ?",
                options: [
                    { label: "Terres", value: "terres" },
                    { label: "Océan", value: "ocean" },
                    { label: "Forêt", value: "foret" },
                    { label: "Neutre", value: "neutre" }
                ]
            },
            {
                question: "Ta silhouette préférée ?",
                options: [
                    { label: "Fluide", value: "fluide" },
                    { label: "Ajustée", value: "ajustee" },
                    { label: "Oversize", value: "oversize" },
                    { label: "Mixte", value: "mixte" }
                ]
            }
        ],
        
        // Featured Products
        featured_title: "Nos dernières créations",
        featured_loading: "Chargement des pépites...",
        featured_view_all: "Voir toute la boutique",
        featured_empty: "Bientôt de nouveaux produits !",
        
        // Shop
        shop_title: "Notre Boutique",
        shop_subtitle: "Des vêtements qui prennent soin de vous et de la planète.",
        shop_empty: "Aucun produit disponible pour le moment.",
        shop_view_product: "Voir le produit",
        shop_eco_score: "Éco-score",
        shop_bio_time: "Temps de biodégradation",
        shop_filters: "Filtres",
        shop_categories: "Catégories",
        shop_materials: "Matières",
        cat_tops: "Hauts",
        cat_bottoms: "Bas",
        cat_acc: "Accessoires",
        mat_sargassum: "Sargasses",
        mat_linen: "Lin bio",
        mat_pineapple: "Fibre d'ananas",
        
        // Product Detail
        product_add_to_cart: "Ajouter au panier",
        product_back: "Retour à la boutique",
        product_description: "Description",
        product_tracability: "Traçabilité",
        product_eco_tag: "Éco-score A - 100% Biodégradable",
        product_choose_size: "Choisir une taille",
        product_composition: "Composition",
        product_lifecycle: "Cycle de vie du produit",
        product_tracability_title: "De la plage au vêtement",
        product_tracability_loading: "Chargement de l'histoire du vêtement...",
        comp_sargassum: "Fibre de Sargasses",
        comp_linen: "Lin biologique certifié GOTS",
        comp_dye: "Teinture naturelle à base d'indigo",
        step_wearing: "Portage",
        step_composting: "Compostage",
        step_composting_text: "Déposer au bac bio",
        step_biodegradation: "Biodégradation",
        step_biodegradation_text: "61 jours (moyenne)",
        
        // Cart
        cart_title: "Votre Panier",
        cart_empty: "Votre panier est vide.",
        cart_impact_title: "🌱 Impact de votre commande",
        cart_summary: "Résumé",
        cart_subtotal: "Sous-total",
        cart_shipping: "Livraison éco (Relais)",
        cart_free: "Gratuit",
        cart_total: "Total",
        cart_checkout: "Passer la commande",
        cart_remove: "Supprimer",
        cart_quantity: "Quantité",
        cart_impact_text: "En choisissant ces vêtements, vous avez contribué à retirer {kg}kg de sargasses des côtes guadeloupéennes.",
        
        // Footer
        footer_rights: "© 2026 WARA - Projet SAE 2.02 BUT MMI. Tous droits réservés.",
        footer_cert: "Certifié GOTS & OEKO-TEX | Made in Guadeloupe",
        
        // Account / Connexion
        nav_account: "Compte",
        auth_or: "ou",
        auth_login_title: "Connexion à votre espace WARA",
        auth_register_title: "Rejoindre l'économie régénérative",
        auth_email: "Adresse e-mail",
        auth_password: "Mot de passe",
        auth_username: "Nom complet",
        auth_btn_login: "Se connecter",
        auth_btn_register: "Créer mon compte",
        auth_switch_to_register: "Pas encore de compte ? S'inscrire",
        auth_switch_to_login: "Déjà inscrit ? Se connecter",
        profile_title: "Votre Espace WARA",
        profile_welcome: "Bienvenue,",
        profile_eco_badge: "Statut : Protecteur du littoral 🌴",
        profile_eco_points: "Éco-Points cumulés : 150 points",
        profile_logout: "Se déconnecter",
        profile_no_orders: "Aucune commande en cours.",
        profile_recent_orders: "Historique de vos commandes"
    },
    en: {
        // Navigation
        nav_concept: "The Concept",
        nav_shop: "Shop",
        nav_cart: "Cart",
        
        // Hero Section
        hero_title: "From sargassum to clothing.",
        hero_subtitle: "The first line of 100% biodegradable clothing from the valorization of sargassum in Guadeloupe.",
        hero_btn: "Discover the collection",
        
        // Concept Section
        concept_title: "From pollution to solution",
        concept_text: "We transform an ecological disaster into an innovative, sustainable and environmentally friendly textile fiber.",
        concept_btn: "Learn more about our fiber",
        concept_hero_title: "From pollution to resource",
        concept_hero_lead: "Every year, millions of tons of sargassum wash up on the coasts of Guadeloupe, suffocating marine biodiversity.",
        step1_title: "Collection",
        step1_text: "Manual harvesting on beaches to protect the seabed.",
        step2_title: "Washing",
        step2_text: "Desalination using recovered rainwater to eliminate salt and sand.",
        step3_title: "Spinning",
        step3_text: "Extraction of cellulose and mixing with organic linen.",
        step4_title: "Confection",
        step4_text: "Weaving and sewing in our workshop in Basse-Terre.",
        cert_title: "Our Certifications",
        impact_title: "Transparency & Impact",
        table_indicator: "Indicator",
        table_cotton: "Classic Cotton",
        table_wara: "WARA Fiber",
        row_water: "Water consumption (L/T-shirt)",
        row_bio: "Biodegradability",
        row_bio_cotton: "Several months (if treated)",
        row_bio_wara: "61 days",
        row_origin: "Material origin",
        row_origin_cotton: "Intensive agriculture",
        row_origin_wara: "Waste recovery",
        
        // Engagements
        engagement_local_title: "100% Local",
        engagement_local_text: "Harvested and processed in Guadeloupe to limit the carbon footprint.",
        engagement_regen_title: "Regenerative Economy",
        engagement_regen_text: "We transform a cumbersome waste into a valuable resource.",
        engagement_bio_title: "Biodegradable",
        engagement_bio_text: "Our clothes return to the earth in less than 3 months.",
        
        // Quiz
        quiz_title: "Find your WARA Look",
        quiz_text: "Discover the pieces that best match your style and commitments.",
        quiz_start: "Start Style Quiz",
        quiz_retry: "Retake the quiz",
        quiz_analyzing: "Analyzing your WARA profile...",
        quiz_result_title: "Your ideal WARA look:",
        quiz_no_result: "Sorry, we didn't find any pieces matching your profile exactly at the moment.",
        quiz_questions: [
            {
                question: "What is your style?",
                options: [
                    { label: "Minimalist", value: "minimaliste" },
                    { label: "Bohemian", value: "boheme" },
                    { label: "Structured", value: "structure" },
                    { label: "Nature", value: "nature" }
                ]
            },
            {
                question: "For what occasion?",
                options: [
                    { label: "Daily", value: "quotidien" },
                    { label: "Going out", value: "sortie" },
                    { label: "Travel", value: "voyage" },
                    { label: "Event", value: "evenement" }
                ]
            },
            {
                question: "Your favorite palette?",
                options: [
                    { label: "Earthly", value: "terres" },
                    { label: "Ocean", value: "ocean" },
                    { label: "Forest", value: "foret" },
                    { label: "Neutral", value: "neutre" }
                ]
            },
            {
                question: "Your favorite silhouette?",
                options: [
                    { label: "Fluid", value: "fluide" },
                    { label: "Fitted", value: "ajustee" },
                    { label: "Oversize", value: "oversize" },
                    { label: "Mixed", value: "mixte" }
                ]
            }
        ],
        
        // Featured Products
        featured_title: "Our latest creations",
        featured_loading: "Loading gems...",
        featured_view_all: "View all shop",
        featured_empty: "New products coming soon!",
        
        // Shop
        shop_title: "Our Shop",
        shop_subtitle: "Clothes that take care of you and the planet.",
        shop_empty: "No products available at the moment.",
        shop_view_product: "View product",
        shop_eco_score: "Eco-score",
        shop_bio_time: "Biodegradation time",
        shop_filters: "Filters",
        shop_categories: "Categories",
        shop_materials: "Materials",
        cat_tops: "Tops",
        cat_bottoms: "Bottoms",
        cat_acc: "Accessories",
        mat_sargassum: "Sargassum",
        mat_linen: "Organic Linen",
        mat_pineapple: "Pineapple fiber",
        
        // Product Detail
        product_add_to_cart: "Add to cart",
        product_back: "Back to shop",
        product_description: "Description",
        product_tracability: "Traceability",
        product_eco_tag: "Eco-score A - 100% Biodegradable",
        product_choose_size: "Choose a size",
        product_composition: "Composition",
        product_lifecycle: "Product lifecycle",
        product_tracability_title: "From beach to garment",
        product_tracability_loading: "Loading garment history...",
        comp_sargassum: "Sargassum Fiber",
        comp_linen: "GOTS certified organic linen",
        comp_dye: "Natural indigo-based dye",
        step_wearing: "Wearing",
        step_composting: "Composting",
        step_composting_text: "Place in bio bin",
        step_biodegradation: "Biodegradation",
        step_biodegradation_text: "61 days (average)",
        
        // Cart
        cart_title: "Your Cart",
        cart_empty: "Your cart is empty.",
        cart_impact_title: "🌱 Impact of your order",
        cart_summary: "Summary",
        cart_subtotal: "Subtotal",
        cart_shipping: "Eco shipping",
        cart_free: "Free",
        cart_total: "Total",
        cart_checkout: "Checkout",
        cart_remove: "Remove",
        cart_quantity: "Quantity",
        cart_impact_text: "By choosing these clothes, you helped remove {kg}kg of sargassum from the Guadeloupean coasts.",
        
        // Footer
        footer_rights: "© 2026 WARA - SAE 2.02 Project BUT MMI. All rights reserved.",
        footer_cert: "GOTS & OEKO-TEX Certified | Made in Guadeloupe",
        
        // Account / Connexion
        nav_account: "Account",
        auth_or: "or",
        auth_login_title: "Log In to Your WARA Space",
        auth_register_title: "Join the Regenerative Economy",
        auth_email: "Email Address",
        auth_password: "Password",
        auth_username: "Full Name",
        auth_btn_login: "Sign In",
        auth_btn_register: "Create My Account",
        auth_switch_to_register: "Don't have an account? Sign Up",
        auth_switch_to_login: "Already have an account? Log In",
        profile_title: "Your WARA Space",
        profile_welcome: "Welcome,",
        profile_eco_badge: "Status: Coastline Protector 🌴",
        profile_eco_points: "Accumulated Eco-Points: 150 points",
        profile_logout: "Sign Out",
        profile_no_orders: "No orders in progress.",
        profile_recent_orders: "Your Order History"
    }
};
