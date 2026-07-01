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
      <main style={{ padding: "60px 24px", background: "#fff", minHeight: "100vh" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p>Ověřuji přihlášení...</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px 80px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "clamp(42px, 9vw, 48px)",
                lineHeight: 1.05,
                fontWeight: 800,
                margin: 0,
                color: "#111827",
              }}
            >
              Administrace
            </h1>

            <p style={{ color: "#6b7280", fontSize: "18px", marginTop: "14px" }}>
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
              whiteSpace: "nowrap",
            }}
          >
            Odhlásit se
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <AdminCard
            href="/admin/clenove"
            icon="👥"
            title="Správa členů"
            text="Přidávání, úprava a mazání členů SDH."
          />

          <AdminCard
            href="/admin/finance"
            icon="💰"
            title="Finance"
            text="Evidence příjmů, výdajů a zůstatku."
          />

          <AdminCard
            href="/admin/zapisy"
            icon="📝"
            title="Zápisy z výboru"
            text="Nahrávání a správa zápisů výboru."
          />

          <AdminCard
            href="/admin/jpo-vyjezdy"
            icon="🚒"
            title="Výjezdy JPO"
            text="Přidávání a správa výjezdů jednotky."
          />
        </div>
      </div>
    </main>
  );
}

function AdminCard({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <a href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <article
        style={{
          border: "1px solid #ececec",
          borderRadius: "24px",
          padding: "28px",
          minHeight: "220px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontSize: "44px" }}>{icon}</div>

        <h2
          style={{
            marginTop: "20px",
            marginBottom: "10px",
            fontSize: "26px",
            lineHeight: 1.2,
            fontWeight: 800,
          }}
        >
          {title}
        </h2>

        <p style={{ color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
          {text}
        </p>
      </article>
    </a>
  );
}