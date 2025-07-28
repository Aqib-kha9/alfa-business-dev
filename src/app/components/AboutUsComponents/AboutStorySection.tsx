import React from "react";

export default function AboutStorySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Text Content */}
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Our Story: Pioneering Coworking Excellence
          </h2>
          <div className="text-gray-600 leading-relaxed text-base space-y-4">
            <p>
              From a bold vision to redefine and elevate the traditional workspace, Alfa Business Center was proudly founded in 2020.
              What began as a simple idea has since evolved into a mission-driven journey to create more than just office spaces —
              we set out to build a vibrant hub of innovation, connection, and opportunity.
            </p>
            <p>
              Our story is rooted in the belief that people do their best work when they’re surrounded by a dynamic, collaborative,
              and supportive environment. We understand that success isn’t achieved in isolation; it’s nurtured through meaningful relationships,
              access to the right resources.
            </p>
          </div>
        </div>

        {/* Right: Video Thumbnail */}
        <div className="flex-1">
          <div className="rounded-xl overflow-hidden shadow-sm">
            <video
              src="/cowroking.mp4"
              width={640}
              height={400}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-cover rounded-xl"
              poster="/about-video-thumbnail.png" // optional poster
            />
          </div>
        </div>
      </div>
    </section>
  );
}
