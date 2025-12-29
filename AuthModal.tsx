
import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, UserPlus, User, ChevronDown, Globe, Check, AlertCircle, LogIn } from 'lucide-react';
import { TranslationSchema, Language } from '../types';

export interface UserAccount {
  name: string;
  email: string;
  password?: string; // In real app, never store plain text
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
  t: TranslationSchema;
  isFullscreen?: boolean;
  setLang?: (lang: Language) => void;
  lang?: Language;
  accounts?: UserAccount[];
  onSignup?: (user: UserAccount) => boolean;
  onLogin?: (email: string, pass: string) => boolean;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialMode, 
  t, 
  isFullscreen = false, 
  setLang, 
  lang,
  accounts = [],
  onSignup,
  onLogin
}) => {
  // Logic Changed: If Portal (fullscreen), ALWAYS start at 'picker', even if empty.
  const initialViewState = isFullscreen ? 'picker' : initialMode;
  
  const [viewState, setViewState] = useState<'picker' | 'login' | 'signup'>(initialViewState);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Custom Language Dropdown State
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleModeSwitch = (mode: 'login' | 'signup') => {
    setIsAnimating(true);
    setTimeout(() => {
        setViewState(mode);
        setError(null);
        setEmail('');
        setPassword('');
        setName('');
        setConfirmPass('');
        setIsAnimating(false);
    }, 200);
  };

  const handleBackToPicker = () => {
    setIsAnimating(true);
    setTimeout(() => {
        if (isFullscreen) {
            setViewState('picker');
            setError(null);
        } else {
            onClose(); 
        }
        setIsAnimating(false);
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (viewState === 'login') {
      if (onLogin && onLogin(email, password)) {
         alert(lang === 'ko' ? `${email} 계정으로 로그인되었습니다.` : `Logged in as ${email}`);
         handleBackToPicker();
      } else {
        setError(lang === 'ko' ? '이메일 또는 비밀번호가 올바르지 않습니다.' : 'Invalid email or password');
      }
    } else if (viewState === 'signup') {
      if (!name || !email || !password) {
        setError(lang === 'ko' ? '모든 필드를 입력해주세요.' : 'Please fill in all fields');
        return;
      }
      if (password !== confirmPass) {
        setError(lang === 'ko' ? '비밀번호가 일치하지 않습니다.' : 'Passwords do not match');
        return;
      }
      
      const newUser: UserAccount = { name, email, password };
      if (onSignup && onSignup(newUser)) {
        alert(lang === 'ko' ? '계정이 성공적으로 생성되었습니다.' : 'Account created successfully');
        handleBackToPicker();
      }
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center font-neo ${isFullscreen ? 'bg-black' : 'p-6 backdrop-blur-sm bg-black/60'}`}>
      
      {/* Back Button (Only for Fullscreen Portal) */}
      {isFullscreen && (
        <button 
          onClick={viewState === 'picker' ? onClose : handleBackToPicker}
          className="absolute top-8 left-8 flex items-center gap-2 group p-3 rounded-full hover:bg-white/10 transition-all z-20 animate-in fade-in duration-700"
        >
          <ArrowLeft className="w-5 h-5 text-white transition-transform group-hover:-translate-x-1" />
          <span className="text-xs font-bold text-white tracking-widest uppercase">
            {viewState === 'picker' ? t.portal.exit : t.portal.back}
          </span>
        </button>
      )}

      {!isFullscreen && (
        <div 
          className="absolute inset-0 bg-transparent cursor-pointer" 
          onClick={onClose}
        />
      )}

      {/* Main Container */}
      <div 
        className={`
            relative w-full transition-all duration-500 ease-out
            ${isFullscreen ? 'max-w-md' : 'max-w-lg rounded-[30px] bg-[#0a0a0a] border border-white/10 shadow-2xl'} 
            p-8 md:p-12 overflow-hidden
            ${isAnimating ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}
            animate-in fade-in zoom-in-95 duration-500
        `}
      >
        
        {!isFullscreen && (
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}

        {/* --- VIEW: ACCOUNT PICKER --- */}
        {viewState === 'picker' && (
          <div className="flex flex-col items-center w-full animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 mb-6 shadow-lg shadow-blue-500/30">
                    <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">{t.portal.chooseAccount}</h2>
                <p className="text-zinc-500 text-xs mt-2 font-medium">
                    {accounts.length === 0 
                        ? t.portal.noAccounts
                        : t.portal.selectAccount}
                </p>
            </div>
            
            <div className="w-full space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {accounts.map((acc, idx) => (
                <div 
                    key={idx}
                    onClick={() => {
                        alert(lang === 'ko' ? `${acc.name}님으로 접속합니다.` : `Accessing as ${acc.name}`);
                    }}
                    className="group flex items-center gap-4 w-full p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-800 hover:border-blue-500/30 transition-all cursor-pointer animate-in slide-in-from-bottom-2 fade-in"
                    style={{ animationDelay: `${idx * 100}ms` }}
                >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 flex items-center justify-center text-white font-bold text-lg shadow-inner shrink-0 group-hover:scale-110 transition-transform">
                        {acc.name.charAt(0)}
                    </div>
                    <div className="flex flex-col text-left overflow-hidden">
                        <span className="font-bold text-white text-base group-hover:text-blue-400 transition-colors truncate">{acc.name}</span>
                        <span className="text-xs text-zinc-500 truncate group-hover:text-zinc-400 transition-colors">{acc.email}</span>
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                        <ArrowRight className="w-4 h-4 text-blue-500" />
                    </div>
                </div>
              ))}

              {/* Add Account Button */}
              <button 
                onClick={() => handleModeSwitch('login')}
                className="group flex items-center justify-center gap-3 w-full p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 border-dashed hover:bg-blue-600/20 hover:border-blue-500/50 transition-all text-blue-400 hover:text-blue-300 mt-2"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserPlus className="w-4 h-4" />
                </div>
                <span className="font-bold text-sm">{t.portal.addAccount}</span>
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] text-zinc-500 font-bold tracking-widest uppercase">
                    {t.portal.secureSession}
                </span>
            </div>
          </div>
        )}

        {/* --- VIEW: LOGIN / SIGNUP --- */}
        {(viewState === 'login' || viewState === 'signup') && (
          <div className="flex flex-col items-center text-center animate-in slide-in-from-right-8 fade-in duration-500">
            <div className="mb-6">
               <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 mb-4">
                  {viewState === 'login' ? <LogIn className="w-5 h-5 text-white" /> : <UserPlus className="w-5 h-5 text-white" />}
               </div>
               <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                {viewState === 'login' ? t.auth.welcome : t.auth.createAccount}
               </h2>
               <p className="text-zinc-500 text-sm font-medium">
                 {viewState === 'login' ? t.auth.loginSubtitle : t.auth.signupSubtitle}
               </p>
            </div>

            {/* Scrollable Form Container to prevent height overflow */}
            <div className="w-full max-h-[50vh] overflow-y-auto custom-scrollbar px-1 py-1">
                <form className="w-full space-y-4" onSubmit={handleSubmit}>
                {/* Name Field (Only for Signup) */}
                {viewState === 'signup' && (
                    <div className="space-y-1.5 text-left animate-in slide-in-from-top-2">
                    <label className="text-[12px] font-bold text-zinc-400 ml-1">{t.auth.name}</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
                        <input 
                            type="text" 
                            placeholder={t.auth.namePlaceholder}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all font-medium"
                        />
                    </div>
                    </div>
                )}

                <div className="space-y-1.5 text-left">
                    <label className="text-[12px] font-bold text-zinc-400 ml-1">{t.auth.email}</label>
                    <input 
                    type="email" 
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all font-medium"
                    />
                </div>

                <div className="space-y-1.5 text-left">
                    <div className="flex justify-between items-center ml-1">
                    <label className="text-[12px] font-bold text-zinc-400">{t.auth.password}</label>
                    {viewState === 'login' && (
                        <button type="button" className="text-[11px] text-zinc-500 hover:text-white transition-colors font-medium">
                        {t.auth.forgotPassword}
                        </button>
                    )}
                    </div>
                    <input 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all font-medium"
                    />
                </div>

                {viewState === 'signup' && (
                    <div className="space-y-1.5 text-left animate-in slide-in-from-top-2 fade-in">
                    <label className="text-[12px] font-bold text-zinc-400 ml-1">{t.auth.confirmPassword}</label>
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all font-medium"
                    />
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-2 text-red-400 text-xs font-bold bg-red-400/10 p-3 rounded-lg animate-in slide-in-from-top-1 border border-red-400/20">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {error}
                    </div>
                )}

                <button className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 mt-2 text-sm shadow-lg shadow-white/10">
                    {viewState === 'login' ? t.auth.loginTitle : t.auth.signupTitle}
                    <ArrowRight className="w-4 h-4" />
                </button>
                </form>
            </div>

            <div className="relative w-full my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-[#0a0a0a] px-2 text-zinc-600 font-bold">{t.auth.socialLogin}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <button className="flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl py-3 transition-all hover:border-zinc-600">
                <span className="text-xs font-bold text-zinc-300">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl py-3 transition-all hover:border-zinc-600">
                <span className="text-xs font-bold text-zinc-300">GitHub</span>
              </button>
            </div>

            <p className="mt-6 text-xs text-zinc-500 font-medium">
              {viewState === 'login' ? t.auth.noAccount : t.auth.hasAccount}
              <button 
                type="button"
                onClick={() => handleModeSwitch(viewState === 'login' ? 'signup' : 'login')}
                className="text-white font-bold ml-2 hover:underline decoration-zinc-500 underline-offset-4"
              >
                {viewState === 'login' ? t.auth.signupTitle : t.auth.loginTitle}
              </button>
            </p>
          </div>
        )}
      </div>

      {/* --- CUSTOM LANGUAGE DROPDOWN (Bottom Right) --- */}
      {isFullscreen && setLang && lang && (
        <div className="absolute bottom-8 right-8 z-[150]" ref={langRef}>
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-3 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 px-5 py-3 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-bold uppercase">{lang === 'ko' ? '한국어' : 'English'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
          </button>

          <div 
            className={`absolute bottom-full right-0 mb-3 w-40 bg-black/60 backdrop-blur-2xl border border-zinc-800 rounded-2xl shadow-2xl p-1.5 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right ${isLangOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 translate-y-2 invisible pointer-events-none'}`}
          >
            <button 
              onClick={() => { setLang('ko'); setIsLangOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-left"
            >
              <span className={`text-xs font-bold ${lang === 'ko' ? 'text-white' : 'text-zinc-500'}`}>한국어</span>
              {lang === 'ko' && <Check className="w-3.5 h-3.5 text-blue-500" />}
            </button>
            <button 
              onClick={() => { setLang('en'); setIsLangOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-left"
            >
              <span className={`text-xs font-bold ${lang === 'en' ? 'text-white' : 'text-zinc-500'}`}>English</span>
              {lang === 'en' && <Check className="w-3.5 h-3.5 text-blue-500" />}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AuthModal;
