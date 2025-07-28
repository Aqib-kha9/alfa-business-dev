'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const mockData = [
  {
    id: 'TR001',
    name: 'Alice Wonderland',
    email: 'alice.w@example.com',
    phone: '555-123-4567',
    date: '2024-07-20',
    time: '10:00',
    status: 'Pending',
  },
  {
    id: 'TR002',
    name: 'Bob The Builder',
    email: 'bob.b@example.com',
    phone: '555-987-6543',
    date: '2024-07-22',
    time: '14:30',
    status: 'Approved',
  },
];

export default function EditTour() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    status: '',
  });

  useEffect(() => {
    const tour = mockData.find((t) => t.id === id);
    if (tour) setForm(tour);
  }, [id]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const fields = [
    { name: 'name', label: 'Client Name' },
    { name: 'email', label: 'Email Address' },
    { name: 'phone', label: 'Phone Number' },
    { name: 'date', label: 'Tour Date' },
    { name: 'time', label: 'Tour Time' },
    { name: 'status', label: 'Status' },
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto mt-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-[#2d386a] mb-6 border-b pb-2">Edit Tour Request</h1>

      <form className="grid grid-cols-1 gap-4">
        {fields.map(({ name, label }) => (
          <div key={name} className="flex flex-col">
            <label htmlFor={name} className="mb-1 font-medium text-gray-700">
              {label}
            </label>

            {name === 'status' ? (
              <select
                id={name}
                className="p-2 border border-gray-300 rounded"
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
              </select>
            ) : (
              <input
                id={name}
                type={name === 'date' ? 'date' : name === 'time' ? 'time' : 'text'}
                className="p-2 border border-gray-300 rounded"
                value={form[name as keyof typeof form]}
                onChange={(e) => handleChange(name, e.target.value)}
                required
              />
            )}
          </div>
        ))}
      </form>
    </div>
  );
}
