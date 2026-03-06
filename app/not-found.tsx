import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Animated car */}
        <div className="text-8xl animate-float mb-2 select-none">🚗</div>

        {/* 404 */}
        <h1 className="text-8xl font-bold font-display text-gradient mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Oops! Wrong Turn</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Looks like this page took a detour. The page you&apos;re looking for doesn&apos;t exist or may have been moved — but we have plenty of great cars waiting for you!
        </p>

        {/* Decorative search bar */}
        <div className="relative max-w-sm mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search our inventory..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm text-gray-600 shadow-card focus:outline-none focus:ring-2 focus:ring-amber-400"
            readOnly
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/inventory"
            className="flex items-center justify-center gap-2 bg-gold-gradient text-white font-bold px-8 py-4 rounded-2xl transition-all hover:shadow-glow hover:scale-105 duration-200"
          >
            🚗 Browse Inventory
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl transition-colors"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            { href: '/financing', label: 'Financing' },
            { href: '/about', label: 'About Us' },
            { href: '/contact', label: 'Contact' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-gray-500 hover:text-amber-500 font-medium underline transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
