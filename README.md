# NOIR & OR — Site vitrine de luxe

Site vitrine moderne, élégant et responsive pour un studio de design d'intérieur haut de gamme. Construit en **HTML5 / CSS3 / JavaScript vanilla**, sans dépendance ni build tool — prêt à héberger tel quel.

## Structure du projet

```
Site-modern/
├── index.html              Accueil (hero, services, portfolio, témoignages, CTA)
├── a-propos.html           Histoire du studio, valeurs, équipe
├── services.html           Détail des 4 services + processus + FAQ
├── portfolio.html          Galerie de projets filtrable par catégorie
├── contact.html            Formulaire de contact validé + infos + carte
├── mentions-legales.html   Mentions légales
├── confidentialite.html    Politique de confidentialité (RGPD)
├── 404.html                Page d'erreur personnalisée
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css           Design system complet (variables, composants, responsive)
├── js/
│   └── main.js              Interactions (menu, animations, formulaire, filtres…)
└── assets/
    └── images/
        └── favicon.svg
```

## Design

- **Palette** : noir profond (#0b0b0c) et or (#c9a24b), typographie *Playfair Display* (titres) + *Jost* (texte courant).
- **100% responsive** : mobile (Android/iOS), tablette et desktop, avec menu plein écran sur mobile et grilles fluides (`clamp()`, `grid`, `flexbox`).
- **Animations** : apparitions au scroll (IntersectionObserver), header qui se rétracte, carrousel de témoignages, accordéon FAQ, marquee de logos.

## Fonctionnalités JavaScript (`js/main.js`)

- Menu mobile plein écran avec fermeture au clic / touche Échap
- Header sticky avec effet au scroll
- Lien de navigation actif selon la page
- Animations d'apparition au scroll (`IntersectionObserver`)
- Carrousel de témoignages automatique
- Accordéon FAQ
- Filtres de galerie (portfolio)
- Formulaire de contact avec validation en temps réel + message de confirmation
- Formulaire newsletter (footer)
- Bouton "retour en haut"

## Utilisation

Aucun outil de build n'est requis. Pour prévisualiser le site en local :

```bash
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

Ou simplement ouvrir `index.html` dans un navigateur.

## Personnalisation

- **Couleurs, espacements, typographies** : modifiables via les variables CSS en tête de `css/style.css` (bloc `:root`).
- **Contenu** : nom du studio, coordonnées, textes et images sont à adapter dans chaque page HTML (les images proviennent d'Unsplash à titre d'illustration et doivent être remplacées par vos propres photos).
- **Formulaire de contact** : la soumission est actuellement simulée côté client (`js/main.js`, fonction `initContactForm`). Branchez-la sur votre service d'envoi d'e-mails (API, Formspree, backend propre, etc.) avant mise en production.
- **Carte** : l'iframe Google Maps dans `contact.html` utilise une adresse générique à remplacer par la vôtre.
