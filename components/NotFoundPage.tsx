
import React from 'react';
import { TranslationSchema } from '../types';
import { Home, Terminal, ArrowRight } from 'lucide-react';

interface NotFoundPageProps {
  t: TranslationSchema;
  onNavigate: (view: 'features' | 'pricing' | 'status' | 'docs' | 'landing') => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ t, onNavigate, onOpenAuth }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-black">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-purple-900/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* Giant 404 Text - Fluid Typography using clamp() */}
        {/* Scales smoothly between 120px and 300px based on viewport width */}
        <h1 className="font-black text-transparent bg-clip-text bg-gradient-to-b from-white/10 via-white/5 to-transparent leading-none select-none blur-[2px] opacity-80 pointer-events-none"
            style={{
                fontSize: 'clamp(120px, 25vw, 320px)',
                marginBottom: 'clamp(-40px, -6vw, -80px)'
            }}
        >
            404
        </h1>
        
        {/* Main Content overlapping the bottom of 404 text slightly */}
        <div className="relative z-10 backdrop-blur-sm p-6 md:p-10 rounded-[30px] max-w-2xl w-full">
            <h2 className="font-black text-white mb-6 tracking-tight drop-shadow-xl"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
            >
                {t.notFound.title}
            </h2>
            
            <p className="text-gray-400 leading-relaxed max-w-lg mx-auto font-medium mb-10"
               style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)' }}
            >
                {t.notFound.desc}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <button 
                    onClick={() => onNavigate('landing')}
                    className="w-full sm:w-auto min-w-[160px] px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all transform hover:-translate-y-1 shadow-lg shadow-white/10 active:scale-95 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                    <Home className="w-4 h-4 md:w-5 md:h-5" />
                    {t.notFound.button}
                </button>

                <button 
                    onClick={() => onOpenAuth('login')}
                    className="w-full sm:w-auto min-w-[160px] px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group text-sm md:text-base"
                >
                    <Terminal className="w-4 h-4 md:w-5 md:h-5" />
                    {t.notFound.portalButton}
                    <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
