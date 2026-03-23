'use client';

import Link from 'next/link';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  image: string;
  originalPrice: number;
  offerPrice: number;
  discount: number;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
  };
  delay?: number;
}

export default function ProductCard({
  id,
  name,
  category,
  image,
  originalPrice,
  offerPrice,
  discount,
  specs,
}: ProductCardProps) {
  return (
    <div
      className="group relative w-full flex flex-col overflow-hidden
                 bg-[#0a0a0a] border border-white/[0.08]
                 hover:border-[#A4F93F]/35
                 transition-all duration-500
                 shadow-[0_8px_40px_rgba(0,0,0,0.55)]
                 hover:shadow-[0_24px_64px_-12px_rgba(164,249,63,0.10)]"
      style={{ borderRadius: 'clamp(12px, 3%, 20px)' }}
    >
      {/* Top shimmer line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] group-hover:via-[#A4F93F]/40 to-transparent transition-colors duration-500 z-10" />

      {/* ── DISCOUNT BADGE ──────────────────────────────────────────────────── */}
      <div
        className="absolute z-20 bg-[#A4F93F] text-black font-extrabold uppercase
                   shadow-[0_2px_12px_rgba(164,249,63,0.25)]"
        style={{
          top: '16px',
          left: '16px',
          fontSize: 'clamp(10px, 2.8%, 13px)',
          padding: 'clamp(5px, 1.2%, 7px) clamp(10px, 2.5%, 14px)',
          borderRadius: 'clamp(5px, 1.2%, 8px)',
          letterSpacing: '0.06em',
        }}
      >
        {discount}% OFF
      </div>

      {/* ── INFO ICON + SPECS POPOVER ───────────────────────────────────────── */}
      <div
        className="group/info absolute z-30"
        style={{
          top: '16px',
          right: '16px',
        }}
      >
        <button
          className="rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.08]
                     flex items-center justify-center
                     text-white/40 hover:text-[#A4F93F] hover:border-[#A4F93F]/30 hover:bg-[#A4F93F]/[0.06]
                     transition-all duration-300"
          style={{
            width: '34px',
            height: '34px',
          }}
        >
          <svg
            fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}
            style={{ width: '16px', height: '16px' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Specs popover */}
        <div
          className="absolute w-56
                     bg-[#0f0f0f]/95 backdrop-blur-2xl border border-white/[0.08] p-4
                     opacity-0 scale-95 origin-top-right pointer-events-none
                     group-hover/info:opacity-100 group-hover/info:scale-100
                     transition-all duration-300 shadow-[0_16px_48px_rgba(0,0,0,0.6)] z-50"
          style={{
            top: 'calc(100% + 8px)',
            right: '0',
            borderRadius: '14px',
          }}
        >
          <h4 className="text-[#A4F93F] text-[10px] font-bold tracking-[0.14em] mb-3 uppercase border-b border-white/[0.06] pb-2">
            Hardware Specs
          </h4>
          <ul className="space-y-2.5 text-[11px]">
            {[
              ['CPU', specs.cpu],
              ['GPU', specs.gpu],
              ['RAM', specs.ram],
              ['SSD', specs.storage],
            ].map(([label, value]) => (
              <li key={label} className="flex items-center justify-between gap-3">
                <span className="text-white/30 text-[10px] font-semibold tracking-wider uppercase shrink-0">{label}</span>
                <span className="text-white/75 text-right font-medium tracking-tight truncate">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── IMAGE AREA ──────────────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: '4 / 3',
          background: 'linear-gradient(180deg, #131313 0%, #0a0a0a 100%)',
        }}
      >
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 40%, rgba(10,10,10,0.5) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-[2] pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
          <svg className="w-1/3 h-1/3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zm0 2.828l7.172 3.586L12 11.999l-7.172-3.585L12 4.828zM2 9v10l10 5 10-5V9l-10 5-10-5z" />
          </svg>
        </div>

        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-contain object-center
                     group-hover:scale-[1.08]
                     transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                     drop-shadow-[0_18px_36px_rgba(0,0,0,0.65)]
                     z-0"
          style={{ padding: '8%' }}
        />
      </div>

      {/* ── CARD BODY ────────────────────────────────────────────────────────── */}
      <div
        className="relative z-20 flex flex-col flex-1"
        style={{ padding: 'clamp(16px, 6%, 28px)' }}
      >
        {/* Category */}
        <p
          className="text-white/35 font-bold uppercase"
          style={{
            fontSize: 'clamp(10px, 2.8%, 13px)',
            letterSpacing: '0.18em',
            marginBottom: 'clamp(4px, 1.2%, 8px)',
          }}
        >
          {category}
        </p>

        {/* Name */}
        <h3
          className="font-extrabold text-white tracking-tight leading-[1.1]
                     group-hover:text-[#A4F93F] transition-colors duration-300
                     line-clamp-2"
          style={{
            fontSize: 'clamp(18px, 5%, 24px)',
            marginBottom: 'clamp(12px, 4%, 18px)',
          }}
        >
          {name}
        </h3>

        {/* Spec pills */}
        <div
          className="flex flex-wrap gap-2 overflow-hidden"
          style={{
            maxHeight: 'clamp(0px, 18%, 70px)',
            marginBottom: 'clamp(12px, 4%, 18px)',
          }}
        >
          {[specs.cpu, specs.gpu].map((spec) => (
            <span
              key={spec}
              className="text-white/35 bg-white/[0.04] border border-white/[0.07] truncate"
              style={{
                fontSize: 'clamp(10px, 2.6%, 12px)',
                padding: 'clamp(4px, 1%, 6px) clamp(10px, 2.5%, 14px)',
                borderRadius: 'clamp(5px, 1.2%, 8px)',
                maxWidth: '48%',
                letterSpacing: '0.02em',
              }}
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div
          className="flex items-end justify-between mt-auto"
          style={{
            paddingTop: 'clamp(12px, 4%, 18px)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div className="flex flex-col">
            <p
              className="font-medium text-white/25 line-through tracking-tight"
              style={{ fontSize: 'clamp(12px, 3%, 14px)' }}
            >
              ₹{originalPrice.toLocaleString('en-IN')}
            </p>
            <p
              className="font-black text-white tracking-tighter leading-none"
              style={{
                fontSize: 'clamp(22px, 6%, 30px)',
                marginTop: '3px',
              }}
            >
              ₹{offerPrice.toLocaleString('en-IN')}
            </p>
          </div>

          {/* CTA button */}
          <Link href={`/product/${id}`}>
            <button
              className="border border-white/[0.08] bg-white/[0.04]
                         hover:bg-[#A4F93F] hover:border-[#A4F93F] hover:text-black
                         text-white/80 font-bold uppercase
                         transition-all duration-300 whitespace-nowrap
                         hover:shadow-[0_0_20px_rgba(164,249,63,0.15)]"
              style={{
                fontSize: 'clamp(10px, 2.8%, 13px)',
                padding: 'clamp(10px, 2.5%, 14px) clamp(18px, 4.5%, 26px)',
                borderRadius: 'clamp(6px, 1.5%, 10px)',
                letterSpacing: '0.12em',
              }}
            >
              View Build
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}