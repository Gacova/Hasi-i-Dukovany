import Link from "next/link";
import BackLink from "@/components/BackLink";

export default function Tabor2026Page() {
  return (
    <main
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        color: "#111827",
      }}
    >
      <style>{`
        .day-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 40px;
          align-items: center;
        }

        .day-content {
          order: 1;
        }

        .day-image {
          order: 2;
        }

        .day-content.reverse {
          order: 2;
        }

        .day-image.reverse {
          order: 1;
        }

        @media (max-width: 760px) {
          .day-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .day-content,
          .day-image,
          .day-content.reverse,
          .day-image.reverse {
            order: initial;
          }
        }
      `}</style>

      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "34px 24px 80px",
        }}
      >
        <BackLink href="/sdh/tabor">Zpět na Tábor</BackLink>

        <h1
          style={{
            marginTop: "28px",
            marginBottom: "20px",
            fontSize: "clamp(42px, 7vw, 64px)",
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: "-1.5px",
          }}
        >
          Příměstský hasičský tábor{" "}
          <span style={{ color: "#dc2626" }}>2026</span>
        </h1>

        <p
          style={{
            maxWidth: "930px",
            margin: "0 0 55px",
            fontSize: "19px",
            lineHeight: 1.8,
            color: "#4b5563",
          }}
        >
          Poslední červencový týden patřil v Dukovanech našemu příměstskému
          hasičskému táboru. Pět společných dní jsme naplnili výlety,
          soutěžemi, vařením, poznáváním práce hasičů, koupáním i pořádnou
          dávkou dobrodružství. A protože k táboru patří také překonávání
          vlastních hranic, nechyběla ani noc mimo domov a stezka odvahy.
        </p>

        {/* PONDĚLÍ */}
        <DaySection
          number="01"
          day="PONDĚLÍ"
          title="Vyrážíme za dobrodružstvím"
          image="/tabor2026/po9hlavni.jpg"
        >
          <p style={textStyle}>
            První den jsme se sešli v hasičské zbrojnici v Dukovanech, kde děti
            dostaly nová táborová trička. Společně jsme si prohlédli mapu,
            naplánovali trasu a vyrazili na první výšlap přes Bílou skálu až na
            Templštýn. U Kolečkárny už na nás čekaly hasičské dodávky, které nás
            odvezly do RAF House. Děti si zde prohlédly letecké muzeum, uniformy
            i historická letadla.
          </p>

          <p style={paragraphStyle}>
            Po obědě naše cesta pokračovala na hasičskou stanici v Ivančicích.
            A měli jsme štěstí na opravdu autentický zážitek – ještě než jsme
            stačili dorazit, rozezněly se sirény a hasiči vyjížděli k zásahu.
            Děti tak na vlastní oči viděly, že práce hasičů není jen o technice
            ve zbrojnici, ale především o připravenosti kdykoliv pomoci.
          </p>

          <p style={paragraphStyle}>
            Den jsme zakončili výhledem z vyhlídky Réna a zaslouženým
            citronovým sorbetem v Moravském Krumlově.
          </p>
        </DaySection>

        {/* ÚTERÝ */}
        <DaySection
          number="02"
          day="ÚTERÝ"
          title="Když se z hasičů stanou kuchaři"
          image="/tabor2026/u7hlavni.jpg"
          reverse
        >
          <p style={textStyle}>
            Druhý den se nesl ve znamení naší vlastní soutěže{" "}
            <strong>MasterChef</strong>. Děti už předem věděly, že je čeká
            vaření, a jejich domácím úkolem bylo nastudovat si recept. Samotná
            příprava oběda ale rozhodně nebyla tak jednoduchá.
          </p>

          <p style={paragraphStyle}>
            Po hasičské zbrojnici byly ukryté jednotlivé části receptů, které
            děti musely najít a správně seřadit. Koření do svých pokrmů
            získávaly za splnění nejrůznějších úkolů a soutěží. Poté si s pomocí
            vedoucích rozdělaly oheň, o který se musely samy starat, a mohlo
            začít skutečné vaření.
          </p>

          <p style={paragraphStyle}>
            V poledne přišla chvíle pro odbornou porotu. Hodnotila se chuť,
            vzhled i celkové provedení pokrmů a nakonec byl vyhlášen vítězný
            tým. Pochvalu si ale zasloužili všichni malí kuchaři.
          </p>

          <p style={paragraphStyle}>
            Po úklidu jsme vyrazili do Světa bludišť v Drnholci, kde
            pokračovala zábava trochu jiným způsobem.
          </p>
        </DaySection>

        {/* STŘEDA */}
        <DaySection
          number="03"
          day="STŘEDA"
          title="Zábava pro malé i velké"
          image="/tabor2026/s1hlavni.jpg"
        >
          <p style={textStyle}>
            Třetí táborový den jsme strávili v zábavním parku Robinson v
            Jihlavě. Čekalo nás množství atrakcí, pohybu a zábavy pro malé i
            velké.
          </p>

          <p style={paragraphStyle}>
            Program si užily všechny věkové kategorie – a rozhodně nejen děti.
          </p>
        </DaySection>

        {/* ČTVRTEK */}
        <DaySection
          number="04"
          day="ČTVRTEK"
          title="Zábava, voda a hasičská technika"
          image="/tabor2026/c6hlavni.jpg"
          reverse
        >
          <p style={textStyle}>
            Ve čtvrtek jsme se znovu vrátili k hasičské tematice. Navštívili
            jsme hasičskou stanici v Ivančicích, kde si děti dále rozšířily
            znalosti o práci profesionálních hasičů a jejich technice.
          </p>

          <p style={paragraphStyle}>
            Protože nám přálo opravdu horké letní počasí, další zastávkou bylo
            koupaliště v Trstěnicích. Ochlazení přišlo vhod všem a nechyběly ani
            hry připravené našimi vedoucími.
          </p>

          <h3 style={subTitleStyle}>Noc, na kterou se nezapomíná</h3>

          <p style={paragraphStyle}>
            Večer jsme se přesunuli do Mohelna, kde nás čekala přespávačka.
            Děti si nejprve připravily zázemí na noc a potom přišla další
            kuchařská výzva – tentokrát vaření kotlíkového guláše. Jednotlivé
            týmy se snažily připravit ten nejlepší a ani tentokrát samozřejmě
            nechyběla porota a vyhlášení vítězů.
          </p>

          <p style={paragraphStyle}>
            Po setmění přišla na řadu jedna z největších táborových výzev –{" "}
            <strong>stezka odvahy</strong>. Děti ukázaly, že se jen tak něčeho
            nezaleknou, a statečně ji zvládly až do cíle.
          </p>

          <p style={paragraphStyle}>
            Po dni plném zážitků už potom nezbývalo než zalézt do spacáků a
            načerpat síly na poslední den.
          </p>
        </DaySection>

        {/* PÁTEK */}
        <DaySection
          number="05"
          day="PÁTEK"
          title="Poslední den a rozloučení"
          image="/tabor2026/p3hlavni.jpg"
        >
          <p style={textStyle}>
            Páteční ráno začalo ještě v Mohelně. Po snídani jsme vyrazili do
            Alternátoru v Třebíči, kde jsme strávili velkou část dne. V moderním
            interaktivním centru si děti mohly samy vyzkoušet nejrůznější
            pokusy, hlavolamy a interaktivní exponáty a dozvědět se zase něco
            nového.
          </p>

          <p style={paragraphStyle}>
            Odpoledne jsme se vrátili tam, kde celý náš společný týden začal –
            do hasičské zbrojnice v Dukovanech. Následovalo slavnostní
            zakončení, rozdávání diplomů a poslední společné chvíle před
            rozloučením.
          </p>
        </DaySection>

        {/* ZÁVĚR */}
        <section
          style={{
            marginTop: "60px",
            padding: "clamp(28px, 5vw, 45px)",
            background: "#f9fafb",
            borderRadius: "28px",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              margin: "0 0 20px",
              fontSize: "32px",
              fontWeight: 800,
            }}
          >
            Týden plný zážitků
          </h2>

          <p style={textStyle}>
            Za pět dní jsme toho stihli opravdu hodně. Nachodili jsme spoustu
            kilometrů, vařili na ohni, soutěžili, koupali se, poznávali
            hasičskou práci a techniku, překonávali strach a hlavně jsme
            společně zažili spoustu okamžiků, na které budeme ještě dlouho
            vzpomínat.
          </p>

          <p
            style={{
              ...paragraphStyle,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Děkujeme všem dětem za skvělý týden, jejich energii, odvahu a
            dobrou náladu. Rodičům děkujeme za důvěru a všem, kteří se na
            přípravě a průběhu tábora podíleli, za pomoc.
          </p>

          <p
            style={{
              ...paragraphStyle,
              color: "#dc2626",
              fontSize: "21px",
              fontWeight: 800,
            }}
          >
            Těšíme se zase na další společná dobrodružství!
          </p>
        </section>

        {/* FOTOGALERIE */}
        <Link
          href="/sdh/galerie/tabor-2026"
          style={{
            display: "block",
            marginTop: "34px",
            padding: "30px 32px",
            borderRadius: "24px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            textDecoration: "none",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "1.8px",
                  color: "#dc2626",
                  marginBottom: "8px",
                }}
              >
                FOTOGALERIE
              </div>

              <div
                style={{
                  fontSize: "clamp(24px, 4vw, 32px)",
                  fontWeight: 800,
                  color: "#111827",
                  marginBottom: "8px",
                }}
              >
                Fotogalerie tábora 2026
              </div>

              <div
                style={{
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: "#6b7280",
                }}
              >
                Prohlédněte si další fotografie z celého táborového týdne.
              </div>
            </div>

            <div
              style={{
                minWidth: "56px",
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#dc2626",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                fontWeight: 800,
              }}
            >
              →
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}

function DaySection({
  number,
  day,
  title,
  image,
  reverse = false,
  children,
}: {
  number: string;
  day: string;
  title: string;
  image: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        marginBottom: "70px",
      }}
    >
      <div className="day-grid">
        {/* DŮLEŽITÉ:
            Obsah je v HTML vždy první.
            Na mobilu tedy bude vždy NAD fotkou. */}
        <div className={`day-content ${reverse ? "reverse" : ""}`}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                fontSize: "44px",
                lineHeight: 1,
                fontWeight: 900,
                color: "#dc2626",
              }}
            >
              {number}
            </span>

            <span
              style={{
                fontSize: "13px",
                fontWeight: 800,
                letterSpacing: "2px",
                color: "#6b7280",
              }}
            >
              {day}
            </span>
          </div>

          <h2
            style={{
              margin: "0 0 22px",
              fontSize: "clamp(27px, 4vw, 36px)",
              lineHeight: 1.15,
              fontWeight: 800,
            }}
          >
            {title}
          </h2>

          {children}
        </div>

        <div className={`day-image ${reverse ? "reverse" : ""}`}>
          <img
            src={image}
            alt={`${day} – ${title}`}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "28px",
              boxShadow: "0 18px 45px rgba(0,0,0,0.14)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

const textStyle = {
  margin: 0,
  fontSize: "17px",
  lineHeight: 1.8,
  color: "#4b5563",
};

const paragraphStyle = {
  ...textStyle,
  marginTop: "16px",
};

const subTitleStyle = {
  margin: "26px 0 0",
  fontSize: "23px",
  fontWeight: 800,
  color: "#dc2626",
};