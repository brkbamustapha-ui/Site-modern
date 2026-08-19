import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 14,
          border: "2px solid #7c5cff",
        }}
      >
        <span
          style={{
            fontSize: 26,
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
