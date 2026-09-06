import { callCta, telHref, type CallCtaKey } from "@/lib/site";

/**
 * 모바일 화면 하단 고정 전화 CTA.
 * 전화번호 숫자는 렌더하지 않고 tel 링크로만 연결합니다.
 * 높이는 globals.css의 --cta-bar 변수와 함께 본문 하단 여백으로 예약되어
 * 레이아웃 이동(CLS)이나 본문 가림이 생기지 않습니다.
 */
export function MobileCallCta({ variant = "default" }: { variant?: CallCtaKey }) {
  return (
    <div className="cta-bar md:hidden" role="region" aria-label="빠른 예약 문의">
      <a
        href={telHref()}
        aria-label={callCta.ariaLabel}
        className="flex min-h-[3rem] items-center justify-center gap-2 rounded-full bg-[#c8a24a] px-5 text-[0.95rem] font-bold text-[#17110a] shadow-lg shadow-black/40 active:bg-[#b6913f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0dfae]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-[1.15rem] w-[1.15rem] shrink-0"
          fill="currentColor"
        >
          <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.25 1z" />
        </svg>
        {callCta.label[variant]}
      </a>
    </div>
  );
}

/** 데스크톱/본문용 전화 CTA. 동일하게 숫자를 노출하지 않습니다. */
export function CallLink({
  variant = "default",
  className = "",
}: {
  variant?: CallCtaKey;
  className?: string;
}) {
  return (
    <a
      href={telHref()}
      aria-label={callCta.ariaLabel}
      className={
        className ||
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#c8a24a] px-5 text-sm font-bold text-[#17110a] hover:bg-[#d8b662] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f0dfae]"
      }
    >
      {callCta.label[variant]}
    </a>
  );
}
