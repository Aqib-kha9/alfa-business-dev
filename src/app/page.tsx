export const metadata = {
  title: 'Alfa Business Center – Best Coworking Space in Mumbai',
  description:
    'Welcome to Alfa Business Center – A premium coworking space in Mumbai for startups, freelancers, and enterprises.',
};

import HeroSection from "@/app/components/landing/HeroSection";
import WhyChooseSection from "@/app/components/landing/WhyChooseSection";
import ScheduleVisit from "./components/landing/ScheduleVisit";
import TestimonialsSection from "@/app/components/landing/TestimonialsSection";
import PricingSection from "@/app/components/landing/PricingSection";
import LimitedOfferBanner from "./components/landing/LTOBanner";

const homeFeatures = [
  {
    image: '/wifi.jpeg',
    title: 'High-Speed WiFi',
    desc: 'Blazing-fast internet for seamless work.',
  },
  {
    image: '/snack.jpg',
    title: 'Complimentary Snacks',
    desc: 'Free coffee, tea & snacks daily.',
  },
  {
    image: '/conference.jpg',
    title: 'Modern Conference Rooms',
    desc: 'Bookable rooms with all essentials.',
  },
  {
    image: '/Biometric.webp',
    title: 'Biometric Access',
    desc: 'Secure entry with biometrics.',
  },
  {
    image: '/Ample.jpg',
    title: 'Ample Parking',
    desc: 'Easy parking for you and guests.',
  },
  {
    image: '/Prime.jpeg',
    title: 'Prime Location',
    desc: 'In the heart of Mumbai.',
  },
    {
    image: '/Ample.jpg',
    title: 'Ample Parking',
    desc: 'Easy parking for you and guests.',
  },
  {
    image: '/Prime.jpeg',
    title: 'Prime Location',
    desc: 'In the heart of Mumbai.',
  },
    {
    image: '/Ample.jpg',
    title: 'Ample Parking',
    desc: 'Easy parking for you and guests.',
  },
  {
    image: '/Prime.jpeg',
    title: 'Prime Location',
    desc: 'In the heart of Mumbai.',
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col gap-10">
      <HeroSection />
      <WhyChooseSection
        heading="Why Choose Alfa Business Center?"
        subheading="Discover the top reasons professionals prefer working with us."
        // features={homeFeatures}
        maxVisible={6}
      />
      <PricingSection />
      <TestimonialsSection />
      <LimitedOfferBanner />
      <ScheduleVisit />
    </main>
  );
}
