'use client';

import { useRouter } from 'next/navigation';

export default function EditTestimonials() {
  const router = useRouter();

  const fields = [
    { label: 'Name', placeholder: 'Enter customer name', type: 'text' },
    { label: 'Position', placeholder: 'Enter position/designation', type: 'text' },
    { label: 'Message', placeholder: 'Enter testimonial message', type: 'textarea' },
    { label: 'Image URL', placeholder: 'Enter image link', type: 'file' },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-xl mx-auto bg-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-[#2d386a]">Edit Testimonial</h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back
        </button>
      </div>

      <form className="space-y-4 max-w-xl mx-auto">
        {fields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                placeholder={field.placeholder}
                rows={4}
                className="block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
              />
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-[#2d386a] text-white px-4 py-2 rounded hover:bg-[#1f2956]"
        >
          Update Testimonial
        </button>
      </form>
    </div>
  );
}
