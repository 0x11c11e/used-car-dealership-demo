import Image from 'next/image';
import { MapPin, Clock, Phone, Mail, Trophy, Star } from 'lucide-react';

const team = [
  {
    name: 'David Martinez',
    role: 'Founder & CEO',
    bio: 'With over 20 years in the automotive industry, David founded AutoElite with one mission: to make buying a used car honest and transparent.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
  {
    name: 'Jennifer Lee',
    role: 'Sales Manager',
    bio: 'Jennifer leads our sales team with a no-pressure approach and a genuine passion for connecting customers with the right vehicle.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    name: 'Marcus Johnson',
    role: 'Finance Director',
    bio: 'Marcus has helped over 2,000 customers find financing solutions, working with buyers across all credit situations.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Rachel Chen',
    role: 'Service Manager',
    bio: 'A certified master technician with ASE credentials, Rachel ensures every vehicle passes our rigorous 150-point inspection.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
];

const awards = [
  { icon: Trophy, title: 'Best Dealership Award', year: '2023', org: 'Austin Business Journal' },
  { icon: Star, title: '4.9★ Google Rating', year: '2024', org: 'Over 800 Reviews' },
  { icon: Trophy, title: 'Carfax Top Rated', year: '2022 & 2023', org: 'Carfax Certified' },
  { icon: Star, title: 'BBB A+ Accreditation', year: 'Since 2012', org: 'Better Business Bureau' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-slate-900 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About AutoElite Motors</h1>
          <p className="text-gray-400 text-lg">Serving Austin with integrity since 2009</p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            At AutoElite Motors, we believe that buying a used car should be a positive, stress-free experience. Since opening our doors in 2009, we&apos;ve been committed to transparency, honesty, and putting our customers first. No hidden fees, no bait-and-switch pricing, no pressure tactics — just a straightforward path to finding your perfect vehicle at a fair price. That&apos;s the AutoElite promise.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-2">The People</p>
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative h-56 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-amber-500 text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Awards & Certifications</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {awards.map(({ icon: Icon, title, year, org }) => (
              <div key={title} className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-center">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-6 w-6 text-amber-600" />
                </div>
                <p className="font-bold text-gray-900 text-sm">{title}</p>
                <p className="text-amber-600 text-xs font-medium mt-1">{year}</p>
                <p className="text-gray-500 text-xs mt-0.5">{org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-white">
            <div>
              <h2 className="text-2xl font-bold mb-6">Find Us</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">AutoElite Motors</p>
                    <p className="text-gray-400">123 AutoElite Drive<br />Austin, TX 78701</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 text-amber-400 shrink-0" />
                  <a href="tel:5552345678" className="text-gray-300 hover:text-amber-400 transition-colors">
                    (555) 234-5678
                  </a>
                </div>
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-amber-400 shrink-0" />
                  <a href="mailto:info@autoelitemotors.com" className="text-gray-300 hover:text-amber-400 transition-colors">
                    info@autoelitemotors.com
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Hours of Operation</h2>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between gap-8">
                    <span>Monday – Friday</span>
                    <span className="font-semibold text-white">9:00 AM – 7:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Saturday</span>
                    <span className="font-semibold text-white">9:00 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>Sunday</span>
                    <span className="font-semibold text-white">11:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
