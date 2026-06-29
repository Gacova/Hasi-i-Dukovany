import BackLink from "@/components/BackLink";

export default function KontaktJPOPage() {
  return (
    <main
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        padding: "40px 32px 80px",
      }}
    >
      <div style={{ maxWidth: "1250px", margin: "0 auto" }}>
        <BackLink href="/jpo">Zpět na JPO</BackLink>

        <h1
          style={{
            marginTop: "26px",
            marginBottom: "12px",
            fontSize: "58px",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#111827",
          }}
        >
          Kontakt na jednotku
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#6b7280",
            marginBottom: "40px",
          }}
        >
          Máte dotaz nebo potřebujete kontaktovat jednotku?
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
              src="/pavel.jpg"
              alt="Bc. Pavel Stuchlík"
              style={{
                width: "100%",
                height: "560px",
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
                  fontSize: "42px",
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                Bc. Pavel Stuchlík, DiS.
              </h2>

              <p
                style={{
                  marginTop: "12px",
                  marginBottom: "24px",
                  fontSize: "24px",
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
                  marginBottom: "28px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    paddingBottom: "18px",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    E-mail
                  </div>

                  <a
                    href="mailto:hasici@obecdukovany.cz"
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#111827",
                      textDecoration: "none",
                    }}
                  >
                    hasici@obecdukovany.cz
                  </a>
                </div>

                <div
                  style={{
                    paddingBottom: "18px",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Telefon
                  </div>

                  <a
                    href="tel:777355042"
                    style={{
                      fontSize: "30px",
                      fontWeight: 800,
                      color: "#111827",
                      textDecoration: "none",
                    }}
                  >
                    777 355 042
                  </a>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Funkce
                  </div>

                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#111827",
                    }}
                  >
                    velitel JSDHO Dukovany
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