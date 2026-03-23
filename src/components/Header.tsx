'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/', desc: '' },
    { name: 'GBZ Prebuild PC Series', href: '/prebuild', desc: 'Ready-to-ship premium systems' },
    { name: 'Gaming PC Series', href: '/gaming', desc: 'Max FPS and supreme performance' },
    { name: 'Creator X PC Series', href: '/creator', desc: 'Built for intense rendering workloads' },
    { name: 'Workstation AI PC Series', href: '/workstation', desc: 'Deep learning & compute powerhouses' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-[100] bg-black/70 backdrop-blur-2xl border-b border-white/10 h-24 flex items-center transition-all duration-300 shadow-2xl">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 w-full flex items-center justify-between relative h-full">
        
        <div className="flex items-center gap-4 md:gap-6">
          {/* Mobile Menu Icon (Hidden on Desktop) */}
          <button 
            className="lg:hidden text-white hover:text-[#A4F93F] transition-colors relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Global Brand Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center h-full">
            <img 
              src="/assets/brandassets/GEEKBOZ-BRAND-logo-2-copy.webp" 
              alt="GeekBoz Logo" 
              className="h-8 md:h-12 w-auto object-contain transition-transform hover:scale-105 duration-300"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 h-full">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
            <div key={link.name} className="relative group h-full flex items-center">
              <Link 
                href={link.href}
                className={`text-[15px] font-medium tracking-tight transition-colors duration-300 relative py-2 ${isActive ? 'text-[#A4F93F]' : 'text-white/80 group-hover:text-[#A4F93F]'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#A4F93F] transition-all duration-300 shadow-[0_0_8px_#A4F93F] ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
              
              {/* Tooltip Description on Hover (Excludes Home) */}
              {link.desc && (
                <div className="absolute top-[80%] left-1/2 -translate-x-1/2 pt-4 opacity-0 scale-95 origin-top pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-50">
                  <div className="bg-[#111] backdrop-blur-xl border border-white/10 rounded-[10px] px-5 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] flex flex-col items-center min-w-max relative">
                    {/* Tooltip Triangle Arrow */}
                    <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111] border-t border-l border-white/10 rotate-45"></div>
                    <span className="text-xs text-[#A4F93F] font-bold tracking-wider mb-1 uppercase">{link.name.replace(' Series', '')}</span>
                    <span className="text-sm font-medium text-white/70 whitespace-nowrap">{link.desc}</span>
                  </div>
                </div>
              )}
            </div>
          )})}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-6">
          <button className="text-white/80 hover:text-[#A4F93F] transition-colors group relative">
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#A4F93F] rounded-full animate-pulse shadow-[0_0_10px_#A4F93F]"></span>
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
          
          <button className="text-white/80 hover:text-[#A4F93F] transition-colors group">
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-3xl border-b border-white/10 lg:hidden shadow-2xl origin-top"
            style={{ maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto' }}
          >
            <nav className="flex flex-col px-6 py-4 divide-y divide-white/[0.06]">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-4 flex flex-col gap-1 group"
                  >
                    <span className={`text-lg font-bold tracking-tight transition-colors ${isActive ? 'text-[#A4F93F]' : 'text-white group-hover:text-[#A4F93F]'}`}>
                      {link.name}
                    </span>
                    {link.desc && (
                      <span className="text-xs text-white/40 font-medium tracking-tight">
                        {link.desc}
                      </span>
                    )}
                  </Link>
                );
              })}
              
              {/* Mobile Quick Actions */}
              <div className="py-6 flex flex-col gap-3">
                <button className="w-full py-4 bg-[#A4F93F] text-black text-xs font-bold tracking-[0.1em] uppercase rounded-lg hover:bg-[#b5ff5f] transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Cart
                </button>
                <button className="w-full py-4 bg-white/[0.04] border border-white/[0.08] text-white text-xs font-bold tracking-[0.1em] uppercase rounded-lg hover:bg-white/[0.08] transition-colors flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Account
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
