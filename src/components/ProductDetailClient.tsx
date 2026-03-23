'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';

// ── MOCK SYSTEM DB ──────────────────────────────────────────────
export const DB = [
  {
    id: "gbz-x1-air", name: "GBZ X1 AiR", category: "GBZ Branded PC, GBZ Gaming PC",
    image: "/assets/product/product1.png",
    gallery: [
      "/assets/product/product1.png",
      "/assets/product/product2.png",
      "/assets/product/product4.png",
      "/assets/product/product6.png"
    ],
    originalPrice: 48899, offerPrice: 45399, discount: 7,
    specs: {
      cpu: "AMD RYZEN 5 5600G Processor (6 Core / 12 Threads)",
      gpu: "2 GB Radeon Vega 7 iGPU",
      ram: "8GB XPG RAM 3200 MHz",
      storage: "512GB M.2 Gen 4.0 NVME SSD",
      motherboard: "ASUS PRIME 520 CSM Series",
      cooler: "Wraith Air Cooler",
      psu: "Deepcool 550W Bronze Certified PSU",
      case: "StarLight Gaming Cabinet",
      warranty: "3 YEAR Manufacture Warranty"
    },
    tags: ["65k", "budget pc", "prebuilt"],
    desc: "Power Up Your Daily Workflow! Step up your productivity and style with the GBZ X1 AiR, blending performance, reliability, and a dash of gaming flair.",
    longDesc: "Designed by GeekBoZ, Kerala's most trusted custom PC brand, this machine blends performance, reliability, and a dash of gaming flair — all within a smart ₹40,000 range. With 8GB of high-speed RAM, a DeepCool 550W 80+ Bronze certified PSU, and a sleek gaming cabinet, the GBZ X1 AiR delivers smoother multitasking, better stability, and cooler performance than typical entry-level PCs.",
    features: [
      "Professionals & Students",
      "Office Work, Web Browsing & Light Editing",
      "Mild Gaming (Valorant, GTA V, CS2 on low settings)",
      "Long-hour daily productivity use"
    ],
    addOns: [
      { id: 'srv', category: 'Service', name: 'GBZ Care Service Suite', price: 0 },
      { id: 'm1', category: 'Monitor', name: 'BenQ GW2490 IPS 100hz Monitor', price: 8259 },
      { id: 'm2', category: 'Monitor', name: "24' IPS 180hz Gaming Monitor with 0.5ms", price: 11599 },
      { id: 'kb1', category: 'Keyboard + Mouse', name: 'Transformer II Keyboard + Gaming RGB Mouse', price: 1199 },
    ],
    fps: { cyberpunk: 40, valorant: 165, starfield: 35 }
  },
  {
    id: "predator", name: "Apex Predator", category: "Gaming",
    image: "/assets/product/product1.png",
    gallery: ["/assets/product/product1.png"],
    originalPrice: 420000, offerPrice: 399900, discount: 5,
    specs: { cpu: "i9-14900K", gpu: "RTX 4090", ram: "64GB DDR5", storage: "4TB NVMe", motherboard: "ROG MAXIMUS", cooler: "Custom Loop", psu: "1200W Titanium", case: "Lian Li O11D", warranty: "3 Years" },
    tags: ["premium"], desc: "Unleash absolute supremacy with the Apex Predator.", longDesc: "Detailed desc here.", features: [], addOns: [], fps: { cyberpunk: 145, valorant: 850, starfield: 120 }
  },
  {
    id: "creator", name: "Creator X1", category: "Workstation",
    image: "/assets/product/product1.png",
    gallery: ["/assets/product/product1.png"],
    originalPrice: 2800, offerPrice: 2499, discount: 11,
    specs: { cpu: "Ryzen 9 7950X", gpu: "RTX 4080S", ram: "128GB DDR5", storage: "2TB NVMe", motherboard: "ROG", cooler: "AIO", psu: "850W", case: "O11", warranty: "1 Year" },
    tags: ["creation"], desc: "Accelerate your rendering pipelines.", longDesc: "Detailed.", features: [], addOns: [], fps: { cyberpunk: 110, valorant: 700, starfield: 95 }
  },
  {
    id: "quantum", name: "Quantum AI", category: "Deep Learning",
    image: "/assets/product/product1.png",
    gallery: ["/assets/product/product1.png"],
    originalPrice: 8900, offerPrice: 8499, discount: 4,
    specs: { cpu: "TR PRO 5995WX", gpu: "Dual RTX 6000", ram: "256GB ECC", storage: "8TB U.2", motherboard: "ROG", cooler: "AIO", psu: "1600W", case: "O11 Evo", warranty: "3 Year" },
    tags: ["creation"], desc: "Train models locally with zero bottlenecks.", longDesc: "Detailed.", features: [], addOns: [], fps: { cyberpunk: 130, valorant: 600, starfield: 105 }
  }
];

// ── SPEC ICONS ──────────────────────────────────────────────────
const specIcons: Record<string, React.ReactNode> = {
  Processor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" strokeLinecap="round" />
    </svg>
  ),
  Motherboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect x="7" y="7" width="4" height="4" rx="0.5" />
      <path d="M14 8h3M14 11h3M8 14h8M8 17h5" strokeLinecap="round" />
    </svg>
  ),
  Memory: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M8 6V4M12 6V4M16 6V4M8 18v2M12 18v2M16 18v2" strokeLinecap="round" />
      <path d="M8 10v4M11 10v4M14 10v4M17 10v4" strokeLinecap="round" strokeWidth={1.2} />
    </svg>
  ),
  Storage: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
      <path d="M4 8h16" />
    </svg>
  ),
  'Graphics Card': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
      <rect x="2" y="7" width="20" height="10" rx="2" />
      <circle cx="8" cy="12" r="2.5" />
      <circle cx="16" cy="12" r="2.5" />
      <path d="M5 7V5M9 7V5M19 7V5" strokeLinecap="round" />
    </svg>
  ),
  Cooler: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.5 15.5l2.1 2.1M6.3 17.7l2.1-2.1M15.5 8.5l2.1-2.1" strokeLinecap="round" />
    </svg>
  ),
  PSU: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M13 10l-3 4h4l-3 4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="12" r="0.5" fill="currentColor" />
    </svg>
  ),
  Case: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="7" r="2" />
      <path d="M9 13h6M9 16h6" strokeLinecap="round" />
    </svg>
  ),
  Warranty: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-full h-full">
      <path d="M12 3l8 4v5c0 5.25-3.5 9.75-8 11-4.5-1.25-8-5.75-8-11V7l8-4z" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const SPEC_ROWS = [
  { label: 'Processor', key: 'cpu' as const },
  { label: 'Motherboard', key: 'motherboard' as const },
  { label: 'Memory', key: 'ram' as const },
  { label: 'Storage', key: 'storage' as const },
  { label: 'Graphics Card', key: 'gpu' as const },
  { label: 'Cooler', key: 'cooler' as const },
  { label: 'PSU', key: 'psu' as const },
  { label: 'Case', key: 'case' as const },
  { label: 'Warranty', key: 'warranty' as const },
];

export default function ProductDetailClient({ productId }: { productId: string }) {
  const sys = DB.find(s => s.id === productId) || DB[0];

  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(new Set(['srv']));
  const [activeTab, setActiveTab] = useState<'desc' | 'reviews'>('desc');
  const [activeImage, setActiveImage] = useState(sys.image);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  const handleAddOnToggle = (id: string) => {
    setSelectedAddOns(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addOnsTotal = Array.from(selectedAddOns).reduce((acc, id) => {
    const item = sys.addOns.find(a => a.id === id);
    return acc + (item ? item.price : 0);
  }, 0);

  const finalPrice = sys.offerPrice + addOnsTotal;

  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  return (
    <main className="bg-[#020202] min-h-screen pt-16 sm:pt-20 overflow-clip selection:bg-[#A4F93F]/30 text-white relative">
      {/* ── Background atmosphere ─────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div style={{ opacity: heroOpacity }} className="w-[100vw] h-[70vh] bg-[radial-gradient(ellipse_at_center,rgba(164,249,63,0.035)_0%,transparent_55%)] blur-[100px]" />
      </div>

      {/* ── BREADCRUMB ────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 xl:px-16 relative z-10 mb-4 sm:mb-6 md:mb-10">
        <motion.div
          className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-white/25 font-medium tracking-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <a href="/" className="hover:text-white/50 transition-colors">Home</a>
          <span className="text-white/10">/</span>
          <a href="/products" className="hover:text-white/50 transition-colors">Products</a>
          <span className="text-white/10">/</span>
          <span className="text-white/45 truncate">{sys.name}</span>
        </motion.div>
      </div>

      {/* ── MAIN GRID ─────────────────────────────────────────────────── */}
      <div ref={heroRef} className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-6 sm:gap-8 lg:gap-14 relative z-10 px-4 sm:px-6 md:px-10 xl:px-16 pb-8 sm:pb-12 lg:pb-16">

        {/* ── LEFT: Info + Specs + Configurator ─────────────────────────── */}
        <div className="flex flex-col pt-0 lg:pt-4 order-2 lg:order-1">

          {/* ═══ SECTION A: Hero info + Price ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col order-1"
          >
            {/* Category + stock badges */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-5 flex-wrap">
              {sys.category?.split(',').map((cat: string) => (
                <span key={cat.trim()} className="text-[8px] sm:text-[9px] tracking-[0.2em] font-bold text-[#A4F93F]/70 uppercase border border-[#A4F93F]/20 bg-[#A4F93F]/[0.06] px-2 sm:px-3 py-1 sm:py-1.5" style={{ borderRadius: 6 }}>
                  {cat.trim()}
                </span>
              ))}
              <span className="flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[9px] tracking-[0.15em] font-bold uppercase px-2 sm:px-3 py-1 sm:py-1.5 border border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-400/80" style={{ borderRadius: 6 }}>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                In Stock
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-tighter text-white leading-[0.95] mb-2 sm:mb-3">
              {sys.name}
            </h1>

            {/* Tags */}
            <div className="flex gap-2 mb-4 sm:mb-8">
              {sys.tags.map(t => (
                <span key={t} className="text-[10px] font-medium text-white/25 tracking-tight">#{t}</span>
              ))}
            </div>

            {/* Description */}
            <p className="text-white/40 text-[13px] sm:text-[15px] leading-[1.65] sm:leading-[1.7] font-medium tracking-tight mb-6 sm:mb-10 max-w-xl">
              {sys.desc}
            </p>

            {/* ── Price block ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-2 sm:gap-3 mb-6 sm:mb-10 pb-6 sm:pb-10 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.25em] text-white/20 uppercase">Limited Time Deal</span>
                <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.15em] text-[#A4F93F] bg-[#A4F93F]/[0.08] border border-[#A4F93F]/15 px-2 sm:px-2.5 py-0.5 sm:py-1 uppercase" style={{ borderRadius: 5 }}>
                  Save {sys.discount}%
                </span>
              </div>
              <div className="flex items-end gap-2 sm:gap-4 flex-wrap">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white leading-none">
                  {formatINR(sys.offerPrice)}
                </span>
                <span className="text-base sm:text-lg text-white/20 line-through font-medium tracking-tight mb-0.5 sm:mb-1">
                  {formatINR(sys.originalPrice)}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ═══ SECTION B: Specs (2nd on mobile, 3rd on desktop) ═══ */}
          <div className="order-2 lg:order-3 mt-6 sm:mt-8 lg:mt-24 pt-6 sm:pt-8 lg:pt-20 border-t border-white/[0.05]">
            <motion.div
              className="mb-6 sm:mb-10 lg:mb-14"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-[#A4F93F]/50 uppercase mb-2 sm:mb-3">
                Full Technical Breakdown
              </p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white leading-[0.95]">
                System{' '}
                <span style={{
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(130deg, #A4F93F 0%, #d6ff72 52%, #A4F93F 100%)',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text',
                }}>
                  Architecture
                </span>.
              </h2>
            </motion.div>

            {/* Spec rows — stacked on mobile, inline on sm+ */}
            <div className="flex flex-col gap-0">
              {SPEC_ROWS.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  className="group flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-5
                             py-3.5 sm:py-4 md:py-5 lg:py-6 border-b border-white/[0.04]
                             hover:bg-[#A4F93F]/[0.015] transition-colors duration-300
                             -mx-2 sm:-mx-3 px-2 sm:px-3"
                  style={{ borderRadius: 8 }}
                >
                  {/* Top row on mobile: icon + label */}
                  <div className="flex items-center gap-2.5 sm:gap-5 sm:w-auto">
                    <div className="w-7 h-7 sm:w-10 sm:h-10 shrink-0 text-white/15 group-hover:text-[#A4F93F]/40 transition-colors duration-300">
                      {specIcons[spec.label] || specIcons['Processor']}
                    </div>
                    <span className="sm:w-32 md:w-40 shrink-0 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-white/30 uppercase">
                      {spec.label}
                    </span>
                  </div>
                  {/* Value — full width on mobile, inline on sm+ */}
                  <span className="text-[13px] sm:text-[15px] md:text-base text-white/80 font-semibold tracking-tight pl-[38px] sm:pl-0 sm:flex-1">
                    {sys.specs[spec.key]}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ═══ SECTION C: Add-ons + CTA (3rd on mobile, 2nd on desktop) ═══ */}
          <div className="order-3 lg:order-2 flex flex-col mt-6 sm:mt-8 lg:mt-0">

            {/* ── Add-ons configurator ─────────────────────────────────────── */}
            {sys.addOns.length > 0 && (
              <div className="flex flex-col gap-3 sm:gap-5 mb-6 sm:mb-10">
                <div className="flex flex-col gap-1">
                  <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white">Customize Your Setup</h3>
                  <p className="text-[10px] sm:text-[11px] font-medium tracking-tight text-white/25">Select add-ons to build your complete workstation</p>
                </div>

                <div className="flex flex-col gap-2 sm:gap-2.5">
                  {sys.addOns.map((add) => {
                    const isSelected = selectedAddOns.has(add.id);
                    return (
                      <button
                        key={add.id}
                        onClick={() => handleAddOnToggle(add.id)}
                        className={`flex items-start sm:items-center gap-3 p-3 sm:p-4 text-left transition-all duration-300 border
                          ${isSelected
                            ? 'bg-[#A4F93F]/[0.04] border-[#A4F93F]/30 shadow-[0_0_24px_rgba(164,249,63,0.06)]'
                            : 'bg-white/[0.015] border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.025]'
                          }`}
                        style={{ borderRadius: 12 }}
                      >
                        {/* Checkbox */}
                        <div
                          className={`w-5 h-5 shrink-0 mt-0.5 sm:mt-0 flex items-center justify-center border transition-all duration-300
                            ${isSelected ? 'bg-[#A4F93F] border-[#A4F93F]' : 'border-white/15 bg-white/[0.02]'}`}
                          style={{ borderRadius: 6 }}
                        >
                          {isSelected && (
                            <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>

                        {/* Name + price */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between flex-1 min-w-0 gap-0.5 sm:gap-4">
                          <div className="flex flex-col gap-0 min-w-0">
                            <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.18em] text-white/25 uppercase">{add.category}</span>
                            <span className="text-[13px] sm:text-sm font-semibold text-white/80 tracking-tight leading-snug">{add.name}</span>
                          </div>
                          <span className={`text-[13px] sm:text-sm font-bold tracking-tight shrink-0
                            ${isSelected ? 'text-[#A4F93F]' : 'text-white/40'}`}>
                            {add.price === 0 ? 'Included' : '+' + formatINR(add.price)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Checkout CTA (sticky on mobile with safe-area) ────────── */}
            <div
              className="sticky bottom-0 lg:static bg-[#080808]/95 backdrop-blur-2xl border border-white/[0.08]
                         p-4 sm:p-5 md:p-6 flex flex-col gap-3 sm:gap-4 z-50
                         pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-5 md:pb-6
                         -mx-4 sm:mx-0 rounded-none sm:rounded-[18px]"
              style={{ borderRadius: undefined }}
            >
              {/* Summary row */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.25em] text-white/20 uppercase">Total</span>
                  <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter text-white leading-none">
                    {formatINR(finalPrice)}
                  </span>
                </div>
                {addOnsTotal > 0 && (
                  <span className="text-[10px] sm:text-[11px] text-white/25 font-medium tracking-tight">
                    incl. {formatINR(addOnsTotal)} add-ons
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2.5 sm:gap-3">
                <button
                  className="flex-1 py-3.5 sm:py-4 bg-[#A4F93F] text-black text-[11px] sm:text-[12px] font-extrabold tracking-[0.12em] uppercase
                             hover:bg-[#b5ff5f] active:scale-[0.98] transition-all duration-300
                             hover:shadow-[0_0_40px_rgba(164,249,63,0.25)]
                             flex items-center justify-center gap-2 sm:gap-2.5 group/cta relative overflow-hidden
                             rounded-xl sm:rounded-none"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative z-10">Checkout Build</span>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10 group-hover/cta:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button
                  className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 border border-white/[0.08] bg-white/[0.02]
                             hover:border-[#A4F93F]/25 hover:bg-[#A4F93F]/[0.04] hover:text-[#A4F93F]
                             active:scale-95
                             text-white/30 flex items-center justify-center transition-all duration-300
                             rounded-xl sm:rounded-[14px]"
                  title="Add to wishlist"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ═══ SECTION D: Description / Reviews ═══ */}
          <div className="order-4 mt-10 sm:mt-14 lg:mt-20 pt-8 sm:pt-12 lg:pt-16 border-t border-white/[0.05]">
            {/* Tab headers */}
            <div className="flex gap-0 mb-6 sm:mb-10 border-b border-white/[0.06]">
              {(['desc', 'reviews'] as const).map((tab) => {
                const isActive = activeTab === tab;
                const label = tab === 'desc' ? 'Description' : 'Reviews (0)';
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative pb-3 sm:pb-4 px-1 mr-5 sm:mr-8 text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase transition-colors duration-300
                      ${isActive ? 'text-[#A4F93F]' : 'text-white/25 hover:text-white/50'}`}
                  >
                    {label}
                    {isActive && (
                      <motion.div
                        layoutId="productTabBar"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A4F93F]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'desc' && (
                <motion.div key="desc" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="flex flex-col gap-8 sm:gap-12">
                  {/* Long description */}
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      Why Choose {sys.name}?
                    </h3>
                    <p className="text-white/35 text-[13px] sm:text-[15px] leading-[1.7] sm:leading-[1.75] font-medium tracking-tight">{sys.longDesc}</p>
                  </div>

                  {/* What's included */}
                  <div className="p-4 sm:p-6 bg-white/[0.015] border border-white/[0.06]" style={{ borderRadius: 14 }}>
                 <h4 className="text-[9px] sm:text-[10px] text-[#A4F93F]/60 font-bold tracking-[0.25em] uppercase mb-3 sm:mb-5">
  What&apos;s Included
</h4>
                    <div className="flex flex-col gap-2.5 sm:gap-3.5">
                      {[
                        'Fully Assembled Desktop',
                        'Genuine GeekBoZ Verified Components',
                        '3-Year Hardware Warranty',
                        'Lifetime Technical Support',
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2.5 sm:gap-3.5">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 flex items-center justify-center border border-[#A4F93F]/20 bg-[#A4F93F]/[0.06]" style={{ borderRadius: 5 }}>
                            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#A4F93F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-[13px] sm:text-sm text-white/50 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Perfect for */}
                  {sys.features.length > 0 && (
                    <div className="flex flex-col gap-3 sm:gap-5">
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Perfect For</h3>
                      <ul className="flex flex-col gap-2 sm:gap-2.5 pl-1">
                        {sys.features.map((f, i) => (
                          <li key={f} className="flex items-start gap-2.5 sm:gap-3 text-[13px] sm:text-[15px] text-white/45 font-medium tracking-tight leading-relaxed">
                            <span className="text-[#A4F93F]/50 font-bold shrink-0 w-4 sm:w-5">{i + 1}.</span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div key="reviews" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                  className="py-10 sm:py-16 flex flex-col items-center text-center gap-3 sm:gap-4"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/15" style={{ borderRadius: 12 }}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-white/25 text-[13px] sm:text-sm font-medium">No reviews yet. Be the first to review this build!</p>
                  <button className="text-[10px] font-bold tracking-[0.15em] text-[#A4F93F]/60 hover:text-[#A4F93F] uppercase transition-colors mt-1 sm:mt-2">
                    Write a Review →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── RIGHT: Gallery ────────────────────────────────────────────── */}
        <div className="relative w-full order-1 lg:order-2">
          {/* Mobile gallery */}
          <div className="lg:hidden mb-4 sm:mb-6">
            <div className="relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#050505] border border-white/[0.06] flex items-center justify-center p-3 sm:p-6"
              style={{ borderRadius: 16, aspectRatio: '4 / 3' }}
            >
              {/* Discount badge — mobile */}
              <div className="absolute top-3 left-3 z-20 bg-[#A4F93F] text-black text-[9px] sm:text-[10px] font-extrabold tracking-[0.08em] uppercase px-2.5 py-1" style={{ borderRadius: 6 }}>
                {sys.discount}% OFF
              </div>
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#A4F93F]/30 to-transparent" />
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  src={activeImage}
                  alt={sys.name}
                  className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                />
              </AnimatePresence>
            </div>
            {/* Mobile thumbnails */}
            <div className="flex gap-2 sm:gap-2.5 mt-2.5 sm:mt-3 overflow-x-auto hide-scrollbar pb-1">
              {sys.gallery?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 flex items-center justify-center p-1 sm:p-1.5 bg-[#080808] border transition-all duration-300
                    ${activeImage === img
                      ? 'border-[#A4F93F]/50 shadow-[0_0_12px_rgba(164,249,63,0.1)]'
                      : 'border-white/[0.06] hover:border-white/[0.15]'
                    }`}
                  style={{ borderRadius: 8 }}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Mobile quick specs strip */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-2.5 sm:mt-3">
              {[
                { label: 'CPU', val: sys.specs.cpu.split(' ').slice(0, 3).join(' ') },
                { label: 'GPU', val: sys.specs.gpu.split(' ').slice(0, 4).join(' ') },
                { label: 'RAM', val: sys.specs.ram },
              ].map((q) => (
                <div key={q.label} className="flex flex-col gap-0.5 p-2.5 sm:p-3 bg-white/[0.015] border border-white/[0.05]" style={{ borderRadius: 10 }}>
                  <span className="text-[7px] sm:text-[8px] font-bold tracking-[0.2em] text-white/15 uppercase">{q.label}</span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-white/50 tracking-tight truncate">{q.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop sticky gallery */}
          <div className="hidden lg:block sticky top-24">
            <div className="flex flex-row-reverse gap-3.5">
              {/* Main display */}
              <motion.div
                className="flex-1 bg-gradient-to-b from-[#0c0c0c] to-[#050505] border border-white/[0.06]
                           overflow-hidden flex items-center justify-center p-10 relative group"
                style={{ borderRadius: 22, scale: heroScale }}
              >
                <div className="absolute top-0 inset-x-0 h-[2px] z-10 bg-gradient-to-r from-transparent via-[#A4F93F]/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,transparent_55%)] pointer-events-none" />
                <div className="absolute top-5 left-5 z-20 bg-[#A4F93F] text-black text-[10px] font-extrabold tracking-[0.08em] uppercase px-3 py-1.5" style={{ borderRadius: 7 }}>
                  {sys.discount}% OFF
                </div>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.97 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                    src={activeImage}
                    alt={sys.name}
                    className="w-full h-auto max-h-[60vh] object-contain drop-shadow-[0_24px_56px_rgba(0,0,0,0.7)] z-10"
                  />
                </AnimatePresence>
              </motion.div>

              {/* Vertical thumbnails */}
              <div className="w-[82px] flex flex-col gap-2.5 overflow-y-auto hide-scrollbar shrink-0 py-1">
                {sys.gallery?.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-full aspect-square flex items-center justify-center p-2 bg-[#080808] overflow-hidden
                               transition-all duration-300 border
                      ${activeImage === img
                        ? 'border-[#A4F93F]/50 shadow-[0_0_16px_rgba(164,249,63,0.12)]'
                        : 'border-white/[0.06] hover:border-white/[0.15]'
                      }`}
                    style={{ borderRadius: 12 }}
                  >
                    <img src={img} alt={`${sys.name} view ${i + 1}`} className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop quick specs strip */}
            <div className="grid grid-cols-3 gap-2.5 mt-4">
              {[
                { label: 'CPU', val: sys.specs.cpu.split(' ').slice(0, 3).join(' ') },
                { label: 'GPU', val: sys.specs.gpu.split(' ').slice(0, 4).join(' ') },
                { label: 'RAM', val: sys.specs.ram },
              ].map((q) => (
                <div key={q.label} className="flex flex-col gap-1 p-3.5 bg-white/[0.015] border border-white/[0.05]" style={{ borderRadius: 12 }}>
                  <span className="text-[8px] font-bold tracking-[0.2em] text-white/15 uppercase">{q.label}</span>
                  <span className="text-[11px] font-bold text-white/50 tracking-tight truncate">{q.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PERFORMANCE MATRIX ───────────────────────────────────────────── */}
      <section className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 xl:px-16 pb-12 sm:pb-16 lg:pb-24 mt-4 sm:mt-6 lg:mt-10">
        <div className="pt-8 sm:pt-12 lg:pt-16 border-t border-white/[0.05]">
          <motion.div
            className="mb-6 sm:mb-10 lg:mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.35em] text-[#A4F93F]/50 uppercase mb-1.5 sm:mb-2">
              Benchmarked at 1080p
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white leading-[0.95]">
              Performance{' '}
              <span style={{
                color: 'transparent',
                backgroundImage: 'linear-gradient(130deg, #A4F93F 0%, #d6ff72 52%, #A4F93F 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
              }}>
                Matrix
              </span>.
            </h2>
          </motion.div>

          {/* Horizontal scroll on mobile, grid on md+ */}
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 hide-scrollbar">
            {[
              { game: 'Cyberpunk 2077', fps: sys.fps.cyberpunk, color: '#A4F93F', maxFps: 200 },
              { game: 'Valorant', fps: sys.fps.valorant, color: '#A4F93F', maxFps: 300 },
              { game: 'Starfield', fps: sys.fps.starfield, color: '#A4F93F', maxFps: 200 },
            ].map((bench, i) => (
              <motion.div
                key={bench.game}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white/[0.015] border border-white/[0.05] overflow-hidden
                           hover:border-[#A4F93F]/15 transition-all duration-500
                           snap-start shrink-0 w-[75vw] sm:w-[65vw] md:w-auto
                           p-5 sm:p-6 md:p-7 lg:p-9"
                style={{ borderRadius: 16 }}
              >
                <div className="absolute bottom-0 right-0 w-40 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 100% 100%, ${bench.color}08 0%, transparent 60%)` }}
                />

                <div className="relative z-10 flex flex-col gap-4 sm:gap-6">
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">{bench.game}</span>

                  <div className="flex items-end gap-1.5 sm:gap-2">
                    <motion.span
                      className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none"
                      style={{ color: bench.color }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    >
                      {bench.fps}
                    </motion.span>
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] text-white/20 uppercase mb-1.5 sm:mb-2">FPS</span>
                  </div>

                  <div className="w-full h-1 sm:h-1.5 bg-white/[0.04] overflow-hidden" style={{ borderRadius: 100 }}>
                    <motion.div
                      className="h-full"
                      style={{ backgroundColor: bench.color, borderRadius: 100 }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min((bench.fps / bench.maxFps) * 100, 100)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.4 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED PRODUCTS ───────────────────────────────────────────── */}
      <section className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 xl:px-16 pb-16 sm:pb-24 lg:pb-32">
        <div className="pt-8 sm:pt-12 lg:pt-16 border-t border-white/[0.05]">
          <motion.div
            className="mb-6 sm:mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[9px] sm:text-[10px] font-bold tracking-[0.35em] text-[#A4F93F]/50 uppercase mb-1.5 sm:mb-2">
              You Might Also Like
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-white leading-[0.95]">
              Related{' '}
              <span style={{
                color: 'transparent',
                backgroundImage: 'linear-gradient(130deg, #A4F93F 0%, #d6ff72 52%, #A4F93F 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
              }}>
                Builds
              </span>.
            </h2>
          </motion.div>

          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-5 md:overflow-visible md:pb-0 hide-scrollbar">
            {DB.filter(r => r.id !== sys.id).slice(0, 3).map((rel, i) => (
              <motion.div
                key={rel.id}
                className="snap-start shrink-0 w-[80vw] sm:w-[70vw] md:w-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <ProductCard
                  id={rel.id}
                  name={rel.name}
                  category={rel.category}
                  image={rel.image}
                  originalPrice={rel.originalPrice}
                  offerPrice={rel.offerPrice}
                  discount={rel.discount}
                  specs={{ cpu: rel.specs.cpu, gpu: rel.specs.gpu, ram: rel.specs.ram, storage: rel.specs.storage }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}