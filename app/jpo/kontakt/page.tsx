import BackLink from "@/components/BackLink";

export default function KontaktJPOPage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "34px 24px 70px",
        }}
      >
        <BackLink href="/jpo">Zpět na JPO</BackLink>

        <h1
          style={{
            marginTop: "28px",
            marginBottom: "16px",
            fontSize: "clamp(42px, 9vw, 58px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            color: "#111827",
          }}
        >
          Kontakt na jednotku
        </h1>

        <p
          style={{
            fontSize: "clamp(18px, 4vw, 20px)",
            lineHeight: 1.6,
            color: "#6b7280",
            marginBottom: "34px",
          }}
        >
          Máte dotaz nebo potřebujete kontaktovat jednotku?
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
              src="/pavel.jpg"
              alt="Bc. Pavel Stuchlík"
              style={{
                width: "100%",
                height: "clamp(320px, 85vw, 560px)",
                objectFit: "cover",
                objectPosition: "center 15%",
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
                Bc. Pavel Stuchlík, DiS.
              </h2>

              <p
                style={{
                  marginTop: "12px",
                  marginBottom: "22px",
                  fontSize: "clamp(19px, 5vw, 24px)",
                  color: "#6b7280",
                }}
              >
                velitel JSDHO Dukovany
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
                <ContactItem label="E-mail">
                  <a href="mailto:hasici@obecdukovany.cz" style={emailLinkStyle}>
                    hasici@obecdukovany.cz
                  </a>
                </ContactItem>

                <ContactItem label="Telefon">
                  <a href="tel:777355042" style={phoneLinkStyle}>
                    777 355 042
                  </a>
                </ContactItem>

                <div>
                  <div style={labelStyle}>Funkce</div>
                  <div style={valueStyle}>velitel JSDHO Dukovany</div>
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

const emailLinkStyle = {
  fontSize: "clamp(18px, 5vw, 24px)",
  fontWeight: 700,
  color: "#111827",
  textDecoration: "none",
  wordBreak: "break-word" as const,
};

const phoneLinkStyle = {
  fontSize: "clamp(24px, 7vw, 30px)",
  fontWeight: 800,
  color: "#111827",
  textDecoration: "none",
};

const valueStyle = {
  fontSize: "clamp(18px, 5vw, 24px)",
  fontWeight: 700,
  color: "#111827",
  lineHeight: 1.45,
};