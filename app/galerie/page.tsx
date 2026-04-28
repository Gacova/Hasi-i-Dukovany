"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Photo = {
  name: string;
  url: string;
};

export default function Galerie() {
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  async function loadPhotos() {
    const { data, error } = await supabase.storage.from("galerie").list("", {
      limit: 100,
      sortBy: { column: "name", order: "desc" },
    });

    if (error) {
      console.error("Chyba při načítání fotek:", error);
      return;
    }

    const loadedPhotos =
      data?.map((file) => {
        const { data: publicUrlData } = supabase.storage
          .from("galerie")
          .getPublicUrl(file.name);

        return {
          name: file.name,
          url: publicUrlData.publicUrl,
        };
      }) || [];

    setPhotos(loadedPhotos);
  }

  async function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("galerie")
      .upload(fileName, file);

    if (error) {
      alert("Chyba při nahrávání fotky");
      console.error(error);
    } else {
      alert("Fotka byla nahrána");
      await loadPhotos();
    }

    setUploading(false);
  }

  useEffect(() => {
    loadPhotos();
  }, []);

  return (
    <main className="min-h-screen bg-white px-6 py-16 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
        <h1 className="text-4xl font-bold">Galerie</h1>

        <label className="inline-block rounded-2xl bg-red-600 px-6 py-3 font-medium text-white cursor-pointer">
          Vybrat fotku
          <input type="file" onChange={uploadFile} className="hidden" />
        </label>
      </div>

      {uploading && <p className="mb-6">Nahrávám...</p>}

      {photos.length === 0 ? (
        <p className="text-neutral-600">Zatím tu nejsou žádné fotky.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((photo) => (
            <div
              key={photo.name}
              className="overflow-hidden rounded-[1.5rem] bg-neutral-100 shadow-sm"
            >
              <img
                src={photo.url}
                alt={photo.name}
                className="h-64 w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}