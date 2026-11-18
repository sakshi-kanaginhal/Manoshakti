import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Status & Validation State
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Real-time / Pre-submission Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // 1. Full Name
    if (!fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    } else if (fullName.trim().length < 2) {
      errors.fullName = 'Full Name must be at least 2 characters.';
    }

    // 2. Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email address (e.g., student@university.edu).';
    }

    // 3. Contact Number
    const phoneRegex = /^[+]?[\d\s-]{8,20}$/;
    if (!contactNumber.trim()) {
      errors.contactNumber = 'Contact number is required for account verification.';
    } else if (!phoneRegex.test(contactNumber.trim())) {
      errors.contactNumber = 'Please enter a valid contact number (at least 8 digits, e.g., +919876543210).';
    }

    // 4. Password
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    // 5. Confirm Password
    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    // 6. Terms Checkbox
    if (!agreeTerms) {
      errors.terms = 'You must accept the Terms of Service and Privacy Policy to continue.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const result = await register({
      fullName: fullName.trim(),
      email: email.trim(),
      contactNumber: contactNumber.trim(),
      password
    });

    setLoading(false);

    if (!result.success || result.error) {
      setErrorMessage(result.error || 'Failed to create account. Please try again.');
      return;
    }

    // Registration successful
    setSuccessMessage('Account registered successfully! Redirecting to your dashboard...');
    setTimeout(() => {
      navigate('/app/dashboard');
    }, 1200);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10 sm:py-14 space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-11 h-11 mx-auto rounded-xl bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] flex items-center justify-center text-white font-bold text-xl shadow-sm">
          M
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Create Your ManoShakti Account
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Understand Your Emotions. Strengthen Your Mind. Join our secure, private wellness sanctuary.
        </p>
      </div>

      {/* Data Privacy & Minimal Information Guarantee Banner */}
      <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs space-y-1">
        <div className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Strict Data Minimization Guarantee</span>
        </div>
        <p className="text-emerald-700/90 dark:text-emerald-400/90 leading-relaxed text-[11px]">
          We store only your essential account details (Full Name, Email, Contact Number). We never collect dates of birth, home addresses, academic records, or sensitive personal dossiers.
        </p>
      </div>

      {/* Main Registration Card */}
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/90 dark:border-slate-700 shadow-sm space-y-6">
        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/70 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2.5 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <div className="flex-1">
              <span className="font-semibold block mb-0.5">Registration Error</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            <div className="flex-1">
              <span className="font-semibold block mb-0.5">Welcome to ManoShakti!</span>
              <span>{successMessage}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Field 1: Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (fieldErrors.fullName) setFieldErrors({ ...fieldErrors, fullName: '' });
                }}
                className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border ${
                  fieldErrors.fullName
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-[#8B7BE8]'
                } bg-[#FAF9F6] dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-all`}
                placeholder="e.g. Sakshi Sharma"
              />
            </div>
            {fieldErrors.fullName && (
              <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                {fieldErrors.fullName}
              </p>
            )}
          </div>

          {/* Field 2: Email Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address <span className="text-rose-500">*</span>
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
                placeholder="name@university.edu or your.email@example.com"
              />
            </div>
            {fieldErrors.email && (
              <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* Field 3: Contact Number */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Contact Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                value={contactNumber}
                onChange={(e) => {
                  setContactNumber(e.target.value);
                  if (fieldErrors.contactNumber) setFieldErrors({ ...fieldErrors, contactNumber: '' });
                }}
                className={`w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border ${
                  fieldErrors.contactNumber
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-[#8B7BE8]'
                } bg-[#FAF9F6] dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-all`}
                placeholder="+91 98765 43210"
              />
            </div>
            {fieldErrors.contactNumber && (
              <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                {fieldErrors.contactNumber}
              </p>
            )}
          </div>

          {/* Field 4: Password with Show/Hide toggle */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password <span className="text-rose-500">*</span>
            </label>
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
                placeholder="Minimum 8 characters"
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

          {/* Field 5: Confirm Password with Show/Hide toggle */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Confirm Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: '' });
                }}
                className={`w-full text-xs pl-9 pr-10 py-2.5 rounded-xl border ${
                  fieldErrors.confirmPassword
                    ? 'border-rose-400 focus:ring-rose-400'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-[#8B7BE8]'
                } bg-[#FAF9F6] dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 transition-all`}
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms & Privacy Policy Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked);
                  if (fieldErrors.terms) setFieldErrors({ ...fieldErrors, terms: '' });
                }}
                className="mt-0.5 rounded border-slate-300 dark:border-slate-600 text-[#8B7BE8] focus:ring-[#8B7BE8] h-4 w-4"
              />
              <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                I agree to the{' '}
                <span className="font-semibold text-[#8B7BE8] hover:underline">
                  Terms of Service
                </span>{' '}
                and{' '}
                <span className="font-semibold text-[#8B7BE8] hover:underline">
                  Privacy Policy
                </span>
                . I understand that ManoShakti is an empowering wellness companion, not a medical diagnostic or clinical crisis provider.
              </span>
            </label>
            {fieldErrors.terms && (
              <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium pl-6">
                {fieldErrors.terms}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#8B7BE8] hover:bg-[#7968db] active:bg-[#6c59d4] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Existing Account Footer Link */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700/80 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#8B7BE8] hover:text-[#7968db] hover:underline transition-colors"
            >
              Sign In to ManoShakti
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
