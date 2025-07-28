'use client';

type Feature = {
  image: string;
  title: string;
  desc: string;
};

export default function FeatureCard({ image, title, desc }: Feature) {
  return (
    <div className="text-black text-sm font-semibold hover:bg-blue-50 transition rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-base font-semibold mb-1">{title}</h3>
        <p className="text-sm text-black">{desc}</p>
      </div>
    </div>
  );
}
