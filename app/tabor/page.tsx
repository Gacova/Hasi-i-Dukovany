export default function Tabor() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Tábor</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-neutral-200 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Letní tábor SDH Dukovany</h2>
          <p className="mt-4 text-neutral-600">
            Sem doplníš hlavní informace o táboře, termín, místo a základní popis.
          </p>
        </div>

        <div className="rounded-[2rem] border border-neutral-200 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">Informace pro rodiče</h2>
          <p className="mt-4 text-neutral-600">
            Sem později doplníš přihlášku, seznam věcí a další důležité informace.
          </p>
        </div>
      </div>
    </main>
  );
}