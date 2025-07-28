import AboutStorySection from "@/app/components/AboutUsComponents/AboutStorySection";
import OurMissionSection from "../components/AboutUsComponents/OurMissionSection";
import WhyChooseSection from "../components/landing/WhyChooseSection";
import OurJourneySection from "../components/AboutUsComponents/OurJourneySection";
import TrustedBySection from "../components/AboutUsComponents/TrustedBySection";

const aboutFeatures = [
  {
    image: '/wifi.jpeg',
    title: 'Reliable Connectivity',
    desc: 'Stay connected with blazing-fast internet.',
  },
  {
    image: '/snack.jpg',
    title: 'Pantry & Refreshments',
    desc: 'Keep your energy up with free beverages.',
  },
  {
    image: '/conference.jpg',
    title: 'Collaboration Spaces',
    desc: 'Modern rooms for meetings and brainstorming.',
  },
  {
    image: '/Biometric.webp',
    title: 'Secure Biometric Entry',
    desc: 'Your safety is our top priority.',
  },
  {
    image: '/Ample.jpg',
    title: 'Parking Convenience',
    desc: 'No more parking hassles for you or clients.',
  },
  {
    image: '/Prime.jpeg',
    title: 'Strategic Location',
    desc: 'Located in the heart of business hubs.',
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white">
      <AboutStorySection />
      <OurMissionSection />
      <WhyChooseSection
        heading="What Sets Us Apart?"
        subheading="We’re more than a workspace — we’re your productivity partner."
        features={aboutFeatures}
        maxVisible={6}
      />
      <OurJourneySection />
      <TrustedBySection />
    </main>
  );
}
