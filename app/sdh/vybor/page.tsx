import BackLink from "@/components/BackLink";

export default function VyborPage() {
  const committeeMembers = [
    { name: "Marcela Vrbková", role: "Starostka SDH", email: "mail", image: "/20260531_103645.jpg" },
    { name: "Jan Vrbka", role: "1. náměstek starostky", email: "mail", image: "/20260531_103736.jpg" },
    { name: "Bc. Pavel Stuchlík, DiS.", role: "Velitel JPO", email: "mail", image: "/pavel.jpg" },
    { name: "Ing. Lukáš Seidl", role: "Hospodář", email: "mail" },
    { name: "Kristýna Gacova", role: "Vedoucí mládeže", email: "gacova@centrum.cz", image: "/gacova.jpg" },
    { name: "Vladimír Troščák", role: "Člen výboru", email: "mail", image: "/IMG-20260531-WA0010.jpg" },
    { name: "Tomáš Vorel", role: "Člen výboru", email: "mail", image: "/20260531_171357.jpg" },
  ];

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
          padding: "34px 24px 70px",
        }}
      >
        <BackLink href="/sdh">Zpět na SDH</BackLink>

        <h1
          style={{
            marginTop: "28px",
            marginBottom: "18px",
            fontSize: "clamp(42px, 9vw, 64px)",
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: "-1.5px",
          }}
        >
          Výbor <span style={{ color: "#dc2626" }}>SDH</span>{" "}
          <span style={{ color: "#111827" }}>Dukovany</span>
        </h1>

        <p
          style={{
            marginBottom: "38px",
            fontSize: "clamp(17px, 4vw, 20px)",
            lineHeight: 1.6,
            color: "#6b7280",
            maxWidth: "620px",
          }}
        >
          Přehled členů výboru SDH a jejich funkcí.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "22px",
          }}
        >
          {committeeMembers.map((member) => (
            <div
              key={member.name}
              style={{
                background: "#ffffff",
                border: "1px solid #ececec",
                borderRadius: "26px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "clamp(280px, 70vw, 360px)",
                  background: "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px",
                }}
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                ) : (
                  <div style={{ color: "#9ca3af", fontSize: "16px" }}>
                    Fotka člena
                  </div>
                )}
              </div>

              <div style={{ padding: "22px", textAlign: "center" }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 800,
                    lineHeight: 1.4,
                    color: "#111827",
                  }}
                >
                  {member.name}
                </h2>

                <p style={{ marginTop: "10px", fontSize: "16px", color: "#6b7280" }}>
                  {member.role}
                </p>

                {member.email !== "mail" && (
                  <p
                    style={{
                      marginTop: "14px",
                      fontSize: "15px",
                      color: "#dc2626",
                      wordBreak: "break-word",
                    }}
                  >
                    {member.email}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}