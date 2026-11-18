import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Wind,
  BookOpen,
  Users,
  RefreshCw,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiService } from '../../services/api';
import { MultimodalFusionResult } from '../../types';

export const MultimodalFusionPage: React.FC = () => {
  // Modality configurations
  const [selectedTextEmotion, setSelectedTextEmotion] = useState('anxiety');
  const [selectedVoiceState, setSelectedVoiceState] = useState('Anxious / Agitated Cadence');
  const [selectedFacialState, setSelectedFacialState] = useState('Gentle Smile / Receptive');
  const [moodScore, setMoodScore] = useState<number>(5);

  const [fusionResult, setFusionResult] = useState<MultimodalFusionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [userAlignment, setUserAlignment] = useState<string>('');

  const handleRunFusion = async () => {
    setLoading(true);
    const textData: any = { detected_emotion: selectedTextEmotion };
    const voiceData: any = { predicted_state: selectedVoiceState };
    const faceData: any = { predicted_expression: selectedFacialState };

    const res = await apiService.fuseModalities({
      text_emotion: textData,
      voice_state: voiceData,
      facial_expression: faceData,
      reported_mood_score: moodScore
    });

    setFusionResult(res);
    setLoading(false);
    setUserAlignment('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8B7BE8] uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Multimodal Late Fusion Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Multimodal Emotional Synthesis
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Synthesizes voluntary self-report text, acoustic speech tempo, and visible facial muscle landmarks into a cohesive wellness profile. Designed with late fusion weighting to respect human nuance.
        </p>
      </div>

      {/* Input Modality Selectors Card */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-6">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Configure Inputs for Fusion Test
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Pipeline A: Text Emotion (GoEmotions)
            </label>
            <select
              value={selectedTextEmotion}
              onChange={(e) => setSelectedTextEmotion(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              <option value="anxiety">Anxiety / Overwhelmed ("Exams next week...")</option>
              <option value="sadness">Sadness / Low Energy ("Feeling alone...")</option>
              <option value="happiness">Happiness / Joy ("Proud of seminar...")</option>
              <option value="frustration">Frustration / Blocked ("Can't solve assignment...")</option>
              <option value="neutral">Neutral Baseline ("Observing quietly...")</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Pipeline B: Voice Acoustics (Pitch & Cadence)
            </label>
            <select
              value={selectedVoiceState}
              onChange={(e) => setSelectedVoiceState(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              <option value="Anxious / Agitated Cadence">Anxious / Agitated Cadence (High pitch & tempo)</option>
              <option value="Steady / Calm Baseline">Steady / Calm Baseline (Normal cadence)</option>
              <option value="Fatigued / Low Energy">Fatigued / Low Energy (Subdued amplitude)</option>
              <option value="Animated / High Energy">Animated / High Energy</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Pipeline C: Facial Landmarks (Movement Cues)
            </label>
            <select
              value={selectedFacialState}
              onChange={(e) => setSelectedFacialState(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            >
              <option value="Happy / Radiant Joy">😄 Happy / Radiant Joy (AU12+AU6 Duchenne)</option>
              <option value="Smile / Warm Receptive">😊 Smile / Warm Receptive (AU12)</option>
              <option value="Sad / Melancholic Expression">😢 Sad / Melancholic (AU15 Downturn)</option>
              <option value="Cry / Weeping & Deep Distress">😭 Cry / Weeping Distress (AU15+AU4+AU1)</option>
              <option value="Angry / Intense Scowl">😠 Angry / Intense Scowl (AU4+AU24+AU26)</option>
              <option value="Frustrated / Exasperated Strain">😤 Frustrated / Exasperated Strain (AU4+AU17)</option>
              <option value="Calm / Neutral Resting Expression">🧘 Calm / Neutral Resting Expression</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Voluntary Self-Reported Mood ({moodScore} / 10)
            </label>
            <input
              type="range"
              min={1}
              max={10}
              value={moodScore}
              onChange={(e) => setMoodScore(parseInt(e.target.value, 10))}
              className="w-full accent-[#8B7BE8] mt-2 cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={handleRunFusion}
          disabled={loading}
          className="w-full py-3 bg-[#8B7BE8] hover:bg-[#7968db] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Layers className="w-4 h-4" />}
          <span>Synthesize Multimodal Fusion</span>
        </button>
      </div>

      {/* Fusion Output */}
      {fusionResult && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Fused Emotional State
              </span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
                  {fusionResult.fused_state}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#8B7BE8]/15 text-[#8B7BE8] font-mono">
                  {Math.round(fusionResult.overall_confidence * 100)}% Confidence
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span>Weights:</span>
              <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">Text 45%</span>
              <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">Mood 25%</span>
              <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">Voice 15%</span>
              <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">Face 15%</span>
            </div>
          </div>

          {/* Inconsistency Gentle Notification (if discordance occurs) */}
          {fusionResult.inconsistency_detected && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-900/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                <HelpCircle className="w-4 h-4" />
                <span>Nuance Inquiry: Divergent Sensory Signals</span>
              </div>
              <p className="text-xs text-amber-900/80 dark:text-amber-200/90 leading-relaxed">
                {fusionResult.inconsistency_note}
              </p>
              <div className="pt-2 text-xs sm:text-sm font-medium text-amber-900 dark:text-amber-100 italic">
                "{fusionResult.gentle_reflection_prompt}"
              </div>
            </div>
          )}

          {/* Actionable Recommendations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Personalized Coping & Wellness Next Steps
            </h4>
            <div className="space-y-2">
              {fusionResult.actionable_recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links to practice */}
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              to="/app/mindfulness"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8B7BE8] text-white text-xs font-semibold hover:bg-[#7968db] transition-colors"
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Practice Box Breathing</span>
            </Link>
            <Link
              to="/app/journal"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Write in Emotional Journal</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
