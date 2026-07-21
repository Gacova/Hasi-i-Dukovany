"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
};

const inputStyle = {
  width: "100%",
  border: "1px solid #d1d5db",
  borderRadius: "14px",
  padding: "13px 15px",
  fontSize: "15px",
  color: "#111827",
  background: "#ffffff",
  outline: "none",
  boxSizing: "border-box" as const,
};

export default function NovyUkolPage() {
  const router = useRouter();

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUserName, setCurrentUserName] = useState("Uživatel");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Střední");
  const [category, setCategory] = useState("SDH");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    initializePage();
  }, []);

  async function initializePage() {
    setLoading(true);
    setErrorMessage("");

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error("Chyba při načítání přihlášení:", sessionError);
      setErrorMessage("Nepodařilo se ověřit přihlášení.");
      setLoading(false);
      return;
    }

    const session = sessionData.session;

    if (!session) {
      router.push("/admin/login");
      return;
    }

    const userId = session.user.id;
    setCurrentUserId(userId);

    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("full_name, email")
      .eq("id", userId)
      .maybeSingle();

    setCurrentUserName(
      currentProfile?.full_name ||
        currentProfile?.email ||
        session.user.email ||
        "Uživatel"
    );

    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .order("full_name", { ascending: true });

    if (profilesError) {
      console.error("Chyba při načítání uživatelů:", profilesError);
      setErrorMessage("Nepodařilo se načíst uživatele.");
      setLoading(false);
      return;
    }

    setProfiles(profilesData || []);
    setLoading(false);
  }

  function getProfileLabel(profile: Profile) {
    if (profile.full_name && profile.email) {
      if (profile.full_name === profile.email) {
        return profile.email;
      }

      return `${profile.full_name} – ${profile.email}`;
    }

    return profile.full_name || profile.email || "Uživatel";
  }

  async function sendAssignmentEmail(taskId: string): Promise<{
    sent: boolean;
    message: string;
  }> {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error(
        "Nepodařilo se načíst přihlášení pro odeslání e-mailu:",
        sessionError
      );
      return {
        sent: false,
        message: "Nepodařilo se načíst přihlášení pro odeslání e-mailu.",
      };
    }

    const accessToken = sessionData.session?.access_token;

    if (!accessToken) {
      console.error(
        "E-mail nebyl odeslán, protože chybí přihlašovací token."
      );
      return {
        sent: false,
        message: "Chybí přihlašovací token.",
      };
    }

    try {
      const response = await fetch(
        "/api/tasks/send-assignment-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            taskId,
          }),
        }
      );

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        console.error(
          "E-mailové oznámení se nepodařilo odeslat:",
          result?.error || `HTTP ${response.status}`
        );
        return {
          sent: false,
          message:
            result?.error ||
            `E-mailové API vrátilo chybu HTTP ${response.status}.`,
        };
      }

      if (result?.sent) {
        console.log("E-mailové oznámení bylo odesláno.");

        return {
          sent: true,
          message: "E-mailové oznámení bylo odesláno.",
        };
      }

      const message =
        result?.message || "E-mail nebylo potřeba odeslat.";

      console.log(
        "E-mailové oznámení nebylo odesláno:",
        message
      );

      return {
        sent: false,
        message,
      };
    } catch (error) {
      console.error(
        "Chyba při volání e-mailového API:",
        error
      );

      return {
        sent: false,
        message: "Nepodařilo se spojit s e-mailovým API.",
      };
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setErrorMessage("Vyplň název úkolu.");
      return;
    }

    if (!currentUserId) {
      setErrorMessage(
        "Nepodařilo se zjistit přihlášeného uživatele."
      );
      return;
    }

    setSaving(true);
    setErrorMessage("");

    const selectedProfile = profiles.find(
      (profile) => profile.id === assignedTo
    );

    const { data: createdTask, error: taskError } = await supabase
      .from("tasks")
      .insert({
        title: title.trim(),
        description: description.trim() || null,
        status: "Otevřené",
        priority,
        category,
        assigned_to: assignedTo || null,
        created_by: currentUserId,
        due_date: dueDate || null,
        updated_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (taskError || !createdTask) {
      console.error("Chyba při vytváření úkolu:", taskError);
      setErrorMessage(
        taskError?.message || "Úkol se nepodařilo vytvořit."
      );
      setSaving(false);
      return;
    }

    const assignedPersonName = selectedProfile
      ? getProfileLabel(selectedProfile)
      : "Nepřiřazeno";

    const { error: historyError } = await supabase
      .from("task_history")
      .insert({
        task_id: createdTask.id,
        user_id: currentUserId,
        author_name: currentUserName,
        action: assignedTo
          ? `Vytvořil ticket a přiřadil jej uživateli „${assignedPersonName}“.`
          : "Vytvořil ticket bez přiřazeného uživatele.",
      });

    if (historyError) {
      console.error(
        "Chyba při ukládání historie:",
        historyError
      );
    }

    if (assignedTo) {
      const { error: notificationError } = await supabase
        .from("notifications")
        .insert({
          user_id: assignedTo,
          task_id: createdTask.id,
          title: "Nový přiřazený úkol",
          message: `Byl ti přiřazen úkol „${title.trim()}“.`,
          is_read: false,
        });

      if (notificationError) {
        console.error(
          "Chyba při vytváření upozornění:",
          notificationError
        );
      }

      const emailResult = await sendAssignmentEmail(createdTask.id);

      if (!emailResult.sent) {
        window.alert(
          `Úkol byl vytvořen, ale e-mail se neodeslal.\n\nDůvod: ${emailResult.message}`
        );
      }
    }

    router.push(`/admin/ukoly/${createdTask.id}`);
    router.refresh();
  }

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "60px 24px",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p
            style={{
              color: "#6b7280",
              fontSize: "18px",
            }}
          >
            Načítám formulář...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#111827",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "34px 24px 80px",
        }}
      >
        <a
          href="/admin/ukoly"
          style={{
            color: "#dc2626",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: 800,
          }}
        >
          ← Zpět na úkoly
        </a>

        <h1
          style={{
            margin: "22px 0 0",
            fontSize: "clamp(40px, 8vw, 58px)",
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: "-1.5px",
          }}
        >
          Nový úkol
        </h1>

        <p
          style={{
            margin: "12px 0 0",
            color: "#6b7280",
            fontSize: "16px",
          }}
        >
          Vytvoř nový ticket a přiřaď ho konkrétnímu člověku.
        </p>

        {errorMessage && (
          <div
            style={{
              marginTop: "22px",
              padding: "14px 16px",
              borderRadius: "14px",
              background: "#fee2e2",
              color: "#991b1b",
              fontWeight: 700,
              lineHeight: 1.5,
            }}
          >
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "28px",
            padding: "22px",
            border: "1px solid #e5e7eb",
            borderRadius: "24px",
            background: "#ffffff",
            boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
          }}
        >
          <div>
            <label style={labelStyle}>
              Název úkolu{" "}
              <span style={{ color: "#dc2626" }}>*</span>
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Například Opravit PS12"
              required
              style={inputStyle}
            />
          </div>

          <div style={{ marginTop: "18px" }}>
            <label style={labelStyle}>Popis</label>

            <textarea
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Popiš, co je potřeba udělat."
              rows={6}
              style={{
                ...inputStyle,
                resize: "vertical",
                lineHeight: 1.6,
              }}
            />
          </div>

          <div className="form-grid">
            <div>
              <label style={labelStyle}>Priorita</label>

              <select
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value)
                }
                style={inputStyle}
              >
                <option value="Nízká">Nízká</option>
                <option value="Střední">Střední</option>
                <option value="Vysoká">Vysoká</option>
                <option value="Kritická">Kritická</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Kategorie</label>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                style={inputStyle}
              >
                <option value="SDH">SDH</option>
                <option value="JPO">JPO</option>
                <option value="Web">Web</option>
                <option value="Ostatní">Ostatní</option>
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div>
              <label style={labelStyle}>Přiřadit komu</label>

              <select
                value={assignedTo}
                onChange={(event) =>
                  setAssignedTo(event.target.value)
                }
                style={inputStyle}
              >
                <option value="">Nepřiřazeno</option>

                {profiles.map((profile) => (
                  <option key={profile.id} value={profile.id}>
                    {getProfileLabel(profile)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Termín</label>

              <input
                type="date"
                value={dueDate}
                onChange={(event) =>
                  setDueDate(event.target.value)
                }
                style={inputStyle}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "22px",
            }}
          >
            <button
              type="button"
              disabled={saving}
              onClick={() => router.push("/admin/ukoly")}
              style={{
                border: "1px solid #d1d5db",
                borderRadius: "13px",
                padding: "12px 18px",
                background: "#ffffff",
                color: "#374151",
                fontSize: "14px",
                fontWeight: 900,
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              Zrušit
            </button>

            <button
              type="submit"
              disabled={saving}
              style={{
                border: "none",
                borderRadius: "13px",
                padding: "12px 18px",
                background: saving ? "#9ca3af" : "#dc2626",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 900,
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              {saving ? "Vytvářím..." : "Vytvořit úkol"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: 18px;
        }

        @media (max-width: 650px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#111827",
  fontSize: "14px",
  fontWeight: 900,
};