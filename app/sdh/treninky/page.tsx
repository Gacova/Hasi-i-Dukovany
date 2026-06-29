export default function TreninkySDHPage() {
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
          padding: "40px 32px 80px",
        }}
      >
        <a
          href="/sdh"
          style={{
            color: "#b91c1c",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: 700,
            display: "inline-block",
            marginBottom: "34px",
          }}
        >
          ← Zpět na SDH
        </a>

        <section
          style={{
            display: "block",
            marginBottom: "60px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "64px",
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: "-2px",
            }}
          >
            Tréninky{" "}
            <span style={{ color: "#b91c1c" }}>SDH</span>{" "}
            <span style={{ color: "#111827" }}>Dukovany</span>
          </h1>

          <p
            style={{
              marginTop: "24px",
              fontSize: "26px",
              color: "#4b5563",
            }}
          >
            Trénujeme, zlepšujeme se a držíme spolu.
          </p>

          <p
            style={{
              marginTop: "28px",
              maxWidth: "900px",
              fontSize: "20px",
              lineHeight: 1.7,
            }}
          >
            Naše tréninky probíhají po celý rok a přizpůsobujeme je počasí i
            věku dětí. Zaměřujeme se na hasičské dovednosti, pohyb, týmovou
            spolupráci i radost ze společně stráveného času.
          </p>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px",
            marginBottom: "50px",
          }}
        >
          <article
            style={{
              background: "#f8fbff",
              border: "1px solid #e5e7eb",
              borderRadius: "30px",
              padding: "34px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "36px",
                fontWeight: 800,
              }}
            >
              Zimní období
            </h2>

            <p
              style={{
                marginTop: "8px",
                fontSize: "22px",
                fontWeight: 700,
                color: "#2563eb",
              }}
            >
              trénujeme v sokolovně
            </p>

            <p
              style={{
                marginTop: "24px",
                fontSize: "18px",
                lineHeight: 1.7,
                color: "#374151",
              }}
            >
              V zimním období trénujeme převážně v sokolovně, kde se
              zaměřujeme na fyzickou přípravu, běhání, uzly, základy
              hasičských disciplín a různé týmové hry.
            </p>
          </article>

          <article
            style={{
              background: "#f7fff7",
              border: "1px solid #e5e7eb",
              borderRadius: "30px",
              padding: "34px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "36px",
                fontWeight: 800,
              }}
            >
              Letní období
            </h2>

            <p
              style={{
                marginTop: "8px",
                fontSize: "22px",
                fontWeight: 700,
                color: "#15803d",
              }}
            >
              trénujeme na starém fotbalovém hřišti
            </p>

            <p
              style={{
                marginTop: "24px",
                fontSize: "18px",
                lineHeight: 1.7,
                color: "#374151",
              }}
            >
              Jakmile začne teplejší počasí, přesouváme se na staré fotbalové
              hřiště v Dukovanech. Trénujeme práci s vodou, hadicemi, požární
              útoky, překážkové dráhy i soutěžní disciplíny.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}