'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const MAX_MESSAGE_LENGTH = 500;

export default function ContactPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.subject) newErrors.subject = 'Please select a subject';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: ['123 AutoElite Drive', 'Austin, TX 78701'],
      href: 'https://maps.google.com',
      color: 'from-amber-400 to-orange-500',
    },
    {
      icon: Phone,
      title: 'Call Us',
      lines: ['(555) 234-5678'],
      href: 'tel:5552345678',
      color: 'from-blue-400 to-violet-500',
    },
    {
      icon: Mail,
      title: 'Email Us',
      lines: ['info@autoelitemotors.com'],
      href: 'mailto:info@autoelitemotors.com',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      icon: Clock,
      title: 'Hours',
      lines: ['Mon–Fri: 9am – 7pm', 'Sat: 9am – 6pm', 'Sun: 11am – 5pm'],
      href: null,
      color: 'from-pink-400 to-rose-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-gradient pt-24 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.4) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">Contact Us</h1>
          <p className="text-gray-400 text-lg">Our team is here to help. Reach out anytime.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {contactInfo.map(({ icon: Icon, title, lines, href, color }) => {
            const content = (
              <div className="card-hover bg-white rounded-2xl p-5 shadow-card text-center h-full flex flex-col items-center">
                <div className={`bg-gradient-to-br ${color} w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-md`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <p className="font-bold text-gray-900 text-sm mb-2">{title}</p>
                {lines.map((line) => (
                  <p key={line} className="text-gray-500 text-xs leading-relaxed">{line}</p>
                ))}
              </div>
            );
            return href ? (
              <a key={title} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block">
                {content}
              </a>
            ) : (
              <div key={title}>{content}</div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-card p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-10 relative overflow-hidden">
                  {/* Confetti dots */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="confetti-dot absolute"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 30}%`,
                        background: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'][i % 5],
                        animationDelay: `${Math.random() * 0.5}s`,
                      }}
                    />
                  ))}
                  {/* Success banner */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-6 animate-fade-in-up">
                    <div className="text-5xl mb-3">🎉</div>
                    <h3 className="text-2xl font-bold text-emerald-700 mb-2">Message Sent!</h3>
                    <p className="text-emerald-600 text-sm">
                      Thank you for reaching out. One of our team members will contact you within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm(initialForm); }}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold font-display text-gray-900 mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Floating label: Name */}
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder=" "
                          className={`peer w-full border rounded-xl px-4 pt-6 pb-2 text-sm text-gray-900 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all ${
                            errors.name ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                        <label
                          htmlFor="name"
                          className="absolute left-4 top-2 text-xs font-semibold text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs pointer-events-none"
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      {/* Floating label: Email */}
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder=" "
                          className={`peer w-full border rounded-xl px-4 pt-6 pb-2 text-sm text-gray-900 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all ${
                            errors.email ? 'border-red-400' : 'border-gray-200'
                          }`}
                        />
                        <label
                          htmlFor="email"
                          className="absolute left-4 top-2 text-xs font-semibold text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs pointer-events-none"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Floating label: Phone */}
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder=" "
                          className="peer w-full border border-gray-200 rounded-xl px-4 pt-6 pb-2 text-sm text-gray-900 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                        />
                        <label
                          htmlFor="phone"
                          className="absolute left-4 top-2 text-xs font-semibold text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs pointer-events-none"
                        >
                          Phone (optional)
                        </label>
                      </div>
                      {/* Subject */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none ${
                            errors.subject ? 'border-red-400' : 'border-gray-200'
                          }`}
                        >
                          <option value="">Select a subject</option>
                          <option value="test-drive">Schedule a Test Drive</option>
                          <option value="financing">Financing Inquiry</option>
                          <option value="vehicle-inquiry">Vehicle Inquiry</option>
                          <option value="trade-in">Trade-In Estimate</option>
                          <option value="service">Service Question</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                      </div>
                    </div>

                    {/* Message with character counter */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-semibold text-gray-700">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <span className={`text-xs font-medium ${form.message.length > MAX_MESSAGE_LENGTH * 0.9 ? 'text-red-500' : 'text-gray-400'}`}>
                          {form.message.length}/{MAX_MESSAGE_LENGTH}
                        </span>
                      </div>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        maxLength={MAX_MESSAGE_LENGTH}
                        className={`w-full border rounded-xl px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none resize-none transition-all ${
                          errors.message ? 'border-red-400' : 'border-gray-200'
                        }`}
                        placeholder="Tell us how we can help you..."
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gold-gradient text-white font-bold py-4 rounded-xl transition-all hover:shadow-glow hover:scale-[1.01] duration-200"
                    >
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Map + Quick Connect */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Map placeholder */}
            <div className="bg-navy-gradient rounded-2xl overflow-hidden h-64 flex flex-col items-center justify-center shadow-card relative">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.4) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              <div className="relative text-center">
                <div className="text-5xl mb-3 animate-float">📍</div>
                <p className="font-bold text-white text-lg">AutoElite Motors</p>
                <p className="text-gray-400 text-sm mt-1">123 AutoElite Drive</p>
                <p className="text-gray-400 text-sm">Austin, TX 78701</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors shadow-glow"
                >
                  📍 View on Google Maps
                </a>
              </div>
            </div>

            {/* Quick Connect */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-bold text-gray-900 text-lg mb-3">Quick Connect</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Prefer to talk? Give us a call and we&apos;ll connect you with the right person — whether you have questions about a specific vehicle, need help with financing, or want to schedule a test drive.
              </p>
              <a
                href="tel:5552345678"
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-amber-500 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-glow duration-200"
              >
                <Phone className="h-4 w-4" />
                (555) 234-5678
              </a>
              <a
                href="mailto:info@autoelitemotors.com"
                className="mt-3 flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-amber-400 text-gray-700 hover:text-amber-600 font-bold py-3.5 rounded-xl transition-all duration-200"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
