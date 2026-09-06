import Link from "next/link";
import { ArrowRightIcon, PhoneIcon } from "@/components/icons";
import { callCta, telHref, type CallCtaKey } from "@/lib/site";

type Cta = { href: string; label: string };

const solidBtn =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#d9b25c] to-[#b6913f] px-6 text-base font-bold text-[#17110a] shadow-lg shadow-black/30 transition-colors duration-200 hover:from-[#e3c982] hover:to-[#c8a24a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3c982]";

const ghostBtn =
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#c8a24a]/45 px-6 text-base font-medium text-[#e3c982] transition-colors duration-200 hover:border-[#c8a24a] hover:bg-[#c8a24a]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3c982]";

export function CtaBand({
  title,
  body,
  primary,
  secondary,
  call,
}: {
  title: string;
  body: string;
  primary?: Cta;
  secondary?: Cta;
  /** 지정하면 전화 연결 버튼을 함께 노출합니다. 번호는 화면에 표시하지 않습니다. */
  call?: CallCtaKey;
}) {
  return (
    <aside className="relative my-14 overflow-hidden rounded-3xl border border-[#c8a24a]/30 bg-gradient-to-br from-[#261f14] via-[#17130d] to-[#0e0c09] p-6 sm:p-9">
      {/* 우상단 앰버 글로우 — 배너를 본문과 시각적으로 분리합니다 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[#c8a24a]/12 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8a24a]/60 to-transparent"
      />

      <div className="relative">
        <h2 className="max-w-2xl font-serif text-[1.45rem] leading-snug text-[#f7f2e8] sm:text-[1.8rem]">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-8 text-[#c9c0b2]">{body}</p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {call ? (
            <a href={telHref()} aria-label={callCta.ariaLabel} className={solidBtn}>
              <PhoneIcon className="h-[1.05rem] w-[1.05rem]" />
              {callCta.label[call]}
            </a>
          ) : null}
          {primary ? (
            <Link href={primary.href} className={call ? ghostBtn : solidBtn}>
              {primary.label}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          ) : null}
          {secondary ? (
            <Link href={secondary.href} className={ghostBtn}>
              {secondary.label}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
