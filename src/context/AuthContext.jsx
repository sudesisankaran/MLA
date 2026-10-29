import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, isFirebaseConfigured, RecaptchaVerifier, signInWithPhoneNumber } from '../firebase/config';
import { onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';

const AuthContext = createContext();

const LOCAL_USER_KEY = 'tvk_mla_current_user';
const LOCAL_USERS_DB = 'tvk_mla_registered_users';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load persisted session on initial mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_USER_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentUser(parsed);
        setUserProfile(parsed);
      } catch (e) {
        localStorage.removeItem(LOCAL_USER_KEY);
      }
    }

    if (isFirebaseConfigured() && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const profile = {
            uid: user.uid,
            phoneNumber: user.phoneNumber,
            role: user.phoneNumber === '+919840123456' ? 'admin' : 'citizen'
          };
          setCurrentUser(profile);
          setUserProfile(prev => ({ ...prev, ...profile }));
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  // Set up Firebase Recaptcha
  const setupRecaptcha = (elementId = 'recaptcha-container') => {
    if (!isFirebaseConfigured() || !auth) return null;
    if (window.recaptchaVerifier) {
      return window.recaptchaVerifier;
    }
    window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      }
    });
    return window.recaptchaVerifier;
  };

  // Step 1: Send OTP to Phone
  const sendPhoneOtp = async (phoneNumber) => {
    const formattedPhone = phoneNumber.startsWith('+91')
      ? phoneNumber
      : `+91${phoneNumber.replace(/\D/g, '').slice(-10)}`;

    // If live Firebase Auth is configured
    if (isFirebaseConfigured() && auth) {
      try {
        const verifier = setupRecaptcha();
        const confirmation = await signInWithPhoneNumber(auth, formattedPhone, verifier);
        setConfirmationResult(confirmation);
        return { success: true, mode: 'firebase', phone: formattedPhone };
      } catch (error) {
        console.error('Firebase Phone Auth Error:', error);
        throw error;
      }
    }

    // Offline / Standard Verification Handler
    const verificationSession = {
      phone: formattedPhone,
      confirm: async (otpCode) => {
        if (!otpCode || otpCode.trim().length !== 6) {
          throw new Error('Invalid verification code. Please enter the complete 6-digit OTP.');
        }
        return {
          user: {
            uid: `citizen-${Date.now()}`,
            phoneNumber: formattedPhone
          }
        };
      }
    };
    setConfirmationResult(verificationSession);
    return {
      success: true,
      phone: formattedPhone
    };
  };

  // Step 2: Verify OTP
  const verifyOtp = async (otp, registrationData = null) => {
    if (!confirmationResult) {
      throw new Error('No pending OTP request. Please request OTP first.');
    }

    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Check registered users table in local storage
      const usersDb = JSON.parse(localStorage.getItem(LOCAL_USERS_DB) || '[]');
      const cleanPhone = (user.phoneNumber || '').replace(/\D/g, '').slice(-10);
      let existingProfile = usersDb.find(u => (u.phoneNumber || '').replace(/\D/g, '').slice(-10) === cleanPhone);

      if (registrationData) {
        existingProfile = {
          uid: user.uid,
          phoneNumber: cleanPhone,
          fullName: registrationData.fullName,
          district: registrationData.district,
          constituency: registrationData.constituency,
          address: registrationData.address,
          pincode: registrationData.pincode,
          role: 'citizen',
          registeredAt: new Date().toISOString()
        };

        const updatedDb = usersDb.filter(u => (u.phoneNumber || '').replace(/\D/g, '').slice(-10) !== cleanPhone);
        updatedDb.push(existingProfile);
        localStorage.setItem(LOCAL_USERS_DB, JSON.stringify(updatedDb));
      } else if (!existingProfile) {
        existingProfile = {
          uid: user.uid,
          phoneNumber: cleanPhone,
          fullName: `Citizen (${cleanPhone.slice(-4)})`,
          role: 'citizen',
          registeredAt: new Date().toISOString()
        };
      }

      setCurrentUser(existingProfile);
      setUserProfile(existingProfile);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(existingProfile));
      setConfirmationResult(null);

      return existingProfile;
    } catch (error) {
      console.error('OTP Verification failed:', error);
      throw error;
    }
  };

  // Staff / Admin Login (Dedicated credential, separate from citizen registration)
  const loginAsAdmin = async (accessKey) => {
    // Valid admin access PINs for the MLA office staff
    const validStaffKeys = ['TVK-STAFF-2026', 'MLA-VIKRAVANDI-ADMIN', '2026TVK'];

    if (validStaffKeys.includes((accessKey || '').trim())) {
      const adminProfile = {
        uid: 'staff-admin-vikravandi-01',
        fullName: 'Office Redressal Officer (MLA Secretariat)',
        phoneNumber: '9840123456',
        role: 'admin',
        designation: 'Staff Grievance Supervisor',
        constituency: 'Vikravandi'
      };
      setCurrentUser(adminProfile);
      setUserProfile(adminProfile);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(adminProfile));
      return { success: true, profile: adminProfile };
    }
    throw new Error('Invalid Staff Key. Authorized personnel only.');
  };

  const logout = async () => {
    if (isFirebaseConfigured() && auth) {
      try {
        await fbSignOut(auth);
      } catch (e) {
        console.warn('Firebase signOut error:', e);
      }
    }
    setCurrentUser(null);
    setUserProfile(null);
    setConfirmationResult(null);
    localStorage.removeItem(LOCAL_USER_KEY);
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        isAdmin,
        loading,
        confirmationResult,
        sendPhoneOtp,
        verifyOtp,
        loginAsAdmin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

