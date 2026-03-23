'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const locations = [
  {
    id: 'tvm',
    type: 'Head Office',
    city: 'Trivandrum',
    title: 'Trivandrum Head Office',
    desc: '1st Floor above Steel World, Karakkamandapam, Nemom P.O, Trivandrum',
    phone: '+91 9567776571',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.3980309990595!2d76.97164!3d8.46283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bb30f0a4fc7d%3A0x2e3e4f1bf0cf067e!2sKarakkamandapam%2C%20Thiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'ekm',
    type: 'Experience Center',
    city: 'Ernakulam',
    title: 'Ernakulam Experience Center',
    desc: '2nd Floor Above Union Bank, Le Meridian Road, Maradu, Ernakulam',
    phone: '+91 9946678190',
    mapSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.5!2d76.3186!3d9.9410!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0872f7f4e0e0e1%3A0x1e2e3f4a5b6c7d8e!2sMaradu%2C%20Ernakulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

const contactMethods = [
  {
    label: 'Call — Trivandrum',
    value: '+91 956 777 6571',
    href: 'tel:+919567776571',
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'Call — Service',
    value: '+91 813 788 6571',
    href: 'tel:+918137886571',
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'geekboz.frontline@gmail.com',
    href: 'mailto:geekboz.frontline@gmail.com',
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const socials = [
  {
    name: 'Instagram',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11a3 3 0 013 3v11a3 3 0 01-3 3h-11a3 3 0 01-3-3v-11a3 3 0 013-3z" />
    ),
  },
  {
    name: 'YouTube',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zM21 12c0-4.418-4.03-8-9-8s-9 3.582-9 8 4.03 8 9 8 9-3.582 9-8z" />
    ),
  },
  {
    name: 'Facebook',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    ),
  },
  {
    name: 'Twitter',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    ),
  },
];

export default function ContactSection() {
  const [activeLocation, setActiveLocation] = useState(0);
  const current = locations[activeLocation];

  return (
    <section className="relative z-10 bg-[#020202] overflow-hidden border-t border-white/5">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 opacity-[0.03]"
          style={{
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(164,249,63,1) 0%, transparent 60%)',
            filter: 'blur(120px)',
          }}
        />
        <div className="absolute bottom-0 left-0 opacity-[0.025]"
          style={{
            width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(164,249,63,1) 0%, transparent 55%)',
            filter: 'blur(100px)',
          }}
        />
        {/* Scanline texture */}
        <div className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,1) 3px, rgba(255,255,255,1) 4px)',
          }}
        />
      </div>

      {/* ── SECTION HEADER ────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16 pt-16 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-end justify-between pb-8 md:pb-10 border-b border-white/[0.06]"
        >
          <div className="flex flex-col gap-2.5">
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#A4F93F]/50 uppercase">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tighter text-white leading-[0.95]">
              Contact{' '}
              <span
                style={{
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(130deg, #A4F93F 0%, #d6ff72 52%, #A4F93F 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                Us
              </span>
              .
            </h2>
          </div>
          <p className="hidden md:block text-xs text-white/20 font-medium tracking-wide max-w-[220px] leading-relaxed text-right">
            Questions, comments? You tell us. We listen.
          </p>
        </motion.div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16 pt-10 md:pt-14 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ── LEFT: Interactive Map ───────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Map container */}
            <div
              className="relative w-full overflow-hidden group border border-white/[0.06]"
              style={{ aspectRatio: '4 / 3', borderRadius: 'clamp(14px, 2vw, 22px)' }}
            >
              {/* Hover border glow */}
              <div
                className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: 'inset 0 0 60px rgba(164,249,63,0.04)',
                  borderRadius: 'inherit',
                }}
              />

              {/* Top accent */}
              <div className="absolute top-0 inset-x-0 h-[2px] z-20 bg-gradient-to-r from-transparent via-[#A4F93F]/40 to-transparent opacity-50" />

              {/* Map iframe — keyed so it remounts on location switch */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <iframe
                    src={current.mapSrc}
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      filter: 'invert(90%) hue-rotate(180deg) contrast(95%) grayscale(30%)',
                    }}
                    allowFullScreen={false}
                    loading="lazy"
                    className="absolute inset-0 opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Active location badge */}
              <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2.5 px-4 py-2.5
                             bg-black/70 backdrop-blur-xl border border-white/[0.08]"
                style={{ borderRadius: 10 }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#A4F93F]" />
                  <motion.div
                    className="absolute w-2 h-2 rounded-full bg-[#A4F93F]"
                    animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-[10px] font-bold tracking-[0.15em] text-white/60 uppercase">
                  {current.city}
                </span>
              </div>
            </div>

            {/* ── Location toggle cards ──────────────────────────────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {locations.map((loc, i) => {
                const isActive = activeLocation === i;
                return (
                  <button
                    key={loc.id}
                    onClick={() => setActiveLocation(i)}
                    className={`relative flex items-start gap-3.5 text-left p-4 md:p-5 border overflow-hidden transition-all duration-400
                      ${isActive
                        ? 'bg-[#A4F93F]/[0.04] border-[#A4F93F]/25'
                        : 'bg-white/[0.015] border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.025]'
                      }`}
                    style={{ borderRadius: 'clamp(10px, 1.5vw, 16px)' }}
                  >
                    {/* Active top bar */}
                    {isActive && (
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-[2px] bg-[#A4F93F]"
                        layoutId="locationBar"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}

                    {/* Icon */}
                    <div
                      className={`w-10 h-10 shrink-0 flex items-center justify-center border transition-all duration-400
                        ${isActive
                          ? 'border-[#A4F93F]/25 bg-[#A4F93F]/[0.08] text-[#A4F93F]'
                          : 'border-white/[0.06] bg-white/[0.02] text-white/25'
                        }`}
                      style={{ borderRadius: 10 }}
                    >
                      {loc.icon}
                    </div>

                    {/* Text */}
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className={`text-[9px] font-bold tracking-[0.2em] uppercase transition-colors duration-300
                        ${isActive ? 'text-[#A4F93F]/60' : 'text-white/20'}`}>
                        {loc.type}
                      </span>
                      <span className={`text-sm font-bold tracking-tight transition-colors duration-300 truncate
                        ${isActive ? 'text-white' : 'text-white/50'}`}>
                        {loc.city}
                      </span>
                      <span className={`text-[11px] font-medium tracking-tight transition-colors duration-300 line-clamp-2 leading-relaxed
                        ${isActive ? 'text-white/35' : 'text-white/15'}`}>
                        {loc.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ── RIGHT: Contact details ──────────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* ── Contact methods ───────────────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              <p className="text-[9px] font-bold tracking-[0.35em] text-white/15 uppercase mb-2">
                Direct Lines
              </p>
              {contactMethods.map((method, i) => (
                <motion.a
                  key={i}
                  href={method.href}
                  className="group/item flex items-center gap-5 p-4 md:p-5
                             bg-white/[0.015] border border-white/[0.05]
                             hover:border-[#A4F93F]/20 hover:bg-[#A4F93F]/[0.02]
                             transition-all duration-400"
                  style={{ borderRadius: 'clamp(10px, 1.5vw, 16px)' }}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 shrink-0 flex items-center justify-center border
                               border-white/[0.06] bg-white/[0.02] text-white/25
                               group-hover/item:border-[#A4F93F]/25 group-hover/item:bg-[#A4F93F]/[0.06]
                               group-hover/item:text-[#A4F93F] transition-all duration-400"
                    style={{ borderRadius: 10 }}
                  >
                    {method.icon}
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="text-[9px] font-bold tracking-[0.2em] text-white/20 uppercase">
                      {method.label}
                    </span>
                    <span className="text-sm md:text-[15px] font-bold tracking-tight text-white/60 group-hover/item:text-white transition-colors duration-300 truncate">
                      {method.value}
                    </span>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="w-4 h-4 text-white/10 group-hover/item:text-[#A4F93F] group-hover/item:translate-x-1 transition-all duration-300 shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              ))}
            </div>

            {/* ── Active location detail ────────────────────────────────────── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="p-5 md:p-6 border border-white/[0.05] bg-white/[0.015]"
                style={{ borderRadius: 'clamp(10px, 1.5vw, 16px)' }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-10 h-10 shrink-0 flex items-center justify-center border border-[#A4F93F]/20 bg-[#A4F93F]/[0.06] text-[#A4F93F]"
                    style={{ borderRadius: 10 }}
                  >
                    {current.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold tracking-[0.2em] text-[#A4F93F]/50 uppercase">
                      {current.type}
                    </span>
                    <span className="text-base font-bold tracking-tight text-white">
                      {current.title}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-white/30 leading-relaxed tracking-tight mb-3 pl-14">
                  {current.desc}
                </p>
                <div className="flex items-center gap-2 pl-14">
                  <svg className="w-3.5 h-3.5 text-[#A4F93F]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${current.phone.replace(/\s/g, '')}`}
                    className="text-sm font-bold tracking-tight text-[#A4F93F]/70 hover:text-[#A4F93F] transition-colors">
                    {current.phone}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* ── Socials ──────────────────────────────────────────────────── */}
            <div className="flex items-center gap-5 pt-2">
              <span className="text-[9px] font-bold tracking-[0.3em] text-white/15 uppercase">
                Follow
              </span>
              <div className="h-px flex-1 bg-white/[0.04]" />
              <div className="flex gap-2.5">
                {socials.map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label={social.name}
                    className="w-10 h-10 border border-white/[0.06] flex items-center justify-center
                               text-white/25 hover:text-black hover:bg-[#A4F93F] hover:border-[#A4F93F]
                               transition-all duration-300
                               hover:shadow-[0_0_20px_rgba(164,249,63,0.2)]"
                    style={{ borderRadius: 10 }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {social.icon}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}