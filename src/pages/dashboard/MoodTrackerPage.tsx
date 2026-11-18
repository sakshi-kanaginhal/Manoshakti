import React, { useState } from 'react';
import { SmilePlus, Moon, Zap, Check, Calendar, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { apiService } from '../../services/api';
import { MoodEntry } from '../../types';

export const MoodTrackerPage: React.FC = () => {
  const [moods, setMoods] = useState<MoodEntry[]>(() => apiService.getStoredMoods());
  const [score, setScore] = useState<number>(7);
  const [primaryEmotion, setPrimaryEmotion] = useState('Calm');
  const [energy, setEnergy] = useState<number>(6);
  const [sleep, setSleep] = useState<number>(7.5);
  const [notes, setNotes] = useState('');
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const emotionsList = ['Joyful', 'Calm', 'Motivated', 'Neutral', 'Overwhelmed', 'Anxious', 'Fatigued', 'Sad', 'Frustrated'];
  const triggersList = ['Exams & Tests', 'Assignments', 'Sleep Deprivation', 'Peer Comparison', 'Social Media', 'Family Pressure'];

  const toggleTrigger = (t: string) => {
    setSelectedTriggers(prev =>
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = apiService.saveMood({
      mood_score: score,
      primary_emotion: primaryEmotion,
      energy_level: energy,
      sleep_hours: sleep,
      notes,
      triggers: selectedTriggers,
      logged_date: new Date().toISOString().split('T')[0]
    });
    setMoods(apiService.getStoredMoods());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const chartData = moods.slice(0, 7).reverse().map((m, i) => ({
    name: m.logged_date ? m.logged_date.slice(5) : `Day ${i + 1}`,
    score: m.mood_score,
    energy: m.energy_level
  }));

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider">
          <SmilePlus className="w-4 h-4" />
          <span>Daily Wellness Logging</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Daily Mood & Energy Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Tracking your mood daily builds emotional self-regulation. Notice what influences your energy, and identify triggers before they lead to burnout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Entry Form (7 cols) */}
        <form onSubmit={handleSave} className="lg:col-span-7 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-6">
          {/* Mood Slider (1-10) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Overall Mood Rating
              </label>
              <span className="text-sm font-bold font-mono text-[#8B7BE8]">
                {score} / 10
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={score}
              onChange={(e) => setScore(parseInt(e.target.value, 10))}
              className="w-full accent-[#8B7BE8] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 - Overwhelmed / Low</span>
              <span>5 - Neutral</span>
              <span>10 - Joyful & Resilient</span>
            </div>
          </div>

          {/* Primary Emotion Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Primary Emotion Today
            </label>
            <div className="flex flex-wrap gap-1.5">
              {emotionsList.map((e) => (
                <button
                  type="button"
                  key={e}
                  onClick={() => setPrimaryEmotion(e)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    primaryEmotion === e
                      ? 'bg-[#8B7BE8] text-white border-[#8B7BE8] font-semibold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Energy & Sleep */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Energy
                </span>
                <span className="font-mono text-slate-500">{energy}/10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={energy}
                onChange={(e) => setEnergy(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Moon className="w-3.5 h-3.5 text-indigo-500" /> Sleep
                </span>
                <span className="font-mono text-slate-500">{sleep} hrs</span>
              </div>
              <input
                type="range"
                min={2}
                max={12}
                step={0.5}
                value={sleep}
                onChange={(e) => setSleep(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Triggers */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Any Specific Triggers Today? (Optional)
            </label>
            <div className="flex flex-wrap gap-1.5">
              {triggersList.map((t) => {
                const active = selectedTriggers.includes(t);
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggleTrigger(t)}
                    className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                      active
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-700 dark:text-rose-300 font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Private Note (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What went well or what felt heavy?"
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#8B7BE8] hover:bg-[#7968db] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <SmilePlus className="w-4 h-4" />
            <span>Save Today's Check-In</span>
          </button>

          {savedSuccess && (
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Mood successfully recorded! Streak maintained.</span>
            </div>
          )}
        </form>

        {/* Right Column: History & Trends (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-[#292A35] dark:text-[#FAF9F6]">
              Recent 7-Day Trend
            </h3>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <YAxis domain={[0, 10]} stroke="#94a3b8" fontSize={10} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E1F28',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#FAF9F6'
                    }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#8B7BE8" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="energy" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Past entries list */}
          <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-[#292A35] dark:text-[#FAF9F6]">
              Logged Mood History
            </h3>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {moods.map((m) => (
                <div
                  key={m.id}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {m.primary_emotion}
                    </span>
                    <span className="text-slate-400 text-[10px] ml-2">
                      {m.logged_date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-[#8B7BE8] font-bold">{m.mood_score}/10</span>
                    <span className="text-slate-400 text-[10px]">· {m.sleep_hours}h sleep</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
