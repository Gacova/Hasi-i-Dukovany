"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function AdminPage() {
  const router = useRouter();

  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [group, setGroup] = useState("Muži");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [hoverLogout, setHoverLogout] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    checkLogin();
    loadMembers();
  }, []);

  async function checkLogin() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) router.push("/admin/login");
  }

  async function loadMembers() {
    const { data } = await supabase
      .from("members")
      .select("*")
      .eq("section", "SDH")
      .order("created_at", { ascending: true });

    setMembers(data || []);
  }

  async function handleSave() {
    if (!name || !role) return;

    if (editingId) {
      await supabase
        .from("members")
        .update({ name, role, group })
        .eq("id", editingId);
    } else {
      await supabase.from("members").insert([
        { name, role, group, section: "SDH" },
      ]);
    }

    setName("");
    setRole("");
    setGroup("Muži");
    setEditingId(null);
    loadMembers();
  }

  function startEdit(member: Member) {
    setEditingId(member.id);
    setName(member.name);
    setRole(member.role);
    setGroup(member.group);
  }

  function cancelEdit() {
    setEditingId(null);
    setName("");
    setRole("");
    setGroup("Muži");
  }

  async function handleDelete(id: string) {
    if (!confirm("Opravdu chceš smazat tohoto člena?")) return;

    await supabase.from("members").delete().eq("id", id);
    loadMembers();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  const filteredMembers = members.filter((member) =>
    `${member.name} ${member.role} ${member.group}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main style={{ background: "white", padding: "56px 24px" }}>
      <section
        style={{
          maxWidth: "620px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        {/* FORM */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Administrace</h1>

            <button
              onClick={handleLogout}
              onMouseEnter={() => setHoverLogout(true)}
              onMouseLeave={() => setHoverLogout(false)}
              style={{
                padding: "6px 10px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                color: hoverLogout ? "#171717" : "#737373",
                backgroundColor: hoverLogout ? "#f5f5f5" : "transparent",
                transition: "all 150ms ease",
              }}
            >
              Odhlásit se
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <input placeholder="Jméno" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
            <input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle} />

            <select value={group} onChange={(e) => setGroup(e.target.value)} style={inputStyle}>
              <option>Muži</option>
              <option>Ženy</option>
              <option>Mládež</option>
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
                color: "white",
                backgroundColor: "#b91c1c",
                cursor: "pointer",
              }}
            >
              {editingId ? "Uložit úpravu" : "Přidat člena"}
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
                  backgroundColor: "#f5f5f5",
                  cursor: "pointer",
                }}
              >
                Zrušit úpravu
              </button>
            )}
          </div>
        </div>

        {/* LIST */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-red-700">Členové SDH</h2>

          <input
            type="text"
            placeholder="Vyhledat člena..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle, marginBottom: "20px" }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: "16px",
                  backgroundColor: hoveredId === member.id ? "#f9fafb" : "white",
                  boxShadow: hoveredId === member.id ? "0 10px 20px rgba(0,0,0,0.08)" : "none",
                  transition: "all 150ms ease",
                }}
              >
                <div>
                  <p style={{ fontWeight: 700 }}>{member.name}</p>
                  <p style={{ fontSize: "14px", color: "#666" }}>
                    {member.group} · {member.role}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => startEdit(member)}
                    onMouseEnter={() => setHoveredButton(`edit-${member.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "999px",
                      backgroundColor:
                        hoveredButton === `edit-${member.id}` ? "#b91c1c" : "#fee2e2",
                      color:
                        hoveredButton === `edit-${member.id}` ? "white" : "#b91c1c",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Upravit
                  </button>

                  <button
                    onClick={() => handleDelete(member.id)}
                    onMouseEnter={() => setHoveredButton(`delete-${member.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "999px",
                      backgroundColor:
                        hoveredButton === `delete-${member.id}` ? "#404040" : "#f5f5f5",
                      color:
                        hoveredButton === `delete-${member.id}` ? "white" : "#404040",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Smazat
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}