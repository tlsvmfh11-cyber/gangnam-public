// 소스 파일이 올바른 UTF-8인지 검사합니다.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const decoder = new TextDecoder("utf-8", { fatal: true });
const roots = ["app", "components", "lib", "content"];
let bad = 0;

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(ts|tsx|css)$/.test(entry)) continue;
    try {
      decoder.decode(readFileSync(full));
    } catch {
      console.log(`INVALID UTF-8: ${full}`);
      bad += 1;
    }
  }
}

for (const root of roots) walk(root);
console.log(bad === 0 ? "all files are valid UTF-8" : `${bad} file(s) need rewriting`);
