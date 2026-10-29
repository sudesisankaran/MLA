import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  getAllComplaints,
  updateComplaintStatus,
  getNewsList,
  addNewsItem,
  deleteNewsItem,
  getProjectsList,
  addProjectItem,
  updateProjectProgress
} from '../services/dataService';
import { StatusBadge } from '../components/StatusBadge';
import { COMPLAINT_CATEGORIES, COMPLAINT_STATUSES } from '../data/tnDistricts';
import {
  Shield,
  Search,
  Filter,
  Download,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  RotateCcw,
  X,
  FileSpreadsheet,
  Building,
  Newspaper,
  Layers,
  UserCheck,
  Send,
  Loader2,
  Lock,
  ChevronRight
} from 'lucide-react';

export const AdminDashboardPage = ({ onOpenAuth }) => {
  const { language, t } = useLanguage();
  const { isAdmin, currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('complaints'); // 'complaints' | 'news' | 'projects'
  const [complaints, setComplaints] = useState([]);
  const [news, setNews] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters for Complaints
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected complaint for drawer/modal
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [publicUpdateText, setPublicUpdateText] = useState('');
  const [internalNoteText, setInternalNoteText] = useState('');
  const [assignedOfficerText, setAssignedOfficerText] = useState('');
  const [departmentText, setDepartmentText] = useState('');
  const [updating, setUpdating] = useState(false);

  // Add News Modal
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [newsForm, setNewsForm] = useState({
    titleTa: '',
    titleEn: '',
    category: 'meetings',
    date: new Date().toISOString().split('T')[0],
    summaryTa: '',
    summaryEn: '',
    contentTa: '',
    contentEn: '',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    location: 'Vikravandi Constituency Office'
  });

  // Add Project Modal
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [projectForm, setProjectForm] = useState({
    titleTa: '',
    titleEn: '',
    category: 'roads',
    budgetVal: '₹ 2.50 Cr',
    status: 'ongoing',
    progress: 50,
    location: 'Vikravandi Ward 8',
    executingAgency: 'State Highways Dept',
    sourceGist: 'MLA Special Fund 2026',
    imageUrl: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&q=80&w=800'
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [complaintsData, newsData, projectsData] = await Promise.all([
        getAllComplaints(),
        getNewsList(),
        getProjectsList()
      ]);
      setComplaints(complaintsData);
      setNews(newsData);
      setProjects(projectsData);
    } catch (e) {
      console.warn('Failed to load admin data:', e);
    } finally {
      setLoading(false);
    }
  };

  // Guard: if not authenticated as admin, show staff sign-in prompt
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-tvk-maroon-900 text-tvk-gold-400 flex items-center justify-center mx-auto shadow-xl">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            {t('admin.staffLoginNotice')}
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            {language === 'ta'
              ? 'அங்கீகரிக்கப்பட்ட தொகுதி ஊழியர்கள் மற்றும் அதிகாரிகள் மட்டுமே இங்கு அணுக முடியும்.'
              : 'Authorized MLA Secretariat grievance supervisors and staff only.'}
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="w-full py-3 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white font-bold rounded-xl shadow-md transition-all text-sm"
        >
          {t('admin.enterAdmin')}
        </button>
      </div>
    );
  }

  // Filter complaints
  const filteredComplaints = complaints.filter((c) => {
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesCat = categoryFilter === 'all' || c.category === categoryFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      !searchQuery ||
      c.id.toLowerCase().includes(q) ||
      (c.citizenName || '').toLowerCase().includes(q) ||
      (c.location || '').toLowerCase().includes(q) ||
      (c.subject || '').toLowerCase().includes(q);

    return matchesStatus && matchesCat && matchesQuery;
  });

  // Complaint metrics
  const totalCount = complaints.length;
  const underReviewCount = complaints.filter(c => c.status === 'under_review').length;
  const inProgressCount = complaints.filter(c => c.status === 'in_progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved' || c.status === 'closed').length;

  const handleOpenComplaintDrawer = (comp) => {
    setSelectedComplaint(comp);
    setEditStatus(comp.status);
    setAssignedOfficerText(comp.assignedOfficer || '');
    setDepartmentText(comp.department || '');
    setPublicUpdateText('');
    setInternalNoteText('');
  };

  const handleSaveComplaintUpdates = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    setUpdating(true);
    try {
      const updated = await updateComplaintStatus({
        refId: selectedComplaint.id,
        status: editStatus,
        publicUpdateText,
        internalNote: internalNoteText,
        assignedOfficer: assignedOfficerText,
        department: departmentText
      });

      setSelectedComplaint(updated);
      await loadAllData();
      alert(language === 'ta' ? 'மாற்றங்கள் வெற்றிகரமாக சேமிக்கப்பட்டன!' : 'Grievance record updated successfully!');
      setSelectedComplaint(null);
    } catch (err) {
      alert(err.message || 'Update failed.');
    } finally {
      setUpdating(false);
    }
  };

  // CSV Exporter for authorized records
  const handleExportCSV = () => {
    if (filteredComplaints.length === 0) {
      alert('No records to export');
      return;
    }

    const headers = ['Ref ID', 'Citizen Name', 'Phone', 'Category', 'Location', 'Status', 'Submitted Date', 'Officer'];
    const rows = filteredComplaints.map(c => [
      c.id,
      `"${c.citizenName.replace(/"/g, '""')}"`,
      c.citizenPhone,
      c.category,
      `"${c.location.replace(/"/g, '""')}"`,
      c.status,
      c.submittedAt,
      `"${(c.assignedOfficer || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tvk_mla_grievances_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add News Handler
  const handleAddNews = async (e) => {
    e.preventDefault();
    await addNewsItem({
      title: { ta: newsForm.titleTa, en: newsForm.titleEn },
      summary: { ta: newsForm.summaryTa, en: newsForm.summaryEn },
      content: { ta: newsForm.contentTa, en: newsForm.contentEn },
      category: newsForm.category,
      date: newsForm.date,
      imageUrl: newsForm.imageUrl,
      location: newsForm.location,
      sourceLink: 'https://tndipr.gov.in/'
    });
    setShowAddNewsModal(false);
    loadAllData();
  };

  // Delete News Handler
  const handleDeleteNews = async (newsId) => {
    if (window.confirm('Delete this announcement?')) {
      await deleteNewsItem(newsId);
      loadAllData();
    }
  };

  // Add Project Handler
  const handleAddProject = async (e) => {
    e.preventDefault();
    await addProjectItem({
      title: { ta: projectForm.titleTa, en: projectForm.titleEn },
      category: projectForm.category,
      budgetVal: projectForm.budgetVal,
      status: projectForm.status,
      progress: Number(projectForm.progress),
      location: projectForm.location,
      executingAgency: projectForm.executingAgency,
      sourceGist: projectForm.sourceGist,
      imageUrl: projectForm.imageUrl
    });
    setShowAddProjectModal(false);
    loadAllData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Console Bar */}
      <div className="bg-tvk-maroon-950 text-white rounded-3xl p-6 sm:p-8 border border-tvk-gold-400/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-tvk-gold-400 font-bold text-xs uppercase tracking-wider">
            <Shield className="w-4 h-4 text-tvk-gold-400" />
            <span>{t('admin.title')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            {language === 'ta' ? 'சட்டமன்ற உறுப்பினர் அலுவலக கட்டுப்பாட்டகம்' : 'MLA Secretariat Staff Console'}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            {t('admin.subtitle')} • <span className="text-tvk-gold-300 font-bold">{currentUser?.fullName}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadAllData}
            title="Refresh Data"
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-tvk-gold-300 rounded-xl text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'புதுப்பிக்க' : 'Refresh'}</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-tvk-gold-500 hover:bg-tvk-gold-400 text-tvk-maroon-950 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('admin.exportCsv')}</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-500 uppercase">{t('admin.totalComplaints')}</span>
          <div className="text-3xl font-black text-slate-900">{totalCount}</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm space-y-1 bg-amber-50/30">
          <span className="text-xs font-bold text-amber-700 uppercase">{t('admin.pendingReview')}</span>
          <div className="text-3xl font-black text-amber-800">{underReviewCount}</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-purple-200 shadow-sm space-y-1 bg-purple-50/30">
          <span className="text-xs font-bold text-purple-700 uppercase">{t('admin.inProgress')}</span>
          <div className="text-3xl font-black text-purple-800">{inProgressCount}</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-1 bg-emerald-50/30">
          <span className="text-xs font-bold text-emerald-700 uppercase">{t('admin.resolved')}</span>
          <div className="text-3xl font-black text-emerald-800">{resolvedCount}</div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl px-4 shadow-sm">
        <button
          onClick={() => setActiveTab('complaints')}
          className={`py-3.5 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'complaints'
              ? 'border-tvk-maroon-900 text-tvk-maroon-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-tvk-maroon-800" />
          <span>{t('admin.tabComplaints')} ({complaints.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('news')}
          className={`py-3.5 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'news'
              ? 'border-tvk-maroon-900 text-tvk-maroon-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Newspaper className="w-4 h-4 text-tvk-gold-600" />
          <span>{t('admin.tabNews')} ({news.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`py-3.5 px-5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'border-tvk-maroon-900 text-tvk-maroon-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building className="w-4 h-4 text-tvk-maroon-800" />
          <span>{t('admin.tabProjects')} ({projects.length})</span>
        </button>
      </div>

      {/* TAB 1: COMPLAINTS MANAGEMENT */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          
          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative col-span-1 sm:col-span-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('admin.searchPlaceholder')}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-tvk-maroon-800 outline-none"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-tvk-maroon-800 outline-none"
              >
                <option value="all">{t('admin.filterStatus')} (All)</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-tvk-maroon-800 outline-none"
              >
                <option value="all">{t('admin.filterCategory')} (All)</option>
                {COMPLAINT_CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c[language] || c.en}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Complaints Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs divide-y divide-slate-200">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">{t('admin.colRef')}</th>
                  <th className="px-4 py-3">{t('admin.colCitizen')}</th>
                  <th className="px-4 py-3">{t('admin.colCategory')}</th>
                  <th className="px-4 py-3">{t('admin.colWard')}</th>
                  <th className="px-4 py-3">{t('admin.colStatus')}</th>
                  <th className="px-4 py-3 text-right">{t('admin.colActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredComplaints.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-500">
                      No complaints matching filters.
                    </td>
                  </tr>
                ) : (
                  filteredComplaints.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-tvk-maroon-900 select-all">
                        {c.id}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{c.citizenName}</div>
                        <div className="text-[11px] font-mono text-slate-500">+91 {c.citizenPhone}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="capitalize font-medium text-slate-700">{c.category}</span>
                      </td>
                      <td className="px-4 py-3 max-w-[180px] truncate text-slate-600">
                        {c.location}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={c.status} size="sm" />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => handleOpenComplaintDrawer(c)}
                          className="px-3 py-1.5 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white rounded-lg font-bold text-[11px] transition-all inline-flex items-center gap-1 shadow-sm"
                        >
                          <Edit className="w-3 h-3 text-tvk-gold-400" />
                          <span>{t('admin.viewDetails')}</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB 2: NEWS & ANNOUNCEMENTS MANAGEMENT */}
      {activeTab === 'news' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {t('admin.tabNews')}
            </h2>
            <button
              onClick={() => setShowAddNewsModal(true)}
              className="px-4 py-2 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 text-tvk-gold-400" />
              <span>{t('admin.addNewNews')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase text-tvk-maroon-800 bg-tvk-maroon-100 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-2 line-clamp-2">
                    {item.title[language] || item.title.en}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {item.summary[language] || item.summary.en}
                  </p>
                </div>
                <div className="pt-2 border-t flex items-center justify-between">
                  <span className="text-xs text-slate-400">{item.date}</span>
                  <button
                    onClick={() => handleDeleteNews(item.id)}
                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete announcement"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PROJECTS MANAGEMENT */}
      {activeTab === 'projects' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {t('admin.tabProjects')}
            </h2>
            <button
              onClick={() => setShowAddProjectModal(true)}
              className="px-4 py-2 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4 text-tvk-gold-400" />
              <span>{t('admin.addNewProject')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div key={proj.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500">{proj.category}</span>
                    <h3 className="font-bold text-slate-900 text-base">{proj.title[language] || proj.title.en}</h3>
                    <p className="text-xs text-slate-500">{proj.location}</p>
                  </div>
                  <span className="font-bold text-xs bg-tvk-maroon-900 text-tvk-gold-300 px-2.5 py-1 rounded-lg">
                    {proj.budgetVal}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Progress: {proj.progress}%</span>
                    <span className="capitalize font-bold text-tvk-maroon-900">{proj.status}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-tvk-gold-500 to-tvk-maroon-800"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={proj.progress}
                    onChange={async (e) => {
                      const newProg = e.target.value;
                      await updateProjectProgress(proj.id, newProg, newProg == 100 ? 'completed' : 'ongoing');
                      loadAllData();
                    }}
                    className="flex-1 accent-tvk-maroon-900 cursor-pointer"
                  />
                  <span className="text-xs font-mono font-bold text-slate-700 w-10 text-right">{proj.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPLAINT DETAILS & ACTION DRAWER / MODAL */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-tvk-gold-300">
            
            <div className="bg-gradient-to-r from-tvk-maroon-950 via-tvk-maroon-900 to-tvk-maroon-950 p-5 text-white flex items-center justify-between border-b-2 border-tvk-gold-400">
              <div>
                <span className="text-xs text-tvk-gold-300 font-mono">MLA REDRESSAL DOSSIER</span>
                <h3 className="font-mono font-black text-xl text-white">
                  {selectedComplaint.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveComplaintUpdates} className="p-6 sm:p-8 space-y-6">
              
              {/* Citizen & Issue Summary */}
              <div className="p-4 bg-slate-50 rounded-2xl border space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">{t('admin.colCitizen')}:</span>
                  <span className="font-bold text-slate-900">{selectedComplaint.citizenName} (+91 {selectedComplaint.citizenPhone})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-semibold">{t('admin.colWard')}:</span>
                  <span className="font-bold text-slate-900">{selectedComplaint.location}</span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-slate-500 font-semibold block mb-0.5">Subject:</span>
                  <p className="font-bold text-slate-900 text-sm">{selectedComplaint.subject}</p>
                  <p className="text-slate-600 mt-1 leading-relaxed bg-white p-2.5 rounded-lg border">{selectedComplaint.description}</p>
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('admin.updateStatus')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COMPLAINT_STATUSES.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setEditStatus(st.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                        editStatus === st.id
                          ? 'bg-tvk-maroon-900 text-white border-tvk-maroon-950 shadow-md ring-2 ring-tvk-gold-400'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {st[language] || st.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assigned Officer & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Assigned Officer
                  </label>
                  <input
                    type="text"
                    value={assignedOfficerText}
                    onChange={(e) => setAssignedOfficerText(e.target.value)}
                    placeholder="e.g. Assistant Engineer, TWAD"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-tvk-maroon-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Department
                  </label>
                  <input
                    type="text"
                    value={departmentText}
                    onChange={(e) => setDepartmentText(e.target.value)}
                    placeholder="e.g. Tamil Nadu Highways Dept"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-tvk-maroon-800"
                  />
                </div>
              </div>

              {/* Public Citizen Update Note (Visible to public when tracking) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>{t('admin.addPublicUpdate')}</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">📢 Public Citizen Notification</span>
                </label>
                <textarea
                  rows={2}
                  value={publicUpdateText}
                  onChange={(e) => setPublicUpdateText(e.target.value)}
                  placeholder="e.g. Material sanctioned. Road relaying work commences on Monday."
                  className="w-full p-3 bg-amber-50/50 border border-tvk-gold-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-tvk-maroon-800"
                />
              </div>

              {/* Internal Office Staff Note (Confidential, staff only) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>{t('admin.addInternalNote')}</span>
                  <span className="text-[11px] text-purple-700 font-semibold">🔒 Confidential Staff Only</span>
                </label>
                <textarea
                  rows={2}
                  value={internalNoteText}
                  onChange={(e) => setInternalNoteText(e.target.value)}
                  placeholder="e.g. Discussed with Collectorate; MLA development quota clearance confirmed."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-tvk-maroon-800"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  className="px-4 py-2 border rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-6 py-2.5 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4 text-tvk-gold-400" />}
                  <span>{t('admin.saveUpdates')}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ADD NEWS MODAL */}
      {showAddNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-tvk-gold-300">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">{t('admin.addNewNews')}</h3>
              <button onClick={() => setShowAddNewsModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddNews} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tamil Title</label>
                <input
                  type="text"
                  required
                  value={newsForm.titleTa}
                  onChange={e => setNewsForm({ ...newsForm, titleTa: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                  placeholder="செய்தி தலைப்பு"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">English Title</label>
                <input
                  type="text"
                  required
                  value={newsForm.titleEn}
                  onChange={e => setNewsForm({ ...newsForm, titleEn: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                  placeholder="English headline"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newsForm.category}
                    onChange={e => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="meetings">Public Meetings</option>
                    <option value="press">Press Releases</option>
                    <option value="announcements">Field Inspections</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={newsForm.date}
                    onChange={e => setNewsForm({ ...newsForm, date: e.target.value })}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Summary (Tamil)</label>
                <textarea
                  rows={2}
                  required
                  value={newsForm.summaryTa}
                  onChange={e => setNewsForm({ ...newsForm, summaryTa: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Content (Tamil)</label>
                <textarea
                  rows={3}
                  required
                  value={newsForm.contentTa}
                  onChange={e => setNewsForm({ ...newsForm, contentTa: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-tvk-maroon-900 text-white font-bold rounded-xl shadow-md text-xs"
              >
                Publish Announcement
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADD PROJECT MODAL */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 space-y-4 border border-tvk-gold-300">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-base text-slate-900">{t('admin.addNewProject')}</h3>
              <button onClick={() => setShowAddProjectModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddProject} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Project Title (Tamil)</label>
                <input
                  type="text"
                  required
                  value={projectForm.titleTa}
                  onChange={e => setProjectForm({ ...projectForm, titleTa: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                  placeholder="திட்டத்தின் பெயர்"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Project Title (English)</label>
                <input
                  type="text"
                  required
                  value={projectForm.titleEn}
                  onChange={e => setProjectForm({ ...projectForm, titleEn: e.target.value })}
                  className="w-full p-2 border rounded-xl"
                  placeholder="English title"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={projectForm.category}
                    onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full p-2 border rounded-xl"
                  >
                    <option value="roads">Roads & Bridges</option>
                    <option value="water">Water & Sanitation</option>
                    <option value="health">Hospitals & Health</option>
                    <option value="education">Schools & Education</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Budget</label>
                  <input
                    type="text"
                    value={projectForm.budgetVal}
                    onChange={e => setProjectForm({ ...projectForm, budgetVal: e.target.value })}
                    className="w-full p-2 border rounded-xl"
                    placeholder="₹ 5.00 Cr"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location / Ward</label>
                  <input
                    type="text"
                    value={projectForm.location}
                    onChange={e => setProjectForm({ ...projectForm, location: e.target.value })}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Executing Agency</label>
                  <input
                    type="text"
                    value={projectForm.executingAgency}
                    onChange={e => setProjectForm({ ...projectForm, executingAgency: e.target.value })}
                    className="w-full p-2 border rounded-xl"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-tvk-maroon-900 text-white font-bold rounded-xl shadow-md text-xs"
              >
                Add Development Project
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

