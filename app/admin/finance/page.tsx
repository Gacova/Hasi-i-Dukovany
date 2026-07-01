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
      <main style={{ background: "#ffffff", minHeight: "100vh" }}>
        <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "50px 24px" }}>
          <p>Ověřuji přihlášení...</p>
        </section>
      </main>
    );
  }

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "34px 24px 70px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
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

        <h1 style={headingStyle}>
          Finance <span style={{ color: "#dc2626" }}>SDH</span>
        </h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3" style={{ marginBottom: "28px" }}>
          <SummaryCard label="Příjmy celkem" value={income} color="#16a34a" />
          <SummaryCard label="Výdaje celkem" value={expenses} color="#dc2626" />
          <SummaryCard label="Zůstatek" value={balance} color="#111827" />
        </div>

        <div style={boxStyle}>
          <h2 style={subHeadingStyle}>Přidat záznam</h2>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-4" style={{ marginBottom: "14px" }}>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />

            <select value={type} onChange={(e) => handleTypeChange(e.target.value)} style={inputStyle}>
              <option>Příjem</option>
              <option>Výdaj</option>
            </select>

            <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
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
          <h2 style={subHeadingStyle}>Přehled záznamů</h2>

          {items.length === 0 ? (
            <p style={{ color: "#6b7280" }}>Zatím nejsou vložené žádné finance.</p>
          ) : (
            <div style={{ display: "grid", gap: "14px" }}>
              {items.map((item) => (
                <div key={item.id} style={rowStyle}>
                  <div>{new Date(item.date).toLocaleDateString("cs-CZ")}</div>

                  <div
                    style={{
                      color: item.type === "Příjem" ? "#16a34a" : "#dc2626",
                      fontWeight: 800,
                    }}
                  >
                    {item.type}
                  </div>

                  <div>
                    <strong>{item.category}</strong>
                    {item.note && (
                      <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: "14px" }}>
                        {item.note}
                      </p>
                    )}
                  </div>

                  <div style={{ fontWeight: 900 }}>
                    {Number(item.amount).toLocaleString("cs-CZ")} Kč
                  </div>

                  <button onClick={() => deleteFinance(item.id)} style={deleteButtonStyle}>
                    Smazat
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div style={cardStyle}>
      <p style={labelStyle}>{label}</p>
      <strong style={{ ...numberStyle, color }}>
        {value.toLocaleString("cs-CZ")} Kč
      </strong>
    </div>
  );
}

const backLinkStyle = {
  color: "#b91c1c",
  fontWeight: 700,
  textDecoration: "none",
  display: "inline-block",
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
  whiteSpace: "nowrap" as const,
};

const headingStyle = {
  fontSize: "clamp(42px, 9vw, 48px)",
  lineHeight: 1.05,
  fontWeight: 800,
  marginBottom: "30px",
  color: "#111827",
};

const cardStyle = {
  border: "1px solid #ececec",
  borderRadius: "22px",
  padding: "22px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
  minWidth: 0,
};

const boxStyle = {
  border: "1px solid #ececec",
  borderRadius: "24px",
  padding: "clamp(22px, 5vw, 28px)",
  marginBottom: "28px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
};

const subHeadingStyle = {
  fontSize: "26px",
  lineHeight: 1.2,
  fontWeight: 800,
  marginBottom: "20px",
};

const labelStyle = {
  margin: "0 0 10px",
  color: "#6b7280",
  fontSize: "16px",
};

const numberStyle = {
  fontSize: "clamp(26px, 7vw, 30px)",
  lineHeight: 1.25,
  fontWeight: 900,
  wordBreak: "break-word" as const,
};

const inputStyle = {
  width: "100%",
  minWidth: 0,
  borderRadius: "14px",
  border: "1px solid #d4d4d4",
  padding: "13px 16px",
  fontSize: "16px",
  boxSizing: "border-box" as const,
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
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "12px",
  alignItems: "center",
  padding: "16px",
  border: "1px solid #f3f4f6",
  borderRadius: "18px",
};