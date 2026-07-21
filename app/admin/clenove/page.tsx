"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SectionType = "SDH" | "JPO";

type Member = {
  id: string;
  name: string;
  role: string;
  group: string;
  section: string;
};

const inputStyle = {
  width: "100%",
  borderRadius: "14px",
  border: "1px solid #d4d4d4",
  padding: "13px 18px",
  fontSize: "16px",
  color: "#171717",
  backgroundColor: "#fafafa",
  outline: "none",
  boxSizing: "border-box" as const,
};

export default function AdminClenovePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);

  const [selectedSection, setSelectedSection] =
    useState<SectionType>("SDH");

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [group, setGroup] = useState("Muži");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("Všichni");

  const sdhGroups = ["Muži", "Ženy", "Mládež"];

  const jpoGroups = [
    "Vedení jednotky",
    "Strojníci",
    "Technické funkce",
    "Hasiči",
  ];

  const availableGroups =
    selectedSection === "SDH" ? sdhGroups : jpoGroups;

  const filterOptions = ["Všichni", ...availableGroups];

  useEffect(() => {
    checkLoginAndLoad();
  }, []);

  async function checkLoginAndLoad() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      router.push("/admin/login");
      return;
    }

    await loadMembers();
    setLoading(false);
  }

  async function loadMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Chyba při načítání členů:", error);
      return;
    }

    setMembers(data || []);
  }

  async function handleSave() {
    if (!name.trim() || !role.trim()) {
      alert("Vyplň jméno a funkci člena.");
      return;
    }

    if (editingId) {
      const { error } = await supabase
        .from("members")
        .update({
          name: name.trim(),
          role: role.trim(),
          group,
          section: selectedSection,
        })
        .eq("id", editingId);

      if (error) {
        console.error("Chyba při úpravě člena:", error);
        alert("Člena se nepodařilo upravit.");
        return;
      }
    } else {
      const { error } = await supabase.from("members").insert([
        {
          name: name.trim(),
          role: role.trim(),
          group,
          section: selectedSection,
        },
      ]);

      if (error) {
        console.error("Chyba při přidávání člena:", error);
        alert("Člena se nepodařilo přidat.");
        return;
      }
    }

    resetForm();
    await loadMembers();
  }

  function startEdit(member: Member) {
    const memberSection: SectionType =
      member.section === "JPO" ? "JPO" : "SDH";

    setSelectedSection(memberSection);
    setEditingId(member.id);
    setName(member.name);
    setRole(member.role);
    setGroup(member.group);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function resetForm(section: SectionType = selectedSection) {
    setEditingId(null);
    setName("");
    setRole("");

    if (section === "SDH") {
      setGroup("Muži");
    } else {
      setGroup("Vedení jednotky");
    }
  }

  function cancelEdit() {
    resetForm();
  }

  function changeSection(section: SectionType) {
    setSelectedSection(section);
    setSearch("");
    setGroupFilter("Všichni");
    resetForm(section);
  }

  async function handleDelete(id: string) {
    if (!confirm("Opravdu chceš smazat tohoto člena?")) {
      return;
    }

    const { error } = await supabase
      .from("members")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Chyba při mazání člena:", error);
      alert("Člena se nepodařilo smazat.");
      return;
    }

    if (editingId === id) {
      resetForm();
    }

    await loadMembers();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const sectionMembers = members.filter(
    (member) => member.section === selectedSection
  );

  const sdhCount = members.filter(
    (member) => member.section === "SDH"
  ).length;

  const jpoCount = members.filter(
    (member) => member.section === "JPO"
  ).length;

  const filteredMembers = sectionMembers.filter((member) => {
    const matchesGroup =
      groupFilter === "Všichni" || member.group === groupFilter;

    const searchedText =
      `${member.name} ${member.role} ${member.group}`.toLowerCase();

    const matchesSearch = searchedText.includes(
      search.trim().toLowerCase()
    );

    return matchesGroup && matchesSearch;
  });

  function getGroupCount(selectedGroup: string) {
    if (selectedGroup === "Všichni") {
      return sectionMembers.length;
    }

    return sectionMembers.filter(
      (member) => member.group === selectedGroup
    ).length;
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#ffffff",
          padding: "56px 24px",
        }}
      >
        <section style={{ maxWidth: "620px", margin: "0 auto" }}>
          <p>Ověřuji přihlášení...</p>
        </section>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        padding: "56px 24px",
      }}
    >
      <section
        style={{
          maxWidth: "620px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <a
          href="/admin"
          style={{
            color: "#b91c1c",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          ← Zpět do administrace
        </a>

        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold">Správa členů</h1>

            <button
              onClick={handleLogout}
              style={{
                background: "#b91c1c",
                color: "#ffffff",
                border: "none",
                borderRadius: "999px",
                padding: "10px 18px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 18px rgba(185,28,28,0.18)",
                flexShrink: 0,
              }}
            >
              Odhlásit se
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "10px",
              marginBottom: "18px",
            }}
          >
            <button
              onClick={() => changeSection("SDH")}
              style={{
                border:
                  selectedSection === "SDH"
                    ? "1px solid #b91c1c"
                    : "1px solid #e5e5e5",
                borderRadius: "14px",
                padding: "12px 10px",
                fontSize: "15px",
                fontWeight: 800,
                color:
                  selectedSection === "SDH"
                    ? "#ffffff"
                    : "#404040",
                backgroundColor:
                  selectedSection === "SDH"
                    ? "#b91c1c"
                    : "#f5f5f5",
                cursor: "pointer",
              }}
            >
              SDH ({sdhCount})
            </button>

            <button
              onClick={() => changeSection("JPO")}
              style={{
                border:
                  selectedSection === "JPO"
                    ? "1px solid #b91c1c"
                    : "1px solid #e5e5e5",
                borderRadius: "14px",
                padding: "12px 10px",
                fontSize: "15px",
                fontWeight: 800,
                color:
                  selectedSection === "JPO"
                    ? "#ffffff"
                    : "#404040",
                backgroundColor:
                  selectedSection === "JPO"
                    ? "#b91c1c"
                    : "#f5f5f5",
                cursor: "pointer",
              }}
            >
              JPO ({jpoCount})
            </button>
          </div>

          <div
            style={{
              marginBottom: "18px",
              padding: "12px 16px",
              borderRadius: "14px",
              backgroundColor: "#fff7f7",
              color: "#b91c1c",
              fontSize: "15px",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            {editingId ? "Upravuješ člena" : "Přidáváš člena"}:{" "}
            {selectedSection}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <input
              placeholder="Jméno"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder={
                selectedSection === "SDH"
                  ? "Role"
                  : "Funkce v jednotce"
              }
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={inputStyle}
            />

            <select
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              style={inputStyle}
            >
              {availableGroups.map((groupOption) => (
                <option key={groupOption} value={groupOption}>
                  {groupOption}
                </option>
              ))}
            </select>

            <button
              onClick={handleSave}
              style={{
                width: "100%",
                borderRadius: "14px",
                border: "none",
                padding: "13px 18px",
                fontSize: "16px",
                fontWeight: 700,
                color: "#ffffff",
                backgroundColor: "#b91c1c",
                cursor: "pointer",
              }}
            >
              {editingId
                ? "Uložit úpravu"
                : `Přidat člena do ${selectedSection}`}
            </button>

            {editingId && (
              <button
                onClick={cancelEdit}
                style={{
                  width: "100%",
                  borderRadius: "14px",
                  border: "none",
                  padding: "13px 18px",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#404040",
                  backgroundColor: "#f5f5f5",
                  cursor: "pointer",
                }}
              >
                Zrušit úpravu
              </button>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-red-700">
            Členové {selectedSection}
          </h2>

          <input
            type="text"
            placeholder={`Vyhledat člena ${selectedSection}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              ...inputStyle,
              marginBottom: "16px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "22px",
            }}
          >
            {filterOptions.map((option) => {
              const isActive = groupFilter === option;

              return (
                <button
                  key={option}
                  onClick={() => setGroupFilter(option)}
                  style={{
                    border: isActive
                      ? "1px solid #b91c1c"
                      : "1px solid #e5e5e5",
                    borderRadius: "999px",
                    padding: "9px 14px",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: isActive ? "#ffffff" : "#404040",
                    backgroundColor: isActive
                      ? "#b91c1c"
                      : "#f5f5f5",
                    cursor: "pointer",
                  }}
                >
                  {option} ({getGroupCount(option)})
                </button>
              );
            })}
          </div>

          <p
            style={{
              marginBottom: "12px",
              fontSize: "14px",
              color: "#737373",
            }}
          >
            Zobrazeno členů: {filteredMembers.length}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {filteredMembers.length === 0 ? (
              <div
                style={{
                  padding: "22px 16px",
                  borderRadius: "16px",
                  textAlign: "center",
                  color: "#737373",
                  backgroundColor: "#fafafa",
                }}
              >
                V této skupině zatím nejsou žádní členové.
              </div>
            ) : (
              filteredMembers.map((member) => (
                <div
                  key={member.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "14px",
                    padding: "14px 12px",
                    borderRadius: "16px",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 700,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {member.name}
                    </p>

                    <p
                      style={{
                        margin: "3px 0 0",
                        fontSize: "14px",
                        color: "#666666",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {member.group} · {member.role}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexShrink: 0,
                      gap: "8px",
                    }}
                  >
                    <button
                      onClick={() => startEdit(member)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "999px",
                        backgroundColor: "#fee2e2",
                        color: "#b91c1c",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Upravit
                    </button>

                    <button
                      onClick={() => handleDelete(member.id)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "999px",
                        backgroundColor: "#f5f5f5",
                        color: "#404040",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Smazat
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}