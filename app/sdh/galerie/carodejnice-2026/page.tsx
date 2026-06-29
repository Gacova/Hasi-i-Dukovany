"use client";

import { useState } from "react";
import BackLink from "@/components/BackLink";

export default function CarodejniceGaleriePage() {
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

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "34px 24px 70px" }}>
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
            <img
              key={image}
              src={image}
              alt={`Pálení čarodějnic ${index + 1}`}
              onClick={() => setSelectedImage(image)}
              style={{
                width: "100%",
                height: "clamp(160px, 38vw, 300px)",
                objectFit: "cover",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                display: "block",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              background: "#ffffff",
              border: "none",
              borderRadius: "999px",
              width: "46px",
              height: "46px",
              fontSize: "28px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Zvětšená fotografie"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "96vw",
              maxHeight: "88vh",
              objectFit: "contain",
              borderRadius: "18px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
            }}
          />
        </div>
      )}
    </main>
  );
}