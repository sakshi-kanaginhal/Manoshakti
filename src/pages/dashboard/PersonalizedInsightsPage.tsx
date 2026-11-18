import React from 'react';
import { Sparkles, TrendingUp, Moon, Brain, Award, ShieldCheck, Heart } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const PersonalizedInsightsPage: React.FC = () => {
  const correlationData = [
    { sleep: '< 6 hrs', avgMood: 4.8 },
    { sleep: '6-7 hrs', avgMood: 6.2 },
    { sleep: '7-8 hrs', avgMood: 7.9 },
    { sleep: '> 8 hrs', avgMood: 8.4 }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Longitudinal Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Personalized Emotional Insights
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Synthesized patterns extracted from your voluntary mood check-ins, journal reflections, and breathing sessions.
        </p>
      </div>

      {/* AI Weekly Reflection Summary */}
      <div className="p-6 bg-gradient-to-br from-[#8B7BE8]/15 via-white to-white dark:via-slate-800 dark:to-slate-800 rounded-2xl border border-[#8B7BE8]/30 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#8B7BE8] uppercase tracking-wider">
          <Brain className="w-4 h-4" />
          <span>Weekly Behavioral Synthesis</span>
        </div>
        <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
          Key Finding: Sleep Duration Strongly Anchors Your Exam Calm
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Over the past 14 days, your data reveals a direct <strong>+3.1 point boost</strong> in self-reported emotional calm on days you achieved $\ge 7.5$ hours of sleep. Conversely, nights under 6 hours preceded spike indicators in pre-exam panic.
        </p>
        <div className="p-3 bg-white/80 dark:bg-slate-900/60 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
          💡 <strong>Mano Suggestion:</strong> Prioritize an 11:00 PM digital sunset tonight rather than late-night revision to preserve tomorrow morning's cognitive recall.
        </div>
      </div>

      {/* Sleep vs Mood Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-[#292A35] dark:text-[#FAF9F6]">
            Sleep vs. Mood Correlation
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={correlationData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="sleep" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 10]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E1F28',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#FAF9F6'
                  }}
                />
                <Bar dataKey="avgMood" name="Avg Mood (1-10)" fill="#8B7BE8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resilience Milestones */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-[#292A35] dark:text-[#FAF9F6]">
            Resilience Milestones
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-200/60 dark:border-emerald-900/40 text-xs">
              <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">14-Day Check-in Streak:</span>
                <p className="text-slate-500 mt-0.5">Consistent self-reflection enhances cognitive emotional regulation.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/25 border border-indigo-200/60 dark:border-indigo-900/40 text-xs">
              <Heart className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200">Vagal Downregulation Master:</span>
                <p className="text-slate-500 mt-0.5">Completed 6 Box Breathing sessions before high-stakes exam days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
