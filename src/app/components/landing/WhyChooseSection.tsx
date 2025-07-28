'use client';

import FeatureCard from "../reusable/FeatureCard";

type Feature = {
  image: string;
  title: string;
  desc: string;
};

interface WhyChooseSectionProps {
  heading?: string;
  subheading?: string;
  features: Feature[];
  maxVisible?: number; // Optional limit
}

export default function WhyChooseSection({
  heading = "Why Choose Alfa Business Center?",
  subheading,
  features,
  maxVisible,
}: WhyChooseSectionProps) {
  const visibleFeatures = maxVisible ? features.slice(0, maxVisible) : features;

  return (
    <section className="py-16">
      <div className="mx-auto px-4 text-center max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">{heading}</h2>
        {subheading && (
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">{subheading}</p>
        )}

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
      </div>
    </section>
  );
}
