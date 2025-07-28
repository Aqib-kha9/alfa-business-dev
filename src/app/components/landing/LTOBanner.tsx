'use client';

import { Clock3, Sparkles } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function LimitedOfferBanner() {
  const router = useRouter();

  return (
    <div className="px-4 md:px-8 mt-16">
      <div className="bg-[#2d386a] text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Offer Text */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <Sparkles className="text-white" size={28} />
          <p className="text-lg md:text-xl font-semibold">
            Limited Time Offer: Get{" "}
            <span className="underline underline-offset-2">20% off</span> your
            first 3 months on any annual plan!
          </p>
        </div>

        {/* Middle: Countdown Timer */}
        <div className="flex items-center gap-2 text-lg md:text-2xl font-bold text-white">
          <Clock3 size={24} />
          <span>03:24:18</span>
        </div>

        {/* Right: CTA Button */}
        <button
          onClick={() => router.push('/payment')}
          className="bg-white cursor-pointer text-[#2d386a] font-semibold text-sm md:text-base px-5 py-3 rounded-xl hover:bg-gray-100 transition-all"
        >
          Claim Your Discount Now!
        </button>
      </div>
    </div>
  );
}
