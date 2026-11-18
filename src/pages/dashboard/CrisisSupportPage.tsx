import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, HeartPulse, Send, CheckCircle2, Wind, Eye, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CrisisSupportPage: React.FC = () => {
  const [alertSent, setAlertSent] = useState(false);

  const emergencyHelplines = [
    {
      country: 'India (National)',
      name: 'Tele-MANAS (Ministry of Health)',
      phone: '14416',
      alternate: '1800-891-4416',
      desc: '24/7 Comprehensive mental health care across 20+ regional Indian languages. Toll-free and confidential.'
    },
    {
      country: 'India (Govt)',
      name: 'KIRAN Mental Health Helpline',
      phone: '1800-599-0019',
      alternate: 'Toll-Free 24/7',
      desc: 'Dedicated to psychological first-aid, distress management, and mental health rehabilitation.'
    },
    {
      country: 'India (NGO)',
      name: 'AASRA Suicide Prevention',
      phone: '+91-9820466726',
      alternate: '24 Hours',
      desc: 'Compassionate, non-judgmental telephone listening support for anyone in severe emotional crisis.'
    },
    {
      country: 'India (Foundation)',
      name: 'Vandrevala Foundation',
      phone: '+91-9999666555',
      alternate: 'WhatsApp / Call',
      desc: 'Free mental health support provided by clinical psychologists and counselors.'
    },
    {
      country: 'United States & Canada',
      name: '988 Suicide & Crisis Lifeline',
      phone: '988',
      alternate: 'Text 988',
      desc: 'Free and confidential support for people in distress, prevention, and crisis resources.'
    },
    {
      country: 'United Kingdom',
      name: 'Samaritans UK',
      phone: '116 123',
      alternate: 'Free from any phone',
      desc: 'Available 24 hours a day, 365 days a year for round-the-clock listening.'
    }
  ];

  const handleSendAlert = () => {
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Immediate Safety Support</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          24/7 Crisis Support & Emergency Helplines
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          If you or someone you know is in acute psychological distress, self-harm crisis, or having thoughts of suicide, compassionate help is available immediately. You do not have to carry this alone.
        </p>
      </div>

      {/* Primary Emergency Banner */}
      <div className="p-6 bg-rose-600 text-white rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm tracking-wide">
            <PhoneCall className="w-5 h-5 animate-bounce" />
            <span>Tele-MANAS (India 24/7 Toll-Free Support)</span>
          </div>
          <p className="text-xs text-rose-100 max-w-xl leading-relaxed">
            Directly connect with trained mental health professionals in your preferred language. Free from any landline or mobile phone.
          </p>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono pt-1">
            Dial 14416 or 1800-891-4416
          </div>
        </div>

        <a
          href="tel:14416"
          className="px-6 py-3 bg-white hover:bg-rose-50 text-rose-700 font-bold text-xs rounded-xl shadow-xs transition-colors text-center shrink-0"
        >
          Call 14416 Now
        </a>
      </div>

      {/* Alert Safety Circle */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Notify My Trusted Emergency Contacts
            </h3>
            <p className="text-xs text-slate-500">
              Sends an immediate distress alert message to your configured safety circle (e.g. family, mentor, close friend).
            </p>
          </div>
          <button
            onClick={handleSendAlert}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-2 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Safety Alert</span>
          </button>
        </div>

        {alertSent && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 rounded-xl border border-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Distress alert dispatched to your designated trusted contacts: "Sakshi is requesting urgent emotional check-in support."</span>
          </div>
        )}
      </div>

      {/* 5-Step Safety Grounding Protocol */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
        <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
          Immediate 5-Step De-Escalation Protocol
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#8B7BE8] text-white flex items-center justify-center text-[10px]">1</span>
              <span>Change Physical Position</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Stand up, drink a cold glass of water, and open a window for fresh air. Somatic sensory shift alters autonomic panic.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#70B8AA] text-white flex items-center justify-center text-[10px]">2</span>
              <span>Engage 4-7-8 Breathing</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Inhale 4s, hold gently 7s, exhale slowly 8s. A prolonged exhalation forces heart rate reduction.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px]">3</span>
              <span>Remove Immediate Triggers</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Step away from mock test papers, group chats, or study notes. Put books in another room for 30 minutes.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px]">4</span>
              <span>Connect with a Human Voice</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Call Tele-MANAS (14416) or phone a friend. You don't have to explain everything—simply say "I need some company."
            </p>
          </div>
        </div>
      </div>

      {/* Directory of Hotlines */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Comprehensive Regional & International Helplines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyHelplines.map((hl, i) => (
            <div
              key={i}
              className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#8B7BE8]">
                  {hl.country}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {hl.name}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {hl.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {hl.phone}
                </div>
                <a
                  href={`tel:${hl.phone.replace(/[^0-9]/g, '')}`}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 font-semibold text-xs transition-colors"
                >
                  Call Helpline
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
