import Link from "next/link";

export default function SdhPage() {
  return (
    <main className="bg-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-red-700"
          >
            ← Zpět na rozcestník
          </Link>
        </div>

        {/* HLAVIČKA */}
        <div className="mb-12 grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-5xl font-bold text-neutral-900">
              SDH Dukovany
            </h1>

            <p className="mt-4 text-xl text-neutral-600">
              Pomáháme, trénujeme, držíme spolu.
            </p>

            <div className="mt-8">
              <Link
                href="/sdh/kontakt"
                className="inline-block rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white hover:bg-red-800"
              >
                Přidej se k nám
              </Link>
            </div>
          </div>

          {/* 🔥 TADY JE TEN OBRÁZEK */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/small.jpg"
              alt="SDH Dukovany"
              className="w-64 h-auto rounded-2xl object-contain"
            />
          </div>
        </div>

        {/* 🔥 MEZERA POD OBRÁZKEM */}
        <div className="mt-12"></div>

        {/* DLAŽDICE */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-2xl font-bold">Výbor</h2>
            <p className="mt-3 text-neutral-600">
              Přehled členů výboru SDH a jejich funkcí.
            </p>
            <Link href="/sdh/vybor" className="mt-6 inline-block text-red-600">
              Otevřít sekci
            </Link>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-2xl font-bold">Členové</h2>
            <p className="mt-3 text-neutral-600">
              Přehled členů sboru a mladých hasičů.
            </p>
            <Link href="/sdh/clenove" className="mt-6 inline-block text-red-600">
              Otevřít sekci
            </Link>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-2xl font-bold">Tréninky</h2>
            <p className="mt-3 text-neutral-600">
              Pravidelné tréninky a důležité informace.
            </p>
            <Link href="/sdh/treninky" className="mt-6 inline-block text-red-600">
              Otevřít sekci
            </Link>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-2xl font-bold">Akce</h2>
            <p className="mt-3 text-neutral-600">
              Soutěže, společné akce a další dění.
            </p>
            <Link href="/sdh/akce" className="mt-6 inline-block text-red-600">
              Otevřít sekci
            </Link>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-2xl font-bold">Tábor</h2>
            <p className="mt-3 text-neutral-600">
              Letní tábor a informace pro děti i rodiče.
            </p>
            <Link href="/sdh/tabor" className="mt-6 inline-block text-red-600">
              Otevřít sekci
            </Link>
          </div>

          <div className="rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm hover:-translate-y-1 hover:shadow-lg">
            <h2 className="text-2xl font-bold">Galerie</h2>
            <p className="mt-3 text-neutral-600">
              Fotky z tréninků, akcí a společných setkání.
            </p>
            <Link href="/sdh/galerie" className="mt-6 inline-block text-red-600">
              Otevřít sekci
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}