import BackLink from "@/components/BackLink";

export default function VyborPage() {
  const committeeMembers = [
    {
      name: "Marcela Vrbková",
      role: "Starostka SDH",
      emails: ["sdhdukovany@seznam.cz"],
      image: "/20260531_103645.jpg",
    },
    {
      name: "Jan Vrbka",
      role: "1. náměstek starostky",
      emails: ["sdhdukovany@seznam.cz"],
      image: "/20260531_103736.jpg",
    },
    {
      name: "Bc. Pavel Stuchlík, DiS.",
      role: "Velitel JPO",
      emails: [
        "sdhdukovany@seznam.cz",
        "hasici@obecdukovany.cz",
      ],
      image: "/pavel.jpg",
    },
    {
      name: "Ing. Lukáš Seidl",
      role: "Hospodář",
      emails: ["sdhdukovany@seznam.cz"],
    },
    {
      name: "Kristýna Gacova",
      role: "Vedoucí mládeže",
      emails: ["sdhdukovany@seznam.cz"],
      image: "/gacova.jpg",
    },
    {
      name: "Vladimír Troščák",
      role: "Člen výboru",
      emails: ["sdhdukovany@seznam.cz"],
      image: "/IMG-20260531-WA0010.jpg",
    },
    {
      name: "Tomáš Vorel",
      role: "Člen výboru",
      emails: ["sdhdukovany@seznam.cz"],
      image: "/20260531_171357.jpg",
    },
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "16px",
                    color: "#6b7280",
                  }}
                >
                  {member.role}
                </p>

                <div style={{ marginTop: "14px" }}>
                  {member.emails.map((email) => (
                    <p
                      key={email}
                      style={{
                        margin: "4px 0",
                        fontSize: "15px",
                        color: "#dc2626",
                        wordBreak: "break-word",
                      }}
                    >
                      {email}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}