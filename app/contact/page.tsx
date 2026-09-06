import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { ArrowRightIcon, ClockIcon, PinIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { CallLink, MobileCallCta } from "@/components/mobile-call-cta";
import { PageSections, PageShell, Tldr } from "@/components/page-sections";
import { TableOfContents } from "@/components/table-of-contents";
import { contactFaqs } from "@/content/faqs";
import { contactSections, contactTldr } from "@/content/pages";
import { images } from "@/lib/images";
import {
  breadcrumbList,
  buildMetadata,
  faqPageLd,
  localBusinessLd,
  webPageLd,
} from "@/lib/seo";
import { mapsSearchUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "강남 퍼블릭 예약 | 역삼동 604-11 · 24시간",
  description:
    "강남 퍼블릭 예약은 전화 문의로 진행합니다. 주소는 서울특별시 강남구 역삼동 604-11이고 영업시간은 24시간이므로 심야와 이른 시간에도 문의할 수 있습니다. 방문 날짜, 도착 시간, 인원, 처음 방문 여부, 예산 범위를 정리해 두면 통화가 짧아집니다. 1인 방문과 위치, 차량 관련 항목도 같은 번호로 확인하시면 됩니다.",
  path: "/contact",
  ogImage: images.og,
  titleAbsolute: true,
  keywords: [
    "강남 퍼블릭 예약",
    "역삼동 퍼블릭 위치",
    "강남 퍼블릭 영업시간",
    "강남 퍼블릭 문의",
  ],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageLd({
      path: "/contact",
      name: "강남 퍼블릭 예약",
      description:
        "강남 퍼블릭 예약 방법, 예약 전 확인사항, 주소와 위치, 24시간 영업, 이용 문의.",
      type: "ContactPage",
    }),
    localBusinessLd(),
    breadcrumbList([
      { name: "소개", path: "/" },
      { name: "예약", path: "/contact" },
    ]),
    faqPageLd(contactFaqs),
  ],
};

const mapHref = mapsSearchUrl();

export default function ContactPage() {
  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <article>
        <Breadcrumbs trail={[{ href: "/", label: "소개" }]} current="예약" />
        <p className="mt-2 text-sm tracking-[0.15em] text-[#c8a24a]">예약 · 위치</p>
        <h1 className="mt-2 font-serif text-[2.1rem] leading-tight sm:text-5xl">
          강남 퍼블릭 예약
        </h1>
        <Tldr text={contactTldr} />

        <section
          aria-labelledby="contact-info"
          className="my-9 overflow-hidden rounded-3xl border border-[#c8a24a]/25 bg-gradient-to-b from-[#1e1811] to-[#141009] p-5 sm:p-7"
        >
          <h2 id="contact-info" className="sr-only">
            업소 정보 요약
          </h2>
          <dl className="grid gap-6 sm:grid-cols-2">
            <div className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#c8a24a]/25 bg-[#c8a24a]/10 text-[#e3c982]"
              >
                <PinIcon className="h-[1.15rem] w-[1.15rem]" />
              </span>
              <div className="min-w-0">
                <dt className="text-[0.7rem] font-bold tracking-[0.15em] text-[#c8a24a]">
                  주소
                </dt>
                <dd className="mt-1.5">
                  <address className="font-serif text-[1.05rem] not-italic leading-7 text-[#f2ece1]">
                    {siteConfig.address}
                  </address>
                  <a
                    className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm text-[#e3c982] underline-offset-4 hover:underline"
                    href={mapHref}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    지도에서 주소 검색
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#c8a24a]/25 bg-[#c8a24a]/10 text-[#e3c982]"
              >
                <ClockIcon className="h-[1.15rem] w-[1.15rem]" />
              </span>
              <div className="min-w-0">
                <dt className="text-[0.7rem] font-bold tracking-[0.15em] text-[#c8a24a]">
                  영업시간
                </dt>
                <dd className="mt-1.5 font-serif text-[1.05rem] leading-7 text-[#f2ece1]">
                  {siteConfig.hours} 영업
                  <span className="mt-1 block font-sans text-sm text-[#a2988a]">
                    시간대 제약 없이 문의할 수 있습니다.
                  </span>
                </dd>
              </div>
            </div>
            <div className="border-t border-white/8 pt-6 sm:col-span-2">
              <dt className="text-[0.7rem] font-bold tracking-[0.15em] text-[#c8a24a]">
                예약·이용 문의
              </dt>
              <dd className="mt-3">
                <CallLink variant="contact" />
                <p className="mt-3 text-sm leading-7 text-[#a2988a]">
                  버튼을 누르면 바로 연결됩니다. 인원과 도착 시간, 예상 체류 시간을
                  먼저 말씀해 주시면 총액까지 한 번에 확인할 수 있습니다.
                </p>
              </dd>
            </div>
          </dl>
        </section>

        <TableOfContents
          items={[
            ...contactSections.map((section) => ({
              id: section.id,
              title: section.title,
              level: section.level,
            })),
            { id: "contact-faq", title: "자주 묻는 질문", level: 2 as const },
          ]}
        />

        <PageSections sections={contactSections} />

        <section aria-labelledby="contact-faq" className="mt-12">
          <h2
            id="contact-faq"
            className="scroll-mt-24 font-serif text-2xl sm:text-3xl"
          >
            자주 묻는 질문
          </h2>
          <p className="mt-3 mb-6 text-base leading-8 text-[#d9d1c4]">
            이용 순서는{" "}
            <Link
              href="/system"
              className="text-[#e3c982] underline-offset-4 hover:underline"
            >
              시스템 안내
            </Link>
            , 비용 구성은{" "}
            <Link
              href="/price"
              className="text-[#e3c982] underline-offset-4 hover:underline"
            >
              가격 페이지
            </Link>
            , 방문 준비는{" "}
            <Link
              href="/blog/public-first-visit-checklist"
              className="text-[#e3c982] underline-offset-4 hover:underline"
            >
              처음 방문 체크리스트
            </Link>
            를 보세요.
          </p>
          <FaqList items={contactFaqs} />
        </section>

        <p className="mt-10 text-base leading-8 text-[#d9d1c4]">
          역삼동에서 위치를 특정하는 방법과 시간대별 방문 계획은{" "}
          <Link
            href="/blog/yeoksam-public-area-guide"
            className="text-[#e3c982] underline-offset-4 hover:underline"
          >
            역삼동 퍼블릭 지역 가이드
          </Link>
          에 정리해 두었습니다.
        </p>

        <CtaBand
          title="바로 문의하시려면"
          body={`${siteConfig.address} · ${siteConfig.hours} 영업. 처음 방문이거나 1인 방문이면 그 점을 먼저 말씀해 주세요.`}
          call="contact"
          primary={{ href: "/system", label: "이용 순서 보기" }}
        />
      </article>
      <MobileCallCta variant="contact" />
    </PageShell>
  );
}
