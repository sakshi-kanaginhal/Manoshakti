import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Shield, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith('/app') || location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 dark:bg-[#1E1F28]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single element wordmark */}
          <Link
            to={isAuthenticated ? "/app/dashboard" : "/"}
            className="text-xl font-bold tracking-tight text-[#292A35] dark:text-[#FAF9F6] font-display whitespace-nowrap shrink-0 flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] flex items-center justify-center text-white font-bold text-base shadow-sm">
              M
            </div>
            <span>ManoShakti</span>
          </Link>

          {/* Zone 2: 4–5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            {isAuthenticated ? (
              <>
                <Link
                  to="/app/dashboard"
                  className={`hover:text-[#8B7BE8] dark:hover:text-[#A9C7E8] transition-colors whitespace-nowrap shrink-0 ${
                    location.pathname === '/app/dashboard' ? 'text-[#8B7BE8] dark:text-[#A9C7E8] font-semibold' : ''
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/app/emotions"
                  className={`hover:text-[#8B7BE8] dark:hover:text-[#A9C7E8] transition-colors whitespace-nowrap shrink-0 ${
                    location.pathname.startsWith('/app/emotions') ? 'text-[#8B7BE8] dark:text-[#A9C7E8] font-semibold' : ''
                  }`}
                >
                  Emotion Hub
                </Link>
                <Link
                  to="/app/assistant"
                  className={`hover:text-[#8B7BE8] dark:hover:text-[#A9C7E8] transition-colors whitespace-nowrap shrink-0 ${
                    location.pathname === '/app/assistant' ? 'text-[#8B7BE8] dark:text-[#A9C7E8] font-semibold' : ''
                  }`}
                >
                  Mano AI
                </Link>
                <Link
                  to="/app/mindfulness"
                  className={`hover:text-[#8B7BE8] dark:hover:text-[#A9C7E8] transition-colors whitespace-nowrap shrink-0 ${
                    location.pathname === '/app/mindfulness' ? 'text-[#8B7BE8] dark:text-[#A9C7E8] font-semibold' : ''
                  }`}
                >
                  Mindfulness
                </Link>
                <Link
                  to="/app/academics"
                  className={`hover:text-[#8B7BE8] dark:hover:text-[#A9C7E8] transition-colors whitespace-nowrap shrink-0 ${
                    location.pathname === '/app/academics' ? 'text-[#8B7BE8] dark:text-[#A9C7E8] font-semibold' : ''
                  }`}
                >
                  Academics
                </Link>
                <Link
                  to="/app/professionals"
                  className={`hover:text-[#8B7BE8] dark:hover:text-[#A9C7E8] transition-colors whitespace-nowrap shrink-0 ${
                    location.pathname.startsWith('/app/professionals') ? 'text-[#8B7BE8] dark:text-[#A9C7E8] font-semibold' : ''
                  }`}
                >
                  Counselors
                </Link>
              </>
            ) : (
              <>
                <Link to="/about" className="hover:text-[#8B7BE8] dark:hover:text-[#A9C7E8] transition-colors whitespace-nowrap shrink-0">
                  About
                </Link>
                <Link to="/features" className="hover:text-[#8B7BE8] dark:hover:text-[#A9C7E8] transition-colors whitespace-nowrap shrink-0">
                  Features
                </Link>
                <Link to="/professionals-info" className="hover:text-[#8B7BE8] dark:hover:text-[#A9C7E8] transition-colors whitespace-nowrap shrink-0">
                  For Counselors
                </Link>
                <Link to="/crisis" className="hover:text-[#8B7BE8] dark:hover:text-[#A9C7E8] transition-colors whitespace-nowrap shrink-0">
                  Crisis Support
                </Link>
              </>
            )}
          </nav>

          {/* Zone 3: 1 primary action / user tools */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/app/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-[#8B7BE8] transition-colors"
                >
                  <UserCircle className="w-4 h-4 text-[#8B7BE8]" />
                  <span className="hidden sm:inline max-w-[120px] truncate">{user?.full_name || 'My Profile'}</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-[#8B7BE8] transition-colors whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#8B7BE8] hover:bg-[#7968db] rounded-lg shadow-sm transition-colors whitespace-nowrap"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/app/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                >
                  User Dashboard
                </Link>
                <Link
                  to="/app/emotions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                >
                  Emotion Detection Hub
                </Link>
                <Link
                  to="/app/assistant"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                >
                  Mano AI Companion
                </Link>
                <Link
                  to="/app/mindfulness"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                >
                  Mindfulness & Breathing
                </Link>
                <Link
                  to="/app/academics"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                >
                  Student Academic Wellness
                </Link>
                <Link
                  to="/app/professionals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                >
                  Counselor Directory
                </Link>
                <Link
                  to="/app/community"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                >
                  Peer Community
                </Link>
                <Link
                  to="/crisis"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-md"
                >
                  24/7 Crisis Support
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                >
                  About ManoShakti
                </Link>
                <Link
                  to="/features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                >
                  Platform Features
                </Link>
                <Link
                  to="/professionals-info"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                >
                  Professional Network
                </Link>
                <Link
                  to="/crisis"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-md"
                >
                  Crisis Support
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
