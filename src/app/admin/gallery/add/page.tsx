'use client';

import { useState } from 'react';

const imageTypeOptions = ["Workspaces", "Meeting Rooms", "Amenities", "Lounge", "Common"];

export default function AddGalleryPage() {
  const [imageType, setImageType] = useState("Workspaces");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("folder", imageType); // now using selected folder

      const res = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) uploadedUrls.push(data.url);
    }

    setImageUrls((prev) => [...prev, ...uploadedUrls]);
    setIsUploading(false);
  };

  const handleSubmit = async () => {
    if (imageUrls.length === 0) return alert("Please upload images");

    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageType, // send selected type
        images: imageUrls,
      }),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Gallery saved!");
      setImageUrls([]);
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Gallery Images</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Image Type (Folder)</label>
        <select
          value={imageType}
          onChange={(e) => setImageType(e.target.value)}
          className="border p-2 rounded w-full"
        >
          {imageTypeOptions.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 block border p-2 rounded w-full"
      />

      {isUploading && <p className="text-blue-500 mb-4">Uploading...</p>}

      <div className="flex flex-wrap gap-3 mb-4">
        {imageUrls.map((url, i) => (
          <img key={i} src={url} className="h-24 rounded border" alt={`Preview ${i}`} />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save to DB
      </button>
    </div>
  );
}
