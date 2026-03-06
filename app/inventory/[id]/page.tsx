import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  Gauge,
  Settings2,
  Fuel,
  Palette,
  Calendar,
  Hash,
  Phone,
  ClipboardCheck,
  FileText,
  ShieldCheck,
  RotateCcw,
  CarFront,
} from 'lucide-react';
import { inventory } from '@/lib/inventory';
import { formatPrice, formatMileage } from '@/lib/utils';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return inventory.map((v) => ({ id: v.id }));
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = inventory.find((v) => v.id === id);

  if (!vehicle) {
    notFound();
  }

  const guarantees = [
    { icon: ClipboardCheck, title: 'Certified Inspection', desc: '150-point inspection completed' },
    { icon: FileText, title: 'Carfax Report', desc: 'Full vehicle history included' },
    { icon: ShieldCheck, title: 'Limited Warranty', desc: '90-day powertrain warranty' },
    { icon: RotateCcw, title: '7-Day Return', desc: 'No-hassle return policy' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-slate-900 pt-20 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/inventory" className="hover:text-amber-400 transition-colors">Inventory</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-200">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Image */}
          <div className="lg:col-span-3">
            <div className="relative h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={vehicle.imageUrl}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                fill
                className="object-cover"
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
            </div>

            {/* Features */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((f) => (
                  <span key={f} className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium px-3 py-1.5 rounded-full">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">About This Vehicle</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{vehicle.description}</p>
            </div>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
              <p className="text-gray-500 text-sm">{vehicle.bodyType}</p>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-gray-500 text-sm">{vehicle.trim}</p>
              <p className="text-amber-500 text-4xl font-bold mt-3">{formatPrice(vehicle.price)}</p>

              <div className="grid grid-cols-2 gap-3 mt-5">
                {[
                  { icon: Gauge, label: 'Mileage', value: formatMileage(vehicle.mileage) },
                  { icon: Settings2, label: 'Transmission', value: vehicle.transmission },
                  { icon: Fuel, label: 'Fuel Type', value: vehicle.fuelType },
                  { icon: Palette, label: 'Color', value: vehicle.color },
                  { icon: Calendar, label: 'Year', value: String(vehicle.year) },
                  { icon: CarFront, label: 'Body Type', value: vehicle.bodyType },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="h-3.5 w-3.5 text-amber-500" />
                      <span className="text-xs text-gray-500">{label}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{value}</p>
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
                <Link
                  href="/contact"
                  className="block bg-amber-500 hover:bg-amber-600 text-white font-bold text-center py-3 rounded-xl transition-colors"
                >
                  Schedule a Test Drive
                </Link>
                <Link
                  href="/financing"
                  className="block bg-slate-900 hover:bg-slate-800 text-white font-bold text-center py-3 rounded-xl transition-colors"
                >
                  Apply for Financing
                </Link>
                <a
                  href="tel:5552345678"
                  className="flex items-center justify-center gap-2 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-bold py-3 rounded-xl transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call Dealership
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dealer Guarantee */}
        <div className="mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <h3 className="font-bold text-gray-900 text-xl mb-6 text-center">AutoElite Dealer Guarantee</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {guarantees.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-6 w-6 text-amber-600" />
                </div>
                <p className="font-semibold text-gray-900 text-sm">{title}</p>
                <p className="text-gray-500 text-xs mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
