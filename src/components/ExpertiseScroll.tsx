'use client';

import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const services = [
  {
    id: "01",
    title: "Secured Shipping",
    desc: "Every build is double-boxed with custom foam inserts and real-time GPS tracking. Best in class brand support and uncompromised quality.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M8 16L24 8L40 16V32L24 40L8 32V16Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M24 8V40" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
        <path d="M8 16L24 24L40 16" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
        <path d="M17 20V30L24 34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="20" r="2" fill="currentColor" fillOpacity="0.6" />
        <path d="M20 12L28 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.15" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Best Quality",
    desc: "We hand-pick every component and run 72-hour burn-in stress tests. Only premium, verified parts make it into your build.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M24 6L28.9 17.2L41 18.9L32 27.5L34.2 39.5L24 34L13.8 39.5L16 27.5L7 18.9L19.1 17.2L24 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M24 6V34" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.15" />
        <circle cx="24" cy="22" r="5" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
        <path d="M22 22L23.5 23.5L27 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Best Offers",
    desc: "Exclusive bundles and flash drops you won't find anywhere else. Lightning deals across the gaming industry, updated weekly.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path d="M28 6L18 26H24L20 42L34 20H26L28 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M28 6L18 26H24L20 42L34 20H26L28 6Z" fill="currentColor" fillOpacity="0.08" />
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1" strokeOpacity="0.12" strokeDasharray="3 4" />
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.06" strokeDasharray="2 6" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Secure Payments",
    desc: "Direct bank transfer and GPay options let you skip online gateways entirely. Zero fees, zero hassle, maximum peace of mind.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="8" y="14" width="32" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 22H40" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
        <rect x="13" y="28" width="10" height="3" rx="1" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
        <circle cx="33" cy="29" r="3" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" />
        <circle cx="37" cy="29" r="3" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.3" />
        <path d="M20 10L24 14L28 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" />
      </svg>
    ),
  }
];

export default function ExpertiseScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  // ── MOBILE: Vertical stacked cards ──────────────────────────────────────────
  if (isMobile) {
    return (
      <section className="relative bg-[#020202] border-t border-white/5 py-12 sm:py-16 overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <video autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-[0.05]"
            src="/assets/background%20video/vecteezy_glossy-black-wave-form-flowing-continuously-over-dark_74325729.mp4"
          />
        </div>

        {/* Header */}
        <div className="relative z-10 px-4 sm:px-6 mb-8 sm:mb-10">
          <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.4em] text-[#A4F93F]/50 uppercase mb-2">
            Why GeekBoz
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-white leading-[0.95]">
            Our{' '}
            <span style={{
              color: 'transparent',
              backgroundImage: 'linear-gradient(130deg, #A4F93F 0%, #d6ff72 52%, #A4F93F 100%)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
            }}>
              Promise
            </span>.
          </h2>
          <p className="text-[13px] text-white/40 font-medium tracking-tight mt-3 max-w-xs leading-relaxed">
            Every detail engineered for trust — from sourcing to shipping.
          </p>
        </div>

        {/* Divider */}
        <div className="mx-4 sm:mx-6 h-px bg-white/[0.06] mb-6 sm:mb-8" />

        {/* Stacked cards */}
        <div className="relative z-10 flex flex-col gap-3 sm:gap-4 px-4 sm:px-6">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
              className="relative group overflow-hidden border border-white/[0.06]
                         active:border-[#A4F93F]/25 transition-all duration-300"
              style={{
                background: 'linear-gradient(168deg, #0a0a0a 0%, #060606 100%)',
                borderRadius: 14,
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-[#A4F93F]/40 via-[#A4F93F]/20 to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-300" />

              <div className="p-5 sm:p-6 flex gap-4 sm:gap-5">
                {/* Icon */}
                <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center
                               border border-white/[0.08] text-white/30"
                  style={{
                    borderRadius: 10,
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
                  }}
                >
                  <div className="w-[55%] h-[55%]">{service.icon}</div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#A4F93F]/30 tracking-tight">{service.id}</span>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-[13px] sm:text-sm text-white/55 leading-[1.6] font-medium tracking-tight">
                    {service.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // ── DESKTOP: Horizontal scroll ──────────────────────────────────────────────
  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#020202] border-t border-white/5">
      <div className="sticky top-0 flex flex-col h-[100svh] overflow-hidden">

        {/* Background Video */}
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
          <video autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-[0.05]"
            src="/assets/background%20video/vecteezy_glossy-black-wave-form-flowing-continuously-over-dark_74325729.mp4"
          />
        </div>

        {/* Background watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          <h2 className="text-[13vw] font-black tracking-tighter text-white opacity-[0.02] select-none whitespace-nowrap uppercase">
            Why Us
          </h2>
        </div>

        {/* Ambient floor glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
          style={{
            width: '80vw', height: '320px',
            background: 'radial-gradient(ellipse at center bottom, rgba(164,249,63,0.04) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* ── TOP HEADER ─────────────────────────────────────────────── */}
        <div className="relative z-20 flex items-end justify-between px-6 md:px-8 lg:px-10 xl:px-16 pt-20 md:pt-24 lg:pt-28 xl:pt-32 pb-6 md:pb-8 lg:pb-10 shrink-0">
          <div className="flex flex-col gap-1.5 md:gap-2">
            <p className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] text-[#A4F93F]/50 uppercase">
              Why GeekBoz
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tighter text-white leading-[0.95]">
              Our{' '}
              <span style={{
                color: 'transparent',
                backgroundImage: 'linear-gradient(130deg, #A4F93F 0%, #d6ff72 52%, #A4F93F 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
              }}>
                Promise
              </span>.
            </h2>
          </div>
          <p className="hidden md:block text-[11px] lg:text-xs text-white/35 font-medium tracking-wide max-w-[240px] leading-relaxed text-right">
            Every detail engineered for trust — from sourcing to shipping.
          </p>
        </div>

        {/* Divider */}
        <div className="mx-6 md:mx-8 lg:mx-10 xl:mx-16 h-px bg-white/[0.06] shrink-0" />

        {/* ── SLIDING CARDS ──────────────────────────────────────────── */}
        <div className="flex-1 flex items-center relative z-10">
          <motion.div
            style={{ x }}
            className="flex gap-4 md:gap-5 lg:gap-6 w-[400vw] h-[75%] items-center"
          >
            {/* Left padding */}
            <div className="shrink-0 w-6 md:w-8 lg:w-10 xl:w-16" />

            {services.map((service) => (
              <div
                key={service.id}
                className="shrink-0 h-full flex flex-col justify-between
                           relative group overflow-hidden
                           border border-white/[0.06] hover:border-[#A4F93F]/25
                           transition-all duration-500"
                style={{
                  width: 'clamp(320px, 34vw, 520px)',
                  background: 'linear-gradient(168deg, #0a0a0a 0%, #060606 100%)',
                  borderRadius: 'clamp(14px, 1.6vw, 22px)',
                  padding: 'clamp(24px, 3vw, 48px)',
                }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#A4F93F] via-[#A4F93F]/60 to-transparent
                               transform -translate-x-full group-hover:translate-x-0
                               transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 100% 0%, rgba(164,249,63,0.06) 0%, transparent 70%)',
                  }}
                />

                {/* ── TOP: Number + Icon ──────────────────────────────── */}
                <div className="flex justify-between items-start">
                  <span className="font-mono font-bold tracking-tighter
                                   text-white/[0.06] group-hover:text-[#A4F93F]/15
                                   transition-colors duration-500"
                    style={{ fontSize: 'clamp(56px, 6vw, 96px)', lineHeight: 0.85 }}
                  >
                    {service.id}
                  </span>

                  <div
                    className="relative border border-white/[0.08] group-hover:border-[#A4F93F]/25
                               flex items-center justify-center
                               text-white/30 group-hover:text-[#A4F93F]
                               transition-all duration-500
                               group-hover:shadow-[0_0_30px_rgba(164,249,63,0.06)]"
                    style={{
                      width: 'clamp(44px, 4.5vw, 64px)',
                      height: 'clamp(44px, 4.5vw, 64px)',
                      borderRadius: 'clamp(10px, 1.2vw, 16px)',
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))',
                    }}
                  >
                    <div style={{ width: '55%', height: '55%' }}>
                      {service.icon}
                    </div>
                    <div className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(164,249,63,0.06) 0%, transparent 70%)',
                      }}
                    />
                  </div>
                </div>

                {/* ── BOTTOM: Title + Description ─────────────────────── */}
                <div className="flex flex-col gap-3 md:gap-4">
                  <h3
                    className="font-black tracking-tight text-white leading-[1.05]
                               group-hover:text-[#A4F93F] transition-colors duration-400"
                    style={{ fontSize: 'clamp(22px, 2.5vw, 42px)' }}
                  >
                    {service.title}
                  </h3>

                  <p
                    className="text-white/50 leading-[1.7] font-medium tracking-tight
                               group-hover:text-white/70 transition-colors duration-500"
                    style={{
                      fontSize: 'clamp(13px, 1.2vw, 16px)',
                      maxWidth: '480px',
                    }}
                  >
                    {service.desc}
                  </p>

                  {/* Hover link */}
                  <div className="flex items-center gap-3 mt-1 opacity-0 translate-y-2
                                 group-hover:opacity-100 group-hover:translate-y-0
                                 transition-all duration-500 delay-100">
                    <div className="w-5 h-px bg-[#A4F93F]/40" />
                    <span className="text-[9px] md:text-[10px] font-bold tracking-[0.25em] uppercase text-[#A4F93F]/50">
                      Learn more
                    </span>
                  </div>
                </div>

                {/* Scanline texture */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)',
                  }}
                />
              </div>
            ))}

            {/* Right padding */}
            <div className="shrink-0 w-6 md:w-16" />
          </motion.div>
        </div>

        {/* Bottom progress indicator */}
        <div className="absolute bottom-6 md:bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 md:gap-4 pointer-events-none">
          <span className="text-[8px] md:text-[9px] font-bold tracking-[0.35em] text-white/20 uppercase">Scroll</span>
          <div className="w-16 md:w-20 lg:w-24 h-px bg-white/[0.08] relative overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#A4F93F]/50 rounded-full"
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            />
          </div>
          <span className="text-[8px] md:text-[9px] font-bold tracking-[0.35em] text-white/20 tabular-nums">04</span>
        </div>
      </div>
    </section>
  );
}