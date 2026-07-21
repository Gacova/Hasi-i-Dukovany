import Image from "next/image";
import BackLink from "@/components/BackLink";

export default function DoutnajiciStromLouckyPage() {
  const galleryImages = [
    "/doutnajici-strom-loucky/IMG-20260630-WA0031.jpg",
    "/doutnajici-strom-loucky/IMG-20260630-WA0032.jpg",
    "/doutnajici-strom-loucky/IMG-20260630-WA0034.jpg",
    "/doutnajici-strom-loucky/IMG-20260630-WA0035.jpg",
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
          padding: "34px 24px 70px",
        }}
      >
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
            }}
          >
            Doutnající strom Loučky
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
              🌳
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: 800,
                lineHeight: 1.35,
              }}
            >
              Zásah JPO Dukovany
            </h2>

            <p
              style={{
                marginTop: "22px",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#374151",
              }}
            >
              Jednotka JPO Dukovany vyjela k oznámenému doutnajícímu stromu
              v lokalitě Loučky.
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
              ["🚒", "Jednotka JPO Dukovany dorazila na místo jako první."],
              ["👨‍🚒", "Na místě zasahovalo 6 členů jednotky."],
              [
                "🔥",
                "Hasiči provedli hasební zásah dutiny ve stromu, ve které docházelo k doutnání.",
              ],
              [
                "👀",
                "Jednotka JPO I Hrotovice byla také vyslána a situaci na místě pouze monitorovala.",
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
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "14px",
              }}
            >
              {galleryImages.map((image, index) => (
                <div
                  key={image}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "clamp(150px, 42vw, 190px)",
                    borderRadius: "22px",
                    overflow: "hidden",
                    background: "#f3f4f6",
                  }}
                >
                  <Image
                    src={image}
                    alt={`Doutnající strom Loučky ${index + 1}`}
                    fill
                    loading="lazy"
                    quality={65}
                    sizes="(max-width: 640px) 50vw, 220px"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center 65%",
                    }}
                  />
                </div>
              ))}
            </div>

            <a
              href="/jpo/galerie/doutnajici-strom-loucky/fotky"
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