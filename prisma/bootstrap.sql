-- La Dolce Vita — bootstrap complet de la base
-- Schéma + données de démonstration (menu italien, 6 catégories, 25 plats).
-- À coller tel quel dans l'éditeur SQL de Neon, puis exécuter.
-- Généré depuis prisma/migrations + le seed. Idempotent : à n'exécuter qu'une fois.

BEGIN;

-- ============ SCHÉMA ============
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR');

-- CreateEnum
CREATE TYPE "ReservationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EDITOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "imageQuery" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isSignature" BOOLEAN NOT NULL DEFAULT false,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "guests" INTEGER NOT NULL,
    "message" TEXT,
    "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_messages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_content" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurant_content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE INDEX "products_categoryId_idx" ON "products"("categoryId");

-- CreateIndex
CREATE INDEX "reservations_date_idx" ON "reservations"("date");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_content_key_key" ON "restaurant_content"("key");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ============ DONNÉES ============
\restrict 0bwCh1rhb0oOblRsQz6kSLbxznp4xpjt5lbiBBmZ0nxXyhd768d7sbsDTuHmmlm
INSERT INTO public.categories VALUES ('cmsxgnxck00007d26le7ifjd5', 'Antipasti', 'antipasti', 0, '2026-08-17 16:41:29.492', '2026-08-17 16:41:29.492');
INSERT INTO public.categories VALUES ('cmsxgnxcz00097d261ud3wmlg', 'Pasta', 'pasta', 1, '2026-08-17 16:41:29.507', '2026-08-17 16:41:29.507');
INSERT INTO public.categories VALUES ('cmsxgnxda000k7d2602rtawrw', 'Pizza', 'pizza', 2, '2026-08-17 16:41:29.518', '2026-08-17 16:41:29.518');
INSERT INTO public.categories VALUES ('cmsxgnxdh000t7d269ocwabv5', 'Secondi', 'secondi', 3, '2026-08-17 16:41:29.526', '2026-08-17 16:41:29.526');
INSERT INTO public.categories VALUES ('cmsxgnxdp00127d26x6l2b1n3', 'Dolci', 'dolci', 4, '2026-08-17 16:41:29.533', '2026-08-17 16:41:29.533');
INSERT INTO public.categories VALUES ('cmsxgnxdx001b7d26x66hqv9z', 'Drinks', 'drinks', 5, '2026-08-17 16:41:29.541', '2026-08-17 16:41:29.541');
INSERT INTO public.products VALUES ('cmsxgnxcp00027d26izs86wdp', 'Burrata Pugliese', 'burrata-pugliese', 'Burrata crémeuse d''Andria, tomates cœur de bœuf confites, basilic frais et huile d''olive Nocellara.', 1900, 'burrata', '{vegetarian}', true, true, 0, 'cmsxgnxck00007d26le7ifjd5', '2026-08-17 16:41:29.497', '2026-08-17 16:41:29.497');
INSERT INTO public.products VALUES ('cmsxgnxct00047d26u0kowl97', 'Carpaccio di Manzo', 'carpaccio-di-manzo', 'Fines tranches de bœuf Piémontaise, roquette sauvage, copeaux de Parmigiano Reggiano 24 mois, câpres de Pantelleria.', 2200, 'carpaccio', '{}', false, true, 1, 'cmsxgnxck00007d26le7ifjd5', '2026-08-17 16:41:29.501', '2026-08-17 16:41:29.501');
INSERT INTO public.products VALUES ('cmsxgnxcv00067d262ty0mcjt', 'Vitello Tonnato', 'vitello-tonnato', 'Veau rosé cuit lentement, sauce onctueuse au thon et câpres, poutargue râpée.', 2100, 'vitello-tonnato', '{}', false, true, 2, 'cmsxgnxck00007d26le7ifjd5', '2026-08-17 16:41:29.503', '2026-08-17 16:41:29.503');
INSERT INTO public.products VALUES ('cmsxgnxcx00087d26pvn6yalq', 'Tagliere della Casa', 'tagliere-della-casa', 'Sélection de charcuteries et fromages italiens affinés, miel de montagne, focaccia maison.', 2600, 'tagliere', '{}', false, true, 3, 'cmsxgnxck00007d26le7ifjd5', '2026-08-17 16:41:29.505', '2026-08-17 16:41:29.505');
INSERT INTO public.products VALUES ('cmsxgnxd0000b7d260ou5w2rp', 'Tagliatelle al Tartufo', 'tagliatelle-al-tartufo', 'Tagliatelles fraîches, beurre noisette, truffe noire fraîche râpée minute, Parmigiano Reggiano.', 3200, 'tagliatelle-tartufo', '{}', true, true, 0, 'cmsxgnxcz00097d261ud3wmlg', '2026-08-17 16:41:29.508', '2026-08-17 16:41:29.508');
INSERT INTO public.products VALUES ('cmsxgnxd2000d7d261h4bnh2s', 'Spaghetti alle Vongole', 'spaghetti-alle-vongole', 'Spaghetti al dente, palourdes fraîches, ail, piment doux, vin blanc, persil plat.', 2600, 'spaghetti-vongole', '{}', false, true, 1, 'cmsxgnxcz00097d261ud3wmlg', '2026-08-17 16:41:29.51', '2026-08-17 16:41:29.51');
INSERT INTO public.products VALUES ('cmsxgnxd5000f7d2649g1jb2f', 'Paccheri alla Norma', 'paccheri-alla-norma', 'Paccheri, aubergines confites, tomate San Marzano, ricotta salée, basilic.', 2300, 'paccheri-norma', '{vegetarian}', false, true, 2, 'cmsxgnxcz00097d261ud3wmlg', '2026-08-17 16:41:29.512', '2026-08-17 16:41:29.512');
INSERT INTO public.products VALUES ('cmsxgnxd7000h7d26z0gzun2c', 'Ravioli di Zucca', 'ravioli-di-zucca', 'Raviolis maison à la courge butternut, beurre de sauge, amaretti émiettés.', 2500, 'ravioli-zucca', '{vegetarian}', false, true, 3, 'cmsxgnxcz00097d261ud3wmlg', '2026-08-17 16:41:29.515', '2026-08-17 16:41:29.515');
INSERT INTO public.products VALUES ('cmsxgnxd8000j7d26wx2i81rj', 'Risotto al Limone', 'risotto-al-limone', 'Riz Carnaroli crémeux, zestes de citron de Sorrente, burrata fondante.', 2400, 'risotto-limone', '{vegetarian}', false, true, 4, 'cmsxgnxcz00097d261ud3wmlg', '2026-08-17 16:41:29.517', '2026-08-17 16:41:29.517');
INSERT INTO public.products VALUES ('cmsxgnxdb000m7d26ab99458a', 'Margherita DOP', 'margherita-dop', 'San Marzano DOP, fior di latte, basilic frais, huile d''olive extra vierge, pâte 48h.', 1600, 'pizza-margherita', '{vegetarian}', true, true, 0, 'cmsxgnxda000k7d2602rtawrw', '2026-08-17 16:41:29.52', '2026-08-17 16:41:29.52');
INSERT INTO public.products VALUES ('cmsxgnxdd000o7d266r4wxoq0', 'Tartufo e Funghi', 'tartufo-e-funghi', 'Crème de truffe, champignons de Paris et porcini, mozzarella fumée, huile de truffe.', 2300, 'pizza-tartufo', '{}', false, true, 1, 'cmsxgnxda000k7d2602rtawrw', '2026-08-17 16:41:29.521', '2026-08-17 16:41:29.521');
INSERT INTO public.products VALUES ('cmsxgnxde000q7d2672ku4n5l', 'Diavola', 'diavola', 'Sauce tomate San Marzano, salame piccante, mozzarella, piment calabrais, miel.', 1900, 'pizza-diavola', '{}', false, true, 2, 'cmsxgnxda000k7d2602rtawrw', '2026-08-17 16:41:29.523', '2026-08-17 16:41:29.523');
INSERT INTO public.products VALUES ('cmsxgnxdg000s7d26vtq239qb', 'Quattro Formaggi', 'quattro-formaggi', 'Fior di latte, gorgonzola, taleggio, parmigiano, pecorino, poivre noir.', 2000, 'pizza-formaggi', '{vegetarian}', false, true, 3, 'cmsxgnxda000k7d2602rtawrw', '2026-08-17 16:41:29.524', '2026-08-17 16:41:29.524');
INSERT INTO public.products VALUES ('cmsxgnxdi000v7d26szmekesu', 'Branzino al Sale', 'branzino-al-sale', 'Bar entier en croûte de sel de Trapani, légumes de saison, huile citronnée.', 3600, 'branzino', '{}', false, true, 0, 'cmsxgnxdh000t7d269ocwabv5', '2026-08-17 16:41:29.527', '2026-08-17 16:41:29.527');
INSERT INTO public.products VALUES ('cmsxgnxdk000x7d26ted4bro1', 'Osso Buco alla Milanese', 'osso-buco-alla-milanese', 'Jarret de veau braisé lentement, gremolata, risotto au safran de Sardaigne.', 3800, 'osso-buco', '{}', true, true, 1, 'cmsxgnxdh000t7d269ocwabv5', '2026-08-17 16:41:29.528', '2026-08-17 16:41:29.528');
INSERT INTO public.products VALUES ('cmsxgnxdm000z7d26dua9khf6', 'Bistecca Fiorentina', 'bistecca-fiorentina', 'Côte de bœuf toscane grillée au feu de bois (pour deux), fleur de sel, romarin.', 6800, 'bistecca-fiorentina', '{}', false, true, 2, 'cmsxgnxdh000t7d269ocwabv5', '2026-08-17 16:41:29.53', '2026-08-17 16:41:29.53');
INSERT INTO public.products VALUES ('cmsxgnxdo00117d261yy5mqxa', 'Pollo alla Cacciatora', 'pollo-alla-cacciatora', 'Poulet fermier mijoté aux tomates, olives taggiasche, câpres et romarin.', 2900, 'pollo-cacciatora', '{}', false, true, 3, 'cmsxgnxdh000t7d269ocwabv5', '2026-08-17 16:41:29.532', '2026-08-17 16:41:29.532');
INSERT INTO public.products VALUES ('cmsxgnxdq00147d26olms6tk8', 'Tiramisù della Casa', 'tiramisu-della-casa', 'Recette traditionnelle, mascarpone crémeux, café espresso, cacao amer.', 1200, 'tiramisu', '{vegetarian}', true, true, 0, 'cmsxgnxdp00127d26x6l2b1n3', '2026-08-17 16:41:29.535', '2026-08-17 16:41:29.535');
INSERT INTO public.products VALUES ('cmsxgnxds00167d26lwbqpk8r', 'Panna Cotta ai Frutti di Bosco', 'panna-cotta-frutti-di-bosco', 'Panna cotta vanille de Madagascar, coulis de fruits rouges frais.', 1100, 'panna-cotta', '{vegetarian}', false, true, 1, 'cmsxgnxdp00127d26x6l2b1n3', '2026-08-17 16:41:29.536', '2026-08-17 16:41:29.536');
INSERT INTO public.products VALUES ('cmsxgnxdu00187d26mdmm9f2w', 'Cannoli Siciliani', 'cannoli-siciliani', 'Coque croustillante, ricotta de brebis, pistaches de Bronte, orange confite.', 1300, 'cannoli', '{vegetarian}', false, true, 2, 'cmsxgnxdp00127d26x6l2b1n3', '2026-08-17 16:41:29.538', '2026-08-17 16:41:29.538');
INSERT INTO public.products VALUES ('cmsxgnxdv001a7d264xxk925d', 'Affogato al Caffè', 'affogato-al-caffe', 'Gelato à la vanille bourbon noyé dans un espresso brûlant.', 900, 'affogato', '{vegetarian}', false, true, 3, 'cmsxgnxdp00127d26x6l2b1n3', '2026-08-17 16:41:29.54', '2026-08-17 16:41:29.54');
INSERT INTO public.products VALUES ('cmsxgnxdy001d7d26i9d4k7vo', 'Negroni Classico', 'negroni-classico', 'Gin, Campari, vermouth rouge, zeste d''orange.', 1400, 'negroni', '{}', false, true, 0, 'cmsxgnxdx001b7d26x66hqv9z', '2026-08-17 16:41:29.542', '2026-08-17 16:41:29.542');
INSERT INTO public.products VALUES ('cmsxgnxdz001f7d26alx6tkgn', 'Aperol Spritz', 'aperol-spritz', 'Aperol, prosecco, eau pétillante, tranche d''orange.', 1200, 'aperol-spritz', '{}', false, true, 1, 'cmsxgnxdx001b7d26x66hqv9z', '2026-08-17 16:41:29.544', '2026-08-17 16:41:29.544');
INSERT INTO public.products VALUES ('cmsxgnxe1001h7d26q6br51eu', 'Chianti Classico DOCG', 'chianti-classico-docg', 'Verre — rouge toscan élégant, notes de cerise et épices.', 1100, 'chianti', '{}', false, true, 2, 'cmsxgnxdx001b7d26x66hqv9z', '2026-08-17 16:41:29.545', '2026-08-17 16:41:29.545');
INSERT INTO public.products VALUES ('cmsxgnxe3001j7d26jolkbho6', 'Espresso', 'espresso', 'Torréfaction artisanale italienne.', 400, 'espresso', '{}', false, true, 3, 'cmsxgnxdx001b7d26x66hqv9z', '2026-08-17 16:41:29.547', '2026-08-17 16:41:29.547');
INSERT INTO public.restaurant_content VALUES ('cmsxgnxe8001l7d26izfse3xu', 'story', 'Fondé par la famille Romano, La Dolce Vita est né d''un rêve simple : faire voyager Paris jusqu''aux collines toscanes, une table à la fois. Depuis 2012, nos chefs travaillent des produits importés directement d''Italie et une pâte à pizza fermentée 48 heures, dans le respect absolu de la tradition.', '2026-08-17 16:41:29.552');
INSERT INTO public.users VALUES ('cmsxgnxe4001k7d267f7c3lin', 'Admin', 'admin@ladolcevita.example', 'changeme-hash-this-in-production', 'ADMIN', '2026-08-17 16:41:29.549', '2026-08-17 16:41:29.549');
\unrestrict 0bwCh1rhb0oOblRsQz6kSLbxznp4xpjt5lbiBBmZ0nxXyhd768d7sbsDTuHmmlm

-- ============ SUIVI DES MIGRATIONS PRISMA ============
-- Enregistre la migration comme appliquée, pour qu'un futur
-- `prisma migrate deploy` ne tente pas de la rejouer.
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id"                    VARCHAR(36) PRIMARY KEY NOT NULL,
    "checksum"              VARCHAR(64) NOT NULL,
    "finished_at"           TIMESTAMPTZ,
    "migration_name"        VARCHAR(255) NOT NULL,
    "logs"                  TEXT,
    "rolled_back_at"        TIMESTAMPTZ,
    "started_at"            TIMESTAMPTZ NOT NULL DEFAULT now(),
    "applied_steps_count"   INTEGER NOT NULL DEFAULT 0
);

INSERT INTO "_prisma_migrations"
    (id, checksum, finished_at, migration_name, started_at, applied_steps_count)
VALUES
    (gen_random_uuid()::text, 'f54856eee1f46888a4bcbc9d51469760c48765f2cfb7e6d2fd28a6c1c19d40a5', now(), '20260817164123_init', now(), 1);

COMMIT;
