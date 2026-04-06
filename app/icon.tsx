import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          fontWeight: 800,
          fontSize: 13,
          color: "white",
          letterSpacing: "-0.5px",
        }}
      >
        AK
      </div>
    ),
    { ...size }
  );
}
