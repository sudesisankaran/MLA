import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { INITIAL_REPRESENTATIVE } from '../data/constituencyData';
import { RepresentativeEmblem } from '../components/RepresentativeEmblem';
import { getNewsList, getProjectsList } from '../services/dataService';
import {
  ArrowRight,
  Search,
  FileText,
  UserPlus,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Sparkles,
  Calendar,
  Building2
} from 'lucide-react';

export const HomePage = ({ setActivePage, onOpenRegister, onTrackId }) => {
  const { language, t } = useLanguage();
  const { currentUser } = useAuth();
  const [quickTrackId, setQuickTrackId] = useState('');
  const [latestNews, setLatestNews] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const news = await getNewsList();
      const projects = await getProjectsList();
      setLatestNews(news.slice(0, 3));
      setActiveProjects(projects.slice(0, 3));
    };
    fetchData();
  }, []);

  const handleQuickTrack = (e) => {
    e.preventDefault();
    if (!quickTrackId.trim()) return;
    if (onTrackId) {
      onTrackId(quickTrackId.trim().toUpperCase());
    }
    setActivePage('track');
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-tvk-maroon-950 via-tvk-maroon-900 to-tvk-maroon-950 text-white pt-12 pb-20 border-b-4 border-tvk-gold-400">
        
        {/* Subtle decorative background patterns */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-tvk-gold-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-tvk-maroon-600/20 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading, Subtitle & Action Buttons */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tvk-gold-400/10 border border-tvk-gold-400/30 text-tvk-gold-300 text-xs sm:text-sm font-semibold tracking-wide">
                <Sparkles className="w-4 h-4 text-tvk-gold-400" />
                <span>{t('hero.badge')}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                {t('hero.title')}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tvk-gold-300 via-tvk-gold-400 to-tvk-gold-200 drop-shadow">
                  {t('hero.highlight')}
                </span>
              </h1>

              {/* Description */}
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
                {t('hero.description')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActivePage('grievance')}
                  className="px-6 py-3.5 bg-gradient-to-r from-tvk-gold-500 to-tvk-gold-400 hover:from-tvk-gold-400 hover:to-tvk-gold-300 text-tvk-maroon-950 font-bold rounded-xl shadow-lg hover:shadow-gold transition-all flex items-center gap-2 text-base transform hover:-translate-y-0.5"
                >
                  <FileText className="w-5 h-5 text-tvk-maroon-950" />
                  <span>{t('hero.btnGrievance')}</span>
                  <ArrowRight className="w-4 h-4 text-tvk-maroon-950" />
                </button>

                {!currentUser && (
                  <button
                    onClick={onOpenRegister}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all flex items-center gap-2 text-base"
                  >
                    <UserPlus className="w-5 h-5 text-tvk-gold-300" />
                    <span>{t('hero.btnRegister')}</span>
                  </button>
                )}

                <button
                  onClick={() => setActivePage('track')}
                  className="px-5 py-3.5 text-tvk-gold-300 hover:text-white font-semibold rounded-xl transition-colors flex items-center gap-1.5 text-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>{t('hero.btnTrack')}</span>
                </button>
              </div>

              {/* Quick Complaint Lookup Input Box */}
              <div className="pt-4 max-w-xl mx-auto lg:mx-0">
                <form
                  onSubmit={handleQuickTrack}
                  className="p-1.5 bg-tvk-maroon-950/80 rounded-2xl border border-tvk-gold-400/40 shadow-xl flex items-center gap-2"
                >
                  <div className="pl-3 text-tvk-gold-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={quickTrackId}
                    onChange={(e) => setQuickTrackId(e.target.value)}
                    placeholder={t('hero.quickTrackPlaceholder')}
                    className="flex-1 bg-transparent px-2 py-2 text-sm text-white placeholder-slate-400 focus:outline-none font-mono"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-tvk-gold-500 hover:bg-tvk-gold-400 text-tvk-maroon-950 font-bold rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-colors"
                  >
                    {t('hero.trackBtn')}
                  </button>
                </form>
              </div>

            </div>

            {/* Right Column: Representative & Constituency Office Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm space-y-4">
                
                {/* Official Constituency Emblem */}
                <RepresentativeEmblem />

                <div className="bg-tvk-maroon-900/90 rounded-2xl p-5 border border-tvk-gold-400/40 text-white space-y-3 shadow-xl backdrop-blur-sm">
                  {/* Focus Highlights */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-tvk-gold-400 flex-shrink-0" />
                      <span>{t('rep.focus1')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-tvk-gold-400 flex-shrink-0" />
                      <span>{t('rep.focus2')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-tvk-gold-400 flex-shrink-0" />
                      <span>{t('rep.focus3')}</span>
                    </div>
                  </div>

                  {/* Link to full bio */}
                  <button
                    onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="w-full py-2.5 bg-tvk-maroon-800 hover:bg-tvk-maroon-700 text-tvk-gold-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border border-tvk-gold-400/30"
                  >
                    <span>{t('rep.readMore')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Key Metrics / Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          
          <div className="space-y-1 sm:border-r border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-tvk-maroon-50 text-tvk-maroon-900 mx-auto flex items-center justify-center mb-2">
              <Building2 className="w-5 h-5 text-tvk-maroon-800" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {t('statsBar.wardsVal')}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t('statsBar.wards')}
            </div>
          </div>

          <div className="space-y-1 md:border-r border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-tvk-gold-600 mx-auto flex items-center justify-center mb-2">
              <UserPlus className="w-5 h-5 text-tvk-gold-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {t('statsBar.citizensVal')}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t('statsBar.citizens')}
            </div>
          </div>

          <div className="space-y-1 sm:border-r border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700">
              {t('statsBar.resolvedRateVal')}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t('statsBar.resolvedRate')}
            </div>
          </div>

          <div className="space-y-1">
            <div className="w-10 h-10 rounded-xl bg-tvk-maroon-50 text-tvk-maroon-900 mx-auto flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-tvk-maroon-800" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {t('statsBar.fundsAllocatedVal')}
            </div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t('statsBar.fundsAllocated')}
            </div>
          </div>

        </div>
      </section>

      {/* 4-Step Grievance Redressal Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-tvk-maroon-800 bg-tvk-maroon-50 px-3 py-1 rounded-full border border-tvk-maroon-200">
            {language === 'ta' ? 'வெளிப்படையான முறை' : 'Transparent Workflow'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {language === 'ta' ? 'குறைதீர்ப்பு மனு எவ்வாறு செயல்படுத்தப்படுகிறது?' : 'How Your Grievance is Handled'}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {language === 'ta'
              ? 'பொதுமக்கள் மனு அளித்த நொடியிலிருந்து தீர்வு காணும் வரை ஒவ்வொரு கட்டமும் வெளிப்படையாக கண்காணிக்கப்படுகிறது.'
              : 'Every stage from submission to ground inspection and resolution is logged with official verification.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:border-tvk-maroon-800 transition-colors">
            <span className="w-8 h-8 rounded-full bg-tvk-maroon-900 text-white font-bold text-sm flex items-center justify-center mb-4">
              1
            </span>
            <h4 className="font-bold text-slate-900 text-base mb-1">
              {language === 'ta' ? '1. இணையவழி பதிவு' : '1. Online Registration'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'ta'
                ? 'உங்கள் கைபேசி எண் மூலம் உள்நுழைந்து, புகைப்படத்துடன் பிரச்சனையை பதிவு செய்யுங்கள்.'
                : 'Login with phone OTP and file the issue with location and photo attachment.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:border-tvk-maroon-800 transition-colors">
            <span className="w-8 h-8 rounded-full bg-tvk-maroon-900 text-white font-bold text-sm flex items-center justify-center mb-4">
              2
            </span>
            <h4 className="font-bold text-slate-900 text-base mb-1">
              {language === 'ta' ? '2. உடனடி ஒதுக்கீடு' : '2. Officer Assignment'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'ta'
                ? 'சம்பந்தப்பட்ட துறை பொறியாளர் அல்லது மண்டல அலுவலரிடம் 24 மணி நேரத்திற்குள் மனு ஒப்படைக்கப்படும்.'
                : 'Directly assigned to department nodal engineers within 24 hours.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:border-tvk-maroon-800 transition-colors">
            <span className="w-8 h-8 rounded-full bg-tvk-maroon-900 text-white font-bold text-sm flex items-center justify-center mb-4">
              3
            </span>
            <h4 className="font-bold text-slate-900 text-base mb-1">
              {language === 'ta' ? '3. கள ஆய்வு & பணி' : '3. Field Action'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'ta'
                ? 'நேரடி களப்பணி நடத்தப்பட்டு நிலை அறிக்கை மற்றும் நிதி ஒதுக்கீடு பதிவேற்றப்படும்.'
                : 'Ground inspection and material execution carried out with progress notes.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group hover:border-tvk-maroon-800 transition-colors">
            <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center mb-4">
              4
            </span>
            <h4 className="font-bold text-slate-900 text-base mb-1">
              {language === 'ta' ? '4. தீர்வு & ஒப்புதல்' : '4. Verification & Close'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'ta'
                ? 'மனுதாரரிடம் நேரடி கைபேசி அழைப்பு மூலம் உறுதி செய்த பிறகே மனு நிறைவு செய்யப்படும்.'
                : 'Confirmed via citizen feedback call before officially closing the file.'}
            </p>
          </div>

        </div>
      </section>

      {/* Development Works Preview */}
      <section className="bg-slate-100/70 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-tvk-maroon-800">
                {language === 'ta' ? 'வளர்ச்சி சாதனைகள்' : 'Infrastructure Delivery'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {t('projects.title')}
              </h2>
            </div>
            <button
              onClick={() => { setActivePage('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-sm font-bold text-tvk-maroon-800 hover:text-tvk-maroon-900 flex items-center gap-1"
            >
              <span>{language === 'ta' ? 'அனைத்து திட்டங்களையும் காண்க' : 'View All Projects'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {activeProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative h-44 bg-slate-200 overflow-hidden">
                  <img
                    src={proj.imageUrl}
                    alt={proj.title[language] || proj.title.en}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 text-slate-800 shadow">
                      {proj.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-tvk-maroon-900 text-tvk-gold-300 shadow">
                      {proj.budgetVal}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2">
                      {proj.title[language] || proj.title.en}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                      <MapPin className="w-3.5 h-3.5 text-tvk-maroon-800 flex-shrink-0" />
                      <span className="truncate">{proj.location}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-2 border-t">
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-slate-600">{t('projects.completion')}</span>
                      <span className="text-tvk-maroon-900">{proj.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-tvk-gold-500 to-tvk-maroon-800 rounded-full"
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Announcements */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-tvk-maroon-800">
              {language === 'ta' ? 'அறிவிப்புகள்' : 'Public Dispatches'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {t('news.title')}
            </h2>
          </div>
          <button
            onClick={() => { setActivePage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="text-sm font-bold text-tvk-maroon-800 hover:text-tvk-maroon-900 flex items-center gap-1"
          >
            <span>{language === 'ta' ? 'அனைத்து செய்திகள்' : 'Browse All News'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {latestNews.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative h-44 bg-slate-200">
                <img
                  src={item.imageUrl}
                  alt={item.title[language] || item.title.en}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-tvk-maroon-900 text-white shadow">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-tvk-gold-600" />
                    <span>{item.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-2">
                    {item.title[language] || item.title.en}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {item.summary[language] || item.summary.en}
                  </p>
                </div>

                <button
                  onClick={() => { setActivePage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-xs font-bold text-tvk-maroon-900 hover:text-tvk-maroon-700 flex items-center gap-1 pt-2 border-t"
                >
                  <span>{t('news.readMore')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

