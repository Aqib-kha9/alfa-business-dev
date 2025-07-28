import FeatureCard from "@/app/components/reusable/FeatureCard";
import BookTourCTA from "../components/reusable/BookTourCTA";

const amenities = [
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
        image: '/extra.jpg',
        title: 'Extra Benefit',
        desc: 'Hidden if more than 6.',
    },
];

export default function Amenities() {
    return (
        <section className="pt-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
                {/* Copied heading styles */}
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-[#1e2952]">
                    Explore Our World-Class Amenities
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                    At Alfa Business Center, we provide everything you need for a productive and comfortable work environment. Discover the extensive range of facilities designed to enhance your coworking experience.        </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {amenities.map((item, index) => (
                        <FeatureCard key={index} {...item} />
                    ))}
                </div>
                
            </div>
            <BookTourCTA/>
        </section>
    );
}
