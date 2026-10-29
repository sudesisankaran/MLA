import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { COMPLAINT_CATEGORIES } from '../data/tnDistricts';
import { createComplaint, getUserComplaints } from '../services/dataService';
import { StatusBadge } from '../components/StatusBadge';
import { ComplaintSlipModal } from '../components/ComplaintSlipModal';
import {
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Paperclip,
  Upload,
  Send,
  Loader2,
  Lock,
  UserPlus,
  LogIn,
  Search,
  ChevronRight,
  Printer,
  ShieldCheck,
  History
} from 'lucide-react';

export const GrievancePage = ({ onOpenAuth, onOpenRegister, onTrackId, setActivePage }) => {
  const { language, t } = useLanguage();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'my_list'
  const [formData, setFormData] = useState({
    category: 'water',
    subject: '',
    description: '',
    location: '',
    urgency: 'normal',
    attachmentUrl: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submittedComplaint, setSubmittedComplaint] = useState(null);
  const [myComplaints, setMyComplaints] = useState([]);
  const [loadingMyComplaints, setLoadingMyComplaints] = useState(false);
  const [slipModalComplaint, setSlipModalComplaint] = useState(null);

  // Fetch citizen's complaints when logged in
  useEffect(() => {
    if (currentUser?.phoneNumber) {
      loadMyComplaints();
    }
  }, [currentUser]);

  const loadMyComplaints = async () => {
    setLoadingMyComplaints(true);
    try {
      const list = await getUserComplaints(currentUser.phoneNumber);
      setMyComplaints(list);
    } catch (e) {
      console.warn('Failed to load my complaints:', e);
    } finally {
      setLoadingMyComplaints(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Mock file attachment preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(language === 'ta' ? 'கோப்பின் அளவு 5MB-க்குள் இருக்க வேண்டும்' : 'File must be under 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        attachmentUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!currentUser) {
      onOpenAuth();
      return;
    }

    if (!formData.subject.trim() || !formData.description.trim() || !formData.location.trim()) {
      setError(language === 'ta' ? 'அனைத்து தேவையான விவரங்களையும் நிரப்பவும்' : 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      const saved = await createComplaint({
        ...formData,
        citizenName: currentUser.fullName || 'Registered Citizen',
        citizenPhone: currentUser.phoneNumber,
        district: currentUser.district || 'Viluppuram',
        constituency: currentUser.constituency || 'Vikravandi'
      });

      setSubmittedComplaint(saved);
      // Reset form
      setFormData({
        category: 'water',
        subject: '',
        description: '',
        location: '',
        urgency: 'normal',
        attachmentUrl: ''
      });
      loadMyComplaints();
    } catch (err) {
      setError(err.message || 'Submission failed. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackSingle = (complaintId) => {
    if (onTrackId) {
      onTrackId(complaintId);
    }
    setActivePage('track');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-tvk-maroon-50 text-tvk-maroon-900 border border-tvk-maroon-200">
          <FileText className="w-3.5 h-3.5 text-tvk-gold-500" />
          <span>{t('grievance.title')}</span>
        </span>
        <h1 className="text-3xl font-black text-slate-900">
          {t('grievance.title')}
        </h1>
        <p className="text-sm text-slate-600">
          {t('grievance.subtitle')}
        </p>
      </div>

      {/* Auth Banner if Guest */}
      {!currentUser && (
        <div className="bg-gradient-to-r from-tvk-maroon-950 to-tvk-maroon-900 text-white rounded-2xl p-6 sm:p-8 border border-tvk-gold-400/40 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-tvk-gold-400 text-tvk-maroon-950 flex items-center justify-center flex-shrink-0 font-bold">
              <Lock className="w-6 h-6 text-tvk-maroon-950" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {language === 'ta' ? 'மனு தாக்கல் செய்ய உள்நுழைக' : 'Citizen Verification Required'}
              </h3>
              <p className="text-xs text-tvk-gold-200 mt-1 max-w-lg">
                {t('grievance.mustLoginNotice')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenAuth}
              className="flex-1 md:flex-none px-5 py-2.5 bg-tvk-gold-500 hover:bg-tvk-gold-400 text-tvk-maroon-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{t('nav.login')}</span>
            </button>
            <button
              onClick={onOpenRegister}
              className="flex-1 md:flex-none px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-tvk-gold-300" />
              <span>{t('nav.register')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tabs Switcher (Only if logged in) */}
      {currentUser && (
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('new')}
            className={`py-3 px-6 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'new'
                ? 'border-tvk-maroon-900 text-tvk-maroon-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 text-tvk-maroon-800" />
            <span>{t('grievance.fileNewComplaint')}</span>
          </button>
          <button
            onClick={() => { setActiveTab('my_list'); loadMyComplaints(); }}
            className={`py-3 px-6 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'my_list'
                ? 'border-tvk-maroon-900 text-tvk-maroon-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <History className="w-4 h-4 text-tvk-gold-600" />
            <span>{t('grievance.viewMyComplaints')} ({myComplaints.length})</span>
          </button>
        </div>
      )}

      {/* Tab 1: Submit Form */}
      {activeTab === 'new' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          
          {/* TVK Accent Stripe */}
          <div className="h-1.5 w-full tvk-gradient-bar" />

          {/* Form Content */}
          <div className="p-6 sm:p-10 space-y-6">
            
            {/* Success Submission Notification Card */}
            {submittedComplaint && (
              <div className="p-6 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-4 animate-fadeIn">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-emerald-950 text-lg">
                      {t('grievance.successTitle')}
                    </h3>
                    <p className="text-xs text-emerald-800">
                      {t('grievance.successDesc')}
                    </p>
                    <div className="text-2xl font-black font-mono text-tvk-maroon-900 tracking-wider pt-1">
                      {submittedComplaint.id}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-emerald-200">
                  <button
                    onClick={() => setSlipModalComplaint(submittedComplaint)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{language === 'ta' ? 'ஒப்புதல் சீட்டு அச்சிடு' : 'Print Official Slip'}</span>
                  </button>
                  <button
                    onClick={() => handleTrackSingle(submittedComplaint.id)}
                    className="px-4 py-2 bg-white border border-emerald-300 text-emerald-900 font-bold rounded-xl text-xs hover:bg-emerald-100/50 flex items-center gap-1.5"
                  >
                    <Search className="w-4 h-4" />
                    <span>{language === 'ta' ? 'நிலையை கண்காணிக்க' : 'Track Status'}</span>
                  </button>
                  <button
                    onClick={() => setSubmittedComplaint(null)}
                    className="text-xs text-emerald-700 hover:underline font-semibold ml-auto"
                  >
                    {language === 'ta' ? 'மற்றொரு மனு அளிக்க' : 'File another'}
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Category & Urgency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t('grievance.category')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm outline-none font-medium"
                    required
                  >
                    {COMPLAINT_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat[language] || cat.en}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t('grievance.urgency')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm outline-none font-medium"
                  >
                    <option value="normal">{t('grievance.urgencyNormal')}</option>
                    <option value="urgent">{t('grievance.urgencyUrgent')}</option>
                    <option value="critical">{t('grievance.urgencyCritical')}</option>
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('grievance.subject')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={t('grievance.subjectPlaceholder')}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm outline-none"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('grievance.location')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder={t('grievance.locationPlaceholder')}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm outline-none"
                    required
                  />
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('grievance.description')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={t('grievance.descriptionPlaceholder')}
                  className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm outline-none leading-relaxed"
                  required
                />
              </div>

              {/* Supporting Document / Photo Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('grievance.attachment')}
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-tvk-maroon-700 transition-colors bg-slate-50/50">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-600 font-medium">
                    {t('grievance.attachmentNote')}
                  </p>
                  <label className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 cursor-pointer hover:bg-slate-100 transition-all shadow-sm">
                    <Paperclip className="w-3.5 h-3.5 text-tvk-maroon-800" />
                    <span>{language === 'ta' ? 'கோப்பை தேர்வு செய்க' : 'Choose File'}</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {formData.attachmentUrl && (
                    <div className="mt-2 text-xs font-semibold text-emerald-600 flex items-center justify-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{language === 'ta' ? 'கோப்பு இணைக்கப்பட்டுள்ளது' : 'Attachment Loaded'}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 text-sm disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-tvk-gold-400" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-tvk-gold-400" />
                      <span>{t('grievance.submitGrievance')}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>
      )}

      {/* Tab 2: My Complaints History */}
      {activeTab === 'my_list' && currentUser && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              {t('grievance.viewMyComplaints')}
            </h2>
            <button
              onClick={loadMyComplaints}
              className="text-xs text-tvk-maroon-800 font-bold hover:underline"
            >
              {language === 'ta' ? 'புதுப்பிக்க' : 'Refresh'}
            </button>
          </div>

          {loadingMyComplaints ? (
            <div className="p-12 text-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-tvk-maroon-900 mb-2" />
              <p className="text-xs font-medium">{language === 'ta' ? 'ஏற்றப்படுகிறது...' : 'Loading your complaints...'}</p>
            </div>
          ) : myComplaints.length === 0 ? (
            <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
              <FileText className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700">
                {language === 'ta' ? 'இதுவரை எந்த புகாரும் பதிவு செய்யப்படவில்லை' : 'No complaints registered yet'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {language === 'ta'
                  ? 'உங்கள் ஊர் சார்ந்த ஏதேனும் பிரச்சனைகள் இருந்தால் புதிய மனுவை பதியுங்கள்.'
                  : 'Submit a new grievance to receive quick assistance and action from the MLA cell.'}
              </p>
              <button
                onClick={() => setActiveTab('new')}
                className="px-4 py-2 bg-tvk-maroon-900 text-white rounded-xl text-xs font-bold"
              >
                {t('grievance.fileNewComplaint')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {myComplaints.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-lg border">
                        {item.id}
                      </span>
                      <StatusBadge status={item.status} size="sm" />
                      <span className="text-xs text-slate-400">
                        {new Date(item.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      {item.subject}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-1">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-tvk-maroon-800" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0">
                    <button
                      onClick={() => setSlipModalComplaint(item)}
                      title="Print Acknowledgment Slip"
                      className="p-2 border rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleTrackSingle(item.id)}
                      className="flex-1 md:flex-none px-4 py-2 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>{language === 'ta' ? 'நிலையை காண்க' : 'Track'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Slip Modal Component */}
      {slipModalComplaint && (
        <ComplaintSlipModal
          complaint={slipModalComplaint}
          onClose={() => setSlipModalComplaint(null)}
        />
      )}

    </div>
  );
};

