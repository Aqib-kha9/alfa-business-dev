'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = ['/img1.jpeg', '/img2.avif', '/img3.jpg'];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

 useEffect(() => {
  intervalRef.current = setInterval(() => {
    setFade(false);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        if (direction === 'forward') {
          if (prevIndex === images.length - 1) {
            setDirection('backward');
            return prevIndex - 1;
          } else {
            return prevIndex + 1;
          }
        } else {
          if (prevIndex === 0) {
            setDirection('forward');
            return prevIndex + 1;
          } else {
            return prevIndex - 1;
          }
        }
      });
      setFade(true);
    }, 300);
  }, 5000);

  // ✅ Fixed cleanup function
  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
}, [direction]);


  // Manual Controls
  const handlePrev = () => {
  if (intervalRef.current) clearInterval(intervalRef.current);
  setFade(false);
  setDirection('backward');
  setTimeout(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1)); // wrap to last
    setFade(true);
  }, 300);
};

const handleNext = () => {
  if (intervalRef.current) clearInterval(intervalRef.current);
  setFade(false);
  setDirection('forward');
  setTimeout(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0)); // wrap to first
    setFade(true);
  }, 300);
};


  return (
    <section
      className="relative w-full h-[80vh] overflow-hidden group"
      onMouseEnter={() => intervalRef.current && clearInterval(intervalRef.current)}
      onMouseLeave={() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setFade(false);
          setTimeout(() => {
            setCurrentIndex((prevIndex) => {
              if (direction === 'forward') {
                if (prevIndex === images.length - 1) {
                  setDirection('backward');
                  return prevIndex - 1;
                } else {
                  return prevIndex + 1;
                }
              } else {
                if (prevIndex === 0) {
                  setDirection('forward');
                  return prevIndex + 1;
                } else {
                  return prevIndex - 1;
                }
              }
            });
            setFade(true);
          }, 300);
        }, 5000);
      }}
    >
      {/* Background Image with Fade */}
      <div className="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out">
        <Image
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          className={`object-cover object-center transition-opacity duration-700 ease-in-out ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition bg-[rgb(45,56,106)] text-white p-2 rounded-full shadow hover:bg-[rgb(35,45,90)]"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={handleNext}
        className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition bg-[rgb(45,56,106)] text-white p-2 rounded-full shadow hover:bg-[rgb(35,45,90)]"
      >
        <ChevronRight size={22} />
      </button>

      {/* Text Content */}
      <div className="relative z-30 text-white text-center px-4 py-20 sm:py-28 max-w-3xl mx-auto">
        <div className="mb-3 text-xs sm:text-sm bg-[rgb(45,56,106)]/80 text-white inline-block px-4 py-1.5 rounded-full font-semibold shadow-md">
          Limited Seats Available!
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight drop-shadow-md">
          Work Better. Grow Faster.
        </h1>
        <p className="text-md sm:text-lg text-gray-200 mb-8">
          Join Mumbai’s most flexible coworking space designed for productivity and collaboration.
        </p>
        <div className="flex sm:flex-row justify-center gap-4">
          <Link href="/tour">
            <button className="cursor-pointer bg-[rgb(45,56,106)] text-white px-6 py-3 rounded-md shadow hover:bg-[rgb(35,45,90)] transition text-sm font-medium">
              Book Free Tour
            </button>
          </Link>
          <Link href="/amenities">
            <button className="cursor-pointer bg-white text-black px-6 py-3 rounded-md shadow hover:bg-gray-200 transition text-sm font-medium">
              View Amenities
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
