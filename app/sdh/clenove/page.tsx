"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import BackLink from "@/components/BackLink";

type Member = {
  id: string;
  name: string;
  role: string;
  group: string;
  section: string;
};

export default function ClenovePage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [activeGroup, setActiveGroup] = useState("Muži");

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("section", "SDH")
      .order("created_at", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setMembers(data || []);
  }

  const groups = ["Muži", "Ženy", "Mládež"];
  const filteredMembers = members.filter((member) => member.group === activeGroup);

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh", padding: "34px 24px 70px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <BackLink href="/sdh">Zpět na SDH</BackLink>

        <h1
          style={{
            fontSize: "clamp(42px, 9vw, 64px)",
            lineHeight: 1.05,
            fontWeight: 800,
            marginTop: "28px",
            marginBottom: "20px",
            letterSpacing: "-1.5px",
            color: "#111827",
          }}
        >
          Členové <span style={{ color: "#dc2626" }}>SDH</span> Dukovany
        </h1>

        <p
          style={{
            fontSize: "clamp(17px, 4vw, 22px)",
            lineHeight: 1.7,
            maxWidth: "850px",
            marginBottom: "34px",
            color: "#111827",
          }}
        >
          Náš sbor tvoří dospělí členové, ženy i mladí hasiči. Společně
          trénujeme, pomáháme při akcích a vytváříme komunitu, která drží při
          sobě.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
            gap: "12px",
            marginBottom: "32px",
            maxWidth: "620px",
          }}
        >
          {groups.map((group) => {
            const count = members.filter((m) => m.group === group).length;
            const isActive = activeGroup === group;

            return (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "999px",
                  padding: "14px 18px",
                  fontSize: "clamp(16px, 4vw, 20px)",
                  fontWeight: 800,
                  cursor: "pointer",
                  background: isActive ? "#dc2626" : "#ffffff",
                  color: isActive ? "#ffffff" : "#111827",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                  whiteSpace: "nowrap",
                }}
              >
                {group} ({count})
              </button>
            );
          })}
        </div>

        <section
          style={{
            border: "1px solid #ececec",
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
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
              {activeGroup}
            </h2>
          </div>

          {filteredMembers.length === 0 ? (
            <div style={{ padding: "28px", color: "#6b7280", fontSize: "16px" }}>
              V této skupině zatím nejsou žádní členové.
            </div>
          ) : (
            filteredMembers.map((member, index) => (
              <div
                key={member.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  padding: "22px 24px",
                  borderBottom:
                    index === filteredMembers.length - 1 ? "none" : "1px solid #f3f4f6",
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
                  {index + 1}
                </div>

                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "clamp(18px, 5vw, 22px)",
                      fontWeight: 800,
                      lineHeight: 1.3,
                      color: "#111827",
                    }}
                  >
                    {member.name}
                  </h3>

                  {member.role && (
                    <p style={{ marginTop: "6px", color: "#6b7280", fontSize: "15px" }}>
                      {member.role}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}