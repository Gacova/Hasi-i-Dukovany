import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-16 text-center">
        <h1 className="text-5xl font-bold">
          <span className="text-red-700">Hasiči </span>
          <span className="text-neutral-900">Dukovany</span>
        </h1>

        <p className="mt-4 text-lg text-neutral-600">
          Vyberte, kam chcete pokračovat
        </p>

        <div className="mt-14 grid w-full max-w-5xl gap-8 md:grid-cols-2">
          {/* SDH */}
          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="h-96 w-full overflow-hidden">
              <img
                src="/sdh.jpg"
                alt="SDH Dukovany"
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>

            <div className="p-8 text-left">
              <h2 className="text-3xl font-bold">
                <span className="text-red-700">SDH </span>
                <span className="text-neutral-900">Dukovany</span>
              </h2>

              <p className="mt-3 text-neutral-600">
                Mladí hasiči, tréninky, akce, tábor a život sboru.
              </p>

              <div className="mt-6 text-center">
                <Link
                  href="/sdh"
                  className="inline-block rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
                >
                  Přejít na SDH
                </Link>
              </div>
            </div>
          </div>

          {/* JPO */}
          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="h-96 w-full overflow-hidden bg-white">
              <img
                src="/jpo.png"
                alt="JPO Dukovany"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="p-8 text-left">
              <h2 className="text-3xl font-bold">
                <span className="text-red-700">JPO </span>
                <span className="text-neutral-900">Dukovany</span>
              </h2>

              <p className="mt-3 text-neutral-600">
                Zásahová jednotka, výjezdy, technika a důležité informace.
              </p>

              <div className="mt-6 text-center">
                <Link
                  href="/jpo"
                  className="inline-block rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
                >
                  Přejít na JPO
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}