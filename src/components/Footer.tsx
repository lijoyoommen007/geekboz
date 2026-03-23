'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const aboutLinks = [
  { label: 'GBZ Team', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Our Stores', href: '#' },
  { label: 'Testimonials', href: '#' },
];

const customerLinks = [
  { label: 'Help & FAQs', href: '#' },
  { label: 'Order Tracking', href: '#' },
  { label: 'Shipping & Delivery', href: '#' },
  { label: 'Orders History', href: '#' },
  { label: 'Login', href: '#' },
];

const infoLinks = [
  { label: 'General Terms and Conditions', href: '#' },
  { label: 'Warranty Policy', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Cancellation & Refund', href: '#' },
  { label: 'Sales Terms and Conditions', href: '#' },
];

const socials = [
  {
    name: 'Facebook',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    ),
  },
  {
    name: 'YouTube',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zM21 12c0-4.418-4.03-8-9-8s-9 3.582-9 8 4.03 8 9 8 9-3.582 9-8z" />
    ),
  },
  {
    name: 'Instagram',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11a3 3 0 013 3v11a3 3 0 01-3 3h-11a3 3 0 01-3-3v-11a3 3 0 013-3z" />
    ),
  },
  {
    name: 'Twitter',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    ),
  },
];

const contactInfo = [
  { label: 'Trivandrum', value: '+91 956 777 6571' },
  { label: 'Ernakulam', value: '+91 994 667 8190' },
  { label: 'Service', value: '+91 813 788 6571' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040404] border-t border-white/[0.06] text-white z-[60] overflow-hidden">
      {/* ── Background atmosphere ──────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: '100%',
            height: 500,
            background: 'radial-gradient(ellipse at center top, rgba(164,249,63,0.03) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)',
          }}
        />
      </div>

      {/* ── TOP BAND: Brand + Newsletter ───────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 py-14 md:py-16 border-b border-white/[0.05]">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-md">
            <div className="flex items-center gap-3">
              {/* Logo mark */}
              <a href="/" className="shrink-0 transition-transform hover:scale-105 duration-300">
                <img 
                  src="/assets/brandassets/GEEKBOZ-BRAND-logo-2-copy.webp" 
                  alt="GeekBoz" 
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </a>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white leading-none">GeekBoz</span>
                <span className="text-[9px] font-bold tracking-[0.25em] text-white/20 uppercase">Pvt. Ltd</span>
              </div>
            </div>
            <p className="text-sm text-white/25 leading-relaxed font-medium tracking-tight mt-1">
              Premium custom PC builds, upgrades, and doorstep service across India. Built by enthusiasts, for enthusiasts.
            </p>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3 w-full lg:w-auto">
            <span className="text-[10px] font-bold tracking-[0.3em] text-white/25 uppercase">
              Stay Updated
            </span>
            <div className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 lg:w-72 bg-white/[0.03] border border-white/[0.08] border-r-0 text-sm text-white
                           px-5 py-3.5 placeholder:text-white/20
                           focus:outline-none focus:border-[#A4F93F]/30 focus:bg-white/[0.04]
                           transition-all duration-300"
                style={{ borderRadius: '10px 0 0 10px' }}
              />
              <button
                className="px-6 py-3.5 bg-[#A4F93F] text-black text-[11px] font-extrabold tracking-[0.12em] uppercase
                           hover:bg-[#d6ff72] transition-colors duration-300 shrink-0"
                style={{ borderRadius: '0 10px 10px 0' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN LINKS GRID ────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* ── Column: Customer Service ─────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
              Customer Service
            </h4>
            <ul className="flex flex-col gap-3">
              {customerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group/link flex items-center gap-2 text-[13px] text-white/30 hover:text-white font-medium tracking-tight transition-colors duration-300"
                  >
                    <span className="w-0 group-hover/link:w-3 h-px bg-[#A4F93F] transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column: About Us ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
              About Us
            </h4>
            <ul className="flex flex-col gap-3">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group/link flex items-center gap-2 text-[13px] text-white/30 hover:text-white font-medium tracking-tight transition-colors duration-300"
                  >
                    <span className="w-0 group-hover/link:w-3 h-px bg-[#A4F93F] transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column: Information ──────────────────────────────────────── */}
          <div className="flex flex-col gap-5 col-span-2 md:col-span-1">
            <h4 className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
              Information
            </h4>
            <ul className="flex flex-col gap-3">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group/link flex items-center gap-2 text-[13px] text-white/30 hover:text-white font-medium tracking-tight transition-colors duration-300"
                  >
                    <span className="w-0 group-hover/link:w-3 h-px bg-[#A4F93F] transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column: Contact ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <h4 className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-white/15 uppercase">
                    {info.label}
                  </span>
                  <a
                    href={`tel:${info.value.replace(/\s/g, '')}`}
                    className="text-[13px] text-white/40 hover:text-[#A4F93F] font-medium tracking-tight transition-colors duration-300"
                  >
                    {info.value}
                  </a>
                </div>
              ))}
              <div className="flex flex-col gap-0.5 mt-1">
                <span className="text-[9px] font-bold tracking-[0.2em] text-white/15 uppercase">
                  Email
                </span>
                <a
                  href="mailto:geekboz.frontline@gmail.com"
                  className="text-[13px] text-white/40 hover:text-[#A4F93F] font-medium tracking-tight transition-colors duration-300 break-all"
                >
                  geekboz.frontline@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* ── Column: Social + Search ──────────────────────────────────── */}
          <div className="flex flex-col gap-8">
            {/* Social */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
                Follow Us
              </h4>
              <div className="flex gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    aria-label={social.name}
                    className="w-10 h-10 border border-white/[0.06] bg-white/[0.02]
                               flex items-center justify-center
                               text-white/25 hover:text-black hover:bg-[#A4F93F] hover:border-[#A4F93F]
                               hover:shadow-[0_0_18px_rgba(164,249,63,0.2)]
                               transition-all duration-300"
                    style={{ borderRadius: 10 }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Search */}
            <div className="flex flex-col gap-3">
              <h4 className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
                Search
              </h4>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 min-w-0 bg-white/[0.03] border border-white/[0.08] border-r-0 text-sm text-white
                             px-4 py-2.5 placeholder:text-white/20
                             focus:outline-none focus:border-[#A4F93F]/30
                             transition-colors duration-300"
                  style={{ borderRadius: '8px 0 0 8px' }}
                />
                <button
                  className="px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.08] border-l-0
                             text-white/30 hover:text-[#A4F93F] hover:bg-[#A4F93F]/[0.06]
                             transition-all duration-300"
                  style={{ borderRadius: '0 8px 8px 0' }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ─────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16">
        <div className="border-t border-white/[0.05] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-[11px] text-white/20 tracking-tight font-medium text-center md:text-left">
            &copy; 2017–2027 GeekBoz Pvt. Ltd. All rights reserved.
          </p>

          {/* Bottom links */}
          <div className="flex items-center gap-5">
            <a href="#" className="text-[11px] text-white/15 hover:text-white/40 font-medium tracking-tight transition-colors duration-300">
              Privacy
            </a>
            <span className="text-white/[0.06]">|</span>
            <a href="#" className="text-[11px] text-white/15 hover:text-white/40 font-medium tracking-tight transition-colors duration-300">
              Terms
            </a>
            <span className="text-white/[0.06]">|</span>
            <a href="#" className="text-[11px] text-white/15 hover:text-white/40 font-medium tracking-tight transition-colors duration-300">
              Sitemap
            </a>
          </div>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            title="Back to top"
            className="group w-10 h-10 border border-white/[0.06] bg-white/[0.02]
                       hover:bg-[#A4F93F]/[0.08] hover:border-[#A4F93F]/30 hover:text-[#A4F93F]
                       text-white/25 flex items-center justify-center
                       transition-all duration-300"
            style={{ borderRadius: 10 }}
          >
            <svg
              className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}