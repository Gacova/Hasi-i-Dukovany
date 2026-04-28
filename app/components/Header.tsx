"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const isSdh = pathname.startsWith("/sdh");
  const isJpo = pathname.startsWith("/jpo");

  const menu = isSdh ? sdhMenu : isJpo ? jpoMenu : sdhMenu;

  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <Link href="/" className="text-xl font-bold text-neutral-900">
          <span className="text-red-700">Hasiči</span> Dukovany
        </Link>

        <nav className="flex gap-6 text-sm font-medium text-neutral-700">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-red-700 ${
                pathname === item.href ? "text-red-700" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}