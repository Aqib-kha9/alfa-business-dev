'use client';

import PlanCard from '@/app/components/reusable/PlanCard';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Plan = {
  slug: string;
  images: string;
  title: string;
  popular: boolean;
  monthlyPrice: number;
  features: string[];
};

export default function PopularPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch('/api/plans');
        if (!res.ok) throw new Error('Failed to fetch plans');
        const data = await res.json();
        setPlans(data);
      } catch (error) {
        toast.error('Failed to fetch plans');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
          Our Popular Plans
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading plans...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.filter((plan) => plan.popular).map((plan) => (
              <PlanCard
                key={plan.slug}
                slug={plan.slug}
                image={plan.images[0]}
                title={plan.title}
                price={`₹${plan.monthlyPrice}`}
                duration="/ Month"
                features={plan.features}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
