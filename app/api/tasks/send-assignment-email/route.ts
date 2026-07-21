import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { supabaseServer } from "@/lib/supabaseServer";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL!;

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const resendApiKey =
  process.env.RESEND_API_KEY!;

if (!supabaseUrl) {
  throw new Error(
    "Chybí NEXT_PUBLIC_SUPABASE_URL."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Chybí NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

if (!resendApiKey) {
  throw new Error(
    "Chybí RESEND_API_KEY."
  );
}

const resend = new Resend(resendApiKey);

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type RequestBody = {
  taskId?: unknown;
};

type DatabaseRecord = Record<string, unknown>;

export async function POST(
  request: NextRequest
) {
  try {
    const authorization =
      request.headers.get("authorization");

    if (
      !authorization?.startsWith("Bearer ")
    ) {
      return NextResponse.json(
        {
          error:
            "Uživatel není přihlášený.",
        },
        {
          status: 401,
        }
      );
    }

    const accessToken = authorization
      .slice("Bearer ".length)
      .trim();

    if (!accessToken) {
      return NextResponse.json(
        {
          error:
            "Chybí přihlašovací token.",
        },
        {
          status: 401,
        }
      );
    }

    const {
      data: { user },
      error: userError,
    } =
      await supabaseServer.auth.getUser(
        accessToken
      );

    if (userError || !user) {
      console.error(
        "Chyba při ověřování uživatele:",
        userError
      );

      return NextResponse.json(
        {
          error:
            "Přihlášení není platné nebo vypršelo.",
        },
        {
          status: 401,
        }
      );
    }

    let body: RequestBody;

    try {
      body =
        (await request.json()) as RequestBody;
    } catch {
      return NextResponse.json(
        {
          error:
            "Požadavek nemá platný formát.",
        },
        {
          status: 400,
        }
      );
    }

    const taskId =
      typeof body.taskId === "string"
        ? body.taskId.trim()
        : "";

    if (!UUID_PATTERN.test(taskId)) {
      return NextResponse.json(
        {
          error:
            "ID úkolu není platné.",
        },
        {
          status: 400,
        }
      );
    }

    const userSupabase = createClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        global: {
          headers: {
            Authorization:
              `Bearer ${accessToken}`,
          },
        },
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const {
      data: taskData,
      error: taskError,
    } = await userSupabase
      .from("tasks")
      .select("*")
      .eq("id", taskId)
      .maybeSingle();

    if (taskError) {
      console.error(
        "Chyba při načítání úkolu:",
        taskError
      );

      return NextResponse.json(
        {
          error:
            "Úkol se nepodařilo načíst.",
        },
        {
          status: 500,
        }
      );
    }

    if (!taskData) {
      return NextResponse.json(
        {
          error:
            "Úkol nebyl nalezen nebo k němu nemáš oprávnění.",
        },
        {
          status: 404,
        }
      );
    }

    const task =
      taskData as DatabaseRecord;

    const createdBy =
      getString(task, "created_by");

    const assignedTo =
      getString(task, "assigned_to");

    if (createdBy !== user.id) {
      return NextResponse.json(
        {
          error:
            "K odeslání tohoto oznámení nemáš oprávnění.",
        },
        {
          status: 403,
        }
      );
    }

    if (!assignedTo) {
      return NextResponse.json({
        success: true,
        sent: false,
        message:
          "Úkol není nikomu přiřazený.",
      });
    }

    const {
      data: assigneeData,
      error: assigneeError,
    } = await userSupabase
      .from("profiles")
      .select("*")
      .eq("id", assignedTo)
      .maybeSingle();

    if (assigneeError) {
      console.error(
        "Chyba při načítání příjemce:",
        assigneeError
      );

      return NextResponse.json(
        {
          error:
            "Příjemce oznámení se nepodařil načíst.",
        },
        {
          status: 500,
        }
      );
    }

    if (!assigneeData) {
      return NextResponse.json(
        {
          error:
            "Profil přiřazeného uživatele nebyl nalezen.",
        },
        {
          status: 404,
        }
      );
    }

    const assignee =
      assigneeData as DatabaseRecord;

    const recipientEmail =
      getString(assignee, "email");

    if (!recipientEmail) {
      return NextResponse.json({
        success: true,
        sent: false,
        message:
          "Přiřazený uživatel nemá uložený e-mail.",
      });
    }

    const {
      data: creatorData,
      error: creatorError,
    } = await userSupabase
      .from("profiles")
      .select("*")
      .eq("id", createdBy)
      .maybeSingle();

    if (creatorError) {
      console.error(
        "Chyba při načítání zadavatele:",
        creatorError
      );
    }

    const creator =
      creatorData as DatabaseRecord | null;

    const taskTitle =
      getString(task, "title") ||
      "Nový úkol";

    const assigneeName =
      getProfileName(assignee) ||
      recipientEmail;

    const creatorName =
      getProfileName(creator) ||
      user.email ||
      "Administrátor";

    const priorityRaw =
      getFirstString(task, [
        "priority",
        "task_priority",
      ]);

    const category =
      getFirstString(task, [
        "category",
        "task_category",
        "type",
      ]);

    const dueDateRaw =
      getFirstString(task, [
        "due_date",
        "deadline",
        "due_at",
        "date_to",
      ]);

    const createdAtRaw =
      getFirstString(task, [
        "created_at",
        "created",
      ]);

    const priority =
      formatPriority(priorityRaw);

    const dueDate =
      formatDate(dueDateRaw);

    const createdAt =
      formatDateTime(createdAtRaw);

    const priorityColor =
      getPriorityColor(priorityRaw);

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(
        /\/$/,
        ""
      ) ?? request.nextUrl.origin;

    const taskUrl =
      `${siteUrl}/admin/ukoly/${taskId}`;

    const safeTaskTitle =
      escapeHtml(taskTitle);

    const safeTaskUrl =
      escapeHtml(taskUrl);

    const safeAssigneeName =
      escapeHtml(assigneeName);

    const safeCreatorName =
      escapeHtml(creatorName);

    const safePriority =
      escapeHtml(priority);

    const safeCategory =
      escapeHtml(category || "Neuvedena");

    const safeDueDate =
      escapeHtml(dueDate || "Bez termínu");

    const safeCreatedAt =
      escapeHtml(createdAt || "Neuvedeno");

    const informationRows = [
      createInfoRow(
        "Zadal",
        safeCreatorName
      ),
      createInfoRow(
        "Přiřazeno",
        safeAssigneeName
      ),
      createPriorityRow(
        safePriority,
        priorityColor
      ),
      createInfoRow(
        "Termín",
        safeDueDate
      ),
      createInfoRow(
        "Kategorie",
        safeCategory
      ),
      createInfoRow(
        "Vytvořeno",
        safeCreatedAt
      ),
    ].join("");

    const {
      data: emailData,
      error: emailError,
    } = await resend.emails.send({
      from:
        "SDH Dukovany <ukoly@mail.hasicidukovany.cz>",

      to: recipientEmail,

      subject:
        `Nový úkol: ${taskTitle}`,

      text: [
        `Dobrý den, ${assigneeName},`,
        "",
        `${creatorName} vám přiřadil(a) nový úkol.`,
        "",
        `Úkol: ${taskTitle}`,
        `Priorita: ${priority}`,
        `Termín: ${dueDate || "Bez termínu"}`,
        `Kategorie: ${category || "Neuvedena"}`,
        "",
        `Otevřít úkol: ${taskUrl}`,
        "",
        "SDH Dukovany",
      ].join("\n"),

      html: `
        <!doctype html>
        <html lang="cs">
          <head>
            <meta charset="utf-8">
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            >
            <title>Nový úkol</title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background-color: #f3f4f6;
              font-family: Arial, Helvetica, sans-serif;
              color: #171717;
            "
          >
            <table
              role="presentation"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              border="0"
              style="
                width: 100%;
                background-color: #f3f4f6;
              "
            >
              <tr>
                <td
                  align="center"
                  style="
                    padding: 30px 14px;
                  "
                >
                  <table
                    role="presentation"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    style="
                      width: 100%;
                      max-width: 620px;
                    "
                  >
                    <tr>
                      <td
                        style="
                          background-color: #991b1b;
                          border-radius: 18px 18px 0 0;
                          padding: 24px 30px;
                        "
                      >
                        <table
                          role="presentation"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                        >
                          <tr>
                            <td>
                              <div
                                style="
                                  color: #ffffff;
                                  font-size: 13px;
                                  font-weight: 700;
                                  letter-spacing: 1px;
                                  text-transform: uppercase;
                                "
                              >
                                SDH Dukovany
                              </div>

                              <div
                                style="
                                  margin-top: 7px;
                                  color: #ffffff;
                                  font-size: 25px;
                                  font-weight: 800;
                                  line-height: 1.25;
                                "
                              >
                                Nový přiřazený úkol
                              </div>
                            </td>

                            <td
                              align="right"
                              style="
                                width: 55px;
                                font-size: 38px;
                              "
                            >
                              🚒
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          background-color: #ffffff;
                          border-left: 1px solid #e5e7eb;
                          border-right: 1px solid #e5e7eb;
                          padding: 32px 30px 8px;
                        "
                      >
                        <p
                          style="
                            margin: 0 0 18px;
                            font-size: 17px;
                            line-height: 1.7;
                            color: #374151;
                          "
                        >
                          Dobrý den,
                          <strong>
                            ${safeAssigneeName}
                          </strong>,
                        </p>

                        <p
                          style="
                            margin: 0 0 28px;
                            font-size: 16px;
                            line-height: 1.7;
                            color: #4b5563;
                          "
                        >
                          <strong>
                            ${safeCreatorName}
                          </strong>
                          vám přiřadil(a) nový úkol
                          v administraci SDH Dukovany.
                        </p>

                        <div
                          style="
                            border-left: 5px solid ${priorityColor};
                            background-color: #f9fafb;
                            border-radius: 12px;
                            padding: 21px;
                            margin-bottom: 26px;
                          "
                        >
                          <div
                            style="
                              margin-bottom: 8px;
                              color: #9ca3af;
                              font-size: 12px;
                              font-weight: 700;
                              letter-spacing: 0.7px;
                              text-transform: uppercase;
                            "
                          >
                            Název úkolu
                          </div>

                          <div
                            style="
                              color: #111827;
                              font-size: 23px;
                              font-weight: 800;
                              line-height: 1.4;
                            "
                          >
                            ${safeTaskTitle}
                          </div>
                        </div>

                        <table
                          role="presentation"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                          style="
                            width: 100%;
                            border-collapse: collapse;
                            margin-bottom: 28px;
                          "
                        >
                          ${informationRows}
                        </table>

                        <table
                          role="presentation"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                        >
                          <tr>
                            <td
                              align="center"
                              bgcolor="#b91c1c"
                              style="
                                border-radius: 11px;
                              "
                            >
                              <a
                                href="${safeTaskUrl}"
                                target="_blank"
                                style="
                                  display: block;
                                  padding: 15px 22px;
                                  background-color: #b91c1c;
                                  border-radius: 11px;
                                  color: #ffffff;
                                  font-size: 16px;
                                  font-weight: 800;
                                  text-align: center;
                                  text-decoration: none;
                                "
                              >
                                Otevřít úkol
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          background-color: #ffffff;
                          border-left: 1px solid #e5e7eb;
                          border-right: 1px solid #e5e7eb;
                          border-bottom: 1px solid #e5e7eb;
                          border-radius: 0 0 18px 18px;
                          padding: 28px 30px 30px;
                        "
                      >
                        <div
                          style="
                            border-top: 1px solid #e5e7eb;
                            padding-top: 21px;
                            color: #9ca3af;
                            font-size: 12px;
                            line-height: 1.6;
                            text-align: center;
                          "
                        >
                          Toto je automatická zpráva
                          z administrace SDH Dukovany.
                          Na tento e-mail není potřeba odpovídat.
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          padding: 16px 12px 0;
                          color: #9ca3af;
                          font-size: 12px;
                          text-align: center;
                        "
                      >
                        © SDH Dukovany
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (emailError) {
      console.error(
        "Chyba služby Resend:",
        emailError
      );

      return NextResponse.json(
        {
          error:
            emailError.message ||
            "E-mail se nepodařilo odeslat.",
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json({
      success: true,
      sent: true,
      emailId:
        emailData?.id ?? null,
    });
  } catch (error) {
    console.error(
      "Neočekávaná chyba při odesílání e-mailu:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Při odesílání e-mailu nastala neočekávaná chyba.",
      },
      {
        status: 500,
      }
    );
  }
}

function getString(
  record: DatabaseRecord | null,
  key: string
) {
  if (!record) {
    return "";
  }

  const value = record[key];

  return typeof value === "string"
    ? value.trim()
    : "";
}

function getFirstString(
  record: DatabaseRecord,
  keys: string[]
) {
  for (const key of keys) {
    const value = getString(
      record,
      key
    );

    if (value) {
      return value;
    }
  }

  return "";
}

function getProfileName(
  profile: DatabaseRecord | null
) {
  if (!profile) {
    return "";
  }

  return getFirstString(profile, [
    "name",
    "full_name",
    "display_name",
    "username",
  ]);
}

function formatPriority(
  value: string
) {
  const normalized =
    value.toLowerCase();

  if (
    normalized === "high" ||
    normalized === "vysoka" ||
    normalized === "vysoká"
  ) {
    return "Vysoká";
  }

  if (
    normalized === "medium" ||
    normalized === "normal" ||
    normalized === "stredni" ||
    normalized === "střední"
  ) {
    return "Střední";
  }

  if (
    normalized === "low" ||
    normalized === "nizka" ||
    normalized === "nízká"
  ) {
    return "Nízká";
  }

  if (
    normalized === "critical" ||
    normalized === "kriticka" ||
    normalized === "kritická"
  ) {
    return "Kritická";
  }

  return value || "Neuvedena";
}

function getPriorityColor(
  value: string
) {
  const normalized =
    value.toLowerCase();

  if (
    normalized.includes("critical") ||
    normalized.includes("krit")
  ) {
    return "#991b1b";
  }

  if (
    normalized.includes("high") ||
    normalized.includes("vysok")
  ) {
    return "#dc2626";
  }

  if (
    normalized.includes("medium") ||
    normalized.includes("normal") ||
    normalized.includes("střed") ||
    normalized.includes("stred")
  ) {
    return "#f59e0b";
  }

  if (
    normalized.includes("low") ||
    normalized.includes("nízk") ||
    normalized.includes("nizk")
  ) {
    return "#16a34a";
  }

  return "#6b7280";
}

function formatDate(
  value: string
) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "cs-CZ",
    {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }
  ).format(date);
}

function formatDateTime(
  value: string
) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "cs-CZ",
    {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
}

function createInfoRow(
  label: string,
  value: string
) {
  return `
    <tr>
      <td
        style="
          width: 42%;
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 8px 12px 0;
          color: #6b7280;
          font-size: 14px;
        "
      >
        ${escapeHtml(label)}
      </td>

      <td
        style="
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 0 12px 8px;
          color: #111827;
          font-size: 14px;
          font-weight: 700;
          text-align: right;
        "
      >
        ${value}
      </td>
    </tr>
  `;
}

function createPriorityRow(
  priority: string,
  color: string
) {
  return `
    <tr>
      <td
        style="
          width: 42%;
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 8px 12px 0;
          color: #6b7280;
          font-size: 14px;
        "
      >
        Priorita
      </td>

      <td
        style="
          border-bottom: 1px solid #e5e7eb;
          padding: 12px 0 12px 8px;
          text-align: right;
        "
      >
        <span
          style="
            display: inline-block;
            background-color: ${color};
            border-radius: 999px;
            color: #ffffff;
            font-size: 12px;
            font-weight: 800;
            padding: 6px 11px;
          "
        >
          ${priority}
        </span>
      </td>
    </tr>
  `;
}

function escapeHtml(
  value: string
) {
  const htmlCharacters: Record<
    string,
    string
  > = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return value.replace(
    /[&<>"']/g,
    (character) =>
      htmlCharacters[character] ??
      character
  );
}