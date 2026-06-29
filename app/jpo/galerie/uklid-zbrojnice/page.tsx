import BackLink from "@/components/BackLink";

export default function UklidZbrojnicePage() {
  const galleryImages = [
    "/uklid-zbrojnice/20260606_091314.jpg",
    "/uklid-zbrojnice/IMG-20260606-WA0031.jpg",
    "/uklid-zbrojnice/IMG-20260606-WA0032.jpg",
    "/uklid-zbrojnice/IMG-20260606-WA0033.jpg",
  ];

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
          padding: "30px 32px 70px",
        }}
      >
        <BackLink href="/jpo/galerie">Zpět do galerie</BackLink>

        <section
          style={{
            marginTop: "28px",
            background: "#ffffff",
            border: "1px solid #ececec",
            borderRadius: "24px",
            padding: "34px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "56px",
              fontWeight: 800,
            }}
          >
            Úklid zbrojnice a{" "}
            <span style={{ color: "#dc2626" }}>techniky</span>
          </h1>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr 1.2fr",
            gap: "24px",
            marginTop: "28px",
          }}
        >
          <div
            style={{
              background: "#fff7f7",
              border: "1px solid #ffe4e6",
              borderRadius: "28px",
              padding: "34px 24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "999px",
                background: "#fff1f2",
                color: "#dc2626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                margin: "0 auto 20px",
              }}
            >
              🧹
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: 800,
                lineHeight: 1.35,
              }}
            >
              Péče o techniku a zázemí
            </h2>

            <p
              style={{
                marginTop: "24px",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#374151",
              }}
            >
              Pravidelná údržba techniky a prostor zbrojnice pomáhá udržovat
              připravenost jednotky pro zásahy i akce pro veřejnost.
            </p>
          </div>

          <div
            style={{
              border: "1px solid #ececec",
              borderRadius: "28px",
              overflow: "hidden",
              background: "#ffffff",
            }}
          >
            {[
              [
                "🧹",
                "Členové SDH a JPO společně věnovali svůj čas úklidu zbrojnice, techniky a vybavení.",
              ],
              [
                "🚒",
                "Během brigády proběhla kontrola techniky, údržba vybavení a úklid prostor zbrojnice.",
              ],
              [
                "🔧",
                "Pravidelná péče o techniku je důležitou součástí činnosti hasičů a pomáhá udržovat připravenost jednotky.",
              ],
              [
                "🤝",
                "Děkujeme všem členům, kteří se do společné brigády zapojili.",
              ],
            ].map(([icon, text], index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "18px",
                  padding: "24px",
                  alignItems: "center",
                  borderBottom:
                    index === 3 ? "none" : "1px solid #f3f4f6",
                }}
              >
                <div
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "999px",
                    background: "#fff1f2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>

                <p
                  style={{
                    margin: 0,
                    fontSize: "17px",
                    lineHeight: 1.6,
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>

          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "14px",
              }}
            >
              {galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Úklid ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "190px",
                    objectFit: "cover",
                    borderRadius: "22px",
                    display: "block",
                  }}
                />
              ))}
            </div>

            <a
              href="/jpo/galerie/uklid-zbrojnice/fotky"
              style={{
                display: "block",
                marginTop: "18px",
                color: "#dc2626",
                fontSize: "18px",
                fontWeight: 800,
                textDecoration: "none",
                textAlign: "right",
              }}
            >
              Zobrazit celou galerii →
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}