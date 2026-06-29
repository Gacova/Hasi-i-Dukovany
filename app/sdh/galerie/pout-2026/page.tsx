"use client";

import { useState } from "react";
import BackLink from "@/components/BackLink";

export default function PoutGaleriePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    "/pout/IMG-20260531-WA0006.jpg",
    "/pout/IMG-20260531-WA0014.jpg",
    "/pout/IMG-20260604-WA0028.jpg",
    "/pout/file_000000002df4720aa59590672d1f5c4e.png",
    "/pout/file_000000003c28720a9910bb16ad0f3033.png",
  ];

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
          Pouť <span style={{ color: "#dc2626" }}>2026</span>
        </h1>

        <p
          style={{
            marginBottom: "34px",
            fontSize: "clamp(18px, 4vw, 20px)",
            lineHeight: 1.6,
            color: "#6b7280",
          }}
        >
          Fotogalerie z pouti a pouťového průvodu v Dukovanech.
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
              alt={`Pouť ${index + 1}`}
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
            cursor: "pointer",
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