"use client";

import { useState } from "react";

export default function ClenoveJPOPage() {
  const sections = [
    {
      title: "Vedení jednotky",
      members: [
        { name: "Stuchlík Pavel Bc. DiS.", role: "Velitel jednotky" },
        { name: "Seidl Lukáš Ing.", role: "VD - Zástupce VJ" },
      ],
    },
    {
      title: "Strojníci",
      members: [
        { name: "Vrbka Michal st.", role: "Velitel družstva, strojník" },
        { name: "Vorel Tomáš", role: "Strojník" },
        { name: "Pelán Milan", role: "Strojník" },
        { name: "Čurda Aleš", role: "Strojník" },
      ],
    },
    {
      title: "Technické funkce",
      members: [
        { name: "Vrbka Michal ml.", role: "Technik chemické služby" },
        { name: "Vrbka Jan", role: "Technik ochrany obyvatelstva" },
      ],
    },
    {
      title: "Hasiči",
      members: [
        { name: "Fučík Radim", role: "Hasič" },
        { name: "Fojtášek Martin Bc.", role: "Hasič" },
        { name: "Pelán Vladimír", role: "Hasič" },
        { name: "Dvoran Jaromír", role: "Hasič" },
        { name: "Pelán Marek", role: "Hasič" },
        { name: "Fučík Lukáš", role: "Hasič" },
        { name: "Troščák Vladimír", role: "Hasič" },
        { name: "Dočkal Lukáš", role: "Hasič" },
      ],
    },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].title);

  const selectedSection = sections.find(
    (section) => section.title === activeSection
  );

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", color: "#111827" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "34px 24px 70px" }}>
        <a
          href="/jpo"
          style={{
            color: "#dc2626",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: 700,
          }}
        >
          ← Zpět na JPO
        </a>

        <h1
          style={{
            marginTop: "28px",
            marginBottom: "18px",
            fontSize: "clamp(42px, 9vw, 64px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
          }}
        >
          Členové <span style={{ color: "#dc2626" }}>JPO</span>{" "}
          <span style={{ color: "#111827" }}>Dukovany</span>
        </h1>

        <p
          style={{
            fontSize: "clamp(18px, 4vw, 22px)",
            lineHeight: 1.6,
            color: "#6b7280",
            marginBottom: "32px",
            maxWidth: "760px",
          }}
        >
          Seznam členů jednotky s jejich funkcemi v JPO Dukovany.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          {sections.map((section) => {
            const isActive = activeSection === section.title;

            return (
              <button
                key={section.title}
                onClick={() => setActiveSection(section.title)}
                style={{
                  padding: "14px 22px",
                  borderRadius: "999px",
                  background: isActive ? "#dc2626" : "#ffffff",
                  color: isActive ? "#ffffff" : "#374151",
                  border: "1px solid #ececec",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                  fontSize: "16px",
                  fontWeight: 800,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  minWidth: "fit-content",
                }}
              >
                {section.title} ({section.members.length})
              </button>
            );
          })}
        </div>

        {selectedSection && (
          <section
            style={{
              border: "1px solid #ececec",
              borderRadius: "28px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              background: "#ffffff",
            }}
          >
            <div
              style={{
                background: "#fff7f7",
                padding: "24px",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(28px, 7vw, 34px)",
                  fontWeight: 800,
                  color: "#dc2626",
                }}
              >
                {selectedSection.title}
              </h2>
            </div>

            {selectedSection.members.map((member, index) => (
              <div
                key={member.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "44px minmax(0, 1fr)",
                  gap: "16px",
                  alignItems: "start",
                  padding: "22px 24px",
                  borderBottom:
                    index === selectedSection.members.length - 1
                      ? "none"
                      : "1px solid #f3f4f6",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "999px",
                    background: "#fff1f2",
                    color: "#dc2626",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {index + 1}.
                </div>

                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "clamp(19px, 5vw, 22px)",
                      fontWeight: 800,
                      lineHeight: 1.35,
                    }}
                  >
                    {member.name}
                  </h3>

                  <p
                    style={{
                      marginTop: "6px",
                      marginBottom: 0,
                      fontSize: "16px",
                      color: "#6b7280",
                      lineHeight: 1.45,
                    }}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}