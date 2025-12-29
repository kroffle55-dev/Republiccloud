
import React from 'react';
import { Globe, Radio, Zap, Server } from 'lucide-react';
import { TranslationSchema } from '../types';

interface GlobalScaleProps {
  t: TranslationSchema;
}

const GlobalScale: React.FC<GlobalScaleProps> = ({ t }) => {
  return (
    <section className="py-16 md:py-24 bg-black relative">
       {/* Map Grid Background */}
       <div className="absolute inset-0 opacity-20 pointer-events-none">
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
       </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent whitespace-pre-line">
                {t.global.title}
            </h2>
            <p className="text-gray-400 text-sm md:text-lg whitespace-pre-line">
                {t.global.subtitle}
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {t.global.items.map((item, i) => {
                const Icon = i === 0 ? Globe : i === 1 ? Zap : Radio;
                return (
                    <div key={i} className="group p-6 md:p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:bg-zinc-900/50 hover:border-blue-500/20 transition-all duration-300">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{item.title}</h3>
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                )
            })}
        </div>
      </div>
    </section>
  );
};

export default GlobalScale;
