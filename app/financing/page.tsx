'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import FinancingCalculator from '@/components/FinancingCalculator';

const creditTiers = [
  {
    label: 'Excellent',
    range: '720+',
    apr: '3% – 5%',
    color: 'border-green-500',
    bg: 'bg-green-50',
    badge: 'bg-green-100 text-green-700',
  },
  {
    label: 'Good',
    range: '680 – 719',
    apr: '5% – 7%',
    color: 'border-blue-500',
    bg: 'bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    label: 'Fair',
    range: '620 – 679',
    apr: '7% – 12%',
    color: 'border-amber-500',
    bg: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
  },
  {
    label: 'Poor',
    range: 'Below 620',
    apr: '12% – 18%',
    color: 'border-red-400',
    bg: 'bg-red-50',
    badge: 'bg-red-100 text-red-700',
  },
];

const faqs = [
  {
    q: 'What credit score do I need to get approved?',
    a: 'We work with buyers across the credit spectrum. While higher credit scores qualify for lower rates, our network of 20+ lenders allows us to find financing solutions for most customers, including those with challenged credit.',
  },
  {
    q: 'How long does the financing approval process take?',
    a: 'In most cases, we can get you a financing decision within 30 minutes of receiving your application. We know your time is valuable, so we work quickly to get you on the road.',
  },
  {
    q: 'Can I get pre-approved before choosing a vehicle?',
    a: 'Absolutely! Getting pre-approved is a great way to know your budget before you shop. Fill out our online application and our finance team will contact you with your pre-approval amount and rate.',
  },
  {
    q: 'Do you offer refinancing for existing auto loans?',
    a: 'Yes, we can often help customers refinance their current auto loan at a better rate. Contact our finance department to see if refinancing could save you money.',
  },
  {
    q: 'What documents do I need to apply for financing?',
    a: "You'll typically need a valid driver's license, proof of income (pay stubs or tax returns), proof of residence (utility bill or bank statement), and proof of insurance. Our team will guide you through the exact requirements.",
  },
];

export default function FinancingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-slate-900 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Flexible Financing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Drive Today, Pay Your Way
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Competitive rates, fast approvals, and financing options for every credit situation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Calculator */}
        <div className="max-w-3xl mx-auto mb-16">
          <FinancingCalculator />
        </div>

        {/* Credit Tiers */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Financing for Every Credit Score</h2>
            <p className="text-gray-500 mt-2">Estimated APR ranges based on credit tier</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {creditTiers.map((tier) => (
              <div
                key={tier.label}
                className={`${tier.bg} border-t-4 ${tier.color} rounded-xl p-5 shadow-sm`}
              >
                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${tier.badge}`}>
                  {tier.label} Credit
                </span>
                <p className="text-gray-600 text-sm mb-2">Credit Score</p>
                <p className="text-gray-900 font-semibold mb-3">{tier.range}</p>
                <p className="text-gray-600 text-sm mb-1">Typical APR</p>
                <p className="text-2xl font-bold text-gray-900">{tier.apr}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="h-5 w-5 text-amber-500 shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
          <CheckCircle2 className="h-12 w-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Get Pre-Approved?
          </h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Fill out our simple application and get a decision in minutes. No commitment required.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors"
          >
            Apply Now — It&apos;s Free
          </Link>
        </div>
      </div>
    </div>
  );
}
