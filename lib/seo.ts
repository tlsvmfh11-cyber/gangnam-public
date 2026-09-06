import type { Metadata } from "next";
import { absoluteUrl, getSiteUrl, schemaTelephone, siteConfig } from "@/lib/site";
import { defaultOgImage } from "@/lib/images";

type BuildMetaInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: { src: string; alt: string };
};

export function buildMetadata({
  title,
  description,
  path,
  ogImage = defaultOgImage,
}: BuildMetaInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = `${getSiteUrl()}${ogImage.src}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1536,
          height: 1024,
          alt: ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function breadcrumbList(
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * 업소 정보. 확인된 값(업소명·업종·주소·24시간·전화 연결)만 사용합니다.
 * 리뷰/별점이 없으므로 Review·AggregateRating은 생성하지 않습니다.
 */
export function localBusinessLd(): Record<string, unknown> {
  return {
    "@type": "NightClub",
    "@id": `${absoluteUrl("/")}#business`,
    name: siteConfig.name,
    description:
      "서울특별시 강남구 역삼동에 위치한 퍼블릭. 24시간 영업하며 예약·이용 문의는 전화로 연결됩니다.",
    url: absoluteUrl("/"),
    image: `${getSiteUrl()}${defaultOgImage.src}`,
    telephone: schemaTelephone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.streetAddress,
      addressLocality: siteConfig.region.district,
      addressRegion: siteConfig.region.city,
      addressCountry: "KR",
    },
    areaServed: [
      siteConfig.region.city,
      "강남",
      siteConfig.region.district,
      siteConfig.region.neighborhood,
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };
}

/** 페이지 단위 WebPage 노드 */
export function webPageLd({
  path,
  name,
  description,
  type = "WebPage",
}: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "ContactPage" | "CollectionPage" | "AboutPage";
}): Record<string, unknown> {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": `${absoluteUrl("/")}#website` },
    about: { "@id": `${absoluteUrl("/")}#business` },
    inLanguage: "ko-KR",
  };
}

/** FAQ 콘텐츠는 화면에 보이는 내용과 동일할 때만 사용합니다. */
export function faqPageLd(
  items: { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
