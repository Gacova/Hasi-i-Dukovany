import BackLink from "@/components/BackLink";

export default function SkolkaPage() {
  const galleryImages = [
    "/jpo_skolka/hlavni.jpg",
    "/jpo_skolka/IMG-20260616-WA0007.jpg",
    "/jpo_skolka/IMG-20260616-WA0008.jpg",
    "/jpo_skolka/IMG-20260616-WA0009.jpg",
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
              fontSize: "clamp(36px, 8vw, 52px)",
              fontWeight: 800,
              color: "#111827",
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}
          >
            Preventivně výchovná činnost pro děti z MŠ Dukovany
          </h1>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
            marginTop: "28px",
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
              👧
            </div>

            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 800, lineHeight: 1.35 }}>
              Návštěva mateřské školy
            </h2>

            <p style={{ marginTop: "22px", fontSize: "16px", lineHeight: 1.7, color: "#374151" }}>
              Děti z Mateřské školy Dukovany navštívily hasičskou zbrojnici a
              seznámily se s prací hasičů i vybavením jednotky.
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
              ["🚒", "Děti si prohlédly zásahové vozidlo a hasičskou techniku používanou při výjezdech."],
              ["🧯", "Seznámily se s vybavením jednotky a jeho využitím při zásazích."],
              ["📞", "Součástí programu bylo povídání o bezpečném chování a přivolání pomoci."],
              ["😊", "Děti měly možnost klást otázky a zblízka si prohlédnout prostory zbrojnice."],
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

                <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.65 }}>
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
                  alt={`MŠ ${index + 1}`}
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
              href="/jpo/galerie/preventivne-vychovna-cinnost-ms/fotky"
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