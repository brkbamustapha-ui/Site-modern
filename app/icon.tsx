import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Monogram favicon: gold "B" on deep black, matching the site's palette. */
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
          background: "#07080b",
          borderRadius: 13,
          border: "2px solid #c6a15b",
        }}
      >
        <span
          style={{
            fontSize: 34,
            fontWeight: 500,
            color: "#e6cf9a",
            fontFamily: "serif",
            letterSpacing: -1,
          }}
        >
          B
        </span>
      </div>
    ),
    { ...size }
  );
}
