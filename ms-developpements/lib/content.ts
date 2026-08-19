import {
  Sparkles,
  Boxes,
  UtensilsCrossed,
  Building2,
  Briefcase,
  Smartphone,
  Gauge,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export type SkillCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const SKILLS: SkillCard[] = [
  {
    title: "Sites vitrines premium",
    description: "Des sites modernes qui présentent votre activité et transforment vos visiteurs en clients.",
    icon: Sparkles,
  },
  {
    title: "Expériences 3D",
    description: "Des interfaces immersives avec animations 3D, profondeur et interactions.",
    icon: Boxes,
  },
  {
    title: "Sites pour restaurants",
    description: "Des expériences élégantes pour présenter menus, spécialités, réservation et identité du restaurant.",
    icon: UtensilsCrossed,
  },
  {
    title: "Sites immobiliers",
    description: "Des vitrines premium pour agences immobilières, propriétés et programmes.",
    icon: Building2,
  },
  {
    title: "Sites pour entreprises",
    description: "Des sites professionnels adaptés à l'image et aux objectifs de chaque entreprise.",
    icon: Briefcase,
  },
  {
    title: "Responsive",
    description: "Des expériences parfaitement adaptées aux smartphones Android, iPhone, tablettes et ordinateurs Windows/Mac.",
    icon: Smartphone,
  },
  {
    title: "Performance",
    description: "Des sites optimisés pour être rapides et agréables à utiliser.",
    icon: Gauge,
  },
  {
    title: "Déploiement",
    description: "Capacité à mettre les sites en ligne avec une configuration professionnelle.",
    icon: Rocket,
  },
];

export const REASONS = [
  {
    title: "Première impression professionnelle",
    description: "Votre site est souvent le tout premier contact entre votre entreprise et un client potentiel.",
  },
  {
    title: "Plus de confiance",
    description: "Un design soigné et une expérience fluide rassurent instantanément vos visiteurs.",
  },
  {
    title: "Image de marque premium",
    description: "Une identité visuelle forte vous distingue durablement de la concurrence.",
  },
  {
    title: "Meilleure conversion",
    description: "Une navigation claire et des appels à l'action bien pensés transforment plus de visiteurs en clients.",
  },
  {
    title: "Accessible 24h/24",
    description: "Votre vitrine travaille pour vous en permanence, même quand vous êtes fermé.",
  },
  {
    title: "Adapté au mobile",
    description: "Une majorité de vos visiteurs vous découvrent depuis leur téléphone — l'expérience doit y être irréprochable.",
  },
];

export const METHOD_STEPS = [
  {
    number: "01",
    title: "Discussion",
    description: "Comprendre votre activité, votre image et vos objectifs.",
  },
  {
    number: "02",
    title: "Design",
    description: "Créer une direction artistique adaptée à votre marque.",
  },
  {
    number: "03",
    title: "Développement",
    description: "Transformer le concept en expérience web interactive.",
  },
  {
    number: "04",
    title: "Mise en ligne",
    description: "Optimiser et publier votre site.",
  },
];

export const AUDIENCE = [
  "Restaurants",
  "Agences immobilières",
  "Entrepreneurs",
  "Commerces",
  "Marques",
  "Entreprises",
  "Professionnels indépendants",
  "Créateurs de contenu",
];

export const PROJECT_TYPES = [
  "Site vitrine",
  "Site avec expérience 3D",
  "Restaurant",
  "Immobilier",
  "E-commerce",
  "Portfolio",
  "Autre",
] as const;
