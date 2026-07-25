"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Member = {
  id: string;
  name: string;
  group: string | null;
  role: string | null;
  section: string | null;
  birth_date: string;
};

type BirthdayMember = Member & {
  nextBirthday: Date;
  daysUntil: number;
  age: number;
};

export default function NarozeninyPage() {
  const router = useRouter();

  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [sectionFilter, setSectionFilter] = useState("Všichni");

  useEffect(() => {
    initializePage();
  }, []);

  async function initializePage() {
    setLoading(true);
    setErrorMessage("");

    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      router.push("/admin/login");
      return;
    }

    await loadMembers();
    setLoading(false);
  }

  async function loadMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("id, name, group, role, section, birth_date")
      .not("birth_date", "is", null);

    if (error) {
      console.error("Chyba při načítání narozenin:", error);
      setErrorMessage("Narozeniny se nepodařilo načíst.");
      return;
    }

    setMembers((data || []) as Member[]);
  }

  function getBirthdayInformation(member: Member): BirthdayMember {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [birthYear, birthMonth, birthDay] = member.birth_date
      .split("-")
      .map(Number);

    let nextBirthday = new Date(
      today.getFullYear(),
      birthMonth - 1,
      birthDay
    );

    nextBirthday.setHours(0, 0, 0, 0);

    if (nextBirthday < today) {
      nextBirthday = new Date(
        today.getFullYear() + 1,
        birthMonth - 1,
        birthDay
      );
    }

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const daysUntil = Math.round(
      (nextBirthday.getTime() - today.getTime()) /
        millisecondsPerDay
    );

    const age =
      nextBirthday.getFullYear() -
      birthYear;

    return {
      ...member,
      nextBirthday,
      daysUntil,
      age,
    };
  }

  const birthdayMembers = useMemo(() => {
    return members
      .map(getBirthdayInformation)
      .filter((member) => {
        const normalizedSearch = search.trim().toLowerCase();

        const matchesSearch =
          normalizedSearch.length === 0 ||
          member.name.toLowerCase().includes(normalizedSearch);

        const matchesSection =
          sectionFilter === "Všichni" ||
          member.section === sectionFilter;

        return matchesSearch && matchesSection;
      })
      .sort((a, b) => a.daysUntil - b.daysUntil);
  }, [members, search, sectionFilter]);

  const upcomingBirthdays = birthdayMembers.filter(
    (member) => member.daysUntil <= 30
  );

  const birthdaysToday = birthdayMembers.filter(
    (member) => member.daysUntil === 0
  );

  function formatBirthdayDate(date: Date) {
    return new Intl.DateTimeFormat("cs-CZ", {
      day: "numeric",
      month: "long",
    }).format(date);
  }

  function formatFullBirthDate(date: string) {
    return new Intl.DateTimeFormat("cs-CZ", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
  }

  function getDaysText(days: number) {
    if (days === 0) {
      return "Dnes";
    }

    if (days === 1) {
      return "Zítra";
    }

    if (days <= 4) {
      return `Za ${days} dny`;
    }

    return `Za ${days} dní`;
  }

  function getAgeText(age: number) {
    if (age === 1) {
      return "1 rok";
    }

    if (age >= 2 && age <= 4) {
      return `${age} roky`;
    }

    return `${age} let`;
  }

  function getSectionStyle(section: string | null) {
    if (section === "JPO") {
      return {
        background: "#dbeafe",
        color: "#1d4ed8",
      };
    }

    return {
      background: "#fee2e2",
      color: "#b91c1c",
    };
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "60px 24px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            style={{
              color: "#6b7280",
              fontSize: "18px",
            }}
          >
            Načítám narozeniny...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#111827",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "34px 24px 80px",
        }}
      >
        <a
          href="/admin"
          style={{
            color: "#dc2626",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: 800,
          }}
        >
          ← Zpět do administrace
        </a>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <div
              style={{
                color: "#dc2626",
                fontSize: "15px",
                fontWeight: 900,
                marginBottom: "8px",
              }}
            >
              🎂 Přehled členů
            </div>

            <h1
              style={{
                margin: 0,
                fontSize: "clamp(38px, 7vw, 58px)",
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: "-1.5px",
              }}
            >
              Narozeniny
            </h1>

            <p
              style={{
                margin: "14px 0 0",
                color: "#6b7280",
                fontSize: "17px",
                lineHeight: 1.6,
              }}
            >
              Přehled nejbližších narozenin členů SDH a JPO Dukovany.
            </p>
          </div>

          <div
            style={{
              borderRadius: "18px",
              padding: "17px 20px",
              background: birthdaysToday.length > 0
                ? "#fef3c7"
                : "#ffffff",
              border: birthdaysToday.length > 0
                ? "1px solid #fbbf24"
                : "1px solid #e5e7eb",
              boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                color: "#6b7280",
                fontSize: "12px",
                fontWeight: 800,
              }}
            >
              DNES SLAVÍ
            </div>

            <div
              style={{
                marginTop: "5px",
                fontSize: "28px",
                fontWeight: 900,
                color: birthdaysToday.length > 0
                  ? "#a16207"
                  : "#111827",
              }}
            >
              {birthdaysToday.length}
            </div>
          </div>
        </div>

        {errorMessage && (
          <div
            style={{
              marginTop: "22px",
              padding: "14px 16px",
              borderRadius: "14px",
              background: "#fee2e2",
              color: "#991b1b",
              fontWeight: 800,
            }}
          >
            {errorMessage}
          </div>
        )}

        {birthdaysToday.length > 0 && (
          <section
            style={{
              marginTop: "28px",
              padding: "24px",
              borderRadius: "22px",
              background: "#fffbeb",
              border: "1px solid #fcd34d",
              boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: 900,
                color: "#92400e",
              }}
            >
              🎉 Dnes slaví narozeniny
            </h2>

            <div
              style={{
                marginTop: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {birthdaysToday.map((member) => (
                <div
                  key={member.id}
                  style={{
                    background: "#ffffff",
                    borderRadius: "14px",
                    padding: "14px 16px",
                    fontWeight: 900,
                    color: "#111827",
                  }}
                >
                  {member.name} – dnes má {getAgeText(member.age)}
                </div>
              ))}
            </div>
          </section>
        )}

        <section
          style={{
            marginTop: "28px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "22px",
            padding: "24px",
            boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
          }}
        >
          <div
            className="filter-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) 220px",
              gap: "14px",
            }}
          >
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Hledat podle jména..."
              style={{
                width: "100%",
                border: "1px solid #d1d5db",
                borderRadius: "14px",
                padding: "13px 15px",
                fontSize: "15px",
                background: "#ffffff",
                color: "#111827",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <select
              value={sectionFilter}
              onChange={(event) =>
                setSectionFilter(event.target.value)
              }
              style={{
                width: "100%",
                border: "1px solid #d1d5db",
                borderRadius: "14px",
                padding: "13px 15px",
                fontSize: "15px",
                background: "#ffffff",
                color: "#111827",
                outline: "none",
              }}
            >
              <option value="Všichni">Všichni členové</option>
              <option value="SDH">Pouze SDH</option>
              <option value="JPO">Pouze JPO</option>
            </select>
          </div>
        </section>

        <section
          style={{
            marginTop: "22px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "22px",
            padding: "24px",
            boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "25px",
                  fontWeight: 900,
                }}
              >
                Nejbližších 30 dní
              </h2>

              <p
                style={{
                  margin: "7px 0 0",
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                {upcomingBirthdays.length} narozenin
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "11px",
            }}
          >
            {upcomingBirthdays.length === 0 ? (
              <p
                style={{
                  margin: 0,
                  color: "#9ca3af",
                  lineHeight: 1.6,
                }}
              >
                V příštích 30 dnech nikdo narozeniny nemá.
              </p>
            ) : (
              upcomingBirthdays.map((member) => (
                <BirthdayCard
                  key={member.id}
                  member={member}
                  getDaysText={getDaysText}
                  getAgeText={getAgeText}
                  formatBirthdayDate={formatBirthdayDate}
                  formatFullBirthDate={formatFullBirthDate}
                  getSectionStyle={getSectionStyle}
                  highlighted
                />
              ))
            )}
          </div>
        </section>

        <section
          style={{
            marginTop: "22px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "22px",
            padding: "24px",
            boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "25px",
                fontWeight: 900,
              }}
            >
              Všechny narozeniny
            </h2>

            <p
              style={{
                margin: "7px 0 0",
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              Seřazeno podle nejbližšího data.
            </p>
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "11px",
            }}
          >
            {birthdayMembers.length === 0 ? (
              <p
                style={{
                  margin: 0,
                  color: "#9ca3af",
                  lineHeight: 1.6,
                }}
              >
                Nebyl nalezen žádný člen.
              </p>
            ) : (
              birthdayMembers.map((member) => (
                <BirthdayCard
                  key={member.id}
                  member={member}
                  getDaysText={getDaysText}
                  getAgeText={getAgeText}
                  formatBirthdayDate={formatBirthdayDate}
                  formatFullBirthDate={formatFullBirthDate}
                  getSectionStyle={getSectionStyle}
                />
              ))
            )}
          </div>
        </section>
      </div>

      <style jsx>{`
        @media (max-width: 700px) {
          .filter-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}

function BirthdayCard({
  member,
  getDaysText,
  getAgeText,
  formatBirthdayDate,
  formatFullBirthDate,
  getSectionStyle,
  highlighted = false,
}: {
  member: BirthdayMember;
  getDaysText: (days: number) => string;
  getAgeText: (age: number) => string;
  formatBirthdayDate: (date: Date) => string;
  formatFullBirthDate: (date: string) => string;
  getSectionStyle: (
    section: string | null
  ) => {
    background: string;
    color: string;
  };
  highlighted?: boolean;
}) {
  const sectionStyle = getSectionStyle(member.section);

  return (
    <article
      style={{
        display: "grid",
        gridTemplateColumns: "auto minmax(0, 1fr) auto",
        alignItems: "center",
        gap: "15px",
        padding: "16px",
        borderRadius: "16px",
        border: highlighted
          ? "1px solid #fecaca"
          : "1px solid #e5e7eb",
        background: highlighted ? "#fff7f7" : "#fafafa",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: highlighted ? "#fee2e2" : "#ffffff",
          fontSize: "25px",
          flexShrink: 0,
        }}
      >
        🎂
      </div>

      <div style={{ minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <strong
            style={{
              fontSize: "16px",
              fontWeight: 900,
              overflowWrap: "anywhere",
            }}
          >
            {member.name}
          </strong>

          <span
            style={{
              borderRadius: "999px",
              padding: "5px 9px",
              background: sectionStyle.background,
              color: sectionStyle.color,
              fontSize: "11px",
              fontWeight: 900,
            }}
          >
            {member.section || "SDH"}
          </span>

          {member.group && (
            <span
              style={{
                borderRadius: "999px",
                padding: "5px 9px",
                background: "#f3f4f6",
                color: "#4b5563",
                fontSize: "11px",
                fontWeight: 800,
              }}
            >
              {member.group}
            </span>
          )}
        </div>

        <div
          style={{
            marginTop: "6px",
            color: "#6b7280",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          {formatBirthdayDate(member.nextBirthday)} · narozen/a{" "}
          {formatFullBirthDate(member.birth_date)} · bude mít{" "}
          {getAgeText(member.age)}
        </div>
      </div>

      <div
        style={{
          borderRadius: "12px",
          padding: "9px 11px",
          background:
            member.daysUntil === 0
              ? "#fef3c7"
              : highlighted
              ? "#fee2e2"
              : "#ffffff",
          color:
            member.daysUntil === 0
              ? "#a16207"
              : highlighted
              ? "#b91c1c"
              : "#4b5563",
          fontSize: "12px",
          fontWeight: 900,
          whiteSpace: "nowrap",
        }}
      >
        {getDaysText(member.daysUntil)}
      </div>
    </article>
  );
}