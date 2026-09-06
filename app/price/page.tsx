import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { TagIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { MobileCallCta } from "@/components/mobile-call-cta";
import { PageSections, PageShell, Tldr } from "@/components/page-sections";
import { TableOfContents } from "@/components/table-of-contents";
import { priceFaqs } from "@/content/faqs";
import { priceSections, priceSummaryItems, priceTldr } from "@/content/pages";
import { images } from "@/lib/images";
import { breadcrumbList, buildMetadata, faqPageLd, webPageLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "강남 퍼블릭 가격 | 비용 구성과 총액 확인 방법",
  description:
    "강남 퍼블릭 비용이 룸비·주대·TC로 어떻게 구성되는지, 총액을 바꾸는 변수는 무엇인지, 예약 문의에서 무엇을 물어보면 총액이 한 번에 확인되는지 정리했습니다.",
  path: "/price",
  ogImage: images.drinkSetup,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageLd({
      path: "/price",
      name: "강남 퍼블릭 가격",
      description:
        "퍼블릭 비용 구성 항목(룸비·주대·TC), 총액을 바꾸는 변수, 예약 문의에서 확인할 질문.",
    }),
    breadcrumbList([
      { name: "소개", path: "/" },
      { name: "가격", path: "/price" },
    ]),
    faqPageLd(priceFaqs),
  ],
};

export default function PricePage() {
  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <article>
        <Breadcrumbs trail={[{ href: "/", label: "소개" }]} current="가격" />
        <p className="mt-2 text-sm tracking-[0.15em] text-[#c8a24a]">비용 안내</p>
        <h1 className="mt-2 font-serif text-[2.1rem] leading-tight sm:text-5xl">
          강남 퍼블릭 가격
        </h1>
        <Tldr text={priceTldr} />

        {/*
          가격 정보 요약 패널.
          라벨과 값의 쌍이므로 heading이 아니라 dl로 표현합니다.
          본문 섹션 제목과 문구가 겹치지 않도록 별도 제목을 씁니다.
        */}
        <section
          aria-labelledby="price-summary"
          className="my-9 overflow-hidden rounded-3xl border border-[#c8a24a]/25 bg-gradient-to-b from-[#1e1811] to-[#141009]"
        >
          <h2
            id="price-summary"
            className="flex items-center gap-2.5 border-b border-[#c8a24a]/15 px-5 py-3.5 text-[0.8rem] font-bold tracking-[0.14em] text-[#e3c982]"
          >
            <TagIcon className="h-4 w-4" />
            가격 정보 한눈에
          </h2>
          <dl className="grid gap-px bg-white/8 sm:grid-cols-2">
            {priceSummaryItems.map((item) => (
              <div key={item.title} className="bg-[#17130d] p-5">
                <dt className="text-[0.7rem] font-bold tracking-[0.14em] text-[#c8a24a]">
                  {item.title}
                </dt>
                <dd className="mt-2 text-[0.97rem] leading-7 text-[#ded6c8]">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <TableOfContents
          items={priceSections.map((section) => ({
            id: section.id,
            title: section.title,
            level: section.level,
          }))}
        />

        <PageSections sections={priceSections} />

        <section aria-labelledby="price-faq" className="mt-12">
          <h2
            id="price-faq"
            className="scroll-mt-24 font-serif text-2xl sm:text-3xl"
          >
            비용 관련 자주 묻는 질문
          </h2>
          <p className="mt-3 mb-6 text-base leading-8 text-[#d9d1c4]">
            이용 순서는{" "}
            <Link
              href="/system"
              className="text-[#e3c982] underline-offset-4 hover:underline"
            >
              시스템 안내
            </Link>
            , 예약 절차는{" "}
            <Link
              href="/contact"
              className="text-[#e3c982] underline-offset-4 hover:underline"
            >
              예약 페이지
            </Link>
            를 보세요.
          </p>
          <FaqList items={priceFaqs} />
        </section>

        <p className="mt-10 text-base leading-8 text-[#d9d1c4]">
          비용 용어의 뜻이 헷갈리면{" "}
          <Link
            href="/blog/public-terms-glossary"
            className="text-[#e3c982] underline-offset-4 hover:underline"
          >
            퍼블릭 용어 정리
          </Link>
          를, 여러 곳을 같은 기준으로 비교하는 방법은{" "}
          <Link
            href="/blog/yeoksam-public-area-guide"
            className="text-[#e3c982] underline-offset-4 hover:underline"
          >
            역삼동 퍼블릭 지역 가이드
          </Link>
          를 보시면 됩니다.
        </p>

        <CtaBand
          title="총액을 확인하려면"
          body="인원과 도착 시간, 예상 체류 시간을 말하고 다 합친 금액과 추가 항목 여부를 물어보시면 됩니다. 24시간 문의가 가능합니다."
          call="price"
          primary={{ href: "/contact", label: "예약 전 확인사항" }}
        />
      </article>
      <MobileCallCta variant="price" />
    </PageShell>
  );
}
