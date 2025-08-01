'use client';

import { useEffect, useState } from "react";
import FeatureCard from "../reusable/FeatureCard";
import { toast } from "sonner";

type Feature = {
  image: string;
  title: string;
  desc: string;
};

type AmenityAPIResponse = {
  image: string[];
  amenitiesName: string;
  description: string;
};

interface WhyChooseSectionProps {
  heading?: string;
  subheading?: string;
  maxVisible?: number; // Optional limit
}

export default function WhyChooseSection({
  heading = "Why Choose Alfa Business Center?",
  subheading,
  maxVisible,
}: WhyChooseSectionProps) {
  const [amenities, setAmenities] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await fetch('/api/amenities');
        if (!res.ok) throw new Error('Failed to fetch amenities');

        const data: AmenityAPIResponse[] = await res.json();

        const formatted: Feature[] = data.map((item) => ({
          image: item.image?.[0] || '',
          title: item.amenitiesName,
          desc: item.description,
        }));

        setAmenities(formatted);
      } catch {
        toast.error('Failed to fetch amenities');
      } finally {
        setLoading(false);
      }
    };

    fetchAmenities();
  }, []);

  const visibleFeatures = maxVisible ? amenities.slice(0, maxVisible) : amenities;

  return (
    <section className="py-16">
      <div className="mx-auto px-4 text-center max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{heading}</h2>
        {subheading && (
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">{subheading}</p>
        )}

        {loading ? (
          <p className="text-gray-500">Loading amenities...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                image={feature.image}
                title={feature.title}
                desc={feature.desc}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
