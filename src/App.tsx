/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { CrisisBanner } from './components/common/CrisisBanner';
import { PositiveVibeChatbot } from './components/common/PositiveVibeChatbot';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { AboutPage } from './pages/public/AboutPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { ProfessionalSupportInfoPage } from './pages/public/ProfessionalSupportInfoPage';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';
import { ForgotPasswordPage } from './pages/public/ForgotPasswordPage';

// User Dashboard Pages
import { UserDashboardPage } from './pages/dashboard/UserDashboardPage';
import { EmotionDetectionHubPage } from './pages/dashboard/EmotionDetectionHubPage';
import { TextEmotionPage } from './pages/dashboard/TextEmotionPage';
import { VoiceEmotionPage } from './pages/dashboard/VoiceEmotionPage';
import { FacialEmotionPage } from './pages/dashboard/FacialEmotionPage';
import { MultimodalFusionPage } from './pages/dashboard/MultimodalFusionPage';
import { MoodTrackerPage } from './pages/dashboard/MoodTrackerPage';
import { EmotionalJournalPage } from './pages/dashboard/EmotionalJournalPage';
import { ManoAssistantPage } from './pages/dashboard/ManoAssistantPage';
import { StressManagementPage } from './pages/dashboard/StressManagementPage';
import { MindfulnessPage } from './pages/dashboard/MindfulnessPage';
import { StudentWellnessPage } from './pages/dashboard/StudentWellnessPage';
import { PersonalizedInsightsPage } from './pages/dashboard/PersonalizedInsightsPage';
import { ProfessionalDirectoryPage } from './pages/dashboard/ProfessionalDirectoryPage';
import { AppointmentsPage } from './pages/dashboard/AppointmentsPage';
import { CommunityPage } from './pages/dashboard/CommunityPage';
import { UserProfilePage } from './pages/dashboard/UserProfilePage';
import { PrivacySettingsPage } from './pages/dashboard/PrivacySettingsPage';
import { CrisisSupportPage } from './pages/dashboard/CrisisSupportPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ProfessionalVerificationPage } from './pages/admin/ProfessionalVerificationPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { CommunityModerationPage } from './pages/admin/CommunityModerationPage';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#15161E] text-[#292A35] dark:text-[#FAF9F6] transition-colors">
      <CrisisBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] dark:bg-[#15161E] text-[#292A35] dark:text-[#FAF9F6] transition-colors">
      <CrisisBanner />
      <Navbar />
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/professionals-info" element={<ProfessionalSupportInfoPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/crisis" element={<CrisisSupportPage />} />
            </Route>

            {/* Authenticated User Workspace Routes - Protected */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<UserDashboardPage />} />
              <Route path="emotions" element={<EmotionDetectionHubPage />} />
              <Route path="emotions/text" element={<TextEmotionPage />} />
              <Route path="emotions/voice" element={<VoiceEmotionPage />} />
              <Route path="emotions/facial" element={<FacialEmotionPage />} />
              <Route path="emotions/fusion" element={<MultimodalFusionPage />} />
              <Route path="mood" element={<MoodTrackerPage />} />
              <Route path="journal" element={<EmotionalJournalPage />} />
              <Route path="assistant" element={<ManoAssistantPage />} />
              <Route path="stress" element={<StressManagementPage />} />
              <Route path="mindfulness" element={<MindfulnessPage />} />
              <Route path="academics" element={<StudentWellnessPage />} />
              <Route path="insights" element={<PersonalizedInsightsPage />} />
              <Route path="professionals" element={<ProfessionalDirectoryPage />} />
              <Route path="appointments" element={<AppointmentsPage />} />
              <Route path="community" element={<CommunityPage />} />
              <Route path="profile" element={<UserProfilePage />} />
              <Route path="settings" element={<PrivacySettingsPage />} />
            </Route>

            {/* Admin Console Routes - Protected with Admin Role */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="verifications" element={<ProfessionalVerificationPage />} />
              <Route path="users" element={<UserManagementPage />} />
              <Route path="moderation" element={<CommunityModerationPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <PositiveVibeChatbot />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
