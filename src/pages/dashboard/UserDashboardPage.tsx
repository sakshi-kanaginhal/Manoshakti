import React from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  MessageSquareText,
  Mic,
  Camera,
  Layers,
  Wind,
  SmilePlus,
  BookOpen,
  CalendarCheck,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';

export const UserDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const moods = apiService.getStoredMoods();
  const appointments = apiService.getAppointments();

  // Prepare chart data
  const chartData = [
    { day: 'Mon', score: 6, energy: 5 },
    { day: 'Tue', score: 5, energy: 4 },
    { day: 'Wed', score: 7, energy: 7 },
    { day: 'Thu', score: 4, energy: 5 },
    { day: 'Fri', score: 6, energy: 6 },
    { day: 'Sat', score: 8, energy: 8 },
    { day: 'Sun', score: 7.5, energy: 7 }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome Strip */}
      <div className="bg-gradient-to-r from-[#8B7BE8]/10 via-[#70B8AA]/10 to-transparent p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8B7BE8] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ManoShakti Daily Pulse</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
            Welcome back, {user?.full_name?.split(' ')[0] || 'Friend'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            "Your emotions are messengers, not permanent definitions of who you are."
          </p>
        </div>

        {/* Quick KPI stats */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs text-center">
            <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-lg font-mono">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>14</span>
            </div>
            <div className="text-[11px] text-slate-500">Day Streak</div>
          </div>

          <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs text-center">
            <div className="text-lg font-bold text-[#8B7BE8] font-mono">
              82.5%
            </div>
            <div className="text-[11px] text-slate-500">Resilience Index</div>
          </div>
        </div>
      </div>

      {/* Positive Vibes Chatbot Spotlight Card */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-purple-50 via-teal-50/60 to-amber-50/40 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800 rounded-2xl border border-purple-200/80 dark:border-slate-700 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] flex items-center justify-center text-white shrink-0 shadow-xs">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                Chat with Mano: Your Positive Vibes Companion
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                Online
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Feeling exam jitters, overwhelmed, or just want an encouraging conversation? Mano is ready to chat 24/7 with authentic positive vibes, breathing exercises, and daily affirmations.
            </p>
          </div>
        </div>

        <Link
          to="/app/assistant"
          className="px-5 py-2.5 rounded-xl bg-[#8B7BE8] hover:bg-[#7968db] text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-all whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Chat for Positive Vibes</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Multimodal Quick-Check Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Multimodal Emotion Hub
          </h2>
          <Link
            to="/app/emotions"
            className="text-xs font-semibold text-[#8B7BE8] hover:underline flex items-center gap-1"
          >
            <span>Open Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/app/emotions/text"
            className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#8B7BE8] shadow-2xs transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#8B7BE8]/15 text-[#8B7BE8] flex items-center justify-center">
                <MessageSquareText className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400">GoEmotions</span>
            </div>
            <h3 className="text-sm font-bold text-[#292A35] dark:text-[#FAF9F6] group-hover:text-[#8B7BE8] transition-colors">
              Text Emotion
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Classify feelings across 8 states from your words.
            </p>
          </Link>

          <Link
            to="/app/emotions/voice"
            className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#70B8AA] shadow-2xs transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#70B8AA]/15 text-[#70B8AA] flex items-center justify-center">
                <Mic className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400">Acoustics</span>
            </div>
            <h3 className="text-sm font-bold text-[#292A35] dark:text-[#FAF9F6] group-hover:text-[#70B8AA] transition-colors">
              Voice Analysis
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Analyze vocal pitch variability and speaking pace.
            </p>
          </Link>

          <Link
            to="/app/emotions/facial"
            className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 shadow-2xs transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400">Landmarks</span>
            </div>
            <h3 className="text-sm font-bold text-[#292A35] dark:text-[#FAF9F6] group-hover:text-indigo-500 transition-colors">
              Facial Landmarks
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Detect visible muscle movement with zero raw image storage.
            </p>
          </Link>

          <Link
            to="/app/emotions/fusion"
            className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-400 shadow-2xs transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400">Late Fusion</span>
            </div>
            <h3 className="text-sm font-bold text-[#292A35] dark:text-[#FAF9F6] group-hover:text-amber-500 transition-colors">
              Multimodal Fusion
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Synthesize all signals with gentle inconsistency inquiry.
            </p>
          </Link>
        </div>
      </div>

      {/* Main Grid: Charts & Next Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Emotional Trend Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
                Weekly Emotional & Energy Trajectory
              </h3>
              <p className="text-xs text-slate-500">
                Self-reported mood index and subjective physical energy levels.
              </p>
            </div>
            <Link
              to="/app/mood"
              className="text-xs font-semibold text-[#8B7BE8] hover:underline"
            >
              Log Today
            </Link>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B7BE8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B7BE8" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#70B8AA" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#70B8AA" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 10]} stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E1F28',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#FAF9F6'
                  }}
                />
                <Area type="monotone" dataKey="score" name="Mood Score (1-10)" stroke="#8B7BE8" strokeWidth={2.5} fillOpacity={1} fill="url(#moodGradient)" />
                <Area type="monotone" dataKey="energy" name="Energy Level (1-10)" stroke="#70B8AA" strokeWidth={2} fillOpacity={1} fill="url(#energyGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-700/60">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B7BE8]"></span> Mood Score
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-[#70B8AA]"></span> Energy Level
              </span>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">7-Day Average: 6.5 / 10</span>
          </div>
        </div>

        {/* Right Column: Recommended Session & Upcoming Care (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Breathwork Card */}
          <div className="bg-gradient-to-br from-[#8B7BE8]/15 via-white to-white dark:via-slate-800 dark:to-slate-800 p-6 rounded-2xl border border-[#8B7BE8]/30 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#8B7BE8] uppercase tracking-wider">
                Recommended Somatic Reset
              </span>
              <span className="text-xs text-slate-400 font-mono">5 mins</span>
            </div>
            <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
              Box Breathing (Sama Vritti)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Inhale 4s, hold 4s, exhale 4s, hold empty 4s. Instantly reduces sympathetic nervous tension before exams.
            </p>
            <Link
              to="/app/mindfulness"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B7BE8] text-white text-xs font-semibold rounded-lg hover:bg-[#7968db] transition-colors"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Begin Session Now</span>
            </Link>
          </div>

          {/* Next Scheduled Appointment */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Support Network
              </span>
              <Link to="/app/appointments" className="text-xs font-semibold text-[#8B7BE8] hover:underline">
                View All
              </Link>
            </div>

            {appointments.length > 0 ? (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {appointments[0].professional_name}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {appointments[0].professional_title}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                    Confirmed
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                  {appointments[0].appointment_date} · {appointments[0].start_time} - {appointments[0].end_time}
                </div>
                {appointments[0].meeting_link && (
                  <a
                    href={appointments[0].meeting_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B7BE8] hover:underline pt-1"
                  >
                    <span>Join Telehealth Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ) : (
              <p className="text-xs text-slate-500">No upcoming consultations booked.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
