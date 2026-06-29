"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        router.push("/admin/login");
        return;
      }

      setLoading(false);
    };

    checkLogin();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <main
        style={{
          padding: "60px 24px",
          background: "#fff",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p>Ověřuji přihlášení...</p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        background: "#fff",
        minHeight: "100vh",
        padding: "60px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "48px",
                fontWeight: 800,
                marginBottom: "12px",
              }}
            >
              Administrace
            </h1>

            <p style={{ color: "#6b7280", fontSize: "18px", margin: 0 }}>
              Vyber sekci, kterou chceš spravovat.
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "14px",
              padding: "12px 20px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Odhlásit se
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          <a
            href="/admin/clenove"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={cardStyle}>
              <div style={{ fontSize: "48px" }}>👥</div>
              <h2 style={titleStyle}>Správa členů</h2>
              <p style={textStyle}>Přidávání, úprava a mazání členů SDH.</p>
            </div>
          </a>

          <a
            href="/admin/finance"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={cardStyle}>
              <div style={{ fontSize: "48px" }}>💰</div>
              <h2 style={titleStyle}>Finance</h2>
              <p style={textStyle}>Evidence příjmů, výdajů a zůstatku.</p>
            </div>
          </a>

          <a
            href="/admin/zapisy"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={cardStyle}>
              <div style={{ fontSize: "48px" }}>📝</div>
              <h2 style={titleStyle}>Zápisy z výboru</h2>
              <p style={textStyle}>Nahrávání a správa zápisů výboru.</p>
            </div>
          </a>

          <a
            href="/admin/jpo-vyjezdy"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={cardStyle}>
              <div style={{ fontSize: "48px" }}>🚒</div>
              <h2 style={titleStyle}>Výjezdy JPO</h2>
              <p style={textStyle}>Přidávání a správa výjezdů jednotky.</p>
            </div>
          </a>
        </div>
      </div>
    </main>
  );
}

const cardStyle = {
  border: "1px solid #ececec",
  borderRadius: "24px",
  padding: "32px",
  minHeight: "220px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
};

const titleStyle = {
  marginTop: "20px",
  fontSize: "28px",
  fontWeight: 800,
};

const textStyle = {
  color: "#6b7280",
};