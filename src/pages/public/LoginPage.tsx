import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LogIn,
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle2,
  User,
  Stethoscope,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, quickDemoLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect target if intercepted by ProtectedRoute
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get('redirect') || '/app/dashboard';

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Status & Validation
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Restore remembered email if available
  useEffect(() => {
    const savedEmail = localStorage.getItem('manoshakti_remember_email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!validate()) {
      return;
    }

    setLoading(true);

    const result = await login(email.trim(), password, rememberMe);
    setLoading(false);

    if (!result.success || result.error) {
      setErrorMessage(
        result.error || 'Invalid email address or password. Please check your credentials.'
      );
      return;
    }

    setSuccessMessage('Authentication successful! Welcome back.');
    setTimeout(() => {
      navigate(redirectPath);
    }, 500);
  };

  const handleQuickDemo = async (role: UserRole) => {
    setLoading(true);
    setErrorMessage(null);
    try {
      await quickDemoLogin(role);
      navigate(role === 'admin' ? '/admin' : '/app/dashboard');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Quick demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16 space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-11 h-11 mx-auto rounded-xl bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] flex items-center justify-center text-white font-bold text-xl shadow-sm">
          M
        </div>
        <h1 className="text-2xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Sign in to ManoShakti
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Understand Your Emotions. Strengthen Your Mind.
        </p>
      </div>

      {/* 1-Click Evaluation Demo Bar */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            1-Click Demo Evaluation Sign-In
          </span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
            Instant Access
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickDemo('student')}
            disabled={loading}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#8B7BE8] hover:bg-[#8B7BE8]/5 text-xs text-slate-700 dark:text-slate-200 transition-colors cursor-pointer group"
          >
            <User className="w-4 h-4 text-[#8B7BE8] mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-[11px]">Student</span>
            <span className="text-[9px] text-slate-400">Sakshi Sharma</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('professional')}
            disabled={loading}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#70B8AA] hover:bg-[#70B8AA]/5 text-xs text-slate-700 dark:text-slate-200 transition-colors cursor-pointer group"
          >
            <Stethoscope className="w-4 h-4 text-[#70B8AA] mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-[11px]">Counselor</span>
            <span className="text-[9px] text-slate-400">Dr. Priya</span>
          </button>
          <button
            type="button"
            onClick={() => handleQuickDemo('admin')}
            disabled={loading}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:bg-amber-500/5 text-xs text-slate-700 dark:text-slate-200 transition-colors cursor-pointer group"
          >
            <ShieldCheck className="w-4 h-4 text-amber-500 mb-1 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-[11px]">Admin</span>
            <span className="text-[9px] text-slate-400">Moderator</span>
          </button>
        </div>
      </div>

      {/* Main Login Form Card */}
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-5">
        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/70 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <div className="flex-1">
              <span className="font-semibold block mb-0.5">Authentication Error</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            <div className="flex-1">
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                }}
                className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border ${
                  fieldErrors.email
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-[#8B7BE8]'
                } bg-[#FAF9F6] dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-all`}
                placeholder="name@university.edu"
              />
            </div>
            {fieldErrors.email && (
              <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Password with Show/Hide Toggle */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] font-semibold text-[#8B7BE8] hover:text-[#7968db] hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
                }}
                className={`w-full text-xs pl-9 pr-10 py-2.5 rounded-xl border ${
                  fieldErrors.password
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-[#8B7BE8]'
                } bg-[#FAF9F6] dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-all`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 dark:border-slate-600 text-[#8B7BE8] focus:ring-[#8B7BE8] h-4 w-4"
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">
                Remember me on this browser
              </span>
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#8B7BE8] hover:bg-[#7968db] active:bg-[#6c59d4] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed mt-3"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Link to Signup Page */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700/80 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-[#8B7BE8] hover:text-[#7968db] hover:underline transition-colors"
            >
              Sign Up for Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
