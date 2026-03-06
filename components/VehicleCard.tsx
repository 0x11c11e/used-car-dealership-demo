'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Gauge, Settings2, Heart, Zap, Fuel, ArrowRight } from 'lucide-react';
import type { Vehicle } from '@/lib/inventory';
import { formatPrice, formatMileage } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const badgeStyles: Record<NonNullable<Vehicle['badge']>, string> = {
  'Hot Deal': 'bg-red-500 text-white',
  'Low Miles': 'bg-green-500 text-white',
  'New Arrival': 'bg-blue-500 text-white',
  'Price Drop': 'bg-orange-500 text-white',
};

const badgeBorderColors: Record<NonNullable<Vehicle['badge']>, string> = {
  'Hot Deal': 'border-red-400',
  'Low Miles': 'border-green-400',
  'New Arrival': 'border-blue-400',
  'Price Drop': 'border-orange-400',
};

const fuelIcons: Record<Vehicle['fuelType'], { icon: React.ReactNode; label: string; color: string }> = {
  Electric: { icon: <Zap className="h-3 w-3" />, label: 'Electric', color: 'text-green-600 bg-green-50' },
  Hybrid: { icon: <Zap className="h-3 w-3" />, label: 'Hybrid', color: 'text-teal-600 bg-teal-50' },
  Gasoline: { icon: <Fuel className="h-3 w-3" />, label: 'Gas', color: 'text-blue-600 bg-blue-50' },
  Diesel: { icon: <Fuel className="h-3 w-3" />, label: 'Diesel', color: 'text-orange-600 bg-orange-50' },
};

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const fuelInfo = fuelIcons[vehicle.fuelType];
  const borderColor = vehicle.badge ? badgeBorderColors[vehicle.badge] : 'border-amber-400';

  return (
    <div className={`card-hover bg-white rounded-2xl overflow-hidden shadow-card flex flex-col group border-b-4 ${borderColor}`}>
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={vehicle.imageUrl}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {vehicle.badge && (
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${badgeStyles[vehicle.badge]}`}
            >
              {vehicle.badge}
            </span>
          )}
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${fuelInfo.color}`}>
            {fuelInfo.icon}
            {fuelInfo.label}
          </span>
        </div>
        {/* Wishlist button */}
        <button
          aria-label="Save to wishlist"
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-sm hover:text-red-500 transition-colors duration-200"
        >
          <Heart className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
        </button>
        {/* Dark gradient bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{vehicle.bodyType}</p>
          <h3 className="text-gray-900 font-bold text-lg leading-tight mt-0.5">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-gray-500 text-sm">{vehicle.trim}</p>
        </div>

        <p className="text-gradient font-bold text-2xl mt-2">{formatPrice(vehicle.price)}</p>

        <div className="flex gap-4 mt-3 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Gauge className="h-4 w-4 text-amber-400" />
            {formatMileage(vehicle.mileage)}
          </span>
          <span className="flex items-center gap-1.5">
            <Settings2 className="h-4 w-4 text-amber-400" />
            {vehicle.transmission}
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <Link
            href={`/inventory/${vehicle.id}`}
            className="group/btn flex items-center gap-2 bg-slate-900 hover:bg-amber-500 text-white text-sm font-semibold py-2.5 px-5 rounded-xl transition-all duration-200 hover:shadow-glow"
          >
            View Details
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Link>
          <button className="text-xs text-gray-400 hover:text-amber-500 font-medium transition-colors">
            Compare
          </button>
        </div>
      </div>
    </div>
  );
}

