import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { MobileCallCta } from "@/components/mobile-call-cta";
import { PageSections, PageShell, Tldr } from "@/components/page-sections";
import { TableOfContents } from "@/components/table-of-contents";
import { systemFaqs } from "@/content/faqs";
import { systemSections, systemTldr } from "@/content/pages";
import { images } from "@/lib/images";
import { breadcrumbList, buildMetadata, faqPageLd, webPageLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "강남 퍼블릭 시스템 | 이용 순서와 초이스 안내",
  description:
    "강남 퍼블릭 이용 순서를 예약 문의, 입장, 룸 안내, 초이스, 룸타임, 정산까지 여섯 단계로 정리했습니다. 초이스와 체인지가 어떻게 진행되는지, 처음 방문과 1인·여러 명 방문에서 무엇을 확인하면 되는지를 업종 일반 기준으로 풀어 썼습니다. 이 업소의 확정 운영 방식과 조건은 예약 문의에서 확인하시면 됩니다.",
  path: "/system",
  ogImage: images.hero,
  titleAbsolute: true,
  keywords: [
    "강남 퍼블릭 시스템",
    "퍼블릭 초이스",
    "퍼블릭 이용 순서",
    "강남 퍼블릭 체인지",
  ],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageLd({
      path: "/system",
      name: "강남 퍼블릭 시스템",
      description:
        "퍼블릭 시스템의 기본 개념, 이용 순서 여섯 단계, 초이스와 체인지, 1인·여러 명 방문, 이용 전 체크사항.",
    }),
    breadcrumbList([
      { name: "소개", path: "/" },
      { name: "시스템", path: "/system" },
    ]),
    faqPageLd(systemFaqs),
  ],
};

export default function SystemPage() {
  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <article>
        <Breadcrumbs trail={[{ href: "/", label: "소개" }]} current="시스템" />
        <p className="mt-2 text-sm tracking-[0.15em] text-[#c8a24a]">이용방법</p>
        <h1 className="mt-2 font-serif text-[2.1rem] leading-tight sm:text-5xl">
          강남 퍼블릭 시스템
        </h1>
        <Tldr text={systemTldr} />

        <TableOfContents
          items={systemSections.map((section) => ({
            id: section.id,
            title: section.title,
            level: section.level,
          }))}
        />

        <PageSections sections={systemSections} />

        <section aria-labelledby="system-faq" className="mt-12">
          <h2
            id="system-faq"
            className="scroll-mt-24 font-serif text-2xl sm:text-3xl"
          >
            시스템 관련 자주 묻는 질문
          </h2>
          <p className="mt-3 mb-6 text-base leading-8 text-[#d9d1c4]">
            비용 관련 질문은{" "}
            <Link
              href="/price"
              className="text-[#e3c982] underline-offset-4 hover:underline"
            >
              가격 페이지
            </Link>
            , 예약과 위치는{" "}
            <Link
              href="/contact"
              className="text-[#e3c982] underline-offset-4 hover:underline"
            >
              예약 페이지
            </Link>
            에 있습니다.
          </p>
          <FaqList items={systemFaqs} />
        </section>

        <p className="mt-10 text-base leading-8 text-[#d9d1c4]">
          방문 전 준비 항목과 상황별 대처는{" "}
          <Link
            href="/blog/public-first-visit-checklist"
            className="text-[#e3c982] underline-offset-4 hover:underline"
          >
            퍼블릭 처음 방문 체크리스트
          </Link>
          에, 업종 이름의 차이는{" "}
          <Link
            href="/blog/public-vs-hyperpublic-difference"
            className="text-[#e3c982] underline-offset-4 hover:underline"
          >
            퍼블릭과 하이퍼블릭 차이
          </Link>
          에, 설명 없이 쓰이는 말은{" "}
          <Link
            href="/blog/public-terms-glossary"
            className="text-[#e3c982] underline-offset-4 hover:underline"
          >
            퍼블릭 용어 정리
          </Link>
          에 따로 정리했습니다.
        </p>

        <CtaBand
          title="진행 방식을 바로 확인하고 싶다면"
          body="초이스 단계와 체인지 기준, 기본 룸타임처럼 업소별로 다른 항목은 문의에서 바로 확인하실 수 있습니다. 24시간 문의가 가능합니다."
          call="system"
          primary={{ href: "/price", label: "비용 구성 보기" }}
        />
      </article>
      <MobileCallCta variant="system" />
    </PageShell>
  );
}
