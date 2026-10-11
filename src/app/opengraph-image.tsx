import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { aboutData } from "@/data/about.data";

export const alt = `${aboutData.fullName} ${aboutData.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [portrait, font] = await Promise.all([
    readFile(join(process.cwd(), "public", aboutData.portrait), "base64"),
    readFile(
      join(
        process.cwd(),
        "src/fonts/Bricolage_Grotesque/static/BricolageGrotesque-ExtraBold.ttf",
      ),
    ),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#DCD3BD",
        color: "#111110",
        fontFamily: "Bricolage",
        position: "relative",
      }}
    >
      {/* Decorative subtle border line on full 1200x630 banner */}
      <div
        style={{
          position: "absolute",
          top: 32,
          bottom: 32,
          left: 48,
          right: 48,
          border: "1px solid rgba(17, 17, 16, 0.12)",
          display: "flex",
        }}
      />

      {/* Central 1:1 Safe-Zone Container (~560px wide, centered) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 580,
          padding: "20px 24px",
        }}
      >
        {/* Rounded portrait with signature accent border */}
        <div
          style={{
            display: "flex",
            width: 170,
            height: 170,
            borderRadius: 9999,
            overflow: "hidden",
            border: "4px solid #E2441D",
            boxShadow: "0 12px 32px rgba(17, 17, 16, 0.15)",
            marginBottom: 24,
          }}
        >
          <img
            src={`data:image/jpeg;base64,${portrait}`}
            alt=""
            width={170}
            height={170}
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>

        {/* Wordmark badge */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 2,
            color: "#524D45",
            marginBottom: 8,
            textTransform: "uppercase",
          }}
        >
          {aboutData.preferredName}
          <span style={{ color: "#E2441D" }}>.</span>
        </div>

        {/* Full Name */}
        <div
          style={{
            fontSize: 48,
            letterSpacing: -1.5,
            lineHeight: 1.1,
            color: "#111110",
            marginBottom: 12,
          }}
        >
          {aboutData.fullName}
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 24,
            lineHeight: 1.2,
            color: "#111110",
            marginBottom: 10,
          }}
        >
          {aboutData.role}
        </div>

        {/* Location badge / text */}
        <div
          style={{
            display: "flex",
            fontSize: 18,
            color: "#524D45",
          }}
        >
          {aboutData.location}
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Bricolage", data: font, weight: 800, style: "normal" }],
    },
  );
}
