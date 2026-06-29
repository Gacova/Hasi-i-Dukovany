"use client";

import { useState } from "react";
import BackLink from "@/components/BackLink"; 

type Item = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
};

export default function TechnikaPage() {
  const items: Item[] = [
    {
      id: "cas",
      title: "CAS 30 Šárka",
      subtitle: "Tatra 815 Terra 6×6",
      icon: "",
    },
    {
      id: "ford",
      title: "DA – L1Z",
      subtitle: "Ford Transit",
      icon: "",
    },
    {
      id: "prives",
      title: "Přívěs VEZEKO",
      subtitle: "Požární přívěs",
      icon: "",
    },
    {
      id: "skoda",
      title: "OA Škoda Octavia II",
      subtitle: "Osobní automobil",
      icon: "",
    },
    {
      id: "vybaveni",
      title: "Věcné vybavení",
      subtitle: "Technické a zásahové prostředky",
      icon: "",
    },
  ];

  const [active, setActive] = useState("cas");

  return (
    <main
      style={{
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 32px 80px",
        }}
      >
        {/* ZPĚT */}
       <BackLink href="/jpo">Zpět na JPO</BackLink>

        {/* NADPIS */}
        <h1
          style={{
            marginTop: "28px",
            marginBottom: "18px",
          fontSize: "clamp(42px, 9vw, 64px)",
lineHeight: 1.05,
letterSpacing: "-1.5px",
            fontWeight: 800,
            color: "#111827",
          }}
        >
      Technika{" "}
<span style={{ color: "#dc2626" }}>JPO</span>{" "}
<span style={{ color: "#111827" }}>Dukovany</span>
        </h1>

        <p
          style={{
            marginBottom: "42px",
fontSize: "clamp(18px, 4vw, 20px)",
lineHeight: 1.7,
maxWidth: "900px",            color: "#6b7280",
          }}
        >
          Technika a vybavení připravené k zásahu.
        </p>

        {/* DLAŽDICE */}
        <section
          style={{
            display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",            gap: "18px",
            marginBottom: "36px",
          }}
        >
          {items.map((item) => {
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                style={{
                  background: isActive ? "#dc2626" : "#ffffff",
                  color: isActive ? "#ffffff" : "#111827",
                  border: isActive
                    ? "1px solid #dc2626"
                    : "1px solid #ececec",
                  borderRadius: "28px",
                  padding: "24px",
                  textAlign: "left",
                  cursor: "pointer",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                  transition: "0.2s",
                }}
              >
                <div
                  style={{
                    fontSize: "42px",
                    marginBottom: "16px",
                  }}
                >
                  {item.icon}
                </div>

                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    marginBottom: "8px",
                  }}
                >
                  {item.title}
                </div>

                <div
                  style={{
                    fontSize: "16px",
                    color: isActive
                      ? "rgba(255,255,255,0.85)"
                      : "#6b7280",
                    lineHeight: 1.5,
                  }}
                >
                  {item.subtitle}
                </div>
              </button>
            );
          })}
        </section>

        {/* DETAIL BOX */}
        <section
          style={{
            background: "#ffffff",
            borderRadius: "34px",
            overflow: "hidden",
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
          }}
        >
          {/* CAS */}
          {active === "cas" && (
            <>
              {/* FOTO */}
              <div
                style={{
                  width: "100%",
                  background: "#111827",
                }}
              >
                <img
                  src="/jpo.png"
                  alt="CAS 30 Šárka"
                  style={{
                    width: "100%",
                    maxHeight: "520px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              {/* TEXT */}
              <div
                style={{
padding: "clamp(24px, 5vw, 50px)",                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    background: "#fee2e2",
                    color: "#dc2626",
                    padding: "10px 18px",
                    borderRadius: "999px",
                    fontSize: "15px",
                    fontWeight: 800,
                    marginBottom: "26px",
                  }}
                >
                  Hlavní zásahové vozidlo
                </div>

                <h2
                  style={{
                    margin: 0,
fontSize: "clamp(34px, 7vw, 54px)",                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: "#111827",
                  }}
                >
                  CAS 30/8500/510 – S2R
                </h2>

                <p
                  style={{
                    marginTop: "16px",
fontSize: "clamp(16px, 3.8vw, 20px)",                    fontWeight: 700,
                    color: "#dc2626",
                  }}
                >
                  Tatra 815 Terra 6×6
                </p>

                {/* STATY */}
                <div
                  style={{
                    marginTop: "34px",
                    marginBottom: "40px",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "18px",
                  }}
                >
                  {[
                    ["💧", "8500 l", "vody"],
                    ["🧪", "510 l", "pěnidla"],
                    ["⚙️", "3000 l/min", "čerpadlo"],
                    ["👨‍🚒", "6 osob", "kabina"],
                  ].map(([icon, value, label]) => (
                    <div
                      key={value}
                      style={{
                        background: "#fff7f7",
                        border: "1px solid #ffe4e6",
                        borderRadius: "24px",
                        padding: "24px",
                      }}
                    >
                      <div style={{ fontSize: "34px" }}>
                        {icon}
                      </div>

                      <div
                        style={{
                          marginTop: "10px",
                          fontSize: "30px",
                          fontWeight: 800,
                          color: "#dc2626",
                        }}
                      >
                        {value}
                      </div>

                      <div
                        style={{
                          marginTop: "4px",
                          fontSize: "15px",
                          color: "#6b7280",
                        }}
                      >
                        {label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* TEXT */}
                <div
                  style={{
                    fontSize: "20px",
                    lineHeight: 1.95,
                    color: "#374151",
                  }}
                >
                  <p>
                    Cisternová automobilová stříkačka na podvozku
                    Tatra 815 Terra 6x6, s pohonem všech kol,
                    uzávěrkami náprav a s brodivostí do 120 cm.
                  </p>

                  <p style={{ marginTop: "22px" }}>
                    Nástavba s výkonem čerpadla 3000 l/min,
                    zásobou vody 8500 l, zásobou pěnidla 510 l,
                    těžké hmotnostní kategorie, s podvozkem určeným
                    pro provoz na silnici i v terénu.
                  </p>

                  <p style={{ marginTop: "22px" }}>
                    Výbava je redukovaná, kabina je pro 6 osob,
                    vozidlo je vybaveno nárazníkovou proudnicí
                    s možností oscilace.
                  </p>

                  <p style={{ marginTop: "22px" }}>
                    V nástavbě je umístěn teleskopický osvětlovací stožár.
                    Požární čerpadlo má nízkotlaký okruh
                    s průtokem 3000 l/min při tlaku vody 12 Bar,
                    a vysokotlaký okruh s průtokem 250 l/min
                    při tlaku 40 Bar.
                  </p>

                  <p style={{ marginTop: "22px" }}>
                    Je schopno využít vodu z vlastního (cisterna)
                    nebo cizího zdroje, nebo výrobu pěnotvorného roztoku
                    pro hašení střední a těžkou pěnou.
                  </p>

                  <p style={{ marginTop: "22px" }}>
                    V nástavbě vozidla je pak uloženo potřebné vybavení
                    pro hašení, pro technické zásahy,
                    pro osvětlení místa zásahu, elektrocentrála,
                    přetlakový ventilátor, kalové čerpadlo,
                    plovoucí čerpadlo, motorová řetězová pila,
                    vybavení pro odchyt nebezpečného hmyzu,
                    žebřík a jiné.
                  </p>

                  <p style={{ marginTop: "22px" }}>
                    V kabině vozidla jsou např. radiostanice analogové
                    a digitální, svítilny, dýchací přístroje,
                    lezecké prostředky, zdravotnické vybavení
                    a prostředky, které je nutné skladovat v kabině.
                  </p>

                  <p style={{ marginTop: "22px" }}>
                    V kabině je tablet pro velitele,
                    kde jsou materiály pro podporu zásahu
                    a pro spojení s KOPIS.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* FORD */}
          {active === "ford" && (
            <DetailBox
              icon=""
              title="DA – L1Z"
              subtitle="Ford Transit"
              text="Dopravní automobil lehké hmotnostní kategorie pro silniční provoz, na podvozku Ford Transit, určený pro přepravu až 9 osob a věcného vybavení. Vozidlo je vybaveno tažným zařízením a základní výbavou."
            />
          )}

          {/* PRIVES */}
          {active === "prives" && (
            <DetailBox
              icon=""
              title="Požární přívěs VEZEKO"
              subtitle="Skříňový požární přívěs"
              text="Jedná se o rekonstruovaný skříňový přívěs pro požární stříkačku a věcné vybavení, na podvozku Vezeko. Podvozek je bržděný, hmotnostní kategorie nad 750 kg. Skříň má zahrádku pro přepravu dalšího vybavení, např. raftu."
            />
          )}

          {/* SKODA */}
          {active === "skoda" && (
            <DetailBox
              icon=""
              title="OA Škoda Octavia II"
              subtitle="Osobní automobil"
              text="Jednotka má k dispozici osobní automobil Škoda Octavia pro přepravu osob."
            />
          )}

          {/* VYBAVENI */}
          {active === "vybaveni" && (
            <DetailBox
              icon=""
              title="Věcné vybavení"
              subtitle="Technické a zásahové prostředky"
              text="Dýchací přístroje Dräger, prostředky pro práci ve výšce a nad volnou hloubkou, prostředky pro likvidaci obtížného hmyzu, plovoucí čerpadla, kalová čerpadla, přetlakový ventilátor, zdravotnické vybavení, raft a vodácké vybavení."
            />
          )}
        </section>
      </div>
    </main>
  );
}

function DetailBox({
  icon,
  title,
  subtitle,
  text,
}: {
  icon: string;
  title: string;
  subtitle: string;
  text: string;
}) {
  return (
    <div
      style={{
        padding: "54px",
      }}
    >
      <div
        style={{
          fontSize: "64px",
          marginBottom: "24px",
        }}
      >
        {icon}
      </div>

      <h2
        style={{
          margin: 0,
          fontSize: "48px",
          fontWeight: 800,
          color: "#111827",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          marginTop: "14px",
          fontSize: "26px",
          fontWeight: 700,
          color: "#dc2626",
        }}
      >
        {subtitle}
      </p>

      <p
        style={{
          marginTop: "28px",
          maxWidth: "1000px",
          fontSize: "20px",
          lineHeight: 1.9,
          color: "#374151",
        }}
      >
        {text}
      </p>
    </div>
  );
}