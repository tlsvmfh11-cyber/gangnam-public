import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { defaultOgImage } from "@/lib/images";
import {
  absoluteUrl,
  getSiteUrl,
  googleSiteVerification,
  searchKeywords,
  siteConfig,
} from "@/lib/site";
import { localBusinessLd } from "@/lib/seo";
import "./globals.css";

const sans = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteConfig.name} | 역삼동 퍼블릭 24시간 영업`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "강남 퍼블릭은 서울특별시 강남구 역삼동 604-11에서 24시간 영업하는 퍼블릭입니다. 룸에 앉아 이용하는 형태와 초이스, 비용 구성, 예약 문의 방법을 확인된 정보만으로 안내합니다. 검색에 같이 나오는 다른 상호·다른 주소의 업소와는 구분해서 보시면 되고, 실제 금액과 룸 구성은 인원과 시간대를 알려 주시면 전화로 확인하실 수 있습니다.",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  keywords: [...searchKeywords],
  verification: {
    google: googleSiteVerification,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    images: [
      {
        url: defaultOgImage.src,
        width: defaultOgImage.width,
        height: defaultOgImage.height,
        alt: defaultOgImage.alt,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
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
};

export const viewport: Viewport = {
  themeColor: "#0c0b0a",
  colorScheme: "dark",
};

const siteLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      url: absoluteUrl("/"),
      name: siteConfig.name,
      alternateName: siteConfig.alternateName,
      description:
        "강남 퍼블릭 안내. 서울 강남구 역삼동 604-11, 24시간 영업. 시스템·초이스·비용 구성·예약.",
      inLanguage: "ko-KR",
      about: { "@id": `${absoluteUrl("/")}#business` },
      publisher: { "@id": `${absoluteUrl("/")}#business` },
    },
    localBusinessLd(),
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${sans.variable} ${serif.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-[#0c0b0a] font-sans text-[#f2ece1] antialiased">
        <JsonLd data={siteLd} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[#c8a24a] focus:px-4 focus:py-2 focus:font-semibold focus:text-[#17110a]"
        >
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
