import BackLink from "@/components/BackLink";

export default function PoutPage() {
  const galleryImages = [
    "/pout/IMG-20260531-WA0014.jpg",
    "/pout/IMG-20260604-WA0028.jpg",
    "/pout/file_000000002df4720aa59590672d1f5c4e.png",
    "/pout/file_000000003c28720a9910bb16ad0f3033.png",
  ];

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", color: "#111827" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "34px 24px 70px" }}>
        <BackLink href="/sdh/akce">Zpět na akce</BackLink>

        <section
          style={{
            marginTop: "28px",
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
            }}
          >
            Pouť <span style={{ color: "#dc2626" }}>2026</span>
          </h1>

          <div style={{ marginTop: "18px", color: "#6b7280", fontSize: "17px" }}>
            Dukovany
          </div>
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
          <aside
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
              🎺
            </div>

            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 800, lineHeight: 1.35 }}>
              Tradiční pouť v Dukovanech
            </h2>

            <p style={{ marginTop: "22px", fontSize: "16px", lineHeight: 1.7, color: "#374151" }}>
              Pouť patří mezi dlouholeté obecní tradice, které spojují místní
              obyvatele, spolky i návštěvníky.
            </p>
          </aside>

          <section
            style={{
              border: "1px solid #ececec",
              borderRadius: "28px",
              overflow: "hidden",
              background: "#ffffff",
            }}
          >
            {[
              ["😊", "Pouť v Dukovanech je tradiční událostí, která každoročně spojuje místní obyvatele, spolky i návštěvníky obce."],
              ["🚩", "Ani letos nechyběla účast členů SDH Dukovany v pouťovém průvodu."],
              ["👨‍👩‍👧", "Děti i dospělí společně reprezentovali náš sbor a podíleli se na zachování dlouholeté tradice."],
              ["❤️", "Děkujeme všem členům za účast a všem návštěvníkům za příjemnou atmosféru během celého dne."],
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
                    color: "#dc2626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>

                <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.65, color: "#1f2937" }}>
                  {text}
                </p>
              </div>
            ))}
          </section>

          <section>
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
                  alt={`Pouť ${index + 1}`}
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
              href="/sdh/galerie/pout-2026"
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
          </section>
        </section>
      </div>
    </main>
  );
}