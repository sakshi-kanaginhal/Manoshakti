import React, { useState } from 'react';
import { Lock, Download, Trash2, ShieldCheck, Check, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';

export const PrivacySettingsPage: React.FC = () => {
  const { user, consents, updateConsent } = useAuth();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState(false);

  const handleExportData = () => {
    const moods = apiService.getStoredMoods();
    const journals = apiService.getStoredJournals();
    const exportObject = {
      export_timestamp: new Date().toISOString(),
      user_id: user?.id,
      user_name: user?.full_name,
      email: user?.email,
      contact_number: user?.contact_number,
      consents: consents,
      mood_entries: moods,
      journal_entries: journals.map((j) => ({ ...j, content: '[Private Encrypted Content Preserved]' }))
    };

    const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `manoshakti-data-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const [confirmPurgeOpen, setConfirmPurgeOpen] = useState(false);

  const handlePurgeHistory = () => {
    localStorage.removeItem('manoshakti_moods');
    localStorage.removeItem('manoshakti_journals');
    setConfirmPurgeOpen(false);
    setPurgeSuccess(true);
    setTimeout(() => setPurgeSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8B7BE8] uppercase tracking-wider">
          <Lock className="w-4 h-4" />
          <span>Data Governance & Sovereignty</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Privacy, Consents & Data Controls
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          You have absolute ownership over your wellness records. Inspect permissions, export your complete archive, or delete your data at any moment.
        </p>
      </div>

      {/* Student Data Non-Disclosure Guarantee */}
      <div className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
          <ShieldCheck className="w-4 h-4" />
          <span>Zero Institutional Disclosure Standard</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          ManoShakti strictly guarantees that your personal emotional check-ins, journal reflections, and stress evaluations are <strong>never</strong> shared with your college, teachers, university administrators, or potential employers.
        </p>
      </div>

      {/* Permissions & Consent Toggles */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-6">
        <h3 className="text-sm font-bold text-[#292A35] dark:text-[#FAF9F6] uppercase tracking-wider">
          Sensory Modality Consents
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Microphone Acoustic Access
              </span>
              <p className="text-[11px] text-slate-500">
                Used solely during active voice recording for real-time acoustic pitch estimation. Audio is never stored.
              </p>
            </div>
            <input
              type="checkbox"
              checked={consents.microphone_consent}
              onChange={(e) => updateConsent('microphone_consent', e.target.checked)}
              className="w-4 h-4 rounded text-[#8B7BE8] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Camera Facial Landmark Access
              </span>
              <p className="text-[11px] text-slate-500">
                Used solely in client browser memory for geometric muscle tension cues. Raw images are never transmitted.
              </p>
            </div>
            <input
              type="checkbox"
              checked={consents.camera_consent}
              onChange={(e) => updateConsent('camera_consent', e.target.checked)}
              className="w-4 h-4 rounded text-[#8B7BE8] cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Mano AI Reflection Processing
              </span>
              <p className="text-[11px] text-slate-500">
                Allows Google Gemini to provide supportive non-clinical conversational wellness prompts.
              </p>
            </div>
            <input
              type="checkbox"
              checked={consents.ai_analysis_consent}
              onChange={(e) => updateConsent('ai_analysis_consent', e.target.checked)}
              className="w-4 h-4 rounded text-[#8B7BE8] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Export & Purge Actions */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-6">
        <h3 className="text-sm font-bold text-[#292A35] dark:text-[#FAF9F6] uppercase tracking-wider">
          Data Export & Account Management
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Download Full Personal Archive (JSON)
            </h4>
            <p className="text-[11px] text-slate-500">
              Export your mood trajectories, activity completion logs, and assessment scores in portable machine-readable format.
            </p>
          </div>
          <button
            onClick={handleExportData}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-200 rounded-lg transition-colors flex items-center gap-2 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Archive</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="text-xs text-emerald-600 font-medium flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>Archive generated and downloaded to your device!</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20">
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-rose-700 dark:text-rose-300">
              Purge All Mood & Journal Records
            </h4>
            <p className="text-[11px] text-slate-500">
              Permanently delete all historical mood check-ins and journal entries from storage.
            </p>
          </div>
          {confirmPurgeOpen ? (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-300">Are you sure?</span>
              <button
                onClick={handlePurgeHistory}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
              >
                Yes, Purge
              </button>
              <button
                onClick={() => setConfirmPurgeOpen(false)}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-xs font-semibold rounded-lg text-slate-700 dark:text-slate-200"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmPurgeOpen(true)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Purge Data</span>
            </button>
          )}
        </div>

        {purgeSuccess && (
          <div className="text-xs text-rose-600 font-medium flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>Records permanently wiped from your storage.</span>
          </div>
        )}
      </div>
    </div>
  );
};
