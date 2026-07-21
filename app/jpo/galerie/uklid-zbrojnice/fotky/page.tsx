"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import BackLink from "@/components/BackLink";

export default function UklidZbrojniceFotkyPage() {
  const images = [
    "/uklid-zbrojnice/20260606_091314.jpg",
    "/uklid-zbrojnice/IMG-20260606-WA0031.jpg",
    "/uklid-zbrojnice/IMG-20260606-WA0032.jpg",
    "/uklid-zbrojnice/IMG-20260606-WA0033.jpg",
    "/uklid-zbrojnice/IMG-20260606-WA0035.jpg",
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeGallery = () => setSelectedIndex(null);

  const showPreviousImage = () => {
    setSelectedIndex((current) =>
      current === null ? null : current === 0 ? images.length - 1 : current - 1
    );
  };

  const showNextImage = () => {
    setSelectedIndex((current) =>
      current === null ? null : current === images.length - 1 ? 0 : current + 1
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
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
        <BackLink href="/jpo/galerie/uklid-zbrojnice">
          Zpět na článek
        </BackLink>

        <h1
          style={{
            marginTop: "28px",
            marginBottom: "18px",
            fontSize: "clamp(42px, 9vw, 56px)",
            fontWeight: 800,
            color: "#111827",
            letterSpacing: "-1.5px",
          }}
        >
          Galerie úklidu zbrojnice
        </h1>

        <p
          style={{
            marginBottom: "34px",
            fontSize: "clamp(18px, 4vw, 20px)",
            color: "#6b7280",
          }}
        >
          Fotografie ze společné brigády členů SDH a JPO Dukovany.
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
              onClick={() => setSelectedIndex(index)}
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(160px,38vw,300px)",
                border: "none",
                padding: 0,
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
                background: "#f3f4f6",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <Image
                src={image}
                alt={`Úklid ${index + 1}`}
                fill
                loading="lazy"
                quality={65}
                sizes="(max-width:640px) 50vw,(max-width:1100px) 33vw,280px"
                style={{ objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div
          onClick={closeGallery}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "70px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#fff",
              fontWeight: 700,
            }}
          >
            {selectedIndex + 1} / {images.length}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              closeGallery();
            }}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "46px",
              height: "46px",
              borderRadius: "999px",
              border: "none",
              background: "#fff",
              fontSize: "28px",
              cursor: "pointer",
            }}
          >
            ×
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showPreviousImage();
            }}
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "52px",
              height: "52px",
              borderRadius: "999px",
              border: "none",
              background: "rgba(255,255,255,.9)",
              fontSize: "34px",
              cursor: "pointer",
            }}
          >
            ‹
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
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
              alt="Fotografie"
              fill
              priority
              quality={90}
              sizes="100vw"
              style={{ objectFit: "contain" }}
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showNextImage();
            }}
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "52px",
              height: "52px",
              borderRadius: "999px",
              border: "none",
              background: "rgba(255,255,255,.9)",
              fontSize: "34px",
              cursor: "pointer",
            }}
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}