import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #06070b 0%, #12141f 55%, #06070b 100%)",
          color: "#f4f5fa",
        }}
      >
        <span style={{ fontSize: 20, letterSpacing: 10, color: "#a78bfa", textTransform: "uppercase" }}>
          Agence de création de sites web
        </span>
        <span style={{ fontSize: 84, fontWeight: 700, fontFamily: "sans-serif", marginTop: 24 }}>
          MS Développements
        </span>
        <span style={{ fontSize: 26, marginTop: 24, color: "#f4f5faaa" }}>
          Transformons votre activité en expérience digitale.
        </span>
      </div>
    ),
    { ...size }
  );
}
