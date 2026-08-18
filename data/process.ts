export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation",
    description:
      "Un premier échange sans engagement pour comprendre votre projet, votre calendrier et votre budget réel.",
  },
  {
    number: "02",
    title: "Recherche",
    description:
      "Nous activons notre réseau et le marché off-market pour couvrir bien plus large que les annonces publiques.",
  },
  {
    number: "03",
    title: "Sélection",
    description:
      "Chaque bien est vérifié, comparé et argumenté. Vous ne recevez qu'une short-list défendable.",
  },
  {
    number: "04",
    title: "Visite",
    description:
      "Nous organisons les visites, relevons ce qui ne se voit pas et vous accompagnons sur place.",
  },
  {
    number: "05",
    title: "Acquisition",
    description:
      "Négociation, notaire, financement : nous pilotons jusqu'à la remise des clés.",
  },
];
