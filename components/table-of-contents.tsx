import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

type Item = { id: string; title: string; level: 2 | 3 };

export function TableOfContents({ items }: { items: Item[] }) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="목차"
      className="mb-12 mt-10 overflow-hidden rounded-2xl border border-[#c8a24a]/25 bg-gradient-to-b from-[#1d1811] to-[#151109]"
    >
      <div className="flex items-center gap-2.5 border-b border-[#c8a24a]/15 px-5 py-3.5">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rotate-45 bg-[#c8a24a]"
        />
        <h2 className="text-[0.8rem] font-bold tracking-[0.14em] text-[#e3c982]">
          이 페이지 목차
        </h2>
        <span className="ml-auto text-xs text-[#8f8579]">{items.length}</span>
      </div>
      <ol className="grid gap-x-6 p-3 sm:grid-cols-2 sm:p-4">
        {items.map((item, i) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className="group flex min-h-11 items-center gap-3 rounded-lg px-2.5 py-1.5 text-[0.95rem] leading-6 transition-colors duration-150 hover:bg-[#c8a24a]/8"
            >
              <span
                aria-hidden="true"
                className="w-5 shrink-0 text-right font-serif text-xs text-[#c8a24a]/60"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={
                  item.level === 3
                    ? "flex-1 text-[#b3a998] group-hover:text-[#e3c982]"
                    : "flex-1 text-[#e6ded1] group-hover:text-[#e3c982]"
                }
              >
                {item.title}
              </span>
              <ArrowRightIcon className="h-3 w-3 shrink-0 text-[#c8a24a]/0 transition-all duration-150 group-hover:text-[#c8a24a]" />
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
