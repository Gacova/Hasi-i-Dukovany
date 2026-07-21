"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Profile = {
  full_name: string | null;
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

type FilterType = "Vše" | "Otevřené" | "Hotovo" | "Moje";

export default function UkolyPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentUserId, setCurrentUserId] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("Vše");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    initializePage();
  }, []);

  async function initializePage() {
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      router.push("/admin/login");
      return;
    }

    setCurrentUserId(sessionData.session.user.id);
    await loadTasks();
  }

  async function loadTasks() {
    setLoading(true);
    setErrorMessage("");

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
            full_name
          ),
          creator:profiles!tasks_created_by_fkey (
            full_name
          )
        `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Chyba při načítání úkolů:", error);
      setErrorMessage("Úkoly se nepodařilo načíst.");
      setLoading(false);
      return;
    }

    const loadedTasks = (data || []) as unknown as Task[];

    setTasks(loadedTasks);

    if (loadedTasks.length > 0) {
      setSelectedTask(loadedTasks[0]);
    }

    setLoading(false);
  }

  function isCompleted(task: Task) {
    return task.status === "Hotovo";
  }

  const totalCount = tasks.length;

  const openCount = tasks.filter((task) => !isCompleted(task)).length;

  const completedCount = tasks.filter((task) => isCompleted(task)).length;

  const myTasksCount = tasks.filter(
    (task) => task.assigned_to === currentUserId && !isCompleted(task)
  ).length;

  const filteredTasks = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesFilter =
        activeFilter === "Vše" ||
        (activeFilter === "Otevřené" && !isCompleted(task)) ||
        (activeFilter === "Hotovo" && isCompleted(task)) ||
        (activeFilter === "Moje" &&
          task.assigned_to === currentUserId &&
          !isCompleted(task));

      const assigneeName = getProfileName(task.assignee).toLowerCase();

      const matchesSearch =
        search.length === 0 ||
        task.title.toLowerCase().includes(search) ||
        task.description?.toLowerCase().includes(search) ||
        task.category?.toLowerCase().includes(search) ||
        task.priority.toLowerCase().includes(search) ||
        assigneeName.includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [tasks, activeFilter, searchText, currentUserId]);

  function getProfileName(profile: Profile | Profile[] | null) {
    if (!profile) {
      return "Nepřiřazeno";
    }

    if (Array.isArray(profile)) {
      return profile[0]?.full_name || "Nepřiřazeno";
    }

    return profile.full_name || "Nepřiřazeno";
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

  function getPriorityColor(priority: string) {
    if (priority === "Kritická") {
      return "#dc2626";
    }

    if (priority === "Vysoká") {
      return "#f97316";
    }

    if (priority === "Nízká") {
      return "#3b82f6";
    }

    return "#f59e0b";
  }

  function getStatusStyle(task: Task) {
    if (isCompleted(task)) {
      return {
        label: "Hotovo",
        background: "#dcfce7",
        color: "#15803d",
      };
    }

    return {
      label: "Otevřené",
      background: "#ffedd5",
      color: "#c2410c",
    };
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
        <div style={{ maxWidth: "1500px", margin: "0 auto" }}>
          <p style={{ color: "#6b7280", fontSize: "18px" }}>
            Načítám úkoly...
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
          maxWidth: "1500px",
          margin: "0 auto",
          padding: "32px 24px 80px",
        }}
      >
        <a
          href="/admin"
          style={{
            color: "#dc2626",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: 800,
          }}
        >
          ← Zpět do administrace
        </a>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "24px",
            marginBottom: "28px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(42px, 8vw, 58px)",
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: "-1.5px",
              }}
            >
              Úkoly
            </h1>

            <p
              style={{
                margin: "14px 0 0",
                color: "#6b7280",
                fontSize: "17px",
              }}
            >
              Přehled všech ticketů seřazených od nejnovějších.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/admin/ukoly/novy")}
            style={{
              border: "none",
              borderRadius: "14px",
              padding: "15px 24px",
              background: "#dc2626",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 12px 28px rgba(220,38,38,0.2)",
            }}
          >
            ＋ Nový úkol
          </button>
        </div>

        <section className="statistics-grid">
          <StatCard
            icon="📋"
            value={totalCount}
            label="Celkem ticketů"
            description="Všechny úkoly"
          />

          <StatCard
            icon="🔨"
            value={openCount}
            label="Otevřené"
            description="Právě se zpracovávají"
          />

          <StatCard
            icon="✅"
            value={completedCount}
            label="Hotovo"
            description="Dokončené úkoly"
          />

          <StatCard
            icon="👤"
            value={myTasksCount}
            label="Moje úkoly"
            description="Přiřazené mně"
          />
        </section>

        {errorMessage && (
          <div
            style={{
              marginTop: "22px",
              padding: "16px 18px",
              borderRadius: "14px",
              background: "#fee2e2",
              color: "#991b1b",
              fontWeight: 700,
            }}
          >
            {errorMessage}
          </div>
        )}

        <section
          className={`main-grid ${
            selectedTask ? "main-grid-with-detail" : ""
          }`}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "20px",
                padding: "16px",
                marginBottom: "14px",
                boxShadow: "0 8px 22px rgba(0,0,0,0.04)",
              }}
            >
              <div className="filter-grid">
                <input
                  type="search"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Hledat podle názvu, popisu nebo přiřazeného..."
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    border: "1px solid #d1d5db",
                    borderRadius: "13px",
                    padding: "14px 16px",
                    fontSize: "15px",
                    outline: "none",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  {(
                    ["Vše", "Otevřené", "Hotovo", "Moje"] as FilterType[]
                  ).map((filter) => {
                    const active = activeFilter === filter;

                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        style={{
                          border: active
                            ? "1px solid #dc2626"
                            : "1px solid #d1d5db",
                          borderRadius: "11px",
                          padding: "11px 15px",
                          background: active ? "#fff1f2" : "#ffffff",
                          color: active ? "#dc2626" : "#374151",
                          fontSize: "14px",
                          fontWeight: 800,
                          cursor: "pointer",
                        }}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "22px",
                overflow: "hidden",
                boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
              }}
            >
              {filteredTasks.length === 0 ? (
                <div
                  style={{
                    minHeight: "260px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#9ca3af",
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  <div style={{ fontSize: "46px", marginBottom: "12px" }}>
                    📭
                  </div>

                  <strong style={{ fontSize: "17px" }}>
                    Žádné tickety
                  </strong>
                </div>
              ) : (
                filteredTasks.map((task, index) => {
                  const statusStyle = getStatusStyle(task);
                  const isSelected = selectedTask?.id === task.id;

                  return (
                    <article
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      style={{
                        padding: "19px 20px",
                        borderBottom:
                          index === filteredTasks.length - 1
                            ? "none"
                            : "1px solid #eef2f7",
                        background: isSelected ? "#fff7f7" : "#ffffff",
                        cursor: "pointer",
                        transition: "background 0.15s ease",
                      }}
                    >
                      <div className="task-row">
                        <div
                          style={{
                            display: "flex",
                            gap: "13px",
                            minWidth: 0,
                          }}
                        >
                          <span
                            style={{
                              width: "9px",
                              height: "9px",
                              marginTop: "7px",
                              borderRadius: "999px",
                              background: getPriorityColor(task.priority),
                              flexShrink: 0,
                            }}
                          />

                          <div style={{ minWidth: 0 }}>
                            <h3
                              style={{
                                margin: 0,
                                fontSize: "17px",
                                lineHeight: 1.35,
                                fontWeight: 900,
                              }}
                            >
                              {task.title}
                            </h3>

                            <p
                              style={{
                                margin: "5px 0 0",
                                color: "#6b7280",
                                fontSize: "13px",
                              }}
                            >
                              {task.category || "Bez kategorie"}
                            </p>
                          </div>
                        </div>

                        <span
                          style={{
                            display: "inline-flex",
                            justifyContent: "center",
                            borderRadius: "999px",
                            padding: "7px 11px",
                            background: statusStyle.background,
                            color: statusStyle.color,
                            fontSize: "12px",
                            fontWeight: 900,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {statusStyle.label}
                        </span>

                        <span
                          style={{
                            color: "#374151",
                            fontSize: "14px",
                            fontWeight: 700,
                          }}
                        >
                          👤 {getProfileName(task.assignee)}
                        </span>

                        <span
                          style={{
                            color: task.due_date ? "#374151" : "#9ca3af",
                            fontSize: "14px",
                            fontWeight: 700,
                            whiteSpace: "nowrap",
                          }}
                        >
                          📅 {formatDate(task.due_date)}
                        </span>

                        <span
                          style={{
                            color: "#9ca3af",
                            fontSize: "20px",
                            fontWeight: 700,
                          }}
                        >
                          ›
                        </span>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>

          {selectedTask && (
            <aside
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "22px",
                padding: "26px",
                boxShadow: "0 10px 28px rgba(0,0,0,0.05)",
                alignSelf: "start",
                position: "sticky",
                top: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    borderRadius: "999px",
                    padding: "7px 11px",
                    background: getStatusStyle(selectedTask).background,
                    color: getStatusStyle(selectedTask).color,
                    fontSize: "12px",
                    fontWeight: 900,
                  }}
                >
                  {getStatusStyle(selectedTask).label}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedTask(null)}
                  aria-label="Zavřít detail"
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#6b7280",
                    fontSize: "24px",
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>

              <h2
                style={{
                  margin: "24px 0 12px",
                  fontSize: "30px",
                  lineHeight: 1.15,
                  fontWeight: 900,
                }}
              >
                {selectedTask.title}
              </h2>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "14px",
                  color: "#4b5563",
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "24px",
                }}
              >
                <span>🏷 {selectedTask.category || "Bez kategorie"}</span>
                <span>📅 {formatDate(selectedTask.due_date)}</span>
              </div>

              <DetailBlock title="Přiřazeno">
                {getProfileName(selectedTask.assignee)}
              </DetailBlock>

              <DetailBlock title="Priorita">
                <span
                  style={{
                    color: getPriorityColor(selectedTask.priority),
                    fontWeight: 900,
                  }}
                >
                  {selectedTask.priority}
                </span>
              </DetailBlock>

              <DetailBlock title="Popis">
                {selectedTask.description || "Bez popisu."}
              </DetailBlock>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "18px",
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: "20px",
                  marginTop: "22px",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: "12px",
                      fontWeight: 800,
                      marginBottom: "6px",
                    }}
                  >
                    Přidáno
                  </div>

                  <div style={{ fontSize: "14px", fontWeight: 700 }}>
                    {formatDateTime(selectedTask.created_at)}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: "12px",
                      fontWeight: 800,
                      marginBottom: "6px",
                    }}
                  >
                    Vytvořil
                  </div>

                  <div style={{ fontSize: "14px", fontWeight: 700 }}>
                    {getProfileName(selectedTask.creator)}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  router.push(`/admin/ukoly/${selectedTask.id}`)
                }
                style={{
                  width: "100%",
                  marginTop: "26px",
                  border: "none",
                  borderRadius: "13px",
                  padding: "14px 18px",
                  background: "#dc2626",
                  color: "#ffffff",
                  fontSize: "15px",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Otevřít celý detail
              </button>
            </aside>
          )}
        </section>
      </div>

      <style jsx>{`
        .statistics-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }

        .main-grid-with-detail {
          grid-template-columns: minmax(0, 1.35fr) minmax(340px, 0.65fr);
        }

        .filter-grid {
          display: grid;
          grid-template-columns: minmax(240px, 1fr) auto;
          gap: 14px;
          align-items: center;
        }

        .task-row {
          display: grid;
          grid-template-columns:
            minmax(210px, 1fr)
            auto
            minmax(150px, 0.7fr)
            auto
            20px;
          gap: 16px;
          align-items: center;
        }

        @media (max-width: 1100px) {
          .statistics-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .main-grid-with-detail {
            grid-template-columns: 1fr;
          }

          aside {
            position: static !important;
          }
        }

        @media (max-width: 760px) {
          .statistics-grid {
            grid-template-columns: 1fr;
          }

          .filter-grid {
            grid-template-columns: 1fr;
          }

          .task-row {
            grid-template-columns: 1fr auto;
          }

          .task-row > span:nth-of-type(2),
          .task-row > span:nth-of-type(3) {
            grid-column: 1 / -1;
          }

          .task-row > span:last-child {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}

function StatCard({
  icon,
  value,
  label,
  description,
}: {
  icon: string;
  value: number;
  label: string;
  description: string;
}) {
  return (
    <article
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "20px",
        padding: "21px",
        boxShadow: "0 8px 22px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "14px",
            background: "#fff1f2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "25px",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        <div>
          <div
            style={{
              fontSize: "30px",
              lineHeight: 1,
              fontWeight: 900,
            }}
          >
            {value}
          </div>

          <div
            style={{
              marginTop: "7px",
              fontSize: "15px",
              fontWeight: 900,
            }}
          >
            {label}
          </div>

          <div
            style={{
              marginTop: "4px",
              color: "#6b7280",
              fontSize: "12px",
            }}
          >
            {description}
          </div>
        </div>
      </div>
    </article>
  );
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        borderTop: "1px solid #e5e7eb",
        paddingTop: "18px",
        marginTop: "18px",
      }}
    >
      <h3
        style={{
          margin: "0 0 8px",
          fontSize: "14px",
          fontWeight: 900,
        }}
      >
        {title}
      </h3>

      <div
        style={{
          color: "#4b5563",
          fontSize: "15px",
          lineHeight: 1.6,
        }}
      >
        {children}
      </div>
    </div>
  );
}