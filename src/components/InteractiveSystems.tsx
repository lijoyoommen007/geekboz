'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';

const systems = [
  {
    id: "predator",
    name: "GeekBoz Apex Predator",
    category: "Gaming PC Series",
    image: "/assets/product/product1.png",
    originalPrice: 4200,
    offerPrice: 3999,
    discount: 5,
    specs: {
      cpu: "Intel Core i9-14900K",
      gpu: "NVIDIA RTX 4090",
      ram: "64GB DDR5 6400MHz",
      storage: "4TB Gen4 NVMe SSD"
    }
  },
  {
    id: "creator",
    name: "GeekBoz Creator X1",
    category: "Creator X Series",
    image: "/assets/product/product1.png",
    originalPrice: 2800,
    offerPrice: 2499,
    discount: 11,
    specs: {
      cpu: "AMD Ryzen 9 7950X3D",
      gpu: "NVIDIA RTX 4080 Super",
      ram: "128GB DDR5 6000MHz",
      storage: "2TB Gen4 x2 (RAID 0)"
    }
  },
  {
    id: "quantum",
    name: "GeekBoz Quantum AI",
    category: "Workstation AI Series",
    image: "/assets/product/product1.png",
    originalPrice: 8900,
    offerPrice: 8499,
    discount: 4,
    specs: {
      cpu: "AMD Threadripper PRO",
      gpu: "Dual RTX 6000 Ada",
      ram: "256GB ECC DDR5",
      storage: "8TB Enterprise U.2 SSD"
    }
  }
];

export default function InteractiveSystems() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative z-20 py-32 px-6 overflow-hidden bg-black border-y border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#A4F93F]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white">Select <span className="text-[#A4F93F]">Systems</span>.</h2>
            <p className="text-lg md:text-xl text-white/40 tracking-tight max-w-xl font-medium">Curated architecture. Precision assembled. Expand your arsenal.</p>
          </div>
          <button className="hidden md:block px-8 py-3.5 bg-transparent border border-white/20 text-white/70 text-xs font-bold tracking-widest uppercase rounded-none hover:border-[#A4F93F] hover:text-[#A4F93F] hover:bg-[#A4F93F]/5 transition-all duration-300">
            View All Series
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Left Side: Interactive Navigation List */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 relative">
            {/* Vertical connecting cyber-line */}
            <div className="absolute left-[28px] top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent z-0 hidden lg:block"></div>

            {systems.map((sys, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div
                  key={sys.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative z-10 flex items-center gap-8 cursor-pointer group p-6 rounded-2xl transition-all duration-500 ease-out ${isActive ? 'bg-white/[0.04] shadow-xl' : 'hover:bg-white/[0.02]'}`}
                >
                  {/* Custom Geometric Indicator */}
                  <div className={`w-14 h-14 shrink-0 shadow-2xl flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isActive ? 'border border-[#A4F93F] bg-[#A4F93F]/10 scale-110' : 'border border-white/10 bg-[#050505] group-hover:border-white/30 group-hover:scale-105'}`}>
                    <div className={`w-3.5 h-3.5 transition-all duration-700 ${isActive ? 'bg-[#A4F93F] shadow-[0_0_20px_#A4F93F] rotate-45' : 'bg-white/20 group-hover:bg-white/50'}`}></div>
                  </div>

                  <div className="flex-1">
                    <p className={`text-xs font-bold tracking-widest uppercase mb-1.5 transition-colors duration-500 ${isActive ? 'text-[#A4F93F]' : 'text-white/30'}`}>{sys.category}</p>
                    <h3 className={`text-3xl md:text-4xl font-bold tracking-tighter transition-all duration-500 ${isActive ? 'text-white translate-x-2' : 'text-white/50 group-hover:text-white/80'}`}>{sys.name}</h3>
                  </div>

                  {/* Active arrow indicator */}
                  <div className={`transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0 text-[#A4F93F]' : 'opacity-0 -translate-x-4 text-white/20'}`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Side: Cross-fading Product Card container */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative min-h-[600px] items-center">
            {/* Ambient bounding box for the card */}
            <div className="absolute inset-0 bg-[#050505] border border-white/5 rounded-[3rem] transform rotate-1 hidden lg:block"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -60, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="w-full max-w-[400px] relative z-10 lg:mr-8"
              >
                <div className="pointer-events-none absolute -inset-6 bg-[#A4F93F]/5 blur-3xl opacity-0 animate-pulse-slow"></div>
                <ProductCard {...systems[activeIndex]} delay={0} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
