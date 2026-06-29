"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Vyjezd = {
  id: string;
  datum: string;
  rok: number;
  typ: string;
  nazev: string;
  popis: string;
};

const typyVyjezdu = [
  "Požár",
  "Technický zásah",
  "Dopravní nehoda",
  "Planý poplach",
  "Taktické cvičení",
  "Ostatní",
];

export default function JpoVyjezdyPage() {
  const router = useRouter();

  const [checkingLogin, setCheckingLogin] = useState(true);
  const [items, setItems] = useState<Vyjezd[]>([]);
  const [datum, setDatum] = useState("");
  const [typ, setTyp] = useState(typyVyjezdu[0]);
  const [nazev, setNazev] = useState("");
  const [popis, setPopis] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    checkLoginAndLoad();
  }, []);

  async function checkLoginAndLoad() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      router.push("/admin/login");
      return;
    }

    await loadVyjezdy();
    setCheckingLogin(false);
  }

  async function loadVyjezdy() {
    const { data } = await supabase
      .from("jpo_vyjezdy")
      .select("*")
      .order("datum", { ascending: false });

    setItems(data || []);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  async function handleSave() {
    if (!datum || !typ || !nazev || !popis) {
      alert("Vyplň datum, typ, název i popis výjezdu.");
      return;
    }

    const rok = new Date(datum).getFullYear();

    if (editingId) {
      await supabase
        .from("jpo_vyjezdy")
        .update({
          datum,
          rok,
          typ,
          nazev,
          popis,
        })
        .eq("id", editingId);
    } else {
      await supabase.from("jpo_vyjezdy").insert([
        {
          datum,
          rok,
          typ,
          nazev,
          popis,
        },
      ]);
    }

    resetForm();
    loadVyjezdy();
  }

  function startEdit(item: Vyjezd) {
    setEditingId(item.id);
    setDatum(item.datum);
    setTyp(item.typ);
    setNazev(item.nazev);
    setPopis(item.popis);
  }

  function resetForm() {
    setEditingId(null);
    setDatum("");
    setTyp(typyVyjezdu[0]);
    setNazev("");
    setPopis("");
  }

  async function handleDelete(id: string) {
    if (!confirm("Opravdu chceš tento výjezd smazat?")) return;

    await supabase.from("jpo_vyjezdy").delete().eq("id", id);
    loadVyjezdy();
  }

  if (checkingLogin) {
    return (
      <main style={{ background: "#fff", minHeight: "100vh", padding: "60px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p>Ověřuji přihlášení...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: "#fff", minHeight: "100vh", padding: "60px 24px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "28px",
          }}
        >
          <a href="/admin" style={backLinkStyle}>
            ← Zpět do administrace
          </a>

          <button onClick={handleLogout} style={logoutButtonStyle}>
            Odhlásit se
          </button>
        </div>

        <h1 style={{ fontSize: "42px", fontWeight: 800, marginBottom: "30px" }}>
          🚒 Výjezdy JPO
        </h1>

        <div style={boxStyle}>
          <h2 style={titleStyle}>
            {editingId ? "Upravit výjezd" : "Přidat výjezd"}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              marginBottom: "14px",
            }}
          >
            <input
              type="date"
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
              style={inputStyle}
            />

            <select
              value={typ}
              onChange={(e) => setTyp(e.target.value)}
              style={inputStyle}
            >
              {typyVyjezdu.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <input
            placeholder="Název výjezdu"
            value={nazev}
            onChange={(e) => setNazev(e.target.value)}
            style={{ ...inputStyle, marginBottom: "14px" }}
          />

          <textarea
            placeholder="Popis výjezdu"
            value={popis}
            onChange={(e) => setPopis(e.target.value)}
            style={{
              ...inputStyle,
              minHeight: "120px",
              resize: "vertical",
              marginBottom: "14px",
            }}
          />

          <button onClick={handleSave} style={buttonStyle}>
            {editingId ? "Uložit úpravu" : "Přidat výjezd"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              style={{
                ...buttonStyle,
                backgroundColor: "#f5f5f5",
                color: "#111827",
                marginTop: "10px",
              }}
            >
              Zrušit úpravu
            </button>
          )}
        </div>

        <div style={boxStyle}>
          <h2 style={titleStyle}>Přehled výjezdů z administrace</h2>

          {items.length === 0 ? (
            <p style={{ color: "#6b7280" }}>
              Zatím nejsou vložené žádné výjezdy.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {items.map((item) => (
                <div key={item.id} style={rowStyle}>
                  <div>
                    <strong>{item.nazev}</strong>
                    <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
                      {new Date(item.datum).toLocaleDateString("cs-CZ")} · {item.typ}
                    </p>
                    <p style={{ margin: "8px 0 0", color: "#374151" }}>
                      {item.popis}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => startEdit(item)} style={editButtonStyle}>
                      Upravit
                    </button>

                    <button onClick={() => handleDelete(item.id)} style={deleteButtonStyle}>
                      Smazat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

const backLinkStyle = {
  color: "#b91c1c",
  fontWeight: 700,
  textDecoration: "none",
};

const logoutButtonStyle = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  borderRadius: "14px",
  padding: "10px 16px",
  fontSize: "14px",
  fontWeight: 700,
  cursor: "pointer",
};

const boxStyle = {
  border: "1px solid #ececec",
  borderRadius: "24px",
  padding: "28px",
  marginBottom: "28px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: 800,
  marginBottom: "20px",
};

const inputStyle = {
  width: "100%",
  borderRadius: "14px",
  border: "1px solid #d4d4d4",
  padding: "13px 16px",
  fontSize: "16px",
};

const buttonStyle = {
  width: "100%",
  borderRadius: "14px",
  border: "none",
  padding: "14px 18px",
  fontSize: "16px",
  fontWeight: 800,
  color: "#ffffff",
  backgroundColor: "#b91c1c",
  cursor: "pointer",
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  padding: "18px",
  borderRadius: "18px",
  background: "#fafafa",
};

const editButtonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "8px 12px",
  background: "#fee2e2",
  color: "#b91c1c",
  fontWeight: 700,
  cursor: "pointer",
};

const deleteButtonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "8px 12px",
  background: "#f5f5f5",
  cursor: "pointer",
};