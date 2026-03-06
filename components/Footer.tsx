import Link from 'next/link';
import { Car, Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-amber-500 p-1.5 rounded">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">
                AutoElite <span className="text-amber-400">Motors</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              Your trusted source for premium pre-owned vehicles in Austin, TX. Serving our community with integrity since 2009.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/inventory', label: 'Browse Inventory' },
                { href: '/financing', label: 'Financing Options' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-amber-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Inventory */}
          <div>
            <h3 className="text-white font-semibold mb-4">Inventory</h3>
            <ul className="space-y-2 text-sm">
              {['Sedans', 'SUVs & Crossovers', 'Trucks', 'Coupes', 'Luxury Vehicles', 'Under $25,000'].map((item) => (
                <li key={item}>
                  <Link href="/inventory" className="text-gray-400 hover:text-amber-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-gray-400">123 AutoElite Drive<br />Austin, TX 78701</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <a href="tel:5552345678" className="text-gray-400 hover:text-amber-400 transition-colors">
                  (555) 234-5678
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <a href="mailto:info@autoelitemotors.com" className="text-gray-400 hover:text-amber-400 transition-colors">
                  info@autoelitemotors.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-gray-400">
                  Mon–Sat: 9am – 7pm<br />Sun: 11am – 5pm
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AutoElite Motors. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
