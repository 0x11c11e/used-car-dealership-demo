'use client';

import { useState, useMemo } from 'react';
import { ArrowUpDown } from 'lucide-react';
import VehicleCard from '@/components/VehicleCard';
import FilterSidebar, { type Filters } from '@/components/FilterSidebar';
import { inventory } from '@/lib/inventory';

type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc' | 'mileage-asc';

const sortLabels: Record<SortOption, string> = {
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'year-desc': 'Year: Newest First',
  'year-asc': 'Year: Oldest First',
  'mileage-asc': 'Mileage: Low to High',
};

const availableMakes = Array.from(new Set(inventory.map((v) => v.make))).sort();

export default function InventoryPage() {
  const [filters, setFilters] = useState<Filters>({
    makes: [],
    bodyTypes: [],
    minYear: '',
    maxYear: '',
    minPrice: '',
    maxPrice: '',
    maxMileage: '',
  });
  const [sort, setSort] = useState<SortOption>('year-desc');

  const filtered = useMemo(() => {
    let result = [...inventory];

    if (filters.makes.length > 0) {
      result = result.filter((v) => filters.makes.includes(v.make));
    }
    if (filters.bodyTypes.length > 0) {
      result = result.filter((v) => filters.bodyTypes.includes(v.bodyType));
    }
    if (filters.minYear) {
      result = result.filter((v) => v.year >= Number(filters.minYear));
    }
    if (filters.maxYear) {
      result = result.filter((v) => v.year <= Number(filters.maxYear));
    }
    if (filters.minPrice) {
      result = result.filter((v) => v.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((v) => v.price <= Number(filters.maxPrice));
    }
    if (filters.maxMileage) {
      result = result.filter((v) => v.mileage <= Number(filters.maxMileage));
    }

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'year-desc':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'year-asc':
        result.sort((a, b) => a.year - b.year);
        break;
      case 'mileage-asc':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
    }

    return result;
  }, [filters, sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate-900 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Our Inventory</h1>
          <p className="text-gray-400 mt-2">
            {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 shrink-0">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              availableMakes={availableMakes}
            />
          </div>

          {/* Main */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-gray-600 text-sm">
                Showing <span className="font-semibold text-gray-900">{filtered.length}</span> vehicles
              </p>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-gray-400" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="border border-gray-200 rounded-lg text-sm px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                >
                  {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                    <option key={key} value={key}>{sortLabels[key]}</option>
                  ))}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
                <p className="text-5xl mb-4">🚗</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
