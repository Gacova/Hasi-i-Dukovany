import Link from "next/link";
import BackLink from "@/components/BackLink";

export default function TaborPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", color: "#111827" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "34px 24px 70px",
        }}
      >
        <BackLink href="/sdh">Zpět na SDH</BackLink>

        <h1
          style={{
            marginTop: "28px",
            marginBottom: "18px",
            fontSize: "clamp(42px, 9vw, 64px)",
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: "-1.5px",
          }}
        >
          Tábor <span style={{ color: "#dc2626" }}>SDH</span>{" "}
          <span style={{ color: "#111827" }}>Dukovany</span>
        </h1>

        <p
          style={{
            marginBottom: "32px",
            fontSize: "clamp(18px, 4vw, 20px)",
            lineHeight: 1.6,
            color: "#6b7280",
          }}
        >
          Letní tábor plný dobrodružství, her a nových zážitků.
        </p>

        <section
          style={{
            marginBottom: "42px",
            padding: "28px",
            borderRadius: "28px",
            background: "#f9fafb",
            border: "1px solid #ececec",
          }}
        >
          <h2
            style={{
              margin: 0,
              marginBottom: "20px",
              fontSize: "clamp(24px, 5vw, 30px)",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            Tábor 2026
          </h2>

          <Link href="/sdh/tabor/2026" style={yearButtonStyle}>
            2026
          </Link>
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "28px",
            alignItems: "start",
          }}
        >
          <img
            src="/tabor_letak.png"
            alt="Příměstský tábor SDH Dukovany"
            style={{
              width: "100%",
              maxWidth: "520px",
              justifySelf: "center",
              borderRadius: "24px",
              display: "block",
              boxShadow: "0 14px 34px rgba(0,0,0,0.12)",
            }}
          />

          <section
            style={{
              display: "grid",
              gap: "22px",
            }}
          >
            <article style={cardStyle}>
              <h2 style={titleStyle}>Letní tábor SDH Dukovany</h2>

              <p style={textStyle}>
                Každý rok připravujeme pro děti pestrý program plný her,
                soutěží, sportovních aktivit, výletů a nezapomenutelných
                zážitků.
              </p>

              <p style={textStyle}>
                Tábor je dlouhodobě velmi oblíbený a kapacita bývá rychle
                naplněna.
              </p>
            </article>

            <article style={cardStyle}>
              <h2 style={titleStyle}>Informace pro rodiče</h2>

              <p style={textStyle}>
                Na této stránce budou postupně zveřejňovány důležité informace,
                pokyny, seznam vybavení a další dokumenty určené rodičům
                přihlášených dětí.
              </p>

              <p style={textStyle}>
                Veškeré potřebné informace budou k dispozici před zahájením
                tábora.
              </p>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #ececec",
  borderRadius: "28px",
  padding: "28px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
};

const titleStyle = {
  margin: 0,
  marginBottom: "16px",
  fontSize: "clamp(26px, 6vw, 32px)",
  fontWeight: 800,
  color: "#111827",
};

const textStyle = {
  margin: "0 0 16px",
  fontSize: "17px",
  lineHeight: 1.75,
  color: "#4b5563",
};

const yearButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 24px",
  borderRadius: "16px",
  background: "#dc2626",
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "18px",
  fontWeight: 800,
  boxShadow: "0 8px 20px rgba(220, 38, 38, 0.18)",
};