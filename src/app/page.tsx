import PCScroll from '@/components/PCScroll';
import SystemsCarousel from '@/components/SystemsCarousel';
import ExpertiseScroll from '@/components/ExpertiseScroll';
import HomeServiceCTA from '@/components/HomeServiceCTA';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-black font-sans selection:bg-[#A4F93F]/30 text-white">
      <PCScroll />
      
      {/* Horizontal Cards Splashing Carousel */}
      <SystemsCarousel />

      {/* Horizontal Scroll Services Section */}
      <ExpertiseScroll />

      {/* Doorstep Service Section */}
      <HomeServiceCTA />

      {/* Global Contact Area */}
      <ContactSection />

      {/* Global CTA Section */}
      <section className="relative z-10 bg-[#0a0a0a] py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center bg-[#050505] border border-white/10 p-12 md:p-24 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[#A4F93F]/10 blur-[130px] pointer-events-none group-hover:bg-[#A4F93F]/20 transition-colors duration-700"></div>
          
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 relative z-10 text-white leading-none">Ready to build your <br className="hidden md:block"/> <span className="text-[#A4F93F]">dream rig?</span></h2>
          <p className="text-white/50 text-lg md:text-xl mb-12 max-w-xl mx-auto relative z-10 tracking-tight font-medium leading-relaxed">Stop by our center or schedule a consultation with our master builders today to map out your architecture.</p>
          
          <button className="px-12 py-5 bg-[#A4F93F] text-black text-sm md:text-base font-black tracking-widest uppercase rounded-none hover:scale-105 transition-transform duration-500 hover:shadow-[0_0_50px_-10px_#A4F93F] relative z-10">
            Schedule Consultation
          </button>
        </div>
      </section>
    </main>
  );
}
