import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getComplaintByRef } from '../services/dataService';
import { StatusBadge } from '../components/StatusBadge';
import { ComplaintSlipModal } from '../components/ComplaintSlipModal';
import { COMPLAINT_CATEGORIES } from '../data/tnDistricts';
import {
  Search,
  ShieldCheck,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  UserCheck,
  Building,
  Printer,
  FileText,
  Lock,
  ArrowRight,
  Eye,
  Check,
  AlertTriangle
} from 'lucide-react';

export const TrackComplaintPage = ({ initialTrackId = '', onOpenAuth }) => {
  const { language, t } = useLanguage();
  const { currentUser, isAdmin } = useAuth();

  const [refId, setRefId] = useState(initialTrackId || '');
  const [verifyPhone, setVerifyPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');
  const [needsPhoneVerification, setNeedsPhoneVerification] = useState(false);
  const [slipModalComplaint, setSlipModalComplaint] = useState(null);

  // If initialTrackId is passed, automatically look it up
  useEffect(() => {
    if (initialTrackId) {
      setRefId(initialTrackId);
      performSearch(initialTrackId);
    }
  }, [initialTrackId]);

  const performSearch = async (searchId, phoneCheck = '') => {
    const cleanId = (searchId || refId).trim().toUpperCase();
    if (!cleanId) return;

    setError('');
    setLoading(true);

    try {
      const data = await getComplaintByRef(cleanId);
      if (!data) {
        setError(t('track.notFound'));
        setComplaint(null);
        setNeedsPhoneVerification(false);
        return;
      }

      // Privacy Check:
      // Admins can view any complaint.
      // If user is logged in and phone matches, allow immediately.
      // If user is guest or phone doesn't match logged in user, require entering the registered phone number to prevent unauthorized snooping!
      const userPhone = currentUser?.phoneNumber ? currentUser.phoneNumber.replace(/\D/g, '').slice(-10) : '';
      const complaintPhone = (data.citizenPhone || '').replace(/\D/g, '').slice(-10);
      const passedPhone = phoneCheck.replace(/\D/g, '').slice(-10);

      if (isAdmin) {
        setComplaint(data);
        setNeedsPhoneVerification(false);
      } else if (currentUser && userPhone === complaintPhone) {
        setComplaint(data);
        setNeedsPhoneVerification(false);
      } else if (passedPhone && passedPhone === complaintPhone) {
        setComplaint(data);
        setNeedsPhoneVerification(false);
      } else {
        // Must verify phone number to see full complaint
        setNeedsPhoneVerification(true);
        setComplaint(null);
      }
    } catch (err) {
      setError(err.message || 'Lookup failed.');
      setComplaint(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(refId, verifyPhone);
  };

  const handlePhoneVerifySubmit = (e) => {
    e.preventDefault();
    performSearch(refId, verifyPhone);
  };

  const timelineSteps = [
    { key: 'submitted', label: language === 'ta' ? 'சமர்ப்பிக்கப்பட்டது' : 'Submitted' },
    { key: 'under_review', label: language === 'ta' ? 'பரிசீலனையில்' : 'Under Review' },
    { key: 'in_progress', label: language === 'ta' ? 'செயல்பாட்டில்' : 'In Progress' },
    { key: 'resolved', label: language === 'ta' ? 'தீர்க்கப்பட்டது' : 'Resolved' }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'submitted': return 0;
      case 'under_review': return 1;
      case 'in_progress': return 2;
      case 'resolved':
      case 'closed': return 3;
      default: return 0;
    }
  };

  const currentStepIdx = complaint ? getStepIndex(complaint.status) : 0;
  const categoryObj = complaint ? COMPLAINT_CATEGORIES.find(c => c.id === complaint.category) : null;
  const categoryLabel = categoryObj ? categoryObj[language] : complaint?.category;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-tvk-gold-100 text-tvk-maroon-950 border border-tvk-gold-300">
          <Search className="w-3.5 h-3.5 text-tvk-gold-600" />
          <span>{t('track.title')}</span>
        </span>
        <h1 className="text-3xl font-black text-slate-900">
          {t('track.title')}
        </h1>
        <p className="text-sm text-slate-600">
          {t('track.subtitle')}
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              {t('track.enterRef')}
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={refId}
                  onChange={(e) => setRefId(e.target.value.toUpperCase())}
                  placeholder={t('track.refPlaceholder')}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm font-mono tracking-wider outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading || !refId.trim()}
                className="py-3 px-6 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white font-bold rounded-xl shadow-md transition-all text-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-tvk-gold-400" />
                <span>{t('track.searchBtn')}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Error Card */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Privacy Ownership Verification Card */}
      {needsPhoneVerification && (
        <div className="bg-amber-50/80 border-2 border-tvk-gold-400 rounded-3xl p-6 sm:p-8 space-y-4 animate-fadeIn">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-tvk-maroon-900 text-tvk-gold-400 flex items-center justify-center flex-shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-tvk-maroon-950">
                {language === 'ta' ? 'பாதுகாப்பு & தனிநபர் உரிமை சரிபார்ப்பு' : 'Citizen Privacy & Security Check'}
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed mt-1">
                {t('track.privacyWarning')}
              </p>
            </div>
          </div>

          <form onSubmit={handlePhoneVerifySubmit} className="pt-2 max-w-md space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t('track.enterPhone')}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-semibold text-xs text-slate-400">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={verifyPhone}
                  onChange={(e) => setVerifyPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder={t('track.phonePlaceholder')}
                  className="w-full pl-12 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 text-slate-900 text-sm font-mono outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
              >
                {language === 'ta' ? 'சரிபார்க்கவும்' : 'Verify'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Complaint Details Card */}
      {complaint && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden space-y-6">
          
          {/* Card Top Banner */}
          <div className="bg-gradient-to-r from-tvk-maroon-950 via-tvk-maroon-900 to-tvk-maroon-950 p-6 text-white flex flex-wrap items-center justify-between gap-4 border-b-2 border-tvk-gold-400">
            <div>
              <span className="text-xs text-tvk-gold-300 uppercase tracking-widest font-mono">
                {language === 'ta' ? 'மனு குறிப்பு எண்' : 'Grievance Reference Number'}
              </span>
              <h2 className="text-2xl font-black font-mono tracking-wider text-white">
                {complaint.id}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge status={complaint.status} size="lg" />
              <button
                onClick={() => setSlipModalComplaint(complaint)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-tvk-gold-300 transition-colors"
                title="Print Official Slip"
              >
                <Printer className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            
            {/* Step-by-Step Progress Timeline */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t('track.timelineTitle')}
              </h3>

              <div className="relative">
                {/* Horizontal line */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0 hidden sm:block" />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
                  {timelineSteps.map((step, idx) => {
                    const isPassed = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;

                    return (
                      <div key={step.key} className="flex flex-col items-center text-center space-y-2">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-md ${
                            isCurrent
                              ? 'bg-tvk-gold-400 text-tvk-maroon-950 ring-4 ring-tvk-gold-200'
                              : isPassed
                              ? 'bg-tvk-maroon-900 text-white'
                              : 'bg-white border-2 border-slate-300 text-slate-400'
                          }`}
                        >
                          {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                        </div>
                        <span
                          className={`text-xs font-bold ${
                            isCurrent
                              ? 'text-tvk-maroon-900'
                              : isPassed
                              ? 'text-slate-800'
                              : 'text-slate-400'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <div className="space-y-1">
                <span className="text-slate-500 font-semibold">{t('track.category')}:</span>
                <p className="font-bold text-slate-900 text-sm">{categoryLabel}</p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold">{t('track.filedOn')}:</span>
                <p className="font-bold text-slate-900 text-sm">
                  {new Date(complaint.submittedAt).toLocaleString(language === 'ta' ? 'ta-IN' : 'en-IN')}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold">{t('track.location')}:</span>
                <p className="font-bold text-slate-900 text-sm flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-tvk-maroon-800" />
                  <span>{complaint.location}</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 font-semibold">{t('track.officerAssigned')}:</span>
                <p className="font-bold text-slate-900 text-sm flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{complaint.assignedOfficer || 'Under Allocation'}</span>
                </p>
              </div>
            </div>

            {/* Subject and Full Description */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900">
                {complaint.subject}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                {complaint.description}
              </p>
            </div>

            {/* Public Authorized Updates History */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-tvk-maroon-800" />
                <span>{t('track.publicUpdates')}</span>
              </h4>

              {complaint.publicUpdates && complaint.publicUpdates.length > 0 ? (
                <div className="space-y-3">
                  {complaint.publicUpdates.map((update, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-amber-50/50 border border-tvk-gold-200/60 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="font-bold text-tvk-maroon-900">
                          {update.author}
                        </span>
                        <span>{new Date(update.date).toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed font-medium">
                        {update.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500 text-center">
                  {t('track.noUpdatesYet')}
                </div>
              )}
            </div>

          </div>

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

