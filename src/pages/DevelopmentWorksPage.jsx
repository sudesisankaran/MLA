import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getProjectsList } from '../services/dataService';
import {
  Building2,
  MapPin,
  Calendar,
  CheckCircle,
  ExternalLink,
  Search,
  Filter,
  Layers,
  Sparkles,
  TrendingUp,
  Award,
  LayoutGrid,
  List,
  SlidersHorizontal,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export const DevelopmentWorksPage = () => {
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'roads' | 'water' | 'health' | 'education'
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  useEffect(() => {
    const fetchProjects = async () => {
      const list = await getProjectsList();
      setProjects(list);
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((item) => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const title = (item.title[language] || item.title.en).toLowerCase();
    const loc = (item.location || '').toLowerCase();
    const matchesSearch = !search || title.includes(search.toLowerCase()) || loc.includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return {
          label: t('projects.completed'),
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-1 ring-emerald-400/30'
        };
      case 'ongoing':
        return {
          label: t('projects.ongoing'),
          bg: 'bg-amber-50 text-amber-800 border-amber-300 ring-1 ring-amber-400/30'
        };
      default:
        return {
          label: t('projects.planning'),
          bg: 'bg-blue-50 text-blue-800 border-blue-300 ring-1 ring-blue-400/30'
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-tvk-maroon-50 text-tvk-maroon-900 border border-tvk-maroon-200">
          <Building2 className="w-3.5 h-3.5 text-tvk-gold-500" />
          <span>{t('projects.title')}</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {t('projects.title')}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {t('projects.subtitle')}
        </p>
      </div>

      {/* Control Bar: Filters, Search & View Switcher (Grid vs List) */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {[
            { id: 'all', label: t('projects.filterAll') },
            { id: 'roads', label: t('projects.filterRoads') },
            { id: 'water', label: t('projects.filterWater') },
            { id: 'health', label: t('projects.filterHealth') },
            { id: 'education', label: t('projects.filterEdu') }
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

        {/* Search & View Switcher Toggle */}
        <div className="flex items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={language === 'ta' ? 'திட்டம் அல்லது ஊர் தேடுக...' : 'Search projects...'}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-tvk-maroon-800 outline-none transition-all"
            />
          </div>

          {/* View Mode Switcher (Grid / List) */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              title={language === 'ta' ? 'கட்டம் வடிவம் (Grid View)' : 'Grid View'}
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
              title={language === 'ta' ? 'பட்டியல் வடிவம் (List View)' : 'List View'}
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

      {/* Result Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          {language === 'ta' ? 'காட்டப்படும் திட்டங்கள்' : 'Showing'}:{' '}
          <strong className="text-slate-900 font-bold">{filteredProjects.length}</strong>{' '}
          {language === 'ta' ? 'திட்டங்கள்' : 'projects'}
        </span>
        <span className="text-[11px] text-tvk-maroon-900 font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-tvk-gold-600" />
          {language === 'ta' ? 'அனைத்து திட்டங்களும் அரசாணை சரிபார்க்கப்பட்டவை' : 'Verified against Tamil Nadu Govt Sanctions'}
        </span>
      </div>

      {/* VIEW 1: GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((proj) => {
            const statusBadge = getStatusBadge(proj.status);

            return (
              <div
                key={proj.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm tvk-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 bg-slate-200 overflow-hidden">
                    <img
                      src={proj.imageUrl}
                      alt={proj.title[language] || proj.title.en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-md ${statusBadge.bg}`}>
                        {statusBadge.label}
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <span className="px-3.5 py-1.5 rounded-xl text-xs font-black bg-tvk-maroon-950 text-tvk-gold-300 shadow-xl border border-tvk-gold-400/50">
                        {proj.budgetVal}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/90 text-slate-800 shadow">
                        {proj.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-4">
                    <h3 className="font-black text-slate-900 text-lg leading-snug line-clamp-2">
                      {proj.title[language] || proj.title.en}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                      <div className="space-y-0.5">
                        <span className="text-slate-400 font-semibold">{t('projects.ward')}:</span>
                        <p className="font-bold text-slate-800 truncate">{proj.location}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-slate-400 font-semibold">{t('projects.contractor')}:</span>
                        <p className="font-bold text-slate-800 truncate">{proj.executingAgency}</p>
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-600">{t('projects.completion')}</span>
                        <span className="text-tvk-maroon-900 font-mono text-sm">{proj.progress}%</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                        <div
                          className="h-full bg-gradient-to-r from-tvk-gold-500 via-tvk-gold-400 to-tvk-maroon-800 rounded-full transition-all duration-1000"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Source Footer */}
                <div className="p-6 sm:p-7 pt-0 border-t mt-2 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 truncate max-w-[260px]">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{proj.sourceGist}</span>
                  </div>
                  {proj.sourceLink && (
                    <a
                      href={proj.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-tvk-maroon-900 hover:text-tvk-maroon-700 font-bold flex items-center gap-1 flex-shrink-0 ml-2 group"
                    >
                      <span>{t('projects.verified')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: LIST / EXECUTIVE TABLE VIEW */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Project / Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Budget</th>
                  <th className="px-6 py-4">Status & Progress</th>
                  <th className="px-6 py-4 text-right">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredProjects.map((proj) => {
                  const statusBadge = getStatusBadge(proj.status);

                  return (
                    <tr key={proj.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 max-w-sm">
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.imageUrl}
                            alt=""
                            className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border"
                          />
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-sm leading-snug">
                              {proj.title[language] || proj.title.en}
                            </h4>
                            <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                              Agency: {proj.executingAgency}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="capitalize font-bold text-slate-700 px-2.5 py-1 bg-slate-100 rounded-lg">
                          {proj.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {proj.location}
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-tvk-maroon-900 text-sm">
                        {proj.budgetVal}
                      </td>
                      <td className="px-6 py-4 min-w-[160px]">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusBadge.bg}`}>
                              {statusBadge.label}
                            </span>
                            <span className="font-mono font-bold text-slate-800">{proj.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border">
                            <div
                              className="h-full bg-gradient-to-r from-tvk-gold-500 to-tvk-maroon-800"
                              style={{ width: `${proj.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {proj.sourceLink ? (
                          <a
                            href={proj.sourceLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-tvk-maroon-900 hover:text-tvk-maroon-700 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
                          >
                            <span>Verify</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
