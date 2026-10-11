import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export default async function Icon() {
  const portrait = await readFile(
    join(process.cwd(), "public/profile.jpg"),
    "base64",
  );
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        border: "3px solid #E2441D",
        overflow: "hidden",
        background: "#DCD3BD",
      }}
    >
      {}
      <img
        src={`data:image/jpeg;base64,${portrait}`}
        alt=""
        width={58}
        height={58}
        style={{ objectFit: "cover" }}
      />
    </div>,
    size,
  );
}
