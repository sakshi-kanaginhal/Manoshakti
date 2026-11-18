import React from 'react';
import { ShieldCheck, Users, BrainCircuit, AlertTriangle, CheckCircle, ArrowRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Governance & Platform Oversight</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          ManoShakti Administrator Console
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Monitor system health, review clinical counselor verification queues, moderate community safety, and manage wellness resources.
        </p>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Registered Users</span>
          <div className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-100">
            14,820
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">
            +482 new students this week
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Emotion Analyses Run</span>
          <div className="text-2xl font-bold font-mono text-[#8B7BE8]">
            64,190
          </div>
          <div className="text-[11px] text-slate-500">
            Text (48%), Voice (32%), Face (20%)
          </div>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <span className="text-[10px] uppercase font-bold text-amber-500">Pending Counselor Reviews</span>
          <div className="text-2xl font-bold font-mono text-amber-500">
            3 Pending
          </div>
          <Link to="/admin/verifications" className="text-[11px] text-[#8B7BE8] hover:underline block">
            Review Credentials →
          </Link>
        </div>

        <div className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">System Safety Status</span>
          <div className="text-base font-bold text-emerald-600 flex items-center gap-1.5 mt-2">
            <CheckCircle className="w-4 h-4" />
            <span>Optimal & Compliant</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Zero raw camera frames stored
          </div>
        </div>
      </div>

      {/* Navigation Quick Actions for Admin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/verifications"
          className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-[#8B7BE8] shadow-2xs transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
            Professional Verifications
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Verify clinical psychologist licenses (RCI, NMC, APA), audit credentials, and grant verified platform badges.
          </p>
        </Link>

        <Link
          to="/admin/users"
          className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-[#8B7BE8] shadow-2xs transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
            User & Role Management
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Manage user permissions, monitor active student enrollments, and verify institutional affiliations.
          </p>
        </Link>

        <Link
          to="/admin/moderation"
          className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-[#8B7BE8] shadow-2xs transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
            Community Moderation
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Review reported threads, enforce safe-space boundaries, and ensure zero toxic content reaches students.
          </p>
        </Link>
      </div>
    </div>
  );
};
