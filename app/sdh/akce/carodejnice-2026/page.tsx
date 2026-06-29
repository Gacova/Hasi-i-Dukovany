import BackLink from "@/components/BackLink";

export default function Carodejnice2026Page() {
  const galleryImages = [
    "/akce/carodejnice-2026/IMG_0694.JPG",
    "/akce/carodejnice-2026/IMG_0695.JPG",
    "/akce/carodejnice-2026/IMG_0697.JPG",
    "/akce/carodejnice-2026/IMG_0704.JPG",
  ];

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", color: "#111827" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 32px 80px" }}>
        <BackLink href="/sdh/akce">Zpět na akce</BackLink>

        <section style={{
          marginTop: "24px",
          border: "1px solid #ececec",
          borderRadius: "28px",
          padding: "34px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "26px" }}>
            <div style={{
              width: "76px",
              height: "76px",
              borderRadius: "999px",
              background: "#dc2626",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "38px",
              flexShrink: 0,
            }}>
              🔥
            </div>

            <div>
              <h1 style={{ margin: 0, fontSize: "58px", fontWeight: 800, lineHeight: 1.05 }}>
                Pálení čarodějnic <span style={{ color: "#dc2626" }}>2026</span>
              </h1>

              <div style={{
                display: "flex",
                gap: "28px",
                marginTop: "18px",
                color: "#6b7280",
                fontSize: "18px",
                flexWrap: "wrap",
              }}>
                <span>30. 4. 2026</span>
                <span>17:00</span>
                <span>Staré fotbalové hřiště, Dukovany</span>
              </div>
            </div>
          </div>
        </section>

        <section style={{
          display: "grid",
          gridTemplateColumns: "250px 1fr 1.25fr",
          gap: "24px",
          marginTop: "28px",
          alignItems: "stretch",
        }}>
          <aside style={{
            background: "#fff7f7",
            border: "1px solid #ffe4e6",
            borderRadius: "28px",
            padding: "34px 24px",
            textAlign: "center",
          }}>
            <div style={{
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
            }}>
              👥
            </div>

            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 800, lineHeight: 1.35 }}>
              Společně pro naši obec a děti
            </h2>

            <p style={{ marginTop: "24px", fontSize: "16px", lineHeight: 1.7, color: "#374151" }}>
              Sdružujeme síly, abychom mohli pořádat akce, které spojují lidi
              napříč generacemi a posilují komunitu.
            </p>

            <p style={{ marginTop: "18px", fontSize: "16px", lineHeight: 1.7, color: "#374151" }}>
              Děkujeme všem, kteří s námi tvoří nezapomenutelné chvíle.
            </p>
          </aside>

          <section style={{
            border: "1px solid #ececec",
            borderRadius: "28px",
            overflow: "hidden",
            background: "#ffffff",
          }}>
            {[
              ["😊", "Na tradičním pálení čarodějnic se letos sešlo opravdu velké množství lidí a jsme moc rádi, že jste si akci užili společně s námi."],
              ["🎯", <>Pro děti byla připravena stanoviště s různými úkoly a hrami, do kterých se zapojilo celkem <strong style={{ color: "#dc2626" }}>90 dětí</strong>.</>],
              ["🌭", "Nechybělo ani opékání buřtů, příjemná atmosféra a společné setkání všech generací. 🔥 🌭 ✨"],
              ["❤️", "Děkujeme všem, kteří dorazili, těšíme se zase za rok."],
            ].map(([icon, text], index) => (
              <div key={index} style={{
                display: "flex",
                gap: "18px",
                padding: "24px",
                alignItems: "center",
                borderBottom: index === 3 ? "none" : "1px solid #f3f4f6",
              }}>
                <div style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "999px",
                  background: "#fff1f2",
                  color: "#dc2626",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  flexShrink: 0,
                }}>
                  {icon}
                </div>

                <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.6, color: "#1f2937" }}>
                  {text}
                </p>
              </div>
            ))}
          </section>

          <section>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
            }}>
              {galleryImages.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`Pálení čarodějnic ${index + 1}`}
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
              href="/sdh/galerie/carodejnice-2026"
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
          </section>
        </section>

        <section style={{
          marginTop: "36px",
          borderTop: "1px solid #e5e7eb",
          paddingTop: "26px",
        }}>
          <h2 style={{ margin: "0 0 18px", fontSize: "34px", fontWeight: 800 }}>
            Video z akce
          </h2>

          <div style={{
            width: "520px",
            maxWidth: "100%",
            margin: "0 auto",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 16px 36px rgba(0,0,0,0.16)",
          }}>
            <video
              src="/carodejnice-2026.mp4"
              controls
              poster="/carodejnice.jpg"
              preload="metadata"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}