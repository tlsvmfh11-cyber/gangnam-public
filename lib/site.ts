/**
 * 사이트 전역 설정. 업소명·주소·영업시간·전화번호는 이 파일에서만 관리하고
 * 화면/메타데이터/구조화 데이터는 모두 여기를 참조합니다.
 *
 * 전화번호 정책: 숫자를 화면에 렌더하지 않습니다.
 * `telHref()`(tel 링크)와 `schemaTelephone`(JSON-LD)에서만 사용합니다.
 */

const PHONE_DIGITS = "01023033778";

export const siteConfig = {
  name: "강남 퍼블릭",
  /** 붙여 쓰는 검색어. JSON-LD alternateName으로만 씁니다. */
  alternateName: "강남퍼블릭",
  shortName: "퍼블릭",
  category: "퍼블릭",
  categoryLong: "퍼블릭 / 룸",
  address: "서울특별시 강남구 역삼동 604-11",
  addressShort: "서울 강남구 역삼동 604-11",
  streetAddress: "역삼동 604-11",
  region: {
    city: "서울",
    district: "강남구",
    neighborhood: "역삼동",
  },
  hours: "24시간",
  /** schema.org openingHours 규격 */
  openingHoursSpecification: "Mo-Su 00:00-24:00",
  locale: "ko_KR",
  language: "ko",
  author: "강남 퍼블릭",
} as const;

/** JSON-LD용 국제 표기. tel 링크와 동일한 번호입니다. */
export const schemaTelephone = "+82-10-2303-3778";

/** 프로덕션 정규 도메인. Canonical / OG / sitemap / JSON-LD의 기준입니다. */
export const PRODUCTION_ORIGIN = "https://www.gnpublics.com";

/** Search Console HTML 태그 인증값. `<meta name="google-site-verification">`로 출력됩니다. */
export const googleSiteVerification =
  "gJIZPgjEJ8ueNroDyWpUcQD08zhqzD9Jmpr7FiFr7Tw";

/** 콘텐츠·사이트맵 lastmod. 페이지를 고칠 때 함께 올립니다. */
export const contentUpdatedAt = "2026-09-07";

/** 검색엔진·네이버용 검색 태그. 실제 페이지 주제와 맞는 단어만 넣습니다. */
export const searchKeywords = [
  "강남 퍼블릭",
  "역삼동 퍼블릭",
  "강남구 퍼블릭",
  "역삼 퍼블릭",
  "강남 퍼블릭 예약",
  "강남 퍼블릭 시스템",
  "강남 퍼블릭 가격",
  "퍼블릭 룸",
  "24시간 퍼블릭",
] as const;

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || PRODUCTION_ORIGIN;
  return normalizeSiteUrl(raw);
}

function normalizeSiteUrl(raw: string): string {
  try {
    const url = new URL(raw);
    if (url.hostname === "gnpublics.com") {
      url.hostname = "www.gnpublics.com";
    }
    return url.origin;
  } catch {
    return PRODUCTION_ORIGIN;
  }
}

/** 확인된 주소로 지도 검색. 위경도는 별도 실측값이 없어 넣지 않습니다. */
export function mapsSearchUrl(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.address,
  )}`;
}

/**
 * 정규 URL 생성기. Canonical / og:url / sitemap / JSON-LD가 모두 이 함수를 씁니다.
 * 루트는 Next가 canonical을 후행 슬래시 없이 정규화하므로 같은 형태(오리진)로 맞춥니다.
 */
export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? getSiteUrl() : `${getSiteUrl()}${normalized}`;
}

/** 화면에는 숫자를 노출하지 않고 링크로만 사용합니다. */
export function telHref(): string {
  return `tel:${PHONE_DIGITS}`;
}

export const navItems = [
  { href: "/", label: "소개" },
  { href: "/system", label: "시스템" },
  { href: "/price", label: "가격" },
  { href: "/contact", label: "예약" },
  { href: "/blog", label: "가이드" },
] as const;

/** 전화 CTA 문구. 숫자 없이 텍스트만 노출합니다. */
export const callCta = {
  ariaLabel: "전화로 예약 및 문의하기",
  label: {
    default: "예약 문의",
    home: "바로 예약 문의",
    system: "이용 문의",
    price: "예상 비용 문의",
    contact: "예약 상담 연결",
    blog: "예약 상담",
  },
} as const;

export type CallCtaKey = keyof typeof callCta.label;
