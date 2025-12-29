
import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { translations } from './translations';
import Header from './components/Header';
import Hero from './components/Hero';
import Pricing from './components/Pricing'; // Used as Service Showcase now
import InfrastructureShowcase from './components/InfrastructureShowcase';
import GlobalScale from './components/GlobalScale';
import Footer from './components/Footer';
import AuthModal, { UserAccount } from './components/AuthModal';
import StatusPage from './components/StatusPage';
import DocsPage from './components/DocsPage';
import NotFoundPage from './components/NotFoundPage';
import ProductPage from './components/ProductPage';
import { Server, Monitor, Smartphone, AlertTriangle, Check, ArrowRight } from 'lucide-react';

// Define the valid view types including the new specific product pages
type ViewType = 
  | 'landing' 
  | 'portal' 
  | 'status' 
  | 'docs' 
  | 'not-found' 
  | 'cloud-compute' 
  | 'bare-metal' 
  | 'auto-scaling' 
  | 'hdd' 
  | 'nas' 
  | 'firewall' 
  | 'ddos' 
  | 'load-balancing';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ko');
  const [view, setView] = useState<ViewType>('landing');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Track if user has visited portal in this session
  const [hasVisitedPortal, setHasVisitedPortal] = useState(false);
  
  // Mobile Warning State
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Simulated Database (Local State + LocalStorage)
  const [accounts, setAccounts] = useState<UserAccount[]>([]);

  // Load accounts from localStorage on mount
  useEffect(() => {
    const savedAccounts = localStorage.getItem('republic_users');
    if (savedAccounts) {
      try {
        setAccounts(JSON.parse(savedAccounts));
      } catch (e) {
        console.error("Failed to load accounts", e);
      }
    }
  }, []);

  // Save accounts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('republic_users', JSON.stringify(accounts));
  }, [accounts]);

  // Check for Mobile on Portal Enter
  useEffect(() => {
    if (view === 'portal') {
      const isMobile = window.innerWidth < 768;
      const hideWarning = localStorage.getItem('republic_hide_mobile_warning');
      
      if (isMobile && !hideWarning) {
        // Small delay to appear after transition
        setTimeout(() => setShowMobileWarning(true), 500);
      }
    }
  }, [view]);

  const handleMobileWarningConfirm = () => {
    if (dontShowAgain) {
      localStorage.setItem('republic_hide_mobile_warning', 'true');
    }
    setShowMobileWarning(false);
  };

  const t = translations[lang];

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsTransitioning(true);
    setLoadingProgress(0);
  };

  const handleSignup = (user: UserAccount) => {
    if (accounts.some(acc => acc.email === user.email)) {
      alert(lang === 'ko' ? '이미 존재하는 이메일입니다.' : 'Email already exists');
      return false;
    }
    setAccounts(prev => [...prev, user]);
    return true;
  };

  const handleLogin = (email: string, password: string) => {
    const user = accounts.find(acc => acc.email === email && acc.password === password);
    if (user) {
      return true;
    }
    return false;
  };

  // Navigation Logic
  const handleNavigate = (targetView: any) => {
    if (targetView === 'features' || targetView === 'pricing') {
        if (view !== 'landing') {
            setView('landing');
            setTimeout(() => {
                const element = document.getElementById(targetView);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(targetView);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (targetView === 'computing') {
         // Fallback for old calls if any
         setView('cloud-compute');
         window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetView === 'storage') {
         setView('hdd');
         window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetView === 'network') {
         setView('firewall');
         window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setView(targetView);
    }
  };

  useEffect(() => {
    let interval: any;
    if (isTransitioning) {
      interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            
            // If already visited, shorter delay before switching
            const completionDelay = hasVisitedPortal ? 200 : 800;
            
            setTimeout(() => {
              setIsTransitioning(false);
              setView('portal');
              setHasVisitedPortal(true); // Mark as visited
            }, completionDelay);
            return 100;
          }

          // Calculate increment based on visit history
          let increment;
          if (hasVisitedPortal) {
            // Fast mode: 15-20% per tick
            increment = 15;
          } else {
            // Normal mode: Original logic (variable speed)
            increment = prev < 50 ? 3 : prev < 80 ? 1 : 4;
          }
          
          return Math.min(prev + increment, 100);
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isTransitioning, hasVisitedPortal]);

  const handleBackToLanding = () => {
    setView('landing');
  };

  // Helper to check if current view is a product page
  const isProductView = [
    'cloud-compute', 'bare-metal', 'auto-scaling',
    'hdd', 'nas',
    'firewall', 'ddos', 'load-balancing'
  ].includes(view);

  return (
    <div className={`min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white relative ${view === 'portal' ? 'font-neo' : ''}`}>
      {/* Modern Minimal Transition Screen */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black transition-opacity duration-700 ease-in-out font-neo">
          <div className="w-full max-w-sm px-8 flex flex-col items-center text-center">
            
            {/* Animated Server Icon */}
            <div className="mb-10 relative">
               <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse"></div>
               <Server className="w-16 h-16 text-blue-500 relative z-10 animate-server-pulse" />
               <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-green-400 rounded-full border-2 border-black animate-ping"></div>
            </div>

            <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
              {t.portal.loading}
            </h2>
            <p className="text-xs text-zinc-500 mb-8 font-medium">
              {t.portal.initializing}
            </p>
            
            {/* Thicker, Rounder, Shorter Progress Line */}
            <div className="w-48 h-2 bg-zinc-900 rounded-full overflow-hidden relative mb-3 shadow-inner">
              <div 
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-300 ease-out shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            
            <div className="text-[10px] tracking-widest font-bold text-zinc-600 uppercase">
              {loadingProgress}%
            </div>
          </div>
        </div>
      )}

      {/* Top & Bottom Fixed Gradient Blur Overlays */}
      <div 
        className="fixed top-0 left-0 w-full h-8 z-[45] pointer-events-none"
        style={{ 
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[12px]"></div>
      </div>
      <div 
        className="fixed bottom-0 left-0 w-full h-10 z-[45] pointer-events-none"
        style={{ 
          maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[12px]"></div>
      </div>

      {/* Decorative Moving Background Lights */}
      <div className="fixed top-0 left-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px] animate-drift"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/5 rounded-full blur-[150px] animate-drift-slow"></div>
      </div>

      {view !== 'portal' && (
          <Header 
            lang={lang} 
            setLang={setLang} 
            t={t} 
            onOpenAuth={handleOpenAuth}
            onNavigate={handleNavigate}
            currentView={view}
          />
      )}

      <main className="relative z-0">
        {/* Page Content Wrapper with Animation - Excludes Portal */}
        <div key={view} className={view !== 'portal' ? 'animate-slide-in-right' : ''}>
            {view === 'landing' && (
                <>
                    <Hero t={t} onOpenAuth={handleOpenAuth} onNavigate={handleNavigate} />
                    <Pricing t={t} onNavigate={handleNavigate} />
                    <InfrastructureShowcase t={t} />
                    <GlobalScale t={t} />

                    <section className="py-24 container mx-auto px-6">
                        <div className="relative p-12 md:p-20 rounded-[50px] overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-900 opacity-90 group-hover:opacity-100 transition-opacity duration-1000"></div>
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] mix-blend-overlay opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"></div>
                            
                            <div className="relative z-10 text-center flex flex-col items-center">
                            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tighter">
                                {lang === 'ko' ? '이제 준비 되셨나요?' : 'Are you ready?'}
                            </h2>
                            <p className="text-white/90 max-w-xl mb-2 text-lg md:text-xl font-medium leading-relaxed">
                                {lang === 'ko' 
                                ? '초기 도입비용 걱정없이, 무료*로 시작해보세요!' 
                                : 'Start for free* without worrying about initial costs!'}
                            </p>
                            <p className="text-white/60 text-xs mb-10 font-medium">
                                {lang === 'ko' 
                                ? '*비즈니스 회원 전용, 일부 예외.' 
                                : '*Business members only, some exceptions apply.'}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <button 
                                    onClick={() => {
                                        const element = document.getElementById('pricing');
                                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 hover:text-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl flex items-center justify-center gap-2"
                                >
                                    {lang === 'ko' ? 'Cloud 도입문의' : 'Contact Sales'}
                                    <ArrowRight className="w-4 h-4" />
                                </button>

                                <button 
                                    onClick={() => handleOpenAuth('login')}
                                    className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/50 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    {lang === 'ko' ? 'Portal 접속' : 'Access Portal'}
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {/* New Product Pages - Rendered dynamically based on view ID */}
            {isProductView && (
                <ProductPage 
                    t={t} 
                    productId={view as any} 
                    onOpenAuth={handleOpenAuth}
                    onNavigate={handleNavigate}
                />
            )}

            {view === 'status' && <StatusPage t={t} />}
            {view === 'docs' && <DocsPage t={t} />}
            {view === 'not-found' && (
            <NotFoundPage 
                t={t} 
                onNavigate={handleNavigate} 
                onOpenAuth={handleOpenAuth} 
            />
            )}
            
            {/* Render Footer for all pages except Portal */}
            {view !== 'portal' && <Footer t={t} />}
        </div>
      </main>

      {/* Portal View (Modal/Fullscreen) */}
      {view === 'portal' && (
        <>
          <AuthModal 
            isOpen={true}
            onClose={handleBackToLanding}
            initialMode={authMode}
            t={t}
            isFullscreen={true}
            setLang={setLang} // Pass setLang for Portal
            lang={lang}
            accounts={accounts}
            onSignup={handleSignup}
            onLogin={handleLogin}
          />

          {/* Mobile Warning Popup - Only shows on mobile + portal view */}
          {showMobileWarning && (
            <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
               <div className="w-full max-w-xs relative bg-[#111] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                  {/* Glass Reflection */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="flex items-center justify-center gap-3 mb-5">
                       <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-gray-400" />
                       </div>
                       <AlertTriangle className="w-5 h-5 text-yellow-500" />
                       <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <Monitor className="w-5 h-5 text-blue-400" />
                       </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">PC 접속 권장</h3>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                      Portal은 모바일 환경에 최적화 되어있지 않으며,<br/>
                      예기치 못한 문제<span className="text-red-400">*</span>가 발생할 수 있습니다.
                    </p>
                    
                    <p className="text-[10px] text-zinc-600 mb-6 font-medium">
                      *면책조항: 당사는 모바일 환경에서의 오류에 대해 책임지지 않습니다.
                    </p>

                    {/* Toggle */}
                    <div 
                      className="flex items-center gap-2 mb-5 cursor-pointer group"
                      onClick={() => setDontShowAgain(!dontShowAgain)}
                    >
                      <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${dontShowAgain ? 'bg-blue-500 border-blue-500' : 'border-zinc-600 group-hover:border-zinc-400'}`}>
                        {dontShowAgain && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors select-none">다시 보지 않기</span>
                    </div>

                    <button 
                      onClick={handleMobileWarningConfirm}
                      className="w-full py-3 bg-white text-black text-sm font-bold rounded-xl hover:bg-zinc-200 transition-colors active:scale-95"
                    >
                      확인
                    </button>
                  </div>
               </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
