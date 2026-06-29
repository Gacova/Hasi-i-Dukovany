import BackLink from "@/components/BackLink";

export default function GaleriePage() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
          padding: "34px 24px 70px",
        }}
      >
        <BackLink href="/sdh">Zpět na SDH</BackLink>

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
          Galerie <span style={{ color: "#dc2626" }}>SDH</span>{" "}
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
          Fotky z akcí, tréninků a společných setkání.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 360px))",
            gap: "28px",
          }}
        >
          <GalleryCard
            href="/sdh/galerie/carodejnice-2026"
            image="/akce/carodejnice-2026/IMG_0694.JPG"
            alt="Pálení čarodějnic"
            title="Pálení čarodějnic 2026"
            text="Fotogalerie z tradiční akce SDH Dukovany."
          />

          <GalleryCard
            href="/sdh/galerie/pout-2026"
            image="/pout/IMG-20260531-WA0006.jpg"
            alt="Pouť 2026"
            title="Pouť 2026"
            text="Fotogalerie z tradiční pouti a pouťového průvodu v Dukovanech."
          />
        </div>
      </div>
    </main>
  );
}

function GalleryCard({
  href,
  image,
  alt,
  title,
  text,
}: {
  href: string;
  image: string;
  alt: string;
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
          display: "flex",
          flexDirection: "column",
          minHeight: "420px",
        }}
      >
        <img
          src={image}
          alt={alt}
          style={{
            width: "100%",
            height: "220px",
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
            }}
          >
            {text}
          </p>

          <div
            style={{
              marginTop: "auto",
              color: "#dc2626",
              fontWeight: 800,
              fontSize: "17px",
            }}
          >
            Otevřít galerii →
          </div>
        </div>
      </article>
    </a>
  );
}