/**
 * 본문 섹션에 붙는 시각 블록.
 *
 * 목적: 같은 정보를 문단 나열이 아니라 정보 성격에 맞는 형태로 보여 주는 것입니다.
 * 모두 서버 컴포넌트이고 JS를 쓰지 않습니다. 텍스트는 그대로 HTML에 남으므로
 * 검색엔진이 읽는 내용은 문단으로 쓸 때와 같습니다.
 */

import {
  AlertIcon,
  CheckIcon,
  ClockIcon,
  InfoIcon,
  PinIcon,
  SofaIcon,
  SparkIcon,
  TagIcon,
  XIcon,
} from "@/components/icons";

/* ------------------------------ 공통 타이포 ------------------------------ */

const cardBase =
  "rounded-2xl border border-white/8 bg-[#191510] p-5 transition-colors duration-200";

/* -------------------------------- 단계 흐름 ------------------------------- */

export type StepItem = { title: string; body: string };

/**
 * 순서가 있는 절차.
 * 번호 배지를 세로선으로 이어 하나의 타임라인으로 읽히게 합니다.
 */
export function StepFlow({ items }: { items: StepItem[] }) {
  return (
    <ol className="mt-6 overflow-hidden rounded-2xl border border-white/8 bg-[#191510]">
      {items.map((item, i) => (
        <li
          key={item.title}
          className="relative flex gap-4 px-4 py-4 sm:gap-5 sm:px-6 sm:py-5"
        >
          {/*
            다음 항목으로 이어지는 세로선.
            left = 좌측 패딩 + 배지 반지름(1.125rem), top = 좌측 패딩 + 배지 높이(2.25rem).
            bottom을 패딩만큼 넘겨야 다음 배지에 닿습니다.
          */}
          {i < items.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute bottom-[-1rem] left-[2.125rem] top-[3.25rem] w-px bg-[#c8a24a]/25 sm:bottom-[-1.25rem] sm:left-[2.625rem] sm:top-[3.5rem]"
            />
          ) : null}
          <span
            aria-hidden="true"
            className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#d9b25c] to-[#8a6a24] font-serif text-[1rem] font-bold text-[#17110a] shadow-sm shadow-black/50"
          >
            {i + 1}
          </span>
          <div className="min-w-0 pt-1">
            <p className="font-serif text-[1.08rem] text-[#f2ece1]">{item.title}</p>
            <p className="mt-1.5 text-[0.95rem] leading-7 text-[#bcb2a4]">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* -------------------------------- 정보 등급 ------------------------------- */

export type TierItem = { label: string; caption: string; body: string };

const tierTone = [
  {
    ring: "border-[#7fb069]/30",
    chip: "bg-[#7fb069]/15 text-[#a7d494]",
    icon: <CheckIcon className="h-3.5 w-3.5" />,
  },
  {
    ring: "border-[#c8a24a]/30",
    chip: "bg-[#c8a24a]/15 text-[#e3c982]",
    icon: <InfoIcon className="h-3.5 w-3.5" />,
  },
  {
    ring: "border-[#d18f6a]/30",
    chip: "bg-[#d18f6a]/15 text-[#e8b191]",
    icon: <AlertIcon className="h-3.5 w-3.5" />,
  },
];

/** 정보의 신뢰 등급을 색으로 구분해 보여 줍니다. */
export function TierCards({ items }: { items: TierItem[] }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-3">
      {items.map((item, i) => {
        const tone = tierTone[i % tierTone.length];
        return (
          <li
            key={item.label}
            className={`flex flex-col rounded-2xl border bg-[#191510] p-5 ${tone.ring}`}
          >
            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${tone.chip}`}
            >
              {tone.icon}
              {item.label}
            </span>
            <p className="mt-3 font-serif text-[1.02rem] leading-6 text-[#f2ece1]">
              {item.caption}
            </p>
            <p className="mt-2 text-[0.9rem] leading-6 text-[#a99f90]">{item.body}</p>
          </li>
        );
      })}
    </ul>
  );
}

/* --------------------------------- 비교표 --------------------------------- */

export type CompareRow = { name: string; cells: string[] };

/** 업종/조건 비교. 모바일에서는 카드로 바뀌어 가로 스크롤이 생기지 않습니다. */
export function CompareTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: CompareRow[];
  caption?: string;
}) {
  return (
    <div className="mt-6">
      {/* 데스크톱: 실제 표 */}
      <div className="hidden overflow-hidden rounded-2xl border border-white/10 md:block">
        <table className="w-full border-collapse text-left text-[0.93rem]">
          {caption ? <caption className="sr-only">{caption}</caption> : null}
          <thead>
            <tr className="bg-[#1f1a13]">
              <th scope="col" className="px-4 py-3 font-bold text-[#e3c982]">
                구분
              </th>
              {columns.map((col) => (
                <th key={col} scope="col" className="px-4 py-3 font-bold text-[#e3c982]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-white/8 align-top">
                <th
                  scope="row"
                  className="px-4 py-3 font-serif font-normal text-[#f2ece1]"
                >
                  {row.name}
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={`${row.name}-${columns[i] ?? i}`}
                    className="px-4 py-3 leading-6 text-[#c9c0b2]"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 모바일: 카드 */}
      <ul className="space-y-3 md:hidden">
        {rows.map((row) => (
          <li key={row.name} className={cardBase}>
            <p className="font-serif text-[1.05rem] text-[#f2ece1]">{row.name}</p>
            <dl className="mt-3 space-y-2">
              {row.cells.map((cell, i) => (
                <div key={`${row.name}-m-${columns[i] ?? i}`}>
                  <dt className="text-xs font-bold tracking-wide text-[#c8a24a]">
                    {columns[i]}
                  </dt>
                  <dd className="mt-0.5 text-[0.93rem] leading-6 text-[#c9c0b2]">
                    {cell}
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------- 체크리스트 ------------------------------- */

/** 확인할 항목. 체크 아이콘으로 "점검한다"는 성격을 드러냅니다. */
export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#191510] px-4 py-3"
        >
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#c8a24a]/15 text-[#e3c982]"
          >
            <CheckIcon className="h-3.5 w-3.5" />
          </span>
          <span className="text-[0.95rem] leading-7 text-[#d3cabc]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------- 질문 목록 ------------------------------- */

/** 문의에서 그대로 읽을 수 있는 질문 문장. 인용 형태로 구분합니다. */
export function AskList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-2.5">
      {items.map((item, i) => (
        <li
          key={item}
          className="flex gap-3.5 rounded-xl border border-[#c8a24a]/20 bg-gradient-to-r from-[#c8a24a]/8 to-transparent px-4 py-3.5"
        >
          <span
            aria-hidden="true"
            className="mt-px font-serif text-sm font-bold text-[#c8a24a]/70"
          >
            Q{i + 1}
          </span>
          <span className="text-[0.97rem] leading-7 text-[#e6ded1]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------ 오해 / 실제 ------------------------------ */

export type MythItem = { myth: string; fact: string };

/** 흔한 오해와 실제를 나란히 대비시킵니다. */
export function MythFactList({ items }: { items: MythItem[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item.myth} className={`${cardBase} sm:p-0`}>
          <div className="grid sm:grid-cols-2">
            <div className="flex gap-3 sm:border-r sm:border-white/8 sm:p-5">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#d1706a]/15 text-[#e39a95]"
              >
                <XIcon className="h-3 w-3" />
              </span>
              <div>
                <p className="text-[0.7rem] font-bold tracking-[0.14em] text-[#e39a95]">
                  이렇게 알고 있는 경우
                </p>
                <p className="mt-1.5 text-[0.93rem] leading-7 text-[#c1b8ab]">
                  {item.myth}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-3 border-t border-white/8 pt-4 sm:mt-0 sm:border-t-0 sm:p-5 sm:pt-5">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#7fb069]/15 text-[#a7d494]"
              >
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-[0.7rem] font-bold tracking-[0.14em] text-[#a7d494]">
                  실제
                </p>
                <p className="mt-1.5 text-[0.93rem] leading-7 text-[#e0d8ca]">
                  {item.fact}
                </p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* --------------------------------- 용어집 --------------------------------- */

export type TermItem = { term: string; def: string };

/** 용어와 뜻. dl로 의미를 살립니다. */
export function TermGrid({ items }: { items: TermItem[] }) {
  return (
    <dl className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.term}
          className="rounded-2xl border border-white/8 bg-[#191510] p-4 transition-colors duration-200 hover:border-[#c8a24a]/30"
        >
          <dt className="font-serif text-[1.02rem] text-[#e3c982]">{item.term}</dt>
          <dd className="mt-1.5 text-[0.92rem] leading-7 text-[#bcb2a4]">{item.def}</dd>
        </div>
      ))}
    </dl>
  );
}

/* -------------------------------- 비용 항목 ------------------------------- */

export type CostItem = { name: string; note: string };

const costIcons = [
  <SofaIcon key="sofa" className="h-[1.15rem] w-[1.15rem]" />,
  <SparkIcon key="spark" className="h-[1.15rem] w-[1.15rem]" />,
  <TagIcon key="tag" className="h-[1.15rem] w-[1.15rem]" />,
  <ClockIcon key="clock" className="h-[1.15rem] w-[1.15rem]" />,
];

/** 비용 구성 항목. 금액은 넣지 않고 항목의 성격만 보여 줍니다. */
export function CostItems({ items }: { items: CostItem[] }) {
  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <li key={item.name} className="flex gap-4 rounded-2xl border border-white/8 bg-[#191510] p-5">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#c8a24a]/25 bg-[#c8a24a]/10 text-[#e3c982]"
          >
            {costIcons[i % costIcons.length]}
          </span>
          <div className="min-w-0">
            <p className="font-serif text-[1.05rem] text-[#f2ece1]">{item.name}</p>
            <p className="mt-1 text-[0.92rem] leading-7 text-[#b5ab9d]">{item.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------- 변수 태그 ------------------------------- */

export type FactorItem = { name: string; effect: string };

/** 총액을 움직이는 변수. 영향이 큰 순서대로 배치합니다. */
export function FactorTiles({ items }: { items: FactorItem[] }) {
  return (
    <ul className="mt-6 grid gap-2.5 sm:grid-cols-3">
      {items.map((item, i) => (
        <li
          key={item.name}
          className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#191510] p-4"
        >
          <span
            aria-hidden="true"
            className={`absolute inset-x-0 top-0 h-0.5 ${
              i < 2 ? "bg-[#c8a24a]" : "bg-[#c8a24a]/30"
            }`}
          />
          <p className="font-serif text-[1rem] text-[#f2ece1]">{item.name}</p>
          <p className="mt-1.5 text-[0.88rem] leading-6 text-[#a99f90]">{item.effect}</p>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------- 콜아웃 -------------------------------- */

type CalloutTone = "note" | "warn" | "ask";

const calloutTone: Record<
  CalloutTone,
  { border: string; chip: string; icon: React.ReactNode; label: string }
> = {
  note: {
    border: "border-[#c8a24a]/30 from-[#c8a24a]/8",
    chip: "text-[#e3c982]",
    icon: <InfoIcon className="h-4 w-4" />,
    label: "알아 두기",
  },
  warn: {
    border: "border-[#d18f6a]/30 from-[#d18f6a]/8",
    chip: "text-[#e8b191]",
    icon: <AlertIcon className="h-4 w-4" />,
    label: "주의",
  },
  ask: {
    border: "border-[#7fb069]/30 from-[#7fb069]/8",
    chip: "text-[#a7d494]",
    icon: <CheckIcon className="h-4 w-4" />,
    label: "문의로 확인",
  },
};

/** 강조할 한 문장. 본문 흐름을 끊어 시선을 잡습니다. */
export function Callout({
  tone = "note",
  title,
  children,
}: {
  tone?: CalloutTone;
  title?: string;
  children: React.ReactNode;
}) {
  const t = calloutTone[tone];
  return (
    <aside
      className={`mt-6 rounded-2xl border bg-gradient-to-r to-transparent p-5 ${t.border}`}
    >
      <p className={`flex items-center gap-2 text-xs font-bold tracking-[0.12em] ${t.chip}`}>
        {t.icon}
        {title ?? t.label}
      </p>
      <div className="mt-2 text-[0.97rem] leading-7 text-[#ded6c8]">{children}</div>
    </aside>
  );
}

/* -------------------------------- 위치 정보 ------------------------------- */

/** 주소·영업시간 같은 확정 정보를 아이콘과 함께 강조합니다. */
export function InfoTiles({
  items,
}: {
  items: { icon: "pin" | "clock" | "phone"; label: string; value: string }[];
}) {
  const iconMap = {
    pin: <PinIcon className="h-[1.15rem] w-[1.15rem]" />,
    clock: <ClockIcon className="h-[1.15rem] w-[1.15rem]" />,
    phone: <SparkIcon className="h-[1.15rem] w-[1.15rem]" />,
  };
  return (
    <dl className="mt-6 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex gap-4 rounded-2xl border border-[#c8a24a]/20 bg-gradient-to-br from-[#c8a24a]/8 to-transparent p-5"
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#c8a24a]/25 bg-[#17140f] text-[#e3c982]"
          >
            {iconMap[item.icon]}
          </span>
          <div className="min-w-0">
            <dt className="text-xs font-bold tracking-[0.14em] text-[#c8a24a]">
              {item.label}
            </dt>
            <dd className="mt-1.5 font-serif text-[1.05rem] leading-7 text-[#f2ece1]">
              {item.value}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
