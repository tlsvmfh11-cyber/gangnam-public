import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleSections } from "@/components/article-sections";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContentImage } from "@/components/content-image";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { MobileCallCta } from "@/components/mobile-call-cta";
import { PageShell, Tldr } from "@/components/page-sections";
import { TableOfContents } from "@/components/table-of-contents";
import { articles, getAllArticleSlugs, getArticle } from "@/content/articles";
import { breadcrumbList, buildMetadata } from "@/lib/seo";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) {
    return { title: "글을 찾을 수 없습니다", robots: { index: false, follow: false } };
  }
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    ogImage: article.hero,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const url = absoluteUrl(`/blog/${article.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: article.h1,
        description: article.description,
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        inLanguage: "ko-KR",
        author: { "@type": "Organization", name: siteConfig.author },
        publisher: { "@id": `${absoluteUrl("/")}#business` },
        image: `${getSiteUrl()}${article.hero.src}`,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        isPartOf: { "@id": `${absoluteUrl("/")}#website` },
        url,
      },
      breadcrumbList([
        { name: "소개", path: "/" },
        { name: "가이드", path: "/blog" },
        { name: article.h1, path: `/blog/${article.slug}` },
      ]),
    ],
  };

  const others = articles.filter((item) => item.slug !== article.slug);

  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <article>
        <Breadcrumbs
          trail={[
            { href: "/", label: "소개" },
            { href: "/blog", label: "가이드" },
          ]}
          current={article.h1}
        />
        <h1 className="mt-2 font-serif text-[2rem] leading-tight sm:text-4xl">
          {article.h1}
        </h1>
        <p className="mt-3 text-sm text-[#a2988a]">
          <span>{siteConfig.author}</span>
          <span aria-hidden="true"> · </span>
          <span>
            게시{" "}
            <time dateTime={article.datePublished}>{article.datePublished}</time>
          </span>
          <span aria-hidden="true"> · </span>
          <span>
            수정 <time dateTime={article.dateModified}>{article.dateModified}</time>
          </span>
        </p>
        <Tldr text={article.description} />

        <TableOfContents
          items={article.sections.map((section) => ({
            id: section.id,
            title: section.title,
            level: section.level,
          }))}
        />

        <ContentImage
          src={article.hero.src}
          alt={article.hero.alt}
          priority
          sizes="(max-width: 767px) 100vw, 896px"
        />

        <ArticleSections sections={article.sections} />

        <nav
          aria-label="관련 안내"
          className="mt-12 rounded-2xl border border-white/10 p-5"
        >
          <h2 className="text-sm font-semibold text-[#e3c982]">
            이어서 확인할 페이지
          </h2>
          <ul className="mt-3 space-y-1">
            {article.related.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-[#f2ece1] underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-5 text-sm font-semibold text-[#e3c982]">다른 가이드</h2>
          <ul className="mt-3 space-y-1">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/blog/${item.slug}`}
                  className="inline-flex min-h-11 items-center text-[#cfc6b6] underline-offset-4 hover:text-[#f2ece1] hover:underline"
                >
                  {item.h1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <CtaBand
          title="확인이 필요한 항목이 있다면"
          body={`${siteConfig.address} · ${siteConfig.hours} 영업. 실제 금액과 룸 구성, 차량 관련 정책은 문의에서 확인하실 수 있습니다.`}
          call="blog"
          primary={{ href: "/contact", label: "예약·위치 안내" }}
        />
      </article>
      <MobileCallCta variant="blog" />
    </PageShell>
  );
}
