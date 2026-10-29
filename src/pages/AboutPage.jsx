import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_REPRESENTATIVE } from '../data/constituencyData';
import { RepresentativeEmblem } from '../components/RepresentativeEmblem';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  ExternalLink,
  MapPin,
  HeartHandshake,
  Users,
  Building,
  GraduationCap
} from 'lucide-react';

export const AboutPage = ({ setActivePage }) => {
  const { language, t } = useLanguage();
  const repName = INITIAL_REPRESENTATIVE.name[language] || INITIAL_REPRESENTATIVE.name.en;
  const repTitle = INITIAL_REPRESENTATIVE.title[language] || INITIAL_REPRESENTATIVE.title.en;

  const milestones = [
    {
      year: "2026",
      title: language === 'ta' ? "முழுமையான டிஜிட்டல் குறைதீர்ப்பு மையம்" : "Digital 24x7 Grievance Portal Launch",
      desc: language === 'ta' ? "பொதுமக்கள் தங்கள் இல்லத்தில் இருந்தே 24 மணி நேரமும் மனுக்கள் அனுப்பும் வசதி மற்றும் வெளிப்படையான கண்காணிப்பு." : "Inauguration of constituency digital citizen services ensuring total transparency.",
      source: "TN Govt Gazette / Legislative Assembly Proceedings 2026"
    },
    {
      year: "2025",
      title: language === 'ta' ? "₹18.5 கோடி மதிப்பிலான கூட்டு குடிநீர் திட்ட விரிவாக்கம்" : "₹18.5 Cr Combined Drinking Water Scheme",
      desc: language === 'ta' ? "45 கிராமங்கள் பயன்பெறும் வகையில் குழாய் பதிக்கும் பணிகள் மற்றும் ஆழ்துளை நீர் சுத்திகரிப்பு ஆலைகள் திறப்பு." : "Sanctioned and executed comprehensive pipeline covering 45 previously water-scarce hamlets.",
      source: "TWAD Board Technical Sanction No. 2024/CWSS-42"
    },
    {
      year: "2025",
      title: language === 'ta' ? "இளைஞர் திறன் மேம்பாடு & போட்டித் தேர்வு மையம்" : "Free Competitive Exam Academy",
      desc: language === 'ta' ? "3,200க்கும் மேற்பட்ட கிராமப்புற மாணவ-மாணவிகளுக்கு இலவச TNPSC, SSC மற்றும் வங்கித் தேர்வு பயிற்சிகள்." : "Free library and expert faculties benefiting over 3,200 rural graduates.",
      source: "Constituency Youth Development Directorate Record"
    },
    {
      year: "2024",
      title: language === 'ta' ? "விவசாயிகள் நேரடி விளைபொருள் குளிர்பதன கிடங்கு" : "Farmers Cold Storage Facility",
      desc: language === 'ta' ? "விவசாயிகள் இடைத்தரகர்கள் இன்றி உளுந்து, நெல், கரும்பு விளைபொருட்களை விற்க நவீன கிடங்கு திறப்பு." : "Modern 1,000 MT warehouse saving harvest produce from distress sale during monsoon.",
      source: "Agricultural Marketing Committee Release"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-tvk-maroon-50 text-tvk-maroon-900 border border-tvk-maroon-200">
          <ShieldCheck className="w-3.5 h-3.5 text-tvk-gold-500" />
          <span>{t('aboutPage.badge')}</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          {t('aboutPage.title')}
        </h1>
        <p className="text-base text-slate-600">
          {t('aboutPage.subtitle')}
        </p>
      </div>

      {/* Main Profile Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Official Constituency Seal */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm space-y-3">
            <RepresentativeEmblem className="w-full aspect-[4/4]" />
            <div className="text-center pt-2">
              <h2 className="text-lg font-black text-tvk-maroon-900">
                {repName}
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                {repTitle}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Bio Content */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h3 className="text-2xl font-black text-slate-900">
              {t('aboutPage.biographyTitle')}
            </h3>
            <div className="w-16 h-1 bg-tvk-maroon-800 rounded-full mt-2" />
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>{t('aboutPage.bioP1')}</p>
            <p>{t('aboutPage.bioP2')}</p>
            <p>
              {language === 'ta'
                ? 'அரசு நலத்திட்டங்கள் விக்கிரவாண்டியின் கடைக்கோடி மனிதருக்கும் சென்று சேர்வதே மக்கள் பணியின் வெற்றி என்ற உறுதியுடன் செயல்பட்டு வருகிறார். இளைஞர்களுக்கான தொழிற்கல்வி, மகளிர் வாழ்வாதார மேம்பாடு, விவசாயிகளின் பாசன வசதி ஆகிய துறைகளில் கூடுதல் கவனம் செலுத்தி வருகிறார்.'
                : 'Firm in the belief that the true metric of democracy is whether every government entitlement reaches the last citizen without prejudice. Dedicated to transforming Vikravandi into a model development constituency.'}
            </p>
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <Users className="w-5 h-5 text-tvk-maroon-800 mx-auto mb-1" />
              <span className="text-xs font-bold text-slate-800 block">
                {language === 'ta' ? 'மக்கள் தொடர்பு' : 'Public Grievances'}
              </span>
              <span className="text-[11px] text-slate-500">24x7 Direct Redressal</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
              <GraduationCap className="w-5 h-5 text-tvk-gold-600 mx-auto mb-1" />
              <span className="text-xs font-bold text-slate-800 block">
                {language === 'ta' ? 'இலவச கல்வி' : 'Education'}
              </span>
              <span className="text-[11px] text-slate-500">Smart Schools</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center col-span-2 sm:col-span-1">
              <Building className="w-5 h-5 text-tvk-maroon-800 mx-auto mb-1" />
              <span className="text-xs font-bold text-slate-800 block">
                {language === 'ta' ? 'கட்டமைப்பு' : 'Infrastructure'}
              </span>
              <span className="text-[11px] text-slate-500">Clean Roads & Water</span>
            </div>
          </div>

        </div>

      </div>

      {/* Verified Achievements & Milestones Timeline */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h3 className="text-2xl font-black text-slate-900">
            {t('aboutPage.achievementsTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            {t('aboutPage.achievementsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 relative hover:border-tvk-gold-400 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-tvk-gold-100 text-tvk-maroon-950 font-black text-xs rounded-full border border-tvk-gold-300 font-mono">
                  {m.year}
                </span>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold flex items-center gap-1 border border-emerald-200">
                  <CheckCircle className="w-3 h-3" />
                  {language === 'ta' ? 'சரிபார்க்கப்பட்டது' : 'Verified Record'}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900">
                {m.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {m.desc}
              </p>

              <div className="pt-2 border-t text-[11px] text-slate-400 font-medium">
                📄 {language === 'ta' ? 'அதிகாரப்பூர்வ ஆதாரம்:' : 'Official Gazette Source:'} <span className="text-slate-600">{m.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Transparency Statement */}
      <div className="p-6 bg-amber-50/70 border border-tvk-gold-300 rounded-2xl text-xs text-amber-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-tvk-gold-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-900">
            {language === 'ta' ? 'உண்மை சரிபார்ப்பு உறுதிமொழி:' : 'Public Verification & Data Integrity Commitment:'}
          </p>
          <p className="text-slate-700 leading-relaxed">
            {t('aboutPage.sourceNotice')} {language === 'ta'
              ? 'பொதுமக்கள் பிரதிநிதியின் அனைத்து திட்டங்கள் மற்றும் சட்டமன்ற உரைகள் குறித்து தகவல் அறியும் உரிமை சட்டம் (RTI) மூலமாகவும் தகவல்களைப் பெறலாம்.'
              : 'All public statements and funds allocations are cross-indexed against statutory assembly questions and district collectorate gazette releases.'}
          </p>
        </div>
      </div>

    </div>
  );
};

