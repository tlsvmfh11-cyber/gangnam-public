import Link from "next/link";

/**
 * 화면에 보이는 경로 표시. 각 페이지의 BreadcrumbList JSON-LD와 같은 계층을 씁니다.
 * 터치 타깃 확보를 위해 링크에 최소 높이를 줍니다.
 */
export function Breadcrumbs({
  trail,
  current,
}: {
  trail: { href: string; label: string }[];
  current: string;
}) {
  return (
    <nav aria-label="경로" className="text-sm text-[#a2988a]">
      <ol className="flex flex-wrap items-center gap-x-2">
        {trail.map((item) => (
          <li key={item.href} className="flex items-center gap-x-2">
            <Link
              href={item.href}
              className="inline-flex min-h-11 items-center underline-offset-4 hover:text-[#e3c982] hover:underline"
            >
              {item.label}
            </Link>
            <span aria-hidden="true">/</span>
          </li>
        ))}
        <li className="inline-flex min-h-11 items-center text-[#cfc6b6]">{current}</li>
      </ol>
    </nav>
  );
}
