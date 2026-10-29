import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { COMPLAINT_CATEGORIES } from '../data/tnDistricts';
import { Printer, X, CheckCircle, ShieldCheck, Download, Share2 } from 'lucide-react';

export const ComplaintSlipModal = ({ complaint, onClose }) => {
  const { language, t } = useLanguage();
  const printRef = useRef();

  if (!complaint) return null;

  const categoryObj = COMPLAINT_CATEGORIES.find(c => c.id === complaint.category);
  const categoryLabel = categoryObj ? categoryObj[language] : complaint.category;

  const handlePrint = () => {
    window.print();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(complaint.id);
    alert(language === 'ta' ? 'புகார் எண் நகலெடுக்கப்பட்டது!' : 'Reference ID copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-tvk-gold-300">
        
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-tvk-maroon-900 via-tvk-maroon-800 to-tvk-maroon-900 px-6 py-4 flex items-center justify-between text-white border-b-2 border-tvk-gold-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-tvk-gold-400" />
            <h3 className="font-semibold text-lg">
              {language === 'ta' ? 'அதிகாரப்பூர்வ புகார் ஒப்புதல் சீட்டு' : 'Official Grievance Acknowledgment'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Area */}
        <div ref={printRef} className="p-6 space-y-5 bg-white text-slate-900 printable-receipt">
          {/* Header with TVK Color Crest */}
          <div className="text-center border-b pb-4">
            <div className="inline-block p-1 bg-gradient-to-r from-tvk-maroon-800 to-tvk-gold-500 rounded-xl mb-2">
              <div className="bg-white px-3 py-1 rounded-lg">
                <span className="font-bold text-xs tracking-wider text-tvk-maroon-900 uppercase">
                  {language === 'ta' ? 'விக்கிரவாண்டி சட்டமன்ற தொகுதி' : 'Vikravandi Legislative Constituency'}
                </span>
              </div>
            </div>
            <h2 className="text-xl font-extrabold text-tvk-maroon-900">
              {language === 'ta' ? 'மக்கள் குறைதீர்ப்பு மையம்' : 'Citizen Grievance Redressal Center'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'ta' ? 'சட்டமன்ற உறுப்பினர் மக்கள் தொடர்பு அலுவலகம்' : 'MLA Constituency Public Secretariat'}
            </p>
          </div>

          {/* Reference Badge */}
          <div className="bg-amber-50/70 border border-tvk-gold-300 rounded-xl p-4 text-center">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
              {language === 'ta' ? 'புகார் குறிப்பு எண் (Reference ID)' : 'Grievance Reference Number'}
            </span>
            <div className="text-2xl font-black text-tvk-maroon-900 tracking-wider my-1 font-mono">
              {complaint.id}
            </div>
            <span className="text-xs text-slate-500">
              {language === 'ta' ? 'இந்த எண்ணை சேமித்து வைக்கவும்' : 'Keep this number safe for live status tracking'}
            </span>
          </div>

          {/* Details Table */}
          <div className="text-sm divide-y border rounded-xl overflow-hidden bg-slate-50/50">
            <div className="grid grid-cols-3 p-2.5">
              <span className="text-slate-500 font-medium">{language === 'ta' ? 'மனுதாரர்:' : 'Citizen Name:'}</span>
              <span className="col-span-2 font-semibold text-slate-800">{complaint.citizenName}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5">
              <span className="text-slate-500 font-medium">{language === 'ta' ? 'கைபேசி எண்:' : 'Mobile Phone:'}</span>
              <span className="col-span-2 font-mono font-medium text-slate-800">+91 {complaint.citizenPhone}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5">
              <span className="text-slate-500 font-medium">{language === 'ta' ? 'புகார் பிரிவு:' : 'Category:'}</span>
              <span className="col-span-2 font-medium text-slate-800">{categoryLabel}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5">
              <span className="text-slate-500 font-medium">{language === 'ta' ? 'தலைப்பு:' : 'Subject:'}</span>
              <span className="col-span-2 text-slate-800 font-medium">{complaint.subject}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5">
              <span className="text-slate-500 font-medium">{language === 'ta' ? 'இடம் / வார்டு:' : 'Location / Ward:'}</span>
              <span className="col-span-2 text-slate-800">{complaint.location}</span>
            </div>
            <div className="grid grid-cols-3 p-2.5">
              <span className="text-slate-500 font-medium">{language === 'ta' ? 'பதிவு தேதி:' : 'Filing Date:'}</span>
              <span className="col-span-2 text-slate-700">
                {new Date(complaint.submittedAt).toLocaleString(language === 'ta' ? 'ta-IN' : 'en-IN')}
              </span>
            </div>
          </div>

          {/* Verification Barcode Mock */}
          <div className="flex flex-col items-center justify-center pt-2">
            <div className="font-mono text-center tracking-[0.25em] text-xs text-slate-400 select-all">
              ||| | ||||| | ||| |||| | ||| | |||
            </div>
            <span className="text-[11px] text-slate-400 mt-1 font-mono">
              SECURITY HASH: {complaint.id}-VERIFIED
            </span>
          </div>
        </div>

        {/* Action Buttons (Excluded from Print) */}
        <div className="no-print bg-slate-50 px-6 py-4 border-t flex items-center justify-between gap-3">
          <button
            onClick={copyToClipboard}
            className="flex-1 px-4 py-2 border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-100 transition-colors text-sm flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            {language === 'ta' ? 'எண்ணை நகலெடு' : 'Copy ID'}
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-tvk-maroon-800 to-tvk-maroon-900 text-white rounded-xl font-medium hover:from-tvk-maroon-900 hover:to-black transition-all text-sm flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Printer className="w-4 h-4 text-tvk-gold-400" />
            {language === 'ta' ? 'சீட்டை அச்சிடு' : 'Print Slip'}
          </button>
        </div>

      </div>
    </div>
  );
};

