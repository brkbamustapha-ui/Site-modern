/**
 * Property catalogue.
 *
 * `visual` selects a generated architectural artwork (see
 * components/ui/PropertyVisual.tsx) so the site ships with zero external
 * image requests and can never render a broken photo. To use real
 * photography instead, set `image` to a URL or a path under /public — the
 * card prefers it automatically and falls back to the artwork if it fails
 * to load. Remote hosts must be whitelisted in next.config.ts.
 */

export type VisualScene =
  | "cliff-villa"
  | "riviera"
  | "penthouse"
  | "estate"
  | "chalet"
  | "loft";

export type VisualMood = "dawn" | "day" | "dusk" | "night";

export type Property = {
  slug: string;
  name: string;
  location: string;
  /** Formatted for display so pricing conventions stay editorial. */
  price: string;
  type: string;
  surface: string;
  bedrooms: number;
  bathrooms: number;
  description: string;
  highlights: string[];
  visual: VisualScene;
  mood: VisualMood;
  /** Optional real photograph — takes precedence over `visual`. */
  image?: string;
};

export const properties: Property[] = [
  {
    slug: "villa-solaire",
    name: "Villa Solaire",
    location: "Saint-Jean-Cap-Ferrat, France",
    price: "8 950 000 €",
    type: "Villa contemporaine",
    surface: "420 m²",
    bedrooms: 5,
    bathrooms: 5,
    description:
      "Une architecture en porte-à-faux ouverte plein sud, posée sur la roche face à la Méditerranée.",
    highlights: ["Vue mer panoramique", "Piscine à débordement", "Accès privé"],
    visual: "cliff-villa",
    mood: "dusk",
  },
  {
    slug: "residence-azur",
    name: "Résidence Azur",
    location: "Cannes — La Croisette",
    price: "4 200 000 €",
    type: "Appartement d'exception",
    surface: "210 m²",
    bedrooms: 4,
    bathrooms: 3,
    description:
      "Dernier étage traversant, terrasse de 60 m² et lumière continue du matin au couchant.",
    highlights: ["Terrasse 60 m²", "Étage élevé", "Conciergerie"],
    visual: "riviera",
    mood: "day",
  },
  {
    slug: "penthouse-vertige",
    name: "Penthouse Vertige",
    location: "Paris 8ᵉ — Triangle d'or",
    price: "6 750 000 €",
    type: "Penthouse",
    surface: "285 m²",
    bedrooms: 4,
    bathrooms: 4,
    description:
      "Un duplex sous verrière dominant les toits de zinc, entièrement repensé par un architecte.",
    highlights: ["Vue Tour Eiffel", "Duplex sous verrière", "Parking double"],
    visual: "penthouse",
    mood: "night",
  },
  {
    slug: "domaine-des-cedres",
    name: "Domaine des Cèdres",
    location: "Aix-en-Provence, France",
    price: "3 480 000 €",
    type: "Propriété & bastide",
    surface: "540 m²",
    bedrooms: 7,
    bathrooms: 5,
    description:
      "Une bastide du XVIIIᵉ restaurée, au cœur d'un parc arboré de deux hectares.",
    highlights: ["Parc de 2 ha", "Dépendances", "Oliveraie centenaire"],
    visual: "estate",
    mood: "dawn",
  },
  {
    slug: "chalet-altitude",
    name: "Chalet Altitude",
    location: "Megève, Haute-Savoie",
    price: "5 600 000 €",
    type: "Chalet de prestige",
    surface: "360 m²",
    bedrooms: 6,
    bathrooms: 6,
    description:
      "Vieux bois, pierre locale et baies toute hauteur, skis aux pieds sur le domaine.",
    highlights: ["Ski aux pieds", "Spa & hammam", "Cheminée centrale"],
    visual: "chalet",
    mood: "dusk",
  },
  {
    slug: "atelier-rive-gauche",
    name: "Atelier Rive Gauche",
    location: "Paris 6ᵉ — Saint-Germain",
    price: "2 150 000 €",
    type: "Loft & atelier d'artiste",
    surface: "165 m²",
    bedrooms: 3,
    bathrooms: 2,
    description:
      "Un ancien atelier d'artiste, verrière d'origine conservée et volumes de 4,20 m sous plafond.",
    highlights: ["Verrière d'origine", "4,20 m sous plafond", "Cour pavée"],
    visual: "loft",
    mood: "day",
  },
];

/** The single exceptional listing showcased in its own immersive section. */
export const featuredProperty = {
  slug: "villa-horizon",
  name: "Villa Horizon",
  location: "Èze-sur-Mer, Côte d'Azur",
  price: "12 500 000 €",
  type: "Propriété d'exception",
  surface: "680 m²",
  land: "4 200 m²",
  bedrooms: 6,
  bathrooms: 7,
  visual: "cliff-villa" as VisualScene,
  mood: "dusk" as VisualMood,
  image: undefined as string | undefined,
  eyebrow: "Propriété vedette",
  intro:
    "Trois volumes de béton clair suspendus au-dessus de la mer, reliés par une lame d'eau qui court d'une façade à l'autre.",
  body: "Conçue par un architecte milanais et achevée en 2023, la Villa Horizon ne se visite pas : elle se traverse. Chaque pièce a été orientée pour capter une heure précise de la journée, du premier soleil sur la terrasse est jusqu'au couchant depuis le bassin principal. Un projet rare, livré meublé, à quinze minutes de Monaco.",
  specs: [
    { label: "Surface", value: "680 m²" },
    { label: "Terrain", value: "4 200 m²" },
    { label: "Chambres", value: "6 suites" },
    { label: "Livraison", value: "2023" },
  ],
};
