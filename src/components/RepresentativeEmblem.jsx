import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Flame, Award, Building2 } from 'lucide-react';

export const RepresentativeEmblem = ({ className = 'w-full aspect-[4/4]', size = 'lg' }) => {
  const { language } = useLanguage();

  return (
    <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-b from-tvk-maroon-950 via-tvk-maroon-900 to-tvk-maroon-950 border-4 border-tvk-gold-400 p-6 flex flex-col items-center justify-between text-white shadow-2xl ${className}`}>
      
      {/* Decorative Radial Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none" />
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-tvk-gold-400/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-tvk-maroon-700/30 blur-2xl pointer-events-none" />

      {/* Top Banner Ribbon */}
      <div className="relative z-10 w-full flex items-center justify-between text-[11px] border-b border-tvk-gold-400/30 pb-3">
        <span className="px-2.5 py-0.5 rounded-full bg-tvk-gold-400/20 text-tvk-gold-300 font-black tracking-wider uppercase border border-tvk-gold-400/40">
          TVK MLA
        </span>
        <span className="flex items-center gap-1 text-tvk-gold-400 font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{language === 'ta' ? 'அதிகாரப்பூர்வ மையம்' : 'Verified Office'}</span>
        </span>
      </div>

      {/* Central Emblem Crest */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto py-4">
        {/* Outer Circular Ring with Gold Glow */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-tvk-gold-300 via-tvk-gold-500 to-tvk-gold-600 p-1.5 shadow-xl tvk-gold-glow flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-tvk-maroon-950 border-2 border-tvk-gold-300 flex flex-col items-center justify-center relative overflow-hidden">
            
            {/* Red & Yellow Vertical Stripes Motif */}
            <div className="absolute inset-y-0 w-6 bg-tvk-gold-400/90" />
            <div className="absolute inset-x-0 h-full bg-gradient-to-t from-tvk-maroon-950 via-transparent to-tvk-maroon-950 opacity-60" />

            {/* Central Flame / Victory Torch Icon */}
            <div className="relative z-10 w-14 h-14 rounded-full bg-tvk-maroon-900 border-2 border-tvk-gold-300 flex items-center justify-center shadow-lg">
              <Flame className="w-8 h-8 text-tvk-gold-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.6)]" />
            </div>
          </div>
        </div>

        {/* Constituency Seal Title */}
        <div className="text-center mt-4 space-y-1">
          <div className="text-xs sm:text-sm font-black tracking-widest text-tvk-gold-300 uppercase">
            {language === 'ta' ? 'விக்கிரவாண்டி தொகுதி' : 'VIKRAVANDI CONSTITUENCY'}
          </div>
          <div className="text-[11px] text-slate-300 font-medium tracking-wide">
            {language === 'ta'
              ? 'சட்டமன்ற உறுப்பினர் மக்கள் தொடர்பு அலுவலகம்'
              : 'MLA Public Service & Grievance Secretariat'}
          </div>
        </div>
      </div>

      {/* Bottom Motto Pill */}
      <div className="relative z-10 w-full pt-3 border-t border-tvk-gold-400/30 text-center">
        <span className="text-[11px] font-bold text-tvk-gold-300 tracking-wider">
          {language === 'ta' ? '★ மக்களுக்காக • மக்களுடன் ★' : '★ For The People • With The People ★'}
        </span>
      </div>

    </div>
  );
};

