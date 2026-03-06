'use client';

import { SlidersHorizontal, X } from 'lucide-react';

export interface Filters {
  makes: string[];
  bodyTypes: string[];
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
  maxMileage: string;
}

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  availableMakes: string[];
}

const bodyTypes = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Van', 'Wagon'];
const years = Array.from({ length: 10 }, (_, i) => String(2024 - i));
const priceOptions = ['15000', '20000', '25000', '30000', '35000', '40000', '50000', '60000', '75000', '100000'];
const mileageOptions = ['20000', '30000', '40000', '50000', '60000', '75000', '100000'];

export default function FilterSidebar({ filters, setFilters, availableMakes }: FilterSidebarProps) {
  const toggleMake = (make: string) => {
    setFilters((prev) => ({
      ...prev,
      makes: prev.makes.includes(make)
        ? prev.makes.filter((m) => m !== make)
        : [...prev.makes, make],
    }));
  };

  const toggleBodyType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      bodyTypes: prev.bodyTypes.includes(type)
        ? prev.bodyTypes.filter((t) => t !== type)
        : [...prev.bodyTypes, type],
    }));
  };

  const clearFilters = () => {
    setFilters({
      makes: [],
      bodyTypes: [],
      minYear: '',
      maxYear: '',
      minPrice: '',
      maxPrice: '',
      maxMileage: '',
    });
  };

  const hasActiveFilters =
    filters.makes.length > 0 ||
    filters.bodyTypes.length > 0 ||
    filters.minYear ||
    filters.maxYear ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.maxMileage;

  return (
    <aside className="w-full bg-white rounded-xl shadow-md p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-amber-500" />
          <h2 className="font-bold text-gray-900">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Clear All
          </button>
        )}
      </div>

      {/* Make */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Make</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {availableMakes.map((make) => (
            <label key={make} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.makes.includes(make)}
                onChange={() => toggleMake(make)}
                className="rounded border-gray-300 text-amber-500 focus:ring-amber-400"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{make}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Body Type */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Body Type</h3>
        <div className="space-y-2">
          {bodyTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.bodyTypes.includes(type)}
                onChange={() => toggleBodyType(type)}
                className="rounded border-gray-300 text-amber-500 focus:ring-amber-400"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Year Range */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Year Range</h3>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={filters.minYear}
            onChange={(e) => setFilters((prev) => ({ ...prev, minYear: e.target.value }))}
            className="text-sm border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="">Min Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            value={filters.maxYear}
            onChange={(e) => setFilters((prev) => ({ ...prev, maxYear: e.target.value }))}
            className="text-sm border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="">Max Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Range</h3>
        <div className="grid grid-cols-2 gap-2">
          <select
            value={filters.minPrice}
            onChange={(e) => setFilters((prev) => ({ ...prev, minPrice: e.target.value }))}
            className="text-sm border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="">Min Price</option>
            {priceOptions.map((p) => (
              <option key={p} value={p}>${Number(p).toLocaleString()}</option>
            ))}
          </select>
          <select
            value={filters.maxPrice}
            onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: e.target.value }))}
            className="text-sm border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          >
            <option value="">Max Price</option>
            {priceOptions.map((p) => (
              <option key={p} value={p}>${Number(p).toLocaleString()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Max Mileage */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Max Mileage</h3>
        <select
          value={filters.maxMileage}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxMileage: e.target.value }))}
          className="w-full text-sm border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-amber-400 focus:border-transparent"
        >
          <option value="">Any Mileage</option>
          {mileageOptions.map((m) => (
            <option key={m} value={m}>Under {Number(m).toLocaleString()} mi</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
