"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Finance = {
  id: string;
  date: string;
  type: string;
  category: string;
  amount: number;
  note: string | null;
};

const incomeCategories = [
  "Členské příspěvky",
  "Dotace",
  "Sponzorský dar",
  "Akce pro veřejnost",
  "Ostatní",
];

const expenseCategories = [
  "PHM",
  "Opravy techniky",
  "Vybavení",
  "Mládež",
  "Tábor",
  "Občerstvení",
  "Ostatní",
];

export default function FinancePage() {
  const router = useRouter();

  const [checkingLogin, setCheckingLogin] = useState(true);
  const [items, setItems] = useState<Finance[]>([]);
  const [date, setDate] = useState("");
  const [type, setType] = useState("Příjem");
  const [category, setCategory] = useState(incomeCategories[0]);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    checkLoginAndLoad();
  }, []);

  async function checkLoginAndLoad() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      router.push("/admin/login");
      return;
    }

    await loadFinances();
    setCheckingLogin(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  function handleTypeChange(value: string) {
    setType(value);
    setCategory(value === "Příjem" ? incomeCategories[0] : expenseCategories[0]);
  }

  async function loadFinances() {
    const { data } = await supabase
      .from("finances")
      .select("*")
      .order("date", { ascending: false });

    setItems(data || []);
  }

  async function addFinance() {
    if (!date || !category || !amount) return;

    await supabase.from("finances").insert([
      {
        date,
        type,
        category,
        amount: Number(amount),
        note,
      },
    ]);

    setDate("");
    setType("Příjem");
    setCategory(incomeCategories[0]);
    setAmount("");
    setNote("");
    loadFinances();
  }

  async function deleteFinance(id: string) {
    if (!confirm("Opravdu chceš záznam smazat?")) return;
    await supabase.from("finances").delete().eq("id", id);
    loadFinances();
  }

  const income = items
    .filter((item) => item.type === "Příjem")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const expenses = items
    .filter((item) => item.type === "Výdaj")
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const balance = income - expenses;
  const categories = type === "Příjem" ? incomeCategories : expenseCategories;

  if (checkingLogin) {
    return (
      <main
        style={{
          background: "#ffffff",
          minHeight: "100vh",
          padding: "50px 24px",
        }}
      >
        <section style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p>Ověřuji přihlášení...</p>
        </section>
      </main>
    );
  }

  return (
    <main
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        padding: "50px 24px",
      }}
    >
      <section style={{ maxWidth: "1100px", margin: "0 auto" }}>
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

          <button
            onClick={handleLogout}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "14px",
              padding: "10px 16px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Odhlásit se
          </button>
        </div>

        <h1 style={{ fontSize: "42px", fontWeight: 800, marginBottom: "30px" }}>
          Finance <span style={{ color: "#dc2626" }}>SDH</span>
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "18px",
            marginBottom: "28px",
          }}
        >
          <div style={cardStyle}>
            <p style={labelStyle}>Příjmy celkem</p>
            <strong style={{ ...numberStyle, color: "#16a34a" }}>
              {income.toLocaleString("cs-CZ")} Kč
            </strong>
          </div>

          <div style={cardStyle}>
            <p style={labelStyle}>Výdaje celkem</p>
            <strong style={{ ...numberStyle, color: "#dc2626" }}>
              {expenses.toLocaleString("cs-CZ")} Kč
            </strong>
          </div>

          <div style={cardStyle}>
            <p style={labelStyle}>Zůstatek</p>
            <strong style={numberStyle}>
              {balance.toLocaleString("cs-CZ")} Kč
            </strong>
          </div>
        </div>

        <div style={boxStyle}>
          <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "20px" }}>
            Přidat záznam
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: "14px",
              marginBottom: "14px",
            }}
          >
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={inputStyle}
            />

            <select
              value={type}
              onChange={(e) => handleTypeChange(e.target.value)}
              style={inputStyle}
            >
              <option>Příjem</option>
              <option>Výdaj</option>
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={inputStyle}
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            <input
              placeholder="Částka"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={inputStyle}
            />
          </div>

          <input
            placeholder="Poznámka"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ ...inputStyle, marginBottom: "14px" }}
          />

          <button onClick={addFinance} style={buttonStyle}>
            Přidat záznam
          </button>
        </div>

        <div style={boxStyle}>
          <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "20px" }}>
            Přehled záznamů
          </h2>

          {items.length === 0 ? (
            <p style={{ color: "#6b7280" }}>
              Zatím nejsou vložené žádné finance.
            </p>
          ) : (
            items.map((item) => (
              <div key={item.id} style={rowStyle}>
                <div>{new Date(item.date).toLocaleDateString("cs-CZ")}</div>

                <div
                  style={{
                    color: item.type === "Příjem" ? "#16a34a" : "#dc2626",
                    fontWeight: 700,
                  }}
                >
                  {item.type}
                </div>

                <div>
                  <strong>{item.category}</strong>
                  {item.note && (
                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#6b7280",
                        fontSize: "14px",
                      }}
                    >
                      {item.note}
                    </p>
                  )}
                </div>

                <div style={{ fontWeight: 800 }}>
                  {Number(item.amount).toLocaleString("cs-CZ")} Kč
                </div>

                <button
                  onClick={() => deleteFinance(item.id)}
                  style={deleteButtonStyle}
                >
                  Smazat
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

const backLinkStyle = {
  color: "#b91c1c",
  fontWeight: 700,
  textDecoration: "none",
  display: "inline-block",
};

const cardStyle = {
  border: "1px solid #ececec",
  borderRadius: "22px",
  padding: "24px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
};

const boxStyle = {
  border: "1px solid #ececec",
  borderRadius: "24px",
  padding: "28px",
  marginBottom: "28px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
};

const labelStyle = {
  margin: "0 0 10px",
  color: "#6b7280",
  fontSize: "16px",
};

const numberStyle = {
  fontSize: "30px",
  fontWeight: 900,
  color: "#111827",
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

const deleteButtonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "8px 12px",
  background: "#f5f5f5",
  cursor: "pointer",
};

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "120px 90px 1fr 120px 80px",
  gap: "14px",
  alignItems: "center",
  padding: "14px 0",
  borderBottom: "1px solid #f3f4f6",
};