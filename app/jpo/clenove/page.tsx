import Link from "next/link";

export default function OJednotcePage() {
  return (
    <main className="min-h-screen bg-white px-6 pt-20 pb-14">
      <section className="mx-auto max-w-5xl">
        {/* 🔙 ZPĚT */}
        <Link
          href="/jpo"
          className="block text-sm text-neutral-500 transition hover:text-red-700"
        >
          ← Zpět na JPO
        </Link>

        {/* 🔥 NADPIS */}
        <div className="mt-6">
          <div className="flex items-baseline gap-4">
            <h1 className="text-4xl font-bold text-neutral-950">
              O jednotce
            </h1>

            <span className="text-4xl font-bold text-red-700">
              JPO Dukovany
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}