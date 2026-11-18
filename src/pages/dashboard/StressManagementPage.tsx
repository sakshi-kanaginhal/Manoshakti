import React, { useState } from 'react';
import { Activity, CheckCircle2, ShieldCheck, ArrowRight, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StressManagementPage: React.FC = () => {
  // PSS-10 standard validated self-assessment items
  const questions = [
    'In the last month, how often have you been upset because of something that happened unexpectedly?',
    'In the last month, how often have you felt unable to control the important things in your life?',
    'In the last month, how often have you felt nervous and stressed?',
    'In the last month, how often have you felt confident about your ability to handle personal problems?',
    'In the last month, how often have you felt that things were going your way?',
    'In the last month, how often have you found that you could not cope with all the things you had to do?',
    'In the last month, how often have you been able to control irritations in your life?',
    'In the last month, how often have you felt that you were on top of things?',
    'In the last month, how often have you been angered because of things outside of your control?',
    'In the last month, how often have you felt difficulties were piling up so high you could not overcome them?'
  ];

  const reverseScored = [3, 4, 6, 7]; // 0-indexed items 4, 5, 7, 8

  const [answers, setAnswers] = useState<Record<number, number>>({
    0: 2, 1: 2, 2: 3, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2
  });

  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState('');

  const calculateScore = () => {
    let total = 0;
    for (let i = 0; i < 10; i++) {
      const val = answers[i] ?? 2;
      if (reverseScored.includes(i)) {
        total += (4 - val);
      } else {
        total += val;
      }
    }
    setScore(total);
    if (total <= 13) setLevel('Low Stress Baseline');
    else if (total <= 26) setLevel('Moderate Academic / Life Stress');
    else setLevel('Elevated Stress & Somatic Strain');
    setSubmitted(true);
  };

  const options = [
    { label: 'Never', value: 0 },
    { label: 'Almost Never', value: 1 },
    { label: 'Sometimes', value: 2 },
    { label: 'Fairly Often', value: 3 },
    { label: 'Very Often', value: 4 }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>Self-Assessment & Coping</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Perceived Stress Assessment (PSS-10)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          The Perceived Stress Scale is a widely recognized scientific instrument to measure how unpredictable, uncontrollable, and overloaded you feel in your academic and personal life.
        </p>
      </div>

      <div className="p-4 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-600 dark:text-slate-400">
        <strong>Self-Report Indicator:</strong> This assessment provides a benchmark of your subjective perception of pressure. It is <strong>not</strong> a diagnostic test for an anxiety disorder or depression.
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-2xs space-y-6">
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={idx} className="space-y-2 pb-4 border-b border-slate-100 dark:border-slate-700/60 last:border-0">
              <div className="text-xs font-medium text-slate-800 dark:text-slate-200">
                <span className="font-mono text-slate-400 mr-2">{idx + 1}.</span>
                {q}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, [idx]: opt.value })}
                    className={`py-2 px-2 text-xs rounded-lg border text-center transition-all ${
                      answers[idx] === opt.value
                        ? 'bg-[#8B7BE8] text-white border-[#8B7BE8] font-semibold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={calculateScore}
          className="w-full py-3 bg-[#8B7BE8] hover:bg-[#7968db] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
        >
          Calculate Stress Index & Recommendations
        </button>
      </div>

      {submitted && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Assessment Outcome
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
                  {level}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 font-mono">
                  PSS Score: {score} / 40
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Personalized Coping Toolkit
            </h4>
            <div className="space-y-2">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Practice 5-minute Box Breathing (Sama Vritti) twice daily, especially prior to exams or study blocks.</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Chunk academic assignments into 25-minute Pomodoro study intervals with strict 5-minute offline rests.</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>If stress feels unmanageable, consider booking a confidential session with a verified student counselor.</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <Link
              to="/app/mindfulness"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B7BE8] text-white text-xs font-semibold rounded-lg hover:bg-[#7968db] transition-colors"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Open Vagal Breathwork</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
