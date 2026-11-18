import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, FileText, Check, AlertCircle } from 'lucide-react';

interface VerificationApplicant {
  id: string;
  name: string;
  title: string;
  board: string;
  regNumber: string;
  hospital: string;
  experience: number;
  status: 'pending' | 'approved' | 'rejected';
}

export const ProfessionalVerificationPage: React.FC = () => {
  const [applicants, setApplicants] = useState<VerificationApplicant[]>([
    {
      id: 'app-1',
      name: 'Dr. Priya Varma, Ph.D.',
      title: 'Clinical Psychologist',
      board: 'Rehabilitation Council of India (RCI)',
      regNumber: 'RCI-CP-2018-8472',
      hospital: 'MindWell Clinic, Bengaluru',
      experience: 9,
      status: 'approved'
    },
    {
      id: 'app-2',
      name: 'Dr. Rajeshwari Kulkarni, M.D.',
      title: 'Adolescent Psychiatrist',
      board: 'National Medical Commission (NMC)',
      regNumber: 'NMC-PSY-2019-4821',
      hospital: 'Apex Neuro Institute, Pune',
      experience: 11,
      status: 'pending'
    },
    {
      id: 'app-3',
      name: 'Sameer Sen, M.Phil.',
      title: 'Licensed Clinical Counselor',
      board: 'Indian Association of Clinical Counselors',
      regNumber: 'IAC-COU-2021-9923',
      hospital: 'Zenith Wellness Hub, Kolkata',
      experience: 5,
      status: 'pending'
    }
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleAction = (id: string, status: 'approved' | 'rejected') => {
    setApplicants(applicants.map((a) => (a.id === id ? { ...a, status } : a)));
    setNotification(`Applicant status updated to: ${status.toUpperCase()}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Statutory Credentialing Audit</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Counselor Credential Verification Queue
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Review submitted licenses and statutory registration numbers. Approved psychologists appear in the public student directory with verified trust badges.
        </p>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      <div className="space-y-4">
        {applicants.map((a) => (
          <div
            key={a.id}
            className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    {a.name}
                  </h3>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      a.status === 'approved'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : a.status === 'rejected'
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                        : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
                <p className="text-xs text-[#8B7BE8] font-medium mt-0.5">
                  {a.title} · {a.experience} yrs clinical experience
                </p>
              </div>

              <div className="flex items-center gap-2">
                {a.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleAction(a.id, 'approved')}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Verify</span>
                    </button>
                    <button
                      onClick={() => handleAction(a.id, 'rejected')}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-rose-50 text-rose-600 text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl text-xs text-slate-600 dark:text-slate-300 font-mono">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-sans">Statutory Board</span>
                {a.board}
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-sans">Registration Number</span>
                {a.regNumber}
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-sans">Affiliated Clinic</span>
                {a.hospital}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
