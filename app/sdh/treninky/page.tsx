export default function TreninkySDHPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", color: "#111827" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "34px 24px 70px" }}>
        <a href="/sdh" style={{ color: "#b91c1c", textDecoration: "none", fontSize: "16px", fontWeight: 700 }}>
          ← Zpět na SDH
        </a>

        <section style={{ marginTop: "28px", marginBottom: "42px" }}>
          <h1 style={{
            margin: 0,
            fontSize: "clamp(42px, 9vw, 64px)",
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: "-1.5px",
          }}>
            Tréninky <span style={{ color: "#b91c1c" }}>SDH</span>{" "}
            <span style={{ color: "#111827" }}>Dukovany</span>
          </h1>

          <p style={{ marginTop: "22px", fontSize: "clamp(20px, 5vw, 26px)", color: "#4b5563", lineHeight: 1.45 }}>
            Trénujeme, zlepšujeme se a držíme spolu.
          </p>

          <p style={{ marginTop: "24px", maxWidth: "900px", fontSize: "18px", lineHeight: 1.75 }}>
            Naše tréninky probíhají po celý rok a přizpůsobujeme je počasí i věku dětí.
            Zaměřujeme se na hasičské dovednosti, pohyb, týmovou spolupráci i radost
            ze společně stráveného času.
          </p>
        </section>

        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "22px",
        }}>
          <article style={{
            background: "#f8fbff",
            border: "1px solid #e5e7eb",
            borderRadius: "28px",
            padding: "28px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}>
            <h2 style={{ margin: 0, fontSize: "clamp(30px, 7vw, 36px)", fontWeight: 800 }}>
              Zimní období
            </h2>

            <p style={{ marginTop: "10px", fontSize: "20px", fontWeight: 700, color: "#2563eb", lineHeight: 1.4 }}>
              trénujeme v sokolovně
            </p>

            <p style={{ marginTop: "22px", fontSize: "17px", lineHeight: 1.7, color: "#374151" }}>
              V zimním období trénujeme převážně v sokolovně, kde se zaměřujeme
              na fyzickou přípravu, běhání, uzly, základy hasičských disciplín
              a různé týmové hry.
            </p>
          </article>

          <article style={{
            background: "#f7fff7",
            border: "1px solid #e5e7eb",
            borderRadius: "28px",
            padding: "28px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}>
            <h2 style={{ margin: 0, fontSize: "clamp(30px, 7vw, 36px)", fontWeight: 800 }}>
              Letní období
            </h2>

            <p style={{ marginTop: "10px", fontSize: "20px", fontWeight: 700, color: "#15803d", lineHeight: 1.4 }}>
              trénujeme na starém fotbalovém hřišti
            </p>

            <p style={{ marginTop: "22px", fontSize: "17px", lineHeight: 1.7, color: "#374151" }}>
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