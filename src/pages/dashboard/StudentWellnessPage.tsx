import React, { useState, useEffect } from 'react';
import { GraduationCap, Play, Pause, RotateCcw, CheckSquare, Plus, AlertTriangle, Coffee, Clock } from 'lucide-react';

interface TaskItem {
  id: string;
  title: string;
  quadrant: 'urgent_important' | 'important_not_urgent' | 'urgent_not_important' | 'neither';
  completed: boolean;
}

export const StudentWellnessPage: React.FC = () => {
  // Pomodoro Timer State (25 min study / 5 min break)
  const [pomodoroMode, setPomodoroMode] = useState<'study' | 'break'>('study');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(2);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      // Toggle mode
      if (pomodoroMode === 'study') {
        setPomodoroMode('break');
        setTimeLeft(5 * 60);
        setSessionsCompleted((s) => s + 1);
      } else {
        setPomodoroMode('study');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, pomodoroMode]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(pomodoroMode === 'study' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Eisenhower Matrix Task Management
  const [tasks, setTasks] = useState<TaskItem[]>([
    { id: 't1', title: 'Calculus Problem Set 4', quadrant: 'urgent_important', completed: false },
    { id: 't2', title: 'Prepare Cognitive Psychology Outline', quadrant: 'important_not_urgent', completed: true },
    { id: 't3', title: 'Reply to study group WhatsApp queries', quadrant: 'urgent_not_important', completed: false },
    { id: 't4', title: 'Organize desktop downloads folder', quadrant: 'neither', completed: false }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskQuad, setNewTaskQuad] = useState<TaskItem['quadrant']>('urgent_important');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks([
      ...tasks,
      { id: 't-' + Date.now(), title: newTaskTitle, quadrant: newTaskQuad, completed: false }
    ]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>Student Academic Wellness</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Academic Stress & Focus Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Tools engineered to replace all-night cramming panic with sustainable, cognitive rhythms. Prioritize effectively and rest without guilt.
        </p>
      </div>

      {/* Burnout Risk Meter */}
      <div className="p-5 bg-gradient-to-r from-emerald-50 via-amber-50 to-emerald-50 dark:from-emerald-950/20 dark:via-amber-950/20 dark:to-emerald-950/20 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Academic Burnout Index: Low / Sustainable (24%)</span>
          </div>
          <p className="text-xs text-slate-500">
            Based on sleep continuity and your recent mood entries. You are maintaining healthy cognitive margins!
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="h-2 w-32 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[24%]" />
          </div>
        </div>
      </div>

      {/* Pomodoro Timer Card */}
      <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs text-center space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono text-[#8B7BE8] bg-[#8B7BE8]/10">
            {pomodoroMode === 'study' ? 'Deep Study Interval' : 'Restorative Break'}
          </div>
          <p className="text-xs text-slate-500">
            {pomodoroMode === 'study'
              ? '25 minutes of single-task focus. Silence non-essential notifications.'
              : '5 minutes to hydrate, stretch your neck, and look at the horizon.'}
          </p>
        </div>

        {/* Digital Clock Display */}
        <div className="text-6xl font-extrabold font-mono text-[#292A35] dark:text-[#FAF9F6]">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleTimer}
            className="px-6 py-2.5 rounded-full bg-[#8B7BE8] hover:bg-[#7968db] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Pause Timer' : 'Start Focus Interval'}</span>
          </button>
          <button
            onClick={resetTimer}
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-colors"
            title="Reset Pomodoro"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Focus Sessions Completed Today: <strong className="text-[#8B7BE8]">{sessionsCompleted}</strong> (75 mins focused)
        </div>
      </div>

      {/* Eisenhower Matrix */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
              Eisenhower Task Prioritization Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Stop letting urgent distractions displace deeply important learning.
            </p>
          </div>
        </div>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            required
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="New assignment or study task..."
            className="flex-1 text-xs px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          />
          <select
            value={newTaskQuad}
            onChange={(e) => setNewTaskQuad(e.target.value as any)}
            className="text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          >
            <option value="urgent_important">Urgent & Important (Do First)</option>
            <option value="important_not_urgent">Important, Not Urgent (Schedule)</option>
            <option value="urgent_not_important">Urgent, Not Important (Delegate/Quick)</option>
            <option value="neither">Neither (Deprioritize)</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
          >
            Add Task
          </button>
        </form>

        {/* 4 Quadrants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Quad 1 */}
          <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-3">
            <div className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider">
              1. Urgent & Important (Do Today)
            </div>
            <div className="space-y-1.5">
              {tasks.filter((t) => t.quadrant === 'urgent_important').map((t) => (
                <div
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-800 border border-rose-100 dark:border-rose-900/30 text-xs cursor-pointer"
                >
                  <input type="checkbox" checked={t.completed} readOnly className="rounded text-rose-600" />
                  <span className={t.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}>
                    {t.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quad 2 */}
          <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 space-y-3">
            <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
              2. Important, Not Urgent (Deep Work)
            </div>
            <div className="space-y-1.5">
              {tasks.filter((t) => t.quadrant === 'important_not_urgent').map((t) => (
                <div
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900/30 text-xs cursor-pointer"
                >
                  <input type="checkbox" checked={t.completed} readOnly className="rounded text-indigo-600" />
                  <span className={t.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}>
                    {t.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
