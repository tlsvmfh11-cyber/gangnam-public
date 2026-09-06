import type { ArticleSection } from "@/content/articles";
import { ContentImage } from "@/components/content-image";
import { CheckIcon, SparkIcon } from "@/components/icons";

export function ArticleSections({ sections }: { sections: ArticleSection[] }) {
  return (
    <div>
      {sections.map((section, index) => {
        const Heading = section.level === 2 ? "h2" : "h3";
        const isTop = section.level === 2;

        return (
          <section
            key={section.id}
            aria-labelledby={section.id}
            className={isTop ? "section-block" : "mt-9"}
          >
            {isTop && index > 0 ? (
              <div aria-hidden="true" className="section-rule" />
            ) : null}

            <Heading
              id={section.id}
              className={
                isTop
                  ? "scroll-mt-24 font-serif text-[1.55rem] leading-snug text-[#f7f2e8] sm:text-[1.9rem]"
                  : "scroll-mt-24 flex items-center gap-2.5 font-serif text-[1.25rem] leading-snug text-[#e9dfcc] sm:text-[1.45rem]"
              }
            >
              {!isTop ? (
                <SparkIcon className="h-[0.85rem] w-[0.85rem] shrink-0 text-[#c8a24a]" />
              ) : null}
              {section.title}
            </Heading>

            {section.paragraphs.map((paragraph, pIndex) => (
              <div key={paragraph.slice(0, 24)}>
                <p
                  className={
                    isTop && pIndex === 0
                      ? "mt-4 text-[1.05rem] leading-8 text-[#e2dacd] sm:text-[1.1rem] sm:leading-9"
                      : "mt-4 text-base leading-8 text-[#c9c0b2] sm:text-[1.02rem]"
                  }
                >
                  {paragraph}
                </p>
                {section.image && pIndex === 0 ? (
                  <ContentImage
                    src={section.image.src}
                    alt={section.image.alt}
                    caption={section.imageCaption}
                  />
                ) : null}
              </div>
            ))}

            {section.bullets ? (
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 rounded-xl border border-white/8 bg-[#191510] px-4 py-3"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#c8a24a]/15 text-[#e3c982]"
                    >
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[0.95rem] leading-7 text-[#cec5b7]">
                      {bullet}
                    </span>
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
