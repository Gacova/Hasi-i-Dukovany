import Link from "next/link";

export default function JpoPage() {
  const cards = [
    {
      title: "O jednotce",
      text: "Základní informace o zásahové jednotce.",
      href: "/jpo/o-jednotce",
    },
    {
      title: "Členové",
      text: "Přehled členů jednotky.",
      href: "/jpo/clenove",
    },
    {
      title: "Výjezdy",
      text: "Zásahy a stručné informace o výjezdech.",
      href: "/jpo/vyjezdy",
    },
    {
      title: "Technika",
      text: "Vozidla, vybavení a používaná technika.",
      href: "/jpo/technika",
    },
    {
      title: "Galerie",
      text: "Fotky z výjezdů a činnosti jednotky.",
      href: "/jpo/galerie",
    },
    {
      title: "Kontakt",
      text: "Kontaktní údaje a důležité informace.",
      href: "/jpo/kontakt",
    },
  ];

  return (
    <main
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        color: "#111827",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "60px 32px 0",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#b91c1c",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: 700,
            display: "inline-block",
            marginBottom: "34px",
          }}
        >
          ← Zpět na rozcestník
        </Link>

        <section style={{ marginBottom: "70px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "72px",
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
              marginTop: "24px",
              fontSize: "26px",
              color: "#4b5563",
            }}
          >
            Zásahová jednotka, technika a důležité informace.
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
            marginBottom: "70px",
          }}
        >
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <article
                style={{
                  minHeight: "190px",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "28px",
                  padding: "34px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "34px",
                    fontWeight: 800,
                  }}
                >
                  {card.title}
                </h2>

                <p
                  style={{
                    marginTop: "16px",
                    marginBottom: "22px",
                    fontSize: "19px",
                    lineHeight: 1.55,
                    color: "#4b5563",
                  }}
                >
                  {card.text}
                </p>

                <span
                  style={{
                    color: "#b91c1c",
                    fontSize: "19px",
                    fontWeight: 800,
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