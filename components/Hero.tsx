
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { TranslationSchema } from '../types';

interface HeroProps {
  t: TranslationSchema;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onNavigate: (view: 'pricing') => void;
}

const Hero: React.FC<HeroProps> = ({ t, onOpenAuth, onNavigate }) => {
  return (
    <section className="relative overflow-hidden"
      style={{
          paddingTop: 'clamp(8rem, 18vh, 12rem)', // Fluid top padding
          paddingBottom: 'clamp(4rem, 10vh, 8rem)' // Fluid bottom padding
      }}
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-drift"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-indigo-600/10 rounded-full blur-[140px] -z-10 animate-drift-slow"></div>

      {/* Connection Glow to Pricing Section */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-blue-900/30 via-blue-900/10 to-transparent blur-[60px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-blue-400 tracking-[0.2em] uppercase">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]"></div>
          Powerful GEN 2 Portal
        </div>
        
        {/* Fluid Title Size */}
        <h1 className="font-black mb-6 leading-[1.15] tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent max-w-5xl mx-auto whitespace-pre-line"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)' }}
        >
          {t.hero.title}
        </h1>

        {/* Fluid Subtitle Size */}
        <p className="max-w-xl mx-auto text-gray-400 mb-10 leading-relaxed font-medium px-4"
           style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.125rem)' }}
        >
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => onOpenAuth('login')}
            className="w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-4 bg-white text-black font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-95 text-sm md:text-base"
          >
            {t.hero.cta}
            <ChevronRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => onNavigate('pricing')}
            className="w-full sm:w-auto px-8 py-3.5 md:px-10 md:py-4 glass text-white font-black rounded-2xl hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center text-sm md:text-base"
          >
            {t.hero.secondary}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
