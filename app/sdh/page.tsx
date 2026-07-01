import Image from "next/image";

export default function SDHPage() {
  const tiles = [
    { title: "Výbor", text: "Přehled členů výboru SDH a jejich funkcí.", href: "/sdh/vybor" },
    { title: "Členové", text: "Přehled členů sboru a mladých hasičů.", href: "/sdh/clenove" },
    { title: "Tréninky", text: "Pravidelné tréninky a důležité informace.", href: "/sdh/treninky" },
    { title: "Akce", text: "Soutěže, společné akce a další dění.", href: "/sdh/akce" },
    { title: "Tábor", text: "Letní tábor a informace pro děti i rodiče.", href: "/sdh/tabor" },
    { title: "Galerie", text: "Fotky z tréninků, akcí a společných setkání.", href: "/sdh/galerie" },
  ];

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", color: "#111827" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "36px 24px 70px" }}>
        <a
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
        </a>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
            alignItems: "center",
            marginBottom: "48px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(48px, 9vw, 72px)",
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: "-2px",
              }}
            >
              <span style={{ color: "#b91c1c" }}>SDH </span>
              <span style={{ color: "#111827" }}>Dukovany</span>
            </h1>

            <p
              style={{
                marginTop: "22px",
                fontSize: "clamp(22px, 5vw, 26px)",
                color: "#4b5563",
              }}
            >
              Pomáháme, trénujeme, držíme spolu.
            </p>

            <p
              style={{
                marginTop: "24px",
                maxWidth: "560px",
                fontSize: "18px",
                lineHeight: 1.75,
                color: "#111827",
              }}
            >
              Sbor dobrovolných hasičů Dukovany je tu pro naši obec a její
              obyvatele. Pomáháme při mimořádných událostech, pracujeme s
              mládeží a pořádáme akce, které spojují naši komunitu.
            </p>

            <a
              href="/sdh/kontakt"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "30px",
                background: "#b91c1c",
                color: "#ffffff",
                padding: "16px 38px",
                borderRadius: "999px",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: 800,
                boxShadow: "0 10px 25px rgba(185,28,28,0.25)",
              }}
            >
              Kontakt
            </a>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              src="/sdh.jpg"
              alt="SDH Dukovany"
              width={900}
              height={675}
              priority
              quality={100}
              sizes="(max-width: 768px) 100vw, 700px"
              style={{
                width: "100%",
                maxWidth: "700px",
                height: "auto",
                borderRadius: "28px",
                display: "block",
                boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
              }}
            />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tiles.map((tile) => (
            <a
              key={tile.title}
              href={tile.href}
              style={{ textDecoration: "none", color: "inherit" }}
            >
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
                  {tile.title}
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
                  {tile.text}
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
            </a>
          ))}
        </section>
      </div>
    </main>
  );
}