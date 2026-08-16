# Mahmoud Immobilier — Site vitrine cinématique

Landing page premium en une seule page pour l'agence immobilière **Mahmoud Immobilier**. Construite en **HTML5 / CSS3 / JavaScript vanilla**, sans dépendance ni build tool — prête pour un déploiement Netlify immédiat.

Aucune section « Biens », aucune photo, aucune carte, aucune adresse ni e-mail : le site mise entièrement sur la typographie, l'espace négatif et les animations pour une impression haut de gamme.

## Structure du projet

```
Site-modern/
├── index.html          Page unique : intro → hero → agence → services → pourquoi nous → réseaux → contact → footer
├── 404.html             Page d'erreur personnalisée
├── robots.txt
├── sitemap.xml
├── netlify.toml         Configuration de déploiement Netlify (headers de sécurité + cache)
├── css/
│   └── style.css        Design system complet (variables, composants, responsive, mobile-first)
├── js/
│   └── main.js           Intro cinématique, nav, reveal au scroll, menu mobile, parallax léger
└── assets/
    └── images/
        └── favicon.svg   Monogramme provisoire (voir « Logo » ci-dessous)
```

## Contenu de la page (ancres)

| Section | Ancre | Contenu |
|---|---|---|
| Intro | — | Overlay cinématique décoratif (logo → nom → slogan), passe automatiquement après ~2,4s ou au clic sur « Passer l'intro » |
| Hero | `#accueil` | Nom, slogan, texte d'accroche, boutons Nous contacter / WhatsApp |
| L'agence | `#agence` | Présentation générale + 5 valeurs (Écoute, Accompagnement, Confiance, Professionnalisme, Disponibilité) |
| Services | `#services` | 6 cartes de services génériques et modifiables |
| Pourquoi nous | `#pourquoi-nous` | 5 arguments crédibles, sans statistiques inventées |
| Réseaux sociaux | `#reseaux` | 3 cartes liens vers Instagram / TikTok / Facebook |
| Contact | `#contact` | Numéro affiché en grand + boutons WhatsApp / Appeler |
| Footer | — | Marque, slogan, téléphone, réseaux sociaux, copyright |

## Coordonnées utilisées

- **Téléphone / WhatsApp** : `0699130251` → `tel:+213699130251` et `https://wa.me/213699130251`
- **Instagram** : https://www.instagram.com/immomahmoud
- **TikTok** : https://www.tiktok.com/@immomahmoud
- **Facebook** : https://www.facebook.com/share/19R22vrkJf/

Aucune adresse e-mail, adresse postale ou carte n'a été ajoutée, conformément à la demande.

## Logo

Le vrai logo n'a pas encore été fourni. En attendant, un monogramme typographique provisoire (silhouette géométrique en forme de « M ») sert de repère visuel dans l'intro, la navigation et le footer.

**Pour l'intégrer une fois reçu** :
1. Placez le fichier dans `assets/images/logo.svg` (ou `.png`).
2. Remplacez les 4 occurrences du bloc `<svg class="logo-mark">…</svg>` / `<svg class="intro-mark">…</svg>` dans `index.html` (intro, nav desktop, footer) par `<img src="assets/images/logo.svg" alt="Mahmoud Immobilier" class="logo-mark">` (adapter la classe selon l'emplacement).
3. Ajustez `assets/images/favicon.svg` avec une version simplifiée du logo si besoin.

## Design

- **Palette** : noir cinématique (`#08080a`) + accent bronze/or (`#c9a15a`), typographie d'affiche *Fraunces* + sans-serif *Manrope*.
- **Mobile-first**, testé sur petits et grands smartphones, tablette et desktop.
- **Sans photos** : profondeur créée via dégradés radiaux subtils, lignes fines, halo parallax léger au hero (désactivé sur tactile et `prefers-reduced-motion`).

## Animations (`js/main.js`)

- Intro cinématique (apparition logo → nom → slogan, désactivée automatiquement si `prefers-reduced-motion` est actif, bouton « Passer l'intro » toujours disponible)
- Header sticky qui se masque au scroll vers le bas et réapparaît vers le haut
- Menu mobile plein écran (fermeture au clic, à la sélection d'un lien, ou avec Échap)
- Révélation progressive au scroll avec effet « stagger » (`IntersectionObserver`)
- Lien de navigation actif selon la section visible à l'écran
- Défilement doux vers les ancres
- Parallax léger du halo du hero (souris uniquement, désactivé sur tactile)
- Toutes les animations respectent `prefers-reduced-motion: reduce`

## Utilisation en local

Aucun outil de build n'est requis :

```bash
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

## Déploiement Netlify

Le fichier `netlify.toml` est prêt : dossier de publication `.` (racine), pas de commande de build, en-têtes de sécurité (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) et cache long sur `css/`, `js/` et `assets/`.

**Étapes** :
1. Connectez le dépôt à Netlify (ou glissez-déposez le dossier sur app.netlify.com).
2. Aucune variable d'environnement ni commande de build n'est nécessaire.
3. Une fois le domaine définitif connu, mettez à jour les URLs placeholder dans `index.html` (balises `canonical` et Open Graph), `robots.txt` et `sitemap.xml` — elles pointent actuellement vers `https://mahmoud-immobilier.netlify.app/` à titre d'exemple.

## Personnalisation

- **Couleurs / espacements / typographies** : variables CSS en tête de `css/style.css` (bloc `:root`).
- **Textes des sections** (agence, services, pourquoi nous) : volontairement génériques et neutres, à affiner selon les informations réelles de l'agence quand elles seront disponibles.
- **Durée de l'intro** : constante `2400` (ms) dans `js/main.js`, fonction `initIntro`.
- **Photos** : le site est pensé pour fonctionner sans image. Si des photos sont ajoutées plus tard, prévoir leur optimisation (formats WebP/AVIF, `loading="lazy"`) avant intégration.

## Vérifications effectuées

- ✅ Liens WhatsApp (`wa.me/213699130251`) fonctionnels sur les 3 emplacements (nav mobile, hero, contact)
- ✅ Bouton téléphone (`tel:+213699130251`) fonctionnel sur les 4 emplacements
- ✅ Liens Instagram / TikTok / Facebook conformes aux URLs fournies, ouverture en nouvel onglet (`target="_blank" rel="noopener noreferrer"`)
- ✅ Responsive testé sur mobile (390px), tablette (834px) et desktop (1440px)
- ✅ Animations (intro, reveal, menu mobile) testées et fonctionnelles
- ✅ Aucune section « Biens », aucune carte, aucune adresse, aucun e-mail
- ✅ HTML validé (balises bien fermées, aucun ID dupliqué)
- ✅ Accessibilité : lien d'évitement, focus visible, `aria-label` sur les boutons icônes, respect de `prefers-reduced-motion`
- ⚠️ Un bug de superposition (`z-index`) empêchant la fermeture du menu mobile a été détecté puis corrigé pendant les tests
