import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered once at build time. Required for `output: export`, and a
// no-op for the server build since these images never vary.
export const dynamic = "force-static";
export const alt = "BMS Agency — Immobilier Premium";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background:
            "linear-gradient(125deg, #07080b 0%, #12151c 46%, #1d1810 78%, #07080b 100%)",
          color: "#efece6",
        }}
      >
        {/* Gold hairline */}
        <div
          style={{
            display: "flex",
            width: 96,
            height: 2,
            background: "linear-gradient(to right, #8a6b33, #e6cf9a)",
            marginBottom: 40,
          }}
        />

        <span
          style={{
            fontSize: 20,
            letterSpacing: 10,
            color: "#c6a15b",
            textTransform: "uppercase",
          }}
        >
          Agence immobilière premium
        </span>

        <span
          style={{
            fontSize: 88,
            letterSpacing: 18,
            marginTop: 28,
            color: "#f8f6f2",
            fontWeight: 300,
          }}
        >
          {site.name}
        </span>

        <span
          style={{
            fontSize: 40,
            fontStyle: "italic",
            fontFamily: "serif",
            marginTop: 18,
            color: "#e6cf9a",
          }}
        >
          {site.tagline}
        </span>

        <span
          style={{
            fontSize: 24,
            marginTop: 34,
            color: "#8d93a1",
            maxWidth: 780,
            lineHeight: 1.45,
          }}
        >
          Acquisition, vente et gestion de biens d&apos;exception — une approche moderne,
          professionnelle et confidentielle.
        </span>
      </div>
    ),
    { ...size }
  );
}
