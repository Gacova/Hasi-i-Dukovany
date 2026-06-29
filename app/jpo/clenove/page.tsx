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
    <main
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        padding: "40px 32px 80px",
        color: "#111827",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <a
          href="/jpo"
          style={{
            color: "#dc2626",
            textDecoration: "none",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          ← Zpět na JPO
        </a>

        <h1
          style={{
            marginTop: "30px",
            marginBottom: "14px",
            fontSize: "64px",
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          Členové{" "}
          <span style={{ color: "#dc2626" }}>JPO</span>{" "}
          <span style={{ color: "#111827" }}>Dukovany</span>
        </h1>

        <p
          style={{
            fontSize: "22px",
            color: "#6b7280",
            marginBottom: "36px",
          }}
        >
          Seznam členů jednotky s jejich funkcemi v JPO Dukovany.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
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
                  padding: "14px 24px",
                  borderRadius: "999px",
                  background: isActive ? "#dc2626" : "#ffffff",
                  color: isActive ? "#ffffff" : "#374151",
                  border: "1px solid #ececec",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                  fontSize: "18px",
                  fontWeight: 800,
                  cursor: "pointer",
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
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
              background: "#ffffff",
            }}
          >
            <div
              style={{
                background: "#fff7f7",
                padding: "22px 28px",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#dc2626",
                }}
              >
                {selectedSection.title}
              </h2>
            </div>

            <div>
              {selectedSection.members.map((member, index) => (
                <div
                  key={member.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "70px 1fr 1fr",
                    gap: "20px",
                    alignItems: "center",
                    padding: "20px 28px",
                    borderBottom:
                      index === selectedSection.members.length - 1
                        ? "none"
                        : "1px solid #f3f4f6",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "999px",
                      background: "#fff1f2",
                      color: "#dc2626",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                    }}
                  >
                    {index + 1}.
                  </div>

                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 800,
                    }}
                  >
                    {member.name}
                  </div>

                  <div
                    style={{
                      fontSize: "19px",
                      color: "#6b7280",
                    }}
                  >
                    {member.role}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}