# MS Développements

Site vitrine premium pour une agence de création de sites web — 3D immersif (React Three Fiber),
animations soignées (Framer Motion), design glassmorphism, entièrement responsive.

Projet Next.js indépendant : pas de base de données, pas de variable d'environnement obligatoire.

## Démarrer en local

```bash
npm install
npm run dev
```

## Build de production

```bash
npm run build
npm run start
```

## Ce qui est facilement modifiable

- **Identité / réseaux sociaux / email** : `lib/site-config.ts`
- **Compétences, raisons, méthode, cibles, types de projet** : `lib/content.ts`
- **Réalisations (portfolio)** : `lib/projects.ts` — un seul projet réel y figure
  (L'Oro Italiano) ; les autres entrées sont des exemples clairement marqués
  `isPlaceholder: true` à remplacer par vos futurs projets.
- **Palette / typographie** : `app/globals.css` (tokens `--color-*`, `--font-*`)

## Variables d'environnement

Aucune n'est requise pour que le site compile et fonctionne. `NEXT_PUBLIC_SITE_URL`
est optionnelle (métadonnées SEO / Open Graph) — voir `.env.example`.

## Déploiement Vercel

Projet Next.js standard, sans base de données : `vercel link` puis `vercel --prod`
suffisent. Définissez `NEXT_PUBLIC_SITE_URL` dans les variables d'environnement du
projet Vercel pour des métadonnées SEO correctes (sinon un fallback sûr est utilisé).
