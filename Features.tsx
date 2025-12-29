
import React from 'react';
import { TranslationSchema } from '../types';
import { Zap, Activity, Shield, BarChart3 } from 'lucide-react';

interface FeaturesProps {
  t: TranslationSchema;
}

const icons = [Zap, Activity, Shield, BarChart3];

const Features: React.FC<FeaturesProps> = ({ t }) => {
  return (
    <section id="features" className="py-24 bg-zinc-950/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 tracking-tight">
          {t.features.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.features.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div 
                key={i} 
                className="group p-8 rounded-3xl glass border border-white/5 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                  <Icon className="w-7 h-7 text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
