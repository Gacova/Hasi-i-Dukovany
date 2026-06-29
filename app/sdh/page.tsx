export default function SDHPage() {
  const tiles = [
    {
      title: "Výbor",
      text: "Přehled členů výboru SDH a jejich funkcí.",
      href: "/sdh/vybor",
    },
    {
      title: "Členové",
      text: "Přehled členů sboru a mladých hasičů.",
      href: "/sdh/clenove",
    },
    {
      title: "Tréninky",
      text: "Pravidelné tréninky a důležité informace.",
      href: "/sdh/treninky",
    },
    {
      title: "Akce",
      text: "Soutěže, společné akce a další dění.",
      href: "/sdh/akce",
    },
    {
      title: "Tábor",
      text: "Letní tábor a informace pro děti i rodiče.",
      href: "/sdh/tabor",
    },
    {
      title: "Galerie",
      text: "Fotky z tréninků, akcí a společných setkání.",
      href: "/sdh/galerie",
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
        <a
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
        </a>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.15fr",
            gap: "70px",
            alignItems: "center",
            marginBottom: "60px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "72px",
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
                marginTop: "24px",
                fontSize: "26px",
                color: "#4b5563",
              }}
            >
              Pomáháme, trénujeme, držíme spolu.
            </p>

            <p
              style={{
                marginTop: "28px",
                maxWidth: "520px",
                fontSize: "20px",
                lineHeight: 1.7,
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
                gap: "12px",
                marginTop: "34px",
                background: "#b91c1c",
                color: "white",
                padding: "16px 34px",
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

          <img
            src="/sdh.jpg"
            alt="SDH Dukovany"
            style={{
              width: "100%",
              height: "430px",
              objectFit: "cover",
              borderRadius: "28px",
              display: "block",
              boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
            }}
          />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
            marginBottom: "70px",
          }}
        >
          {tiles.map((tile) => (
            <a
              key={tile.title}
              href={tile.href}
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
                    fontSize: "30px",
                    fontWeight: 800,
                  }}
                >
                  {tile.title}
                </h2>

                <p
                  style={{
                    marginTop: "12px",
                    marginBottom: "22px",
                    fontSize: "18px",
                    lineHeight: 1.55,
                    color: "#4b5563",
                  }}
                >
                  {tile.text}
                </p>

                <span
                  style={{
                    color: "#b91c1c",
                    fontSize: "18px",
                    fontWeight: 800,
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
