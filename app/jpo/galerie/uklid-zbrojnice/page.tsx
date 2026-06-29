import BackLink from "@/components/BackLink";

export default function UklidZbrojnicePage() {
  const galleryImages = [
    "/uklid-zbrojnice/20260606_091314.jpg",
    "/uklid-zbrojnice/IMG-20260606-WA0031.jpg",
    "/uklid-zbrojnice/IMG-20260606-WA0032.jpg",
    "/uklid-zbrojnice/IMG-20260606-WA0033.jpg",
  ];

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", color: "#111827" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "34px 24px 70px" }}>
        <BackLink href="/jpo/galerie">Zpět do galerie</BackLink>

        <section
          style={{
            marginTop: "28px",
            background: "#ffffff",
            border: "1px solid #ececec",
            borderRadius: "28px",
            padding: "clamp(24px, 5vw, 34px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
          }}
        >
          <h1
  style={{
    margin: 0,
    fontSize: "clamp(42px, 9vw, 56px)",
    lineHeight: 1.05,
    fontWeight: 800,
    letterSpacing: "-1.5px",
    color: "#111827",
  }}
>
  Úklid zbrojnice a techniky
</h1>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
            marginTop: "28px",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              background: "#fff7f7",
              border: "1px solid #ffe4e6",
              borderRadius: "28px",
              padding: "28px 24px",
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
                marginTop: "22px",
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
                  gap: "16px",
                  padding: "22px",
                  alignItems: "center",
                  borderBottom: index === 3 ? "none" : "1px solid #f3f4f6",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
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
                    fontSize: "16px",
                    lineHeight: 1.65,
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
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "14px",
              }}
            >
              {galleryImages.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`Úklid ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "clamp(150px, 42vw, 190px)",
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
                fontSize: "17px",
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