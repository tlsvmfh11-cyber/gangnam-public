import type { FaqItem } from "@/content/faqs";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-white/8 bg-[#191510] px-4 transition-colors duration-200 open:border-[#c8a24a]/35 open:bg-[#1c1711] sm:px-5"
        >
          <summary className="cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex min-h-14 items-center gap-3.5 py-3">
              <span
                aria-hidden="true"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#c8a24a]/15 font-serif text-sm font-bold text-[#e3c982]"
              >
                Q
              </span>
              <span className="flex-1 text-[1.02rem] font-medium leading-7 text-[#f2ece1]">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#c8a24a]/35 text-[#e3c982] transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </span>
          </summary>
          <div className="flex gap-3.5 border-t border-white/8 pb-5 pt-4">
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#7fb069]/12 font-serif text-sm font-bold text-[#a7d494]"
            >
              A
            </span>
            <p className="flex-1 text-[0.98rem] leading-8 text-[#c9c0b2]">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
