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

`app/actions/contact.ts` valide la soumission côté serveur (Zod), rejette les
bots via un honeypot, puis **journalise la demande**. Remplacez le bloc balisé
`--- Replace this block with your real delivery ---` par votre transport réel
(Resend, SendGrid, SMTP) ou un webhook CRM. Le schéma partagé vit dans
`lib/contact-schema.ts` — un module `"use server"` ne peut exporter que des
fonctions asynchrones.

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
  actions/contact.ts      Server Action du formulaire
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
lib/                      device, motion, utils, schéma de contact
```

## Vérifications effectuées

Build de production, ESLint et `tsc --noEmit` passent sans erreur. Le site a été
testé dans Chromium sur 8 fenêtres (320 → 2560 px, densités 1× à 3×) :
aucun débordement horizontal, aucune erreur console. Ont également été vérifiés
le menu mobile (ouverture, verrouillage du défilement, `Échap`, navigation), le
formulaire (erreurs de validation et envoi réussi), la navigation au clavier,
le mode `prefers-reduced-motion` et le rendu **sans WebGL**.
