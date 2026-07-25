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
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
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

            <p
              style={{
                color: "#6b7280",
                fontSize: "18px",
                marginTop: "14px",
              }}
            >
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
            text="Přidávání, úprava a mazání členů SDH a JPO."
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

          <AdminCard
            href="/admin/ukoly"
            icon="📋"
            title="Úkoly"
            text="Správa ticketů, priorit, termínů, komentářů a příloh."
            highlighted
          />
          <AdminCard
  href="/admin/narozeniny"
  icon="🎂"
  title="Narozeniny"
  text="Přehled narozenin všech členů SDH a JPO včetně nejbližších oslav."
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
  highlighted = false,
}: {
  href: string;
  icon: string;
  title: string;
  text: string;
  highlighted?: boolean;
}) {
  return (
    <a href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <article
        style={{
          border: highlighted ? "2px solid #dc2626" : "1px solid #ececec",
          borderRadius: "24px",
          padding: "28px",
          minHeight: "220px",
          boxShadow: highlighted
            ? "0 14px 35px rgba(220,38,38,0.14)"
            : "0 10px 30px rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          background: highlighted ? "#fffafa" : "#ffffff",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.transform = "translateY(-4px)";
          event.currentTarget.style.boxShadow = highlighted
            ? "0 18px 40px rgba(220,38,38,0.2)"
            : "0 16px 36px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.transform = "translateY(0)";
          event.currentTarget.style.boxShadow = highlighted
            ? "0 14px 35px rgba(220,38,38,0.14)"
            : "0 10px 30px rgba(0,0,0,0.05)";
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
            color: highlighted ? "#dc2626" : "#111827",
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: "#6b7280",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {text}
        </p>
      </article>
    </a>
  );
}