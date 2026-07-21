"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Profile = {
  full_name: string | null;
  email: string | null;
};

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  category: string | null;
  assigned_to: string | null;
  created_by: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string | null;
  assignee: Profile | Profile[] | null;
  creator: Profile | Profile[] | null;
};

type Comment = {
  id: string;
  task_id: string;
  user_id: string | null;
  author_name: string;
  comment: string;
  created_at: string;
};

type TaskFile = {
  id: string;
  task_id: string;
  uploaded_by: string | null;
  file_name: string;
  file_url: string;
  file_size: number | null;
  created_at: string;
};

type HistoryItem = {
  id: string;
  task_id: string;
  user_id: string | null;
  author_name: string | null;
  action: string;
  created_at: string;
};

type ChecklistItem = {
  id: string;
  task_id: string;
  text: string;
  completed: boolean;
  position: number;
  created_at: string;
};

const inputStyle = {
  width: "100%",
  border: "1px solid #d1d5db",
  borderRadius: "14px",
  padding: "13px 15px",
  fontSize: "15px",
  background: "#ffffff",
  color: "#111827",
  outline: "none",
  boxSizing: "border-box" as const,
};

export default function DetailUkoluPage() {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const taskId = params.id as string;

  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [taskFiles, setTaskFiles] = useState<TaskFile[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  const [currentUserId, setCurrentUserId] = useState("");
  const [currentUserName, setCurrentUserName] = useState("Uživatel");
  const [currentUserRole, setCurrentUserRole] = useState("member");

  const [newComment, setNewComment] = useState("");
  const [newChecklistText, setNewChecklistText] = useState("");

  const [loading, setLoading] = useState(true);
  const [savingComment, setSavingComment] = useState(false);
  const [savingChecklist, setSavingChecklist] = useState(false);
  const [changingStatus, setChangingStatus] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [deletingTask, setDeletingTask] = useState(false);
  const [openActions, setOpenActions] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    initializePage();
  }, [taskId]);

  async function initializePage() {
    setLoading(true);

    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      router.push("/admin/login");
      return;
    }

    const userId = sessionData.session.user.id;
    setCurrentUserId(userId);

    const { data: profileData } = await supabase
      .from("profiles")
      .select("full_name, email, role")
      .eq("id", userId)
      .single();

    setCurrentUserName(
      profileData?.full_name ||
        profileData?.email ||
        sessionData.session.user.email ||
        "Uživatel"
    );

    setCurrentUserRole(profileData?.role || "member");

    await Promise.all([
      loadTask(),
      loadComments(),
      loadFiles(),
      loadHistory(),
      loadChecklist(),
    ]);

    setLoading(false);
  }

  async function loadTask() {
    const { data, error } = await supabase
      .from("tasks")
      .select(
        `
          id,
          title,
          description,
          status,
          priority,
          category,
          assigned_to,
          created_by,
          due_date,
          created_at,
          updated_at,
          assignee:profiles!tasks_assigned_to_fkey (
            full_name,
            email
          ),
          creator:profiles!tasks_created_by_fkey (
            full_name,
            email
          )
        `
      )
      .eq("id", taskId)
      .single();

    if (error) {
      console.error("Chyba při načítání úkolu:", error);
      setErrorMessage("Úkol se nepodařilo načíst.");
      return;
    }

    setTask(data as unknown as Task);
  }

  async function loadComments() {
    const { data, error } = await supabase
      .from("task_comments")
      .select("id, task_id, user_id, author_name, comment, created_at")
      .eq("task_id", taskId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Chyba při načítání komentářů:", error);
      return;
    }

    setComments(data || []);
  }

  async function loadFiles() {
    const { data, error } = await supabase
      .from("task_files")
      .select(
        "id, task_id, uploaded_by, file_name, file_url, file_size, created_at"
      )
      .eq("task_id", taskId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Chyba při načítání příloh:", error);
      return;
    }

    setTaskFiles(data || []);
  }

  async function loadHistory() {
    const { data, error } = await supabase
      .from("task_history")
      .select(
        "id, task_id, user_id, author_name, action, created_at"
      )
      .eq("task_id", taskId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Chyba při načítání historie:", error);
      return;
    }

    setHistory(data || []);
  }

  async function loadChecklist() {
    const { data, error } = await supabase
      .from("task_checklist")
      .select(
        "id, task_id, text, completed, position, created_at"
      )
      .eq("task_id", taskId)
      .order("position", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Chyba při načítání checklistu:", error);
      return;
    }

    setChecklist(data || []);
  }

  async function addHistory(action: string) {
    if (!currentUserId) {
      return;
    }

    const { error } = await supabase.from("task_history").insert({
      task_id: taskId,
      user_id: currentUserId,
      author_name: currentUserName,
      action,
    });

    if (error) {
      console.error("Chyba při ukládání historie:", error);
      return;
    }

    await loadHistory();
  }

  function showSuccess(message: string) {
    setSuccessMessage(message);
    setErrorMessage("");

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 3500);
  }

  function getProfileName(
    profile: Profile | Profile[] | null,
    emptyValue = "Nepřiřazeno"
  ) {
    if (!profile) {
      return emptyValue;
    }

    const selectedProfile = Array.isArray(profile)
      ? profile[0]
      : profile;

    if (!selectedProfile) {
      return emptyValue;
    }

    return (
      selectedProfile.full_name ||
      selectedProfile.email ||
      emptyValue
    );
  }

  function formatDate(date: string | null) {
    if (!date) {
      return "Bez termínu";
    }

    return new Intl.DateTimeFormat("cs-CZ").format(new Date(date));
  }

  function formatDateTime(date: string | null) {
    if (!date) {
      return "Neuvedeno";
    }

    return new Intl.DateTimeFormat("cs-CZ", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  }

  function formatFileSize(size: number | null) {
    if (!size) {
      return "";
    }

    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${Math.round(size / 1024)} kB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  function getPriorityStyle(priority: string) {
    if (priority === "Kritická") {
      return {
        background: "#fee2e2",
        color: "#b91c1c",
      };
    }

    if (priority === "Vysoká") {
      return {
        background: "#ffedd5",
        color: "#c2410c",
      };
    }

    if (priority === "Nízká") {
      return {
        background: "#dcfce7",
        color: "#15803d",
      };
    }

    return {
      background: "#fef3c7",
      color: "#a16207",
    };
  }

  async function changeStatus(newStatus: "Otevřené" | "Hotovo") {
    if (!task) {
      return;
    }

    setChangingStatus(true);
    setErrorMessage("");
    setOpenActions(false);

    const { error } = await supabase
      .from("tasks")
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", task.id);

    if (error) {
      console.error("Chyba při změně stavu:", error);
      setErrorMessage("Stav se nepodařilo změnit.");
      setChangingStatus(false);
      return;
    }

    await addHistory(`Změnil stav úkolu na „${newStatus}“.`);
    await loadTask();

    setChangingStatus(false);
    showSuccess(`Stav byl změněn na „${newStatus}“.`);
  }

  async function handleAddComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newComment.trim()) {
      return;
    }

    setSavingComment(true);
    setErrorMessage("");

    const { error } = await supabase.from("task_comments").insert({
      task_id: taskId,
      user_id: currentUserId,
      author_name: currentUserName,
      comment: newComment.trim(),
    });

    if (error) {
      console.error("Chyba při ukládání komentáře:", error);
      setErrorMessage("Komentář se nepodařilo uložit.");
      setSavingComment(false);
      return;
    }

    setNewComment("");

    await addHistory("Přidal komentář.");
    await loadComments();

    setSavingComment(false);
    showSuccess("Komentář byl přidán.");
  }

  async function handleAddChecklist(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!newChecklistText.trim()) {
      return;
    }

    setSavingChecklist(true);
    setErrorMessage("");

    const nextPosition =
      checklist.length === 0
        ? 0
        : Math.max(...checklist.map((item) => item.position)) + 1;

    const { error } = await supabase.from("task_checklist").insert({
      task_id: taskId,
      text: newChecklistText.trim(),
      completed: false,
      position: nextPosition,
    });

    if (error) {
      console.error("Chyba při ukládání checklistu:", error);
      setErrorMessage("Položku checklistu se nepodařilo přidat.");
      setSavingChecklist(false);
      return;
    }

    const itemText = newChecklistText.trim();
    setNewChecklistText("");

    await addHistory(`Přidal položku checklistu „${itemText}“.`);
    await loadChecklist();

    setSavingChecklist(false);
  }

  async function toggleChecklistItem(item: ChecklistItem) {
    const newCompletedValue = !item.completed;

    const { error } = await supabase
      .from("task_checklist")
      .update({
        completed: newCompletedValue,
      })
      .eq("id", item.id);

    if (error) {
      console.error("Chyba při změně checklistu:", error);
      setErrorMessage("Checklist se nepodařilo upravit.");
      return;
    }

    await addHistory(
      newCompletedValue
        ? `Dokončil položku checklistu „${item.text}“.`
        : `Znovu otevřel položku checklistu „${item.text}“.`
    );

    await loadChecklist();
  }

  async function deleteChecklistItem(item: ChecklistItem) {
    const confirmed = window.confirm(
      `Opravdu chceš odstranit položku „${item.text}“?`
    );

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from("task_checklist")
      .delete()
      .eq("id", item.id);

    if (error) {
      console.error("Chyba při mazání checklistu:", error);
      setErrorMessage("Položku se nepodařilo odstranit.");
      return;
    }

    await addHistory(`Odstranil položku checklistu „${item.text}“.`);
    await loadChecklist();
  }

  async function handleFileUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const maximumSize = 20 * 1024 * 1024;

    if (file.size > maximumSize) {
      setErrorMessage("Soubor může mít maximálně 20 MB.");
      event.target.value = "";
      return;
    }

    setUploadingFile(true);
    setErrorMessage("");
    setOpenActions(false);

    const safeFileName = file.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9._-]/g, "_");

    const storagePath = `${taskId}/${crypto.randomUUID()}-${safeFileName}`;

    const { error: uploadError } = await supabase.storage
      .from("task-files")
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Chyba při nahrávání souboru:", uploadError);
      setErrorMessage("Soubor se nepodařilo nahrát.");
      setUploadingFile(false);
      event.target.value = "";
      return;
    }

    const { error: databaseError } = await supabase
      .from("task_files")
      .insert({
        task_id: taskId,
        uploaded_by: currentUserId,
        file_name: file.name,
        file_url: storagePath,
        file_size: file.size,
      });

    if (databaseError) {
      console.error(
        "Chyba při ukládání přílohy do databáze:",
        databaseError
      );

      await supabase.storage.from("task-files").remove([storagePath]);

      setErrorMessage("Přílohu se nepodařilo uložit.");
      setUploadingFile(false);
      event.target.value = "";
      return;
    }

    await addHistory(`Přidal přílohu „${file.name}“.`);
    await loadFiles();

    setUploadingFile(false);
    event.target.value = "";
    showSuccess("Příloha byla nahrána.");
  }

  async function downloadFile(file: TaskFile) {
    const { data, error } = await supabase.storage
      .from("task-files")
      .createSignedUrl(file.file_url, 60);

    if (error || !data?.signedUrl) {
      console.error("Chyba při vytváření odkazu:", error);
      setErrorMessage("Soubor se nepodařilo otevřít.");
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  }

  async function deleteFile(file: TaskFile) {
    const canDeleteFile =
      file.uploaded_by === currentUserId || currentUserRole === "admin";

    if (!canDeleteFile) {
      setErrorMessage(
        "Tuto přílohu může odstranit jen její autor nebo administrátor."
      );
      return;
    }

    const confirmed = window.confirm(
      `Opravdu chceš odstranit přílohu „${file.file_name}“?`
    );

    if (!confirmed) {
      return;
    }

    const { error: storageError } = await supabase.storage
      .from("task-files")
      .remove([file.file_url]);

    if (storageError) {
      console.error("Chyba při mazání souboru:", storageError);
      setErrorMessage("Soubor se nepodařilo odstranit z úložiště.");
      return;
    }

    const { error: databaseError } = await supabase
      .from("task_files")
      .delete()
      .eq("id", file.id);

    if (databaseError) {
      console.error(
        "Chyba při mazání přílohy z databáze:",
        databaseError
      );
      setErrorMessage("Záznam přílohy se nepodařilo odstranit.");
      return;
    }

    await addHistory(`Odstranil přílohu „${file.file_name}“.`);
    await loadFiles();

    showSuccess("Příloha byla odstraněna.");
  }

  async function deleteTask() {
    if (!task) {
      return;
    }

    const canDeleteTask =
      task.created_by === currentUserId || currentUserRole === "admin";

    if (!canDeleteTask) {
      setErrorMessage(
        "Ticket může smazat pouze jeho autor nebo administrátor."
      );
      setOpenActions(false);
      return;
    }

    const confirmed = window.confirm(
      "Opravdu chceš tento ticket smazat? Smažou se také komentáře, checklist, historie a záznamy příloh. Tuto akci nelze vrátit zpět."
    );

    if (!confirmed) {
      return;
    }

    setDeletingTask(true);
    setErrorMessage("");
    setOpenActions(false);

    const filePaths = taskFiles.map((file) => file.file_url);

    if (filePaths.length > 0) {
      const { error: storageError } = await supabase.storage
        .from("task-files")
        .remove(filePaths);

      if (storageError) {
        console.error(
          "Některé soubory se nepodařilo odstranit:",
          storageError
        );
      }
    }

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", task.id);

    if (error) {
      console.error("Chyba při mazání ticketu:", error);
      setErrorMessage(
        "Ticket se nepodařilo smazat. Zkontroluj oprávnění."
      );
      setDeletingTask(false);
      return;
    }

    router.push("/admin/ukoly");
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
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ color: "#6b7280", fontSize: "18px" }}>
            Načítám úkol...
          </p>
        </div>
      </main>
    );
  }

  if (!task) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "60px 24px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ color: "#991b1b", fontWeight: 800 }}>
            Úkol nebyl nalezen.
          </p>

          <a
            href="/admin/ukoly"
            style={{
              display: "inline-block",
              marginTop: "16px",
              color: "#dc2626",
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            ← Zpět na úkoly
          </a>
        </div>
      </main>
    );
  }

  const isDone = task.status === "Hotovo";
  const priorityStyle = getPriorityStyle(task.priority);

  const canDeleteTask =
    task.created_by === currentUserId || currentUserRole === "admin";

  const completedChecklistCount = checklist.filter(
    (item) => item.completed
  ).length;

  const checklistProgress =
    checklist.length === 0
      ? 0
      : Math.round(
          (completedChecklistCount / checklist.length) * 100
        );

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
          maxWidth: "1100px",
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

        {errorMessage && (
          <div
            style={{
              marginTop: "20px",
              padding: "14px 16px",
              borderRadius: "13px",
              background: "#fee2e2",
              color: "#991b1b",
              fontWeight: 700,
            }}
          >
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div
            style={{
              marginTop: "20px",
              padding: "14px 16px",
              borderRadius: "13px",
              background: "#dcfce7",
              color: "#166534",
              fontWeight: 700,
            }}
          >
            {successMessage}
          </div>
        )}

        <section
          style={{
            marginTop: "24px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "24px",
            padding: "28px",
            boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "18px",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <span
                style={{
                  display: "inline-flex",
                  borderRadius: "999px",
                  padding: "7px 12px",
                  background: isDone ? "#dcfce7" : "#ffedd5",
                  color: isDone ? "#15803d" : "#c2410c",
                  fontSize: "13px",
                  fontWeight: 900,
                }}
              >
                {isDone ? "✅ Hotovo" : "🔨 Otevřené"}
              </span>

              <h1
                style={{
                  margin: "18px 0 0",
                  fontSize: "clamp(36px, 7vw, 52px)",
                  lineHeight: 1.05,
                  fontWeight: 900,
                  letterSpacing: "-1px",
                  overflowWrap: "anywhere",
                }}
              >
                {task.title}
              </h1>
            </div>

            <div style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setOpenActions((value) => !value)}
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "13px",
                  padding: "12px 17px",
                  background: "#ffffff",
                  color: "#374151",
                  fontSize: "15px",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                ⋮ Akce
              </button>

              {openActions && (
                <div
                  style={{
                    position: "absolute",
                    top: "50px",
                    right: 0,
                    zIndex: 20,
                    width: "240px",
                    padding: "8px",
                    borderRadius: "15px",
                    border: "1px solid #e5e7eb",
                    background: "#ffffff",
                    boxShadow: "0 18px 40px rgba(0,0,0,0.16)",
                  }}
                >
                  <ActionButton
                    text={
                      isDone
                        ? "🔨 Znovu otevřít"
                        : "✅ Označit jako hotovo"
                    }
                    disabled={changingStatus}
                    onClick={() =>
                      changeStatus(isDone ? "Otevřené" : "Hotovo")
                    }
                  />

                  <ActionButton
                    text="📎 Přidat přílohu"
                    disabled={uploadingFile}
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                  />

                  {canDeleteTask && (
                    <>
                      <div
                        style={{
                          height: "1px",
                          background: "#e5e7eb",
                          margin: "7px 4px",
                        }}
                      />

                      <ActionButton
                        text="🗑️ Smazat ticket"
                        danger
                        disabled={deletingTask}
                        onClick={deleteTask}
                      />
                    </>
                  )}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "22px",
            }}
          >
            <span
              style={{
                borderRadius: "999px",
                padding: "7px 11px",
                background: priorityStyle.background,
                color: priorityStyle.color,
                fontSize: "13px",
                fontWeight: 900,
              }}
            >
              Priorita: {task.priority}
            </span>

            <span
              style={{
                borderRadius: "999px",
                padding: "7px 11px",
                background: "#f3f4f6",
                color: "#4b5563",
                fontSize: "13px",
                fontWeight: 800,
              }}
            >
              {task.category || "Bez kategorie"}
            </span>
          </div>

          <div className="detail-grid">
            <InfoCard
              label="Přiřazeno"
              value={getProfileName(task.assignee)}
            />

            <InfoCard
              label="Termín"
              value={formatDate(task.due_date)}
            />

            <InfoCard
              label="Vytvořil"
              value={getProfileName(task.creator, "Neuvedeno")}
            />

            <InfoCard
              label="Přidáno"
              value={formatDateTime(task.created_at)}
            />
          </div>

          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              marginTop: "26px",
              paddingTop: "24px",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "20px",
                fontWeight: 900,
              }}
            >
              Popis
            </h2>

            <p
              style={{
                margin: "12px 0 0",
                color: "#4b5563",
                fontSize: "16px",
                lineHeight: 1.7,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              {task.description || "Bez popisu."}
            </p>
          </div>
        </section>

        <section className="content-section">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "14px",
            }}
          >
            <div>
              <h2 className="section-title">Checklist</h2>

              <p className="section-description">
                {completedChecklistCount} z {checklist.length} položek
                dokončeno
              </p>
            </div>

            {checklist.length > 0 && (
              <strong
                style={{
                  color:
                    checklistProgress === 100 ? "#15803d" : "#6b7280",
                }}
              >
                {checklistProgress} %
              </strong>
            )}
          </div>

          {checklist.length > 0 && (
            <div
              style={{
                height: "9px",
                borderRadius: "999px",
                background: "#e5e7eb",
                marginTop: "16px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${checklistProgress}%`,
                  height: "100%",
                  borderRadius: "999px",
                  background:
                    checklistProgress === 100
                      ? "#16a34a"
                      : "#dc2626",
                  transition: "width 0.2s ease",
                }}
              />
            </div>
          )}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            {checklist.length === 0 ? (
              <p className="empty-text">
                Checklist zatím neobsahuje žádnou položku.
              </p>
            ) : (
              checklist.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto minmax(0, 1fr) auto",
                    gap: "12px",
                    alignItems: "center",
                    border: "1px solid #e5e7eb",
                    borderRadius: "14px",
                    padding: "13px 14px",
                    background: item.completed
                      ? "#f0fdf4"
                      : "#fafafa",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleChecklistItem(item)}
                    style={{
                      width: "19px",
                      height: "19px",
                      cursor: "pointer",
                    }}
                  />

                  <span
                    style={{
                      color: item.completed ? "#6b7280" : "#111827",
                      textDecoration: item.completed
                        ? "line-through"
                        : "none",
                      lineHeight: 1.5,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {item.text}
                  </span>

                  <button
                    type="button"
                    onClick={() => deleteChecklistItem(item)}
                    title="Odstranit položku"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#dc2626",
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          <form
            onSubmit={handleAddChecklist}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) auto",
              gap: "10px",
              marginTop: "18px",
            }}
            className="checklist-form"
          >
            <input
              type="text"
              value={newChecklistText}
              onChange={(event) =>
                setNewChecklistText(event.target.value)
              }
              placeholder="Například Zavolat do servisu"
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={savingChecklist}
              className="primary-button"
            >
              {savingChecklist ? "Ukládám..." : "Přidat"}
            </button>
          </form>
        </section>

        <section className="content-section">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2 className="section-title">Přílohy</h2>

              <p className="section-description">
                Fotografie, dokumenty a další soubory.
              </p>
            </div>

            <button
              type="button"
              disabled={uploadingFile}
              onClick={() => fileInputRef.current?.click()}
              className="secondary-button"
            >
              {uploadingFile
                ? "Nahrávám..."
                : "📎 Nahrát soubor"}
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "11px",
              marginTop: "20px",
            }}
          >
            {taskFiles.length === 0 ? (
              <p className="empty-text">
                K ticketu zatím není přidaná žádná příloha.
              </p>
            ) : (
              taskFiles.map((file) => {
                const canDeleteFile =
                  file.uploaded_by === currentUserId ||
                  currentUserRole === "admin";

                return (
                  <div
                    key={file.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "auto minmax(0, 1fr) auto",
                      alignItems: "center",
                      gap: "13px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "15px",
                      padding: "14px 15px",
                      background: "#fafafa",
                    }}
                  >
                    <div style={{ fontSize: "25px" }}>📄</div>

                    <div style={{ minWidth: 0 }}>
                      <button
                        type="button"
                        onClick={() => downloadFile(file)}
                        style={{
                          display: "block",
                          maxWidth: "100%",
                          border: "none",
                          padding: 0,
                          background: "transparent",
                          color: "#111827",
                          fontSize: "15px",
                          fontWeight: 900,
                          cursor: "pointer",
                          textAlign: "left",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {file.file_name}
                      </button>

                      <div
                        style={{
                          marginTop: "4px",
                          color: "#9ca3af",
                          fontSize: "12px",
                        }}
                      >
                        {formatFileSize(file.file_size)}
                        {file.file_size ? " · " : ""}
                        {formatDateTime(file.created_at)}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "7px",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => downloadFile(file)}
                        className="small-button"
                        title="Otevřít soubor"
                      >
                        Otevřít
                      </button>

                      {canDeleteFile && (
                        <button
                          type="button"
                          onClick={() => deleteFile(file)}
                          className="small-danger-button"
                          title="Odstranit přílohu"
                        >
                          Smazat
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className="content-section">
          <h2 className="section-title">Komentáře</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              marginTop: "20px",
            }}
          >
            {comments.length === 0 ? (
              <p className="empty-text">
                Zatím nebyl přidán žádný komentář.
              </p>
            ) : (
              comments.map((comment) => (
                <article
                  key={comment.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "16px",
                    padding: "16px",
                    background: "#fafafa",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <strong>{comment.author_name}</strong>

                    <span
                      style={{
                        color: "#9ca3af",
                        fontSize: "12px",
                      }}
                    >
                      {formatDateTime(comment.created_at)}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: "10px 0 0",
                      color: "#4b5563",
                      lineHeight: 1.6,
                      whiteSpace: "pre-wrap",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {comment.comment}
                  </p>
                </article>
              ))
            )}
          </div>

          <form
            onSubmit={handleAddComment}
            style={{ marginTop: "22px" }}
          >
            <textarea
              value={newComment}
              onChange={(event) =>
                setNewComment(event.target.value)
              }
              placeholder="Napiš komentář..."
              rows={4}
              style={{
                ...inputStyle,
                resize: "vertical",
                lineHeight: 1.6,
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "12px",
              }}
            >
              <button
                type="submit"
                disabled={savingComment}
                className="primary-button"
              >
                {savingComment
                  ? "Ukládám..."
                  : "Přidat komentář"}
              </button>
            </div>
          </form>
        </section>

        <section className="content-section">
          <h2 className="section-title">Historie</h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
            }}
          >
            {history.length === 0 ? (
              <p className="empty-text">
                Historie ticketu je zatím prázdná.
              </p>
            ) : (
              history.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "18px minmax(0, 1fr)",
                    gap: "13px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "999px",
                        marginTop: "6px",
                        background: "#dc2626",
                        flexShrink: 0,
                      }}
                    />

                    {index < history.length - 1 && (
                      <div
                        style={{
                          width: "2px",
                          minHeight: "48px",
                          flex: 1,
                          background: "#e5e7eb",
                        }}
                      />
                    )}
                  </div>

                  <div
                    style={{
                      paddingBottom:
                        index === history.length - 1 ? 0 : "20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.55,
                      }}
                    >
                      <strong>
                        {item.author_name || "Uživatel"}
                      </strong>{" "}
                      {item.action}
                    </div>

                    <div
                      style={{
                        marginTop: "5px",
                        color: "#9ca3af",
                        fontSize: "12px",
                      }}
                    >
                      {formatDateTime(item.created_at)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <style jsx>{`
        .detail-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          margin-top: 26px;
        }

        .content-section {
          margin-top: 22px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.05);
        }

        .section-title {
          margin: 0;
          font-size: 24px;
          font-weight: 900;
        }

        .section-description {
          margin: 6px 0 0;
          color: #6b7280;
          font-size: 13px;
          line-height: 1.5;
        }

        .empty-text {
          margin: 0;
          color: #9ca3af;
          line-height: 1.6;
        }

        .primary-button {
          border: none;
          border-radius: 13px;
          padding: 12px 18px;
          background: #dc2626;
          color: #ffffff;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
        }

        .primary-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .secondary-button {
          border: 1px solid #d1d5db;
          border-radius: 13px;
          padding: 11px 16px;
          background: #ffffff;
          color: #374151;
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
        }

        .secondary-button:disabled {
          color: #9ca3af;
          cursor: not-allowed;
        }

        .small-button,
        .small-danger-button {
          border: 1px solid #d1d5db;
          border-radius: 10px;
          padding: 8px 11px;
          background: #ffffff;
          color: #374151;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .small-danger-button {
          border-color: #fecaca;
          color: #dc2626;
          background: #fff7f7;
        }

        @media (max-width: 700px) {
          .detail-grid {
            grid-template-columns: 1fr;
          }

          .checklist-form {
            grid-template-columns: 1fr !important;
          }

          .content-section {
            padding: 22px 18px;
          }
        }
      `}</style>
    </main>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "16px",
        background: "#fafafa",
      }}
    >
      <div
        style={{
          color: "#6b7280",
          fontSize: "12px",
          fontWeight: 800,
          marginBottom: "6px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: "15px",
          fontWeight: 900,
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ActionButton({
  text,
  onClick,
  disabled = false,
  danger = false,
}: {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        border: "none",
        borderRadius: "10px",
        padding: "11px 12px",
        background: danger ? "#fff1f2" : "transparent",
        color: danger ? "#dc2626" : "#374151",
        fontSize: "14px",
        fontWeight: 800,
        textAlign: "left",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {text}
    </button>
  );
}