"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { PhoneIcon } from "@/components/icons";
import { callCta, navItems, siteConfig, telHref } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  // 메뉴는 링크 클릭 시 닫습니다(아래 onClick). 경로 변화를 effect로 감시하지 않습니다.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c0b0a]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <Link
          href="/"
          className="flex min-h-11 flex-col justify-center font-serif text-lg tracking-wide text-[#f2ece1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3c982]"
        >
          {siteConfig.name}
          <span className="mt-0.5 block font-sans text-[0.6rem] font-normal tracking-[0.2em] text-[#c8a24a]">
            역삼동 · {siteConfig.hours}
          </span>
        </Link>

        <nav aria-label="주요 메뉴" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex min-h-11 items-center rounded-full px-3.5 text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3c982] ${
                  active
                    ? "bg-[#c8a24a]/12 text-[#e3c982]"
                    : "text-[#cfc6b6] hover:bg-white/5 hover:text-[#f2ece1]"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={telHref()}
            aria-label={callCta.ariaLabel}
            className="ml-2 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-gradient-to-b from-[#d9b25c] to-[#b6913f] px-4 text-sm font-bold text-[#17110a] shadow-md shadow-black/30 transition-colors duration-200 hover:from-[#e3c982] hover:to-[#c8a24a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3c982]"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            {callCta.label.default}
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#c8a24a]/40 text-[#e3c982] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e3c982] md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden="true" className="text-lg leading-none">
            {open ? "×" : "☰"}
          </span>
        </button>
      </div>

      {open ? (
        <div
          id={menuId}
          className="border-t border-white/10 bg-[#0c0b0a] px-4 py-4 md:hidden"
        >
          <nav aria-label="모바일 메뉴" className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-xl px-3 text-base ${
                    active ? "text-[#e3c982]" : "text-[#f2ece1]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
