import BackLink from "@/components/BackLink";

export default function GaleriePage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1500px",
          width: "100%",
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
          Galerie <span style={{ color: "#dc2626" }}>JPO</span>{" "}
          <span style={{ color: "#111827" }}>Dukovany</span>
        </h1>

        <p
          style={{
            marginBottom: "50px",
            fontSize: "20px",
            color: "#6b7280",
          }}
        >
          Fotografie z výjezdů, školení a činnosti jednotky.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          <GalleryCard
            href="/jpo/galerie/skoleni-zdravovedy"
            image="/skoleni-zdravovedy/IMG-20260605-WA0039.jpg"
            title="Školení zdravotní přípravy"
            text="Fotogalerie ze školení členů jednotky zaměřeného na první pomoc a krizové situace."
          />

          <GalleryCard
            href="/jpo/galerie/uklid-zbrojnice"
            image="/uklid-zbrojnice/20260606_091314.jpg"
            title="Úklid zbrojnice a techniky"
            text="Společná brigáda členů SDH a JPO zaměřená na úklid zbrojnice, techniky a vybavení."
          />

          <GalleryCard
            href="/jpo/galerie/paleni-carodejnic"
            image="/paleni-carodejnic/uvodni.jpg"
            title="Pálení čarodějnic"
            text="Jednotka JPO Dukovany během akce zajišťovala požární dohled nad vatrou a po skončení provedla bezpečné dohašení."
          />

          <GalleryCard
            href="/jpo/galerie/preventivne-vychovna-cinnost-ms"
            image="/jpo_skolka/hlavni.jpg"
            title="Preventivně výchovná činnost pro děti z MŠ"
            text="Děti z Mateřské školy Dukovany navštívily hasičskou zbrojnici, kde se seznámily s činností jednotky, technikou a zásadami bezpečného chování."
          />
        </div>
      </div>
    </main>
  );
}

function GalleryCard({
  href,
  image,
  title,
  text,
}: {
  href: string;
  image: string;
  title: string;
  text: string;
}) {
  return (
    <a href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #ececec",
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          cursor: "pointer",
          minHeight: "560px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "260px",
            objectFit: "cover",
            display: "block",
          }}
        />

        <div
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 800,
              lineHeight: 1.3,
              color: "#111827",
            }}
          >
            {title}
          </h2>

          <p
            style={{
              marginTop: "16px",
              color: "#6b7280",
              fontSize: "16px",
              lineHeight: 1.7,
            }}
          >
            {text}
          </p>

          <div
            style={{
              marginTop: "auto",
              color: "#dc2626",
              fontWeight: 700,
              fontSize: "16px",
            }}
          >
            Otevřít galerii →
          </div>
        </div>
      </div>
    </a>
  );
}