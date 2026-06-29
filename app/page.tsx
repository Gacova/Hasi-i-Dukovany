import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto flex max-w-7xl flex-col items-center px-5 py-10 text-center sm:px-6 sm:py-16">
        <h1 className="text-4xl font-bold sm:text-5xl">
          <span className="text-red-700">Hasiči </span>
          <span className="text-neutral-900">Dukovany</span>
        </h1>

        <p className="mt-4 text-base text-neutral-600 sm:text-lg">
          Vyberte, kam chcete pokračovat
        </p>

        <div className="mx-auto mt-10 grid w-full max-w-sm gap-6 sm:mt-14 sm:max-w-5xl md:grid-cols-2 md:gap-8">
          {/* SDH */}
          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="h-64 w-full overflow-hidden sm:h-80 md:h-96">
              <img
                src="/sdh.jpg"
                alt="SDH Dukovany"
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
              />
            </div>

            <div className="p-6 text-left sm:p-8">
              <h2 className="text-2xl font-bold sm:text-3xl">
                <span className="text-red-700">SDH </span>
                <span className="text-neutral-900">Dukovany</span>
              </h2>

              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                Mladí hasiči, tréninky, akce, tábor a život sboru.
              </p>

              <div className="mt-6 text-center">
                <Link
                  href="/sdh"
                  className="inline-block w-full rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800 sm:w-auto"
                >
                  Přejít na SDH
                </Link>
              </div>
            </div>
          </div>

          {/* JPO */}
          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="h-64 w-full overflow-hidden bg-white sm:h-80 md:h-96">
              <img
                src="/jpo.png"
                alt="JPO Dukovany"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="p-6 text-left sm:p-8">
              <h2 className="text-2xl font-bold sm:text-3xl">
                <span className="text-red-700">JPO </span>
                <span className="text-neutral-900">Dukovany</span>
              </h2>

              <p className="mt-3 text-sm text-neutral-600 sm:text-base">
                Zásahová jednotka, výjezdy, technika a důležité informace.
              </p>

              <div className="mt-6 text-center">
                <Link
                  href="/jpo"
                  className="inline-block w-full rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800 sm:w-auto"
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