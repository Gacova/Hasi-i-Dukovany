import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

type BirthdayMember = {
  name: string | null;
  section: string | null;
  birth_date: string | null;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function calculateAge(birthDate: string, today: Date) {
  const [year, month, day] = birthDate.split("-").map(Number);

  let age = today.getFullYear() - year;

  const birthdayHasNotOccurredYet =
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day);

  if (birthdayHasNotOccurredYet) {
    age -= 1;
  }

  return age;
}

function getCzechAgeText(age: number) {
  if (age === 1) {
    return "1 rok";
  }

  if (age >= 2 && age <= 4) {
    return `${age} roky`;
  }

  return `${age} let`;
}

function getPragueDateParts() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  );

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
  };
}

export async function GET(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (!cronSecret) {
      console.error("Chybí proměnná CRON_SECRET.");

      return NextResponse.json(
        { error: "Server nemá nastavený CRON_SECRET." },
        { status: 500 }
      );
    }

    if (authorization !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: "Nepovolený přístup." },
        { status: 401 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;
    const senderEmail = "ukoly@mail.hasicidukovany.cz";

    if (
      !supabaseUrl ||
      !serviceRoleKey ||
      !resendApiKey ||
      !senderEmail
    ) {
      console.error("Chybí některá serverová proměnná.");

      return NextResponse.json(
        {
          error:
            "Chybí NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY nebo RESEND_FROM_EMAIL.",
        },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const resend = new Resend(resendApiKey);

    const todayParts = getPragueDateParts();

    const today = new Date(
      todayParts.year,
      todayParts.month - 1,
      todayParts.day
    );

    const { data: memberData, error: memberError } =
      await supabaseAdmin
        .from("members")
        .select("name, section, birth_date")
        .not("birth_date", "is", null);

    if (memberError) {
      console.error("Chyba při načítání členů:", memberError);

      return NextResponse.json(
        { error: "Nepodařilo se načíst členy." },
        { status: 500 }
      );
    }

    const birthdayMembers = (
      (memberData || []) as BirthdayMember[]
    )
      .filter((member) => {
        if (!member.birth_date) {
          return false;
        }

        const [, month, day] = member.birth_date
          .split("-")
          .map(Number);

        return (
          month === todayParts.month &&
          day === todayParts.day
        );
      })
      .sort((a, b) =>
        (a.name || "").localeCompare(b.name || "", "cs")
      );

    if (birthdayMembers.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Dnes nikdo narozeniny nemá.",
        sent: false,
      });
    }

    const recipientEmails: string[] = [];
    let page = 1;
    const perPage = 1000;

    while (true) {
      const {
        data: usersData,
        error: usersError,
      } = await supabaseAdmin.auth.admin.listUsers({
        page,
        perPage,
      });

      if (usersError) {
        console.error(
          "Chyba při načítání uživatelů:",
          usersError
        );

        return NextResponse.json(
          {
            error:
              "Nepodařilo se načíst uživatele administrace.",
          },
          { status: 500 }
        );
      }

      const emailsFromPage = usersData.users
        .map((user) => user.email?.trim().toLowerCase())
        .filter(
          (email): email is string =>
            Boolean(email)
        );

      recipientEmails.push(...emailsFromPage);

      if (usersData.users.length < perPage) {
        break;
      }

      page += 1;
    }

    const uniqueRecipients = [
      ...new Set(recipientEmails),
    ];

    if (uniqueRecipients.length === 0) {
      return NextResponse.json(
        {
          error:
            "V Supabase Authentication není žádný uživatel s e-mailem.",
        },
        { status: 500 }
      );
    }

    const birthdayRows = birthdayMembers
      .map((member) => {
        const name = escapeHtml(
          member.name || "Neuvedený člen"
        );

        const section = escapeHtml(
          member.section || "SDH/JPO"
        );

        const age = member.birth_date
          ? calculateAge(member.birth_date, today)
          : null;

        const ageText =
          age === null
            ? ""
            : ` – ${getCzechAgeText(age)}`;

        return `
          <div style="
            margin: 12px 0;
            padding: 16px 18px;
            border-radius: 14px;
            background: #fff7ed;
            border: 1px solid #fed7aa;
          ">
            <div style="
              font-size: 18px;
              font-weight: 800;
              color: #111827;
            ">
              🎉 ${name}${ageText}
            </div>

            <div style="
              margin-top: 5px;
              font-size: 13px;
              color: #6b7280;
            ">
              ${section} Dukovany
            </div>
          </div>
        `;
      })
      .join("");

    const oneMember = birthdayMembers.length === 1;

    const subject = oneMember
      ? "🎂 Dnes slaví narozeniny člen SDH/JPO Dukovany"
      : "🎂 Dnes slaví narozeniny členové SDH/JPO Dukovany";

    const intro = oneMember
      ? "Informační systém Hasiči Dukovany upozorňuje, že dnes slaví narozeniny následující člen SDH/JPO Dukovany:"
      : "Informační systém Hasiči Dukovany upozorňuje, že dnes slaví narozeniny následující členové SDH/JPO Dukovany:";

    const { data: emailData, error: emailError } =
      await resend.emails.send({
        from: `Informační systém Hasiči Dukovany <${senderEmail}>`,

        /*
         * Všichni příjemci jsou v BCC, takže navzájem
         * neuvidí své e-mailové adresy.
         */
        to: senderEmail,
        bcc: uniqueRecipients,

        subject,

        html: `
          <!DOCTYPE html>
          <html lang="cs">
            <body style="
              margin: 0;
              padding: 0;
              background: #f3f4f6;
              font-family: Arial, Helvetica, sans-serif;
              color: #111827;
            ">
              <div style="
                max-width: 620px;
                margin: 0 auto;
                padding: 30px 16px;
              ">
                <div style="
                  background: #ffffff;
                  border-radius: 22px;
                  overflow: hidden;
                  border: 1px solid #e5e7eb;
                ">
                  <div style="
                    padding: 25px 28px;
                    background: #dc2626;
                    color: #ffffff;
                  ">
                    <div style="
                      font-size: 13px;
                      font-weight: 700;
                      opacity: 0.9;
                    ">
                      INFORMAČNÍ SYSTÉM
                    </div>

                    <h1 style="
                      margin: 7px 0 0;
                      font-size: 27px;
                      line-height: 1.25;
                    ">
                      Hasiči Dukovany
                    </h1>
                  </div>

                  <div style="padding: 28px;">
                    <p style="
                      margin: 0;
                      font-size: 16px;
                      line-height: 1.7;
                    ">
                      Dobrý den,
                    </p>

                    <p style="
                      margin: 15px 0 22px;
                      font-size: 16px;
                      line-height: 1.7;
                    ">
                      ${intro}
                    </p>

                    ${birthdayRows}

                    <p style="
                      margin: 24px 0 0;
                      font-size: 16px;
                      line-height: 1.7;
                    ">
                      Nezapomeňte mu/jim popřát. 😊
                    </p>

                    <p style="
                      margin: 28px 0 0;
                      font-size: 15px;
                      line-height: 1.7;
                      color: #4b5563;
                    ">
                      S pozdravem<br />
                      <strong>
                        Informační systém Hasiči Dukovany
                      </strong>
                    </p>
                  </div>
                </div>

                <p style="
                  margin: 14px 0 0;
                  text-align: center;
                  font-size: 12px;
                  color: #9ca3af;
                ">
                  Automatická zpráva – na tento e-mail
                  není nutné odpovídat.
                </p>
              </div>
            </body>
          </html>
        `,
      });

    if (emailError) {
      console.error(
        "Chyba při odesílání e-mailu:",
        emailError
      );

      return NextResponse.json(
        {
          error: "E-mail se nepodařilo odeslat.",
          details: emailError,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      sent: true,
      recipients: uniqueRecipients.length,
      birthdayMembers: birthdayMembers.map(
        (member) => member.name
      ),
      emailId: emailData?.id,
    });
  } catch (error) {
    console.error(
      "Neočekávaná chyba narozeninového cronu:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Při zpracování narozeninového e-mailu nastala neočekávaná chyba.",
      },
      { status: 500 }
    );
  }
}