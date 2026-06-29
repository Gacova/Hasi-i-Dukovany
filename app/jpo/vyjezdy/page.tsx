"use client";

import { useEffect, useState } from "react";
import BackLink from "@/components/BackLink";
import { supabase } from "@/lib/supabase";

type Vyjezd = {
  year: string;
  total?: string;
  text: string[];
};

type VyjezdDb = {
  id: string;
  datum: string;
  rok: number;
  typ: string;
  nazev: string;
  popis: string;
};

export default function VyjezdyPage() {
  const [dbVyjezdy, setDbVyjezdy] = useState<VyjezdDb[]>([]);
  const [active, setActive] = useState("2026");

  useEffect(() => {
    loadVyjezdy();
  }, []);

  async function loadVyjezdy() {
    const { data } = await supabase
      .from("jpo_vyjezdy")
      .select("*")
      .gte("rok", 2026)
      .order("datum", { ascending: false });

    setDbVyjezdy(data || []);
  }

  const dbText2026 = dbVyjezdy
    .filter((item) => item.rok === 2026)
    .map((item) => {
      const datum = new Date(item.datum).toLocaleDateString("cs-CZ");
      return `${datum} – ${item.typ} – ${item.nazev}. ${item.popis}`;
    });

  const years: Vyjezd[] = [
    {
      year: "2026",
      total:
        dbText2026.length > 0
          ? `Celkem ${dbText2026.length + 1}`
          : "Taktické cvičení",
      text: [
        "Taktické cvičení – AMOK – jeden útočník se zbraní Administrativní budova JE Dukovany.",
        ...dbText2026,
      ],
    },
    {
      year: "2025",
      total: "Celkem 13",
      text: [
        "11x Technická pomoc",
        "5x likvidace obtížného hmyzu.",
        "4x v letním období provzdušňování rybníka v Loučkách.",
        "2x odstranění stromu přes cestu.",
        "1x Ostatní pomoc – řízení dopravy při oslavách na JEDU.",
        "1x Požár – požár v kotelně v Tulešicích.",
        "12x VYS, 1x JHM.",
      ],
    },
    {
      year: "2024",
      total: "Celkem 15",
      text: [
        "9x Technická pomoc",
        "6x odstranění stromu.",
        "Likvidace vosího hnízda.",
        "Provzdušnění rybníka V Loučkách kvůli možnému úhynu ryb.",
        "Zajištění natlakovaného kotle s možností fyzikálního výbuchu.",
        "5x Požár",
        "Požár střechy hospodářského stavení v Tulešicích.",
        "Požár sena na poli.",
        "Požár střechy RD v Horních Dubňanech.",
        "Dopravní nehoda 2OA a NA s rizikem požáru.",
        "Požár kůlny v Dukovanech u kina.",
        "1x Záchrana osob – evakuace osob z tábora pod Templštýnem v době záplav.",
        "Požár střechy hospodářského stavení v Tulešicích byl nejzávažnější z našich zásahů toho roku. Jednotka vyjela v 17:30 a návrat byl ve 4:30 ráno. Vzhledem k nepřízni počasí, kdy mrzlo a bylo náledí, došlo při zásahu i ke dvěma zraněním.",
        "12x VYS, 3x JHM.",
      ],
    },
    {
      year: "2023",
      total: "Celkem 24",
      text: [
        "17x technická pomoc – stromy, vosy, kanalizace.",
        "1x ostatní pomoc – likvidace uhynulé drůbeže.",
        "6x požár – pole, seno, les, střecha RD.",
        "21x VYS, 3x JHM.",
      ],
    },
    {
      year: "2022",
      total: "Celkem 15",
      text: [
        "11x Technická pomoc.",
        "5x odstranění spadeného stromu.",
        "3x čerpání zatopeného sklepa.",
        "Čištění kanalizace.",
        "Likvidace vos.",
        "Destrukce zahradní boudy při silném větru.",
        "1x Ostatní pomoc – oplach komunikace v Rešicích.",
        "3x Požár.",
        "Nedohašené ohniště v lese u Rabštejna.",
        "Požár klestí v Tulešicích.",
        "Požár stohu v Medlicích.",
        "Požár v Medlicích byl nejnáročnější, obě CAS, 7 hasičů, cca od 21 do 9 ráno.",
        "12x VYS, 3x JHM.",
      ],
    },
    {
      year: "2019",
      total: "Celkem 18",
      text: [
        "9x Technická pomoc – čištění studny, 8x odstranění stromu na komunikaci.",
        "2x Technologická pomoc – dohašení ohniště po pálení.",
        "5x Požár – požár OA, požár sazí RD, požár lesa, požár bioodpadu, požár skládky dřevěného odpadu.",
        "1x Planý poplach.",
        "1x Taktické cvičení – požár učebny MŠ.",
      ],
    },
    {
      year: "2018",
      total: "Celkem 16",
      text: [
        "13x Technická pomoc – čištění komunikace, čištění kanalizace, odstranění stromů z komunikace, odstranění vosího hnízda, provzdušnění rybníka, úklid po DN, asistence při pálení klestí, čerpání studny.",
        "3x Požár – požár pole Dukovany, požár pole Horní Kounice, požár domu Rešice.",
        "14x VYS, 2x JHM.",
      ],
    },
    {
      year: "2017",
      total: "Celkem 28",
      text: [
        "21x Technická pomoc.",
        "7x Požár – požár dílny Dukovany, 2x požár lesa Kramolín, požár kombajnu Tulešice, požár trávy Horní Dubňany, požár pole Vémyslice, požár chlévské mrvy a podestýlky Dukovany.",
        "24x VYS, 4x JHM.",
      ],
    },
    {
      year: "2016",
      total: "Celkem 20",
      text: [
        "14x Technická pomoc.",
        "5x Požár – požár pole v Rouchovanech, požár osobního automobilu, požár trávy, požár skládky.",
        "1x Únik ropných produktů – oleje na vozovce.",
        "19x VYS, 1x JHM.",
      ],
    },
    {
      year: "2015",
      total: "Celkem 24",
      text: [
        "20x Technická pomoc – odstranění plechu z komunikace, vyproštění autobusu ze sněhu, čerpání vody, asistence při pálení klestí, čištění komunikace, čištění kanalizace 2x, zalévání zeleně 3x, likvidace obtížného hmyzu 10x.",
        "4x Požár – požár lesa v Jamolicích, požár osobního automobilu v Tulešicích, požár lesa v Rešicích, požár pole v Mohelně.",
        "20x VYS, 4x JHM.",
      ],
    },
    {
      year: "2010–2014",
      total: "Údaje nenalezeny",
      text: ["Údaje za období 2010–2014 nebyly dohledány."],
    },
    {
      year: "2009",
      total: "Celkem 18",
      text: [
        "10x Technická pomoc.",
        "Odstranění překážek ze silnice – strom přes cestu směr Mohelno.",
        "Čerpání vody.",
        "Odstranění překážek ze silnice – strom na místní komunikaci.",
        "Provzdušňování rybníka při nebezpečí úhynu ryb.",
        "Odstranění překážek ze silnice – strom na drátech směr Jamolice.",
        "Odstranění nebezpečného hmyzu 3x.",
        "Otevření zabouchnutého bytu.",
        "Odstranění překážek ze silnice – skála v silnici směr Mohelno.",
        "4x Technologická pomoc.",
        "2x Požár – požár potravin v RD, požár bytové jednotky v Rouchovanech.",
        "2x Dopravní nehoda – OA na křižovatce u čerpací stanice, záchrana osob z lodě přehrada Dalešice – planý poplach.",
      ],
    },
    {
      year: "2008",
      total: "Celkem 12",
      text: [
        "1x likvidace následků živelní pohromy.",
        "2x technologická pomoc.",
        "5x technická pomoc – 4x likvidace obtížného hmyzu, 1x odstraňování rozlomeného stromu.",
        "1x planý poplach – hustý kouř z lesa u přehrady.",
        "2x požár – požár kontejneru, požár kombajnu a obilného pole v Rešicích.",
        "1x likvidace nebezpečných látek – olej na vozovce.",
        "11x VYS, 1x JHM.",
      ],
    },
    {
      year: "2007",
      total: "Celkem 12",
      text: [
        "2x likvidace následků živelní pohromy.",
        "2x likvidace obtížného hmyzu.",
        "4x technologická pomoc.",
        "3x technická pomoc.",
        "1x planý poplach.",
      ],
    },
    {
      year: "2006",
      total: "Údaje nenalezeny",
      text: ["Údaje za rok 2006 nebyly dohledány."],
    },
    {
      year: "2005",
      total: "Celkem 36",
      text: [
        "1x požár.",
        "1x dopravní nehoda.",
        "3x likvidace roje včel.",
        "2x odčerpávání vody.",
        "16x technická a technologická pomoc.",
        "12x ostatní činnost pro obec.",
        "1x taktické cvičení.",
      ],
    },
  ];

  const selected = years.find((item) => item.year === active) ?? years[0];

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 32px 80px",
        }}
      >
        <BackLink href="/jpo">Zpět na JPO</BackLink>

        <h1
          style={{
            marginTop: "30px",
            marginBottom: "20px",
            fontSize: "64px",
            fontWeight: 800,
          }}
        >
          Výjezdy{" "}
          <span style={{ color: "#dc2626" }}>JPO</span>{" "}
          <span style={{ color: "#111827" }}>Dukovany</span>
        </h1>

        <p
          style={{
            marginBottom: "42px",
            fontSize: "20px",
            color: "#6b7280",
            lineHeight: 1.7,
            maxWidth: "1000px",
          }}
        >
          Jednotka vyjíždí k různým typům událostí, mezi které patří především
          požáry a různé technické zásahy, například odstranění překážek
          z komunikací, odstranění spadeného stromu, čerpání vody, likvidace
          obtížného hmyzu a jiné.
          <br />
          Jednotku vysílá k zásahu Krajské operační a informační středisko HZS
          Kraje Vysočina nebo v rámci katastrálního území obce starosta obce.
        </p>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
            marginBottom: "36px",
          }}
        >
          {years.map((item) => {
            const isActive = active === item.year;

            return (
              <button
                key={item.year}
                onClick={() => setActive(item.year)}
                style={{
                  background: isActive ? "#dc2626" : "#ffffff",
                  color: isActive ? "#ffffff" : "#111827",
                  border: isActive
                    ? "1px solid #dc2626"
                    : "1px solid #ececec",
                  borderRadius: "22px",
                  padding: "22px",
                  textAlign: "left",
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ fontSize: "34px", fontWeight: 800 }}>
                  {item.year}
                </div>

                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "15px",
                    color: isActive ? "rgba(255,255,255,0.85)" : "#6b7280",
                  }}
                >
                  {item.total}
                </div>
              </button>
            );
          })}
        </section>

        <section
          style={{
            background: "#ffffff",
            border: "1px solid #ececec",
            borderRadius: "32px",
            padding: "46px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "#fee2e2",
              color: "#dc2626",
              padding: "8px 16px",
              borderRadius: "999px",
              fontSize: "15px",
              fontWeight: 800,
              marginBottom: "22px",
            }}
          >
            Přehled výjezdů
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: "54px",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            {selected.year}
          </h2>

          <p
            style={{
              marginTop: "12px",
              fontSize: "28px",
              fontWeight: 800,
              color: "#dc2626",
            }}
          >
            {selected.total}
          </p>

          <div
            style={{
              marginTop: "34px",
              display: "grid",
              gap: "16px",
            }}
          >
            {selected.text.map((line, index) => (
              <div
                key={index}
                style={{
                  background: "#fff7f7",
                  border: "1px solid #ffe4e6",
                  borderRadius: "20px",
                  padding: "18px 22px",
                  fontSize: "18px",
                  lineHeight: 1.7,
                  color: "#374151",
                  fontWeight:
                    line.includes("Požár") ||
                    line.includes("Technická pomoc") ||
                    line.includes("Celkem")
                      ? 700
                      : 500,
                }}
              >
                <span style={{ color: "#dc2626", marginRight: "10px" }}>
                  ✓
                </span>
                {line}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}