'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function EditTestimonialPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    image: '',
    status: 'pending',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/testimonials/${id}`)
        .then(async res => {
          if (!res.ok) throw new Error(await res.text());
          return res.json();
        })
        .then(data => {
          const testimonial = data.testimonial || data;
          setForm({
            name: testimonial.name || '',
            email: testimonial.email || '',
            message: testimonial.message || '',
            image: testimonial.image || '',
            status: testimonial.status || 'pending',
          });
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          toast.error('Failed to load testimonial');
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('_id', String(id));
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('message', form.message);
    formData.append('status', form.status);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Update failed');
      }

      toast.success('Testimonial updated');
      router.push('/admin/testimonials');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#2d386a]">Edit Testimonial</h1>
        <button
          onClick={() => router.back()}
          className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
        >
          ← Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-xl p-6 space-y-5">
        <SimpleInput
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <SimpleInput
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <SimpleInput
          label="Message"
          name="message"
          value={form.message}
          onChange={handleChange}
          textarea
        />

        {/* Image Upload Field */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border px-4 py-2 rounded-md text-sm border-gray-300"
          />
          {form.image && !imageFile && (
            <img
              src={form.image}
              alt="Existing"
              className="w-24 h-24 rounded object-cover mt-2"
            />
          )}
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-[#2d386a] text-white rounded hover:bg-[#1f2950]"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

// ✅ Reusable SimpleInput
function SimpleInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  textarea = false,
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  textarea?: boolean;
  onChange: (e: React.ChangeEvent<any>) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required
          rows={4}
          className="w-full border px-4 py-2 rounded-md text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required
          className="w-full border px-4 py-2 rounded-md text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
        />
      )}
    </div>
  );
}
