/**
 * 빌드 산출물(.next/server/app/*.html)을 대상으로 Technical SEO를 검사합니다.
 * 실행: npm run build 후 `node scripts/seo-audit.mjs`
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const OUT = ".next/server/app";
const PHONE_DIGITS = "01023033778";
const SITE_ORIGIN = "https://www.gnpublics.com";
const GOOGLE_VERIFICATION = "gJIZPgjEJ8ueNroDyWpUcQD08zhqzD9Jmpr7FiFr7Tw";

const pages = [
  { file: "index.html", route: "/" },
  { file: "system.html", route: "/system" },
  { file: "price.html", route: "/price" },
  { file: "contact.html", route: "/contact" },
  { file: "blog.html", route: "/blog" },
  { file: "blog/public-first-visit-checklist.html", route: "/blog/public-first-visit-checklist" },
  { file: "blog/public-vs-hyperpublic-difference.html", route: "/blog/public-vs-hyperpublic-difference" },
  { file: "blog/yeoksam-public-area-guide.html", route: "/blog/yeoksam-public-area-guide" },
  { file: "blog/public-terms-glossary.html", route: "/blog/public-terms-glossary" },
];

const validRoutes = new Set(pages.map((p) => p.route));

const problems = [];
const rows = [];
const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();

function fail(route, msg) {
  problems.push(`${route}: ${msg}`);
}

function stripScripts(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ");
}

function visibleText(html) {
  return stripScripts(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return m ? m[1] : null;
}

function publicFileExists(src) {
  const clean = src.split("?")[0];
  if (clean.startsWith("/_next/")) return true;
  return existsSync(join("public", clean));
}

/** next/image가 만든 최적화 URL에서 원본 경로를 되돌립니다. */
function originalFromNextImage(src) {
  const m = src.match(/[?&]url=([^&]+)/);
  return m ? decodeURIComponent(m[1]) : src;
}

for (const { file, route } of pages) {
  const path = join(OUT, file);
  if (!existsSync(path)) {
    fail(route, `프리렌더 HTML 없음 (${file})`);
    continue;
  }
  const html = readFileSync(path, "utf8");
  const text = visibleText(html);

  /* --- 전화번호 노출 --- */
  const digitVariants = [PHONE_DIGITS, "010-2303-3778", "010 2303 3778", "1023033778"];
  for (const variant of digitVariants) {
    if (text.includes(variant)) fail(route, `화면 텍스트에 전화번호 노출: ${variant}`);
  }
  const telLinks = html.match(/href="tel:[^"]*"/g) ?? [];
  if (telLinks.length === 0) fail(route, "tel: 링크 없음");
  for (const link of telLinks) {
    if (link !== `href="tel:${PHONE_DIGITS}"`) fail(route, `tel 링크 불일치: ${link}`);
  }
  const ariaOnTel = (html.match(/<a[^>]*href="tel:[^"]*"[^>]*>/g) ?? []).every((a) =>
    /aria-label="[^"]+"/.test(a),
  );
  if (!ariaOnTel) fail(route, "tel 링크에 aria-label 누락");

  /* --- H1 --- */
  const h1s = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) ?? [];
  if (h1s.length !== 1) fail(route, `H1 개수가 ${h1s.length}개 (1개여야 함)`);

  /* --- Heading 계층 --- */
  const headings = [...stripScripts(html).matchAll(/<h([1-6])[^>]*>/gi)].map((m) =>
    Number(m[1]),
  );
  for (let i = 1; i < headings.length; i += 1) {
    if (headings[i] - headings[i - 1] > 1) {
      fail(route, `heading 레벨 건너뜀: h${headings[i - 1]} → h${headings[i]}`);
    }
  }

  /* --- Metadata --- */
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? null;
  const descTag = html.match(/<meta name="description"[^>]*>/i)?.[0] ?? null;
  const desc = descTag ? attr(descTag, "content") : null;
  const canonTag = html.match(/<link rel="canonical"[^>]*>/i)?.[0] ?? null;
  const canon = canonTag ? attr(canonTag, "href") : null;
  const ogImageTag = html.match(/<meta property="og:image"[^>]*>/i)?.[0] ?? null;
  const ogImage = ogImageTag ? attr(ogImageTag, "content") : null;
  const ogUrlTag = html.match(/<meta property="og:url"[^>]*>/i)?.[0] ?? null;
  const twitterCard = /<meta name="twitter:card"/i.test(html);
  const robotsTag = html.match(/<meta name="robots"[^>]*>/i)?.[0] ?? null;

  if (!title) fail(route, "title 없음");
  if (!desc) fail(route, "meta description 없음");
  if (!canon) fail(route, "canonical 없음");
  if (!ogImage) fail(route, "og:image 없음");
  if (!ogUrlTag) fail(route, "og:url 없음");
  if (!twitterCard) fail(route, "twitter:card 없음");
  if (!robotsTag || !/index/.test(robotsTag)) fail(route, "robots meta 없음");

  const verifyTag = html.match(/<meta name="google-site-verification"[^>]*>/i)?.[0] ?? null;
  const verify = verifyTag ? attr(verifyTag, "content") : null;
  if (verify !== GOOGLE_VERIFICATION) {
    fail(route, `google-site-verification 없음 또는 불일치`);
  }

  const keywordsTag = html.match(/<meta name="keywords"[^>]*>/i)?.[0] ?? null;
  if (!keywordsTag) fail(route, "keywords 검색태그 없음");

  if (title) {
    if (titles.has(title)) fail(route, `title 중복 (${titles.get(title)})`);
    else titles.set(title, route);
  }
  if (desc) {
    if (descriptions.has(desc)) fail(route, `description 중복 (${descriptions.get(desc)})`);
    else descriptions.set(desc, route);
  }
  if (canon) {
    if (canonicals.has(canon)) fail(route, `canonical 중복 (${canonicals.get(canon)})`);
    else canonicals.set(canon, route);
    // 루트는 오리진 그대로(후행 슬래시 없음), 나머지는 경로가 그대로 붙어야 합니다.
    const origin = canon.replace(/^(https?:\/\/[^/]+).*$/, "$1");
    if (origin !== SITE_ORIGIN) {
      fail(route, `canonical 도메인 불일치: ${origin} (기대: ${SITE_ORIGIN})`);
    }
    const expected = route === "/" ? origin : `${origin}${route}`;
    if (canon !== expected) {
      fail(route, `canonical self-reference 불일치: ${canon} (기대: ${expected})`);
    }
    const ogUrl = ogUrlTag ? attr(ogUrlTag, "content") : null;
    if (ogUrl !== canon) fail(route, `og:url이 canonical과 다름: ${ogUrl}`);
  }
  if (ogImage && !publicFileExists(ogImage.replace(/^https?:\/\/[^/]+/, ""))) {
    fail(route, `og:image 파일 없음: ${ogImage}`);
  }

  /* --- 이미지 --- */
  const imgTags = html.match(/<img[^>]*>/gi) ?? [];
  for (const tag of imgTags) {
    const alt = attr(tag, "alt");
    const src = attr(tag, "src");
    if (alt === null || alt.trim() === "") fail(route, `img alt 누락: ${src}`);
    if (!src) {
      fail(route, "img src 누락");
      continue;
    }
    const original = originalFromNextImage(src);
    if (original.startsWith("/images/") && !publicFileExists(original)) {
      fail(route, `이미지 파일 없음: ${original}`);
    }
    if (!/(width=|height=)/.test(tag) && !/fill/.test(tag) && !/style="[^"]*position:absolute/.test(tag)) {
      fail(route, `img 크기 정보 없음: ${original}`);
    }
  }

  /* --- 내부 링크 --- */
  const hrefs = [...html.matchAll(/<a[^>]*href="([^"]+)"/gi)].map((m) => m[1]);
  for (const href of hrefs) {
    if (/^(tel:|mailto:|https?:|#)/.test(href)) continue;
    const [pathPart] = href.split("#");
    if (pathPart && !validRoutes.has(pathPart)) {
      fail(route, `깨진 내부 링크: ${href}`);
    }
  }

  /* --- 앵커 링크 대상 존재 --- */
  const anchorTargets = new Set(
    [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]),
  );
  for (const href of hrefs) {
    if (!href.startsWith("#") || href === "#") continue;
    if (!anchorTargets.has(href.slice(1))) fail(route, `앵커 대상 없음: ${href}`);
  }

  /* --- JSON-LD --- */
  const ldBlocks = [
    ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
  ].map((m) => m[1]);
  if (ldBlocks.length === 0) fail(route, "JSON-LD 없음");
  let ldTypes = [];
  for (const block of ldBlocks) {
    try {
      const parsed = JSON.parse(block);
      const graph = parsed["@graph"] ?? [parsed];
      ldTypes.push(...graph.map((n) => n["@type"]));
      const json = JSON.stringify(parsed);
      if (/aggregateRating|"review"|"Review"/.test(json)) {
        fail(route, "리뷰/별점 스키마가 생성됨 (실제 리뷰 없음)");
      }
    } catch (error) {
      fail(route, `JSON-LD 파싱 실패: ${String(error).slice(0, 80)}`);
    }
  }

  /* --- 금지 문자열 --- */
  for (const banned of ["TODO", "FIXME", "lorem ipsum", "placeholder", "undefined"]) {
    if (text.toLowerCase().includes(banned.toLowerCase())) {
      fail(route, `금지 문자열 발견: ${banned}`);
    }
  }

  /* --- NAP 일관성 --- */
  if (!text.includes("역삼동 604-11")) fail(route, "주소 표기 없음");
  if (!text.includes("24시간")) fail(route, "영업시간 표기 없음");

  rows.push({
    route,
    chars: text.length,
    h1: h1s.length,
    imgs: imgTags.length,
    tel: telLinks.length,
    ld: [...new Set(ldTypes)].join(","),
  });
}

/* --- robots / sitemap --- */
const robotsPath = join(OUT, "robots.txt.body");
const sitemapPath = join(OUT, "sitemap.xml.body");
for (const [label, path] of [
  ["robots.txt", robotsPath],
  ["sitemap.xml", sitemapPath],
]) {
  if (!existsSync(path)) {
    problems.push(`${label}: 산출물 없음 (${path})`);
    continue;
  }
  const body = readFileSync(path, "utf8");
  if (/localhost/.test(body)) problems.push(`${label}: localhost 포함`);
  if (/gangnam-public\.example/.test(body)) {
    problems.push(`${label}: 예시 도메인 포함`);
  }
  if (!body.includes(SITE_ORIGIN)) {
    problems.push(`${label}: ${SITE_ORIGIN} 없음`);
  }
  if (label === "sitemap.xml") {
    if (!body.includes("<lastmod>")) {
      problems.push("sitemap.xml: lastmod 없음");
    }
    if (!body.includes("2026-09-07")) {
      problems.push("sitemap.xml: lastmod가 2026-09-07가 아님");
    }
    const urls = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
      m[1].replace(/^https?:\/\/[^/]+/, "") || "/",
    );
    for (const u of urls) {
      if (!validRoutes.has(u)) problems.push(`sitemap: 존재하지 않는 URL ${u}`);
    }
    for (const r of validRoutes) {
      if (!urls.includes(r)) problems.push(`sitemap: 누락된 URL ${r}`);
    }
    console.log(`sitemap URL 수: ${urls.length}`);
  }
}

/* --- Orphan page 검사 --- */
const linkedFrom = new Map([...validRoutes].map((r) => [r, 0]));
for (const { file } of pages) {
  const path = join(OUT, file);
  if (!existsSync(path)) continue;
  const html = readFileSync(path, "utf8");
  for (const m of html.matchAll(/<a[^>]*href="([^"#]+)"/g)) {
    if (linkedFrom.has(m[1])) linkedFrom.set(m[1], linkedFrom.get(m[1]) + 1);
  }
}
for (const [route, count] of linkedFrom) {
  if (route !== "/" && count === 0) problems.push(`orphan page: ${route}`);
}

/* --- 미사용 이미지 --- */
const allHtml = pages
  .map(({ file }) => {
    const p = join(OUT, file);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
  })
  .join("");
const unusedImages = readdirSync("public/images").filter(
  (f) => !allHtml.includes(encodeURIComponent(`/images/${f}`)) && !allHtml.includes(`/images/${f}`),
);

console.log("\n=== 페이지 요약 ===");
console.table(rows);
console.log(
  `\n고유 title: ${titles.size}/${rows.length}, 고유 description: ${descriptions.size}/${rows.length}, 고유 canonical: ${canonicals.size}/${rows.length}`,
);
if (unusedImages.length) console.log(`참고 - HTML에서 참조되지 않은 이미지: ${unusedImages.join(", ")}`);

console.log("\n=== 결과 ===");
if (problems.length === 0) {
  console.log("문제 없음 — 모든 검사 통과");
} else {
  console.log(`${problems.length}개 문제 발견:`);
  for (const p of problems) console.log(` - ${p}`);
  process.exitCode = 1;
}
