import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #12141f, #06070b)",
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#f4f5fa",
            fontFamily: "sans-serif",
          }}
        >
          MS
        </span>
      </div>
    ),
    { ...size }
  );
}
