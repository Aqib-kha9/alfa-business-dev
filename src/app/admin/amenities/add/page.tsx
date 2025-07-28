'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Amenity = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
};

export default function AddAmenity() {
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    imageUrl: ''
  });

  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'imageUrl' && files && files.length > 0) {
      setForm({ ...form, imageUrl: URL.createObjectURL(files[0]) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAmenity: Amenity = {
      id: Date.now(),
      ...form
    };
    setAmenities([newAmenity, ...amenities]);
    setForm({ title: '', subtitle: '', description: '', imageUrl: '' });
  };

  const handleCancel = () => {
    setForm({ title: '', subtitle: '', description: '', imageUrl: '' });
  };

  const fields = [
    { label: 'Amenity Name', name: 'title', type: 'text', placeholder: 'Enter Amenity Name' },
    { label: 'Tag', name: 'subtitle', type: 'text', placeholder: 'e.g. Wi-Fi, Kitchen' },
    { label: 'Description', name: 'description', type: 'text', placeholder: 'Description' },
    { label: 'Image', name: 'imageUrl', type: 'file', placeholder: 'Upload Image' }
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded shadow p-6 mb-10 space-y-4 max-w-md w-full mx-auto"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Add New Amenity</h3>
        <button
          onClick={() => router.back()}
          type="button"
          className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {fields.map(({ label, name, type, placeholder }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1 font-medium text-gray-700">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              value={type !== 'file' ? (form as any)[name] : undefined}
              onChange={handleChange}
              required
              className="border px-3 py-2 rounded-md w-full"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="reset"
          onClick={handleCancel}
          className="text-gray-600 hover:underline"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-[#2d386a] text-white px-4 py-2 rounded"
        >
          Save Amenity
        </button>
      </div>
    </form>
  );
}
