import React from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  Bot,
  Wind,
  GraduationCap,
  Sparkles,
  Users,
  Activity,
  SmilePlus,
  ArrowRight
} from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const featureList = [
    {
      icon: <BrainCircuit className="w-5 h-5 text-[#8B7BE8]" />,
      title: 'Multimodal Emotion Classification',
      desc: 'Independent text sentiment (GoEmotions), vocal acoustic frequency analysis, and facial landmark motion detection with late fusion weighting.'
    },
    {
      icon: <Bot className="w-5 h-5 text-[#70B8AA]" />,
      title: 'Mano AI (Gemini 3.8 Flash)',
      desc: 'Empathetic conversational companion providing non-judgmental reflective dialogue, study-life balance guidance, and crisis escalation guardrails.'
    },
    {
      icon: <Wind className="w-5 h-5 text-indigo-500" />,
      title: 'Vagal Downregulation Tools',
      desc: 'Interactive Box Breathing (4-4-4-4), 4-7-8 Breathing, and 5-4-3-2-1 Sensory Grounding to alleviate physical exam panic in real time.'
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-amber-500" />,
      title: 'Student Academic Planner',
      desc: 'Dedicated Pomodoro study timer with calming soundscapes, exam anxiety tracking, task prioritization matrix, and burnout alert indicators.'
    },
    {
      icon: <SmilePlus className="w-5 h-5 text-emerald-500" />,
      title: 'Mood & Emotional Journaling',
      desc: 'Daily mood wheel check-ins (1-10), sleep-mood correlation tracking, private encrypted journals, and longitudinal emotion trends.'
    },
    {
      icon: <Users className="w-5 h-5 text-rose-500" />,
      title: 'Verified Counselor Network',
      desc: 'Searchable directory of accredited clinical psychologists and psychiatrists with consultation booking, telehealth links, and verified credentials.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Complete Suite for Youth Mental Resilience
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
          Every capability in ManoShakti is designed to empower young minds to understand inner patterns, alleviate anxiety, and thrive academically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureList.map((f, i) => (
          <div
            key={i}
            className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-2xs space-y-3"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
              {f.icon}
            </div>
            <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
              {f.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center pt-6">
        <Link
          to="/app/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#8B7BE8] text-white text-sm font-semibold hover:bg-[#7968db] shadow-sm transition-all"
        >
          <span>Explore All Features in Live App</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
