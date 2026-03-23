'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const features = [
  { label: 'Doorstep', value: 'Setup & Repair' },
  { label: 'Response', value: 'Under 24 Hrs' },
  { label: 'Coverage', value: 'Pan India' },
];

export default function HomeServiceCTA() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section className="relative z-10 bg-[#020202] overflow-hidden border-t border-white/5">

      {/* ── FULL-WIDTH ATMOSPHERIC BACKGROUND ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[5%]"
          src="/assets/background%20video/vecteezy_abstract-dark-waves-smoothly-flow-with-teal-and-orange_71754821.mp4"
        />

        {/* Concentric radar rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04]">
          {[800, 600, 400, 200].map((size) => (
            <div
              key={size}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#A4F93F]"
              style={{ width: size, height: size }}
            />
          ))}
        </div>

        {/* Diagonal scan lines */}
        <div className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 4px, rgba(255,255,255,1) 4px, rgba(255,255,255,1) 5px)',
          }}
        />

        {/* Top-left ambient glow */}
        <div className="absolute -top-32 -left-32"
          style={{
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(164,249,63,0.05) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />

        {/* Bottom-right ambient glow */}
        <div className="absolute -bottom-40 -right-40"
          style={{
            width: 700, height: 700,
            background: 'radial-gradient(circle, rgba(164,249,63,0.04) 0%, transparent 55%)',
            filter: 'blur(90px)',
          }}
        />
      </div>

      {/* ── SECTION HEADER ────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16 pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-end justify-between pb-6 md:pb-8 border-b border-white/[0.06]"
        >
          <div className="flex flex-col gap-2.5">
            <p className="text-[10px] font-bold tracking-[0.4em] text-[#A4F93F]/50 uppercase">
              GeekBoz Care
            </p>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tighter text-white leading-[0.95]">
              Home{' '}
              <span
                style={{
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(130deg, #A4F93F 0%, #d6ff72 52%, #A4F93F 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                }}
              >
                Service
              </span>.
            </h2>
          </div>

          {/* Service ID badge — desktop */}
          <div className="hidden md:flex flex-col items-end gap-1">
            <span className="text-[9px] font-bold tracking-[0.3em] text-white/15 uppercase">Service Program</span>
            <span className="text-2xl font-black tracking-tight text-white/10">GBZ—OS</span>
          </div>
        </motion.div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16 pt-10 md:pt-12 pb-16 md:pb-20">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-center">

          {/* ── LEFT: Image showcase ────────────────────────────────────────── */}
          <motion.div
            className="lg:w-[55%] w-full relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Image frame */}
            <div className="relative overflow-hidden group"
              style={{ borderRadius: 'clamp(16px, 2vw, 24px)' }}
            >
              {/* Green edge glow on hover */}
              <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  boxShadow: 'inset 0 0 80px rgba(164,249,63,0.06), 0 0 60px rgba(164,249,63,0.04)',
                  borderRadius: 'inherit',
                }}
              />

              {/* Top accent bar */}
              <div className="absolute top-0 inset-x-0 h-[2px] z-20 bg-gradient-to-r from-transparent via-[#A4F93F]/50 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Image */}
              <div className="relative overflow-hidden" style={{ borderRadius: 'inherit' }}>
                <img
                  src="/assets/brandassets/GBZ-OnSIte-Service-Program.webp"
                  alt="GeekBoz On-Site Service Program"
                  className="w-full h-auto object-contain
                             group-hover:scale-[1.03] transition-transform duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)]"
                />

                {/* Bottom gradient overlay */}
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-[#020202] to-transparent z-10" />
              </div>

              {/* Floating badge over image */}
              <motion.div
                className="absolute bottom-6 left-6 z-20 flex items-center gap-3 px-5 py-3
                           bg-black/60 backdrop-blur-xl border border-white/[0.08]"
                style={{ borderRadius: 12 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#A4F93F]" />
                  <motion.div
                    className="absolute w-2.5 h-2.5 rounded-full bg-[#A4F93F]"
                    animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-[11px] font-bold tracking-wider text-white/70 uppercase">
                  Now Booking
                </span>
              </motion.div>
            </div>

            {/* ── FEATURE STATS ROW — below image ─────────────────────────── */}
            <div className="flex gap-0 mt-5" style={{ borderRadius: 'clamp(12px, 1.5vw, 18px)', overflow: 'hidden' }}>
              {features.map((feat, i) => (
                <motion.div
                  key={feat.label}
                  className="flex-1 flex flex-col gap-1.5 border border-white/[0.05] bg-[#080808] relative overflow-hidden"
                  style={{
                    padding: 'clamp(16px, 2vw, 24px)',
                    borderRadius: 0,
                    borderLeft: i === 0 ? undefined : 'none',
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  <span className="text-[9px] font-bold tracking-[0.25em] text-white/20 uppercase">
                    {feat.label}
                  </span>
                  <span className="text-sm md:text-base font-extrabold text-white tracking-tight leading-tight">
                    {feat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Copy + CTA ───────────────────────────────────────────── */}
          <motion.div
            className="lg:w-[45%] w-full flex flex-col items-start"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Pill tag */}
            <motion.div
              className="flex items-center gap-2.5 mb-8 px-4 py-2 border border-[#A4F93F]/15 bg-[#A4F93F]/[0.04]"
              style={{ borderRadius: 100 }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <svg className="w-3.5 h-3.5 text-[#A4F93F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#A4F93F]/70 uppercase">
                At Your Doorstep
              </span>
            </motion.div>

            {/* Headline */}
            <h3 className="text-3xl md:text-4xl xl:text-[2.75rem] font-black tracking-tight text-white leading-[1.1] mb-6">
              Premium care,{' '}
              <span className="text-white/30">delivered to your setup.</span>
            </h3>

            {/* Animated accent line */}
            <motion.div
              className="h-[3px] bg-gradient-to-r from-[#A4F93F] to-[#A4F93F]/20 mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            />

            {/* Description */}
            <p className="text-white/35 text-base md:text-lg leading-[1.75] font-medium tracking-tight mb-10 max-w-lg">
              Your PC deserves premium care — anywhere. GeekBoz Home Service brings 
              pro-level support, upgrades, and performance tuning straight to your setup. 
              No travel. No downtime. Just pure performance.
            </p>

            {/* Service highlights */}
            <div className="flex flex-col gap-4 mb-12 w-full">
              {[
                'Expert technicians at your location',
                'Full hardware diagnostics & stress testing',
                'Upgrades, cleaning & thermal repaste',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                >
                  <div className="w-5 h-5 shrink-0 flex items-center justify-center border border-[#A4F93F]/20 bg-[#A4F93F]/[0.06]"
                    style={{ borderRadius: 6 }}
                  >
                    <svg className="w-3 h-3 text-[#A4F93F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-white/40 font-medium tracking-tight">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <motion.button
                className="group/btn relative flex items-center gap-4 bg-[#A4F93F] text-black font-extrabold uppercase tracking-[0.15em]
                           text-[11px] px-10 py-4 overflow-hidden
                           hover:shadow-[0_0_50px_-10px_rgba(164,249,63,0.5)]
                           transition-all duration-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Shine sweep on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                <span className="relative z-10">Book Doorstep Service</span>
                <svg className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>

            </div>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM EDGE ───────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16 pb-16 md:pb-20">
        <div className="h-px bg-white/[0.04]" />
      </div>
    </section>
  );
}