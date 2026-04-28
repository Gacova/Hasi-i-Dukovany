import Link from "next/link";

export default function JpoPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-red-700"
          >
            ← Zpět na rozcestník
          </Link>
        </div>

        <div className="mb-16 grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="text-5xl font-bold text-neutral-900">
              JPO Dukovany
            </h1>

            <p className="mt-4 text-xl text-neutral-600">
              Zásahová jednotka, technika a důležité informace.
            </p>

            <div className="mt-8 mb-12">
              <Link
                href="/jpo/kontakt"
                className="inline-block rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
              >
                Kontaktovat jednotku
              </Link>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="flex h-80 w-full max-w-md items-center justify-center rounded-[2rem] bg-neutral-100 text-neutral-400">
              Hlavní fotka
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-neutral-900">O jednotce</h2>
            <p className="mt-3 text-neutral-600">
              Základní informace o zásahové jednotce.
            </p>
            <Link
              href="/jpo/o-jednotce"
              className="mt-6 inline-block text-sm font-medium text-red-600 hover:text-red-700"
            >
              Otevřít sekci
            </Link>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-neutral-900">Členové</h2>
            <p className="mt-3 text-neutral-600">
              Přehled členů jednotky.
            </p>
            <Link
              href="/jpo/clenove"
              className="mt-6 inline-block text-sm font-medium text-red-600 hover:text-red-700"
            >
              Otevřít sekci
            </Link>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-neutral-900">Výjezdy</h2>
            <p className="mt-3 text-neutral-600">
              Zásahy a stručné informace o výjezdech.
            </p>
            <Link
              href="/jpo/vyjezdy"
              className="mt-6 inline-block text-sm font-medium text-red-600 hover:text-red-700"
            >
              Otevřít sekci
            </Link>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-neutral-900">Technika</h2>
            <p className="mt-3 text-neutral-600">
              Vozidla, vybavení a používaná technika.
            </p>
            <Link
              href="/jpo/technika"
              className="mt-6 inline-block text-sm font-medium text-red-600 hover:text-red-700"
            >
              Otevřít sekci
            </Link>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-neutral-900">Galerie</h2>
            <p className="mt-3 text-neutral-600">
              Fotky z výjezdů, techniky a činnosti jednotky.
            </p>
            <Link
              href="/jpo/galerie"
              className="mt-6 inline-block text-sm font-medium text-red-600 hover:text-red-700"
            >
              Otevřít sekci
            </Link>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-neutral-900">Kontakt</h2>
            <p className="mt-3 text-neutral-600">
              Kontaktní údaje a důležité informace.
            </p>
            <Link
              href="/jpo/kontakt"
              className="mt-6 inline-block text-sm font-medium text-red-600 hover:text-red-700"
            >
              Otevřít sekci
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}