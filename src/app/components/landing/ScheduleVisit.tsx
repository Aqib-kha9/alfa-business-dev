"use client";
import { CalendarIcon, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

import Image from "next/image";

export default function ScheduleVisit() {
  return (
    <section className="bg-white py-8 px-4 md:px-6 lg:px-8 min-h-[80vh]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
        {/* Left Column */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            Schedule Your Visit
          </h2>
          <p className="text-gray-600 text-base leading-snug">
            Want to explore our coworking space before joining? Fill out the
            form and our manager will contact you shortly.
          </p>

          <div className="space-y-1 text-sm">
            <a
              href="https://wa.me/919820190836"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-700 hover:text-[#2d386a] transition"
            >
              <SiWhatsapp className="text-[#2d386a]" size={18} />
              <span>+91 98201 90836</span>
            </a>

            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="text-[#2d386a]" size={18} />
              <span>info@alfabusiness.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="text-[#2d386a]" size={18} />
              <span>Bandra Kurla Complex, Mumbai</span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden mt-3">
            <Image
              src="/office_tour.jpg"
              alt="Office Tour"
              width={700}
              height={350}
              className="rounded-lg w-full h-[260px] object-cover"
            />
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-gray-50 p-5 rounded-xl shadow-sm border text-sm">
          <form className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name"
                className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
              />
            </div>

            <input
              type="tel"
              placeholder="Phone"
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input
                  type="date"
                  className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
                />
              </div>
              <input
                type="time"
                className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
              />
            </div>

            <input
              type="text"
              placeholder="How Did You Hear About Us"
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a]"
            />

            <textarea
              rows={3}
              placeholder="Message"
              className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-[#2d386a] resize-none"
            ></textarea>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="mt-1" />
              <p className="text-xs text-gray-600 leading-tight">
                I agree that my submitted data is being collected and stored.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2d386a] hover:bg-[#1e2952] text-white font-medium py-2.5 rounded-md transition text-sm"
            >
              Schedule Visit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
