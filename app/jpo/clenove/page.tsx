"use client";

import Link from "next/link";

export default function JpoClenovePage() {
  const members = [
    { name: "Pavel Stuchlík", role: "Velitel" },
    { name: "Jan Vrbka", role: "Zástupce velitele" },
    { name: "Lukáš Seidl", role: "Strojník" },
    { name: "Tomáš Vorel", role: "Hasič" },
    { name: "Vladimír Troščák", role: "Hasič" },
  ];

  return (
    <main className="min-h-screen bg-stone-100">
      <section className="mx-auto max-w-5xl px-6 py-16">

        {/* Zpět */}
        <div className="mb-10">
          <Link
            href="/jpo"
            className="text-sm font-medium text-neutral-600 hover:text-red-700"
          >
            ← Zpět na JPO
          </Link>
        </div>

        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-baseline gap-4">
            <h1 className="text-4xl font-bold text-neutral-950">
              Členové
            </h1>

            <span className="text-4xl font-bold text-red-700">
              JPO Dukovany
            </span>
          </div>

          <p className="mt-6 text-lg text-neutral-600">
            Přehled členů jednotky požární ochrany.
          </p>
        </div>

        {/* SEZNAM */}
        <section className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">

          {/* TADY JE TEN SPRÁVNÝ HEADER */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-red-700">
              Členové
            </h2>

            <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-bold text-red-700">
              {members.length}
            </span>
          </div>

          <div className="divide-y divide-neutral-200">
            {members.map((member, index) => (
              <div
                key={member.name}
                className={`flex items-center justify-between px-4 py-4 transition-all duration-200 ease-out ${
                  index % 2 === 0 ? "bg-white" : "bg-stone-100"
                } hover:bg-stone-200 hover:-translate-y-1 hover:shadow-md`}
              >
                <p className="font-semibold text-neutral-900">
                  {member.name}
                </p>

                <span className="text-sm text-neutral-600">
                  {member.role}
                </span>
              </div>
            ))}
          </div>

        </section>

      </section>
    </main>
  );
}