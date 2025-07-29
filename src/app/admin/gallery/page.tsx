'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CiCirclePlus } from 'react-icons/ci';

type Gallery = {
  imageType: string;
  images: string[];
  createdAt?: string;
};

export default function GalleryList() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data: Gallery[]) => {
        // Combine all image arrays from all gallery objects
        const allImages = data.flatMap((item) => item.images);
        setImages(allImages);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-6">Loading gallery images...</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Gallery Images</h2>
        <button
          onClick={() => router.push('/admin/gallery/add')}
          className="bg-[#2d386a] text-white hover:bg-[#1f2950] flex items-center px-4 py-2 rounded"
        >
          <CiCirclePlus className="mr-2 text-lg" />
          Add New Image
        </button>
      </div>

      {images.length === 0 ? (
        <p>No gallery images found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Gallery Image ${index}`}
              className="w-full h-32 object-cover rounded border"
            />
          ))}
        </div>
      )}
    </div>
  );
}
