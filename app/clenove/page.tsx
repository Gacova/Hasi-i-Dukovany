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
      {/* zbytek tvého původního formuláře */}
    </main>
  );
}