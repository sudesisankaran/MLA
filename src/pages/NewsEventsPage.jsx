import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getNewsList } from '../services/dataService';
import {
  Calendar,
  MapPin,
  ExternalLink,
  Tag,
  ArrowRight,
  X,
  Share2,
  Newspaper,
  Sparkles,
  LayoutGrid,
  List,
  Search
} from 'lucide-react';

export const NewsEventsPage = () => {
  const { language, t } = useLanguage();
  const [news, setNews] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'meetings' | 'press' | 'announcements'
  const [search, setSearch] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  useEffect(() => {
    const fetchNews = async () => {
      const list = await getNewsList();
      setNews(list);
    };
    fetchNews();
  }, []);

  const filteredList = news.filter((item) => {
    const matchesFilter = filter === 'all' || item.category === filter;
    const title = (item.title[language] || item.title.en).toLowerCase();
    const summary = (item.summary[language] || item.summary.en).toLowerCase();
    const matchesSearch = !search || title.includes(search.toLowerCase()) || summary.includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-tvk-maroon-50 text-tvk-maroon-900 border border-tvk-maroon-200">
          <Newspaper className="w-3.5 h-3.5 text-tvk-gold-500" />
          <span>{t('news.title')}</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t('news.title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          {t('news.subtitle')}
        </p>
      </div>

      {/* Control Bar: Filters, Search & View Switcher */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {[
            { id: 'all', label: t('news.filterAll') },
            { id: 'meetings', label: t('news.filterMeetings') },
            { id: 'press', label: t('news.filterPress') },
            { id: 'announcements', label: t('news.filterVisits') }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat.id
                  ? 'bg-tvk-maroon-900 text-white shadow-md shadow-tvk-maroon-950/20'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & View Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 sm:w-60">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={language === 'ta' ? 'செய்தி தேடுக...' : 'Search dispatches...'}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-tvk-maroon-800 outline-none"
            />
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white text-tvk-maroon-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px]">{language === 'ta' ? 'கட்டம்' : 'Grid'}</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              title="List View"
              className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'list'
                  ? 'bg-white text-tvk-maroon-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px]">{language === 'ta' ? 'பட்டியல்' : 'List'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* VIEW 1: GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm tvk-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 bg-slate-200 overflow-hidden group">
                  <img
                    src={item.imageUrl}
                    alt={item.title[language] || item.title.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-tvk-maroon-900 text-white shadow-md border border-tvk-gold-400/30">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 text-white text-xs flex items-center gap-1.5 font-medium drop-shadow">
                    <Calendar className="w-3.5 h-3.5 text-tvk-gold-400" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-3">
                  {item.location && (
                    <div className="flex items-center gap-1.5 text-xs text-tvk-maroon-800 font-semibold">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  )}

                  <h3 className="font-black text-slate-900 text-base leading-snug line-clamp-2">
                    {item.title[language] || item.title.en}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.summary[language] || item.summary.en}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-0 border-t mt-2">
                <button
                  onClick={() => setSelectedNews(item)}
                  className="w-full py-2.5 px-4 bg-slate-50 hover:bg-tvk-maroon-50 text-tvk-maroon-900 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 border border-slate-200 hover:border-tvk-maroon-300"
                >
                  <span>{t('news.readMore')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-tvk-maroon-900" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: LIST / EDITORIAL VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm tvk-card-hover flex flex-col md:flex-row items-stretch md:items-center gap-6"
            >
              <div className="w-full md:w-56 h-40 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 relative">
                <img
                  src={item.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-tvk-maroon-900 text-white shadow">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-semibold text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-tvk-gold-600" />
                    <span>{item.date}</span>
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-1 text-tvk-maroon-800 font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </span>
                  )}
                </div>

                <h3 className="font-black text-slate-900 text-base sm:text-lg leading-snug">
                  {item.title[language] || item.title.en}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.summary[language] || item.summary.en}
                </p>
              </div>

              <div className="flex items-center justify-end md:self-center pt-2 md:pt-0 border-t md:border-t-0">
                <button
                  onClick={() => setSelectedNews(item)}
                  className="px-5 py-2.5 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>{t('news.readMore')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-tvk-gold-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* News Full View Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-tvk-gold-300">
            
            <div className="relative h-64 bg-slate-200">
              <img
                src={selectedNews.imageUrl}
                alt={selectedNews.title[language] || selectedNews.title.en}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 bg-tvk-maroon-900 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                  {selectedNews.category}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-4 text-xs text-slate-500 border-b pb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-tvk-gold-600" />
                  <span>{selectedNews.date}</span>
                </span>
                {selectedNews.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-tvk-maroon-800" />
                    <span>{selectedNews.location}</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {selectedNews.title[language] || selectedNews.title.en}
              </h2>

              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {selectedNews.content[language] || selectedNews.content.en}
              </p>

              {selectedNews.sourceLink && (
                <div className="pt-4 border-t flex items-center justify-between">
                  <a
                    href={selectedNews.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-tvk-maroon-800 hover:text-tvk-maroon-900 font-bold"
                  >
                    <span>{language === 'ta' ? 'அதிகாரப்பூர்வ செய்தி ஆதாரம்' : 'Official Press Source'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: selectedNews.title[language] || selectedNews.title.en,
                          url: window.location.href
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copied to clipboard!');
                      }
                    }}
                    className="p-2 text-slate-500 hover:text-slate-800 rounded-xl"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
