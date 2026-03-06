import Link from 'next/link';
import { ChevronDown, Shield, CreditCard, RefreshCw, Award } from 'lucide-react';
import VehicleCard from '@/components/VehicleCard';
import TestimonialsSection from '@/components/TestimonialsSection';
import { inventory } from '@/lib/inventory';

const features = [
  {
    icon: Shield,
    title: 'Certified Inspections',
    description: 'Every vehicle undergoes a rigorous 150-point inspection by our certified technicians before it reaches our lot.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Financing',
    description: 'We work with over 20 lenders to find the best rate for your budget, regardless of your credit history.',
  },
  {
    icon: RefreshCw,
    title: '7-Day Return Policy',
    description: 'Not completely satisfied? Return your vehicle within 7 days for a full refund — no questions asked.',
  },
  {
    icon: Award,
    title: 'Free Carfax Reports',
    description: 'Full vehicle history transparency. We provide a complimentary Carfax report on every vehicle we sell.',
  },
];

export default function HomePage() {
  const featured = inventory.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-4">
            Austin&apos;s #1 Pre-Owned Dealership
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Find Your
            <br />
            <span className="text-amber-400">Perfect Ride</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Browse 500+ premium pre-owned vehicles. Transparent pricing, certified inspections, and flexible financing — all under one roof.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inventory"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg"
            >
              Browse Inventory
            </Link>
            <Link
              href="/financing"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-lg text-lg transition-colors backdrop-blur-sm"
            >
              Get Pre-Approved
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/60" />
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '500+', label: 'Vehicles in Stock' },
              { value: '15 Yrs', label: 'In Business' },
              { value: '4.9★', label: 'Customer Rating' },
              { value: 'Free', label: 'Carfax Reports' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-amber-400 text-2xl md:text-3xl font-bold">{stat.value}</p>
                <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-2">
              Hand-Picked Selection
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Featured Vehicles</h2>
            <p className="text-gray-500 mt-3">Our staff&apos;s top picks this week — exceptional quality at every price point.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/inventory"
              className="inline-block bg-slate-900 hover:bg-amber-500 text-white font-bold px-8 py-3.5 rounded-lg transition-colors"
            >
              View All Vehicles
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-2">Our Promise</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose AutoElite?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div className="bg-amber-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feat.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Banner */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Drive Home Today?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Over 500 vehicles in stock with new arrivals every week. Your next car is waiting.
          </p>
          <Link
            href="/inventory"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-10 py-4 rounded-lg text-lg transition-colors shadow-lg"
          >
            Browse All Vehicles
          </Link>
        </div>
      </section>
    </>
  );
}
