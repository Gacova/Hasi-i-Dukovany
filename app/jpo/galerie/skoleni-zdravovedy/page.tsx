import Image from "next/image";
import BackLink from "@/components/BackLink";

export default function SkoleniZdravovedyPage() {
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
              color: "#111827",
              letterSpacing: "-1.5px",
            }}
          >
            Školení zdravotní přípravy
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
              🚑
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: 800,
                lineHeight: 1.35,
              }}
            >
              Odborná příprava členů JPO
            </h2>

            <p
              style={{
                marginTop: "22px",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "#374151",
              }}
            >
              Pravidelné vzdělávání pomáhá členům jednotky udržovat znalosti a
              připravenost pro zásahy i mimořádné události.
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
                "🩺",
                "Členové jednotky absolvovali školení zdravotní přípravy zaměřené na poskytování první pomoci.",
              ],
              [
                "🚨",
                "Součástí byla praktická cvičení a řešení situací, se kterými se mohou setkat během zásahů.",
              ],
              [
                "📚",
                "Procvičeny byly základní postupy první pomoci a správné vyhodnocení zdravotního stavu postiženého.",
              ],
              [
                "🤝",
                "Pravidelné školení pomáhá udržovat připravenost jednotky k pomoci občanům v případě potřeby.",
              ],
            ].map(([icon, text], index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "22px",
                  alignItems: "center",
                  borderBottom:
                    index === 3 ? "none" : "1px solid #f3f4f6",
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
                position: "relative",
                width: "100%",
                height: "clamp(260px, 45vw, 430px)",
                borderRadius: "28px",
                overflow: "hidden",
                background: "#f3f4f6",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <Image
                src="/skoleni-zdravovedy/IMG-20260605-WA0039.jpg"
                alt="Školení zdravotní přípravy"
                fill
                quality={75}
                sizes="(max-width: 768px) 100vw, 500px"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>

            <a
              href="/jpo/galerie/skoleni-zdravovedy/fotky"
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
              Zobrazit galerii →
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}