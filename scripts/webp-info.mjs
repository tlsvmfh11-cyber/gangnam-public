// WebP 헤더에서 실제 픽셀 크기를 읽습니다. lib/images.ts의 width/height 검증용.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dir = "public/images";

function webpSize(buf) {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") {
    return null;
  }
  const fourcc = buf.toString("ascii", 12, 16);
  if (fourcc === "VP8X") {
    return {
      width: (buf.readUIntLE(24, 3) & 0xffffff) + 1,
      height: (buf.readUIntLE(27, 3) & 0xffffff) + 1,
      kind: "extended",
    };
  }
  if (fourcc === "VP8 ") {
    return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff, kind: "lossy" };
  }
  if (fourcc === "VP8L") {
    const bits = buf.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1, kind: "lossless" };
  }
  return null;
}

for (const file of readdirSync(dir).filter((f) => f.endsWith(".webp")).sort()) {
  const size = webpSize(readFileSync(join(dir, file)));
  console.log(size ? `${file}\t${size.width}x${size.height}\t${size.kind}` : `${file}\tUNKNOWN`);
}
