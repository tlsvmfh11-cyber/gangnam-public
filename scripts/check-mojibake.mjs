/**
 * ANSI 왕복 변환으로 한글이 '?'로 치환된 흔적을 찾습니다.
 *
 * 이 저장소는 Windows 환경에서 작업하며, 한글을 UTF-8로 쓰지 않는 도구를 거치면
 * 글자가 '?'로 바뀝니다. 빌드는 성공하지만 화면에는 '??'가 보이므로 따로 검사합니다.
 *
 * 오탐 방지: JS/TS의 nullish coalescing(`??`)과 optional chaining(`?.`),
 * 삼항 연산자는 정상 문법이므로 검사 대상에서 제외합니다.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["app", "components", "lib", "content"];
let hits = 0;

/** 코드 문법으로 등장하는 물음표를 지운 뒤 남은 '??'만 손상으로 봅니다. */
function stripCodeQuestionMarks(line) {
  return (
    line
      // nullish coalescing: `a ?? b`, `a ??= b`
      .replace(/\?\?=?/g, (match, offset, full) => {
        const before = full[offset - 1];
        const after = full[offset + match.length];
        const isOperator =
          (before === undefined || /[\s)\]}\w"'`]/.test(before)) &&
          (after === undefined || /[\s({[\w"'`]/.test(after));
        return isOperator ? "" : match;
      })
      // optional chaining / optional call
      .replace(/\?\./g, "")
      .replace(/\?\(/g, "")
      // 타입 선언의 optional 프로퍼티: `foo?:`
      .replace(/\?:/g, "")
  );
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!/\.(ts|tsx|css)$/.test(entry)) continue;

    readFileSync(full, "utf8")
      .split(/\r?\n/)
      .forEach((line, idx) => {
        if (/\?{2,}/.test(stripCodeQuestionMarks(line))) {
          console.log(`${full}:${idx + 1}: ${line.trim().slice(0, 110)}`);
          hits += 1;
        }
      });
  }
}

for (const root of roots) walk(root);
console.log(hits === 0 ? "손상 흔적 없음" : `${hits}개 라인에 손상 흔적`);
process.exitCode = hits === 0 ? 0 : 1;
