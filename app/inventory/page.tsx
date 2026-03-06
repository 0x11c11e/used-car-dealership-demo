'use client';

import { useState, useMemo } from 'react';
import { ArrowUpDown, Search, X, LayoutGrid, LayoutList, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import VehicleCard from '@/components/VehicleCard';
import FilterSidebar, { type Filters } from '@/components/FilterSidebar';
import { inventory } from '@/lib/inventory';
import { formatPrice, formatMileage } from '@/lib/utils';
import { Gauge, Settings2 } from 'lucide-react';

type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc' | 'mileage-asc';
type ViewMode = 'grid' | 'list';

const sortLabels: Record<SortOption, string> = {
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'year-desc': 'Year: Newest First',
  'year-asc': 'Year: Oldest First',
  'mileage-asc': 'Mileage: Low to High',
};

const availableMakes = Array.from(new Set(inventory.map((v) => v.make))).sort();

const defaultFilters: Filters = {
  makes: [],
  bodyTypes: [],
  minYear: '',
  maxYear: '',
  minPrice: '',
  maxPrice: '',
  maxMileage: '',
  fuelTypes: [],
};

export default function InventoryPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState<SortOption>('year-desc');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...inventory];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (v) =>
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.trim.toLowerCase().includes(q) ||
          v.bodyType.toLowerCase().includes(q) ||
          String(v.year).includes(q)
      );
    }

    if (filters.makes.length > 0) {
      result = result.filter((v) => filters.makes.includes(v.make));
    }
    if (filters.bodyTypes.length > 0) {
      result = result.filter((v) => filters.bodyTypes.includes(v.bodyType));
    }
    if (filters.fuelTypes.length > 0) {
      result = result.filter((v) => filters.fuelTypes.includes(v.fuelType));
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
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'year-desc': result.sort((a, b) => b.year - a.year); break;
      case 'year-asc': result.sort((a, b) => a.year - b.year); break;
      case 'mileage-asc': result.sort((a, b) => a.mileage - b.mileage); break;
    }

    return result;
  }, [filters, sort, search]);

  const activeChips: { label: string; onRemove: () => void }[] = [];
  if (search) activeChips.push({ label: `"${search}"`, onRemove: () => setSearch('') });
  filters.makes.forEach((m) => activeChips.push({ label: m, onRemove: () => setFilters((p) => ({ ...p, makes: p.makes.filter((x) => x !== m) })) }));
  filters.bodyTypes.forEach((t) => activeChips.push({ label: t, onRemove: () => setFilters((p) => ({ ...p, bodyTypes: p.bodyTypes.filter((x) => x !== t) })) }));
  filters.fuelTypes.forEach((t) => activeChips.push({ label: t, onRemove: () => setFilters((p) => ({ ...p, fuelTypes: p.fuelTypes.filter((x) => x !== t) })) }));
  if (filters.minYear) activeChips.push({ label: `From ${filters.minYear}`, onRemove: () => setFilters((p) => ({ ...p, minYear: '' })) });
  if (filters.maxYear) activeChips.push({ label: `To ${filters.maxYear}`, onRemove: () => setFilters((p) => ({ ...p, maxYear: '' })) });
  if (filters.minPrice) activeChips.push({ label: `Min $${Number(filters.minPrice).toLocaleString()}`, onRemove: () => setFilters((p) => ({ ...p, minPrice: '' })) });
  if (filters.maxPrice) activeChips.push({ label: `Max $${Number(filters.maxPrice).toLocaleString()}`, onRemove: () => setFilters((p) => ({ ...p, maxPrice: '' })) });
  if (filters.maxMileage) activeChips.push({ label: `< ${Number(filters.maxMileage).toLocaleString()} mi`, onRemove: () => setFilters((p) => ({ ...p, maxMileage: '' })) });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero banner with search */}
      <div className="bg-navy-gradient pt-24 pb-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">Browse Our Selection</p>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">Our Inventory</h1>
          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by make, model, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar — desktop */}
          <div className="lg:w-64 shrink-0 hidden lg:block">
            <FilterSidebar filters={filters} setFilters={setFilters} availableMakes={availableMakes} />
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Active filter chips */}
            {activeChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeChips.map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {chip.label}
                    <button onClick={chip.onRemove} aria-label="Remove filter" className="hover:text-amber-900 transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                <button
                  onClick={() => { setFilters(defaultFilters); setSearch(''); }}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Sort + count + view toggle bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:border-amber-400 transition-colors"
                  onClick={() => setMobileFilterOpen(true)}
                >
                  <SlidersHorizontal className="h-4 w-4 text-amber-500" />
                  Filters
                  {activeChips.length > 0 && (
                    <span className="bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {activeChips.length}
                    </span>
                  )}
                </button>
                <p className="text-gray-600 text-sm">
                  <span className="font-bold text-gray-900">{filtered.length}</span> vehicles found
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-gray-400 hover:text-gray-700'}`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-gray-400 hover:text-gray-700'}`}
                    aria-label="List view"
                  >
                    <LayoutList className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-gray-400 shrink-0" />
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="border border-gray-200 rounded-xl text-sm px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white shadow-sm"
                  >
                    {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                      <option key={key} value={key}>{sortLabels[key]}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center shadow-card">
                <p className="text-6xl mb-4">🚗</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search term to see more results.</p>
                <button
                  onClick={() => { setFilters(defaultFilters); setSearch(''); }}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((vehicle) => (
                  <div key={vehicle.id} className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col sm:flex-row hover:shadow-card-hover transition-all duration-300 group">
                    <div className="relative sm:w-60 h-48 sm:h-auto shrink-0 overflow-hidden">
                      <Image
                        src={vehicle.imageUrl}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 240px"
                      />
                      {vehicle.badge && (
                        <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white">
                          {vehicle.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{vehicle.bodyType}</p>
                        <h3 className="font-bold text-gray-900 text-lg mt-0.5">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                        <p className="text-gray-500 text-sm">{vehicle.trim}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <Gauge className="h-4 w-4 text-amber-400" />
                            {formatMileage(vehicle.mileage)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Settings2 className="h-4 w-4 text-amber-400" />
                            {vehicle.transmission}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:text-right shrink-0">
                        <p className="text-gradient font-bold text-2xl">{formatPrice(vehicle.price)}</p>
                        <Link
                          href={`/inventory/${vehicle.id}`}
                          className="bg-slate-900 hover:bg-amber-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-glow whitespace-nowrap"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900 text-lg">Filters</h2>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <FilterSidebar filters={filters} setFilters={setFilters} availableMakes={availableMakes} />
            <div className="mt-5 sticky bottom-0 bg-white pt-3 border-t border-gray-100">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-colors"
              >
                Show {filtered.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
