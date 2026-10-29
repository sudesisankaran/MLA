import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { GrievancePage } from './pages/GrievancePage';
import { TrackComplaintPage } from './pages/TrackComplaintPage';
import { NewsEventsPage } from './pages/NewsEventsPage';
import { DevelopmentWorksPage } from './pages/DevelopmentWorksPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [targetTrackId, setTargetTrackId] = useState('');

  const handleOpenAuth = () => {
    setAuthModalOpen(true);
  };

  const handleOpenRegister = () => {
    setActivePage('register');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackId = (refId) => {
    setTargetTrackId(refId);
    setActivePage('track');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenAuth={handleOpenAuth}
        onOpenRegister={handleOpenRegister}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            setActivePage={setActivePage}
            onOpenRegister={handleOpenRegister}
            onOpenAuth={handleOpenAuth}
            onTrackId={handleTrackId}
          />
        )}

        {activePage === 'about' && (
          <AboutPage setActivePage={setActivePage} />
        )}

        {activePage === 'grievance' && (
          <GrievancePage
            setActivePage={setActivePage}
            onOpenAuth={handleOpenAuth}
            onOpenRegister={handleOpenRegister}
            onTrackId={handleTrackId}
          />
        )}

        {activePage === 'track' && (
          <TrackComplaintPage
            initialTrackId={targetTrackId}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activePage === 'news' && (
          <NewsEventsPage />
        )}

        {activePage === 'projects' && (
          <DevelopmentWorksPage />
        )}

        {activePage === 'gallery' && (
          <GalleryPage />
        )}

        {activePage === 'contact' && (
          <ContactPage />
        )}

        {activePage === 'register' && (
          <RegisterPage
            setActivePage={setActivePage}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {activePage === 'admin' && (
          <AdminDashboardPage
            onOpenAuth={handleOpenAuth}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActivePage={setActivePage}
        onOpenAuth={handleOpenAuth}
      />

      {/* Auth Modal (Phone OTP / Staff Login) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSwitchToRegister={handleOpenRegister}
      />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
