import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  Menu,
  X,
  Globe,
  PhoneCall,
  User,
  LogOut,
  Shield,
  FileText,
  Search,
  ChevronDown,
  Flame
} from 'lucide-react';

export const Navbar = ({ activePage, setActivePage, onOpenAuth, onOpenRegister }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { currentUser, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', labelKey: 'nav.home' },
    { id: 'about', labelKey: 'nav.about' },
    { id: 'grievance', labelKey: 'nav.grievance' },
    { id: 'track', labelKey: 'nav.track' },
    { id: 'news', labelKey: 'nav.news' },
    { id: 'projects', labelKey: 'nav.projects' },
    { id: 'gallery', labelKey: 'nav.gallery' },
    { id: 'contact', labelKey: 'nav.contact' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    setActivePage('home');
  };

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-white">
      {/* Top TVK Tricolor Accent Ribbon */}
      <div className="h-1.5 w-full tvk-gradient-bar" />

      {/* Top Utility Sub-header */}
      <div className="bg-tvk-maroon-950 text-white text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-tvk-maroon-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Official Disclaimers / Toll-Free info */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
            <span className="flex items-center gap-1.5 text-tvk-gold-300 font-semibold whitespace-nowrap text-[11px] sm:text-xs">
              <PhoneCall className="w-3.5 h-3.5 text-tvk-gold-400 flex-shrink-0" />
              <span>{t('nav.emergencyHelpline')}</span>
            </span>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <span className="hidden md:inline-block text-slate-300 truncate text-[11px] sm:text-xs">
              {language === 'ta'
                ? 'விக்கிரவாண்டி சட்டமன்ற தொகுதி மக்கள் சேவை மையம்'
                : 'Vikravandi Constituency Public Service Secretariat'}
            </span>
          </div>

          {/* Right Tools: Language Switcher */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-tvk-gold-300 border border-tvk-gold-500/50 px-2.5 py-1 rounded-lg transition-all font-bold text-xs"
            >
              <Globe className="w-3.5 h-3.5 text-tvk-gold-400" />
              <span>{language === 'ta' ? 'English' : 'தமிழ்'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[72px] py-2 gap-2">
          
          {/* Logo & Portal Identity */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            {/* Emblem Crest */}
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-tvk-maroon-900 to-tvk-maroon-800 p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center border-2 border-tvk-gold-400 flex-shrink-0">
              <div className="w-full h-full rounded-[9px] bg-tvk-maroon-900 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-y-0 w-2.5 bg-tvk-gold-400 opacity-90"></div>
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-tvk-gold-400 relative z-10 drop-shadow" />
              </div>
            </div>

            {/* Titles */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-base sm:text-lg lg:text-xl text-tvk-maroon-900 tracking-tight whitespace-nowrap">
                  {t('nav.portalName')}
                </span>
                <span className="inline-block px-1.5 py-0.5 bg-tvk-gold-100 border border-tvk-gold-400 text-tvk-maroon-950 font-black text-[9px] sm:text-[10px] rounded uppercase tracking-wider whitespace-nowrap">
                  TVK MLA
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-semibold whitespace-nowrap">
                {t('nav.portalSubtitle')}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links (Visible on 1200px+ screens to ensure zero wrapping) */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5 flex-1 justify-center px-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 2xl:px-3 py-2 rounded-xl text-xs 2xl:text-sm font-bold transition-all whitespace-nowrap relative ${
                    isActive
                      ? 'text-tvk-maroon-900 bg-tvk-maroon-50'
                      : 'text-slate-700 hover:text-tvk-maroon-900 hover:bg-slate-50'
                  }`}
                >
                  {t(item.labelKey)}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-tvk-maroon-900 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions (User / Admin) */}
          <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border whitespace-nowrap ${
                    activePage === 'admin'
                      ? 'bg-tvk-maroon-900 text-white border-tvk-maroon-950 shadow-md'
                      : 'bg-tvk-maroon-50 text-tvk-maroon-900 border-tvk-maroon-300 hover:bg-tvk-maroon-100'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-tvk-gold-500" />
                  <span>{t('nav.adminPortal')}</span>
                </button>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-800 text-xs font-bold transition-colors border border-slate-300 whitespace-nowrap"
                >
                  <div className="w-5 h-5 rounded-full bg-tvk-maroon-900 text-tvk-gold-300 flex items-center justify-center text-[10px] font-bold">
                    {currentUser.fullName ? currentUser.fullName[0].toUpperCase() : 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{currentUser.fullName || currentUser.phoneNumber}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b text-xs">
                      <p className="font-bold text-slate-800">{currentUser.fullName || 'Citizen User'}</p>
                      <p className="text-slate-500 font-mono">+91 {currentUser.phoneNumber}</p>
                    </div>
                    <button
                      onClick={() => { handleNavClick('grievance'); setUserDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4 text-tvk-maroon-800" />
                      {t('nav.myComplaints')}
                    </button>
                    <button
                      onClick={() => { handleNavClick('track'); setUserDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Search className="w-4 h-4 text-tvk-gold-600" />
                      {t('nav.track')}
                    </button>
                    <div className="border-t my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="px-3 py-1.5 text-xs font-bold text-tvk-maroon-900 hover:bg-tvk-maroon-50 rounded-xl transition-colors border border-tvk-maroon-200 whitespace-nowrap"
                >
                  {t('nav.login')}
                </button>
                <button
                  onClick={onOpenRegister}
                  className="px-3.5 py-1.5 text-xs font-bold bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5 border border-tvk-maroon-950 whitespace-nowrap"
                >
                  <User className="w-3.5 h-3.5 text-tvk-gold-400" />
                  <span>{t('nav.register')}</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile / Tablet Menu Hamburger (triggers under 1280px screen width) */}
          <div className="flex items-center gap-2 xl:hidden flex-shrink-0">
            {!currentUser && !isAdmin && (
              <button
                onClick={onOpenAuth}
                className="px-2.5 py-1.5 text-xs font-bold text-tvk-maroon-900 border border-tvk-maroon-300 rounded-lg whitespace-nowrap"
              >
                {t('nav.login')}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-tvk-maroon-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-tvk-maroon-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{t(item.labelKey)}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-tvk-gold-400" />}
              </button>
            );
          })}

          <div className="border-t pt-3 mt-2 space-y-2">
            {isAdmin ? (
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full py-2.5 px-4 rounded-xl bg-tvk-maroon-950 text-tvk-gold-300 font-bold text-sm flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4 text-tvk-gold-400" />
                <span>{t('nav.adminPortal')}</span>
              </button>
            ) : currentUser ? (
              <div className="space-y-2">
                <div className="px-4 py-2 bg-slate-100 rounded-xl text-xs">
                  <p className="font-bold text-slate-800">{currentUser.fullName || 'Citizen User'}</p>
                  <p className="text-slate-500 font-mono">+91 {currentUser.phoneNumber}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 text-sm text-red-600 font-bold flex items-center justify-center gap-2 border border-red-200 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('nav.logout')}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                  className="w-full py-2.5 text-center text-xs font-bold border border-tvk-maroon-800 text-tvk-maroon-900 rounded-xl"
                >
                  {t('nav.login')}
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onOpenRegister(); }}
                  className="w-full py-2.5 text-center text-xs font-bold bg-tvk-maroon-900 text-white rounded-xl"
                >
                  {t('nav.register')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
