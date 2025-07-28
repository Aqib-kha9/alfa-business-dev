'use client';

import { detailedPlans } from '@/app/data/plansData';
import PlanCard from '@/app/components/reusable/PlanCard';

export default function PopularPlans() {
    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
                    Our Popular Plans
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {detailedPlans.slice(0, 3).map((plan, index) => (
                        <PlanCard
                            key={index}
                            slug={plan.slug}
                            image={plan.image}
                            title={plan.title}
                            price={`₹${plan.monthlyPrice}`}
                            duration="/ Month"
                            features={plan.features}
                        />

                    ))}
                </div>
            </div>
        </section>
    );
}
