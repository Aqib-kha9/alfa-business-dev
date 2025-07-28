'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle } from 'lucide-react';

type Amenity = {
  _id: string;
  amenitiesName: string;
  slug: string;
  tag: string;
  description: string;
  image: string[];
};

export default function AmenitiesPage() {
  const router = useRouter();
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);

  //  Move this function outside useEffect
  const fetchAmenities = async () => {
    try {
      setLoading(true); // optional spinner during refresh
      const res = await fetch('/api/amenities');
      if (!res.ok) throw new Error('Failed to fetch amenities');
      const data = await res.json();
      setAmenities(data);
    } catch (error) {
      console.error('Error fetching amenities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  const handleDelete = async (slug: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this amenity?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/amenities/${slug}`, { method: 'DELETE' });

      if (res.ok) {
        alert('Amenity deleted!');
        await fetchAmenities(); //  Re-fetch to refresh UI immediately
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Something went wrong');
    }
  };

  const handleEdit = (slug: string) => {
    router.push(`/admin/amenities/edit/${slug}`);
  };

  return (
    <div className="p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-1xl md:text-4xl font-bold">Amenities Management</h2>
        <button
          className="flex items-center bg-[#2d386a] text-white px-4 py-2 rounded text-sm"
          onClick={() => router.push('/admin/amenities/add')}
        >
          <PlusCircle className="mx-2" /> Add New Amenity
        </button>
      </div>

      {loading ? (
        <p>Loading amenities...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity) => (
            <div key={amenity._id} className="bg-white rounded shadow hover:shadow-md transition">
              <img
                src={Array.isArray(amenity.image) && amenity.image[0] ? amenity.image[0] : '/placeholder.jpg'}
                alt={amenity.amenitiesName}
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold">{amenity.amenitiesName}</h4>
                <p className="text-sm text-gray-500 mb-1">{amenity.tag}</p>
                <p className="text-sm text-gray-700 mb-3">{amenity.description}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(amenity.slug || amenity._id)}
                    className="text-sm text-[#2d386a] font-medium"
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(amenity.slug || amenity._id)}
                    className="text-sm text-red-500 font-medium"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
