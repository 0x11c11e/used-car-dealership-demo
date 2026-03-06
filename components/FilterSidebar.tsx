'use client';

import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

export interface Filters {
  makes: string[];
  bodyTypes: string[];
  minYear: string;
  maxYear: string;
  minPrice: string;
  maxPrice: string;
  maxMileage: string;
  fuelTypes: string[];
}

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  availableMakes: string[];
}

const bodyTypes = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible', 'Van', 'Wagon'];
const fuelTypes = ['Gasoline', 'Hybrid', 'Electric', 'Diesel'];
const years = Array.from({ length: 10 }, (_, i) => String(2024 - i));
const priceOptions = ['15000', '20000', '25000', '30000', '35000', '40000', '50000', '60000', '75000', '100000'];
const mileageOptions = ['20000', '30000', '40000', '50000', '60000', '75000', '100000'];

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 last:border-0 pb-4 mb-4 last:pb-0 last:mb-0">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between mb-3 group"
      >
        <h3 className="text-sm font-bold text-gray-800 group-hover:text-amber-600 transition-colors">{title}</h3>
        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
}

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

  const toggleFuelType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      fuelTypes: prev.fuelTypes.includes(type)
        ? prev.fuelTypes.filter((t) => t !== type)
        : [...prev.fuelTypes, type],
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
      fuelTypes: [],
    });
  };

  const hasActiveFilters =
    filters.makes.length > 0 ||
    filters.bodyTypes.length > 0 ||
    filters.fuelTypes.length > 0 ||
    filters.minYear ||
    filters.maxYear ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.maxMileage;

  const minPriceNum = filters.minPrice ? Number(filters.minPrice) : null;
  const maxPriceNum = filters.maxPrice ? Number(filters.maxPrice) : null;

  return (
    <aside className="w-full bg-white rounded-2xl shadow-card p-5 sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="bg-amber-100 p-1.5 rounded-lg">
            <SlidersHorizontal className="h-4 w-4 text-amber-600" />
          </div>
          <h2 className="font-bold text-gray-900">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-semibold transition-colors bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg"
          >
            <X className="h-3.5 w-3.5" />
            Clear All
          </button>
        )}
      </div>

      {/* Price Range display */}
      {(minPriceNum || maxPriceNum) && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 text-center">
          <p className="text-xs text-amber-600 font-semibold">Price Range</p>
          <p className="text-sm font-bold text-amber-700 mt-0.5">
            {minPriceNum ? `$${minPriceNum.toLocaleString()}` : '$0'} — {maxPriceNum ? `$${maxPriceNum.toLocaleString()}` : 'Any'}
          </p>
        </div>
      )}

      {/* Make */}
      <FilterGroup title="Make">
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {availableMakes.map((make) => (
            <label key={make} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.makes.includes(make)}
                onChange={() => toggleMake(make)}
                className="rounded border-gray-300 accent-amber-500 h-4 w-4"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{make}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Body Type */}
      <FilterGroup title="Body Type">
        <div className="space-y-2">
          {bodyTypes.map((type) => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.bodyTypes.includes(type)}
                onChange={() => toggleBodyType(type)}
                className="rounded border-gray-300 accent-amber-500 h-4 w-4"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Fuel Type */}
      <FilterGroup title="Fuel Type">
        <div className="space-y-2">
          {fuelTypes.map((type) => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.fuelTypes.includes(type)}
                onChange={() => toggleFuelType(type)}
                className="rounded border-gray-300 accent-amber-500 h-4 w-4"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Year Range */}
      <FilterGroup title="Year Range">
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
      </FilterGroup>

      {/* Price Range */}
      <FilterGroup title="Price Range">
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
      </FilterGroup>

      {/* Max Mileage */}
      <FilterGroup title="Max Mileage">
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
      </FilterGroup>
    </aside>
  );
}
