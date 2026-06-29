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

  const filteredMembers = members.filter(
    (member) => member.group === activeGroup
  );

  return (
    <main
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        padding: "50px 32px 90px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <BackLink href="/sdh">Zpět na SDH</BackLink>

        <h1
          style={{
            fontSize: "64px",
            fontWeight: 800,
            marginBottom: "24px",
            color: "#111827",
          }}
        >
          Členové <span style={{ color: "#dc2626" }}>SDH</span> Dukovany
        </h1>

        <p
          style={{
            fontSize: "22px",
            lineHeight: 1.7,
            maxWidth: "850px",
            marginBottom: "42px",
            color: "#111827",
          }}
        >
          Náš sbor tvoří dospělí členové, ženy i mladí hasiči. Společně
          trénujeme, pomáháme při akcích a vytváříme komunitu, která drží při
          sobě.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            marginBottom: "34px",
            flexWrap: "wrap",
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
                  padding: "16px 28px",
                  fontSize: "20px",
                  fontWeight: 800,
                  cursor: "pointer",
                  background: isActive ? "#dc2626" : "#ffffff",
                  color: isActive ? "#ffffff" : "#111827",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
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
              padding: "28px",
              borderBottom: "1px solid #f3f4f6",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "34px",
                fontWeight: 800,
                color: "#dc2626",
              }}
            >
              {activeGroup}
            </h2>
          </div>

          {filteredMembers.length === 0 ? (
            <div
              style={{
                padding: "30px",
                color: "#6b7280",
              }}
            >
              V této skupině zatím nejsou žádní členové.
            </div>
          ) : (
            filteredMembers.map((member, index) => (
              <div
                key={member.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "28px",
                  padding: "24px 30px",
                  borderBottom:
                    index === filteredMembers.length - 1
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
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </div>

                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "22px",
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    {member.name}
                  </h3>

                  {member.role && (
                    <p
                      style={{
                        marginTop: "6px",
                        color: "#6b7280",
                        fontSize: "16px",
                      }}
                    >
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