import Image from 'next/image';
import { MapPin, Clock, Phone, Mail, Trophy, Star } from 'lucide-react';

const team = [
  {
    name: 'David Martinez',
    role: 'Founder & CEO',
    bio: 'With over 20 years in the automotive industry, David founded AutoElite with one mission: to make buying a used car honest and transparent.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    initials: 'DM',
    color: 'from-amber-400 to-orange-500',
    social: ['LinkedIn', 'Twitter'],
  },
  {
    name: 'Jennifer Lee',
    role: 'Sales Manager',
    bio: 'Jennifer leads our sales team with a no-pressure approach and a genuine passion for connecting customers with the right vehicle.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    initials: 'JL',
    color: 'from-blue-400 to-violet-500',
    social: ['LinkedIn'],
  },
  {
    name: 'Marcus Johnson',
    role: 'Finance Director',
    bio: 'Marcus has helped over 2,000 customers find financing solutions, working with buyers across all credit situations.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    initials: 'MJ',
    color: 'from-emerald-400 to-teal-500',
    social: ['LinkedIn', 'Twitter'],
  },
  {
    name: 'Rachel Chen',
    role: 'Service Manager',
    bio: 'A certified master technician with ASE credentials, Rachel ensures every vehicle passes our rigorous 150-point inspection.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    initials: 'RC',
    color: 'from-pink-400 to-rose-500',
    social: ['LinkedIn'],
  },
];

const awards = [
  { icon: Trophy, title: 'Best Dealership Award', year: '2023', org: 'Austin Business Journal' },
  { icon: Star, title: '4.9★ Google Rating', year: '2024', org: 'Over 800 Reviews' },
  { icon: Trophy, title: 'Carfax Top Rated', year: '2022 & 2023', org: 'Carfax Certified' },
  { icon: Star, title: 'BBB A+ Accreditation', year: 'Since 2012', org: 'Better Business Bureau' },
];

const milestones = [
  { year: '2009', title: 'Founded', desc: 'AutoElite Motors opens its doors in Austin, TX with 50 vehicles.' },
  { year: '2012', title: 'BBB A+ Rating', desc: 'Earned the Better Business Bureau\'s highest accreditation after just 3 years.' },
  { year: '2015', title: '100th Vehicle Sold', desc: 'A major milestone celebrating our growing reputation in Austin.' },
  { year: '2020', title: '500+ Inventory', desc: 'Expanded our lot to hold over 500 premium pre-owned vehicles.' },
  { year: '2024', title: '800+ Reviews', desc: 'Earned 800+ five-star reviews — a testament to our team\'s dedication.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-navy-gradient pt-24 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.4) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">Our Story</p>
            <h1 className="text-5xl md:text-6xl font-bold font-display text-white mb-4">About AutoElite Motors</h1>
            <p className="text-gray-400 text-lg">Serving Austin with integrity since 2009</p>
          </div>
          {/* Stats overlay */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '15+', label: 'Years in Business' },
              { value: '5,000+', label: 'Vehicles Sold' },
              { value: '4.9★', label: 'Google Rating' },
              { value: '100%', label: 'Satisfaction' },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4 text-center">
                <p className="text-gradient font-bold text-2xl font-display">{s.value}</p>
                <p className="text-gray-400 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Big decorative quote mark */}
          <div className="text-[8rem] font-serif text-amber-100 leading-none absolute -top-8 left-0 select-none pointer-events-none">&ldquo;</div>
          <div className="relative">
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-4">Our Mission</p>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-6">Why We Do What We Do</h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              At AutoElite Motors, we believe that buying a used car should be a positive, stress-free experience. Since opening our doors in 2009, we&apos;ve been committed to transparency, honesty, and putting our customers first. No hidden fees, no bait-and-switch pricing, no pressure tactics — just a straightforward path to finding your perfect vehicle at a fair price.
            </p>
            <p className="text-amber-600 font-bold text-lg mt-4">That&apos;s the AutoElite promise.</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-3">The People</p>
            <h2 className="text-4xl font-bold font-display text-gray-900">Meet Our Team</h2>
            <div className="w-16 h-1 bg-gold-gradient rounded-full mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="card-hover bg-white rounded-2xl overflow-hidden shadow-card group">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Name overlay on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-2">
                      {member.social.map((s) => (
                        <a key={s} href="#" className="bg-white/20 hover:bg-white/40 text-white text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm transition-colors">
                          {s}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                  <p className="text-amber-500 text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-3">Recognition</p>
            <h2 className="text-4xl font-bold font-display text-gray-900">Awards & Certifications</h2>
            <div className="w-16 h-1 bg-gold-gradient rounded-full mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {awards.map(({ icon: Icon, title, year, org }) => (
              <div key={title} className="award-shimmer border border-amber-200 rounded-2xl p-6 text-center shadow-card hover:shadow-glow transition-shadow duration-300">
                <div className="bg-amber-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-amber-600" />
                </div>
                <p className="font-bold text-gray-900 text-sm">{title}</p>
                <p className="text-amber-600 text-xs font-bold mt-1.5">{year}</p>
                <p className="text-gray-500 text-xs mt-0.5">{org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-500 font-semibold text-sm uppercase tracking-widest mb-3">Our Journey</p>
            <h2 className="text-4xl font-bold font-display text-gray-900">Company Milestones</h2>
            <div className="w-16 h-1 bg-gold-gradient rounded-full mx-auto mt-4" />
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-amber-200" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="relative flex gap-6 items-start">
                  <div className="shrink-0 w-12 h-12 bg-gold-gradient rounded-2xl flex items-center justify-center shadow-glow relative z-10">
                    <span className="text-white font-bold text-xs">{m.year.slice(2)}</span>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-card flex-1 hover:shadow-card-hover transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-amber-500 font-bold text-sm">{m.year}</span>
                      <span className="font-bold text-gray-900">{m.title}</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white">
            <div>
              <h2 className="text-2xl font-bold font-display mb-6">Find Us</h2>
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
              <h2 className="text-2xl font-bold font-display mb-6">Hours of Operation</h2>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                <div className="space-y-3 text-gray-300">
                  {[
                    { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
                    { day: 'Saturday', hours: '9:00 AM – 6:00 PM' },
                    { day: 'Sunday', hours: '11:00 AM – 5:00 PM' },
                  ].map((h) => (
                    <div key={h.day} className="flex justify-between gap-8">
                      <span>{h.day}</span>
                      <span className="font-bold text-white">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
