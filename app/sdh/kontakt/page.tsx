import Link from "next/link";

export default function KontaktPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-14">
      <section className="mx-auto max-w-5xl">
        <Link
          href="/sdh"
          className="mt-8 block text-sm text-neutral-500 transition hover:text-red-700"
        >
          ← Zpět na SDH
        </Link>

        <div className="mt-6 mb-12">
          <div className="flex items-baseline gap-4">
            <h1 className="text-4xl font-bold text-neutral-950">Kontakt</h1>

            <span className="text-4xl font-bold text-red-700">
              SDH Dukovany
            </span>
          </div>

          <p className="mt-4 text-neutral-600">
            Kontaktní informace na SDH Dukovany.
          </p>
        </div>
      </section>
    </main>
  );
}