'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const FRAME_COUNT = 192;

export default function PCScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    let isCancelled = false;

    const generateFallbackFrame = (index: number): string => {
      const cvs = document.createElement('canvas');
      cvs.width = 1920;
      cvs.height = 1080;
      const ctx = cvs.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 1920, 1080);
      
        ctx.save();
        ctx.translate(1920 / 2, 1080 / 2);
        
        const p = index / (FRAME_COUNT - 1);
        const explode = Math.sin(p * Math.PI); 
        const gap = explode * 250; 
        
        ctx.shadowColor = 'rgba(0,0,0,0.1)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetY = 20;
      
        const drawPart = (color: string, x: number, y: number, w: number, h: number, label: string) => {
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.roundRect(x, y, w, h, 8);
          ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,0.8)';
          ctx.font = '600 24px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(label, x + w/2, y + h/2);
        };
      
        drawPart('#9ca3af', -180, -250, 360, 500, 'Motherboard');
        drawPart('#1f2937', -150, 180 + gap * 1.5, 300, 120, '1000W PSU');
        drawPart('#374151', -50, -100 - gap, 100, 100, 'CPU Cooler');
        drawPart('#111827', 80 + gap * 0.5, -120 - gap * 0.2, 20, 140, '');
        drawPart('#111827', 110 + gap * 0.6, -120 - gap * 0.2, 20, 140, '');
        drawPart('#111827', 140 + gap * 0.7, -120 - gap * 0.2, 20, 140, '');
        drawPart('#111827', 170 + gap * 0.8, -120 - gap * 0.2, 20, 140, '');
      
        ctx.shadowBlur = 60;
        ctx.shadowOffsetY = 30;
        drawPart('#030712', -220 - gap*1.2, 0, 440, 120, 'RTX 4090 SUPREME');
      
        ctx.shadowColor = 'transparent';
        ctx.fillStyle = 'rgba(255,255,255,0.05)';
        ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        ctx.lineWidth = 2;
        const glassZ = gap * 2; 
        ctx.beginPath();
        ctx.roundRect(-250 + glassZ, -300 + glassZ*0.1, 500, 600, 16);
        ctx.fill();
        ctx.stroke();
      
        ctx.restore();
      }
      return cvs.toDataURL('image/webp', 0.8);
    };

    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      const onImageReady = () => {
        if (isCancelled) return;
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };

      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = `/assets/pcsequence/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;
        
        img.onload = onImageReady;
        img.onerror = () => {
          img.onload = onImageReady;
          img.src = generateFallbackFrame(i);
        };
        loadedImages.push(img);
      }
    };
    
    loadImages();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const renderFrame = (index: number) => {
      if (!images[index] || !images[index].complete || images[index].naturalWidth === 0) return;

      const img = images[index];

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      renderFrame(Math.round(frameIndex.get()));
    };

    window.addEventListener('resize', resize);
    resize();

    const unsubscribe = frameIndex.on('change', (latest) => {
      animationFrameId = requestAnimationFrame(() => {
        renderFrame(Math.round(latest));
      });
    });

    return () => {
      window.removeEventListener('resize', resize);
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [loaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[250vh] sm:h-[280vh] md:h-[300vh] w-full bg-black">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center">
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
            <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-white/10 border-t-[#A4F93F] animate-spin rounded-full mb-4 sm:mb-6"></div>
            <p className="text-white/60 font-medium tracking-tight text-sm sm:text-base">Loading GeekBoz PC sequence...</p>
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* --- NARRATIVE OVERLAYS --- */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-6 sm:right-6 md:bottom-16 md:left-16 md:right-auto lg:bottom-24 lg:left-24 z-50 pointer-events-none">
          
          {/* Phase 1: 0% -> 25% */}
          <ScrollBlock progress={scrollYProgress} range={[0, 0.05, 0.20, 0.25]}>
            <div className="bg-black/70 sm:bg-black/60 backdrop-blur-xl border border-white/10 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl inline-block">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter mb-1 sm:mb-2 text-white drop-shadow-lg whitespace-nowrap">GeekBoz Computers.</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#A4F93F] tracking-tight font-medium whitespace-nowrap">Premium PC Building & Service Center.</p>
            </div>
          </ScrollBlock>

          {/* Phase 2: 25% -> 50% */}
          <ScrollBlock progress={scrollYProgress} range={[0.25, 0.30, 0.45, 0.50]}>
            <div className="bg-black/70 sm:bg-black/60 backdrop-blur-xl border border-white/10 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl inline-block">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter mb-1 sm:mb-2 text-white drop-shadow-lg whitespace-nowrap">Masterful Builds.</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 tracking-tight font-medium whitespace-nowrap">Precision assembly & Elite cable management.</p>
            </div>
          </ScrollBlock>

          {/* Phase 3: 50% -> 75% */}
          <ScrollBlock progress={scrollYProgress} range={[0.50, 0.55, 0.70, 0.75]}>
            <div className="bg-black/70 sm:bg-black/60 backdrop-blur-xl border border-white/10 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl inline-block">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter mb-1 sm:mb-2 text-white drop-shadow-lg whitespace-nowrap">Expert Repairs.</h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 tracking-tight font-medium whitespace-nowrap">Deep diagnostics and hardware tuning.</p>
            </div>
          </ScrollBlock>

          {/* Phase 4: 75% -> 100% */}
          <ScrollBlock progress={scrollYProgress} range={[0.75, 0.80, 0.99, 1]}>
            <div className="bg-black/70 sm:bg-black/60 backdrop-blur-xl border border-[#A4F93F]/20 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-[0_0_50px_-20px_#A4F93F] pointer-events-auto inline-block">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tighter mb-2 sm:mb-4 text-white drop-shadow-lg whitespace-nowrap">Your Dream PC Awaits.</h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6">
                <button className="px-5 py-2.5 sm:px-6 sm:py-3 bg-[#A4F93F] text-black text-sm sm:text-base font-bold tracking-tight rounded-full hover:scale-105 active:scale-95 transition-transform duration-300">
                  Contact Us
                </button>
                <p className="text-xs sm:text-sm md:text-base text-white/60 tracking-tight font-medium">Scroll to explore services.</p>
              </div>
            </div>
          </ScrollBlock>
        </div>

        {/* --- MOBILE PRODUCT TAGS (vertical column, top-right, visible < md) --- */}
        <MobileTagsList progress={scrollYProgress} />


        {/* --- DESKTOP FLOATING COMPONENT TAGS --- */}
        
        {/* GBZ Prebuild PC Series Tag - Top Left */}
        <FloatingTag 
          progress={scrollYProgress} 
          range={[0, 0.01, 0.75, 0.85]} 
          className="hidden md:block absolute top-[14%] left-[3%] lg:left-[5%] xl:left-[12%]"
          delay={0}
          href="/gbz-prebuild-series"
          side="left"
        >
          <span className="text-[#A4F93F] font-bold text-[9px] tracking-widest uppercase">Premium Builds</span><br/>
          <span className="text-lg lg:text-xl font-bold tracking-tight block mb-1">GBZ Prebuild PC Series</span>
          <span className="text-xs text-white/50 max-w-[180px] lg:max-w-[220px] block leading-relaxed transition-all duration-300 group-hover:opacity-0 group-hover:hidden truncate">Engineered for immediate dominance.</span>
          <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 ease-out">
            <p className="text-xs text-white/80 leading-relaxed max-w-[220px]">
               No wait times. Hand-crafted precision systems loaded with tier-1 components and aggressively benchmarked. Click to view catalog.
            </p>
          </div>
        </FloatingTag>

        {/* Gaming PC Series Tag - Right */}
        <FloatingTag 
          progress={scrollYProgress} 
          range={[0, 0.01, 0.80, 0.90]} 
          className="hidden md:block absolute top-[30%] right-[3%] lg:right-[5%] xl:right-[10%]"
          delay={0.5}
          href="/gaming-pc-series"
          side="right"
        >
          <span className="text-[#A4F93F] font-bold text-[9px] tracking-widest uppercase">Maximum Framerates</span><br/>
          <span className="text-lg lg:text-xl font-bold tracking-tight block mb-1">Gaming PC Series</span>
          <span className="text-xs text-white/50 max-w-[180px] lg:max-w-[220px] block leading-relaxed transition-all duration-300 group-hover:opacity-0 group-hover:hidden truncate">Uncompromised 4K AAA experiences.</span>
          <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 ease-out">
            <p className="text-xs text-white/80 leading-relaxed max-w-[220px]">
               Esports mastery and cinematic immersion powered by the latest RTX hardware and custom liquid cooling systems.
            </p>
          </div>
        </FloatingTag>

        {/* Creator X PC Series Tag - Left, repositioned higher to clear narrative */}
        <FloatingTag 
          progress={scrollYProgress} 
          range={[0, 0.01, 0.85, 0.95]} 
          className="hidden md:block absolute top-[42%] left-[3%] lg:left-[5%] xl:left-[15%]"
          delay={1}
          href="/creator-x-pc-series"
          side="left"
        >
          <span className="text-[#A4F93F] font-bold text-[9px] tracking-widest uppercase">Studio Grade Workflows</span><br/>
          <span className="text-lg lg:text-xl font-bold tracking-tight block mb-1">Creator X PC Series</span>
          <span className="text-xs text-white/50 max-w-[180px] lg:max-w-[220px] block leading-relaxed transition-all duration-300 group-hover:opacity-0 group-hover:hidden truncate">Accelerated rendering pipelines.</span>
          <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 ease-out">
            <p className="text-xs text-white/80 leading-relaxed max-w-[220px]">
               Built for heavy lifting: 8K video editing, massive 3D renders, and real-time visualization software utilizing high core counts.
            </p>
          </div>
        </FloatingTag>

        {/* Workstation AI PC Series Tag - Right */}
        <FloatingTag 
          progress={scrollYProgress} 
          range={[0, 0.01, 0.90, 1]} 
          className="hidden md:block absolute top-[55%] right-[3%] lg:right-[5%] xl:right-[15%]"
          delay={1.5}
          href="/workstation-ai-pc-series"
          side="right"
        >
          <span className="text-[#A4F93F] font-bold text-[9px] tracking-widest uppercase">Enterprise Scale</span><br/>
          <span className="text-lg lg:text-xl font-bold tracking-tight block mb-1">Workstation AI PC Series</span>
          <span className="text-xs text-white/50 max-w-[180px] lg:max-w-[220px] block leading-relaxed transition-all duration-300 group-hover:opacity-0 group-hover:hidden truncate">Local Machine Learning infrastructure.</span>
          <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 ease-out">
            <p className="text-xs text-white/80 leading-relaxed max-w-[220px]">
               Massive multi-GPU arrays and specialized hardware topologies assembled strictly for deep learning and heavy data science computations.
            </p>
          </div>
        </FloatingTag>
        
      </div>
    </div>
  );
}

// Cinematic crossfade block for bottom narrative
function ScrollBlock({ 
  children, 
  progress, 
  range 
}: { 
  children: React.ReactNode, 
  progress: MotionValue<number>, 
  range: number[] 
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [20, 0, 0, -20]);

  return (
    <motion.div style={{ opacity, y }} className="absolute bottom-0 left-0 w-full pointer-events-auto">
      {children}
    </motion.div>
  );
}

function FloatingTag({ 
  children, 
  progress, 
  range,
  className,
  delay,
  href,
  side = 'left'
}: { 
  children: React.ReactNode, 
  progress: MotionValue<number>, 
  range: number[],
  className: string,
  delay: number,
  href: string,
  side?: 'left' | 'right'
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const scale = useTransform(progress, range, [0.8, 1, 1, 0.8]);

  return (
    <motion.div 
      style={{ opacity, scale }} 
      className={`z-[70] pointer-events-none ${className}`}
    >
      <motion.a 
        href={href}
        animate={{ y: [0, -10, 0] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        className="block group pointer-events-auto cursor-pointer bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 lg:p-5 text-white shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)] hover:bg-black/90 hover:border-[#A4F93F]/40 hover:scale-[1.12] hover:-translate-y-4 hover:shadow-[0_0_60px_-15px_rgba(164,249,63,0.6)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] relative overflow-visible origin-center"
      >
        {/* Ping dot */}
        <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_#A4F93F] bg-[#A4F93F] animate-ping absolute top-1/2 -translate-y-1/2 ${side === 'left' ? '-left-4' : '-right-4'}`}></div>
        {/* Connector line */}
        <div className={`absolute top-1/2 w-[35px] h-[1px] hidden md:block ${side === 'left' ? '-left-[40px] bg-gradient-to-r from-transparent to-[#A4F93F]/50' : '-right-[40px] bg-gradient-to-l from-transparent to-[#A4F93F]/50'}`}></div>

        {/* HUD Corner Accents */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#A4F93F]/0 group-hover:border-[#A4F93F] transition-colors duration-500 rounded-tl-sm pointer-events-none"></div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#A4F93F]/0 group-hover:border-[#A4F93F] transition-colors duration-500 rounded-br-sm pointer-events-none"></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#A4F93F]/0 group-hover:border-[#A4F93F] transition-colors duration-500 rounded-tr-sm pointer-events-none"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#A4F93F]/0 group-hover:border-[#A4F93F] transition-colors duration-500 rounded-bl-sm pointer-events-none"></div>

        {children}
      </motion.a>
    </motion.div>
  );
}

const MOBILE_TAGS = [
  { label: 'Premium Builds', name: 'GBZ Prebuild', href: '/gbz-prebuild-series' },
  { label: 'Max FPS', name: 'Gaming PC', href: '/gaming-pc-series' },
  { label: 'Studio Grade', name: 'Creator X', href: '/creator-x-pc-series' },
  { label: 'Enterprise', name: 'Workstation AI', href: '/workstation-ai-pc-series' },
];

function MobileTagsList({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.02, 0.70, 0.78], [0, 1, 1, 0]);

  return (
    <motion.div 
      style={{ opacity }} 
      className="md:hidden absolute top-20 right-3 sm:right-4 z-40 flex flex-col gap-2"
    >
      {MOBILE_TAGS.map((item, i) => (
        <motion.a
          key={item.href}
          href={item.href}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 * i, duration: 0.4, ease: 'easeOut' }}
          className="block bg-black/70 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 active:scale-95 active:border-[#A4F93F]/40 transition-all duration-200"
        >
          <span className="text-[#A4F93F] font-bold text-[7px] sm:text-[8px] tracking-widest uppercase block leading-none">{item.label}</span>
          <span className="text-white text-xs sm:text-sm font-bold tracking-tight block mt-0.5">{item.name}</span>
        </motion.a>
      ))}
    </motion.div>
  );
}