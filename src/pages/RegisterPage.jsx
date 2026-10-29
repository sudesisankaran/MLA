import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { TN_DISTRICTS, CONSTITUENCIES_BY_DISTRICT } from '../data/tnDistricts';
import {
  User,
  Phone,
  MapPin,
  Building,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  FileCheck
} from 'lucide-react';

export const RegisterPage = ({ setActivePage, onOpenAuth }) => {
  const { language, t } = useLanguage();
  const { sendPhoneOtp, verifyOtp } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    district: 'Viluppuram',
    constituency: 'Vikravandi',
    address: '',
    pincode: '',
    privacyConsent: false
  });

  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('details'); // 'details' | 'otp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  const availableConstituencies = CONSTITUENCIES_BY_DISTRICT[formData.district] || ['Vikravandi', 'Viluppuram', 'Tindivanam'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    const constituencies = CONSTITUENCIES_BY_DISTRICT[district] || ['Main Constituency'];
    setFormData(prev => ({
      ...prev,
      district,
      constituency: constituencies[0] || 'Main Constituency'
    }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.fullName.trim()) {
      setError(language === 'ta' ? 'முழு பெயரை உள்ளிடவும்' : 'Please enter full name');
      return;
    }

    const cleanPhone = formData.mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError(
        language === 'ta'
          ? 'சரியான 10 இலக்க இந்திய கைபேசி எண்ணை உள்ளிடவும் (6-9ல் தொடங்க வேண்டும்).'
          : 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.'
      );
      return;
    }

    if (!formData.address.trim()) {
      setError(language === 'ta' ? 'முகவரியை உள்ளிடவும்' : 'Please enter complete address');
      return;
    }

    if (!formData.privacyConsent) {
      setError(
        language === 'ta'
          ? 'குறைதீர்ப்பு பயன்பாட்டிற்கான தகவல் சம்மத பெட்டியை தேர்ந்தெடுக்கவும்.'
          : 'Please accept the privacy consent checkbox to proceed.'
      );
      return;
    }

    setLoading(true);
    try {
      await sendPhoneOtp(cleanPhone);
      setStep('otp');
      setCountdown(30);
    } catch (err) {
      setError(err.message || 'Failed to dispatch OTP. Please check network.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length < 6) {
      setError(language === 'ta' ? '6 இலக்க OTP குறியீட்டை உள்ளிடவும்' : 'Enter 6-digit OTP code');
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(otp, {
        fullName: formData.fullName.trim(),
        district: formData.district,
        constituency: formData.constituency,
        address: formData.address.trim(),
        pincode: formData.pincode.trim()
      });

      alert(t('reg.successMsg'));
      setActivePage('grievance');
    } catch (err) {
      setError(err.message || 'OTP verification failed. Please check the code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* TVK Gradient Ribbon */}
        <div className="h-2 w-full tvk-gradient-bar" />

        {/* Top Header */}
        <div className="bg-gradient-to-r from-tvk-maroon-900 via-tvk-maroon-800 to-tvk-maroon-900 p-8 text-white text-center">
          <div className="w-12 h-12 rounded-2xl bg-tvk-gold-400 text-tvk-maroon-950 flex items-center justify-center mx-auto mb-3 shadow-md font-black">
            <User className="w-6 h-6 text-tvk-maroon-950" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {t('reg.title')}
          </h1>
          <p className="text-xs sm:text-sm text-tvk-gold-200 mt-1.5 max-w-lg mx-auto">
            {t('reg.subtitle')}
          </p>
        </div>

        <div className="p-6 sm:p-10">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {step === 'details' ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('reg.fullName')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={t('reg.namePlaceholder')}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('reg.mobile')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-semibold text-sm text-slate-500">
                    +91
                  </span>
                  <input
                    type="tel"
                    name="mobileNumber"
                    maxLength={10}
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder={t('reg.mobilePlaceholder')}
                    className="w-full pl-14 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm font-medium tracking-wide outline-none transition-all font-mono"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {language === 'ta'
                    ? '10 இலக்க இந்திய கைபேசி எண் (OTP சரிபார்ப்பு மூலம் உறுதி செய்யப்படும்)'
                    : '10-digit Indian phone number will be verified with a secure OTP.'}
                </p>
              </div>

              {/* District & Constituency */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t('reg.district')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleDistrictChange}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm outline-none"
                  >
                    {TN_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {t('reg.constituency')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="constituency"
                    value={formData.constituency}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm outline-none"
                  >
                    {availableConstituencies.map((con) => (
                      <option key={con} value={con}>
                        {con}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('reg.address')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <textarea
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={t('reg.addressPlaceholder')}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {t('reg.pincode')}
                </label>
                <input
                  type="text"
                  name="pincode"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder={t('reg.pincodePlaceholder')}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm font-mono outline-none"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacyConsent"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleChange}
                  className="w-4 h-4 mt-1 rounded text-tvk-maroon-900 focus:ring-tvk-maroon-800 border-slate-300"
                  required
                />
                <label htmlFor="privacyConsent" className="text-xs text-slate-700 leading-relaxed cursor-pointer select-none">
                  {t('reg.consentText')}
                </label>
              </div>

              {/* Submit / Send OTP button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-tvk-gold-400" />
                ) : (
                  <>
                    <span>{t('reg.sendOtp')}</span>
                    <ArrowRight className="w-5 h-5 text-tvk-gold-400" />
                  </>
                )}
              </button>

              <div className="text-center pt-2 border-t">
                <p className="text-xs text-slate-600">
                  {t('reg.alreadyRegistered')}{' '}
                  <button
                    type="button"
                    onClick={onOpenAuth}
                    className="text-tvk-maroon-800 font-bold hover:underline"
                  >
                    {t('reg.loginHere')}
                  </button>
                </p>
              </div>

            </form>
          ) : (
            <form onSubmit={handleVerifyAndRegister} className="space-y-6 max-w-md mx-auto text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-tvk-gold-100 text-tvk-maroon-900 mx-auto flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6 text-tvk-maroon-900" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {t('reg.otpSentMessage')}
                </h3>
                <p className="text-xs font-mono text-slate-600">
                  +91 {formData.mobileNumber}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder={t('reg.otpPlaceholder')}
                  className="w-full text-center text-3xl font-mono tracking-[0.4em] py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 outline-none"
                  autoFocus
                  required
                />
              </div>

              <div className="flex justify-between items-center text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-tvk-maroon-800 font-semibold hover:underline"
                >
                  {language === 'ta' ? '← விவரங்களை திருத்த' : '← Edit Details'}
                </button>
                <span>
                  {countdown > 0 ? (
                    `${countdown}s`
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-tvk-maroon-800 font-semibold hover:underline"
                    >
                      {t('reg.resendOtp')}
                    </button>
                  )}
                </span>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full py-3 px-6 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-tvk-gold-400" />
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 text-tvk-gold-400" />
                    <span>{t('reg.submitBtn')}</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};

