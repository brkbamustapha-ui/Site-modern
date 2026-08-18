import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Rendered once at build time. Required for `output: export`, and a
// no-op for the server build since these images never vary.
export const dynamic = "force-static";

export default function AppleIcon() {
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
          background: "linear-gradient(150deg, #0b0d12 0%, #07080b 60%, #14100a 100%)",
        }}
      >
        <span
          style={{
            fontSize: 84,
            fontWeight: 500,
            color: "#e6cf9a",
            fontFamily: "serif",
            letterSpacing: -2,
          }}
        >
          B
        </span>
        <span
          style={{
            fontSize: 13,
            letterSpacing: 6,
            color: "#8d93a1",
            marginTop: 6,
            textTransform: "uppercase",
          }}
        >
          Agency
        </span>
      </div>
    ),
    { ...size }
  );
}
