
import React, { useState, useEffect, useRef } from 'react';
import { Globe, Menu, X, Terminal, ExternalLink, ChevronDown, ChevronRight, ChevronLeft, Cpu, Server, HardDrive, Database, Shield, ShieldAlert, Briefcase, ShoppingCart, Gamepad2, Coins, ArrowRightLeft, Scale } from 'lucide-react';
import { Language, TranslationSchema } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationSchema;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onNavigate: (view: any) => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, t, onOpenAuth, onNavigate, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<'products' | 'solutions' | null>(null);
  
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isSolutionDropdownOpen, setIsSolutionDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Refs for timing/hover control
  const productCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const productLastEnterTimeRef = useRef<number>(0);
  const productLastClickTimeRef = useRef<number>(0);

  const solutionCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const solutionLastEnterTimeRef = useRef<number>(0);
  const solutionLastClickTimeRef = useRef<number>(0);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset mobile menu state when closed
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setTimeout(() => setMobileSubMenu(null), 300); // Reset after transition
    }
  }, [isMobileMenuOpen]);

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
    setIsProductDropdownOpen(false);
    setIsSolutionDropdownOpen(false);
  };

  // --- Product Dropdown Logic ---
  const handleProductEnter = () => {
    productLastEnterTimeRef.current = Date.now();
    if (productCloseTimeoutRef.current) clearTimeout(productCloseTimeoutRef.current);
    
    // Close others
    setIsSolutionDropdownOpen(false); 
    setIsProductDropdownOpen(true);
  };

  const handleProductLeave = () => {
    // Fix for touch: Ignore leave if clicked recently
    if (Date.now() - productLastClickTimeRef.current < 500) return;

    productCloseTimeoutRef.current = setTimeout(() => {
      setIsProductDropdownOpen(false);
    }, 150);
  };
  
  const toggleProductDropdown = () => {
      const now = Date.now();
      productLastClickTimeRef.current = now;

      // Clear any pending close timers (essential for touch devices)
      if (productCloseTimeoutRef.current) clearTimeout(productCloseTimeoutRef.current);
      if (solutionCloseTimeoutRef.current) clearTimeout(solutionCloseTimeoutRef.current);

      setIsSolutionDropdownOpen(false); // Close solution if open
      
      // Increased threshold to 600ms to handle slower tap events on tablets
      if (now - productLastEnterTimeRef.current < 600) {
          setIsProductDropdownOpen(true);
      } else {
          setIsProductDropdownOpen(prev => !prev);
      }
  };

  // --- Solution Dropdown Logic ---
  const handleSolutionEnter = () => {
    solutionLastEnterTimeRef.current = Date.now();
    if (solutionCloseTimeoutRef.current) clearTimeout(solutionCloseTimeoutRef.current);
    
    // Close others
    setIsProductDropdownOpen(false);
    setIsSolutionDropdownOpen(true);
  };

  const handleSolutionLeave = () => {
    // Fix for touch: Ignore leave if clicked recently
    if (Date.now() - solutionLastClickTimeRef.current < 500) return;

    solutionCloseTimeoutRef.current = setTimeout(() => {
      setIsSolutionDropdownOpen(false);
    }, 150);
  };

  const toggleSolutionDropdown = () => {
    const now = Date.now();
    solutionLastClickTimeRef.current = now;

    // Clear any pending close timers
    if (solutionCloseTimeoutRef.current) clearTimeout(solutionCloseTimeoutRef.current);
    if (productCloseTimeoutRef.current) clearTimeout(productCloseTimeoutRef.current);

    setIsProductDropdownOpen(false); // Close product if open
    
    // Increased threshold to 600ms to handle slower tap events on tablets
    if (now - solutionLastEnterTimeRef.current < 600) {
        setIsSolutionDropdownOpen(true);
    } else {
        setIsSolutionDropdownOpen(prev => !prev);
    }
  };

  return (
    <header 
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        isMobileMenuOpen || isProductDropdownOpen || isSolutionDropdownOpen
          ? 'bg-[#050505]/95 backdrop-blur-2xl border border-white/[0.08] shadow-2xl' 
          : 'glass shadow-2xl shadow-blue-900/10'
      }`}
      onMouseLeave={() => {
          handleProductLeave();
          handleSolutionLeave();
      }}
    >
      <div className="flex items-center justify-between px-6 py-3.5 relative z-10">
        {/* Logo */}
        <div className="flex items-center" onClick={() => onNavigate('landing')}>
          <img 
            src="https://43lgrnp3dx.ucarecd.net/30db5da3-0f17-454c-af1f-e83d5c29232c/-/preview/535x216/" 
            alt="REPUBLIC Logo" 
            className="h-9 md:h-10 w-auto object-contain brightness-110 hover:scale-105 transition-all duration-500 cursor-pointer"
          />
        </div>

        {/* Desktop Nav - Visible on MD (Tablet) and up */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-10">
          
          {/* Products Dropdown Trigger - Animation Restored */}
          <button 
            className={`flex items-center gap-1 text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] group ${isProductDropdownOpen ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            onMouseEnter={handleProductEnter}
            onMouseLeave={handleProductLeave}
            onClick={toggleProductDropdown}
          >
            {t.nav.products}
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Solutions Dropdown Trigger - Animation Restored */}
          <button 
            className={`flex items-center gap-1 text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] group ${isSolutionDropdownOpen ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            onMouseEnter={handleSolutionEnter}
            onMouseLeave={handleSolutionLeave}
            onClick={toggleSolutionDropdown}
          >
            {t.nav.solutions}
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isSolutionDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <button onClick={() => handleNavClick('status')} className={`text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] ${currentView === 'status' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>{t.nav.status}</button>
          <button onClick={() => handleNavClick('docs')} className={`text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] ${currentView === 'docs' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>{t.nav.docs}</button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 lg:gap-4">
          {/* Compact Language Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-white/5 bg-white/[0.05] hover:bg-white/10 transition-all text-[10px] font-black tracking-tighter"
            >
              <Globe className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-gray-300 uppercase">{lang}</span>
              <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-300 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Smooth Transition Dropdown */}
            <div 
              className={`absolute top-full right-0 mt-3 w-36 rounded-2xl bg-black/50 backdrop-blur-2xl border border-white/10 p-1.5 shadow-3xl origin-top-right ring-1 ring-white/5 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isLangDropdownOpen 
                  ? 'opacity-100 scale-100 translate-y-0 visible' 
                  : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
              }`}
            >
              <button 
                onClick={() => { setLang('ko'); setIsLangDropdownOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-black transition-all ${lang === 'ko' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-500 hover:text-gray-300'}`}
              >
                한국어
                {lang === 'ko' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"></div>}
              </button>
              <button 
                onClick={() => { setLang('en'); setIsLangDropdownOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-black transition-all ${lang === 'en' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-500 hover:text-gray-300'}`}
              >
                English
                {lang === 'en' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50"></div>}
              </button>
            </div>
          </div>
          
          {/* Desktop/Tablet Smart Portal Button */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={() => onOpenAuth('login')}
              className="group flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl text-[10px] font-black hover:bg-blue-600 hover:text-white transition-all transform active:scale-95 shadow-lg"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{t.nav.console}</span>
              <span className="lg:hidden">Portal</span>
              <ExternalLink className="w-3 h-3 opacity-30 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Mobile Menu Toggle - Visible ONLY on Mobile (< 768px) */}
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* --- MEGA MENUS CONTAINER --- */}
      {/* We use one container for both, toggle visibility based on state */}
      
      {/* 1. PRODUCTS MEGA MENU - Updated with Descriptions & New Links */}
      <div 
         className={`hidden md:block overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
             isProductDropdownOpen ? 'max-h-[450px] opacity-100 pb-8' : 'max-h-0 opacity-0'
         }`}
         onMouseEnter={handleProductEnter}
         onMouseLeave={handleProductLeave}
      >
         <div className="h-px bg-white/5 w-full mb-6 mt-1 mx-6 w-[calc(100%-48px)]" />
         <div className="px-10 pb-2">
             <div className="grid grid-cols-3 gap-12">
                {/* Computing */}
                <div>
                    <div className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest border-b border-white/5 pb-2">{t.productsDropdown.computing}</div>
                    <ul className="space-y-4">
                        <li>
                            <button onClick={() => handleNavClick('cloud-compute')} className="flex items-start gap-4 text-left group w-full">
                                <div className="mt-1">
                                    <Cpu className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{t.productsDropdown.cloudCompute}</span>
                                    <span className="text-xs text-gray-600 group-hover:text-gray-500">{t.productsDropdown.cloudComputeDesc}</span>
                                </div>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNavClick('bare-metal')} className="flex items-start gap-4 text-left group w-full">
                                <div className="mt-1">
                                    <Server className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{t.productsDropdown.bareMetal}</span>
                                    <span className="text-xs text-gray-600 group-hover:text-gray-500">{t.productsDropdown.bareMetalDesc}</span>
                                </div>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNavClick('auto-scaling')} className="flex items-start gap-4 text-left group w-full">
                                <div className="mt-1">
                                    <Scale className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{t.productsDropdown.autoScaling}</span>
                                    <span className="text-xs text-gray-600 group-hover:text-gray-500">{t.productsDropdown.autoScalingDesc}</span>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
                {/* Storage */}
                <div>
                    <div className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest border-b border-white/5 pb-2">{t.productsDropdown.storage}</div>
                    <ul className="space-y-4">
                        <li>
                            <button onClick={() => handleNavClick('hdd')} className="flex items-start gap-4 text-left group w-full">
                                <div className="mt-1">
                                    <HardDrive className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{t.productsDropdown.hdd}</span>
                                    <span className="text-xs text-gray-600 group-hover:text-gray-500">{t.productsDropdown.hddDesc}</span>
                                </div>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNavClick('nas')} className="flex items-start gap-4 text-left group w-full">
                                <div className="mt-1">
                                    <Database className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{t.productsDropdown.nas}</span>
                                    <span className="text-xs text-gray-600 group-hover:text-gray-500">{t.productsDropdown.nasDesc}</span>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
                {/* Network */}
                <div>
                    <div className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest border-b border-white/5 pb-2">{t.productsDropdown.network}</div>
                    <ul className="space-y-4">
                        <li>
                            <button onClick={() => handleNavClick('firewall')} className="flex items-start gap-4 text-left group w-full">
                                <div className="mt-1">
                                    <Shield className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{t.productsDropdown.firewall}</span>
                                    <span className="text-xs text-gray-600 group-hover:text-gray-500">{t.productsDropdown.firewallDesc}</span>
                                </div>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNavClick('ddos')} className="flex items-start gap-4 text-left group w-full">
                                <div className="mt-1">
                                    <ShieldAlert className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{t.productsDropdown.ddos}</span>
                                    <span className="text-xs text-gray-600 group-hover:text-gray-500">{t.productsDropdown.ddosDesc}</span>
                                </div>
                            </button>
                        </li>
                         <li>
                            <button onClick={() => handleNavClick('load-balancing')} className="flex items-start gap-4 text-left group w-full">
                                <div className="mt-1">
                                    <ArrowRightLeft className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{t.productsDropdown.loadBalancing}</span>
                                    <span className="text-xs text-gray-600 group-hover:text-gray-500">{t.productsDropdown.loadBalancingDesc}</span>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
             </div>
         </div>
      </div>

      {/* 2. SOLUTIONS MEGA MENU - Animation Restored */}
      <div 
         className={`hidden md:block overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
             isSolutionDropdownOpen ? 'max-h-[350px] opacity-100 pb-8' : 'max-h-0 opacity-0'
         }`}
         onMouseEnter={handleSolutionEnter}
         onMouseLeave={handleSolutionLeave}
      >
         <div className="h-px bg-white/5 w-full mb-6 mt-1 mx-6 w-[calc(100%-48px)]" />
         <div className="px-10 pb-2">
             <div className="grid grid-cols-2 gap-12">
                {/* Industries */}
                <div>
                    <div className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest border-b border-white/5 pb-2">{t.solutionsDropdown.industries}</div>
                    <ul className="space-y-4">
                        <li>
                            <button onClick={() => handleNavClick('not-found')} className="flex items-start gap-4 text-left group">
                                <div className="mt-1">
                                    <Coins className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{t.solutionsDropdown.finance}</span>
                                    <span className="text-xs text-gray-600 group-hover:text-gray-500">{t.solutionsDropdown.financeDesc}</span>
                                </div>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => handleNavClick('not-found')} className="flex items-start gap-4 text-left group">
                                <div className="mt-1">
                                    <ShoppingCart className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{t.solutionsDropdown.ecommerce}</span>
                                    <span className="text-xs text-gray-600 group-hover:text-gray-500">Fast & Scalable Infrastructure</span>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
                {/* Gaming */}
                <div>
                     <div className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest border-b border-white/5 pb-2">{t.solutionsDropdown.gaming}</div>
                     <ul className="space-y-4">
                        <li>
                            <button onClick={() => handleNavClick('not-found')} className="flex items-start gap-4 text-left group">
                                <div className="mt-1">
                                    <Gamepad2 className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <div>
                                    <span className="block text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{t.solutionsDropdown.gaming}</span>
                                    <span className="text-xs text-gray-600 group-hover:text-gray-500">{t.solutionsDropdown.gamingDesc}</span>
                                </div>
                            </button>
                        </li>
                     </ul>
                </div>
             </div>
         </div>
      </div>

      {/* Mobile Menu - Sliding Layers */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isMobileMenuOpen 
            ? 'max-h-[600px] opacity-100 pb-8 px-6' 
            : 'max-h-0 opacity-0 pb-0 px-6'
        }`}
      >
        <div className="h-px bg-white/10 w-full mb-6 mt-2" />
        
        {/* Sliding Container */}
        <div className="relative overflow-hidden w-full h-[320px]">
            
            {/* Layer 1: Main Menu */}
            <div className={`absolute inset-0 w-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col gap-1 ${
                mobileSubMenu ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
            }`}>
                <button 
                    className="text-lg font-bold text-left py-3 px-2 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-between group" 
                    onClick={() => setMobileSubMenu('products')}
                >
                    {t.nav.products}
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white" />
                </button>
                <button 
                    className="text-lg font-bold text-left py-3 px-2 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-between group" 
                    onClick={() => setMobileSubMenu('solutions')}
                >
                    {t.nav.solutions}
                    <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white" />
                </button>
                <button className="text-lg font-bold text-left py-3 px-2 rounded-xl hover:bg-white/5 transition-colors" onClick={() => handleNavClick('status')}>{t.nav.status}</button>
                <button className="text-lg font-bold text-left py-3 px-2 rounded-xl hover:bg-white/5 transition-colors" onClick={() => handleNavClick('docs')}>{t.nav.docs}</button>
                
                <button 
                    onClick={() => { setIsMobileMenuOpen(false); onOpenAuth('login'); }}
                    className="mt-6 bg-white text-black py-4 rounded-2xl font-black flex justify-center items-center gap-3 active:scale-95 transition-transform shadow-lg shadow-white/5"
                >
                    <Terminal className="w-5 h-5" />
                    {t.nav.console}
                </button>
            </div>

            {/* Layer 2: Products Sub Menu */}
            <div className={`absolute inset-0 w-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col ${
                mobileSubMenu === 'products' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}>
                <button 
                    onClick={() => setMobileSubMenu(null)}
                    className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white mb-4 px-2 py-2"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="overflow-y-auto custom-scrollbar pb-4 space-y-6">
                    {/* Computing */}
                    <div>
                        <div className="text-xs font-bold text-gray-500 mb-2 px-2 uppercase tracking-widest">{t.productsDropdown.computing}</div>
                        <button onClick={() => handleNavClick('cloud-compute')} className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 text-gray-200 transition-colors">
                            <Cpu className="w-4 h-4 text-gray-500" />
                            {t.productsDropdown.cloudCompute}
                        </button>
                        <button onClick={() => handleNavClick('bare-metal')} className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 text-gray-200 transition-colors">
                            <Server className="w-4 h-4 text-gray-500" />
                            {t.productsDropdown.bareMetal}
                        </button>
                         <button onClick={() => handleNavClick('auto-scaling')} className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 text-gray-200 transition-colors">
                            <Scale className="w-4 h-4 text-gray-500" />
                            {t.productsDropdown.autoScaling}
                        </button>
                    </div>

                    {/* Storage */}
                    <div>
                        <div className="text-xs font-bold text-gray-500 mb-2 px-2 uppercase tracking-widest">{t.productsDropdown.storage}</div>
                        <button onClick={() => handleNavClick('hdd')} className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 text-gray-200 transition-colors">
                            <HardDrive className="w-4 h-4 text-gray-500" />
                            {t.productsDropdown.hdd}
                        </button>
                        <button onClick={() => handleNavClick('nas')} className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 text-gray-200 transition-colors">
                            <Database className="w-4 h-4 text-gray-500" />
                            {t.productsDropdown.nas}
                        </button>
                    </div>

                    {/* Network */}
                    <div>
                        <div className="text-xs font-bold text-gray-500 mb-2 px-2 uppercase tracking-widest">{t.productsDropdown.network}</div>
                        <button onClick={() => handleNavClick('firewall')} className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 text-gray-200 transition-colors">
                            <Shield className="w-4 h-4 text-gray-500" />
                            {t.productsDropdown.firewall}
                        </button>
                        <button onClick={() => handleNavClick('ddos')} className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 text-gray-200 transition-colors">
                            <ShieldAlert className="w-4 h-4 text-gray-500" />
                            {t.productsDropdown.ddos}
                        </button>
                        <button onClick={() => handleNavClick('load-balancing')} className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 text-gray-200 transition-colors">
                            <ArrowRightLeft className="w-4 h-4 text-gray-500" />
                            {t.productsDropdown.loadBalancing}
                        </button>
                    </div>
                </div>
            </div>

            {/* Layer 3: Solutions Sub Menu */}
            <div className={`absolute inset-0 w-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col ${
                mobileSubMenu === 'solutions' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}>
                <button 
                    onClick={() => setMobileSubMenu(null)}
                    className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white mb-4 px-2 py-2"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="overflow-y-auto custom-scrollbar pb-4 space-y-6">
                    {/* Industries */}
                    <div>
                        <div className="text-xs font-bold text-gray-500 mb-2 px-2 uppercase tracking-widest">{t.solutionsDropdown.industries}</div>
                        <button onClick={() => handleNavClick('not-found')} className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 text-gray-200 transition-colors">
                            <Coins className="w-4 h-4 text-gray-500" />
                            {t.solutionsDropdown.finance}
                        </button>
                        <button onClick={() => handleNavClick('not-found')} className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 text-gray-200 transition-colors">
                            <ShoppingCart className="w-4 h-4 text-gray-500" />
                            {t.solutionsDropdown.ecommerce}
                        </button>
                    </div>

                    {/* Gaming */}
                    <div>
                         <div className="text-xs font-bold text-gray-500 mb-2 px-2 uppercase tracking-widest">{t.solutionsDropdown.gaming}</div>
                         <button onClick={() => handleNavClick('not-found')} className="w-full flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/5 text-gray-200 transition-colors">
                            <Gamepad2 className="w-4 h-4 text-gray-500" />
                            {t.solutionsDropdown.gaming}
                        </button>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
