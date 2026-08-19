export type ProjectCategory = "Restaurant" | "Immobilier" | "Entreprise" | "E-commerce" | "Portfolio";

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  description: string;
  accent: string;
  /**
   * Marks entries that are illustrative placeholders (not a real client),
   * shown clearly as such in the UI. Replace with your own real projects
   * as you complete them — this array is the single place to edit.
   */
  isPlaceholder: boolean;
  href?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "loro-italiano",
    name: "L'Oro Italiano",
    category: "Restaurant",
    description:
      "Expérience 3D immersive pour un restaurant italien de luxe : scène Three.js, menu interactif, réservation en ligne et animations cinématiques.",
    accent: "#7c5cff",
    isPlaceholder: false,
  },
  {
    slug: "exemple-immobilier",
    name: "Concept — Agence immobilière",
    category: "Immobilier",
    description:
      "Exemple de direction artistique pour une vitrine de biens immobiliers premium : galerie de propriétés, fiches détaillées et prise de contact.",
    accent: "#2dd9c4",
    isPlaceholder: true,
  },
  {
    slug: "exemple-entreprise",
    name: "Concept — Site corporate",
    category: "Entreprise",
    description:
      "Exemple de site vitrine professionnel pour une entreprise de services : présentation de l'activité, expertises et prise de rendez-vous.",
    accent: "#a78bfa",
    isPlaceholder: true,
  },
  {
    slug: "exemple-ecommerce",
    name: "Concept — Boutique en ligne",
    category: "E-commerce",
    description: "Exemple de vitrine produit premium avec mise en avant visuelle forte et parcours d'achat fluide.",
    accent: "#7c5cff",
    isPlaceholder: true,
  },
  {
    slug: "exemple-portfolio",
    name: "Concept — Portfolio créateur",
    category: "Portfolio",
    description: "Exemple de portfolio immersif pour un créateur de contenu ou un indépendant souhaitant marquer les esprits.",
    accent: "#2dd9c4",
    isPlaceholder: true,
  },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Restaurant",
  "Immobilier",
  "Entreprise",
  "E-commerce",
  "Portfolio",
];
