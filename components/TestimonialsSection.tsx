import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Michael Rodriguez',
    purchased: '2022 BMW 5 Series',
    quote: 'AutoElite made my car buying experience completely stress-free. The team was transparent about pricing and the vehicle history. I drove away in my dream car knowing I got a fair deal. Highly recommend!',
    rating: 5,
    initials: 'MR',
  },
  {
    id: 2,
    name: 'Sarah Thompson',
    purchased: '2021 Toyota RAV4',
    quote: 'I was nervous about buying a used car, but AutoElite put me at ease immediately. They provided a full Carfax report without me even asking. The financing process was quick and the rate was better than my bank offered.',
    rating: 5,
    initials: 'ST',
  },
  {
    id: 3,
    name: 'James Wilson',
    purchased: '2020 Ford F-150',
    quote: 'Third truck I\'ve bought from AutoElite and they keep getting better. The online inventory is accurate, the test drive was no-pressure, and the trade-in offer for my old truck was very fair. I\'ll be back for sure.',
    rating: 5,
    initials: 'JW',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Don&apos;t just take our word for it — hear from the hundreds of satisfied customers who found their perfect vehicle at AutoElite Motors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>

              {/* Customer */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className="bg-slate-900 text-white text-sm font-bold rounded-full w-10 h-10 flex items-center justify-center shrink-0">
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
      </div>
    </section>
  );
}
