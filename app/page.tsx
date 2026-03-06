'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ChevronDown, Shield, CreditCard, RefreshCw, Award,
  Car, Truck, Star, Zap, DollarSign, CheckCircle,
} from 'lucide-react';
import VehicleCard from '@/components/VehicleCard';
import TestimonialsSection from '@/components/TestimonialsSection';
import { inventory } from '@/lib/inventory';

const features = [
  {
    icon: Shield,
    title: 'Certified Inspections',
    description: 'Every vehicle undergoes a rigorous 150-point inspection by our certified technicians before it reaches our lot.',
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    icon: CreditCard,
    title: 'Flexible Financing',
    description: 'We work with over 20 lenders to find the best rate for your budget, regardless of your credit history.',
    color: 'from-blue-400 to-blue-600',
  },
  {
    icon: RefreshCw,
    title: '7-Day Return Policy',
    description: 'Not completely satisfied? Return your vehicle within 7 days for a full refund — no questions asked.',
    color: 'from-violet-400 to-violet-600',
  },
  {
    icon: Award,
    title: 'Free Carfax Reports',
    description: 'Full vehicle history transparency. We provide a complimentary Carfax report on every vehicle we sell.',
    color: 'from-amber-400 to-amber-600',
  },
];

const categoryPills = [
  { icon: Car, label: 'Sedans', emoji: '🚗' },
  { icon: Car, label: 'SUVs', emoji: '🚙' },
  { icon: Truck, label: 'Trucks', emoji: '🛻' },
  { icon: Star, label: 'Luxury', emoji: '✨' },
  { icon: DollarSign, label: 'Under $25K', emoji: '💰' },
  { icon: Zap, label: 'Electric/Hybrid', emoji: '⚡' },
];

const guarantees = [
  { emoji: '🔍', title: '150-Point Inspection', desc: 'Every vehicle certified' },
  { emoji: '📋', title: 'Free Carfax', desc: 'Full history included' },
  { emoji: '↩️', title: '7-Day Returns', desc: 'No-hassle guarantee' },
  { emoji: '💳', title: 'All Credit Welcome', desc: 'Financing for everyone' },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatsBar() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const vehicles = useCountUp(500, 1500, started);
  const years = useCountUp(15, 1200, started);
  const reviews = useCountUp(800, 1800, started);

  return (
    <section ref={ref} className="bg-slate-900 py-10 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="group">
            <p className="text-gradient text-3xl md:text-4xl font-bold font-display">{vehicles}+</p>
            <p className="text-gray-400 text-sm mt-1 font-medium">Vehicles in Stock</p>
          </div>
          <div className="group">
            <p className="text-gradient text-3xl md:text-4xl font-bold font-display">{years} Yrs</p>
            <p className="text-gray-400 text-sm mt-1 font-medium">In Business</p>
          </div>
          <div className="group">
            <p className="text-gradient text-3xl md:text-4xl font-bold font-display">4.9★</p>
            <p className="text-gray-400 text-sm mt-1 font-medium">Customer Rating</p>
          </div>
          <div className="group">
            <p className="text-gradient text-3xl md:text-4xl font-bold font-display">{reviews}+</p>
            <p className="text-gray-400 text-sm mt-1 font-medium">Verified Reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const featured = inventory.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-hero-gradient" />
        {/* Dot pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 animate-fade-in-up">
            <span className="text-amber-400 text-sm font-semibold">🚗 Austin&apos;s #1 Pre-Owned Dealership</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold font-display text-white leading-tight mb-6">
            <span className="block animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
              Find Your
            </span>
            <span className="block text-gradient animate-fade-in-up opacity-0" style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}>
              Perfect Ride
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            Browse 500+ premium pre-owned vehicles. Transparent pricing, certified inspections, and flexible financing — all under one roof.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up opacity-0" style={{ animationDelay: '0.55s', animationFillMode: 'forwards' }}>
            <Link
              href="/inventory"
              className="group relative bg-gold-gradient text-white font-bold px-10 py-4 rounded-xl text-lg shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">Browse Inventory</span>
            </Link>
            <Link
              href="/financing"
              className="glass border border-white/30 text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-white/20 hover:border-amber-400/50 transition-all duration-300"
            >
              Get Pre-Approved
            </Link>
          </div>

          {/* Floating mini stats */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}>
            {['500+ Vehicles', '4.9★ Rating', '15+ Years', '$0 Hidden Fees'].map((item) => (
              <div key={item} className="glass rounded-full px-4 py-2 text-white text-sm font-semibold flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-amber-400" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/60" />
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar />

      {/* Featured Vehicles */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-3">
              Hand-Picked Selection
            </p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900">
              Featured Vehicles
            </h2>
            <div className="w-16 h-1 bg-gold-gradient rounded-full mx-auto mt-4 mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">Our staff&apos;s top picks this week — exceptional quality at every price point.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/inventory"
              className="group inline-flex items-center gap-2 bg-slate-900 hover:bg-amber-500 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 hover:shadow-glow"
            >
              View All Vehicles
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Find Your Perfect Match — Category Pills */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-2">
              Find Your Perfect Match
            </h2>
            <p className="text-gray-500">Browse by category — something for everyone.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categoryPills.map(({ label, emoji }) => (
              <Link
                key={label}
                href="/inventory"
                className="group flex items-center gap-2 px-6 py-3.5 bg-gray-50 hover:bg-amber-50 border-2 border-gray-200 hover:border-amber-400 rounded-2xl font-semibold text-gray-700 hover:text-amber-600 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <span className="text-xl">{emoji}</span>
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #0f172a 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-3">Our Promise</p>
            <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900">Why Choose AutoElite?</h2>
            <div className="w-16 h-1 bg-gold-gradient rounded-full mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="card-hover bg-white rounded-2xl p-7 text-center shadow-card"
                >
                  <div className={`bg-gradient-to-br ${feat.color} rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-5 shadow-md`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">{feat.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Our Promise — Guarantee Strip */}
      <section className="bg-navy-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">The AutoElite Guarantee</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white">Our Promise to You</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {guarantees.map((g) => (
              <div key={g.title} className="text-center group">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300">
                  <span className="text-3xl">{g.emoji}</span>
                </div>
                <p className="text-white font-bold mb-1">{g.title}</p>
                <p className="text-gray-400 text-sm">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="relative py-24 overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/70" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-5">
            Ready to Drive Home Today?
          </h2>
          <p className="text-gray-300 mb-10 text-lg max-w-xl mx-auto">
            Over 500 vehicles in stock with new arrivals every week. Your next car is waiting for you.
          </p>
          <Link
            href="/inventory"
            className="inline-block bg-gold-gradient text-white font-bold px-12 py-5 rounded-xl text-lg shadow-glow hover:shadow-glow-lg animate-pulse-glow hover:scale-105 transition-all duration-300"
          >
            Browse All Vehicles
          </Link>
        </div>
      </section>
    </>
  );
}

