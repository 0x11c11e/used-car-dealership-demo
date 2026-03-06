import Link from 'next/link';
import { Car, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="bg-slate-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Car className="h-12 w-12 text-amber-400" />
        </div>
        <h1 className="text-7xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Oops! Page Not Found</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Looks like this page took a wrong turn. The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/inventory"
            className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <Car className="h-4 w-4" />
            Browse Inventory
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
