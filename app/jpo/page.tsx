import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JPO Dukovany",
};
import Link from "next/link";

export default function JpoPage() {
  const cards = [
    { title: "O jednotce", text: "Základní informace o zásahové jednotce.", href: "/jpo/o-jednotce" },
    { title: "Členové", text: "Přehled členů jednotky.", href: "/jpo/clenove" },
    { title: "Výjezdy", text: "Zásahy a stručné informace o výjezdech.", href: "/jpo/vyjezdy" },
    { title: "Technika", text: "Vozidla, vybavení a používaná technika.", href: "/jpo/technika" },
    { title: "Galerie", text: "Fotky z výjezdů a činnosti jednotky.", href: "/jpo/galerie" },
    { title: "Kontakt", text: "Kontaktní údaje a důležité informace.", href: "/jpo/kontakt" },
  ];

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", color: "#111827" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "36px 24px 70px" }}>
        <Link
          href="/"
          style={{
            color: "#b91c1c",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: 700,
            display: "inline-block",
            marginBottom: "30px",
          }}
        >
          ← Zpět na rozcestník
        </Link>

        <section style={{ marginBottom: "44px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(48px, 9vw, 72px)",
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: "-2px",
            }}
          >
            <span style={{ color: "#b91c1c" }}>JPO </span>
            <span style={{ color: "#111827" }}>Dukovany</span>
          </h1>

          <p
            style={{
              marginTop: "22px",
              fontSize: "clamp(22px, 5vw, 26px)",
              color: "#4b5563",
              lineHeight: 1.45,
              maxWidth: "720px",
            }}
          >
            Zásahová jednotka, technika a důležité informace.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <Link key={card.title} href={card.href} style={{ textDecoration: "none", color: "inherit" }}>
              <article
                style={{
                  minHeight: "185px",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "28px",
                  padding: "28px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "28px", fontWeight: 800 }}>
                  {card.title}
                </h2>

                <p
                  style={{
                    marginTop: "12px",
                    fontSize: "17px",
                    lineHeight: 1.55,
                    color: "#4b5563",
                    flex: 1,
                  }}
                >
                  {card.text}
                </p>

                <span
                  style={{
                    color: "#b91c1c",
                    fontSize: "17px",
                    fontWeight: 800,
                    marginTop: "18px",
                  }}
                >
                  Otevřít sekci →
                </span>
              </article>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}