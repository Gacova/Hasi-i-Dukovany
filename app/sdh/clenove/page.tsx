"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import BackLink from "@/components/BackLink";

type Member = {
  id: string;
  group: string;
  section: string;
};

export default function ClenovePage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("members")
      .select("id, group, section")
      .eq("section", "SDH");

    if (error) {
      console.error("Chyba při načítání členů:", error);
      setLoading(false);
      return;
    }

    setMembers(data || []);
    setLoading(false);
  }

  const totalCount = members.length;

  const menCount = members.filter(
    (member) => member.group === "Muži"
  ).length;

  const womenCount = members.filter(
    (member) => member.group === "Ženy"
  ).length;

  const youthCount = members.filter(
    (member) => member.group === "Mládež"
  ).length;

  const statistics = [
    {
      title: "Celkem členů",
      count: totalCount,
      description: "Celkový počet členů SDH Dukovany",
      background: "#fff7f7",
      color: "#dc2626",
    },
    {
      title: "Muži",
      count: menCount,
      description: "Počet mužů ve sboru",
      background: "#f3f4f6",
      color: "#111827",
    },
    {
      title: "Ženy",
      count: womenCount,
      description: "Počet žen ve sboru",
      background: "#f3f4f6",
      color: "#111827",
    },
    {
      title: "Mladí hasiči",
      count: youthCount,
      description: "Počet členů mládeže",
      background: "#f3f4f6",
      color: "#111827",
    },
  ];

  return (
    <main
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        padding: "34px 24px 70px",
      }}
    >
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
            marginBottom: "42px",
            color: "#111827",
          }}
        >
          SDH Dukovany tvoří dospělí členové i mladí hasiči. Z důvodu ochrany
          soukromí zde zveřejňujeme pouze celkové počty členů jednotlivých
          skupin.
        </p>

        {loading ? (
          <div
            style={{
              border: "1px solid #ececec",
              borderRadius: "28px",
              padding: "40px 24px",
              textAlign: "center",
              color: "#6b7280",
              fontSize: "18px",
              background: "#ffffff",
              boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
            }}
          >
            Načítám počet členů...
          </div>
        ) : (
          <section
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
              gap: "22px",
            }}
          >
            {statistics.map((item) => (
              <div
                key={item.title}
                style={{
                  border: "1px solid #ececec",
                  borderRadius: "28px",
                  padding: "30px 26px",
                  background: item.background,
                  boxShadow: "0 12px 30px rgba(0,0,0,0.05)",
                  minHeight: "210px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "clamp(22px, 5vw, 28px)",
                    fontWeight: 800,
                    color: item.color,
                  }}
                >
                  {item.title}
                </h2>

                <div>
                  <div
                    style={{
                      fontSize: "clamp(58px, 12vw, 82px)",
                      lineHeight: 1,
                      fontWeight: 900,
                      color: item.color,
                      marginBottom: "16px",
                    }}
                  >
                    {item.count}
                  </div>

                  <p
                    style={{
                      margin: 0,
                      color: "#6b7280",
                      fontSize: "16px",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
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