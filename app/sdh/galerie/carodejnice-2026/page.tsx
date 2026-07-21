"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BackLink from "@/components/BackLink";

const images = [
  "/akce/carodejnice-2026/IMG_0694.JPG",
  "/akce/carodejnice-2026/IMG_0695.JPG",
  "/akce/carodejnice-2026/IMG_0697.JPG",
  "/akce/carodejnice-2026/IMG_0704.JPG",
  "/akce/carodejnice-2026/IMG_0709.JPG",
  "/akce/carodejnice-2026/IMG_0711.JPG",
  "/akce/carodejnice-2026/IMG_0712.JPG",
  "/akce/carodejnice-2026/IMG_0713.JPG",
  "/akce/carodejnice-2026/IMG_0714.JPG",
  "/akce/carodejnice-2026/IMG_0717.JPG",
  "/akce/carodejnice-2026/IMG_0720.JPG",
  "/akce/carodejnice-2026/IMG_0722.JPG",
  "/akce/carodejnice-2026/IMG_0724.JPG",
  "/akce/carodejnice-2026/IMG_0725.JPG",
  "/akce/carodejnice-2026/IMG_0726.JPG",
  "/akce/carodejnice-2026/IMG_0728.JPG",
  "/akce/carodejnice-2026/IMG_0730.JPG",
  "/akce/carodejnice-2026/IMG_0732.JPG",
  "/akce/carodejnice-2026/IMG_0733.JPG",
  "/akce/carodejnice-2026/IMG_0734.JPG",
  "/akce/carodejnice-2026/IMG_0735.JPG",
  "/akce/carodejnice-2026/IMG_0738.JPG",
  "/akce/carodejnice-2026/IMG_0739.JPG",
  "/akce/carodejnice-2026/IMG_0747.JPG",
  "/akce/carodejnice-2026/IMG_0751.JPG",
  "/akce/carodejnice-2026/IMG_0756.JPG",
  "/akce/carodejnice-2026/IMG_0761.JPG",
  "/akce/carodejnice-2026/IMG_0762.JPG",
  "/akce/carodejnice-2026/IMG_0765.JPG",
  "/akce/carodejnice-2026/IMG_0770.JPG",
  "/akce/carodejnice-2026/IMG_0792.JPG",
  "/akce/carodejnice-2026/IMG_0794.JPG",
  "/akce/carodejnice-2026/IMG_0796.JPG",
  "/akce/carodejnice-2026/IMG_0799.JPG",
  "/akce/carodejnice-2026/IMG_0803.JPG",
  "/akce/carodejnice-2026/IMG_0807.JPG",
  "/akce/carodejnice-2026/IMG_0809.JPG",
  "/akce/carodejnice-2026/IMG_0814.JPG",
  "/akce/carodejnice-2026/IMG_1353.JPG",
  "/akce/carodejnice-2026/IMG_1358.JPG",
  "/akce/carodejnice-2026/IMG_1361[1].JPG",
  "/akce/carodejnice-2026/IMG_1365.JPG",
];

export default function CarodejniceGaleriePage() {
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
        closeGallery();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
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
        <BackLink href="/sdh/galerie">Zpět do galerie</BackLink>

        <h1
          style={{
            marginTop: "28px",
            marginBottom: "18px",
            fontSize: "clamp(42px, 9vw, 64px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
          }}
        >
          Pálení čarodějnic <span style={{ color: "#dc2626" }}>2026</span>
        </h1>

        <p
          style={{
            marginBottom: "34px",
            fontSize: "clamp(18px, 4vw, 20px)",
            lineHeight: 1.6,
            color: "#6b7280",
          }}
        >
          Fotogalerie z tradiční akce SDH Dukovany.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
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
                height: "clamp(160px, 38vw, 300px)",
                padding: 0,
                border: "none",
                borderRadius: "20px",
                overflow: "hidden",
                background: "#f3f4f6",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                cursor: "pointer",
              }}
            >
              <Image
                src={image}
                alt={`Pálení čarodějnic ${index + 1}`}
                fill
                loading="lazy"
                quality={65}
                sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 250px"
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
              background: "#ffffff",
              color: "#111827",
              border: "none",
              borderRadius: "999px",
              width: "46px",
              height: "46px",
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
              lineHeight: 1,
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
              alt={`Pálení čarodějnic ${selectedIndex + 1}`}
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
              lineHeight: 1,
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