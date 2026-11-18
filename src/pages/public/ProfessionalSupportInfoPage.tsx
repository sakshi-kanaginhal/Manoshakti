import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, UserCheck, Stethoscope, FileText, CheckCircle2 } from 'lucide-react';

export const ProfessionalSupportInfoPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#292A35] dark:text-[#FAF9F6]">
          For Mental Health Professionals & Institutions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Partnering with certified clinical psychologists, psychiatrists, and youth counselors to ensure safe, ethical, and high-impact care for students.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
          <img
            src="/src/assets/images/counselor_support_1793628016272.jpg"
            alt="Compassionate psychologist in consultation office"
            className="w-full h-80 object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
            Strict Credential Verification Standards
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Every professional listed in the ManoShakti Directory undergoes thorough manual verification by our clinical review board.
          </p>
          <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Valid registration with recognized medical/psychological statutory bodies (e.g., RCI, NMC, APA).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Adolescent & student mental health specialization credentialing.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Adherence to strict ethical boundaries: non-coercive, youth-affirming, and confidential care.</span>
            </li>
          </ul>

          <div className="pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#8B7BE8] text-white text-xs font-semibold hover:bg-[#7968db] transition-colors"
            >
              <UserCheck className="w-4 h-4" />
              <span>Login as Professional / Counselor</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
