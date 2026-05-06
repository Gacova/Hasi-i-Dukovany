import Link from "next/link";

export default function AkcePage() {
  const akce = [
    {
      title: "Pálení čarodějnic",
      date: "30. 4. 2026 od 17:00",
      place: "Staré fotbalové hřiště, Dukovany",
      image: "/carodejnice.jpg",
    },
  ];

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
            <h1 className="text-4xl font-bold text-neutral-950">
              Akce
            </h1>

            <span className="text-4xl font-bold text-red-700">
              SDH Dukovany
            </span>
          </div>

          <p className="mt-4 text-neutral-600">
            Soutěže, společné akce a další dění.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {akce.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">
                <h2 className="text-xl font-bold text-red-700">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm font-semibold text-neutral-800">
                  {item.date}
                </p>

                <p className="mt-1 text-sm text-neutral-600">
                  {item.place}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}