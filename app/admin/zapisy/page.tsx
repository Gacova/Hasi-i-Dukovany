"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type MeetingFile = {
  id: string;
  title: string;
  meeting_date: string;
  year: number;
  file_name: string;
  file_url: string | null;
};

export default function ZapisyPage() {
  const router = useRouter();

  const [items, setItems] = useState<MeetingFile[]>([]);
  const [title, setTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [year, setYear] = useState("2026");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    checkLoginAndLoad();
  }, []);

  async function checkLoginAndLoad() {
    const { data } = await supabase.auth.getSession();

    if (!data.session) {
      router.push("/admin/login");
      return;
    }

    await loadFiles();
    setCheckingLogin(false);
  }

  async function loadFiles() {
    const { data } = await supabase
      .from("meeting_files")
      .select("*")
      .order("meeting_date", { ascending: false });

    setItems(data || []);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  async function uploadFile() {
    if (!title || !meetingDate || !year || !file) {
      alert("Vyplň název, datum, rok a vyber soubor.");
      return;
    }

    setLoading(true);

    const safeName = file.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "");

    const filePath = `${year}/${Date.now()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from("zapisy")
      .upload(filePath, file);

    if (uploadError) {
      alert("Soubor se nepodařilo nahrát.");
      console.error(uploadError);
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("meeting_files").insert([
      {
        title,
        meeting_date: meetingDate,
        year: Number(year),
        file_name: filePath,
        file_url: null,
      },
    ]);

    if (insertError) {
      alert("Zápis se nepodařilo uložit do databáze.");
      console.error(insertError);
      setLoading(false);
      return;
    }

    setTitle("");
    setMeetingDate("");
    setYear("2026");
    setFile(null);
    await loadFiles();
    setLoading(false);
  }

  async function openFile(item: MeetingFile) {
    const { data, error } = await supabase.storage
      .from("zapisy")
      .createSignedUrl(item.file_name, 60 * 10);

    if (error || !data?.signedUrl) {
      alert("Soubor se nepodařilo otevřít.");
      console.error(error);
      return;
    }

    window.open(data.signedUrl, "_blank");
  }

  async function deleteFile(item: MeetingFile) {
    if (!confirm("Opravdu chceš tento zápis smazat?")) return;

    await supabase.storage.from("zapisy").remove([item.file_name]);
    await supabase.from("meeting_files").delete().eq("id", item.id);

    loadFiles();
  }

  const years = Array.from(new Set(items.map((item) => item.year))).sort(
    (a, b) => b - a
  );

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

        <h1 style={headingStyle}>📝 Zápisy z výboru</h1>

        <div style={boxStyle}>
          <h2 style={titleStyle}>Přidat zápis</h2>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3" style={{ marginBottom: "14px" }}>
            <input
              type="date"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Rok"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={inputStyle}
            />

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={inputStyle}
            />
          </div>

          <input
            placeholder="Název zápisu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ ...inputStyle, marginBottom: "14px" }}
          />

          <button onClick={uploadFile} disabled={loading} style={buttonStyle}>
            {loading ? "Nahrávám..." : "Nahrát zápis"}
          </button>
        </div>

        {items.length === 0 ? (
          <div style={boxStyle}>
            <p style={{ color: "#6b7280" }}>
              Zatím nejsou nahrané žádné zápisy.
            </p>
          </div>
        ) : (
          years.map((year) => (
            <div key={year} style={boxStyle}>
              <h2 style={titleStyle}>{year}</h2>

              <div style={{ display: "grid", gap: "14px" }}>
                {items
                  .filter((item) => item.year === year)
                  .map((item) => (
                    <div key={item.id} style={rowStyle}>
                      <div>
                        <strong>{item.title}</strong>
                        <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
                          {new Date(item.meeting_date).toLocaleDateString("cs-CZ")}
                        </p>
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        <button onClick={() => openFile(item)} style={openButtonStyle}>
                          Otevřít
                        </button>

                        <button onClick={() => deleteFile(item)} style={deleteButtonStyle}>
                          Smazat
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

const backLinkStyle = {
  color: "#b91c1c",
  textDecoration: "none",
  fontWeight: 700,
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
  fontSize: "clamp(38px, 9vw, 42px)",
  lineHeight: 1.1,
  fontWeight: 800,
  marginTop: "24px",
  marginBottom: "30px",
  color: "#111827",
};

const boxStyle = {
  border: "1px solid #ececec",
  borderRadius: "24px",
  padding: "clamp(22px, 5vw, 28px)",
  marginBottom: "28px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.04)",
};

const titleStyle = {
  fontSize: "26px",
  lineHeight: 1.2,
  fontWeight: 800,
  marginBottom: "20px",
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

const rowStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  justifyContent: "space-between",
  alignItems: "center",
  gap: "14px",
  padding: "16px",
  border: "1px solid #f3f4f6",
  borderRadius: "18px",
};

const openButtonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "8px 14px",
  background: "#dc2626",
  color: "#ffffff",
  fontWeight: 700,
  cursor: "pointer",
};

const deleteButtonStyle = {
  border: "none",
  borderRadius: "999px",
  padding: "8px 14px",
  background: "#f5f5f5",
  cursor: "pointer",
};