"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BackLink from "@/components/BackLink";

const images = [
  "/jpo_skolka/IMG-20260616-WA0009.jpg",
  "/jpo_skolka/IMG-20260616-WA0017.jpg",
];

export default function FotkyPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeGallery = () => {
    setSelectedIndex(null);
  };

  const showPreviousImage = () => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return null;
      }

      return currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    });
  };

  const showNextImage = () => {
    setSelectedIndex((currentIndex) => {
      if (currentIndex === null) {
        return null;
      }

      return currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    });
  };

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((currentIndex) => {
          if (currentIndex === null) {
            return null;
          }

          return currentIndex === 0
            ? images.length - 1
            : currentIndex - 1;
        });
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((currentIndex) => {
          if (currentIndex === null) {
            return null;
          }

          return currentIndex === images.length - 1
            ? 0
            : currentIndex + 1;
        });
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "34px 24px 70px",
        }}
      >
        <BackLink href="/jpo/galerie/preventivne-vychovna-cinnost-ms">
          Zpět na článek
        </BackLink>

        <h1
          style={{
            marginTop: "28px",
            marginBottom: "18px",
            fontSize: "clamp(42px, 9vw, 56px)",
            lineHeight: 1.05,
            fontWeight: 800,
            color: "#111827",
            letterSpacing: "-1.5px",
          }}
        >
          Galerie preventivně výchovné činnosti
        </h1>

        <p
          style={{
            marginBottom: "34px",
            fontSize: "clamp(18px, 4vw, 20px)",
            lineHeight: 1.6,
            color: "#6b7280",
            maxWidth: "820px",
          }}
        >
          Fotografie z návštěvy dětí z Mateřské školy Dukovany na hasičské
          zbrojnici.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "18px",
          }}
        >
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Otevřít fotografii ${index + 1}`}
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(260px, 45vw, 430px)",
                padding: 0,
                border: "none",
                borderRadius: "24px",
                overflow: "hidden",
                background: "#f3f4f6",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                cursor: "pointer",
              }}
            >
              <Image
                src={image}
                alt={`MŠ Dukovany ${index + 1}`}
                fill
                loading="lazy"
                quality={70}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div
          onClick={closeGallery}
          role="dialog"
          aria-modal="true"
          aria-label="Zvětšená fotografie"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "70px 70px 50px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "22px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            {selectedIndex + 1} / {images.length}
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              closeGallery();
            }}
            aria-label="Zavřít galerii"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "46px",
              height: "46px",
              border: "none",
              borderRadius: "999px",
              background: "#ffffff",
              color: "#111827",
              fontSize: "28px",
              fontWeight: 800,
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            ×
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            aria-label="Předchozí fotografie"
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "52px",
              height: "52px",
              border: "none",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.92)",
              color: "#111827",
              fontSize: "34px",
              fontWeight: 800,
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            ‹
          </button>

          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              maxWidth: "1400px",
              maxHeight: "88vh",
            }}
          >
            <Image
              src={images[selectedIndex]}
              alt={`MŠ Dukovany ${selectedIndex + 1}`}
              fill
              priority
              quality={90}
              sizes="100vw"
              style={{
                objectFit: "contain",
              }}
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            aria-label="Další fotografie"
            style={{
              position: "absolute",
              right: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "52px",
              height: "52px",
              border: "none",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.92)",
              color: "#111827",
              fontSize: "34px",
              fontWeight: 800,
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}