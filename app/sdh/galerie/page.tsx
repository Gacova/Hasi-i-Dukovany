import BackLink from "@/components/BackLink";

export default function GaleriePage() {
  return (
    <main
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 1,
          maxWidth: "1400px",
          width: "100%",
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
          Galerie <span style={{ color: "#dc2626" }}>SDH</span>{" "}
          <span style={{ color: "#111827" }}>Dukovany</span>
        </h1>

        <p
          style={{
            marginBottom: "50px",
            fontSize: "20px",
            color: "#6b7280",
          }}
        >
          Fotky z akcí, tréninků a společných setkání.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 360px))",
            gap: "28px",
          }}
        >
          <a
            href="/sdh/galerie/carodejnice-2026"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #ececec",
                borderRadius: "28px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                cursor: "pointer",
                minHeight: "620px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src="/akce/carodejnice-2026/IMG_0694.JPG"
                alt="Pálení čarodějnic"
                style={{
                  width: "100%",
                  height: "360px",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "30px",
                    fontWeight: 800,
                    lineHeight: 1.3,
                    color: "#111827",
                  }}
                >
                  Pálení čarodějnic 2026
                </h2>

                <p
                  style={{
                    marginTop: "16px",
                    color: "#6b7280",
                    fontSize: "17px",
                    lineHeight: 1.7,
                  }}
                >
                  Fotogalerie z tradiční akce SDH Dukovany.
                </p>

                <div
                  style={{
                    marginTop: "auto",
                    color: "#dc2626",
                    fontWeight: 700,
                    fontSize: "17px",
                  }}
                >
                  Otevřít galerii →
                </div>
              </div>
            </div>
          </a>

          <a
            href="/sdh/galerie/pout-2026"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #ececec",
                borderRadius: "28px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                cursor: "pointer",
                minHeight: "620px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src="/pout/IMG-20260531-WA0006.jpg"
                alt="Pouť 2026"
                style={{
                  width: "100%",
                  height: "360px",
                  objectFit: "cover",
                  objectPosition: "center 15%",
                  display: "block",
                }}
              />

              <div
                style={{
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "30px",
                    fontWeight: 800,
                    lineHeight: 1.3,
                    color: "#111827",
                  }}
                >
                  Pouť 2026
                </h2>

                <p
                  style={{
                    marginTop: "16px",
                    color: "#6b7280",
                    fontSize: "17px",
                    lineHeight: 1.7,
                  }}
                >
                  Fotogalerie z tradiční pouti a pouťového průvodu v Dukovanech.
                </p>

                <div
                  style={{
                    marginTop: "auto",
                    color: "#dc2626",
                    fontWeight: 700,
                    fontSize: "17px",
                  }}
                >
                  Otevřít galerii →
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}