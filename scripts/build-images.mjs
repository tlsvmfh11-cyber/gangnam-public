/**
 * 업로드한 원본 이미지를 사이트 규격으로 변환합니다.
 *
 * - 원본 1024x686을 정확한 3:2(1020x680)로 센터 크롭합니다.
 * - WebP로 인코딩해 public/images에 씁니다.
 * - 원본에 없는 픽셀을 만들지 않기 위해 업스케일하지 않습니다.
 *
 * 실행: node scripts/build-images.mjs
 */
import { existsSync, readdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const SRC_DIR =
  "C:/Users/User/.cursor/projects/c-Users-User-Desktop-cursor/assets";
const OUT_DIR = "public/images";
/** 원본과 같은 해상도를 유지합니다. 픽셀을 줄이거나 늘리지 않습니다. */
const WIDTH = 1024;
const HEIGHT = 686;

/** 원본 파일명에 들어 있는 5자리 번호 -> 사이트에서 쓸 파일명 */
const mapping = {
  53955: "gangnam-public-hero.webp",
  "09180": "gangnam-public-og.webp",
  43072: "public-room-interior.webp",
  75838: "public-room-styles.webp",
  "05649": "public-room-compact.webp",
  62960: "room-table-setup.webp",
  "01851": "choice-system-guide.webp",
  87509: "roomtime-guide.webp",
  84691: "drink-setup-guide.webp",
  17798: "room-lounge-seating.webp",
};

const sources = readdirSync(SRC_DIR).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));
const used = new Set();
let done = 0;

for (const [id, outName] of Object.entries(mapping)) {
  const src = sources.find((f) => f.includes(id));
  if (!src) {
    console.log(`MISSING 원본: ${id} -> ${outName}`);
    continue;
  }
  used.add(src);

  const outPath = join(OUT_DIR, outName);
  const info = await sharp(join(SRC_DIR, src))
    .webp({ quality: 90, effort: 6 })
    .toFile(outPath);

  console.log(
    `${outName.padEnd(30)} ${info.width}x${info.height}  ${Math.round(info.size / 1024)}KB`,
  );
  done += 1;
}

const unused = sources.filter((f) => !used.has(f));
if (unused.length > 0) {
  console.log(`\n사용하지 않은 원본 ${unused.length}개:`);
  for (const f of unused) console.log(`  ${f}`);
}

console.log(`\n변환 완료: ${done}/${Object.keys(mapping).length}`);
console.log(`규격: 원본 해상도 유지, WebP quality 90`);

// 예전 파일이 남아 있으면 알려 줍니다(수동 삭제 대상).
const stale = [
  "public-room-corridor.webp",
  "visit-flow-guide.webp",
  "first-visit-guide.webp",
  "room-table-detail.webp",
  "reservation-inquiry.webp",
  "reservation-checklist.webp",
  "yeoksam-night-street.webp",
].filter((f) => existsSync(join(OUT_DIR, f)));
if (stale.length > 0) {
  for (const f of stale) {
    unlinkSync(join(OUT_DIR, f));
    console.log(`deleted stale ${f}`);
  }
}
