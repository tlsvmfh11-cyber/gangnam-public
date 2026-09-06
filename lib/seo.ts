import type { Metadata } from "next";
import { defaultOgImage, IMAGE_SIZE } from "@/lib/images";
import {
  absoluteUrl,
  contentUpdatedAt,
  getSiteUrl,
  mapsSearchUrl,
  schemaTelephone,
  siteConfig,
} from "@/lib/site";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

type BuildMetaInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: { src: string; alt: string; width?: number; height?: number };
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** 레이아웃 title 템플릿을 쓰지 않습니다. 홈처럼 키워드를 정확히 고정할 때 사용합니다. */
  titleAbsolute?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  ogImage = defaultOgImage,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  titleAbsolute = false,
}: BuildMetaInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = `${getSiteUrl()}${ogImage.src}`;
  const width = ogImage.width ?? IMAGE_SIZE.width;
  const height = ogImage.height ?? IMAGE_SIZE.height;

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords: [...keywords] } : {}),
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: imageUrl, width, height, alt: ogImage.alt }],
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? contentUpdatedAt,
          }
        : {}),
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
    alternateName: [siteConfig.alternateName],
    description:
      "강남 퍼블릭은 서울특별시 강남구 역삼동 604-11의 퍼블릭입니다. 24시간 영업하며 예약·이용 문의는 전화로 연결됩니다.",
    url: absoluteUrl("/"),
    mainEntityOfPage: absoluteUrl("/"),
    image: `${getSiteUrl()}${defaultOgImage.src}`,
    telephone: schemaTelephone,
    hasMap: mapsSearchUrl(),
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
    contactPoint: {
      "@type": "ContactPoint",
      telephone: schemaTelephone,
      contactType: "reservations",
      availableLanguage: ["Korean"],
      areaServed: "KR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...weekDays],
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
    ...(path === "/"
      ? { mainEntity: { "@id": `${absoluteUrl("/")}#business` } }
      : {}),
    inLanguage: "ko-KR",
    dateModified: contentUpdatedAt,
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
