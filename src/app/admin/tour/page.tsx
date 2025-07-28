'use client';

import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import clsx from 'clsx';
import ActionMenu from '../components/ActionMenu';
import { useRouter } from 'next/navigation';

const tabs = ['All Requests', 'Pending', 'Approved'];

type Booking = {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  preferredDate: string;
  preferredTime: string;
  status?: 'Pending' | 'Approved';
};

export default function TourRequestsPage() {
  const [selectedTab, setSelectedTab] = useState('All Requests');
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/book-tour');
        if (!res.ok) throw new Error('Failed to fetch tour requests');
        const json = await res.json();
        setData(json.bookings || []);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    const confirm = window.confirm(`Are you sure you want to delete the tour request for ${name}?`);
    if (!confirm) return;

    try {
      const res = await fetch(`/api/book-tour/${id}`, {
        method: 'DELETE',
        credentials: 'include', // Send admin cookies if needed
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`Error: ${err.error || 'Failed to delete'}`);
        return;
      }

      // Optimistically remove from UI
      setData((prev) => prev.filter((item) => item._id !== id));
      alert('Tour request deleted successfully.');
    } catch (error) {
      alert('Something went wrong while deleting.');
      console.error(error);
    }
  };


  const filteredData =
    selectedTab === 'All Requests'
      ? data
      : data.filter((d) => d.status === selectedTab);

  return (
    <div className="p-6 mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-[#2d386a]">Tour Requests</h2>
          <p className="text-sm text-gray-500">
            Efficiently manage and track all incoming tour inquiries.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={clsx(
              'px-2 py-1 rounded-md border font-medium text-sm',
              selectedTab === tab
                ? 'bg-[#2d386a] text-white border-[#2d386a]'
                : 'text-gray-700 border-gray-300 hover:bg-gray-100'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-x-auto h-auto">
        <div className="px-4 py-3 border-b">
          <h4 className="text-base font-semibold text-gray-800">Tour Request Details</h4>
          <p className="text-xs text-gray-500">
            Manage and track all incoming tour requests for Alfa Business Center.
          </p>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-gray-500">Loading tour requests...</div>
        ) : error ? (
          <div className="p-6 text-red-500 text-sm">Error: {error}</div>
        ) : filteredData.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No tour requests found.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-xs text-left text-gray-600 uppercase">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Client Name</th>
                <th className="p-3">Contact Info</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, i) => (
                <tr key={row._id} className="hover:bg-gray-50 text-sm text-gray-800">
                  <td className="p-3">TR{i + 1}</td>
                  <td className="p-3">{row.fullName}</td>
                  <td className="p-3">
                    <div>{row.email}</div>
                    <div className="text-xs text-gray-500">{row.phone || 'N/A'}</div>
                  </td>
                  <td className="p-3">{row.preferredDate}</td>
                  <td className="p-3">{row.preferredTime}</td>
                  <td className="p-3">
                    <span
                      className={clsx(
                        'px-2 py-1 rounded-full text-xs font-medium',
                        row.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      )}
                    >
                      {row.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <ActionMenu
                      onEdit={() => router.push(`/admin/tour/edit?id=${row._id}`)}
                      onDelete={() => handleDelete(row._id, row.fullName)}
                    />

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
