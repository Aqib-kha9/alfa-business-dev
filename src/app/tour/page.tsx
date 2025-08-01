'use client';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';
import { bookTourSchema } from '@/app/lib/schemas/bookTourSchema';

export default function VisitPage() {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        number: '',
        preferredDate: '',
        preferredTime: '',
        message: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setSuccessMsg('');
        setLoading(true);

        const validation = bookTourSchema.safeParse(form);
        type FieldErrorMap = {
            [K in 'name' | 'email' | 'date' | 'time' | 'message']?: string[];
        };

        const flatErrors = validation?.error?.flatten().fieldErrors as FieldErrorMap;


        try {
            const res = await fetch('/api/book-tour', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.error) setErrors({ form: 'Something went wrong. Please try again.' });
                setLoading(false);
                return;
            }

            setSuccessMsg('Tour booking submitted successfully!');
            setForm({
                fullName: '',
                email: '',
                number: '',
                preferredDate: '',
                preferredTime: '',
                message: '',
            });
        } catch (error) {
            setErrors({ form: 'Failed to submit. Please try again later.' });
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-white px-4 md:px-12 py-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#2d386a] mb-10 leading-tight sm:leading-snug">
                    <span className="inline">
                        Schedule Your Exclusive Visit to{' '}
                        <span className="inline-block bg-[#2d386a] text-white px-4 rounded-xl">
                            Alfa Business Center
                        </span>
                    </span>
                </h1>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-3 text-black">Book Your Tour</h2>
                        <p className="mb-5 text-gray-600">
                            Fill out the form below to schedule a visit to our coworking space. We look forward to meeting you!
                        </p>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-1 font-medium text-black">Full Name</label>
                                <input
                                    name="fullName"
                                    type="text"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                />
                                {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-black">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your@example.com"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                />
                                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-black">Phone Number</label>
                                <input
                                    name="number"
                                    type="tel"
                                    value={form.number}
                                    onChange={handleChange}
                                    placeholder="+91 12345 67890"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                />
                                {errors.number && <p className="text-sm text-red-600">{errors.number}</p>}  
                                </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-1 font-medium text-black">Preferred Date</label>
                                    <input
                                        name="preferredDate"
                                        type="date"
                                        value={form.preferredDate}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                    />
                                    {errors.preferredDate && <p className="text-sm text-red-600">{errors.preferredDate}</p>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-black">Preferred Time</label>
                                    <input
                                        name="preferredTime"
                                        type="time"
                                        value={form.preferredTime}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                    />
                                    {errors.preferredTime && <p className="text-sm text-red-600">{errors.preferredTime}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-black">Your Message (Optional)</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your needs, preferred time, or any specific questions..."
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                                />
                            </div>

                            {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}
                            {successMsg && <p className="text-sm text-green-600">{successMsg}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#2d386a] hover:bg-[#1f2a4e] text-white py-2 rounded-lg font-semibold transition duration-200"
                            >
                                {loading ? 'Submitting...' : 'Submit Booking Request'}
                            </button>
                        </form>
                    </div>

                    {/* Location & Contact - Unchanged */}
                    {/* ...Your existing contact section remains untouched */}


                    {/* Location & Contact */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h2 className="text-2xl font-bold mb-3 text-black">Our Location & Contact</h2>

                        <p className="mb-5 text-gray-600">
                            We are conveniently located in the heart of Mumbai. Feel free to reach out to us through any of the channels below.
                        </p>

                        <div className="mb-5">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.651298505902!2d72.8693834751927!3d19.079030952256443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c630519841ff%3A0x9f3f70cc73e7c4f!2sBandra%20Kurla%20Complex%2C%20Mumbai%2C%20Maharashtra%20400051!5e0!3m2!1sen!2sin!4v1721487992000!5m2!1sen!2sin"
                                width="100%"
                                height="250"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full rounded-lg"
                            ></iframe>
                            <p className="text-sm text-center mt-2 text-gray-500">Interactive Map View</p>
                        </div>

                        <div className="space-y-4 text-sm text-gray-700">
                            <p className="flex items-start gap-2">
                                <MapPin className="text-[#2d386a] w-5 h-5 mt-0.5" />
                                <span>Unit 101, Business Hub Tower, Bandra Kurla Complex, Mumbai, Maharashtra 400051, India</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <Phone className="text-[#2d386a] w-5 h-5" />
                                <span>+91 22 1234 5678</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <Mail className="text-[#2d386a] w-5 h-5" />
                                <span>info@alfabusinesscenter.com</span>
                            </p>
                            <a
                                href="https://wa.me/911234567890"
                                className="text-[#2d386a] hover:underline flex items-center gap-2"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Chat on WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
