export default function KontaktPage() {
  return (
    <main
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        padding: "40px 32px 80px",
      }}
    >
      <div style={{ maxWidth: "1250px", margin: "0 auto" }}>
        <a
          href="/sdh"
          style={{
            color: "#dc2626",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: 500,
          }}
        >
          ← Zpět na SDH
        </a>

        <h1
          style={{
            marginTop: "26px",
            marginBottom: "12px",
            fontSize: "58px",
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          Kontakt{" "}
          <span style={{ color: "#dc2626" }}>SDH</span>{" "}
          <span style={{ color: "#111827" }}>Dukovany</span>
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#6b7280",
            marginBottom: "40px",
          }}
        >
          Kontaktní údaje, adresa a důležité informace.
        </p>

        <section
          style={{
            background: "#ffffff",
            border: "1px solid #ececec",
            borderRadius: "30px",
            padding: "28px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "420px 1fr",
              gap: "34px",
              alignItems: "center",
            }}
          >
            <img
              src="/20260531_103645.jpg"
              alt="Marcela Vrbková"
              style={{
                width: "100%",
                height: "560px",
                objectFit: "cover",
                objectPosition: "center 20%",
                borderRadius: "24px",
                display: "block",
              }}
            />

            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "42px",
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                Marcela Vrbková
              </h2>

              <p
                style={{
                  marginTop: "12px",
                  marginBottom: "24px",
                  fontSize: "24px",
                  color: "#6b7280",
                }}
              >
                starostka SDH Dukovany
              </p>

              <div
                style={{
                  width: "90px",
                  height: "4px",
                  background: "#dc2626",
                  borderRadius: "999px",
                  marginBottom: "28px",
                }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ paddingBottom: "18px", borderBottom: "1px solid #f3f4f6" }}>
                  <div style={{ fontSize: "16px", color: "#6b7280", marginBottom: "4px" }}>
                    Telefon
                  </div>
                  <a
                    href="tel:603569887"
                    style={{
                      fontSize: "30px",
                      fontWeight: 800,
                      color: "#111827",
                      textDecoration: "none",
                    }}
                  >
                    603 569 887
                  </a>
                </div>

                <div style={{ paddingBottom: "18px", borderBottom: "1px solid #f3f4f6" }}>
                  <div style={{ fontSize: "16px", color: "#6b7280", marginBottom: "4px" }}>
                    E-mail
                  </div>
                  <a
                    href="mailto:sdhdukovany@seznam.cz"
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#111827",
                      textDecoration: "none",
                    }}
                  >
                    sdhdukovany@seznam.cz
                  </a>
                </div>

                <div style={{ paddingBottom: "18px", borderBottom: "1px solid #f3f4f6" }}>
                  <div style={{ fontSize: "16px", color: "#6b7280", marginBottom: "4px" }}>
                    Adresa
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>
                    Dukovany čp. 100<br />
                    675 56 Dukovany
                  </div>
                </div>

                <div style={{ paddingBottom: "18px", borderBottom: "1px solid #f3f4f6" }}>
                  <div style={{ fontSize: "16px", color: "#6b7280", marginBottom: "4px" }}>
                    IČO
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>
                    64270327
                  </div>
                </div>

                <div style={{ paddingBottom: "18px", borderBottom: "1px solid #f3f4f6" }}>
                  <div style={{ fontSize: "16px", color: "#6b7280", marginBottom: "4px" }}>
                    Bankovní spojení
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>
                    242384182/0300
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "16px", color: "#6b7280", marginBottom: "4px" }}>
                    Datová schránka
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>
                    w8y7edw
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}