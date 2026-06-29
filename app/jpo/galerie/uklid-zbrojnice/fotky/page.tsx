"use client";

import { useState } from "react";
import BackLink from "@/components/BackLink";

export default function UklidZbrojniceFotkyPage() {
  const images = [
    "/uklid-zbrojnice/20260606_091314.jpg",
    "/uklid-zbrojnice/IMG-20260606-WA0031.jpg",
    "/uklid-zbrojnice/IMG-20260606-WA0032.jpg",
    "/uklid-zbrojnice/IMG-20260606-WA0033.jpg",
    "/uklid-zbrojnice/IMG-20260606-WA0035.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 32px 80px" }}>
        <BackLink href="/jpo/galerie/uklid-zbrojnice">Zpět na článek</BackLink>

        <h1 style={{ marginTop: "30px", marginBottom: "20px", fontSize: "56px", fontWeight: 800 }}>
          Galerie <span style={{ color: "#dc2626" }}>úklidu zbrojnice</span>
        </h1>

        <p style={{ marginBottom: "40px", fontSize: "18px", color: "#6b7280" }}>
          Fotografie ze společné brigády členů SDH a JPO Dukovany.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Úklid zbrojnice ${index + 1}`}
              onClick={() => setSelectedImage(image)}
              style={{
                width: "100%",
                height: "280px",
                objectFit: "cover",
                borderRadius: "20px",
                display: "block",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
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
            background: "rgba(0,0,0,0.85)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
          }}
        >
          <button
            onClick={() => setSelectedImage(null)}
            style={{
              position: "absolute",
              top: "24px",
              right: "30px",
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
              maxWidth: "95vw",
              maxHeight: "90vh",
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