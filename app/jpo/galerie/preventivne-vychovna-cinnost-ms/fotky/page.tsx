"use client";

import { useState } from "react";
import BackLink from "@/components/BackLink";

export default function FotkyPage() {
  const images = [
    "/jpo_skolka/hlavni.jpg",
    "/jpo_skolka/IMG-20260616-WA0007.jpg",
    "/jpo_skolka/IMG-20260616-WA0008.jpg",
    "/jpo_skolka/IMG-20260616-WA0009.jpg",
    "/jpo_skolka/IMG-20260616-WA0010.jpg",
    "/jpo_skolka/IMG-20260616-WA0011.jpg",
    "/jpo_skolka/IMG-20260616-WA0013.jpg",
    "/jpo_skolka/IMG-20260616-WA0014.jpg",
    "/jpo_skolka/IMG-20260616-WA0017.jpg",
    "/jpo_skolka/IMG-20260616-WA0024.jpg",
    "/jpo_skolka/IMG-20260616-WA0026.jpg",
    "/jpo_skolka/IMG-20260616-WA0027.jpg",
    "/jpo_skolka/IMG-20260616-WA0028.jpg",
    "/jpo_skolka/IMG-20260616-WA0030.jpg",
    "/jpo_skolka/IMG-20260616-WA0031.jpg",
    "/jpo_skolka/IMG-20260616-WA0033.jpg",
    "/jpo_skolka/IMG-20260616-WA0035.jpg",
    "/jpo_skolka/IMG-20260616-WA0036.jpg",
    "/jpo_skolka/IMG-20260616-WA0037.jpg",
    "/jpo_skolka/IMG-20260616-WA0038.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "16px",
          }}
        >
          {images.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`MŠ Dukovany ${index + 1}`}
              onClick={() => setSelectedImage(image)}
              style={{
                width: "100%",
                height: "clamp(160px, 38vw, 300px)",
                objectFit: "cover",
                borderRadius: "20px",
                display: "block",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
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
              width: "46px",
              height: "46px",
              borderRadius: "999px",
              border: "none",
              background: "#ffffff",
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