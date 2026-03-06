'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';

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
      title: 'Address',
      lines: ['123 AutoElite Drive', 'Austin, TX 78701'],
    },
    {
      icon: Phone,
      title: 'Phone',
      lines: ['(555) 234-5678'],
    },
    {
      icon: Mail,
      title: 'Email',
      lines: ['info@autoelitemotors.com'],
    },
    {
      icon: Clock,
      title: 'Hours',
      lines: ['Mon–Fri: 9am – 7pm', 'Sat: 9am – 6pm', 'Sun: 11am – 5pm'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate-900 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-400 text-lg">Our team is here to help. Reach out anytime.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {contactInfo.map(({ icon: Icon, title, lines }) => (
            <div key={title} className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon className="h-5 w-5 text-amber-600" />
              </div>
              <p className="font-semibold text-gray-900 text-sm mb-1">{title}</p>
              {lines.map((line) => (
                <p key={line} className="text-gray-500 text-xs">{line}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">
                    Thank you for reaching out. One of our team members will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm(initialForm); }}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent ${
                            errors.name ? 'border-red-400' : 'border-gray-200'
                          }`}
                          placeholder="John Smith"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent ${
                            errors.email ? 'border-red-400' : 'border-gray-200'
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                          placeholder="(555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent ${
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-amber-400 focus:border-transparent resize-none ${
                          errors.message ? 'border-red-400' : 'border-gray-200'
                        }`}
                        placeholder="Tell us how we can help you..."
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Map placeholder + info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-slate-800 rounded-2xl overflow-hidden h-64 flex items-center justify-center shadow-sm">
              <div className="text-center text-gray-400">
                <MapPin className="h-10 w-10 mx-auto mb-2 text-amber-400" />
                <p className="font-semibold text-white">AutoElite Motors</p>
                <p className="text-sm">123 AutoElite Drive</p>
                <p className="text-sm">Austin, TX 78701</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-3">Quick Connect</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Prefer to talk? Give us a call and we&apos;ll connect you with the right person — whether you have questions about a specific vehicle, need help with financing, or want to schedule a test drive.
              </p>
              <a
                href="tel:5552345678"
                className="mt-4 flex items-center justify-center gap-2 bg-slate-900 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition-colors"
              >
                <Phone className="h-4 w-4" />
                (555) 234-5678
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
