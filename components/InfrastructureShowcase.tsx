
import React from 'react';
import { Cpu, HardDrive, Zap } from 'lucide-react';
import { TranslationSchema } from '../types';

interface InfrastructureShowcaseProps {
  t: TranslationSchema;
}

const InfrastructureShowcase: React.FC<InfrastructureShowcaseProps> = ({ t }) => {
  return (
    <section className="py-16 md:py-24 relative bg-black overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            
            {/* Left: Text Content - Added md:pl-12 */}
            <div className="flex-1 lg:pr-12 md:pl-12 w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-bold text-gray-300 mb-6">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>NEXT-GEN HARDWARE</span>
                </div>
                
                {/* Fluid Title */}
                <h2 className="font-black mb-6 tracking-tight leading-[1.1] whitespace-pre-line"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
                >
                    {t.infrastructure.title}
                </h2>
                
                {/* Fluid Description */}
                <p className="text-gray-400 mb-10 leading-relaxed whitespace-pre-line"
                   style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.125rem)' }}
                >
                    {t.infrastructure.subtitle}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                    {t.infrastructure.stats.map((stat, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg">
                            <div className="font-black text-white mb-1" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)' }}>
                                {stat.value}
                            </div>
                            <div className="text-[10px] md:text-xs text-gray-500 uppercase font-bold tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Visual Card */}
            <div className="flex-1 w-full">
                <div className="relative group">
                    {/* Glow Effect behind the card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[30px] blur-[30px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                    
                    {/* Glass Card */}
                    <div className="relative rounded-[30px] bg-[#050505]/80 backdrop-blur-xl border border-white/10 p-8 md:p-12 overflow-hidden">
                        
                        {/* Abstract Chip Visualization */}
                        <div className="flex justify-center mb-8 relative">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center relative shadow-2xl">
                                {/* Circuit Lines */}
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:10px_10px]"></div>
                                <div className="absolute inset-0 border-2 border-blue-500/20 rounded-3xl animate-pulse"></div>
                                <Cpu className="w-16 h-16 md:w-24 md:h-24 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                                
                                {/* Floating Particles */}
                                <div className="absolute -right-4 -top-4 w-8 h-8 bg-blue-500/20 rounded-full blur-md animate-float"></div>
                                <div className="absolute -left-6 bottom-8 w-6 h-6 bg-purple-500/20 rounded-full blur-md animate-float" style={{ animationDelay: '1s' }}></div>
                            </div>
                        </div>

                        <div className="text-center">
                            <h3 className="text-lg md:text-xl font-bold text-white mb-2">{t.infrastructure.cardTitle}</h3>
                            <p className="text-xs md:text-sm text-gray-400">
                                {t.infrastructure.cardDesc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default InfrastructureShowcase;
