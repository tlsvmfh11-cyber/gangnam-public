import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd } from "@/components/json-ld";
import { defaultOgImage } from "@/lib/images";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/site";
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
    default: `${siteConfig.name} | 역삼동 퍼블릭 24시간`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "서울특별시 강남구 역삼동의 퍼블릭. 24시간 영업. 퍼블릭 시스템과 초이스, 비용 구성, 예약 방법을 확인된 정보 기준으로 안내합니다.",
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  keywords: [
    siteConfig.name,
    "퍼블릭",
    "역삼동 퍼블릭",
    "강남 퍼블릭 시스템",
    "강남 퍼블릭 예약",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    images: [
      {
        url: defaultOgImage.src,
        width: 1536,
        height: 1024,
        alt: defaultOgImage.alt,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
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
      inLanguage: "ko-KR",
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
