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
          background: "#0a0806",
        }}
      >
        <span
          style={{
            fontSize: 92,
            fontStyle: "italic",
            color: "#f4ecd9",
            fontFamily: "serif",
          }}
        >
          D
        </span>
      </div>
    ),
    { ...size }
  );
}
