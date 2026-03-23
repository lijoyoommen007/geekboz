'use client';

import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  desc: string;
  index: number;
}

export default function ServiceCard({ title, desc, index }: ServiceCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 border border-white/10 bg-white/[0.02] hover:bg-[#A4F93F]/5 hover:-translate-y-2 hover:border-[#A4F93F]/40 transition-all duration-500 group cursor-default relative overflow-hidden"
    >
      {/* Aggressive Cyberpunk Top-Line Reveal */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#A4F93F] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]"></div>

      {/* Index Numbering Block (Sharp Edges) */}
      <div className="w-12 h-12 bg-black flex items-center justify-center mb-8 border border-white/10 group-hover:border-[#A4F93F]/40 group-hover:scale-110 transition-all duration-500 relative">
        <span className="text-white/50 font-mono text-sm tracking-widest group-hover:text-[#A4F93F] transition-colors">{String(index + 1).padStart(2, '0')}</span>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-transparent group-hover:border-[#A4F93F] transition-colors duration-500"></div>
      </div>
      
      <h3 className="text-2xl font-bold mb-4 tracking-tight text-white group-hover:text-[#A4F93F] transition-colors">{title}</h3>
      <p className="text-white/40 leading-relaxed font-medium tracking-tight group-hover:text-white/70 transition-colors drop-shadow-md">{desc}</p>

      {/* Action Arrow Reveal on Hover */}
      <div className="absolute bottom-6 right-6 text-[#A4F93F] opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-out">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>

    </motion.div>
  );
}
