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
          background: "linear-gradient(135deg, #0a0806 0%, #241a0c 55%, #0a0806 100%)",
          color: "#f4ecd9",
        }}
      >
        <span style={{ fontSize: 22, letterSpacing: 12, color: "#c7ab77", textTransform: "uppercase" }}>
          Ristorante Italiano di Lusso
        </span>
        <span style={{ fontSize: 96, fontStyle: "italic", fontFamily: "serif", marginTop: 24 }}>
          L&apos;Oro Italiano
        </span>
        <span style={{ fontSize: 26, marginTop: 24, color: "#f4ecd9cc" }}>
          L&apos;autentica eleganza della cucina italiana.
        </span>
      </div>
    ),
    { ...size }
  );
}
