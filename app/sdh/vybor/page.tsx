import Link from "next/link";

export default function VyborPage() {
  const committeeMembers = [
    {
      name: "Marcela Vrbková",
      role: "Starostka SDH",
      email: "mail",
    },
    {
      name: "Jan Vrbka",
      role: "1. náměstek starostky",
      email: "mail",
    },
    {
      name: "Bc. Pavel Stuchlík, DiS.",
      role: "Velitel JPO",
      email: "mail",
      image: "/pavel.jpg",
    },
    {
      name: "Ing. Lukáš Seidl",
      role: "Hospodář",
      email: "mail",
    },
    {
      name: "Kristýna Gacova",
      role: "Vedoucí mládeže",
      email: "gacova@centrum.cz",
      image: "/gacova.jpg",
    },
    {
      name: "Vladimír Troščák",
      role: "Člen výboru",
      email: "mail",
    },
    {
      name: "Tomáš Vorel",
      role: "Člen výboru",
      email: "mail",
    },
  ];

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-5xl px-4 py-10">
        {/* Zpět */}
        <div className="mb-6">
          <Link
            href="/sdh"
            className="text-sm font-medium text-neutral-600 hover:text-red-700"
          >
            ← Zpět na SDH
          </Link>
        </div>

        {/* HEADER STEJNÝ JAKO ČLENOVÉ */}
        <div className="mb-8">
          <div className="flex items-baseline gap-4">
            <h1 className="text-3xl font-bold text-neutral-900">
              Výbor
            </h1>

            <span className="text-3xl font-bold text-red-700">
              SDH Dukovany
            </span>
          </div>

          <p className="mt-4 text-neutral-600">
            Přehled členů výboru SDH a jejich funkcí.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {committeeMembers.map((member) => (
            <div
              key={member.name}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* FOTO */}
              <div className="h-36 w-full bg-neutral-100 flex items-center justify-center p-3">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-xs text-neutral-400">
                    Fotka člena
                  </div>
                )}
              </div>

              {/* TEXT */}
              <div className="p-4 text-center">
                <h2 className="text-sm font-semibold leading-snug text-neutral-900 break-words min-h-[40px] flex items-center justify-center">
                  {member.name}
                </h2>

                <p className="mt-1 text-xs text-neutral-600">
                  {member.role}
                </p>

                {member.email !== "mail" && (
                  <p className="mt-2 text-xs text-red-600 break-all">
                    {member.email}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}