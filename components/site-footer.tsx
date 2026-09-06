import Link from "next/link";
import { imageDisclaimer } from "@/lib/images";
import { callCta, navItems, siteConfig, telHref } from "@/lib/site";

const guideLinks = [
  { href: "/system", label: "퍼블릭 시스템과 초이스" },
  { href: "/price", label: "비용 구성과 문의 방법" },
  { href: "/contact", label: "예약·주소·영업시간" },
  { href: "/blog/public-first-visit-checklist", label: "처음 방문 체크리스트" },
  { href: "/blog/public-terms-glossary", label: "퍼블릭 용어 정리" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#080807]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl text-[#f2ece1]">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-[#c8a24a]">{siteConfig.category}</p>
          <address className="mt-4 text-sm not-italic leading-7 text-[#cfc6b6]">
            {siteConfig.address}
            <br />
            영업시간 {siteConfig.hours}
          </address>
          <a
            href={telHref()}
            aria-label={callCta.ariaLabel}
            className="mt-4 inline-flex min-h-11 items-center rounded-full border border-[#c8a24a]/50 px-4 text-sm font-semibold text-[#e3c982] hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3c982]"
          >
            {callCta.label.default}
          </a>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[#e3c982]">바로가기</h2>
          <ul className="mt-3 space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-[#cfc6b6] hover:text-[#f2ece1]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[#e3c982]">이용 안내</h2>
          <ul className="mt-3 space-y-1">
            {guideLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-[#cfc6b6] hover:text-[#f2ece1]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-5 text-center">
        <p className="text-xs leading-6 text-[#a2988a]">
          {siteConfig.name} · {siteConfig.category} · {siteConfig.address} ·{" "}
          {siteConfig.hours} 영업
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-xs leading-6 text-[#8b8177]">
          {imageDisclaimer} 실제 금액과 룸 구성, 주류, 차량 관련 정책은 예약 문의에서
          확인해 주세요. 이 사이트는 미성년자 이용이 불가하며 불법 서비스를 안내하지
          않습니다.
        </p>
      </div>
    </footer>
  );
}
