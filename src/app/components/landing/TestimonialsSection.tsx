'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from '../reusable/TestimonialCard';
import TestimonialSkeleton from '../skeleton/TestimonialSkeleton';


type Testimonial = {
  message: string;
  name: string;
  title: string;
  image: string;
  status: string;
  companyLogo: string;
};

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const cardWidth = 320 + 16;

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials');
        const data = await res.json();
        // if status approved
        setTestimonialsData(data.filter((t: Testimonial) => t.status === 'approved'));
      } catch (error) {
        console.error('Failed to fetch testimonials', error);
      }
    };

    fetchTestimonials();
  }, []);

  const scrollToIndex = (index: number, smooth = true) => {
    const container = scrollRef.current;
    if (!container) return;

    const containerWidth = container.offsetWidth;
    const scrollX = cardWidth * index - (containerWidth - cardWidth) / 2;

    container.scrollTo({
      left: scrollX,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  const handleScroll = (dir: 'next' | 'prev') => {
    const nextIndex = dir === 'next' ? currentIndex + 1 : currentIndex - 1;
    setCurrentIndex(nextIndex);
    scrollToIndex(nextIndex);
  };

  const extended = testimonialsData.length > 0
    ? [
      testimonialsData[testimonialsData.length - 1], // clone last
      ...testimonialsData,
      testimonialsData[0], // clone first
    ]
    : [];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScrollEnd = () => {
      if (currentIndex === 0) {
        setTimeout(() => {
          setCurrentIndex(testimonialsData.length);
          scrollToIndex(testimonialsData.length, false);
        }, 50);
      }

      if (currentIndex === testimonialsData.length + 1) {
        setTimeout(() => {
          setCurrentIndex(1);
          scrollToIndex(1, false);
        }, 50);
      }
    };

    const timeout = setTimeout(onScrollEnd, 500);
    return () => clearTimeout(timeout);
  }, [currentIndex, testimonialsData]);



  useEffect(() => {
    const auto = setInterval(() => {
      handleScroll('next');
    }, 5000);
    return () => clearInterval(auto);
  }, [currentIndex]);

  useEffect(() => {
    scrollToIndex(currentIndex, false);
  }, [testimonialsData]);

  return (
    <section className="bg-white relative">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
          What Our Members Say
        </h2>

        <div className="relative">
          
            <div
              ref={scrollRef}
              className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory justify-start sm:justify-center gap-3 px-2"
            >
              {testimonialsData.length === 0
                ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="snap-center">
                    <TestimonialSkeleton />
                  </div>
                ))
                : extended.map((item, index) => (
                  <div key={index} className="snap-center">
                    <TestimonialCard {...item} />
                  </div>
                ))}
            </div>

            {/* Optional: Navigation Arrows */}

            <button
              onClick={() => handleScroll('prev')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full border z-20"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleScroll('next')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full border z-20"
            >
              <ChevronRight size={20} />
            </button>

          </div>
        </div>
    </section>
  );
}
