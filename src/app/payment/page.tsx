'use client';
import React from 'react';

export default function PaymentPage() {
    return (
        <div className="min-h-screen bg-white px-4 py-10 md:px-16">
            {/* Header Section */}
            <div className="border border-gray-300 rounded-2xl text-center py-8 px-4 mb-10 shadow-sm">
                <h1 className="text-3xl md:text-4xl font-bold text-[#2d386a] mb-4">
                    Seamless Online Payments
                </h1>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Experience quick and secure transactions for all your coworking services.
                    Click below to proceed to our trusted payment partner.
                </p>
                <button className="bg-[#2d386a] hover:bg-[#1f2a4e] text-white px-6 py-2 rounded-lg font-semibold transition duration-200">
                    Proceed to Payment
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* QR Code Section */}
                <div className="border border-gray-300 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-xl font-semibold text-[#2d386a] mb-4">Pay with QR Code</h2>
                    <div className="bg-gray-100 p-4 rounded-xl flex justify-center items-center mb-4">
                        <img src="/qr-code.png" alt="QR Code" className="w-50 h-50 object-contain" />
                    </div>
                    <p className="text-sm text-gray-600 text-center mb-4">
                        Scan the QR code with your preferred UPI app or banking application
                        for instant payment directly from your mobile device.
                    </p>
                    <img
                        src="/qrcode.webp"
                        alt="Scan Illustration"
                        className="mx-auto w-full h-auto rounded-xl shadow-md mt-2"
                    />

                </div>

                {/* Payment Help Section */}
                <div className="border border-gray-300 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold text-[#2d386a] mb-4">Need Payment Help?</h2>
                    <p className="text-m text-gray-600 mb-4">
                        Our dedicated support team is here to assist you with any
                        payment-related queries or issues.
                    </p>
                    <div className="space-y-2 text-m text-gray-700 mb-6">
                        <p className="flex items-center gap-2">+91 98765 43210</p>
                        <p className="flex items-center gap-2">payments@alfabusiness.com</p>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block mb-1 font-medium text-sm">Your Name</label>
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-sm">Your Email</label>
                            <input
                                type="email"
                                placeholder="your@example.com"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-sm">Subject</label>
                            <input
                                type="text"
                                placeholder="e.g., Payment Error"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-sm">Your Message</label>
                            <textarea
                                placeholder="Describe your payment issue or question..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 text-sm focus:outline-none focus:ring-1 focus:ring-[#2d386a]"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#2d386a] hover:bg-[#1f2a4e] text-white py-2 rounded-lg font-semibold transition duration-200"
                        >
                            Send Inquiry
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
