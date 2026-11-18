import React from 'react';
import { ShieldCheck, HeartHandshake, EyeOff, Brain, Award, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B7BE8] bg-[#8B7BE8]/10 dark:bg-[#8B7BE8]/20 px-3 py-1 rounded-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Vision & Youth Charter</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Empowering the Mental Strength of Today’s Youth
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          ManoShakti was born out of a critical truth: youth and students encounter intense academic, emotional, and social pressures, but clinical mental healthcare is often stigmatized or inaccessible.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-2xs space-y-3">
          <div className="w-9 h-9 rounded-lg bg-[#8B7BE8]/15 text-[#8B7BE8] flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
            Companion, Not Diagnostic Tool
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            ManoShakti never labels young minds with clinical psychiatric pathologies. We cultivate emotional awareness, somatic regulation, and healthy reflection habits.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-2xs space-y-3">
          <div className="w-9 h-9 rounded-lg bg-[#70B8AA]/15 text-[#70B8AA] flex items-center justify-center">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
            Uncompromising Privacy
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Individual student emotions are never sold, monetized, or shared with colleges, professors, or parents. Camera frames and audio recordings are analyzed ephemerally and never written to raw disks.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-2xs space-y-3">
          <div className="w-9 h-9 rounded-lg bg-[#A9C7E8]/30 text-indigo-600 dark:text-[#A9C7E8] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
            Human-in-the-Loop Network
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Technology complements humanity. When self-care isn’t enough, ManoShakti provides verified directory connections to accredited clinical psychologists and psychiatrists.
          </p>
        </div>
      </div>

      {/* Ethical AI Charter */}
      <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-[#8B7BE8]">
          <Brain className="w-4 h-4" />
          <span>ManoShakti Ethical AI Standards</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Our multimodal emotion models operate under strict epistemic humility:
        </p>
        <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
          <li><strong>No Lie Detection:</strong> Inconsistencies between typed words and facial muscle signals trigger caring reflection questions, never accusatory labels.</li>
          <li><strong>No Facial Determinism:</strong> Smiling is acknowledged as a social or physical expression, never assumed to prove happiness.</li>
          <li><strong>Crisis Safeguards:</strong> Any hint of active suicidal ideation or self-harm bypasses conversational chat to immediately display verified 24/7 tele-health hotlines.</li>
        </ul>
      </div>
    </div>
  );
};
