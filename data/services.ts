import {
  Building2,
  Compass,
  Gem,
  Handshake,
  KeyRound,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Rendered as the oversized ghost numeral behind each card. */
  index: string;
};

export const services: Service[] = [
  {
    title: "Achat immobilier",
    description:
      "Nous cadrons votre recherche, filtrons le marché — y compris off-market — et ne vous présentons que des biens qui méritent votre visite.",
    icon: Handshake,
    index: "01",
  },
  {
    title: "Vente immobilière",
    description:
      "Estimation argumentée, mise en scène du bien, diffusion ciblée : votre propriété est présentée au bon acquéreur, pas à tous.",
    icon: TrendingUp,
    index: "02",
  },
  {
    title: "Location",
    description:
      "Locations longue durée et saisonnières haut de gamme, avec une sélection rigoureuse des dossiers et un bail sécurisé.",
    icon: KeyRound,
    index: "03",
  },
  {
    title: "Gestion immobilière",
    description:
      "Loyers, entretien, prestataires, relation locataire : nous prenons le quotidien en charge et vous rendez-vous compte au trimestre.",
    icon: Building2,
    index: "04",
  },
  {
    title: "Conseil immobilier",
    description:
      "Arbitrage de patrimoine, stratégie d'investissement et lecture du marché local, avant que la décision ne soit prise.",
    icon: Compass,
    index: "05",
  },
  {
    title: "Immobilier haut de gamme",
    description:
      "Villas, penthouses et propriétés rares, traités avec la discrétion et la confidentialité que ce segment impose.",
    icon: Gem,
    index: "06",
  },
];
