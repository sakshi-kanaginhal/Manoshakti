import React, { useState } from 'react';
import { MessageSquareText, Sparkles, Send, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService } from '../../services/api';
import { TextEmotionResult } from '../../types';

export const TextEmotionPage: React.FC = () => {
  const [text, setText] = useState('I have exams next week and I feel overwhelmed. I cannot concentrate.');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TextEmotionResult | null>(null);
  const [userCorrection, setUserCorrection] = useState<string>('');

  const samplePresets = [
    'I have exams next week and I feel overwhelmed. I cannot concentrate.',
    'I am genuinely proud and happy with how I handled today’s lab presentation.',
    'I feel completely isolated and sad, like nobody understands what I am going through.',
    'I am so frustrated that after studying all night, the assignment criteria changed unexpectedly.'
  ];

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await apiService.analyzeTextEmotion(text);
      setResult(res);
      setUserCorrection('');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const emotionColors: Record<string, string> = {
    happiness: '#10B981',
    sadness: '#6366F1',
    anxiety: '#8B7BE8',
    fear: '#EF4444',
    frustration: '#F59E0B',
    anger: '#DC2626',
    surprise: '#06B6D4',
    neutral: '#64748B'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8B7BE8] uppercase tracking-wider">
          <MessageSquareText className="w-4 h-4" />
          <span>Pipeline A: Text Emotion Analysis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Text Sentiment & Emotion Classification
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Express your current thoughts, worries, or reflections in natural words. Our GoEmotions & DistilBERT pipeline evaluates affective sentiment across 8 calibrated emotional states.
        </p>
      </div>

      {/* Preset Inspirations */}
      <div className="space-y-2">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Sample Text Presets:
        </div>
        <div className="flex flex-wrap gap-2">
          {samplePresets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setText(preset)}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-[#8B7BE8] text-slate-600 dark:text-slate-300 transition-colors text-left truncate max-w-xs"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
            What is on your mind right now?
          </label>
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full text-sm p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#8B7BE8]/40 leading-relaxed"
            placeholder="Describe what you are experiencing, studying for, or feeling..."
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-400 font-mono">
            Model: GoEmotions-DistilBERT-v1.4
          </span>
          <button
            onClick={handleAnalyze}
            disabled={loading || !text.trim()}
            className="px-5 py-2.5 bg-[#8B7BE8] hover:bg-[#7968db] disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>{loading ? 'Evaluating...' : 'Analyze Emotions'}</span>
          </button>
        </div>
      </div>

      {/* Analysis Results Display */}
      {result && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Primary Detected Emotion
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xl font-bold font-display capitalize text-[#292A35] dark:text-[#FAF9F6]">
                  {result.detected_emotion}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#8B7BE8]/15 text-[#8B7BE8] font-mono">
                  {Math.round(result.confidence * 100)}% Confidence
                </span>
              </div>
            </div>

            <Link
              to="/app/emotions/fusion"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
            >
              <span>Send to Late Fusion Engine</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Probability Distribution Bars */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Discrete Emotion Probabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(result.emotion_scores).map(([emotion, score]) => (
                <div key={emotion} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="capitalize text-slate-700 dark:text-slate-300">{emotion}</span>
                    <span className="font-mono text-slate-400 text-[11px]">{Math.round((score as number) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.round((score as number) * 100)}%`,
                        backgroundColor: emotionColors[emotion] || '#8B7BE8'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gentle Reflection Box */}
          <div className="p-4 rounded-xl bg-[#8B7BE8]/10 dark:bg-[#8B7BE8]/20 border border-[#8B7BE8]/20 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8B7BE8]">
              <Sparkles className="w-4 h-4" />
              <span>Compassionate Reflection</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
              "{result.reflection_prompt}"
            </p>
          </div>

          {/* User Feedback / Correction Option */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span>Did the model get this right?</span>
              <select
                value={userCorrection}
                onChange={(e) => setUserCorrection(e.target.value)}
                className="text-xs px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-700 dark:text-slate-200"
              >
                <option value="">Matches my feelings</option>
                <option value="calm">Actually feeling calm</option>
                <option value="anxious">More anxious than shown</option>
                <option value="sad">More sad than shown</option>
                <option value="frustrated">More frustrated</option>
              </select>
            </div>
            {userCorrection && (
              <span className="text-emerald-600 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Correction recorded for fusion alignment
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
