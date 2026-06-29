"use client";

import { useState } from "react";
import BackLink from "@/components/BackLink";

export default function FotkyPage() {
  const images = [
    "/skoleni-zdravovedy/IMG-20260605-WA0039.jpg",
    "/skoleni-zdravovedy/IMG-20260605-WA0040.jpg",
    "/skoleni-zdravovedy/IMG-20260605-WA0041.jpg",
    "/skoleni-zdravovedy/IMG-20260605-WA0042.jpg",
    "/skoleni-zdravovedy/IMG-20260605-WA0043.jpg",
    "/skoleni-zdravovedy/IMG-20260605-WA0044.jpg",
    "/skoleni-zdravovedy/IMG-20260605-WA0045.jpg",
    "/skoleni-zdravovedy/IMG-20260606-WA0000.jpg",
    "/skoleni-zdravovedy/IMG-20260606-WA0001.jpg",
    "/skoleni-zdravovedy/IMG-20260606-WA0002.jpg",
    "/skoleni-zdravovedy/IMG-20260606-WA0003.jpg",
    "/skoleni-zdravovedy/IMG-20260606-WA0004.jpg",
    "/skoleni-zdravovedy/IMG-20260606-WA0005.jpg",
    "/skoleni-zdravovedy/IMG-20260606-WA0006.jpg",
    "/skoleni-zdravovedy/IMG-20260606-WA0007.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 32px 80px",
        }}
      >
        <BackLink href="/jpo/galerie/skoleni-zdravovedy">
          Zpět na článek
        </BackLink>

        <h1
          style={{
            marginTop: "30px",
            marginBottom: "20px",
            fontSize: "56px",
            fontWeight: 800,
            color: "#111827",
          }}
        >
          Galerie školení zdravotní přípravy
        </h1>

        <p
          style={{
            marginBottom: "40px",
            fontSize: "18px",
            color: "#6b7280",
          }}
        >
          Fotografie z odborné přípravy členů jednotky JPO Dukovany.
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
              alt={`Fotka ${index + 1}`}
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