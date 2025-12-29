
import React from 'react';
import { TranslationSchema } from '../types';

interface FooterProps {
  t: TranslationSchema;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="py-16 border-t border-white/5 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-start gap-8">
          
          {/* Logo */}
          <div className="mb-2">
            <img 
              src="https://43lgrnp3dx.ucarecd.net/30db5da3-0f17-454c-af1f-e83d5c29232c/-/preview/535x216/" 
              alt="REPUBLIC Logo" 
              className="h-9 opacity-80 object-contain hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Left Aligned Content Stack */}
          <div className="flex flex-col gap-4 text-[11px] text-zinc-500 leading-relaxed font-medium">
            
            {/* Links Row */}
            <div className="flex flex-wrap gap-5 font-bold text-zinc-400 mb-1">
              <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.careers}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.security}</a>
            </div>

            {/* Company Info Lines */}
            <div className="flex flex-col gap-1.5">
                <div>
                  <span className="font-bold text-zinc-400">{t.footer.companyName}</span>
                  <span className="mx-2 text-zinc-700">|</span>
                  <span>{t.footer.ceo}</span>
                </div>
                
                <div>
                  {t.footer.businessInfo}
                </div>
                
                <div>
                  {t.footer.address}
                </div>
                
                {/* Trademark & Copyright */}
                <div className="text-zinc-600 mt-2">
                  {t.footer.copyright}
                </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
