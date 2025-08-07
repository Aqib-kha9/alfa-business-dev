'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = ['/slider1-2.jpg', '/Slider3-1.jpg','/slider2-2.jpg'];
const headlines = [
  'Welcome to Alfaesol Business Center',
  'Explore Innovative Courses On Campus',
  'The Collaboration of a Talented Community',
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeImage, setFadeImage] = useState(true);
  const [fadeText, setFadeText] = useState(true);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Image + Text loop
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFadeImage(false);
      setFadeText(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          let nextIndex;

          if (direction === 'forward') {
            if (prevIndex === images.length - 1) {
              setDirection('backward');
              nextIndex = prevIndex - 1;
            } else {
              nextIndex = prevIndex + 1;
            }
          } else {
            if (prevIndex === 0) {
              setDirection('forward');
              nextIndex = prevIndex + 1;
            } else {
              nextIndex = prevIndex - 1;
            }
          }

          return nextIndex;
        });

        setFadeImage(true);
        setFadeText(true);
      }, 300);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [direction]);

  const handlePrev = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setFadeImage(false);
    setFadeText(false);
    setDirection('backward');

    setTimeout(() => {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      setFadeImage(true);
      setFadeText(true);
    }, 300);
  };

  const handleNext = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setFadeImage(false);
    setFadeText(false);
    setDirection('forward');

    setTimeout(() => {
      setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      setFadeImage(true);
      setFadeText(true);
    }, 300);
  };

  return (
    <section
      className="relative w-full h-[80vh] overflow-hidden group"
      onMouseEnter={() => intervalRef.current && clearInterval(intervalRef.current)}
      onMouseLeave={() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setFadeImage(false);
          setFadeText(false);
          setTimeout(() => {
            setCurrentIndex((prevIndex) => {
              let nextIndex;
              if (direction === 'forward') {
                if (prevIndex === images.length - 1) {
                  setDirection('backward');
                  nextIndex = prevIndex - 1;
                } else {
                  nextIndex = prevIndex + 1;
                }
              } else {
                if (prevIndex === 0) {
                  setDirection('forward');
                  nextIndex = prevIndex + 1;
                } else {
                  nextIndex = prevIndex - 1;
                }
              }
              return nextIndex;
            });
            setFadeImage(true);
            setFadeText(true);
          }, 300);
        }, 5000);
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out">
        <Image
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          className={`object-cover object-center transition-opacity duration-700 ease-in-out ${
            fadeImage ? 'opacity-100' : 'opacity-0'
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

        <h1
          key={currentIndex}
          className={`text-3xl sm:text-5xl font-extrabold mb-4 leading-tight drop-shadow-md transition-all duration-700 ease-in-out transform
            ${fadeText ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}
          `}
        >
          {headlines[currentIndex]}
        </h1>

        <p className="text-md sm:text-lg text-gray-200 mb-8">
          At our coworking space center, we make emphasis on comfy conditions for creative minds that form groups of talented people.
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
