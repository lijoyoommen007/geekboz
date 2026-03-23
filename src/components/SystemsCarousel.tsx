'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import ProductCard from '@/components/ProductCard';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const systems = [
  {
    id: "predator", name: "Apex Predator", category: "Gaming",
    image: "/assets/product/product1.png",
    originalPrice: 4200, offerPrice: 3999, discount: 5,
    specs: { cpu: "i9-14900K", gpu: "RTX 4090", ram: "64GB DDR5", storage: "4TB NVMe" }
  },
  {
    id: "creator", name: "Creator X1", category: "Workstation",
    image: "/assets/product/product2.png",
    originalPrice: 2800, offerPrice: 2499, discount: 11,
    specs: { cpu: "Ryzen 9 7950X", gpu: "RTX 4080S", ram: "128GB DDR5", storage: "2TB NVMe" }
  },
  {
    id: "quantum", name: "Quantum AI", category: "Deep Learning",
    image: "/assets/product/product3.png",
    originalPrice: 8900, offerPrice: 8499, discount: 4,
    specs: { cpu: "TR PRO 5995WX", gpu: "Dual RTX 6000", ram: "256GB ECC", storage: "8TB U.2" }
  },
  {
    id: "sentinel", name: "Sentinel Core", category: "Gaming",
    image: "/assets/product/product4.png",
    originalPrice: 1900, offerPrice: 1699, discount: 10,
    specs: { cpu: "Ryzen 7 7800X3D", gpu: "RTX 4070 Ti", ram: "32GB DDR5", storage: "2TB NVMe" }
  },
  {
    id: "phantom", name: "Phantom Edge", category: "SFF Gaming",
    image: "/assets/product/product5.png",
    originalPrice: 2400, offerPrice: 2199, discount: 8,
    specs: { cpu: "i7-14700K", gpu: "RTX 4080", ram: "64GB DDR5", storage: "2TB NVMe" }
  },
  {
    id: "nova", name: "Nova Mini", category: "Creative",
    image: "/assets/product/product6.png",
    originalPrice: 1600, offerPrice: 1499, discount: 6,
    specs: { cpu: "i5-14600K", gpu: "RTX 4070S", ram: "32GB DDR5", storage: "1TB NVMe" }
  }
];

const CARD_COUNT = systems.length;

// ─── RESPONSIVE SIZING ───────────────────────────────────────────────────────

function useCarouselSizing() {
  const [sizing, setSizing] = useState({ cardW: 460, slotSpacing: 400, stageH: 680 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1536) {
        setSizing({ cardW: 460, slotSpacing: 400, stageH: 680 });
      } else if (w >= 1280) {
        setSizing({ cardW: 420, slotSpacing: 360, stageH: 650 });
      } else if (w >= 1024) {
        setSizing({ cardW: 380, slotSpacing: 320, stageH: 600 });
      } else {
        setSizing({ cardW: 340, slotSpacing: 280, stageH: 560 });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return sizing;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function getScale(absDist: number): number {
  if (absDist <= 0) return 1.00;
  if (absDist <= 1) return 1.00 + (0.58 - 1.00) * clamp(absDist, 0, 1);
  if (absDist <= 2) return 0.58 + (0.50 - 0.58) * clamp(absDist - 1, 0, 1);
  return 0.50;
}

// ─── AMBIENT GLOW ────────────────────────────────────────────────────────────

function ActiveGlow({ on }: { on: boolean }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ inset: '-64px', zIndex: 0, borderRadius: 36 }}
      animate={{ opacity: on ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 36,
        background: 'radial-gradient(ellipse 85% 65% at 50% 115%, rgba(164,249,63,0.12) 0%, transparent 68%)',
      }} />
      <motion.div
        style={{
          position: 'absolute', inset: 0, borderRadius: 36,
          background: 'radial-gradient(ellipse 95% 95% at 50% 50%, rgba(164,249,63,0.06) 0%, transparent 60%)',
        }}
        animate={on ? { scale: [1, 1.07, 1], opacity: [0.65, 1, 0.65] } : {}}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute',
          inset: 63,
          borderRadius: 20,
          background: 'conic-gradient(from 0deg, transparent 50%, rgba(164,249,63,0.28) 72%, rgba(164,249,63,0.10) 84%, transparent 100%)',
        }}
        animate={on ? { rotate: 360 } : {}}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
      />
      <div style={{
        position: 'absolute', inset: 64, borderRadius: 19, background: '#020202',
      }} />
    </motion.div>
  );
}

// ─── CARD SLOT ────────────────────────────────────────────────────────────────

interface CardSlotProps {
  sys: typeof systems[0];
  index: number;
  activeIndex: number;
  onFocusClick: (i: number) => void;
  cardW: number;
  slotSpacing: number;
}

function CardSlot({ sys, index, activeIndex, onFocusClick, cardW, slotSpacing }: CardSlotProps) {
  const [hovered, setHovered] = useState(false);

  const dist = index - activeIndex;
  const absDist = Math.abs(dist);
  const isActive = absDist < 0.45;

  const baseScale = getScale(absDist);
  const scale = hovered ? (isActive ? 1.018 : baseScale + 0.028) : baseScale;
  const x = dist * slotSpacing;
  const y = isActive ? -22 : Math.min(absDist * absDist * 8, 40);
  const opacity = clamp(1 - absDist * 0.34, 0.30, 1.0);
  const rotate = dist * 1.1;
  const blurPx = 0;
  const zIndex = Math.round(100 - absDist * 22);

  return (
    <motion.div
      className="absolute"
      style={{
        width: cardW,
        zIndex,
        willChange: 'transform, opacity',
        cursor: isActive ? 'default' : 'pointer',
        transformOrigin: 'center bottom',
      }}
      animate={{ x, y, scale, opacity, rotate, filter: `blur(${blurPx}px)` }}
      transition={{ type: 'spring', stiffness: 48, damping: 17, mass: 1.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => { if (!isActive) onFocusClick(index); }}
    >
      <ActiveGlow on={isActive} />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius: 20, zIndex: 1 }}
        animate={{
          boxShadow: isActive
            ? '0 60px 160px rgba(0,0,0,0.92), 0 0 0 1px rgba(164,249,63,0.15), 0 0 100px rgba(164,249,63,0.05)'
            : '0 6px 20px rgba(0,0,0,0.38)',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <ProductCard {...sys} delay={0} />
      </div>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ borderRadius: 20, zIndex: 3, background: '#020202' }}
        animate={{ opacity: isActive ? 0 : clamp(absDist * 0.26, 0, 0.44) }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );
}

// ─── PROGRESS DOTS ────────────────────────────────────────────────────────────

function ProgressDots({
  active, total, onDotClick,
}: { active: number; total: number; onDotClick: (i: number) => void }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {Array.from({ length: total }).map((_, i) => {
        const isOn = Math.round(active) === i;
        return (
          <button key={i} onClick={() => onDotClick(i)} className="focus:outline-none"
            aria-label={`Select ${systems[i].name}`}>
            <motion.div
              style={{ borderRadius: 99 }}
              animate={{
                width: isOn ? 28 : 6,
                height: 6,
                backgroundColor: isOn ? '#A4F93F' : 'rgba(255,255,255,0.18)',
              }}
              transition={{ type: 'spring', stiffness: 310, damping: 26 }}
            />
          </button>
        );
      })}
    </div>
  );
}

// ─── SCROLL HINT ──────────────────────────────────────────────────────────────

function ScrollHint({ show }: { show: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 pointer-events-none select-none"
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-px bg-gradient-to-b from-transparent via-white/22 to-[#A4F93F]/45"
        style={{ height: 38 }}
        animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
        transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className="text-[9px] font-bold tracking-[0.38em] text-white/22 uppercase">Scroll</span>
    </motion.div>
  );
}

// ─── ACTIVE META ──────────────────────────────────────────────────────────────

function ActiveMeta({ sys }: { sys: typeof systems[0] }) {
  return (
    <motion.div key={sys.id} className="flex flex-col gap-1 sm:gap-1.5"
      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
      <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.40em] uppercase text-[#A4F93F]/58">
        {sys.category}
      </span>
      <h3 className="text-base sm:text-lg lg:text-xl font-black tracking-tight text-white leading-none">{sys.name}</h3>
      <p className="text-[10px] sm:text-xs text-white/28 font-medium">
        {sys.specs.cpu}&nbsp;·&nbsp;{sys.specs.gpu}
      </p>
    </motion.div>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────

export default function SystemsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [renderActive, setRenderActive] = useState(0);
  const sizing = useCarouselSizing();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, CARD_COUNT - 1]);

  useEffect(() => {
    return rawIndex.on('change', (v) => setRenderActive(v));
  }, [rawIndex]);

  useEffect(() => {
    if (mobileVideoRef.current) mobileVideoRef.current.playbackRate = 0.4;
    if (desktopVideoRef.current) desktopVideoRef.current.playbackRate = 0.4;
  }, [isMobile]);

  const focusCard = useCallback((index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollable = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: sectionTop + (index / (CARD_COUNT - 1)) * scrollable,
      behavior: 'smooth',
    });
  }, []);

  // ── SCROLL-SNAP ───────────────────────────────────────────────────────────
  const isSnapping = useRef(false);
  const snapTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const unsubscribe = rawIndex.on('change', () => {
      if (snapTimer.current) clearTimeout(snapTimer.current);
      if (isSnapping.current) return;

      snapTimer.current = setTimeout(() => {
        const current = rawIndex.get();
        const nearest = Math.round(current);
        if (Math.abs(current - nearest) > 0.04) {
          isSnapping.current = true;
          focusCard(nearest);
          setTimeout(() => { isSnapping.current = false; }, 650);
        }
      }, 120);
    });

    return () => {
      unsubscribe();
      if (snapTimer.current) clearTimeout(snapTimer.current);
    };
  }, [rawIndex, focusCard]);

  const roundedActive = Math.round(renderActive);
  const showScrollHint = renderActive < 0.4;

  // ── MOBILE ──────────────────────────────────────────────────────────────────
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [mobileActive, setMobileActive] = useState(0);

  // Track which card is centered via scroll position
  useEffect(() => {
    const el = mobileScrollRef.current;
    if (!el || !isMobile) return;

    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const children = Array.from(el.children) as HTMLElement[];
      if (children.length === 0) return;

      let closest = 0;
      let closestDist = Infinity;
      const containerCenter = scrollLeft + el.clientWidth / 2;

      children.forEach((child, i) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(containerCenter - childCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setMobileActive(closest);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const scrollMobileTo = useCallback((index: number) => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    if (!children[index]) return;

    const child = children[index];
    const scrollTarget = child.offsetLeft - (el.clientWidth / 2 - child.offsetWidth / 2);
    el.scrollTo({ left: scrollTarget, behavior: 'smooth' });
  }, []);

  if (isMobile) {
    return (
      <section className="relative z-20 py-12 sm:py-16 bg-[#020202] border-y border-white/5 overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <video
            ref={mobileVideoRef}
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-[1.8] -rotate-5"
            src="/assets/background%20video/vecteezy_glossy-black-wave-form-flowing-continuously-over-dark_74325729.mp4"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Header */}
        <div className="px-4 sm:px-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/10 relative z-10">
          <p className="text-[9px] sm:text-[10px] tracking-[0.38em] text-[#A4F93F]/55 font-bold uppercase mb-1.5 sm:mb-2">
            Curated Architecture
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tighter text-white">
            Select <span className="text-[#A4F93F]">Systems</span>.
          </h2>
        </div>

        {/* Swipeable cards */}
        <div
          ref={mobileScrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-6 sm:pb-8 px-4 sm:px-6 hide-scrollbar snap-x snap-mandatory relative z-10"
        >
          {systems.map((sys, idx) => (
            <motion.div
              key={sys.id}
              className="shrink-0 snap-center w-[72vw] sm:w-[60vw] max-w-[320px]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '40px' }}
              transition={{ duration: 0.52, delay: idx * 0.07, ease: [0.23, 1, 0.32, 1] }}
            >
              <ProductCard {...sys} delay={0} />
            </motion.div>
          ))}
        </div>

        {/* Mobile nav: arrows + dots */}
        <div className="flex items-center justify-center gap-3 relative z-10 mt-2 px-4">
          {/* Prev */}
          <button
            onClick={() => scrollMobileTo(Math.max(0, mobileActive - 1))}
            disabled={mobileActive === 0}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-white/10 bg-white/[0.04] backdrop-blur-sm
                       active:scale-90 disabled:opacity-20 disabled:pointer-events-none
                       transition-all duration-200"
            style={{ borderRadius: 10 }}
            aria-label="Previous system"
          >
            <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {systems.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollMobileTo(i)}
                className="p-0.5"
                aria-label={`Go to ${systems[i].name}`}
              >
                <motion.div
                  className="rounded-full"
                  animate={{
                    width: mobileActive === i ? 20 : 6,
                    height: 6,
                    backgroundColor: mobileActive === i ? '#A4F93F' : 'rgba(255,255,255,0.2)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => scrollMobileTo(Math.min(CARD_COUNT - 1, mobileActive + 1))}
            disabled={mobileActive === CARD_COUNT - 1}
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-white/10 bg-white/[0.04] backdrop-blur-sm
                       active:scale-90 disabled:opacity-20 disabled:pointer-events-none
                       transition-all duration-200"
            style={{ borderRadius: 10 }}
            aria-label="Next system"
          >
            <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    );
  }

  // ── DESKTOP ─────────────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      className="relative z-20 bg-[#020202] border-y border-white/5"
      style={{ height: '390vh' }}
    >
      <div
        className="sticky top-0 h-[100svh] w-full flex flex-col items-center justify-center overflow-hidden"
        style={{ isolation: 'isolate' }}
      >

        {/* Atmosphere */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <video
            ref={desktopVideoRef}
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50 scale-[1.8] -rotate-5"
            src="/assets/background%20video/vecteezy_glossy-black-wave-form-flowing-continuously-over-dark_74325729.mp4"
          />
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: 1200, height: 450,
              background: 'radial-gradient(ellipse at center, rgba(164,249,63,0.06) 0%, transparent 68%)',
              filter: 'blur(56px)',
            }}
            animate={{ opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.011) 3px, rgba(255,255,255,0.011) 4px)',
          }} />
        </div>

        {/* Header */}
        <motion.div
          className="absolute top-0 left-0 right-0 flex items-start justify-between px-5 sm:px-6 md:px-8 lg:px-10 pt-20 md:pt-24 lg:pt-28 z-50 pointer-events-none"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: [0.23, 1, 0.32, 1] }}
        >
          <div>
            <p className="text-[9px] md:text-[10px] tracking-[0.40em] text-[#A4F93F]/52 font-bold uppercase mb-1.5 md:mb-2">
              GeekBoz — Curated Architecture
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-black tracking-tighter text-white leading-none">
              Select{' '}
              <span style={{
                color: 'transparent',
                backgroundImage: 'linear-gradient(130deg, #A4F93F 0%, #d6ff72 52%, #A4F93F 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
              }}>
                Systems
              </span>.
            </h2>
          </div>
          <button className="pointer-events-auto hidden lg:flex items-center gap-3 px-5 xl:px-7 py-3 xl:py-3.5 border border-white/12 text-white/42 text-[9px] xl:text-[10px] font-bold tracking-[0.28em] uppercase hover:border-[#A4F93F]/42 hover:text-[#A4F93F] transition-all duration-300">
            View All Tiers <span className="opacity-40">→</span>
          </button>
        </motion.div>

        {/* ── CARD STAGE ──────────────────────────────────────────────── */}
        <div
          className="relative flex items-center justify-center w-full"
          style={{ height: sizing.stageH }}
        >
          {systems.map((sys, index) => (
            <CardSlot
              key={sys.id}
              sys={sys}
              index={index}
              activeIndex={renderActive}
              onFocusClick={focusCard}
              cardW={sizing.cardW}
              slotSpacing={sizing.slotSpacing}
            />
          ))}
        </div>

        {/* Bottom HUD */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-4 sm:px-6 md:px-8 lg:px-10 pb-5 sm:pb-6 md:pb-8 lg:pb-10 z-50 pointer-events-none"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.14, ease: [0.23, 1, 0.32, 1] }}
        >
          <ActiveMeta sys={systems[roundedActive]} />

          <div className="absolute left-1/2 -translate-x-1/2 bottom-5 sm:bottom-6 md:bottom-8 lg:bottom-10 pointer-events-auto flex items-center gap-3 sm:gap-4">
            {/* Prev button */}
            <motion.button
              onClick={() => focusCard(Math.max(0, roundedActive - 1))}
              className="group/nav w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center border border-white/10 bg-white/[0.03] backdrop-blur-sm
                         hover:border-[#A4F93F]/40 hover:bg-[#A4F93F]/[0.06] active:scale-90
                         disabled:opacity-20 disabled:pointer-events-none
                         transition-all duration-300"
              style={{ borderRadius: 12 }}
              disabled={roundedActive === 0}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous system"
            >
              <svg className="w-4 h-4 text-white/40 group-hover/nav:text-[#A4F93F] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            <ProgressDots active={renderActive} total={CARD_COUNT} onDotClick={focusCard} />

            {/* Next button */}
            <motion.button
              onClick={() => focusCard(Math.min(CARD_COUNT - 1, roundedActive + 1))}
              className="group/nav w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center border border-white/10 bg-white/[0.03] backdrop-blur-sm
                         hover:border-[#A4F93F]/40 hover:bg-[#A4F93F]/[0.06] active:scale-90
                         disabled:opacity-20 disabled:pointer-events-none
                         transition-all duration-300"
              style={{ borderRadius: 12 }}
              disabled={roundedActive === CARD_COUNT - 1}
              whileTap={{ scale: 0.9 }}
              aria-label="Next system"
            >
              <svg className="w-4 h-4 text-white/40 group-hover/nav:text-[#A4F93F] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          <div className="flex flex-col items-end gap-3 md:gap-4">
            <ScrollHint show={showScrollHint} />
            <p className="text-[9px] sm:text-[10px] text-white/18 font-bold tracking-[0.28em] tabular-nums">
              <motion.span key={roundedActive}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}>
                {String(roundedActive + 1).padStart(2, '0')}
              </motion.span>
              <span className="opacity-35"> / {String(CARD_COUNT).padStart(2, '0')}</span>
            </p>
          </div>
        </motion.div>

        {/* Left edge — vertical category label */}
        <div className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden lg:block">
          <motion.p
            key={systems[roundedActive].category}
            initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28 }}
            className="text-[8px] lg:text-[9px] tracking-[0.40em] text-white/18 font-bold uppercase"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {systems[roundedActive].category}
          </motion.p>
        </div>

        {/* Right edge — live price & specs */}
        <div className="absolute right-4 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden xl:flex flex-col items-end gap-6 2xl:gap-8">

          <motion.div
            key={systems[roundedActive].id + "-price"}
            className="flex flex-col items-end gap-1.5"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-[8px] xl:text-[9px] tracking-[0.34em] text-white/18 font-bold uppercase">
              Starting At
            </span>
            <motion.div className="flex items-end gap-2 xl:gap-4 flex-wrap justify-end">
              <span className="text-3xl xl:text-4xl 2xl:text-5xl font-black text-white tracking-tighter leading-none">
                ₹{systems[roundedActive].offerPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-lg xl:text-xl 2xl:text-2xl text-white/30 font-bold line-through tracking-tighter">
                ₹{systems[roundedActive].originalPrice.toLocaleString('en-IN')}
              </span>
            </motion.div>
            <span className="mt-1 text-[8px] xl:text-[9px] border border-[#A4F93F]/20 bg-[#A4F93F]/08 text-[#A4F93F] px-2 xl:px-2.5 py-0.5 xl:py-1 font-bold tracking-widest">
              −{systems[roundedActive].discount}% OFF
            </span>
          </motion.div>

          <div className="flex flex-col items-end gap-2 xl:gap-2.5">
            {[
              { label: 'CPU', value: systems[roundedActive].specs.cpu },
              { label: 'GPU', value: systems[roundedActive].specs.gpu },
              { label: 'RAM', value: systems[roundedActive].specs.ram },
              { label: 'ROM', value: systems[roundedActive].specs.storage },
            ].map((spec, i) => (
              <motion.div
                key={`${systems[roundedActive].id}-spec-${i}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center gap-2.5 xl:gap-4 justify-end"
              >
                <span className="text-white/60 font-medium tracking-tight text-xs xl:text-sm text-right leading-none">
                  {spec.value}
                </span>
                <span className="w-8 xl:w-10 border border-white/10 bg-white/[0.03] text-center py-0.5 xl:py-1 rounded text-[7px] xl:text-[8px] font-bold tracking-widest text-[#A4F93F]/70 uppercase">
                  {spec.label}
                </span>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}