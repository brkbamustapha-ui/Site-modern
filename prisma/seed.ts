import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Antipasti", slug: "antipasti", order: 0 },
  { name: "Pasta", slug: "pasta", order: 1 },
  { name: "Pizza", slug: "pizza", order: 2 },
  { name: "Secondi", slug: "secondi", order: 3 },
  { name: "Dolci", slug: "dolci", order: 4 },
  { name: "Drinks", slug: "drinks", order: 5 },
];

const products: Record<
  string,
  Array<{
    name: string;
    slug: string;
    description: string;
    priceCents: number;
    imageQuery: string;
    tags?: string[];
    isSignature?: boolean;
  }>
> = {
  antipasti: [
    {
      name: "Burrata Pugliese",
      slug: "burrata-pugliese",
      description:
        "Burrata crémeuse d'Andria, tomates cœur de bœuf confites, basilic frais et huile d'olive Nocellara.",
      priceCents: 1900,
      imageQuery: "burrata",
      tags: ["vegetarian"],
      isSignature: true,
    },
    {
      name: "Carpaccio di Manzo",
      slug: "carpaccio-di-manzo",
      description:
        "Fines tranches de bœuf Piémontaise, roquette sauvage, copeaux de Parmigiano Reggiano 24 mois, câpres de Pantelleria.",
      priceCents: 2200,
      imageQuery: "carpaccio",
    },
    {
      name: "Vitello Tonnato",
      slug: "vitello-tonnato",
      description:
        "Veau rosé cuit lentement, sauce onctueuse au thon et câpres, poutargue râpée.",
      priceCents: 2100,
      imageQuery: "vitello-tonnato",
    },
    {
      name: "Tagliere della Casa",
      slug: "tagliere-della-casa",
      description:
        "Sélection de charcuteries et fromages italiens affinés, miel de montagne, focaccia maison.",
      priceCents: 2600,
      imageQuery: "tagliere",
    },
  ],
  pasta: [
    {
      name: "Tagliatelle al Tartufo",
      slug: "tagliatelle-al-tartufo",
      description:
        "Tagliatelles fraîches, beurre noisette, truffe noire fraîche râpée minute, Parmigiano Reggiano.",
      priceCents: 3200,
      imageQuery: "tagliatelle-tartufo",
      isSignature: true,
    },
    {
      name: "Spaghetti alle Vongole",
      slug: "spaghetti-alle-vongole",
      description:
        "Spaghetti al dente, palourdes fraîches, ail, piment doux, vin blanc, persil plat.",
      priceCents: 2600,
      imageQuery: "spaghetti-vongole",
    },
    {
      name: "Paccheri alla Norma",
      slug: "paccheri-alla-norma",
      description:
        "Paccheri, aubergines confites, tomate San Marzano, ricotta salée, basilic.",
      priceCents: 2300,
      imageQuery: "paccheri-norma",
      tags: ["vegetarian"],
    },
    {
      name: "Ravioli di Zucca",
      slug: "ravioli-di-zucca",
      description:
        "Raviolis maison à la courge butternut, beurre de sauge, amaretti émiettés.",
      priceCents: 2500,
      imageQuery: "ravioli-zucca",
      tags: ["vegetarian"],
    },
    {
      name: "Risotto al Limone",
      slug: "risotto-al-limone",
      description:
        "Riz Carnaroli crémeux, zestes de citron de Sorrente, burrata fondante.",
      priceCents: 2400,
      imageQuery: "risotto-limone",
      tags: ["vegetarian"],
    },
  ],
  pizza: [
    {
      name: "Margherita DOP",
      slug: "margherita-dop",
      description:
        "San Marzano DOP, fior di latte, basilic frais, huile d'olive extra vierge, pâte 48h.",
      priceCents: 1600,
      imageQuery: "pizza-margherita",
      isSignature: true,
      tags: ["vegetarian"],
    },
    {
      name: "Tartufo e Funghi",
      slug: "tartufo-e-funghi",
      description:
        "Crème de truffe, champignons de Paris et porcini, mozzarella fumée, huile de truffe.",
      priceCents: 2300,
      imageQuery: "pizza-tartufo",
    },
    {
      name: "Diavola",
      slug: "diavola",
      description:
        "Sauce tomate San Marzano, salame piccante, mozzarella, piment calabrais, miel.",
      priceCents: 1900,
      imageQuery: "pizza-diavola",
    },
    {
      name: "Quattro Formaggi",
      slug: "quattro-formaggi",
      description:
        "Fior di latte, gorgonzola, taleggio, parmigiano, pecorino, poivre noir.",
      priceCents: 2000,
      imageQuery: "pizza-formaggi",
      tags: ["vegetarian"],
    },
  ],
  secondi: [
    {
      name: "Branzino al Sale",
      slug: "branzino-al-sale",
      description:
        "Bar entier en croûte de sel de Trapani, légumes de saison, huile citronnée.",
      priceCents: 3600,
      imageQuery: "branzino",
    },
    {
      name: "Osso Buco alla Milanese",
      slug: "osso-buco-alla-milanese",
      description:
        "Jarret de veau braisé lentement, gremolata, risotto au safran de Sardaigne.",
      priceCents: 3800,
      imageQuery: "osso-buco",
      isSignature: true,
    },
    {
      name: "Bistecca Fiorentina",
      slug: "bistecca-fiorentina",
      description:
        "Côte de bœuf toscane grillée au feu de bois (pour deux), fleur de sel, romarin.",
      priceCents: 6800,
      imageQuery: "bistecca-fiorentina",
    },
    {
      name: "Pollo alla Cacciatora",
      slug: "pollo-alla-cacciatora",
      description:
        "Poulet fermier mijoté aux tomates, olives taggiasche, câpres et romarin.",
      priceCents: 2900,
      imageQuery: "pollo-cacciatora",
    },
  ],
  dolci: [
    {
      name: "Tiramisù della Casa",
      slug: "tiramisu-della-casa",
      description:
        "Recette traditionnelle, mascarpone crémeux, café espresso, cacao amer.",
      priceCents: 1200,
      imageQuery: "tiramisu",
      isSignature: true,
      tags: ["vegetarian"],
    },
    {
      name: "Panna Cotta ai Frutti di Bosco",
      slug: "panna-cotta-frutti-di-bosco",
      description:
        "Panna cotta vanille de Madagascar, coulis de fruits rouges frais.",
      priceCents: 1100,
      imageQuery: "panna-cotta",
      tags: ["vegetarian"],
    },
    {
      name: "Cannoli Siciliani",
      slug: "cannoli-siciliani",
      description:
        "Coque croustillante, ricotta de brebis, pistaches de Bronte, orange confite.",
      priceCents: 1300,
      imageQuery: "cannoli",
      tags: ["vegetarian"],
    },
    {
      name: "Affogato al Caffè",
      slug: "affogato-al-caffe",
      description:
        "Gelato à la vanille bourbon noyé dans un espresso brûlant.",
      priceCents: 900,
      imageQuery: "affogato",
      tags: ["vegetarian"],
    },
  ],
  drinks: [
    {
      name: "Negroni Classico",
      slug: "negroni-classico",
      description: "Gin, Campari, vermouth rouge, zeste d'orange.",
      priceCents: 1400,
      imageQuery: "negroni",
    },
    {
      name: "Aperol Spritz",
      slug: "aperol-spritz",
      description: "Aperol, prosecco, eau pétillante, tranche d'orange.",
      priceCents: 1200,
      imageQuery: "aperol-spritz",
    },
    {
      name: "Chianti Classico DOCG",
      slug: "chianti-classico-docg",
      description: "Verre — rouge toscan élégant, notes de cerise et épices.",
      priceCents: 1100,
      imageQuery: "chianti",
    },
    {
      name: "Espresso",
      slug: "espresso",
      description: "Torréfaction artisanale italienne.",
      priceCents: 400,
      imageQuery: "espresso",
    },
  ],
};

async function main() {
  console.log("Seeding database…");

  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, order: category.order },
      create: category,
    });

    const items = products[category.slug] ?? [];
    for (const [index, item] of items.entries()) {
      await prisma.product.upsert({
        where: { slug: item.slug },
        update: {
          name: item.name,
          description: item.description,
          priceCents: item.priceCents,
          imageQuery: item.imageQuery,
          tags: item.tags ?? [],
          isSignature: item.isSignature ?? false,
          order: index,
          categoryId: created.id,
        },
        create: {
          ...item,
          tags: item.tags ?? [],
          isSignature: item.isSignature ?? false,
          order: index,
          categoryId: created.id,
        },
      });
    }
  }

  await prisma.user.upsert({
    where: { email: "admin@ladolcevita.example" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@ladolcevita.example",
      password: "changeme-hash-this-in-production",
      role: "ADMIN",
    },
  });

  await prisma.restaurantContent.upsert({
    where: { key: "story" },
    update: {},
    create: {
      key: "story",
      value:
        "Fondé par la famille Romano, La Dolce Vita est né d'un rêve simple : faire voyager Paris jusqu'aux collines toscanes, une table à la fois. Depuis 2012, nos chefs travaillent des produits importés directement d'Italie et une pâte à pizza fermentée 48 heures, dans le respect absolu de la tradition.",
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
