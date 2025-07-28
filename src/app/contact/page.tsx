import { Mail, MapPin, Phone } from "lucide-react";
import ContactBanner from "../components/reusable/ContactBanner";

export default function ContactUsPage() {
  return (
    <>
      <ContactBanner />

      <section className="pt-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 mb-16">
          <div className="border border-gray-300 rounded-xl shadow-sm p-6 sm:p-8 md:p-10 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left: Contact Form */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#2d386a] mb-6">Send Us a Message</h2>
                <form className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-black">Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d386a] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black">Email</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d386a] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Enter your question or feedback"
                      className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d386a] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#2d386a] text-white px-6 py-2 rounded-md hover:bg-[#1f2a4e] transition"
                  >
                    Send Message <span className="text-xl">→</span>
                  </button>
                </form>
              </div>

              {/* Right: Map & Info */}
              <div className="space-y-6">
                <div className="rounded-lg overflow-hidden h-64 border border-gray-300">
                  <iframe
                    src="https://maps.google.com/maps?q=Alfa%20Business%20Center,%20Mumbai&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen
                  ></iframe>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-black mb-3">Our Location & Contact Info</h3>
                  <ul className="space-y-4 text-sm text-black">
                    <li className="flex items-start gap-3">
                      <MapPin className="text-[#2d386a] w-5 h-5 mt-0.5" />
                      <span>
                        Alfa Business Center, Unit 701, Pinnacle Towers, Bandra Kurla Complex,
                        Mumbai, Maharashtra 400051, India
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone className="text-[#2d386a] w-5 h-5" />
                      +91 22 6789 0123
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail className="text-[#2d386a] w-5 h-5" />
                      contact@alfabusiness.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
