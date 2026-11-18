import React, { useState } from 'react';
import { Phone, ShieldAlert, X, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CrisisBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#8B7BE8]/10 dark:bg-[#8B7BE8]/20 border-b border-[#8B7BE8]/20 text-[#292A35] dark:text-[#FAF9F6] text-xs py-2 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-[#8B7BE8] shrink-0" />
          <span className="font-medium">Need immediate emotional support?</span>
          <span className="hidden sm:inline text-slate-500 dark:text-slate-400">
            Trained counselors are available 24/7, confidential & free.
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2 font-mono font-medium">
            <span className="text-[#8B7BE8] flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              Tele-MANAS: <strong className="font-semibold">14416</strong>
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-[#70B8AA]">
              KIRAN: <strong className="font-semibold">1800-599-0019</strong>
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-slate-500 dark:text-slate-400">
              US/Intl: <strong className="font-semibold">988</strong>
            </span>
          </div>

          <Link
            to="/crisis"
            className="text-xs font-semibold text-[#8B7BE8] hover:underline underline-offset-2 whitespace-nowrap"
          >
            Safety Plan
          </Link>

          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            aria-label="Dismiss crisis banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
