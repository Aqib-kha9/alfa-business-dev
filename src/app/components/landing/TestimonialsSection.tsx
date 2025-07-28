'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TestimonialCard from '../reusable/TestimonialCard';

const rawTestimonials = [
  {
    quote:
      'Alfa Business Center has transformed the way my team works. The flexible plans and vibrant community are exactly what we needed to scale our startup.',
    name: 'Aisha Sharma',
    title: 'CEO, Innovate Solutions',
    avatar: '/woman1.avif',
    companyLogo: '/clogo1.jpg',
  },
  {
    quote:
      'Alfa Business Center has transformed the way my team works. The flexible plans and vibrant community are exactly what we needed to scale our startup.',
    name: 'Aisha Sharma',
    title: 'CEO, Innovate Solutions',
    avatar: '/woman1.avif',
    companyLogo: '/clogo1.jpg',
  },
  {
    quote:
      'Alfa Business Center has transformed the way my team works. The flexible plans and vibrant community are exactly what we needed to scale our startup.',
    name: 'Aisha Sharma',
    title: 'CEO, Innovate Solutions',
    avatar: '/woman1.avif',
    companyLogo: '/clogo1.jpg',
  },
  {
    quote:
      'Alfa Business Center has transformed the way my team works. The flexible plans and vibrant community are exactly what we needed to scale our startup.',
    name: 'Aisha Sharma',
    title: 'CEO, Innovate Solutions',
    avatar: '/woman1.avif',
    companyLogo: '/clogo1.jpg',
  },
  {
    quote:
      "The prime location and amenities here are unmatched in Mumbai. It's truly a productive and inspiring environment for freelancers and small businesses.",
    name: 'Rajesh Kumar',
    title: 'Lead Developer, TechGenius',
    avatar: '/Man1.jpg',
    companyLogo: '/clogo2.png',
  },
  {
    quote:
      'From the high-speed internet to the friendly staff, every detail at Alfa is designed for success. Highly recommend for anyone seeking a premium coworking experience.',
    name: 'Priya Singh',
    title: 'Marketing Consultant, BrandFlow Agency',
    avatar: '/woman2.jpeg',
    companyLogo: '/clogo3.webp',
  },
];

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1); // start at first real card
  const cardWidth = 320 + 16;

  // Add clones at beginning and end
  const testimonials = [
    rawTestimonials[rawTestimonials.length - 1], // clone last
    ...rawTestimonials,
    rawTestimonials[0], // clone first
  ];

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

  // Seamless looping logic
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleTransition = () => {
      // Clone before first → jump to real last
      if (currentIndex === 0) {
        setCurrentIndex(rawTestimonials.length);
        scrollToIndex(rawTestimonials.length, false);
      }

      // Clone after last → jump to real first
      if (currentIndex === rawTestimonials.length + 1) {
        setCurrentIndex(1);
        scrollToIndex(1, false);
      }
    };

    const timeout = setTimeout(handleTransition, 600);
    return () => clearTimeout(timeout);
  }, [currentIndex]);

  // Auto scroll
  useEffect(() => {
    const auto = setInterval(() => {
      handleScroll('next');
    }, 5000);
    return () => clearInterval(auto);
  }, [currentIndex]);

  useEffect(() => {
    scrollToIndex(currentIndex, false);
  }, []);

  return (
    <section className=" bg-white relative">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
          What Our Members Say
        </h2>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory justify-start sm:justify-center gap-3 px-2"
          >
            {testimonials.map((item, index) => (
              <div key={index} className="snap-center">
                <TestimonialCard {...item} />
              </div>
            ))}
          </div>


          {/* Arrows
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
          </button> */}
        </div>
      </div>
    </section>
  );
}
