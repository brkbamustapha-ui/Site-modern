# BMS AGENCY — Immobilier Premium

Site vitrine haut de gamme pour une agence immobilière, construit autour d'une
scène 3D temps réel qui se dégrade proprement sur tous les appareils.

**Stack :** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
React Three Fiber / three.js · Framer Motion · Lucide · Zod.

---

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # build de production
npm run lint                 # ESLint
npx tsc --noEmit             # vérification TypeScript
```

Copiez `.env.example` vers `.env.local` et renseignez `NEXT_PUBLIC_SITE_URL`
(utilisé pour les URLs canoniques, `sitemap.xml` et les balises Open Graph).

---

## Ce qu'il faut personnaliser

Tout ce qui doit changer avant la mise en ligne est regroupé dans `data/` :

| Fichier | Contenu |
| --- | --- |
| `data/site.ts` | Nom, slogan, **coordonnées** (email, téléphone, WhatsApp, adresse), réseaux sociaux, chiffres clés |
| `data/properties.ts` | Les 6 biens + la propriété vedette |
| `data/services.ts` | Les 6 services et leurs icônes |
| `data/process.ts` | Les 5 étapes du processus |

> ⚠️ **Coordonnées** : `data/site.ts` contient des valeurs d'exemple
> (`contact@bms-agency.com`, `+33 1 23 45 67 89`, `12 avenue Montaigne`).
> Remplacez-les — aucun autre fichier ne code en dur ces informations.

> ⚠️ **Chiffres clés** : « 10+ années », « 250+ biens », « 98% de clients
> satisfaits » sont des **placeholders illustratifs**, pas des résultats
> vérifiés. Remplacez-les par vos données réelles ou supprimez la section.
> Une mention en ce sens est affichée sous les chiffres dans la section
> « À propos » ; pensez à la retirer une fois les vrais chiffres en place.

### Visuels des biens

Les biens sont illustrés par des **compositions architecturales vectorielles
générées** (`components/ui/PropertyVisual.tsx`) plutôt que par des photos de
banque d'images. Ce choix évite les images génériques, pèse quelques kilo-octets,
reste net à toutes les densités d'écran et ne peut pas casser la mise en page si
un CDN tombe.

Pour utiliser de vraies photos, renseignez le champ `image` d'un bien :

```ts
{
  slug: "villa-solaire",
  image: "/photos/villa-solaire.webp",   // ou une URL distante
  // ...
}
```

La carte utilise alors la photo, et **retombe automatiquement** sur la
composition générée si le chargement échoue. Pour un hôte distant, ajoutez-le
à `images.remotePatterns` dans `next.config.ts`.

### Formulaire de contact

Le formulaire valide les champs côté client (`lib/contact-schema.ts`) puis :

- si `NEXT_PUBLIC_CONTACT_ENDPOINT` est défini, il envoie un POST JSON à cette
  URL (votre propre route API, Formspree, un webhook CRM) ;
- sinon, il remet au visiteur un message **WhatsApp ou email déjà rédigé**.

Ce repli est volontaire : sans transport configuré, mieux vaut donner à la
personne un moyen d'aboutir que d'accepter sa demande et la perdre. Un envoi qui
échoue retombe sur le même repli.

> Le formulaire n'a pas de validation serveur, parce qu'il n'y a pas de serveur
> dans la version statique. Si vous ajoutez un endpoint, validez-y les données :
> un POST peut arriver sans passer par le formulaire.

---

## Déploiement

Deux modes de build, choisis par variable d'environnement :

| Commande | Sortie | Pour |
| --- | --- | --- |
| `npm run build` | build serveur Next.js | Vercel, Node, Docker — permet un endpoint de contact côté serveur |
| `npm run build:static` | export statique dans `out/` | GitHub Pages, Netlify, tout hébergeur de fichiers |

### GitHub Pages (automatique)

`.github/workflows/deploy-pages.yml` construit l'export statique et le publie à
chaque push sur `main`. Il déduit `BASE_PATH` et `NEXT_PUBLIC_SITE_URL` de la
configuration Pages — rien à renseigner à la main.

**Une action manuelle est requise une seule fois** : dépôt → *Settings* →
*Pages* → *Source* : **GitHub Actions**. Le `GITHUB_TOKEN` du workflow n'a pas le
droit de créer le site Pages lui-même (l'API répond `Resource not accessible by
integration`), donc cette étape ne peut pas être automatisée. Une fois activée,
chaque push publie tout seul.

Deux détails qui comptent pour un hébergement en sous-répertoire :

- `public/.nojekyll` empêche Jekyll d'ignorer le dossier `_next/` ;
- les liens d'icônes sont déclarés explicitement dans `app/layout.tsx`, car
  Next ne leur applique pas `basePath` et la favicon renverrait un 404.

### Vercel

Connectez le dépôt sur vercel.com : le build serveur est détecté sans
configuration. Renseignez `NEXT_PUBLIC_SITE_URL`, et
`NEXT_PUBLIC_CONTACT_ENDPOINT` si vous voulez un envoi serveur.

---

## La 3D et ses garde-fous

La règle du projet : **la 3D ne doit jamais empêcher le site de fonctionner.**

`lib/device.tsx` sonde l'appareil au montage et choisit un niveau de qualité :

| Niveau | Cible | Budget |
| --- | --- | --- |
| `ultra` | Desktop avec GPU | DPR ≤ 1.9, ombres, 70 particules, reflets réels sur l'eau |
| `high` | Portable correct | DPR ≤ 1.5, ombres, 36 particules |
| `low` | Mobiles / matériel faible | DPR ≤ 1.35, sans ombres, 14 particules, géométrie réduite |
| `none` | Pas de WebGL, `prefers-reduced-motion`, mode économie de données, connexion 2G | **Aucune 3D** — arrière-plan statique premium |

Les garde-fous, en plus du choix de niveau :

- **three.js n'est téléchargé que si l'appareil y a droit** (`next/dynamic`,
  `ssr: false`) — un mobile en mode économie de données ne charge jamais le moteur ;
- l'arrière-plan statique (`StaticHeroBackdrop`) est **toujours monté**, comme
  poster pendant le chargement puis comme décor définitif si la 3D est écartée ;
- une erreur de rendu est interceptée par `SceneBoundary` ;
- la **perte de contexte WebGL** bascule sur l'arrière-plan statique ;
- un **délai de sécurité de 6 s** : sans signal de la scène, on s'en tient au statique ;
- la boucle de rendu est **mise en pause** hors écran et quand l'onglet est masqué ;
- l'écran de chargement se ferme sur **minuterie fixe**, jamais sur l'état de la 3D
  (et se ferme aussi avec `Échap`).

L'environnement d'éclairage est généré dans la scène à partir de `Lightformer`
(`frames={1}`) : aucune HDRI n'est téléchargée depuis un CDN.

---

## Accessibilité & mouvement

- `MotionConfig reducedMotion="user"` (`lib/motion-provider.tsx`) neutralise
  globalement les animations de transformation. Les composants **n'aiguillent
  jamais leur rendu** sur `useReducedMotion()` : ce hook lit `matchMedia` au
  premier rendu client mais renvoie `false` côté serveur, ce qui casserait
  l'hydratation. Le parallaxe passe par une `MotionValue` (`lib/use-parallax.ts`).
- Lien d'évitement, focus visible, cibles tactiles ≥ 44 px, `aria-*` sur la
  navigation, le menu mobile et le formulaire, zoom non bloqué.
- Le curseur personnalisé n'est monté que sur pointeur fin ; le tactile garde
  le comportement natif.

---

## Structure

```
app/
  layout.tsx              métadonnées SEO, polices, JSON-LD RealEstateAgent
  (site)/page.tsx         assemblage des sections
  icon · apple-icon · opengraph-image · sitemap · robots
components/
  layout/                 Navbar, Footer
  sections/               Hero, Properties, FeaturedProperty, Services,
                          About, Process, Contact
  three/                  Hero3D, HeroScene, Villa, Lighting, CameraRig,
                          Environmental, SceneBoundary
  ui/                     PropertyCard, PropertyVisual, CustomCursor,
                          LoadingScreen, Reveal, TextReveal, ImageReveal,
                          Button, SectionHeading, StaticHeroBackdrop, SocialIcons
data/                     contenu éditable
lib/                      device, motion, parallaxe, validation du contact
```

## Vérifications effectuées

Les deux builds (serveur et export statique), ESLint et `tsc --noEmit` passent
sans erreur. Le site a été testé dans Chromium sur 8 fenêtres (320 → 2560 px,
densités 1× à 3×) : aucun débordement horizontal, aucune erreur console. Ont
également été vérifiés le menu mobile (ouverture, verrouillage du défilement,
`Échap`, navigation), le formulaire (erreurs de validation puis remise du
message pré-rempli), la navigation au clavier, le mode
`prefers-reduced-motion` et le rendu **sans WebGL**.

L'export statique a en plus été servi depuis un sous-répertoire `/Site-modern/`,
comme le fait GitHub Pages : aucune requête en échec, polices auto-hébergées
chargées, scène 3D active.
