import BackLink from "@/components/BackLink";

export default function TaborPage() {
  return (
    <main
      style={{
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 32px 80px",
        }}
      >
        <BackLink href="/sdh">Zpět na SDH</BackLink>

        <h1
          style={{
            marginTop: "30px",
            marginBottom: "20px",
            fontSize: "64px",
            fontWeight: 800,
          }}
        >
          Tábor <span style={{ color: "#dc2626" }}>SDH</span>{" "}
          <span style={{ color: "#111827" }}>Dukovany</span>
        </h1>

        <p
          style={{
            marginBottom: "40px",
            fontSize: "20px",
            color: "#6b7280",
          }}
        >
          Letní tábor plný dobrodružství, her a nových zážitků.
        </p>

        {/* PLAKÁT */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "50px",
          }}
        >
          <img
            src="/tabor_letak.png"
            alt="Příměstský tábor SDH Dukovany"
            style={{
              width: "450px",
              maxWidth: "100%",
              borderRadius: "24px",
              display: "block",
            }}
          />
        </div>

        {/* KARTY */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #ececec",
              borderRadius: "28px",
              padding: "32px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: "18px",
                fontSize: "32px",
                fontWeight: 800,
                color: "#111827",
              }}
            >
              Letní tábor SDH Dukovany
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: "18px",
                lineHeight: 1.8,
                color: "#4b5563",
              }}
            >
              Každý rok připravujeme pro děti pestrý program plný her,
              soutěží, sportovních aktivit, výletů a nezapomenutelných
              zážitků.
            </p>

            <p
              style={{
                marginTop: "18px",
                fontSize: "18px",
                lineHeight: 1.8,
                color: "#4b5563",
              }}
            >
              Tábor je dlouhodobě velmi oblíbený a kapacita bývá rychle
              naplněna.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #ececec",
              borderRadius: "28px",
              padding: "32px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: "18px",
                fontSize: "32px",
                fontWeight: 800,
                color: "#111827",
              }}
            >
              Informace pro rodiče
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: "18px",
                lineHeight: 1.8,
                color: "#4b5563",
              }}
            >
              Na této stránce budou postupně zveřejňovány důležité informace,
              pokyny, seznam vybavení a další dokumenty určené rodičům
              přihlášených dětí.
            </p>

            <p
              style={{
                marginTop: "18px",
                fontSize: "18px",
                lineHeight: 1.8,
                color: "#4b5563",
              }}
            >
              Veškeré potřebné informace budou k dispozici před zahájením
              tábora.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}