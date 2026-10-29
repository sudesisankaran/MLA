import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getGalleryList } from '../services/dataService';
import {
  Image as ImageIcon,
  Calendar,
  MapPin,
  X,
  Maximize2,
  ZoomIn,
  LayoutGrid,
  Columns2,
  List
} from 'lucide-react';

export const GalleryPage = () => {
  const { language, t } = useLanguage();
  const [gallery, setGallery] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'welfare' | 'works' | 'events'
  const [activeItem, setActiveItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'showcase'

  useEffect(() => {
    const fetchGallery = async () => {
      const list = await getGalleryList();
      setGallery(list);
    };
    fetchGallery();
  }, []);

  const filtered = filter === 'all'
    ? gallery
    : gallery.filter(item => item.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-tvk-maroon-50 text-tvk-maroon-900 border border-tvk-maroon-200">
          <ImageIcon className="w-3.5 h-3.5 text-tvk-gold-500" />
          <span>{t('gallery.title')}</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t('gallery.title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          {t('gallery.subtitle')}
        </p>
      </div>

      {/* Control Bar: Category Filters & View Switcher */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: t('gallery.filterAll') },
            { id: 'welfare', label: t('gallery.filterWelfare') },
            { id: 'works', label: t('gallery.filterWorks') },
            { id: 'events', label: t('gallery.filterEvents') }
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

        {/* View Switcher (Standard Grid vs Showcase / Cinema Wide) */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            onClick={() => setViewMode('grid')}
            title="Mosaic Grid View"
            className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'grid'
                ? 'bg-white text-tvk-maroon-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="text-[11px]">{language === 'ta' ? 'கட்டம்' : 'Mosaic Grid'}</span>
          </button>
          <button
            onClick={() => setViewMode('showcase')}
            title="Showcase 2-Col View"
            className={`p-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'showcase'
                ? 'bg-white text-tvk-maroon-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Columns2 className="w-4 h-4" />
            <span className="text-[11px]">{language === 'ta' ? 'அகன்ற பார்வை' : 'Cinema View'}</span>
          </button>
        </div>

      </div>

      {/* VIEW 1: MOSAIC 3-COL GRID */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm cursor-pointer hover:shadow-xl transition-all"
            >
              <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title[language] || item.title.en}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/50 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-tvk-gold-400" />
                </div>

                {/* Bottom Info on Image */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white space-y-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-tvk-maroon-900 text-tvk-gold-300 inline-block border border-tvk-gold-400/40">
                    {item.category}
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-2 text-white">
                    {item.title[language] || item.title.en}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-300 pt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-tvk-gold-400" />
                      <span>{item.date}</span>
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-tvk-maroon-400" />
                        <span className="truncate">{item.location}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 2: CINEMA SHOWCASE 2-COL VIEW */}
      {viewMode === 'showcase' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="relative h-72 bg-slate-200 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-tvk-maroon-950 text-tvk-gold-300 shadow-md border border-tvk-gold-400/40">
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm group-hover:bg-tvk-maroon-900 transition-colors">
                  <Maximize2 className="w-4 h-4 text-tvk-gold-400" />
                </div>
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-slate-600 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-tvk-gold-600" />
                    <span>{item.date}</span>
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-1 text-tvk-maroon-800 font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </span>
                  )}
                </div>
                <h3 className="font-black text-slate-900 text-lg leading-snug">
                  {item.title[language] || item.title.en}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title[language] || activeItem.title.en}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 bg-slate-900 text-white space-y-2">
              <div className="flex items-center gap-3 text-xs text-tvk-gold-400">
                <span className="px-2.5 py-0.5 rounded bg-tvk-maroon-900 text-white font-bold uppercase">
                  {activeItem.category}
                </span>
                <span>{activeItem.date}</span>
                {activeItem.location && <span>• {activeItem.location}</span>}
              </div>
              <h2 className="text-lg sm:text-xl font-bold">
                {activeItem.title[language] || activeItem.title.en}
              </h2>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
