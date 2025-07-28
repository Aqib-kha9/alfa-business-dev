'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: 'Can I cancel my booking anytime?',
    answer: 'Yes, cancellations are allowed up to 48 hours before the reserved date.',
  },
  {
    question: 'Are utilities (like internet, electricity) included?',
    answer: 'Yes, all utilities are included in the monthly/yearly plans.',
  },
  {
    question: 'Can I upgrade from Monthly to Yearly anytime?',
    answer: 'Yes, simply contact our support team and we\'ll help you upgrade.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="mt-30">
      <h2 className="text-2xl font-bold text-[#1e2952] mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4 text-left">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl bg-white shadow-sm transition-all duration-300 overflow-hidden"
          >
            <button
              onClick={() => toggle(idx)}
              className="flex items-center justify-between w-full px-5 py-4 text-left hover:bg-gray-50 focus:outline-none"
            >
              <span className="font-medium text-[#1e2952]">{faq.question}</span>
              {openIndex === idx ? (
                <ChevronUp className="w-5 h-5 text-[#1e2952]" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#1e2952]" />
              )}
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 text-sm text-gray-700 animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
