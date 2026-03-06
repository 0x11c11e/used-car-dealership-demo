'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, Phone, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/inventory', label: 'Inventory' },
    { href: '/financing', label: 'Financing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isDark = !isHome || scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDark ? 'bg-slate-900 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-amber-500 p-1.5 rounded">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              AutoElite <span className="text-amber-400">Motors</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                  pathname === link.href ? 'text-amber-400' : 'text-gray-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:5552345678"
              className="flex items-center gap-1.5 text-gray-200 hover:text-amber-400 transition-colors text-sm"
            >
              <Phone className="h-4 w-4" />
              <span>(555) 234-5678</span>
            </a>
            <Link
              href="/financing"
              className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded transition-colors"
            >
              Get Pre-Approved
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-slate-900 overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 border-t border-slate-700' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                pathname === link.href ? 'text-amber-400' : 'text-gray-200'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-slate-700 pt-4 flex flex-col gap-3">
            <a
              href="tel:5552345678"
              className="flex items-center gap-2 text-gray-200 text-sm"
            >
              <Phone className="h-4 w-4" />
              (555) 234-5678
            </a>
            <Link
              href="/financing"
              onClick={() => setMobileOpen(false)}
              className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded text-center transition-colors"
            >
              Get Pre-Approved
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
