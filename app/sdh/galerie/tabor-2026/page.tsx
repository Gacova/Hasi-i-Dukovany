"use client";

import { useState } from "react";
import BackLink from "@/components/BackLink";

const pondeli = [
  "po1.jpg",
  "po2.jpg",
  "po3.jpg",
  "po4.jpg",
  "po5.jpg",
  "po6.jpg",
  "po7.jpg",
  "po8.jpg",
  "po10.jpg",
  "po11.jpg",
];

const utery = [
  "u1.jpg",
  "u2.jpg",
  "u3.jpg",
  "u4.jpg",
  "u5.jpg",
  "u6.jpg",
  "u8.jpg",
  "u9.jpg",
  "u10.jpg",
  "u11.jpg",
  "u12.jpg",
  "u13.jpg",
  "u14.jpg",
  "u15.jpg",
  "u16.jpg",
  "u17.jpg",
  "u18.jpg",
  "u19.jpg",
];

const streda = [
  "s2.jpg",
  "s3.jpg",
  "s4.jpg",
  "s5.jpg",
  "s6.jpg",
  "s7.jpg",
  "s8.jpg",
];

const ctvrtek = [
  "c1.jpg",
  "c2.jpg",
  "c3.jpg",
  "c4.jpg",
  "c5.jpg",
  "c7.jpg",
  "c8.jpg",
];

const patek = [
  "p1.jpg",
  "p2.jpg",
  "p4.jpg",
  "p5.jpg",
  "p6.jpg",
  "p7.jpg",
];

type GalleryDay = {
  number: string;
  day: string;
  title: string;
  photos: string[];
};

const days: GalleryDay[] = [
  {
    number: "01",
    day: "PONDĚLÍ",
    title: "Templštýn, RAF House, HZS Ivančice a Réna",
    photos: pondeli,
  },
  {
    number: "02",
    day: "ÚTERÝ",
    title: "MasterChef a Svět bludišť Drnholec",
    photos: utery,
  },
  {
    number: "03",
    day: "STŘEDA",
    title: "Robinson Jihlava",
    photos: streda,
  },
  {
    number: "04",
    day: "ČTVRTEK",
    title: "HZS Ivančice, Koupaliště Trstěnice a Mohelno",
    photos: ctvrtek,
  },
  {
    number: "05",
    day: "PÁTEK",
    title: "Alternátor Třebíč a rozloučení",
    photos: patek,
  },
];

export default function TaborGaleriePage() {
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const openPhoto = (dayIndex: number, photoIndex: number) => {
    setActiveDay(dayIndex);
    setActivePhoto(photoIndex);
  };

  const closePhoto = () => {
    setActiveDay(null);
    setActivePhoto(null);
  };

  const previousPhoto = () => {
    if (activeDay === null || activePhoto === null) return;

    const photos = days[activeDay].photos;

    setActivePhoto(
      activePhoto === 0 ? photos.length - 1 : activePhoto - 1
    );
  };

  const nextPhoto = () => {
    if (activeDay === null || activePhoto === null) return;

    const photos = days[activeDay].photos;

    setActivePhoto(
      activePhoto === photos.length - 1 ? 0 : activePhoto + 1
    );
  };

  return (
    <main
      style={{
        background: "#ffffff",
        minHeight: "100vh",
        color: "#111827",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
          padding: "34px 24px 80px",
        }}
      >
        <BackLink href="/sdh/galerie">Zpět na galerii</BackLink>

        <h1
          style={{
            marginTop: "28px",
            marginBottom: "18px",
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
            maxWidth: "850px",
            marginBottom: "55px",
            fontSize: "clamp(18px, 4vw, 20px)",
            lineHeight: 1.7,
            color: "#6b7280",
          }}
        >
          Fotografie z pěti dnů plných výletů, soutěží, her, hasičských
          zážitků a společných dobrodružství.
        </p>

        {days.map((item, dayIndex) => (
          <DayGallery
            key={item.day}
            number={item.number}
            day={item.day}
            title={item.title}
            photos={item.photos}
            onPhotoClick={(photoIndex) =>
              openPhoto(dayIndex, photoIndex)
            }
          />
        ))}
      </div>

      {activeDay !== null && activePhoto !== null && (
        <div
          onClick={closePhoto}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closePhoto();
            }}
            aria-label="Zavřít"
            style={closeButtonStyle}
          >
            ×
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              previousPhoto();
            }}
            aria-label="Předchozí fotografie"
            style={{
              ...arrowButtonStyle,
              left: "20px",
            }}
          >
            ‹
          </button>

          <img
            onClick={(e) => e.stopPropagation()}
            src={`/tabor2026/${days[activeDay].photos[activePhoto]}`}
            alt={`${days[activeDay].day} – fotografie ${activePhoto + 1}`}
            style={{
              maxWidth: "92vw",
              maxHeight: "88vh",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 20px 70px rgba(0,0,0,0.5)",
            }}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            aria-label="Další fotografie"
            style={{
              ...arrowButtonStyle,
              right: "20px",
            }}
          >
            ›
          </button>

          <div
            style={{
              position: "absolute",
              bottom: "18px",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            {activePhoto + 1} / {days[activeDay].photos.length}
          </div>
        </div>
      )}
    </main>
  );
}

function DayGallery({
  number,
  day,
  title,
  photos,
  onPhotoClick,
}: {
  number: string;
  day: string;
  title: string;
  photos: string[];
  onPhotoClick: (index: number) => void;
}) {
  return (
    <section
      style={{
        marginBottom: "70px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            fontSize: "42px",
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
          margin: "0 0 26px",
          fontSize: "clamp(26px, 4vw, 34px)",
          lineHeight: 1.2,
          fontWeight: 800,
          color: "#111827",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "18px",
        }}
      >
        {photos.map((photo, index) => (
          <button
            key={photo}
            onClick={() => onPhotoClick(index)}
            style={{
              padding: 0,
              border: 0,
              cursor: "pointer",
              display: "block",
              overflow: "hidden",
              borderRadius: "20px",
              background: "#f3f4f6",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <img
              src={`/tabor2026/${photo}`}
              alt={`${day} – fotografie ${index + 1}`}
              loading="lazy"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

const arrowButtonStyle = {
  position: "absolute" as const,
  top: "50%",
  transform: "translateY(-50%)",
  width: "54px",
  height: "54px",
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.35)",
  background: "rgba(0,0,0,0.35)",
  color: "#ffffff",
  fontSize: "42px",
  lineHeight: 1,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const closeButtonStyle = {
  position: "absolute" as const,
  top: "18px",
  right: "22px",
  width: "46px",
  height: "46px",
  borderRadius: "50%",
  border: "1px solid rgba(255,255,255,0.35)",
  background: "rgba(0,0,0,0.35)",
  color: "#ffffff",
  fontSize: "30px",
  lineHeight: 1,
  cursor: "pointer",
};