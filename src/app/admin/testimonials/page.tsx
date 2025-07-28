'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';
import { HiOutlinePlus } from 'react-icons/hi';

const testimonials = [
    {
        id: 1,
        name: 'Sarah Chen',
        status: 'Approved',
        message:
            'The Alfa Admin Panel has revolutionized our operations. Its intuitive interface makes managing coworking spaces a breeze. Highly recommended!',
        avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
        id: 2,
        name: 'Mark Davis',
        status: 'Approved',
        message:
            'I appreciate the comprehensive features, especially for tour requests. It helps us keep track of potential clients effortlessly. A truly powerful tool.',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
        id: 3,
        name: 'Jessica Lee',
        status: 'Pending',
        message:
            'The amenities management is fantastic! We can easily update our offerings and ensure clients have the latest information. User-friendly and effective.',
        avatar: 'https://randomuser.me/api/portraits/women/66.jpg',
    },
    {
        id: 4,
        name: 'David Kim',
        status: 'Approved',
        message:
            'This panel has significantly improved our efficiency. The pricing plan setup is straightforward, and the analytics give us great insights. Excellent product!',
        avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    },
    {
        id: 5,
        name: 'Emily White',
        status: 'Pending',
        message:
            'The Testimonials section helps us highlight positive feedback! It’s easy to manage and showcases our happy clients effectively.',
        avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
    },
    {
        id: 6,
        name: 'Chris Green',
        status: 'Approved',
        message:
            'A robust and reliable admin panel. The security features give us peace of mind, and the responsiveness across devices is impressive.',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
        id: 7,
        name: 'Olivia Brown',
        status: 'Rejected',
        message:
            'Navigating through the panel is very smooth. All the features are logically placed, making daily tasks much simpler. A joy to use!',
        avatar: 'https://randomuser.me/api/portraits/women/35.jpg',
    },
    {
        id: 8,
        name: 'Daniel Wilson',
        status: 'Approved',
        message:
            'The customer support integrated within the panel is excellent. Any queries are resolved quickly, contributing to a seamless experience.',
        avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
    },
];

const statusColors: Record<'Approved' | 'Pending' | 'Rejected', string> = {
    Approved: 'text-green-600',
    Pending: 'text-yellow-600',
    Rejected: 'text-red-600',
};
export default function ClientTestimonials() {
    const router = useRouter();
    const handleEdit = () => {
        router.push("/admin/testimonials/edit")
    }
    const [filter, setFilter] = useState('All');

    const filteredTestimonials =
        filter === 'All'
            ? testimonials
            : testimonials.filter((t) => t.status === filter);

    return (
        <div className="p-6 mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Client Testimonials</h1>
                <button onClick={()=> router.push('/admin/testimonials/add')} className="flex items-center bg-[#2d386a] text-white p-2 mx-2 rounded text-sm">
                    <HiOutlinePlus size={18} className='mx-2'/> Add Testimonial
                </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 text-sm"
                >
                    <option value="All">All Statuses</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTestimonials.map((t) => (
                    <div
                        key={t.id}
                        className="bg-white p-4 rounded-lg shadow flex flex-col gap-3"
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src={t.avatar}
                                alt={t.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="font-semibold text-gray-800">{t.name}</h2>
                                <span className={`text-sm ${statusColors[t.status as keyof typeof statusColors]}`}>
                                    {t.status}
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-700">{t.message}</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {t.status !== 'Approved' && (
                                <button className="flex items-center px-3 py-1 text-sm rounded bg-green-100 text-green-700 hover:bg-green-200">
                                    <FaCheck className="inline mr-1" /> Approve
                                </button>
                            )}
                            <button onClick={handleEdit} className="flex items-center px-3 py-1 text-sm rounded bg-gray-100 text-gray-800 hover:bg-gray-200">
                                <FaEdit className="inline mr-1" /> Edit
                            </button>
                            {t.status !== "Rejected" && (
                                <button className="flex items-center px-3 py-1 text-sm rounded bg-red-100 text-red-600 hover:bg-red-200">
                                <FaTimes className="inline mr-1" /> Reject
                            </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}