export default function Treninky() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Tréninky</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {[
          {
            title: "Mladí hasiči",
            text: "Pravidelné tréninky zaměřené na pohyb, disciplínu a spolupráci.",
          },
          {
            title: "Dospělí",
            text: "Tréninky zaměřené na fyzickou přípravu a zásahovou činnost.",
          },
          {
            title: "Sokolovna",
            text: "Zimní příprava probíhá v sokolovně.",
          },
          {
            title: "Sezóna",
            text: "Příprava na soutěže a závody.",
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