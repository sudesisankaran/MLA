import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Phone, KeyRound, ShieldAlert, CheckCircle, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { sendPhoneOtp, verifyOtp, loginAsAdmin, confirmationResult } = useAuth();
  const { language, t } = useLanguage();

  const [activeTab, setActiveTab] = useState('citizen'); // 'citizen' | 'staff'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [staffKey, setStaffKey] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Handle countdown timer for OTP resend
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  if (!isOpen) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    const clean = phoneNumber.replace(/\D/g, '');
    if (clean.length !== 10 || !/^[6-9]\d{9}$/.test(clean)) {
      setError(
        language === 'ta'
          ? 'தயவுசெய்து சரியான 10 இலக்க இந்திய கைபேசி எண்ணை உள்ளிடவும் (6-9ல் தொடங்கும்).'
          : 'Please enter a valid 10-digit Indian mobile number starting with 6-9.'
      );
      return;
    }

    setLoading(true);
    try {
      await sendPhoneOtp(clean);
      setStep('otp');
      setCountdown(30);
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length < 6) {
      setError(language === 'ta' ? '6 இலக்க OTP குறியீட்டை உள்ளிடவும்' : 'Enter 6-digit OTP code');
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(otp);
      onClose();
    } catch (err) {
      setError(err.message || 'Invalid OTP code. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const handleStaffLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!staffKey.trim()) {
      setError(language === 'ta' ? 'ஊழியர் கடவுச்சொல்லை உள்ளிடவும்' : 'Please enter staff access key');
      return;
    }

    setLoading(true);
    try {
      await loginAsAdmin(staffKey);
      onClose();
    } catch (err) {
      setError(err.message || 'Staff key authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep('phone');
    setOtp('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-tvk-gold-300">
        
        {/* Header with TVK Color */}
        <div className="bg-gradient-to-r from-tvk-maroon-900 via-tvk-maroon-800 to-tvk-maroon-900 p-5 text-white flex items-center justify-between border-b-2 border-tvk-gold-400">
          <div>
            <h3 className="font-bold text-lg">
              {activeTab === 'citizen'
                ? (language === 'ta' ? 'பொதுமக்கள் உள்நுழைவு' : 'Citizen Authentication')
                : (language === 'ta' ? 'அலுவலக ஊழியர் உள்நுழைவு' : 'Staff Redressal Console')}
            </h3>
            <p className="text-xs text-tvk-gold-200 mt-0.5">
              {language === 'ta' ? 'பாதுகாப்பான மற்றும் விரைவான சேவை' : 'Secure OTP & Role Verification'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b bg-slate-50">
          <button
            type="button"
            onClick={() => { setActiveTab('citizen'); resetForm(); }}
            className={`flex-1 py-3 text-sm font-semibold text-center border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'citizen'
                ? 'border-tvk-maroon-800 text-tvk-maroon-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Phone className="w-4 h-4 text-tvk-maroon-800" />
            {language === 'ta' ? 'பொதுமக்கள்' : 'Citizen'}
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('staff'); resetForm(); }}
            className={`flex-1 py-3 text-sm font-semibold text-center border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'staff'
                ? 'border-tvk-maroon-800 text-tvk-maroon-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <KeyRound className="w-4 h-4 text-tvk-gold-600" />
            {language === 'ta' ? 'அலுவலக ஊழியர்' : 'MLA Staff'}
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {activeTab === 'citizen' ? (
            step === 'phone' ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    {language === 'ta' ? 'கைபேசி எண்' : 'Indian Mobile Number'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-semibold text-sm text-slate-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="9876543210"
                      className="w-full pl-14 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm font-medium tracking-wide outline-none transition-all"
                      required
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {language === 'ta'
                      ? 'உங்கள் கைபேசிக்கு பாதுகாப்பான 6 இலக்க OTP அனுப்பப்படும்.'
                      : 'We will send a 6-digit verification code to this mobile number.'}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || phoneNumber.length !== 10}
                  className="w-full py-2.5 px-4 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white font-semibold rounded-xl text-sm transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-tvk-gold-400" />
                  ) : (
                    <>
                      <span>{language === 'ta' ? 'OTP அனுப்புக' : 'Send Verification OTP'}</span>
                      <ArrowRight className="w-4 h-4 text-tvk-gold-400" />
                    </>
                  )}
                </button>

                <div className="pt-2 text-center border-t">
                  <p className="text-xs text-slate-600">
                    {language === 'ta' ? 'புதிய பயனரா?' : 'New citizen user?'}{' '}
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        if (onSwitchToRegister) onSwitchToRegister();
                      }}
                      className="text-tvk-maroon-800 font-bold hover:underline"
                    >
                      {language === 'ta' ? 'இங்கு பதிவு செய்க' : 'Register Here'}
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      {language === 'ta' ? 'OTP சரிபார்ப்புக் குறியீடு' : '6-Digit OTP Code'}
                    </label>
                    <button
                      type="button"
                      onClick={() => resetForm()}
                      className="text-xs text-tvk-maroon-800 font-semibold hover:underline"
                    >
                      {language === 'ta' ? 'எண் மாற்ற' : 'Change Number'}
                    </button>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full text-center text-2xl font-mono tracking-[0.4em] py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 outline-none"
                    autoFocus
                    required
                  />
                  <div className="flex justify-between items-center text-xs mt-2 text-slate-500">
                    <span>
                      {countdown > 0 ? (
                        `${language === 'ta' ? 'மீண்டும் அனுப்ப' : 'Resend in'}: ${countdown}s`
                      ) : (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="text-tvk-maroon-800 font-semibold hover:underline"
                        >
                          {language === 'ta' ? 'OTP மீண்டும் அனுப்புக' : 'Resend OTP'}
                        </button>
                      )}
                    </span>
                    <span className="font-mono text-slate-600">+91 {phoneNumber}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="w-full py-2.5 px-4 bg-tvk-maroon-900 hover:bg-tvk-maroon-800 text-white font-semibold rounded-xl text-sm transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-tvk-gold-400" />
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-tvk-gold-400" />
                      <span>{language === 'ta' ? 'உள்நுழைக' : 'Verify & Enter'}</span>
                    </>
                  )}
                </button>
              </form>
            )
          ) : (
            <form onSubmit={handleStaffLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  {language === 'ta' ? 'அலுவலக ஊழியர் கடவுச்சொல் / Access PIN' : 'Staff Access Key / Master PIN'}
                </label>
                <input
                  type="password"
                  value={staffKey}
                  onChange={(e) => setStaffKey(e.target.value)}
                  placeholder="e.g. TVK-STAFF-2026"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-tvk-maroon-800 focus:bg-white text-slate-900 text-sm font-mono tracking-wider outline-none"
                  required
                />
                <p className="text-[11px] text-slate-500 mt-1.5">
                  {language === 'ta'
                    ? 'தொகுதி மக்கள் தொடர்பு அலுவலர் மற்றும் குறைதீர்ப்பு மேற்பார்வையாளர்களுக்கு மட்டுமே.'
                    : 'Restricted for authorized MLA Secretariat officers only.'}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !staffKey}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-tvk-maroon-900 to-tvk-maroon-800 hover:from-black hover:to-tvk-maroon-900 text-white font-semibold rounded-xl text-sm transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-tvk-gold-400" />
                ) : (
                  <>
                    <KeyRound className="w-4 h-4 text-tvk-gold-400" />
                    <span>{language === 'ta' ? 'நிர்வாகி தளத்தில் நுழைக' : 'Authenticate Staff'}</span>
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

