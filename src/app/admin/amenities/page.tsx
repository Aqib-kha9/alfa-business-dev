'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle } from 'lucide-react';

type Amenity = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
};

export default function AmenitiesPage() {
    const router = useRouter();


    const [amenities, setAmenities] = useState<Amenity[]>([
        {
            id: 1,
            title: 'High-Speed Wi-Fi',
            subtitle: 'Seamless connectivity',
            description: 'Stay connected with fast and secure internet.',
            imageUrl: 'https://images.unsplash.com/photo-1581092919535-1b162f40b61e'
        },
        {
            id: 2,
            title: 'Modern Conference Rooms',
            subtitle: 'Private & equipped',
            description: 'Hold productive meetings in our modern conference spaces.',
            imageUrl: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62'
        },
        {
            id: 3,
            title: 'Complimentary Coffee & Tea',
            subtitle: 'Fuel your productivity',
            description: 'Enjoy unlimited coffee and tea throughout the day.',
            imageUrl: 'https://images.unsplash.com/photo-1588702547923-7093a6c3ba33'
        },
        {
            id: 4,
            title: 'Secure Printing Services',
            subtitle: 'Print, scan, copy',
            description: 'Print securely and conveniently from any device.',
            imageUrl: 'https://images.unsplash.com/photo-1586810724476-c294fb7ac01b'
        },
    ]);



    const handleDelete = (id: number) => {
        setAmenities(amenities.filter((a) => a.id !== id));
    };
    const handleEdit = (id: number) => {
        router.push('/admin/amenities/edit')
    }

    return (
        <div className="p-6  mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-1xl md:text-4xl font-bold">Amenities Management</h2>
                <button
                    className="flex items-center bg-[#2d386a] text-white px-4 py-2 rounded text-sm"
                    onClick={() => router.push('/admin/amenities/add')}
                >
                    <PlusCircle className='mx-2'/> Add New Amenity
                </button>
            </div>



            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {amenities.map((amenity) => (
                    <div key={amenity.id} className="bg-white rounded shadow hover:shadow-md transition">
                        <img src={amenity.imageUrl} alt={amenity.title} className="w-full h-36 object-cover rounded-t" />
                        <div className="p-4">
                            <h4 className="text-lg font-semibold">{amenity.title}</h4>
                            <p className="text-sm text-gray-500 mb-1">{amenity.subtitle}</p>
                            <p className="text-sm text-gray-700 mb-3">{amenity.description}</p>
                            <div className="flex justify-between">
                                <button onClick={() => handleEdit(amenity.id)} className="text-sm text-[#2d386a] font-medium">✏ Edit</button>
                                <button
                                    onClick={() => handleDelete(amenity.id)}
                                    className="text-sm text-red-500 font-medium"
                                >
                                    🗑 Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
