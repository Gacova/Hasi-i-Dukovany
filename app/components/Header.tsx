"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sdhMenu = [
  { label: "Domů", href: "/sdh" },
  { label: "Výbor", href: "/sdh/vybor" },
  { label: "Členové", href: "/sdh/clenove" },
  { label: "Tréninky", href: "/sdh/treninky" },
  { label: "Akce", href: "/sdh/akce" },
  { label: "Tábor", href: "/sdh/tabor" },
  { label: "Galerie", href: "/sdh/galerie" },
  { label: "Kontakt", href: "/sdh/kontakt" },
];

const jpoMenu = [
  { label: "Domů", href: "/jpo" },
  { label: "O jednotce", href: "/jpo/o-jednotce" },
  { label: "Členové", href: "/jpo/clenove" },
  { label: "Výjezdy", href: "/jpo/vyjezdy" },
  { label: "Technika", href: "/jpo/technika" },
  { label: "Galerie", href: "/jpo/galerie" },
  { label: "Kontakt", href: "/jpo/kontakt" },
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menu = pathname.startsWith("/jpo") ? jpoMenu : sdhMenu;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link
  href="/"
  className="text-2xl font-bold tracking-tight text-neutral-900 md:text-green-600"
>
          <span className="text-red-700">Hasiči</span> Dukovany
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition ${
                pathname === item.href
                  ? "text-red-700"
                  : "text-neutral-700 hover:text-red-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-2xl shadow-sm transition hover:bg-neutral-100 md:hidden"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <div className="mx-auto max-w-sm p-5">
            <div className="grid grid-cols-2 gap-3">
              {menu.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl px-4 py-4 text-center text-sm font-semibold shadow-sm transition ${
                    pathname === item.href
                      ? "bg-red-700 text-white"
                      : "border border-neutral-200 bg-white hover:bg-neutral-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}