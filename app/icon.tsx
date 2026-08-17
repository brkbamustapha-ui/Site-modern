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
          background: "#0a0806",
          borderRadius: 14,
          border: "2px solid #ad8a4f",
        }}
      >
        <span
          style={{
            fontSize: 30,
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
