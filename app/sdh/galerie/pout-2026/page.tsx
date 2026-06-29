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
    <main
      style={{
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 32px 80px",
        }}
      >
        <BackLink href="/sdh/galerie">
          Zpět do galerie
        </BackLink>

        <h1
          style={{
            marginTop: "30px",
            marginBottom: "20px",
            fontSize: "64px",
            fontWeight: 800,
            lineHeight: 1.1,
          }}
        >
          Pouť <span style={{ color: "#dc2626" }}>2026</span>
        </h1>

        <p
          style={{
            marginBottom: "50px",
            fontSize: "20px",
            color: "#6b7280",
          }}
        >
          Fotogalerie z pouti a pouťového průvodu v Dukovanech.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Pouť ${index + 1}`}
              onClick={() => setSelectedImage(image)}
              style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                borderRadius: "24px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                display: "block",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              cursor: "pointer",
              padding: "30px",
            }}
          >
            <img
              src={selectedImage}
              alt="Zvětšená fotografie"
              style={{
                maxWidth: "95%",
                maxHeight: "95%",
                borderRadius: "20px",
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
}