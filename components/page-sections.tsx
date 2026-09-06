import type { PageSection } from "@/content/pages";
import { ContentImage } from "@/components/content-image";
import {
  AskList,
  Callout,
  Checklist,
  CompareTable,
  CostItems,
  FactorTiles,
  InfoTiles,
  MythFactList,
  StepFlow,
  TermGrid,
  TierCards,
} from "@/components/section-blocks";
import { SparkIcon } from "@/components/icons";

function SectionBlockView({ block }: { block: NonNullable<PageSection["block"]> }) {
  switch (block.kind) {
    case "steps":
      return <StepFlow items={block.items} />;
    case "tiers":
      return <TierCards items={block.items} />;
    case "compare":
      return (
        <CompareTable
          columns={block.columns}
          rows={block.rows}
          caption={block.caption}
        />
      );
    case "checklist":
      return <Checklist items={block.items} />;
    case "ask":
      return <AskList items={block.items} />;
    case "myths":
      return <MythFactList items={block.items} />;
    case "terms":
      return <TermGrid items={block.items} />;
    case "costs":
      return <CostItems items={block.items} />;
    case "factors":
      return <FactorTiles items={block.items} />;
    case "info":
      return <InfoTiles items={block.items} />;
    case "callout":
      return (
        <Callout tone={block.tone} title={block.title}>
          {block.text}
        </Callout>
      );
  }
}

export function PageSections({ sections }: { sections: PageSection[] }) {
  return (
    <div>
      {sections.map((section, index) => {
        const Heading = section.level === 2 ? "h2" : "h3";
        const isTop = section.level === 2;

        return (
          <section
            key={section.id}
            aria-labelledby={section.id}
            className={isTop ? "section-block" : "mt-10"}
          >
            {isTop && index > 0 ? (
              <div aria-hidden="true" className="section-rule" />
            ) : null}

            <Heading
              id={section.id}
              className={
                isTop
                  ? "scroll-mt-24 font-serif text-[1.6rem] leading-snug text-[#f2ece1] sm:text-[2rem]"
                  : "scroll-mt-24 flex items-center gap-2.5 font-serif text-[1.3rem] leading-snug text-[#e9dfcc] sm:text-[1.5rem]"
              }
            >
              {!isTop ? (
                <SparkIcon className="h-[0.9rem] w-[0.9rem] shrink-0 text-[#c8a24a]" />
              ) : null}
              {section.title}
            </Heading>

            {section.paragraphs.map((paragraph, pIndex) => (
              <div key={paragraph.slice(0, 32)}>
                <p
                  className={
                    isTop && pIndex === 0
                      ? "mt-4 text-[1.05rem] leading-8 text-[#e2dacd] sm:text-[1.12rem] sm:leading-9"
                      : "mt-4 text-base leading-8 text-[#c9c0b2] sm:text-[1.03rem]"
                  }
                >
                  {paragraph}
                </p>
                {/* 첫 문단을 읽은 뒤에 이미지가 오도록 배치합니다 */}
                {section.image && pIndex === 0 ? (
                  <ContentImage
                    src={section.image.src}
                    alt={section.image.alt}
                    sizes="(max-width: 767px) 100vw, 720px"
                    caption={section.imageCaption}
                  />
                ) : null}
              </div>
            ))}

            {section.block ? <SectionBlockView block={section.block} /> : null}

            {section.bullets ? (
              <ul className="mt-6 space-y-2 rounded-2xl border border-white/8 bg-[#191510]/70 p-5">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 text-[0.97rem] leading-7 text-[#cec5b7]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#c8a24a]"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="main-content"
      className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pt-12"
    >
      {children}
    </main>
  );
}

export function Tldr({ text }: { text: string }) {
  return (
    <div className="tldr-card mt-5 max-w-3xl rounded-2xl p-5 sm:p-6">
      <p className="mb-2 flex items-center gap-2 text-[0.7rem] font-bold tracking-[0.2em] text-[#c8a24a]">
        <SparkIcon className="h-3 w-3" />
        TL;DR
      </p>
      <p className="text-[1.02rem] leading-8 text-[#eae2d4]">{text}</p>
    </div>
  );
}
