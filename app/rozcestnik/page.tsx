export default function Rozcestnik() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-6">

        {/* SDH */}
        <a
          href="/"
          className="p-8 rounded-2xl bg-white shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold mb-2 text-red-600">
            SDH Dukovany
          </h2>
          <p className="text-neutral-600">
            Spolek, akce, tréninky, tábor, komunita.
          </p>
        </a>

        {/* JPO */}
        <a
          href="/jpo"
          className="p-8 rounded-2xl bg-white shadow hover:shadow-lg transition"
        >
          <h2 className="text-2xl font-bold mb-2 text-blue-600">
            JPO Dukovany
          </h2>
          <p className="text-neutral-600">
            Výjezdy, zásahy, jednotka požární ochrany.
          </p>
        </a>

      </div>
    </main>
  );
}