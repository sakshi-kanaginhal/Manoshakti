import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-[#15161E] border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] flex items-center justify-center text-white font-bold text-xs">
                M
              </div>
              <span className="font-bold text-sm text-[#292A35] dark:text-[#FAF9F6] font-display">
                ManoShakti
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              Understand Your Emotions. Strengthen Your Mind.
              An AI-assisted youth wellness companion dedicated to cognitive resilience, self-discovery, and academic equilibrium.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider mb-3">
              Core Capabilities
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/app/emotions" className="hover:text-[#8B7BE8] transition-colors">
                  Multimodal Emotion Engine
                </Link>
              </li>
              <li>
                <Link to="/app/assistant" className="hover:text-[#8B7BE8] transition-colors">
                  Mano AI Companion (Gemini 3.8)
                </Link>
              </li>
              <li>
                <Link to="/app/academics" className="hover:text-[#8B7BE8] transition-colors">
                  Academic Stress & Pomodoro
                </Link>
              </li>
              <li>
                <Link to="/app/mindfulness" className="hover:text-[#8B7BE8] transition-colors">
                  Vagal Breathwork & Grounding
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider mb-3">
              Support Network
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/app/professionals" className="hover:text-[#8B7BE8] transition-colors">
                  Verified Counselor Directory
                </Link>
              </li>
              <li>
                <Link to="/app/community" className="hover:text-[#8B7BE8] transition-colors">
                  Peer Wellness Community
                </Link>
              </li>
              <li>
                <Link to="/crisis" className="hover:text-rose-500 font-medium transition-colors">
                  24/7 Crisis Helplines
                </Link>
              </li>
              <li>
                <Link to="/app/settings" className="hover:text-[#8B7BE8] transition-colors">
                  Privacy & Data Ownership
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-xs uppercase tracking-wider mb-3">
              Ethical AI & Crisis Charter
            </h4>
            <p className="text-slate-500 text-[11px] leading-relaxed mb-3">
              ManoShakti is a wellness companion and self-reflection platform. It is <strong>NOT</strong> a medical diagnostic or treatment system and does not replace human clinical care.
            </p>
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-mono text-[11px]">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>National Support: 14416 / 988</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} ManoShakti Platform. Empowering youth emotional strength.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Student Privacy Guarantee
            </span>
            <span>·</span>
            <span>Zero Biometric Storage</span>
            <span>·</span>
            <Link to="/about" className="hover:text-slate-600 dark:hover:text-slate-200">
              Ethical AI Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
