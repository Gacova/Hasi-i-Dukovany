"use client";

import { useState } from "react";
import BackLink from "@/components/BackLink";

type Section = {
  id: string;
  title: string;
  subtitle: string;
  content: string[];
};

export default function OJednotcePage() {
  const sections: Section[] = [
    {
      id: "vseobecne",
      title: "Všeobecně",
      subtitle: "Co je JPO a jak funguje",
      content: [
        "Jednotka požární ochrany obce Dukovany (dále jen JPO) je zásahová nebo-li výjezdová jednotka zřizovaná obcí podle § 29, odst.1, písmeno a) zákona č.133/1985 Sb. o požární ochraně.",
        "Obec dále podle § 29 tohoto zákona udržuje akceschopnost jednotky, zabezpečuje odbornou přípravu členů, materiální a finanční potřeby jednotky, preventivní zdravotní prohlídky členů JPO, aj.",
        "Členové jednotky plní úkoly na základě podepsané dohody.",
        "Financování této jednotky je zajišťováno částečně z rozpočtu obce a částečně krajem formou dotací.",
        "Finance určené pro jednotku se nákupem ochranných prostředků, věcných prostředků PO, mobilní techniky, výzbroje a výstroje promění na hmotný majetek, který je nadále majetkem obce, nikoli majetkem Sboru dobrovolných hasičů.",
        "Jednotka tímto majetkem pouze disponuje pro potřeby výcviku a zásahu.",
      ],
    },
    {
      id: "operacni",
      title: "Operační řízení",
      subtitle: "Řízení při výjezdu",
      content: [
        "V operačním řízení, tj. při výjezdu a po celou dobu zásahu je jednotka podřízena Krajskému operačnímu a informačnímu středisku HZS Kraje Vysočina se sídlem v Jihlavě (dále jen KOPIS).",
      ],
    },
    {
      id: "organizacni",
      title: "Organizační řízení",
      subtitle: "Činnost mimo zásahy",
      content: [
        "V organizačním řízení, tj. mimo výjezdovou činnost je jednotka podřízena starostovi obce a veliteli jednotky.",
        "Probíhají hospodářské práce na zbrojnici, údržba a oprava techniky a věcných prostředků, údržba osobních ochranných prostředků, odborná příprava a výcvik jednotky, atd.",
      ],
    },
    {
      id: "sdh",
      title: "SDH a JPO",
      subtitle: "Rozdíl mezi spolkem a jednotkou",
      content: [
        "Sbor dobrovolných hasičů je spolek (dříve občanské sdružení) pod záštitou Sdružení hasičů Čech, Moravy a Slezska.",
        "Je to zájmová organizace stejně jako např. Jezdecký klub, SFK Dukovany, TJ Sokol, ZO technických sportů, Klub důchodců, aj.",
        "Členy této zájmové organizace jsou občané obce bez rozdílu věku a zdravotního stavu.",
      ],
    },
    {
      id: "nase",
      title: "Naše jednotka",
      subtitle: "Kategorie a působnost",
      content: [
        "Naše jednotka je kategorii JPO III/1, je zařazena v plošném pokrytí území kraje.",
        "Podle poplachového plánu Kraje Vysočina nás pak KOPIS vysílá na místo zásahu (povolává k výjezdu).",
        "Na žádost KOPIS Jihomoravského kraje i na mezikrajskou výpomoc.",
        "Naše jednotka má územní působnost, to v jednoduchosti znamená, že jsme určeni nejen pro zásah na území obce, ale i mimo území obce (nebo kraje) s dojezdem zpravidla do 10 min. jízdy z místa dislokace.",
        "Členové vykonávají službu v jednotce dobrovolně a bezplatně.",
        "Jednotka zabezpečuje výjezd družstva minimálně o zmenšeném početním stavu 1+3 (velitel, strojník, dva hasiči).",
      ],
    },
    {
      id: "kategorie",
      title: "Kategorie JPO III/1",
      subtitle: "Vnitřní organizace jednotky",
      content: [
        "Vnitřní organizace jednotky – kategorie jednotky.",
        "JPO II/1 – celkem základní početní stav členů 12, počet členů v pohotovosti pro výjezd 4, velitel 1, velitel družstva 2, strojník 3, hasič 6.",
        "JPO II/2 – celkem základní početní stav členů 24, počet členů v pohotovosti pro výjezd 8, velitel 1, velitel družstva 5, strojník 6, hasič 12.",
        "JPO III/1 – celkem základní početní stav členů 12, počet členů v pohotovosti pro výjezd 4, velitel 1, velitel družstva 2, strojník 4, hasič 5.",
        "JPO III/2 – celkem základní početní stav členů 24, počet členů v pohotovosti pro výjezd 8, velitel 1, velitel družstva 5, strojník 6, hasič 12.",
        "JPO V – celkem základní početní stav členů 9, počet členů v pohotovosti pro výjezd 4, velitel 1, velitel družstva 2, strojník 2, hasič 4.",
      ],
    },
    {
      id: "odbornosti",
      title: "Odbornosti členů",
      subtitle: "Výcvik a kvalifikace",
      content: [
        "Každý člen má v jednotce svou funkci s odpovídající kvalifikací (odbornou způsobilostí).",
        "Nad rámec základní odborné přípravy je vyžadována odborná způsobilost pro konkrétní zařazení, např. velitelské kurzy, kurzy strojníků, oprávnění pro řízení vozidel s výstražným zařízením, obsluha motorové pily, kurzy pro nositele dýchací techniky (izolační dýchací přístroje), kurz technika jednotky, pravidla radiokomunikačního provozu, práce ve výšce a nad volnou hloubkou, kurzy první pomoci, a jiné.",
        "Tyto odbornosti se musí periodicky obnovovat.",
        "Mimo jiné každý člen musí znát a umět ovládat techniku a prostředky PO, platnou legislativu a požární taktiku.",
        "To vše je potřebné ke zvládnutí dané situace při zásahu.",
        "Zásahy nejsou jen o stříkání vody do ohně (i to má svá pravidla), jsou to rozmanité události vyžadující si individuální přístup.",
        "Každá situace je něčím výjimečná a není prostor na omyly.",
        "Ať už jsou to požáry, autonehody, úniky nebezpečných látek, technické a technologické pomoci, a jiné.",
        "Zásahy se stávají stále složitějšími a nebezpečnějšími i pro samotné hasiče.",
        "Z toho také vyplývá potřeba vybavovat jednotky speciálními prostředky nebo technikou a hasiče ochrannými prostředky, jako jsou zásahové oděvy, obuv, přilba, rukavice, apod.",
      ],
    },
    {
      id: "legislativa",
      title: "Legislativa",
      subtitle: "Základní právní předpisy",
      content: [
        "Veškerá činnost jednotky se řídí platnou legislativou.",
        "Mezi základní právní předpisy vztahující se na činnost jednotky patří:",
        "Zákon č. 133/1985 Sb., o požární ochraně, ve znění p. p.",
        "Vyhláška č. 247/2001 Sb., o organizaci a činnosti jednotek PO.",
        "Zákon č. 239/2001 Sb., o Integrovaném záchranném systému.",
      ],
    },
  ];

  const [active, setActive] = useState("vseobecne");
  const selected =
    sections.find((section) => section.id === active) ?? sections[0];

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
             fontSize: "clamp(42px, 9vw, 64px)",
lineHeight: 1.05,
letterSpacing: "-1px",
            fontWeight: 800,
          }}
        >
          O jednotce{" "}
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
          Přehled informací o zásahové jednotce obce Dukovany, jejím řízení,
          kategorii, odborné přípravě a právním rámci.
        </p>

        <section
          style={{
            display: "grid",
           gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "18px",
            marginBottom: "36px",
          }}
        >
          {sections.map((section) => {
            const isActive = active === section.id;

            return (
              <button
                key={section.id}
                onClick={() => setActive(section.id)}
                style={{
                  background: isActive ? "#dc2626" : "#ffffff",
                  color: isActive ? "#ffffff" : "#111827",
                  border: isActive
                    ? "1px solid #dc2626"
                    : "1px solid #ececec",
                  borderRadius: "24px",
                  padding: "24px",
                  textAlign: "left",
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  transition: "0.2s",
                }}
              >
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    marginBottom: "8px",
                  }}
                >
                  {section.title}
                </div>

                <div
                  style={{
                    fontSize: "15px",
                    color: isActive ? "rgba(255,255,255,0.85)" : "#6b7280",
                    lineHeight: 1.5,
                  }}
                >
                  {section.subtitle}
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
          padding: "clamp(24px, 5vw, 46px)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              margin: 0,
             fontSize: "clamp(34px, 7vw, 54px)",
lineHeight: 1.1,
letterSpacing: "-1px",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            {selected.title}
          </h2>

          <p
            style={{
              marginTop: "12px",
              fontSize: "clamp(20px, 5vw, 28px)",
lineHeight: 1.3,
              fontWeight: 800,
              color: "#dc2626",
            }}
          >
            {selected.subtitle}
          </p>

          <div
            style={{
              marginTop: "34px",
              display: "grid",
              gap: "16px",
            }}
          >
            {selected.content.map((line, index) => (
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
                    line.includes("JPO III/1") ||
                    line.includes("Zákon") ||
                    line.includes("Vyhláška") ||
                    line.includes("KOPIS")
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