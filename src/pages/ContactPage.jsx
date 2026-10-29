import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitCitizenEnquiry } from '../services/dataService';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  ShieldCheck,
  PhoneCall,
  Loader2
} from 'lucide-react';

export const ContactPage = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError(language === 'ta' ? 'அனைத்து விவரங்களையும் நிரப்பவும்' : 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await submitCitizenEnquiry(formData);
      setSubmitted(true);
      setFormData({ name: '', phone: '', message: '' });
    } catch (err) {
      setError(err.message || 'Error submitting message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-tvk-maroon-50 text-tvk-maroon-900 border border-tvk-maroon-200">
          <Building className="w-3.5 h-3.5 text-tvk-gold-500" />
          <span>{t('contact.title')}</span>
        </span>
        <h1 className="text-3xl font-black text-slate-900">
          {t('contact.title')}
        </h1>
        <p className="text-sm text-slate-600">
          {t('contact.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Office Details */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-black text-slate-900 border-b pb-4">
              {t('contact.officeAddress')}
            </h2>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-tvk-maroon-50 text-tvk-maroon-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    {language === 'ta' ? 'அலுவலக முகவரி' : 'Physical Address'}
                  </span>
                  <p className="font-semibold text-slate-900 mt-0.5 leading-relaxed">
                    {t('contact.addressVal')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-tvk-gold-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    {t('contact.timings')}
                  </span>
                  <p className="font-semibold text-slate-900 mt-0.5">
                    {t('contact.timingsVal')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    {t('contact.phones')}
                  </span>
                  <p className="font-mono font-semibold text-slate-900 mt-0.5">
                    {t('contact.phonesVal')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    {t('contact.email')}
                  </span>
                  <p className="font-mono text-xs text-slate-900 mt-0.5 font-semibold">
                    {t('contact.emailVal')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Helplines Card */}
          <div className="bg-tvk-maroon-950 text-white rounded-3xl p-6 sm:p-8 border border-tvk-gold-400/40 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-tvk-gold-400" />
              <h3 className="font-black text-lg text-white">
                {t('contact.emergencyHeading')}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-tvk-maroon-900 rounded-xl border border-tvk-maroon-800">
                <span className="text-slate-400 block">{language === 'ta' ? 'ஆம்புலன்ஸ்' : 'Ambulance'}</span>
                <span className="text-xl font-mono font-bold text-tvk-gold-300">108</span>
              </div>
              <div className="p-3 bg-tvk-maroon-900 rounded-xl border border-tvk-maroon-800">
                <span className="text-slate-400 block">{language === 'ta' ? 'காவல்துறை' : 'Police'}</span>
                <span className="text-xl font-mono font-bold text-tvk-gold-300">100</span>
              </div>
              <div className="p-3 bg-tvk-maroon-900 rounded-xl border border-tvk-maroon-800">
                <span className="text-slate-400 block">{language === 'ta' ? 'தீயணைப்பு' : 'Fire'}</span>
                <span className="text-xl font-mono font-bold text-tvk-gold-300">101</span>
              </div>
              <div className="p-3 bg-tvk-maroon-900 rounded-xl border border-tvk-maroon-800">
                <span className="text-slate-400 block">{language === 'ta' ? 'மகளிர் உதவி' : 'Women Help'}</span>
                <span className="text-xl font-mono font-bold text-tvk-gold-300">1091</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Citizen Enquiry Form & Interactive Map */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-black text-slate-900 border-b pb-4">
              {t('contact.enquiryFormTitle')}
            </h2>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-950">
                  {language === 'ta' ? 'செய்தி அனுப்பப்பட்டது!' : 'Message Received!'}
                </h3>
                <p className="text-xs text-emerald-800">
                  {t('contact.enquirySuccess')}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-emerald-700 underline"
                >
                  {language === 'ta' ? 'மற்றொரு செய்தி அனுப்ப' : 'Send another'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t('contact.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm font-mono outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t('contact.message')}
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm outline-none leading-relaxed"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-tvk-gold-400" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-tvk-gold-400" />
                      <span>{t('contact.sendEnquiry')}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Interactive Map Embed */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-tvk-maroon-800" />
              <span>{language === 'ta' ? 'அலுவலக அமைவிடம் (Google Maps)' : 'Verified Office Location'}</span>
            </h3>
            
            <div className="h-56 rounded-2xl overflow-hidden bg-slate-100 border relative">
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62446.40149021669!2d79.51656891696045!3d12.022359287313883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a535fdb1887e149%3A0x6bfe7c0411ec59ef!2sVikravandi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

