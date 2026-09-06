import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import {
  ArrowRightIcon,
  ClockIcon,
  PhoneIcon,
  PinIcon,
  SofaIcon,
} from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { MobileCallCta } from "@/components/mobile-call-cta";
import { PageSections, PageShell, Tldr } from "@/components/page-sections";
import { TableOfContents } from "@/components/table-of-contents";
import { homeFaqs } from "@/content/faqs";
import { homeSections, homeTldr } from "@/content/pages";
import { articles } from "@/content/articles";
import { images } from "@/lib/images";
import { breadcrumbList, buildMetadata, faqPageLd, webPageLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "강남 퍼블릭 소개 | 역삼동 퍼블릭 24시간 영업",
  description:
    "강남 퍼블릭은 서울특별시 강남구 역삼동 604-11의 퍼블릭입니다. 퍼블릭이 어떤 형태인지, 이용 흐름과 초이스, 비용 구성과 예약 방법을 확인된 정보 기준으로 정리했습니다.",
  path: "/",
  ogImage: images.hero,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageLd({
      path: "/",
      name: "강남 퍼블릭 소개",
      description:
        "역삼동 퍼블릭 강남 퍼블릭 소개. 업종 설명, 이용 흐름, 초이스, 비용 구성, 24시간 영업과 예약 안내.",
    }),
    breadcrumbList([{ name: "강남 퍼블릭 소개", path: "/" }]),
    faqPageLd(homeFaqs),
  ],
};

const quickFacts = [
  { icon: <SofaIcon className="h-[1.1rem] w-[1.1rem]" />, label: "업종", value: siteConfig.category },
  { icon: <PinIcon className="h-[1.1rem] w-[1.1rem]" />, label: "주소", value: siteConfig.address },
  {
    icon: <ClockIcon className="h-[1.1rem] w-[1.1rem]" />,
    label: "영업시간",
    value: `${siteConfig.hours} 영업`,
  },
  { icon: <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />, label: "예약", value: "전화 문의로 진행" },
];

export default function HomePage() {
  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <article>
        <header className="hero-wash -mx-4 rounded-none px-4 pb-10 sm:-mx-6 sm:rounded-3xl sm:px-6 sm:pt-2">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="flex flex-wrap items-center gap-2">
                {[
                  siteConfig.region.neighborhood,
                  siteConfig.category,
                  siteConfig.hours,
                ].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[#c8a24a]/30 bg-[#c8a24a]/8 px-3 py-1 text-xs font-semibold tracking-[0.1em] text-[#e3c982]"
                  >
                    {chip}
                  </span>
                ))}
              </p>
              <h1 className="mt-4 font-serif text-[2.1rem] leading-tight text-[#f7f2e8] sm:text-[3.1rem]">
                강남 퍼블릭 소개
              </h1>
              <Tldr text={homeTldr} />
            </div>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-[#17140f] ring-1 ring-[#c8a24a]/20">
              <Image
                src={images.hero.src}
                alt={images.hero.alt}
                fill
                priority
                fetchPriority="high"
                quality={90}
                sizes="(max-width: 1023px) 100vw, 540px"
                className="object-cover object-center"
              />
              {/* 이미지 위 텍스트가 없어도 하단을 어둡게 눌러 카드 경계를 살립니다 */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0c0b0a]/55 via-transparent to-transparent"
              />
            </div>
          </div>
        </header>

        <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="card-sheen flex items-start gap-3.5 rounded-2xl border border-[#c8a24a]/20 p-4"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#c8a24a]/25 bg-[#c8a24a]/10 text-[#e3c982]"
              >
                {fact.icon}
              </span>
              <div className="min-w-0">
                <dt className="text-[0.7rem] font-bold tracking-[0.15em] text-[#c8a24a]">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-[0.95rem] leading-7 text-[#f2ece1]">
                  {fact.value}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        <TableOfContents
          items={homeSections.map((section) => ({
            id: section.id,
            title: section.title,
            level: section.level,
          }))}
        />

        <PageSections sections={homeSections} />

        <CtaBand
          title="이용 순서와 초이스가 궁금하면"
          body="입장부터 정산까지 여섯 단계와 초이스 진행 방식, 체인지 기준을 시스템 페이지에 단계별로 정리했습니다."
          primary={{ href: "/system", label: "시스템 안내 보기" }}
          secondary={{ href: "/price", label: "비용 구성 확인" }}
        />

        <section aria-labelledby="home-faq">
          <h2
            id="home-faq"
            className="scroll-mt-24 font-serif text-2xl text-[#f2ece1] sm:text-3xl"
          >
            자주 묻는 질문
          </h2>
          <p className="mt-3 mb-6 text-base leading-8 text-[#d9d1c4]">
            홈에서는 업소와 업종에 관한 질문만 둡니다. 이용 순서는{" "}
            <Link
              href="/system"
              className="text-[#e3c982] underline-offset-4 hover:underline"
            >
              시스템 FAQ
            </Link>
            , 비용은{" "}
            <Link
              href="/price"
              className="text-[#e3c982] underline-offset-4 hover:underline"
            >
              가격 FAQ
            </Link>
            , 예약과 위치는{" "}
            <Link
              href="/contact"
              className="text-[#e3c982] underline-offset-4 hover:underline"
            >
              예약 FAQ
            </Link>
            에 있습니다.
          </p>
          <FaqList items={homeFaqs} />
        </section>

        <section aria-labelledby="home-guides" className="mt-14">
          <h2
            id="home-guides"
            className="scroll-mt-24 font-serif text-2xl text-[#f2ece1] sm:text-3xl"
          >
            가이드에서 이어서 보기
          </h2>
          <p className="mt-3 text-base leading-8 text-[#d9d1c4]">
            코어 페이지에서 다루지 않는 질문을 주제별로 나눠 두었습니다.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {articles.map((article, i) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="card-sheen group flex h-full min-h-11 flex-col rounded-2xl border border-white/8 p-5 transition-colors duration-200 hover:border-[#c8a24a]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3c982]"
                >
                  <span
                    aria-hidden="true"
                    className="font-serif text-xs font-bold tracking-[0.2em] text-[#c8a24a]/70"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 font-serif text-[1.15rem] leading-snug text-[#f2ece1]">
                    {article.h1}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-7 text-[#a99f90]">
                    {article.intent}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#e3c982]">
                    읽어 보기
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <CtaBand
          title="방문 시간을 정했다면"
          body={`${siteConfig.address} · ${siteConfig.hours} 영업. 인원과 도착 시간, 예상 체류 시간을 말하면 총액을 한 번에 확인할 수 있습니다.`}
          call="home"
          primary={{ href: "/contact", label: "예약·위치 안내" }}
        />
      </article>
      <MobileCallCta variant="home" />
    </PageShell>
  );
}
