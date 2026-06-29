"use client";

import { useState } from "react";
import BackLink from "@/components/BackLink";

export default function FotkyPage() {
  const images = [
    "/paleni-carodejnic/uvodni.JPG",
    "/paleni-carodejnic/IMG_0761.JPG",
    "/paleni-carodejnic/IMG_0765.JPG",
    "/paleni-carodejnic/IMG_1361[1].JPG",
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "34px 24px 70px" }}>
        <BackLink href="/jpo/galerie/paleni-carodejnic">
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
          Galerie pálení čarodějnic
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
          Fotografie z požárního dohledu jednotky JPO Dukovany při pálení
          čarodějnic.
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