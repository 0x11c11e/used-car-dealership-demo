'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  ChevronRight, ChevronLeft,
  Gauge, Settings2, Fuel, Palette, Calendar, Hash, Phone,
  ClipboardCheck, FileText, ShieldCheck, RotateCcw, CarFront,
  Share2, Heart, ChevronDown,
} from 'lucide-react';
import { inventory } from '@/lib/inventory';
import { formatPrice, formatMileage } from '@/lib/utils';
import VehicleCard from '@/components/VehicleCard';

const ESTIMATE_APR = 6.9;
const ESTIMATE_DOWN_PERCENT = 0.1;
const ESTIMATE_TERM_MONTHS = 60;

export default function VehicleDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const vehicle = inventory.find((v) => v.id === id);

  const [activeImage, setActiveImage] = useState(0);

  if (!vehicle) {
    notFound();
  }

  // Monthly payment estimate using named constants
  const principal = vehicle.price * (1 - ESTIMATE_DOWN_PERCENT);
  const r = ESTIMATE_APR / 100 / 12;
  const n = ESTIMATE_TERM_MONTHS;
  const monthlyEst = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const galleryImages = [
    vehicle.imageUrl,
    `${vehicle.imageUrl}&auto=format`,
    `${vehicle.imageUrl}&sat=-50`,
    `${vehicle.imageUrl}&bri=10`,
  ];

  const guarantees = [
    { icon: ClipboardCheck, title: 'Certified Inspection', desc: '150-point inspection completed', gradient: 'from-emerald-400 to-emerald-600' },
    { icon: FileText, title: 'Carfax Report', desc: 'Full vehicle history included', gradient: 'from-blue-400 to-blue-600' },
    { icon: ShieldCheck, title: 'Limited Warranty', desc: '90-day powertrain warranty', gradient: 'from-violet-400 to-violet-600' },
    { icon: RotateCcw, title: '7-Day Return', desc: 'No-hassle return policy', gradient: 'from-amber-400 to-amber-600' },
  ];

  const similarVehicles = inventory.filter((v) => v.id !== vehicle.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-navy-gradient pt-24 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/inventory" className="hover:text-amber-400 transition-colors">Inventory</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-200">{vehicle.year} {vehicle.make} {vehicle.model}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Gallery */}
          <div className="lg:col-span-3">
            {/* Main image */}
            <div className="relative h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-lg group">
              <Image
                src={galleryImages[activeImage]}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                fill
                className="object-cover transition-all duration-500"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              {vehicle.badge && (
                <span className={`absolute top-4 left-4 text-sm font-bold px-3 py-1.5 rounded-full ${
                  vehicle.badge === 'Hot Deal' ? 'bg-red-500 text-white' :
                  vehicle.badge === 'Low Miles' ? 'bg-green-500 text-white' :
                  vehicle.badge === 'New Arrival' ? 'bg-blue-500 text-white' :
                  'bg-orange-500 text-white'
                }`}>
                  {vehicle.badge}
                </span>
              )}
              {/* Gallery badge */}
              <div className="absolute top-4 right-4 glass text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                📷 Photo Gallery
              </div>
              {/* Navigation arrows */}
              <button
                onClick={() => setActiveImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setActiveImage((prev) => (prev + 1) % galleryImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3 mt-3">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative h-20 flex-1 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    activeImage === i ? 'border-amber-500 shadow-glow' : 'border-transparent hover:border-amber-300'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`View ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                  {activeImage === i && <div className="absolute inset-0 bg-amber-500/10" />}
                </button>
              ))}
            </div>

            {/* Features */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-card">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((f) => (
                  <span key={f} className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <span className="text-amber-500">✓</span> {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 bg-white rounded-2xl p-6 shadow-card">
              <h3 className="font-bold text-gray-900 text-lg mb-3">About This Vehicle</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{vehicle.description}</p>
            </div>

            {/* Share */}
            <div className="mt-4 bg-white rounded-2xl p-5 shadow-card">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600 text-sm font-semibold">
                  <Share2 className="h-4 w-4 text-amber-500" />
                  Share This Vehicle:
                </div>
                <div className="flex gap-2">
                  {['Facebook', 'Twitter', 'Email'].map((s) => (
                    <a key={s} href="#" className="text-xs font-semibold text-gray-500 hover:text-amber-600 border border-gray-200 hover:border-amber-400 px-3 py-1.5 rounded-lg transition-colors">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Info Panel — sticky */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-card sticky top-24">
              <div className="flex items-center justify-between mb-1">
                <p className="text-gray-500 text-sm">{vehicle.bodyType}</p>
                <button aria-label="Save to wishlist" className="p-2 hover:bg-red-50 rounded-xl transition-colors group">
                  <Heart className="h-5 w-5 text-gray-300 group-hover:text-red-400 transition-colors" />
                </button>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mt-0.5">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
              <p className="text-gray-500 text-sm">{vehicle.trim}</p>

              <div className="mt-3">
                <p className="text-gradient font-bold text-4xl font-display">{formatPrice(vehicle.price)}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <p className="text-gray-500 text-sm">
                    Est. <span className="font-bold text-gray-700">{formatPrice(monthlyEst)}/mo</span>
                  </p>
                  <Link href="/financing" className="text-xs text-amber-500 hover:text-amber-600 underline font-medium">
                    Calculate Payment
                  </Link>
                </div>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-2.5 mt-5">
                {[
                  { icon: Gauge, label: 'Mileage', value: formatMileage(vehicle.mileage), color: 'bg-blue-50 text-blue-500' },
                  { icon: Settings2, label: 'Transmission', value: vehicle.transmission, color: 'bg-violet-50 text-violet-500' },
                  { icon: Fuel, label: 'Fuel Type', value: vehicle.fuelType, color: 'bg-emerald-50 text-emerald-500' },
                  { icon: Palette, label: 'Color', value: vehicle.color, color: 'bg-pink-50 text-pink-500' },
                  { icon: Calendar, label: 'Year', value: String(vehicle.year), color: 'bg-amber-50 text-amber-500' },
                  { icon: CarFront, label: 'Body Type', value: vehicle.bodyType, color: 'bg-slate-50 text-slate-500' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3 hover:bg-amber-50 transition-colors">
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className={`p-1 rounded-md ${color}`}>
                        <Icon className="h-3 w-3" />
                      </div>
                      <span className="text-xs text-gray-500">{label}</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Hash className="h-3.5 w-3.5" />
                  <span>VIN: <span className="font-mono text-gray-700">{vehicle.vin}</span></span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Hash className="h-3.5 w-3.5" />
                  <span>Stock #: <span className="font-mono text-gray-700">{vehicle.stockNumber}</span></span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-col gap-3">
                <Link href="/contact" className="block bg-gold-gradient text-white font-bold text-center py-3.5 rounded-xl transition-all hover:shadow-glow hover:scale-[1.02] duration-200">
                  Schedule a Test Drive
                </Link>
                <Link href="/financing" className="block bg-slate-900 hover:bg-slate-800 text-white font-bold text-center py-3.5 rounded-xl transition-colors">
                  Apply for Financing
                </Link>
                <a href="tel:5552345678" className="flex items-center justify-center gap-2 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold py-3.5 rounded-xl transition-colors">
                  <Phone className="h-4 w-4" />
                  Call Dealership
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dealer Guarantee */}
        <div className="mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-card">
          <h3 className="font-bold text-gray-900 text-xl mb-6 text-center font-display">AutoElite Dealer Guarantee</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {guarantees.map(({ icon: Icon, title, desc, gradient }) => (
              <div key={title} className="card-hover text-center p-5 rounded-2xl bg-gray-50">
                <div className={`bg-gradient-to-br ${gradient} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <p className="font-bold text-gray-900 text-sm">{title}</p>
                <p className="text-gray-500 text-xs mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Vehicles */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold font-display text-gray-900">Similar Vehicles</h3>
            <Link href="/inventory" className="text-amber-500 hover:text-amber-600 font-semibold text-sm flex items-center gap-1">
              View All <ChevronDown className="h-4 w-4 -rotate-90" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {similarVehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
