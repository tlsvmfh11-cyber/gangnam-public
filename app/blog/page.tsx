import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArrowRightIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { MobileCallCta } from "@/components/mobile-call-cta";
import { PageShell, Tldr } from "@/components/page-sections";
import { articles } from "@/content/articles";
import { images } from "@/lib/images";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbList, buildMetadata, webPageLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "강남 퍼블릭 가이드 | 첫 방문·업종 차이·역삼동·용어",
  description:
    "강남 퍼블릭 가이드는 코어 페이지에 넣지 않은 질문만 다룹니다. 처음 방문 전에 정해 둘 것과 챙길 것, 퍼블릭과 하이퍼블릭이 초이스·비용대에서 어떻게 다른지, 역삼동에서 지번 주소로 위치를 특정하는 방법, 초이스·체인지·주대·TC 같은 용어의 뜻을 글마다 하나씩 정리했습니다.",
  path: "/blog",
  ogImage: images.roomStyles,
  titleAbsolute: true,
  keywords: [
    "퍼블릭 가이드",
    "퍼블릭 처음 방문",
    "퍼블릭 하이퍼블릭 차이",
    "퍼블릭 용어",
  ],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageLd({
      path: "/blog",
      name: "강남 퍼블릭 인사이트 & 가이드",
      description:
        "퍼블릭 처음 방문, 업종 비교, 역삼동 지역 정보, 용어 정리를 다루는 콘텐츠 허브.",
      type: "CollectionPage",
    }),
    {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/blog/${article.slug}`),
        name: article.h1,
      })),
    },
    breadcrumbList([
      { name: "소개", path: "/" },
      { name: "가이드", path: "/blog" },
    ]),
  ],
};

const corePages = [
  { href: "/system", label: "시스템 안내" },
  { href: "/price", label: "비용 구성" },
  { href: "/contact", label: "예약·위치" },
];

export default function BlogIndexPage() {
  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <header>
        <Breadcrumbs trail={[{ href: "/", label: "소개" }]} current="가이드" />
        <p className="mt-2 text-sm tracking-[0.15em] text-[#c8a24a]">콘텐츠 허브</p>
        <h1 className="mt-2 font-serif text-[2.1rem] leading-tight sm:text-5xl">
          강남 퍼블릭 인사이트 &amp; 가이드
        </h1>
        <Tldr text="코어 페이지가 업소와 이용 순서, 비용, 예약을 담당하고, 이 허브는 그 네 가지에 들어가지 않는 질문만 다룹니다. 방문 준비와 상황별 대처, 업종 이름의 차이, 역삼동이라는 지역 조건, 그리고 설명 없이 쓰이는 용어를 글마다 하나씩 맡았습니다." />
      </header>

      <ul className="mt-10 grid gap-6">
        {articles.map((article) => (
          <li key={article.slug}>
            <article className="group card-sheen overflow-hidden rounded-3xl border border-white/8 transition-colors duration-200 hover:border-[#c8a24a]/40">
              <Link
                href={`/blog/${article.slug}`}
                className="grid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3c982] sm:grid-cols-[260px_1fr]"
              >
                <div className="relative aspect-[3/2] overflow-hidden sm:aspect-auto sm:min-h-[210px]">
                  <Image
                    src={article.hero.src}
                    alt={article.hero.alt}
                    fill
                    quality={90}
                    sizes="(max-width: 639px) 100vw, 260px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-r from-transparent to-[#17140f]/70 sm:to-[#17140f]"
                  />
                </div>
                <div className="p-5 sm:p-7">
                  <p className="inline-flex items-center gap-1.5 rounded-full border border-[#c8a24a]/25 bg-[#c8a24a]/8 px-2.5 py-1 text-[0.7rem] font-bold tracking-[0.1em] text-[#e3c982]">
                    {article.intent}
                  </p>
                  <h2 className="mt-3 font-serif text-xl leading-snug text-[#f7f2e8] sm:text-[1.6rem]">
                    {article.h1}
                  </h2>
                  <p className="mt-3 text-[0.97rem] leading-8 text-[#bcb2a4]">
                    {article.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#e3c982]">
                    자세히 보기
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>

      <nav aria-label="코어 페이지" className="mt-14">
        <h2 className="text-[0.8rem] font-bold tracking-[0.14em] text-[#e3c982]">
          코어 페이지로 이동
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {corePages.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="card-sheen group flex min-h-11 items-center justify-between gap-3 rounded-2xl border border-white/8 px-5 py-4 transition-colors duration-200 hover:border-[#c8a24a]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3c982]"
              >
                <span className="font-serif text-[1.05rem] text-[#f2ece1]">
                  {item.label}
                </span>
                <ArrowRightIcon className="h-4 w-4 shrink-0 text-[#c8a24a] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <MobileCallCta variant="blog" />
    </PageShell>
  );
}
