import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { authService } from '../../services/supabase';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    const res = await authService.resetPassword(email.trim());
    setLoading(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] flex items-center justify-center text-white font-bold text-lg shadow-sm">
          M
        </div>
        <h1 className="text-2xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Reset Your Password
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Enter your registered email address and we will dispatch a secure Supabase recovery link.
        </p>
      </div>

      <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        {errorMessage && (
          <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/70 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {sent ? (
          <div className="space-y-4 text-center py-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Recovery Link Dispatched
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              If an account is associated with <strong>{email}</strong>, a password reset link has been dispatched via Supabase Auth.
            </p>
            <Link
              to="/login"
              className="inline-block pt-2 text-xs font-semibold text-[#8B7BE8] hover:underline"
            >
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Registered Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#8B7BE8] transition-all"
                  placeholder="name@university.edu"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#8B7BE8] hover:bg-[#7968db] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Send Recovery Instructions</span>
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to sign in</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
