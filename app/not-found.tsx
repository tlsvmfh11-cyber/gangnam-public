import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-sections";
import { navItems, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <PageShell>
      <h1 className="font-serif text-3xl sm:text-4xl">페이지를 찾을 수 없습니다</h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-[#d9d1c4]">
        주소가 바뀌었거나 존재하지 않는 경로입니다. 아래 메뉴에서 필요한 안내로
        이동해 주세요. {siteConfig.name}은 {siteConfig.address}에서{" "}
        {siteConfig.hours} 영업합니다.
      </p>
      <nav aria-label="주요 페이지" className="mt-8">
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center text-[#e3c982] underline-offset-4 hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </PageShell>
  );
}
