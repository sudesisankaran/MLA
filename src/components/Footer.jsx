import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, Mail, MapPin, ShieldCheck, Heart, AlertTriangle, ExternalLink } from 'lucide-react';

export const Footer = ({ setActivePage, onOpenAuth }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-tvk-dark-950 text-white border-t-4 border-tvk-gold-500 pt-12 pb-8">
      {/* Upper Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Important Disclaimer Banner */}
        <div className="mb-10 p-4 bg-tvk-maroon-950/80 rounded-2xl border border-tvk-maroon-800 text-xs text-slate-300 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-tvk-gold-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-white">
              {language === 'ta' ? 'அதிகாரப்பூர்வ பொறுப்புத்துறப்பு (Disclaimer):' : 'Official Public Service Notice:'}
            </p>
            <p className="leading-relaxed text-slate-300">
              {t('disclaimer.banner')} {t('disclaimer.officialNote')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-tvk-maroon-900 border border-tvk-gold-400 flex items-center justify-center font-bold text-tvk-gold-400 text-sm">
                TVK
              </div>
              <span className="font-bold text-lg text-white">
                {t('nav.portalName')}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {language === 'ta'
                ? 'விக்கிரவாண்டி தொகுதி மக்களின் அடிப்படை உரிமைகளுக்காகவும், விரைவான குறைதீர்ப்புக்காகவும் அர்ப்பணிக்கப்பட்ட வெளிப்படையான பொதுமக்கள் சேவை தளம்.'
                : 'Transparent citizen service portal dedicated to fast grievance redressal, public accountability, and constituency progress.'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => { setActivePage('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-xs text-tvk-gold-400 hover:text-tvk-gold-300 flex items-center gap-1 font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('nav.adminPortal')}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-tvk-gold-400 uppercase tracking-wider">
              {language === 'ta' ? 'விரைவு இணைப்புகள்' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-tvk-gold-300 transition-colors">
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('grievance'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-tvk-gold-300 transition-colors">
                  {t('nav.grievance')}
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('track'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-tvk-gold-300 transition-colors">
                  {t('nav.track')}
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-tvk-gold-300 transition-colors">
                  {t('nav.projects')}
                </button>
              </li>
              <li>
                <button onClick={() => { setActivePage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-tvk-gold-300 transition-colors">
                  {t('nav.news')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Emergency Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-tvk-gold-400 uppercase tracking-wider">
              {t('contact.emergencyHeading')}
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span>{t('contact.ambulance')}</span>
                <span className="font-mono text-tvk-gold-400 font-bold">108</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span>{t('contact.police')}</span>
                <span className="font-mono text-tvk-gold-400 font-bold">100</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span>{t('contact.womenHelp')}</span>
                <span className="font-mono text-tvk-gold-400 font-bold">1091</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span>{language === 'ta' ? 'மின்வாரிய புகார் (TANGEDCO):' : 'Electricity Helpline:'}</span>
                <span className="font-mono text-tvk-gold-400 font-bold">1912</span>
              </div>
            </div>
          </div>

          {/* Column 4: Office Secretariat */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-tvk-gold-400 uppercase tracking-wider">
              {t('contact.officeAddress')}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-tvk-gold-400 flex-shrink-0 mt-0.5" />
                <span>{t('contact.addressVal')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-tvk-gold-400 flex-shrink-0" />
                <span className="font-mono">{t('contact.phonesVal')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-tvk-gold-400 flex-shrink-0" />
                <span className="text-[11px] truncate">{t('contact.emailVal')}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 {t('nav.portalName')}. {language === 'ta' ? 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>{language === 'ta' ? 'வடிவமைப்பு:' : 'Designed for:'} TVK Public Service Initiative</span>
            <span>•</span>
            <a
              href="https://www.tamilnadu.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-tvk-gold-400 flex items-center gap-1"
            >
              <span>TN Govt Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

