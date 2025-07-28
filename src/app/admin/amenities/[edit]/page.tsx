'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EditAmenities() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
  });

  const fields = [
    { name: 'title', type: 'text', label: 'Title', placeholder: 'Enter amenity title' },
    { name: 'subtitle', type: 'text', label: 'Subtitle', placeholder: 'Enter subtitle' },
    { name: 'Image', type: 'file', label: 'Image' },
    { name: 'description', type: 'textarea', label: 'Description', placeholder: 'Enter description' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // TODO: Submit updated data to API
  };

  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto bg-white">
      <div className="flex items-center justify-between  mb-4 ">
        <h1 className="text-xl font-semibold text-[#2d386a]">Edit Amenity</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>

      {/* Edit form section */}
      <form onSubmit={handleSubmit} className="space-y-4 ">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                rows={4}
                placeholder={field.placeholder}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-[#2d386a] text-white px-4 py-2 rounded hover:bg-[#1f2956]"
        >
          Update Amenity
        </button>
      </form>
    </div>
  );
}
