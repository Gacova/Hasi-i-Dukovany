export default function Clenove() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Členové SDH Dukovany</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {["Jan Novák", "Petr Svoboda", "Eva Malá"].map((name) => (
          <div
            key={name}
            className="rounded-[2rem] border border-neutral-200 p-6 shadow-sm text-center"
          >
            <div className="h-32 w-32 mx-auto rounded-full bg-neutral-200 mb-4" />
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-neutral-600">člen</p>
          </div>
        ))}
      </div>
    </main>
  );
}