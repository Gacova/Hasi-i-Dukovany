import Image from "next/image";
import BackLink from "@/components/BackLink";

export default function GaleriePage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1500px",
          width: "100%",
          margin: "0 auto",
          padding: "34px 24px 70px",
        }}
      >
        <BackLink href="/jpo">Zpět na JPO</BackLink>

        <h1
          style={{
            marginTop: "28px",
            marginBottom: "18px",
            fontSize: "clamp(42px, 9vw, 64px)",
            lineHeight: 1.05,
            fontWeight: 800,
            letterSpacing: "-1.5px",
          }}
        >
          Galerie <span style={{ color: "#dc2626" }}>JPO</span>{" "}
          <span style={{ color: "#111827" }}>Dukovany</span>
        </h1>

        <p
          style={{
            marginBottom: "36px",
            fontSize: "clamp(18px, 4vw, 20px)",
            lineHeight: 1.6,
            color: "#6b7280",
          }}
        >
          Fotografie z výjezdů, školení a činnosti jednotky.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          <GalleryCard
            href="/jpo/galerie/doutnajici-strom-loucky"
            image="/doutnajici-strom-loucky/IMG-20260630-WA0031.jpg"
            title="Doutnající strom Loučky"
            text="Fotogalerie z výjezdu jednotky JPO Dukovany k doutnajícímu stromu v lokalitě Loučky."
          />

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
            image="/paleni-carodejnic/uvodni.JPG"
            title="Pálení čarodějnic"
            text="Jednotka JPO Dukovany během akce zajišťovala požární dohled nad vatrou a po skončení provedla bezpečné dohašení."
          />

          <GalleryCard
            href="/jpo/galerie/preventivne-vychovna-cinnost-ms"
            image="/jpo_skolka/IMG-20260616-WA0017.jpg"
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
      <article
        style={{
          background: "#ffffff",
          border: "1px solid #ececec",
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          minHeight: "560px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "260px",
            background: "#f3f4f6",
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            loading="lazy"
            quality={65}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            style={{
              objectFit: "cover",
              objectPosition: "center 30%",
            }}
          />
        </div>

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
              fontSize: "26px",
              fontWeight: 800,
              lineHeight: 1.25,
              color: "#111827",
            }}
          >
            {title}
          </h2>

          <p
            style={{
              marginTop: "14px",
              color: "#6b7280",
              fontSize: "16px",
              lineHeight: 1.7,
              flex: 1,
            }}
          >
            {text}
          </p>

          <div
            style={{
              marginTop: "18px",
              color: "#dc2626",
              fontWeight: 800,
              fontSize: "16px",
            }}
          >
            Otevřít galerii →
          </div>
        </div>
      </article>
    </a>
  );
}