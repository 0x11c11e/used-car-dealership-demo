'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Gauge, Settings2 } from 'lucide-react';
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

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative h-52 w-full">
        <Image
          src={vehicle.imageUrl}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {vehicle.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${badgeStyles[vehicle.badge]}`}
          >
            {vehicle.badge}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="mb-1">
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{vehicle.bodyType}</p>
          <h3 className="text-gray-900 font-bold text-lg leading-tight">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-gray-500 text-sm">{vehicle.trim}</p>
        </div>

        <p className="text-amber-500 font-bold text-2xl mt-2">{formatPrice(vehicle.price)}</p>

        <div className="flex gap-4 mt-3 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Gauge className="h-4 w-4 text-gray-400" />
            {formatMileage(vehicle.mileage)}
          </span>
          <span className="flex items-center gap-1">
            <Settings2 className="h-4 w-4 text-gray-400" />
            {vehicle.transmission}
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <Link
            href={`/inventory/${vehicle.id}`}
            className="block w-full bg-slate-900 hover:bg-amber-500 text-white text-center text-sm font-semibold py-2.5 rounded-lg transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
