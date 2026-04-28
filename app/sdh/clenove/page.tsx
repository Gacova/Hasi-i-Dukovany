"use client";

import Link from "next/link";

export default function ClenovePage() {
  const members = [
    { name: "Jan Novák", age: 34, group: "Muži" },
    { name: "Petr Svoboda", age: 41, group: "Muži" },
    { name: "Tomáš Dvořák", age: 29, group: "Muži" },
    { name: "Michal Procházka", age: 37, group: "Muži" },

    { name: "Jana Novotná", age: 32, group: "Ženy" },
    { name: "Petra Králová", age: 28, group: "Ženy" },

    { name: "David Konečný", age: 16, group: "Mládež" },
    { name: "Vojtěch Malý", age: 14, group: "Mládež" },
  ];

  const groups = ["Muži", "Ženy", "Mládež"];

  return (
    <main className="min-h-screen bg-stone-100">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10">
          <Link
            href="/sdh"
            className="text-sm font-medium text-neutral-600 hover:text-red-700"
          >
            ← Zpět na SDH
          </Link>
        </div>

        <div className="mb-12">
          <div className="flex items-baseline gap-4">
            <h1 className="text-4xl font-bold text-neutral-950">
              Členové
            </h1>

            <span className="text-4xl font-bold text-red-700">
              SDH Dukovany
            </span>
          </div>

          <p className="mt-6 text-lg text-neutral-600">
            Přehled členů sboru dobrovolných hasičů Dukovany.
          </p>
        </div>

        <div className="space-y-12">
          {groups.map((group) => {
            const groupMembers = members.filter(
              (member) => member.group === group
            );

            return (
              <section
                key={group}
                className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-red-700">
                    {group}
                  </h2>

                  <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-700">
                    {groupMembers.length}
                  </span>
                </div>

                <div className="divide-y divide-neutral-200">
                  {groupMembers.map((member) => (
                    <div
                      key={member.name}
                      className="
                        flex items-center justify-between px-3 py-4
                        odd:bg-white even:bg-stone-100
                        cursor-pointer
                        transition-all duration-200 ease-out
                        hover:!bg-stone-200 hover:-translate-y-1 hover:shadow-md
                      "
                    >
                      <p className="font-semibold text-neutral-900">
                        {member.name}
                      </p>

                      {group !== "Mládež" && (
                        <span className="text-sm text-neutral-600">
                          {member.age} let
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
}


