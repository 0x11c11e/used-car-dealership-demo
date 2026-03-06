'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Michael Rodriguez',
    purchased: '2022 BMW 5 Series',
    quote: 'AutoElite made my car buying experience completely stress-free. The team was transparent about pricing and the vehicle history. I drove away in my dream car knowing I got a fair deal. Highly recommend!',
    rating: 5,
    initials: 'MR',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 2,
    name: 'Sarah Thompson',
    purchased: '2021 Toyota RAV4',
    quote: 'I was nervous about buying a used car, but AutoElite put me at ease immediately. They provided a full Carfax report without me even asking. The financing process was quick and the rate was better than my bank offered.',
    rating: 5,
    initials: 'ST',
    color: 'from-blue-400 to-violet-500',
  },
  {
    id: 3,
    name: 'James Wilson',
    purchased: '2020 Ford F-150',
    quote: "Third truck I've bought from AutoElite and they keep getting better. The online inventory is accurate, the test drive was no-pressure, and the trade-in offer for my old truck was very fair. I'll be back for sure.",
    rating: 5,
    initials: 'JW',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    id: 4,
    name: 'Linda Park',
    purchased: '2021 Honda Accord',
    quote: 'The team at AutoElite went above and beyond to find the right car for my budget. No pushy sales tactics, just genuine help. I left feeling great about my purchase!',
    rating: 5,
    initials: 'LP',
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 5,
    name: 'David Kim',
    purchased: '2022 Tesla Model 3',
    quote: 'Fantastic experience from start to finish. The website made it easy to browse inventory, and when I arrived the car was exactly as described. Financing was a breeze.',
    rating: 5,
    initials: 'DK',
    color: 'from-cyan-400 to-blue-500',
  },
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section
      className="py-20 bg-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900">What Our Customers Say</h2>
          <div className="w-16 h-1 bg-gold-gradient rounded-full mx-auto mt-4 mb-5" />
          {/* Rating summary */}
          <div className="inline-flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-2xl px-6 py-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-gray-900 text-lg">4.9 / 5.0</span>
            <span className="text-gray-500 text-sm">based on 800+ verified reviews</span>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, idx) => (
            <div
              key={t.id}
              className={`relative bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-card-hover transition-all duration-300 overflow-hidden ${
                activeIndex % 3 === idx ? 'border-amber-200 shadow-card-hover' : ''
              }`}
            >
              {/* Amber top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />

              {/* Stars */}
              <div className="flex gap-1 mb-4 mt-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>

              {/* Customer */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div
                  className={`bg-gradient-to-br ${t.color} text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-amber-500 text-xs">{t.purchased}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots + CTA */}
        <div className="flex flex-col items-center mt-10 gap-6">
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-6 h-2.5 bg-amber-500' : 'w-2.5 h-2.5 bg-gray-200 hover:bg-amber-300'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold text-sm border-b-2 border-amber-300 hover:border-amber-500 pb-0.5 transition-colors"
          >
            Read More Reviews on Google
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

