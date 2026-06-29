import BackLink from "@/components/BackLink";

export default function AkcePage() {
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
          Akce <span style={{ color: "#dc2626" }}>SDH</span>{" "}
          <span style={{ color: "#111827" }}>Dukovany</span>
        </h1>

        <p
          style={{
            marginBottom: "50px",
            fontSize: "20px",
            color: "#6b7280",
          }}
        >
          Soutěže, společné akce a další dění.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 360px))",
            gap: "28px",
          }}
        >
          {/* ČARODĚJNICE */}
          <a
            href="/sdh/akce/carodejnice-2026"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #ececec",
                borderRadius: "28px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                cursor: "pointer",
              }}
            >
              <img
                src="/carodejnice.jpg"
                alt="Pálení čarodějnic"
                style={{
                  width: "100%",
                  height: "360px",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <div style={{ padding: "24px" }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "30px",
                    fontWeight: 800,
                    color: "#dc2626",
                  }}
                >
                  Pálení čarodějnic
                </h2>

                <p
                  style={{
                    marginTop: "16px",
                    fontSize: "17px",
                    lineHeight: 1.7,
                    color: "#374151",
                  }}
                >
                  <strong>30. 4. 2026</strong>
                  <br />
                  Staré fotbalové hřiště, Dukovany
                </p>

                <div
                  style={{
                    marginTop: "20px",
                    color: "#dc2626",
                    fontWeight: 700,
                    fontSize: "17px",
                  }}
                >
                  Otevřít akci →
                </div>
              </div>
            </div>
          </a>

          {/* POUŤ */}
          <a
            href="/sdh/akce/pout-2026"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #ececec",
                borderRadius: "28px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                cursor: "pointer",
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

              <div style={{ padding: "24px" }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "30px",
                    fontWeight: 800,
                    color: "#dc2626",
                  }}
                >
                  Pouť 2026
                </h2>

                <p
                  style={{
                    marginTop: "16px",
                    fontSize: "17px",
                    lineHeight: 1.7,
                    color: "#374151",
                  }}
                >
                  Tradiční pouťový průvod za účasti
                  dětí i dospělých členů SDH.
                </p>

                <div
                  style={{
                    marginTop: "20px",
                    color: "#dc2626",
                    fontWeight: 700,
                    fontSize: "17px",
                  }}
                >
                  Otevřít akci →
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}