export default function KontaktPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1250px", margin: "0 auto", padding: "34px 24px 70px" }}>
        <a href="/sdh" style={{ color: "#dc2626", textDecoration: "none", fontSize: "16px", fontWeight: 700 }}>
          ← Zpět na SDH
        </a>

        <h1
          style={{
            marginTop: "28px",
            marginBottom: "16px",
            fontSize: "clamp(42px, 9vw, 58px)",
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: "-1.5px",
          }}
        >
          Kontakt <span style={{ color: "#dc2626" }}>SDH</span>{" "}
          <span style={{ color: "#111827" }}>Dukovany</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(18px, 4vw, 20px)",
            lineHeight: 1.6,
            color: "#6b7280",
            marginBottom: "34px",
          }}
        >
          Kontaktní údaje, adresa a důležité informace.
        </p>

        <section
          style={{
            background: "#ffffff",
            border: "1px solid #ececec",
            borderRadius: "30px",
            padding: "clamp(22px, 5vw, 28px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "28px",
              alignItems: "start",
            }}
          >
            <img
              src="/20260531_103645.jpg"
              alt="Marcela Vrbková"
              style={{
                width: "100%",
                height: "clamp(320px, 85vw, 560px)",
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
                  fontSize: "clamp(32px, 8vw, 42px)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                Marcela Vrbková
              </h2>

              <p
                style={{
                  marginTop: "12px",
                  marginBottom: "22px",
                  fontSize: "clamp(19px, 5vw, 24px)",
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
                  marginBottom: "24px",
                }}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <ContactItem label="Telefon">
                  <a href="tel:603569887" style={mainLinkStyle}>
                    603 569 887
                  </a>
                </ContactItem>

                <ContactItem label="E-mail">
                  <a href="mailto:sdhdukovany@seznam.cz" style={emailLinkStyle}>
                    sdhdukovany@seznam.cz
                  </a>
                </ContactItem>

                <ContactItem label="Adresa">
                  <div style={valueStyle}>
                    Dukovany čp. 100
                    <br />
                    675 56 Dukovany
                  </div>
                </ContactItem>

                <ContactItem label="IČO">
                  <div style={valueStyle}>64270327</div>
                </ContactItem>

                <ContactItem label="Bankovní spojení">
                  <div style={valueStyle}>242384182/0300</div>
                </ContactItem>

                <div>
                  <div style={labelStyle}>Datová schránka</div>
                  <div style={valueStyle}>w8y7edw</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ContactItem({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ paddingBottom: "18px", borderBottom: "1px solid #f3f4f6" }}>
      <div style={labelStyle}>{label}</div>
      {children}
    </div>
  );
}

const labelStyle = {
  fontSize: "15px",
  color: "#6b7280",
  marginBottom: "6px",
};

const mainLinkStyle = {
  fontSize: "clamp(24px, 7vw, 30px)",
  fontWeight: 800,
  color: "#111827",
  textDecoration: "none",
};

const emailLinkStyle = {
  fontSize: "clamp(18px, 5vw, 24px)",
  fontWeight: 700,
  color: "#111827",
  textDecoration: "none",
  wordBreak: "break-word" as const,
};

const valueStyle = {
  fontSize: "clamp(18px, 5vw, 22px)",
  fontWeight: 700,
  color: "#111827",
  lineHeight: 1.45,
};