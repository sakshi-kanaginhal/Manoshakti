import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Trash2, Check, AlertTriangle, Eye } from 'lucide-react';

interface ReportItem {
  id: string;
  author: string;
  reason: string;
  contentSnippet: string;
  reportedAt: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

export const CommunityModerationPage: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>([
    {
      id: 'rep-1',
      author: 'StressedOutFreshman',
      reason: 'Contains unhelpful exam fatalism and panic triggering',
      contentSnippet: 'There is literally zero point in studying for discrete math. The professor intends to fail everyone.',
      reportedAt: '2 hours ago',
      status: 'pending'
    },
    {
      id: 'rep-2',
      author: 'Anonymous Student #4829',
      reason: 'Soliciting paid assignment completion',
      contentSnippet: 'DM me on Telegram for solved assignment papers.',
      reportedAt: 'Yesterday',
      status: 'pending'
    }
  ]);

  const [message, setMessage] = useState<string | null>(null);

  const handleResolve = (id: string, action: 'removed' | 'dismissed') => {
    setReports(reports.map((r) => (r.id === id ? { ...r, status: 'resolved' } : r)));
    setMessage(`Report processed: Item has been ${action}.`);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Safety & Safe Space Governance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Community Content Moderation Queue
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Review community posts and comments flagged by users or automated sentiment safety filters. Protect the student peer environment from toxic or harmful influences.
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      <div className="space-y-4">
        {reports.map((r) => (
          <div
            key={r.id}
            className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Author: {r.author}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    · Flagged {r.reportedAt}
                  </span>
                </div>
                <div className="text-xs font-semibold text-rose-600 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Reason: {r.reason}</span>
                </div>
              </div>

              {r.status === 'pending' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleResolve(r.id, 'dismissed')}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    Dismiss Report
                  </button>
                  <button
                    onClick={() => handleResolve(r.id, 'removed')}
                    className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Post</span>
                  </button>
                </div>
              ) : (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                  Resolved
                </span>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 font-serif italic">
              "{r.contentSnippet}"
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
