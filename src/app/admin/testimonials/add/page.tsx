'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddTestimonial() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        designation: '',
        message: '',
        image: ''
    });

    const inputs = [
        { name: 'name', type: 'text', placeholder: 'Name', required: true },
        { name: 'designation', type: 'text', placeholder: 'Designation', required: true },
        { name: 'message', type: 'textarea', placeholder: 'Testimonial Message', required: true },
        { name: 'image', type: 'file', placeholder: 'Image URL', required: false }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form); // Replace with API call
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-10">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold text-[#2d386a]">Edit Testimonial</h1>
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                >
                    ← Back
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {inputs.map((input) => (
                    <div key={input.name}>
                        <label
                            htmlFor={input.name}
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            {input.name.charAt(0).toUpperCase() + input.name.slice(1)}
                        </label>

                        {input.type === 'textarea' ? (
                            <textarea
                                id={input.name}
                                name={input.name}
                                placeholder={input.placeholder}
                                value={form[input.name as keyof typeof form]}
                                onChange={handleChange}
                                required={input.required}
                                rows={4}
                                className="block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
                            />
                        ) : (
                            <input
                                id={input.name}
                                type={input.type}
                                name={input.name}
                                placeholder={input.placeholder}
                                value={form[input.name as keyof typeof form]}
                                onChange={handleChange}
                                required={input.required}
                                className="block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2d386a]"
                            />
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-[#2d386a] text-white px-4 py-2 rounded hover:bg-[#1f2956]"
                >
                    Submit
                </button>
            </form>

        </div>
    );
}
