"use client";

import { useId } from "react";
import type { VisualMood, VisualScene } from "@/data/properties";
import { cn } from "@/lib/utils";

/**
 * Art-directed architectural renders, drawn as vectors.
 *
 * Why not photography: stock images are the fastest way to make a site look
 * like a template, they add hundreds of kilobytes each, and a dead CDN leaves
 * a hole in the layout. These compositions weigh a couple of kilobytes, scale
 * to any DPR without artefacts, and can never fail to load. Real photography
 * can be dropped in per-property via the `image` field in data/properties.ts.
 */

type Palette = {
  /** Sky gradient, top to horizon. */
  sky: string[];
  /** Warm light source colour. */
  light: string;
  /** Ambient glow near the horizon. */
  haze: string;
  /** Built mass, lit face → shadowed face. */
  faceLit: string;
  faceMid: string;
  faceDark: string;
  /** Landscape / foreground mass. */
  ground: string;
  /** Water. */
  water: string[];
  /** Interior window light. */
  glow: string;
  /** How strongly the sun/moon disc reads. */
  discOpacity: number;
};

const palettes: Record<VisualMood, Palette> = {
  dawn: {
    sky: ["#1d2434", "#3a3550", "#8d6a67", "#d8ab84"],
    light: "#f2d3a6",
    haze: "#e0b189",
    faceLit: "#d9cfc2",
    faceMid: "#9c9488",
    faceDark: "#4a4740",
    ground: "#12131a",
    water: ["#5c6472", "#232a37"],
    glow: "#f4d9a4",
    discOpacity: 0.75,
  },
  day: {
    sky: ["#5d7a90", "#8ea9bd", "#bed0da", "#e2ebef"],
    light: "#ffffff",
    haze: "#dbe6ec",
    faceLit: "#eeeae2",
    faceMid: "#bab5ab",
    faceDark: "#6b6d70",
    ground: "#141820",
    water: ["#7f97a8", "#33414f"],
    glow: "#fff4dd",
    discOpacity: 0.35,
  },
  dusk: {
    sky: ["#101425", "#2f2340", "#7c4442", "#d8925c"],
    light: "#f6b877",
    haze: "#c9784f",
    faceLit: "#cdbfae",
    faceMid: "#7e7367",
    faceDark: "#33312e",
    ground: "#0a0b10",
    water: ["#4a4054", "#171a26"],
    glow: "#ffc987",
    discOpacity: 0.9,
  },
  night: {
    sky: ["#04060c", "#0a1020", "#131d33", "#22304d"],
    light: "#cfd8ea",
    haze: "#2b3a56",
    faceLit: "#33394a",
    faceMid: "#1e2432",
    faceDark: "#0d1119",
    ground: "#05070c",
    water: ["#1b2740", "#080b13"],
    glow: "#e8c07a",
    discOpacity: 0.55,
  },
};

/** Deterministic PRNG so a given scene always renders identically (no SSR drift). */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const HORIZON = 505;

type SceneProps = { p: Palette; uid: string; mood: VisualMood };

/* ------------------------------------------------------------------ */
/* Scenes                                                              */
/* ------------------------------------------------------------------ */

/** Cantilevered concrete slabs stepping out over the sea. */
function CliffVilla({ p, uid }: SceneProps) {
  return (
    <>
      {/* Sea */}
      <rect x="0" y={HORIZON} width="1200" height="295" fill={`url(#${uid}-water)`} />
      {/* Light path on the water */}
      <path
        d={`M 760 ${HORIZON} L 830 800 L 660 800 Z`}
        fill={p.light}
        opacity="0.12"
      />

      {/* Distant headland */}
      <path
        d={`M 0 ${HORIZON} L 120 468 L 250 486 L 340 476 L 430 ${HORIZON} Z`}
        fill={p.faceDark}
        opacity="0.55"
      />

      {/* Cliff mass, right */}
      <path
        d={`M 1200 800 L 1200 300 L 1050 352 L 962 430 L 906 520 L 880 640 L 900 800 Z`}
        fill={`url(#${uid}-rock)`}
      />

      {/* Three cantilevered slabs, deepest at the bottom */}
      {/* lower slab */}
      <g>
        <rect x="470" y="516" width="470" height="17" fill={p.faceLit} />
        <rect x="470" y="533" width="470" height="58" fill={p.faceMid} opacity="0.92" />
        <rect x="500" y="536" width="410" height="50" fill={`url(#${uid}-glass)`} />
      </g>
      {/* mid slab */}
      <g>
        <rect x="530" y="430" width="430" height="16" fill={p.faceLit} />
        <rect x="530" y="446" width="430" height="70" fill={p.faceMid} />
        <rect x="558" y="450" width="374" height="62" fill={`url(#${uid}-glass)`} />
        {/* mullions */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={558 + i * 75}
            y="450"
            width="1.6"
            height="62"
            fill={p.faceDark}
            opacity="0.5"
          />
        ))}
      </g>
      {/* upper slab, pulled back */}
      <g>
        <rect x="640" y="352" width="330" height="14" fill={p.faceLit} />
        <rect x="640" y="366" width="330" height="64" fill={p.faceMid} opacity="0.95" />
        <rect x="666" y="370" width="278" height="56" fill={`url(#${uid}-glass)`} />
        <rect x="640" y="340" width="330" height="12" fill={p.faceLit} opacity="0.8" />
      </g>

      {/* Warm interior spill */}
      <ellipse cx="745" cy="482" rx="300" ry="90" fill={p.glow} opacity="0.13" />

      {/* Infinity pool lip, foreground */}
      <rect x="330" y="640" width="700" height="9" fill={p.faceLit} opacity="0.85" />
      <rect x="330" y="649" width="700" height="151" fill={`url(#${uid}-pool)`} />
      {/* Pool reflection of the villa */}
      <rect x="520" y="649" width="420" height="72" fill={p.glow} opacity="0.09" />

      {/* Terrace deck */}
      <path d={`M 0 800 L 0 700 L 330 660 L 330 800 Z`} fill={p.ground} opacity="0.9" />
    </>
  );
}

/** Low horizontal villa, palms and a pool on the Riviera. */
function Riviera({ p, uid }: SceneProps) {
  return (
    <>
      <rect x="0" y={HORIZON} width="1200" height="295" fill={`url(#${uid}-water)`} />

      {/* Coastline haze */}
      <path
        d={`M 0 ${HORIZON} L 180 490 L 420 498 L 700 488 L 980 497 L 1200 ${HORIZON} Z`}
        fill={p.haze}
        opacity="0.32"
      />

      {/* Villa — long low box with a deep overhang */}
      <g>
        <rect x="250" y="330" width="700" height="14" fill={p.faceLit} />
        <rect x="268" y="344" width="664" height="130" fill={p.faceMid} />
        <rect x="296" y="356" width="608" height="106" fill={`url(#${uid}-glass)`} />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect
            key={i}
            x={296 + i * 87}
            y="356"
            width="1.8"
            height="106"
            fill={p.faceDark}
            opacity="0.45"
          />
        ))}
        {/* Slim gold trim line — the only literal gold in the artwork */}
        <rect x="250" y="344" width="700" height="2" fill="#c6a15b" opacity="0.65" />
        {/* Base plinth */}
        <rect x="240" y="474" width="720" height="34" fill={p.faceDark} opacity="0.9" />
      </g>

      {/* Palms */}
      {[
        { x: 150, h: 210, s: 1 },
        { x: 1055, h: 250, s: 1.12 },
      ].map((palm, idx) => (
        <g key={idx} transform={`translate(${palm.x} ${HORIZON})`}>
          <path
            d={`M 0 0 C -6 ${-palm.h * 0.5} 6 ${-palm.h * 0.75} 2 ${-palm.h}`}
            stroke={p.faceDark}
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          {[-1, -0.5, 0.5, 1, 0].map((dir, i) => (
            <path
              key={i}
              d={`M 2 ${-palm.h} q ${dir * 58 * palm.s} ${-26 + Math.abs(dir) * 22} ${
                dir * 86 * palm.s
              } ${18 + Math.abs(dir) * 30}`}
              stroke={p.faceDark}
              strokeWidth="5.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.92"
            />
          ))}
        </g>
      ))}

      {/* Pool */}
      <rect x="180" y="604" width="840" height="132" rx="4" fill={`url(#${uid}-pool)`} />
      <rect x="180" y="604" width="840" height="4" fill={p.faceLit} opacity="0.55" />
      <rect x="330" y="618" width="540" height="52" fill={p.light} opacity="0.07" />

      {/* Deck */}
      <rect x="0" y="736" width="1200" height="64" fill={p.ground} />
      <rect x="0" y="560" width="1200" height="46" fill={p.ground} opacity="0.55" />
    </>
  );
}

/** City skyline seen from a terrace, at night. */
function Penthouse({ p, uid }: SceneProps) {
  const rand = seeded(9137);
  const towers = Array.from({ length: 16 }, (_, i) => {
    const w = 46 + rand() * 74;
    const h = 110 + rand() * 260;
    return { x: i * 78 - 20, w, h, o: 0.55 + rand() * 0.45 };
  });

  return (
    <>
      {/* Skyline */}
      {towers.map((t, i) => (
        <g key={i} opacity={t.o}>
          <rect x={t.x} y={HORIZON - t.h} width={t.w} height={t.h} fill={p.faceMid} />
          {/* Lit windows */}
          {Array.from({ length: Math.floor(t.h / 26) }, (_, r) =>
            Array.from({ length: Math.max(1, Math.floor(t.w / 20)) }, (_, c) => {
              const on = rand() > 0.52;
              if (!on) return null;
              return (
                <rect
                  key={`${r}-${c}`}
                  x={t.x + 7 + c * 20}
                  y={HORIZON - t.h + 12 + r * 26}
                  width="8"
                  height="11"
                  fill={p.glow}
                  opacity={0.35 + rand() * 0.5}
                />
              );
            })
          )}
        </g>
      ))}

      {/* Atmospheric glow over the city */}
      <rect x="0" y={HORIZON - 250} width="1200" height="250" fill={`url(#${uid}-cityglow)`} />

      {/* Hero tower, closer and taller */}
      <g>
        <rect x="812" y="150" width="150" height={HORIZON - 150} fill={p.faceDark} />
        <rect x="826" y="166" width="122" height={HORIZON - 182} fill={`url(#${uid}-glass)`} />
        {Array.from({ length: 12 }, (_, r) => (
          <rect
            key={r}
            x="826"
            y={172 + r * 28}
            width="122"
            height="1.6"
            fill={p.faceLit}
            opacity="0.28"
          />
        ))}
        <rect x="812" y="150" width="150" height="3" fill="#c6a15b" opacity="0.55" />
      </g>

      {/* Terrace floor */}
      <rect x="0" y={HORIZON} width="1200" height="295" fill={p.ground} />
      <rect x="0" y={HORIZON} width="1200" height="90" fill={`url(#${uid}-floor)`} />

      {/* Glass parapet */}
      <rect x="0" y="470" width="1200" height="72" fill={p.light} opacity="0.07" />
      <rect x="0" y="470" width="1200" height="3" fill={p.faceLit} opacity="0.5" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={i * 150 + 4} y="470" width="3" height="72" fill={p.faceDark} opacity="0.7" />
      ))}

      {/* Warm spill from the interior, bottom-left */}
      <ellipse cx="180" cy="770" rx="330" ry="120" fill={p.glow} opacity="0.14" />
    </>
  );
}

/** Symmetrical Provençal bastide framed by cypresses. */
function Estate({ p, uid }: SceneProps) {
  const windows = [0, 1, 2, 3];
  return (
    <>
      {/* Rolling land */}
      <path
        d={`M 0 ${HORIZON} Q 300 470 600 496 T 1200 ${HORIZON} L 1200 800 L 0 800 Z`}
        fill={p.ground}
      />
      <path
        d={`M 0 ${HORIZON} Q 300 470 600 496 T 1200 ${HORIZON}`}
        stroke={p.haze}
        strokeWidth="2"
        fill="none"
        opacity="0.3"
      />

      {/* Bastide */}
      <g>
        {/* Roof */}
        <path d="M 372 300 L 600 226 L 828 300 Z" fill={p.faceDark} />
        <path d="M 372 300 L 828 300 L 828 312 L 372 312 Z" fill={p.faceMid} />
        {/* Body */}
        <rect x="396" y="312" width="408" height="200" fill={p.faceLit} />
        <rect x="396" y="312" width="408" height="200" fill={`url(#${uid}-wall)`} />
        {/* Windows, two rows */}
        {[0, 1].map((row) =>
          windows.map((c) => (
            <g key={`${row}-${c}`}>
              <rect
                x={432 + c * 94}
                y={352 + row * 88}
                width="46"
                height="62"
                fill={p.faceDark}
                opacity="0.85"
              />
              <rect
                x={436 + c * 94}
                y={356 + row * 88}
                width="38"
                height="54"
                fill={p.glow}
                opacity={row === 1 && (c === 1 || c === 2) ? 0.5 : 0.16}
              />
            </g>
          ))
        )}
        {/* Door */}
        <rect x="573" y="440" width="54" height="72" fill={p.faceDark} />
        <rect x="577" y="446" width="46" height="66" fill={p.glow} opacity="0.28" />
        {/* Gold threshold line */}
        <rect x="396" y="510" width="408" height="2.5" fill="#c6a15b" opacity="0.5" />
      </g>

      {/* Cypresses */}
      {[300, 340, 880, 918, 956].map((x, i) => {
        const h = 190 + ((i * 37) % 70);
        return (
          <path
            key={x}
            d={`M ${x} ${HORIZON + 6} Q ${x - 16} ${HORIZON - h * 0.45} ${x} ${HORIZON - h} Q ${
              x + 16
            } ${HORIZON - h * 0.45} ${x} ${HORIZON + 6} Z`}
            fill={p.faceDark}
            opacity="0.92"
          />
        );
      })}

      {/* Gravel drive */}
      <path
        d={`M 540 ${HORIZON + 8} L 660 ${HORIZON + 8} L 810 800 L 390 800 Z`}
        fill={p.faceMid}
        opacity="0.22"
      />
    </>
  );
}

/** Alpine chalet against a snow range. */
function Chalet({ p, uid }: SceneProps) {
  return (
    <>
      {/* Far range */}
      <path
        d={`M -20 ${HORIZON} L 150 250 L 300 366 L 430 190 L 610 372 L 760 262 L 900 380 L 1060 232 L 1220 ${HORIZON} Z`}
        fill={p.faceMid}
        opacity="0.45"
      />
      {/* Snow caps */}
      <path d="M 430 190 L 478 250 L 452 244 L 430 258 L 404 244 L 382 250 Z" fill={p.faceLit} opacity="0.85" />
      <path d="M 1060 232 L 1104 288 L 1080 282 L 1060 296 L 1036 282 L 1014 288 Z" fill={p.faceLit} opacity="0.8" />
      <path d="M 150 250 L 194 308 L 170 300 L 150 314 L 128 300 L 106 308 Z" fill={p.faceLit} opacity="0.7" />

      {/* Near range */}
      <path
        d={`M -20 ${HORIZON} L 220 356 L 470 448 L 720 372 L 980 452 L 1220 ${HORIZON} Z`}
        fill={p.faceDark}
        opacity="0.75"
      />

      {/* Chalet */}
      <g>
        <path d="M 400 372 L 600 268 L 800 372 Z" fill={p.faceDark} />
        {/* Snow on the roof */}
        <path d="M 406 368 L 600 267 L 794 368 L 780 362 L 600 276 L 420 362 Z" fill={p.faceLit} opacity="0.9" />
        <rect x="424" y="372" width="352" height="146" fill={p.faceMid} />
        {/* Glazing, full height */}
        <rect x="456" y="386" width="288" height="118" fill={`url(#${uid}-glass)`} />
        <rect x="456" y="386" width="288" height="118" fill={p.glow} opacity="0.34" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={456 + i * 72} y="386" width="2.4" height="118" fill={p.faceDark} opacity="0.7" />
        ))}
        <rect x="456" y="440" width="288" height="2.4" fill={p.faceDark} opacity="0.55" />
        {/* Balcony */}
        <rect x="410" y="504" width="380" height="10" fill={p.faceLit} opacity="0.75" />
        <rect x="424" y="514" width="352" height="26" fill={p.faceDark} opacity="0.85" />
        {/* Chimney */}
        <rect x="690" y="292" width="30" height="60" fill={p.faceDark} />
      </g>

      {/* Snow field */}
      <path
        d={`M 0 ${HORIZON + 30} Q 300 ${HORIZON + 4} 600 ${HORIZON + 36} T 1200 ${HORIZON + 20} L 1200 800 L 0 800 Z`}
        fill={p.faceLit}
        opacity="0.16"
      />
      <rect x="0" y="700" width="1200" height="100" fill={p.ground} opacity="0.55" />

      {/* Warm spill onto the snow */}
      <ellipse cx="600" cy="576" rx="290" ry="70" fill={p.glow} opacity="0.16" />

      {/* Conifers */}
      {[120, 200, 262, 940, 1010, 1090].map((x, i) => {
        const h = 96 + ((i * 29) % 62);
        return (
          <path
            key={x}
            d={`M ${x} ${HORIZON + 60} L ${x - 26} ${HORIZON + 60} L ${x} ${HORIZON + 60 - h} L ${
              x + 26
            } ${HORIZON + 60} Z`}
            fill={p.faceDark}
            opacity="0.9"
          />
        );
      })}
    </>
  );
}

/** Parisian atelier facade with its original glazed roof. */
function Loft({ p, uid }: SceneProps) {
  return (
    <>
      {/* Adjacent facades, out of focus */}
      <rect x="0" y="120" width="1200" height={HORIZON + 180} fill={p.faceDark} opacity="0.5" />

      {/* Main facade */}
      <rect x="180" y="80" width="840" height="640" fill={p.faceMid} />
      <rect x="180" y="80" width="840" height="640" fill={`url(#${uid}-wall)`} />

      {/* Zinc roof + verrière */}
      <path d="M 180 80 L 300 20 L 900 20 L 1020 80 Z" fill={p.faceDark} />
      <g>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M ${330 + i * 96} 74 L ${348 + i * 96} 28 L ${408 + i * 96} 28 L ${
              402 + i * 96
            } 74 Z`}
            fill={p.glow}
            opacity="0.42"
          />
        ))}
      </g>

      {/* Arched atelier windows, two floors */}
      {[0, 1].map((row) =>
        [0, 1, 2, 3].map((c) => {
          const x = 250 + c * 190;
          const y = 140 + row * 250;
          const lit = row === 0 ? c !== 2 : c === 1;
          return (
            <g key={`${row}-${c}`}>
              <path
                d={`M ${x} ${y + 200} L ${x} ${y + 66} A 66 66 0 0 1 ${x + 132} ${y + 66} L ${
                  x + 132
                } ${y + 200} Z`}
                fill={p.faceDark}
              />
              <path
                d={`M ${x + 8} ${y + 192} L ${x + 8} ${y + 66} A 58 58 0 0 1 ${x + 124} ${
                  y + 66
                } L ${x + 124} ${y + 192} Z`}
                fill={p.glow}
                opacity={lit ? 0.4 : 0.12}
              />
              {/* Steel glazing bars */}
              {[0, 1, 2].map((b) => (
                <rect
                  key={b}
                  x={x + 41 + b * 25}
                  y={y + 20}
                  width="2.2"
                  height={172}
                  fill={p.faceDark}
                  opacity="0.75"
                />
              ))}
              <rect x={x + 8} y={y + 108} width="116" height="2.2" fill={p.faceDark} opacity="0.75" />
            </g>
          );
        })
      )}

      {/* Cornice + gold string course */}
      <rect x="170" y="392" width="860" height="10" fill={p.faceLit} opacity="0.35" />
      <rect x="170" y="402" width="860" height="2.4" fill="#c6a15b" opacity="0.45" />

      {/* Cobbled court in shadow */}
      <rect x="0" y="700" width="1200" height="100" fill={p.ground} />
      <ellipse cx="600" cy="720" rx="440" ry="60" fill={p.glow} opacity="0.09" />
    </>
  );
}

const scenes: Record<VisualScene, (props: SceneProps) => React.ReactElement> = {
  "cliff-villa": CliffVilla,
  riviera: Riviera,
  penthouse: Penthouse,
  estate: Estate,
  chalet: Chalet,
  loft: Loft,
};

/* ------------------------------------------------------------------ */

export function PropertyVisual({
  scene,
  mood,
  className,
  /** Skip the sun/moon disc when the composition is already busy. */
  showDisc = true,
}: {
  scene: VisualScene;
  mood: VisualMood;
  className?: string;
  showDisc?: boolean;
}) {
  const uid = useId().replace(/[:]/g, "");
  const p = palettes[mood];
  const Scene = scenes[scene];
  const discY = mood === "night" ? 150 : 430;

  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className={cn("h-full w-full", className)}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          {p.sky.map((c, i) => (
            <stop key={i} offset={`${(i / (p.sky.length - 1)) * 100}%`} stopColor={c} />
          ))}
        </linearGradient>

        <linearGradient id={`${uid}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.water[0]} />
          <stop offset="100%" stopColor={p.water[1]} />
        </linearGradient>

        <linearGradient id={`${uid}-pool`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.water[0]} stopOpacity="0.9" />
          <stop offset="100%" stopColor={p.water[1]} stopOpacity="0.95" />
        </linearGradient>

        {/* Glass reads as a dark gradient with a bright top edge. */}
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor={p.glow} stopOpacity="0.42" />
          <stop offset="45%" stopColor={p.faceDark} stopOpacity="0.85" />
          <stop offset="100%" stopColor={p.faceDark} stopOpacity="0.97" />
        </linearGradient>

        <linearGradient id={`${uid}-rock`} x1="0.2" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.faceMid} stopOpacity="0.9" />
          <stop offset="100%" stopColor={p.ground} />
        </linearGradient>

        <linearGradient id={`${uid}-wall`} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0%" stopColor={p.light} stopOpacity="0.16" />
          <stop offset="60%" stopColor={p.faceDark} stopOpacity="0.05" />
          <stop offset="100%" stopColor={p.faceDark} stopOpacity="0.4" />
        </linearGradient>

        <linearGradient id={`${uid}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.faceMid} stopOpacity="0.5" />
          <stop offset="100%" stopColor={p.ground} stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`${uid}-cityglow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.haze} stopOpacity="0" />
          <stop offset="100%" stopColor={p.haze} stopOpacity="0.5" />
        </linearGradient>

        <radialGradient id={`${uid}-disc`}>
          <stop offset="0%" stopColor={p.light} stopOpacity="0.95" />
          <stop offset="38%" stopColor={p.light} stopOpacity="0.42" />
          <stop offset="100%" stopColor={p.light} stopOpacity="0" />
        </radialGradient>

        {/* Bottom-weighted vignette so overlaid text always has contrast. */}
        <linearGradient id={`${uid}-vig`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#07080b" stopOpacity="0.34" />
          <stop offset="42%" stopColor="#07080b" stopOpacity="0" />
          <stop offset="78%" stopColor="#07080b" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#07080b" stopOpacity="0.86" />
        </linearGradient>
      </defs>

      <rect width="1200" height="800" fill={`url(#${uid}-sky)`} />

      {showDisc ? (
        <circle cx="880" cy={discY} r="185" fill={`url(#${uid}-disc)`} opacity={p.discOpacity} />
      ) : null}

      {/* Horizon haze band */}
      <rect x="0" y={HORIZON - 70} width="1200" height="90" fill={p.haze} opacity="0.22" />

      <Scene p={p} uid={uid} mood={mood} />

      <rect width="1200" height="800" fill={`url(#${uid}-vig)`} />
    </svg>
  );
}
