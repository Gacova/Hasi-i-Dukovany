export default function Akce() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Akce</h1>

      <div className="grid gap-6">
        {[
          {
            title: "Soutěž v požárním útoku",
            text: "Popis akce doplníš později.",
          },
          {
            title: "Dětský den",
            text: "Akce pro děti a rodiče.",
          },
          {
            title: "Hasičský ples",
            text: "Společenská akce pro veřejnost.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[2rem] border border-neutral-200 p-6 shadow-sm"
          >
            <h2 className="text-2xl font-semibold">{item.title}</h2>
            <p className="mt-3 text-neutral-600">{item.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}