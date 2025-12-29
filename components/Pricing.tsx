
import React from 'react';
import { ShieldCheck, Lock, Server, ArrowRight, Zap } from 'lucide-react';
import { TranslationSchema } from '../types';

interface PricingProps {
  t: TranslationSchema;
  onNavigate: (view: 'computing' | 'not-found') => void;
}

const Pricing: React.FC<PricingProps> = ({ t, onNavigate }) => {
  return (
    <section id="pricing" className="py-16 md:py-32 relative overflow-hidden bg-black">
      
      {/* Connection Glow from Hero Section */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-900/20 via-blue-900/5 to-transparent blur-[60px] pointer-events-none z-0"></div>

      {/* Background Ambience - Deep and Liquid + Added Cyan Light */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] animate-drift"></div>
          <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[100px] animate-drift-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header - Left Aligned with padding as requested */}
        <div className="mb-12 md:mb-28 max-w-4xl md:pl-12">
            <h2 className="font-black mb-4 md:mb-6 tracking-tighter whitespace-pre-line leading-[1.1]"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.75rem)' }}
            >
                <span className="bg-gradient-to-r from-blue-400 via-white to-blue-200 bg-clip-text text-transparent">
                  {t.pricing.title}
                </span>
            </h2>
            <p className="text-gray-400 font-medium max-w-2xl leading-relaxed"
               style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}
            >
                {t.pricing.subtitle}
            </p>
        </div>

        {/* Liquid Glass Service Cards - Removed Hover Scale Effect */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {t.pricing.services.map((service, i) => {
            const Icon = service.iconType === 'lock' ? Lock : service.iconType === 'shield' ? ShieldCheck : Zap;
            
            // Varied accent colors based on index
            const accentColor = i === 0 ? 'blue' : i === 1 ? 'indigo' : 'cyan';
            
            return (
              <div 
                key={i} 
                className="group relative rounded-[30px] md:rounded-[40px] p-[1px] transition-all duration-500"
              >
                {/* 1. Fluid Border Gradient Layer (Stronger on hover) */}
                <div className={`absolute inset-0 rounded-[30px] md:rounded-[40px] bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* 2. Liquid Glow Background (Moves on Hover) */}
                <div className="absolute inset-0 rounded-[30px] md:rounded-[40px] overflow-hidden">
                    <div className={`absolute -inset-[100%] bg-gradient-to-r from-transparent via-${accentColor}-500/20 to-transparent group-hover:animate-[shimmer_3s_infinite] rotate-45`}></div>
                </div>

                {/* 3. Main Card Content (Enhanced Liquid Glass) */}
                <div className="relative h-full bg-white/5 backdrop-blur-[40px] rounded-[29px] md:rounded-[39px] p-6 md:p-10 border border-white/10 flex flex-col overflow-hidden shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
                    
                    {/* Top Decorative Light Leak - Inner Glow */}
                    <div className={`absolute -top-10 -right-10 w-40 h-40 bg-${accentColor}-500/20 rounded-full blur-[50px] group-hover:bg-${accentColor}-400/30 transition-colors duration-500`}></div>

                    {/* Icon Container - Floating 3D Feel */}
                    <div className={`
                        w-14 h-14 md:w-16 md:h-16 rounded-2xl mb-6 md:mb-8 flex items-center justify-center 
                        bg-gradient-to-br from-white/10 to-transparent border border-white/20 
                        shadow-[0_8px_32px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500
                        backdrop-blur-md relative z-10
                    `}>
                        <Icon className={`w-7 h-7 md:w-8 md:h-8 text-${accentColor}-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]`} />
                    </div>

                    {/* Text Content */}
                    <div className="mb-6 md:mb-8 relative z-10">
                        <div className={`text-[10px] md:text-xs font-bold text-${accentColor}-300 mb-2 uppercase tracking-widest`}>
                            {service.subtitle}
                        </div>
                        <h3 className="font-bold text-white mb-3 md:mb-4 leading-tight drop-shadow-md" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)' }}>
                            {service.title}
                        </h3>
                        <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6 border-l-2 border-white/20 pl-4">
                            {service.description}
                        </p>
                    </div>

                    {/* Feature Details List */}
                    <ul className="space-y-3 mb-8 md:mb-10 flex-grow relative z-10">
                        {service.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-xs md:text-sm text-gray-200">
                                <div className={`w-1.5 h-1.5 rounded-full bg-${accentColor}-400 shadow-[0_0_8px_currentColor]`}></div>
                                {detail}
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button - Glass Pill */}
                    <button 
                        onClick={() => {
                            if (i === 0) {
                                onNavigate('computing');
                            } else {
                                onNavigate('not-found');
                            }
                        }}
                        className="w-full mt-auto py-3.5 md:py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs md:text-sm font-bold flex items-center justify-between px-6 transition-all group/btn shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                    >
                        {service.cta}
                        <div className={`w-8 h-8 rounded-full bg-${accentColor}-500/20 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform border border-white/10`}>
                            <ArrowRight className={`w-4 h-4 text-${accentColor}-300`} />
                        </div>
                    </button>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
