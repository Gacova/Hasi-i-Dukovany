"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hoverButton, setHoverButton] = useState(false);

  const handleLogin = async () => {
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Špatný e-mail nebo heslo");
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <main style={{ background: "white", padding: "56px 24px" }}>
      <section
        style={{
          width: "100%",
          maxWidth: "620px",
          margin: "0 auto",
        }}
      >
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h1 className="mb-7 text-center text-2xl font-bold text-neutral-950">
            Přihlášení
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />

            <input
              type="password"
              placeholder="Heslo"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
            />

            {error && (
              <p style={{ fontSize: "14px", color: "#b91c1c" }}>
                {error}
              </p>
            )}

            <button
              onClick={handleLogin}
              onMouseEnter={() => setHoverButton(true)}
              onMouseLeave={() => setHoverButton(false)}
              style={{
                width: "100%",
                borderRadius: "14px",
                border: "none",
                padding: "13px 18px",
                fontSize: "16px",
                fontWeight: 700,
                color: "white",
                backgroundColor: hoverButton ? "#991b1b" : "#b91c1c",
                cursor: "pointer",
                transform: hoverButton ? "translateY(-1px)" : "translateY(0)",
                boxShadow: hoverButton
                  ? "0 6px 12px rgba(0,0,0,0.15)"
                  : "none",
                transition: "all 150ms ease",
              }}
            >
              Přihlásit se
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}