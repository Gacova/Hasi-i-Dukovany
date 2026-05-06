import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Member = {
  id: string;
  name: string;
  role: string;
  group: string;
  section: string;
};

export default async function ClenovePage() {
  const { data: members } = await supabase
    .from("members")
    .select("*")
    .eq("section", "SDH");

  const muzi =
    members?.filter((member: Member) => member.group === "Muži") || [];

  const zeny =
    members?.filter((member: Member) => member.group === "Ženy") || [];

  const mladez =
    members?.filter((member: Member) => member.group === "Mládež") || [];

  const groups = [
    { title: "Muži", data: muzi },
    { title: "Ženy", data: zeny },
    { title: "Mládež", data: mladez },
  ];

  return (
    <main className="min-h-screen bg-white px-6 py-14">
      {/* 🔥 HOVER STYLE */}
      <style>
        {`
          .member-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding: 14px 16px;
            border-radius: 16px;
            border: 1px solid transparent;
            transition: all 180ms ease;
          }

          .member-row:hover {
            background: #f9fafb;
            border-color: #e5e7eb;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
            transform: translateY(-2px);
          }
        `}
      </style>

      <section className="mx-auto max-w-5xl">
        {/* 🔙 ZPĚT */}
        <Link
          href="/sdh"
          className="mt-8 block text-sm text-neutral-500 transition hover:text-red-700"
        >
          ← Zpět na SDH
        </Link>

        {/* 🔥 NADPIS */}
        <div className="mt-6 mb-12">
          <div className="flex items-baseline gap-4">
            <h1 className="text-4xl font-bold text-neutral-950">
              Členové
            </h1>

            <span className="text-4xl font-bold text-red-700">
              SDH Dukovany
            </span>
          </div>

          <p className="mt-4 text-neutral-600">
            Přehled členů sboru dobrovolných hasičů.
          </p>
        </div>

        {/* 🔥 SEZNAM */}
        <div className="space-y-8">
          {groups.map((group) => (
            <section
              key={group.title}
              className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-red-700">
                  {group.title}
                </h2>

                <span className="font-bold text-red-700">
                  {group.data.length}
                </span>
              </div>

              <div className="space-y-2">
                {group.data.map((member: Member) => (
                  <div key={member.id} className="member-row">
                    <span className="font-semibold text-neutral-950">
                      {member.name}
                    </span>

                    <span className="text-sm text-neutral-600">
                      {member.role}
                    </span>
                  </div>
                ))}

                {group.data.length === 0 && (
                  <p className="px-4 py-3 text-sm text-neutral-400">
                    Zatím zde nejsou žádní členové.
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}