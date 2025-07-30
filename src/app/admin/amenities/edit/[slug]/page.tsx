'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
export default function EditAmenities() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    amenitiesName: '',
    tag: '',
    description: '',
    image: [] as string[], // Cloudinary URLs
  });

  useEffect(() => {
    const fetchAmenity = async () => {
      try {
        const res = await fetch(`/api/amenities/${slug}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            amenitiesName: data.amenitiesName || '',
            tag: data.tag || '',
            description: data.description || '',
            image: data.image || [],
          });
        }
      } catch (err) {
        console.error('Error loading amenity:', err);
      }
    };

    if (slug) fetchAmenity();
  }, [slug]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

 const handleImageDelete = async () => {
  const imageUrl = formData.image[0];
  if (!imageUrl) return;

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will delete the image permanently.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (!result.isConfirmed) return;

  try {
    const res = await fetch('/api/cloudinary/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl }),
    });

    const data = await res.json();

    if (res.ok) {
      setFormData((prev) => ({ ...prev, image: [] }));
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Image has been deleted.',
        confirmButtonColor: '#2d386a',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: data.error || 'Failed to delete image',
        confirmButtonColor: '#d33',
      });
    }
  } catch (err) {
    console.error('Delete failed', err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Something went wrong while deleting.',
    });
  }
};


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const body = new FormData();
  body.append('amenitiesName', formData.amenitiesName);
  body.append('tag', formData.tag);
  body.append('description', formData.description);
  if (imageFile) body.append('image', imageFile);

  try {
    const res = await fetch(`/api/amenities/${slug}`, {
      method: 'PUT',
      body,
    });

    const data = await res.json();
    setIsSubmitting(false);

    if (res.ok) {
      await Swal.fire({
        icon: 'success',
        title: 'Amenity Updated!',
        text: 'Your changes have been saved successfully.',
        confirmButtonColor: '#2d386a',
      });
      router.push('/admin/amenities');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: data.error || 'Failed to update the amenity.',
        confirmButtonColor: '#d33',
      });
    }
  } catch (err) {
    console.error(err);
    setIsSubmitting(false);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Something went wrong.',
      confirmButtonColor: '#d33',
    });
  }
};


  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-[#2d386a]">Edit Amenity</h1>
        <button
          onClick={() => router.back()}
          className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-6">
        <SimpleInput
          label="Amenity Name"
          name="amenitiesName"
          value={formData.amenitiesName}
          onChange={handleChange}
        />
        <SimpleInput
          label="Tag"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
        />
        <SimpleInput
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        {/* Upload field UI */}
        <div className="space-y-4">
          <label
            className={`block w-full border-2 border-dashed rounded-md px-6 py-8 text-center cursor-pointer transition-all ${imageFile || formData.image.length > 0
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
              }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              name="imageUrl"
              className="hidden"
              onChange={handleImageChange}
              multiple={false}
            />
            <p className="text-sm text-gray-600">
              {imageFile || formData.image.length > 0 ? (
                <span className="text-blue-600 font-medium">Image selected</span>
              ) : (
                <>Click or drag & drop to upload an image</>
              )}
            </p>
          </label>

          {/* Show existing or new image preview */}
          {(formData.image.length > 0 || imageFile) && (
            <div className="relative w-32 h-32 border rounded-md shadow-sm overflow-hidden">
              <img
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : formData.image[0]
                }
                alt="Amenity Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  if (formData.image.length > 0) handleImageDelete();
                  else setImageFile(null);
                }}
                className="absolute top-1 right-1 bg-white text-red-500 border border-gray-300 rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                ×
              </button>
            </div>
          )}
        </div>


        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.refresh()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 flex items-center justify-center gap-2 rounded-md text-white transition-colors ${isSubmitting
                ? 'bg-[#2d386a] cursor-not-allowed opacity-75'
                : 'bg-[#2d386a] hover:bg-[#1f2950]'
              }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Amenity'}
          </button>
        </div>
      </form>
    </div>
  );
}

function SimpleInput({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {name === 'description' ? (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#2d386a]"
        />
      ) : (
        <input
          type="text"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          required
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full border px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-[#2d386a]"
        />
      )}
    </div>
  );
}
