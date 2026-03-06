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
    color: 'border-emerald-500',
    bg: 'bg-emerald-50',
    badge: 'bg-emerald-100 text-emerald-700',
    dot: 'bg-emerald-500',
    step: 1,
  },
  {
    label: 'Good',
    range: '680 – 719',
    apr: '5% – 7%',
    color: 'border-blue-500',
    bg: 'bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
    dot: 'bg-blue-500',
    step: 2,
  },
  {
    label: 'Fair',
    range: '620 – 679',
    apr: '7% – 12%',
    color: 'border-amber-500',
    bg: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-700',
    dot: 'bg-amber-500',
    step: 3,
  },
  {
    label: 'Poor',
    range: 'Below 620',
    apr: '12% – 18%',
    color: 'border-red-400',
    bg: 'bg-red-50',
    badge: 'bg-red-100 text-red-700',
    dot: 'bg-red-500',
    step: 4,
  },
];

const howItWorks = [
  { step: '01', title: 'Fill Out Application', desc: 'Complete our quick online form. Takes less than 5 minutes and has no impact on your credit score.' },
  { step: '02', title: 'Get Matched', desc: 'Our team matches you with the best lender from our network of 20+ financial partners.' },
  { step: '03', title: 'Review Offer', desc: 'Receive your personalized rate and terms. Compare multiple offers with no obligation.' },
  { step: '04', title: 'Drive Away Happy', desc: 'Finalize the paperwork in-store and drive home in your new vehicle the same day.' },
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
    a: "Absolutely! Getting pre-approved is a great way to know your budget before you shop. Fill out our online application and our finance team will contact you with your pre-approval amount and rate.",
  },
  {
    q: 'Do you offer refinancing for existing auto loans?',
    a: "Yes, we can often help customers refinance their current auto loan at a better rate. Contact our finance department to see if refinancing could save you money.",
  },
  {
    q: "What documents do I need to apply for financing?",
    a: "You'll typically need a valid driver's license, proof of income (pay stubs or tax returns), proof of residence (utility bill or bank statement), and proof of insurance. Our team will guide you through the exact requirements.",
  },
];

export default function FinancingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-navy-gradient pt-24 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.4) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Flexible Financing
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">
            Drive Today, Pay Your Way
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Competitive rates, fast approvals, and financing options for every credit situation.
          </p>
          {/* Animated stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { value: '20+', label: 'Lender Partners' },
              { value: '30 min', label: 'Avg. Approval Time' },
              { value: '0%', label: 'Application Fee' },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl px-6 py-4 text-center">
                <p className="text-gradient font-bold text-2xl font-display">{s.value}</p>
                <p className="text-gray-400 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Calculator */}
        <div className="max-w-3xl mx-auto mb-16">
          <FinancingCalculator />
        </div>

        {/* Credit Tiers — timeline style */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-3">Credit Tiers</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900">Financing for Every Credit Score</h2>
            <p className="text-gray-500 mt-2">Estimated APR ranges based on credit tier</p>
          </div>
          {/* Timeline on desktop */}
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gray-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {creditTiers.map((tier) => (
                <div key={tier.label} className={`relative card-hover ${tier.bg} border-t-4 ${tier.color} rounded-2xl p-6 shadow-card text-center`}>
                  <div className={`hidden md:flex absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 ${tier.dot} rounded-full border-4 border-white items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{tier.step}</span>
                  </div>
                  <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 mt-2 ${tier.badge}`}>
                    {tier.label} Credit
                  </span>
                  <p className="text-gray-600 text-xs mb-1">Credit Score</p>
                  <p className="text-gray-900 font-bold text-lg mb-3">{tier.range}</p>
                  <p className="text-gray-600 text-xs mb-1">Typical APR</p>
                  <p className="text-3xl font-bold font-display text-gray-900">{tier.apr}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-10 left-[13%] right-[13%] h-0.5 bg-dashed bg-amber-200" style={{ background: 'repeating-linear-gradient(90deg, #fbbf24 0, #fbbf24 8px, transparent 8px, transparent 16px)' }} />
            {howItWorks.map((step, i) => (
              <div key={i} className="card-hover bg-white rounded-2xl p-6 shadow-card text-center relative z-10">
                <div className="bg-gold-gradient w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                  <span className="text-white font-bold text-xl font-display">{step.step}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="text-center mb-8">
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-3">FAQs</p>
            <h2 className="text-3xl font-bold font-display text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-card overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
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
                  <div className="px-5 pb-4 border-t border-gray-100 pt-3">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Apply Now CTA — full width amber gradient */}
        <div className="bg-gold-gradient rounded-2xl p-8 md:p-12 text-center shadow-glow-lg">
          <CheckCircle2 className="h-12 w-12 text-white mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-3">
            Ready to Get Pre-Approved?
          </h2>
          <p className="text-amber-100 mb-8 max-w-lg mx-auto text-lg">
            Fill out our simple application and get a decision in minutes. No commitment required.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-amber-600 hover:bg-amber-50 font-bold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Apply Now — It&apos;s Free
          </Link>
        </div>
      </div>
    </div>
  );
}
