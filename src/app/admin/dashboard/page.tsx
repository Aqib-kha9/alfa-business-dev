'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 

type Stat = {
  label: string;
  value: number;
};

export default function AdminDashboardPage() {
  const router = useRouter(); 
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch('/api/subscribe/stats');
        const data = await res.json();
        setSubscriberCount(data.total);
      } catch (error) {
        console.error('Failed to load subscriber count', error);
      }
    };

    fetchSubscribers();
  }, []);

  const stats: Stat[] = [
    { label: 'Employees', value: 7 },
    { label: 'Tenants', value: 14 },
    { label: 'Visitors', value: 58 },
    { label: 'Units', value: 36 },
  ];

  if (subscriberCount !== null) {
    stats.push({ label: 'Subscribers', value: subscriberCount });
  }

  const handleClick = (label: string) => {
    if (label === 'Subscribers') {
      router.push('/admin/subscriber'); 
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-md transition"
          onClick={() => handleClick(stat.label)}
        >
          <h3 className="text-sm text-gray-600">{stat.label}</h3>
          <p className="text-2xl font-bold text-[#2d386a]">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
