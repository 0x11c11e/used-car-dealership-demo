'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, Phone, Menu, X, Search, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      if (scrollY > 100) setAnnouncementVisible(false);
      else if (scrollY < 20) setAnnouncementVisible(true);
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
    <>
      {/* Announcement Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white text-center text-xs font-semibold py-2 px-4 transition-all duration-300 ${
          announcementVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        🏆 Austin&apos;s #1 Rated Dealership — 4.9★ on Google &nbsp;·&nbsp; Over 800 Verified Reviews
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          announcementVisible ? 'top-8' : 'top-0'
        } ${
          isDark
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="bg-gold-gradient p-2 rounded-lg shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
                <Car className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-display font-bold text-lg tracking-tight">
                  AutoElite
                </span>
                <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
                  Motors
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                      isActive
                        ? 'text-amber-400'
                        : 'text-gray-200 hover:text-amber-400 hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-amber-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              <button
                aria-label="Search"
                className="p-2 text-gray-300 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
              <a
                href="tel:5552345678"
                className="flex items-center gap-1.5 text-gray-300 hover:text-amber-400 transition-colors text-sm font-medium"
              >
                <Phone className="h-4 w-4" />
                <span>(555) 234-5678</span>
              </a>
              <Link
                href="/financing"
                className="bg-gold-gradient text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-all hover:shadow-glow hover:scale-105 duration-200"
              >
                Get Pre-Approved
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden bg-slate-900/98 backdrop-blur-md overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-screen border-t border-slate-700/50' : 'max-h-0'
          }`}
        >
          <div className="px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'text-gray-200 hover:text-amber-400 hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
              );
            })}
            <div className="border-t border-slate-700/50 pt-3 mt-2 flex flex-col gap-3">
              <a
                href="tel:5552345678"
                className="flex items-center justify-center gap-2 text-gray-300 text-sm py-3 rounded-xl border border-slate-700 hover:border-amber-500/30 hover:text-amber-400 transition-colors"
              >
                <Phone className="h-4 w-4" />
                (555) 234-5678
              </a>
              <Link
                href="/financing"
                onClick={() => setMobileOpen(false)}
                className="bg-gold-gradient text-white text-sm font-bold px-4 py-3 rounded-xl text-center shadow-glow"
              >
                Get Pre-Approved
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
