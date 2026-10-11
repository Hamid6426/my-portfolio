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
        justifyContent: "space-between",
        padding: "70px 80px",
        background: "#DCD3BD",
        color: "#111110",
        fontFamily: "Bricolage",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: 670 }}>
        <div style={{ display: "flex", fontSize: 30, marginBottom: 36 }}>
          {aboutData.preferredName}
          <span style={{ color: "#E2441D" }}>.</span>
        </div>
        <div style={{ fontSize: 58, letterSpacing: -3, lineHeight: 1.2 }}>
          {aboutData.fullName}
        </div>
        <div style={{ fontSize: 30, color: "#111110", marginTop: 25 }}>
          {aboutData.role}
        </div>
        <div style={{ fontSize: 20, color: "#524D45", marginTop: 40 }}>
          {aboutData.location}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: 300,
          height: 390,
          borderRadius: "150px 150px 16px 16px",
          overflow: "hidden",
          border: "3px solid #E2441D",
        }}
      >
        {}
        <img
          src={`data:image/jpeg;base64,${portrait}`}
          alt=""
          width={294}
          height={384}
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Bricolage", data: font, weight: 800, style: "normal" }],
    },
  );
}
