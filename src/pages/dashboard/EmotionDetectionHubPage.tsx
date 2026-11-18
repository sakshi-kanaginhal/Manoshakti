import React from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  MessageSquareText,
  Mic,
  Camera,
  Layers,
  ShieldCheck,
  ArrowRight,
  Info
} from 'lucide-react';

export const EmotionDetectionHubPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8B7BE8] uppercase tracking-wider">
          <BrainCircuit className="w-4 h-4" />
          <span>Core AI/ML Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Multimodal Emotion Detection Hub
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          ManoShakti uses three independent sensory channels to evaluate emotional indicators. 
          Each channel operates autonomously, respecting privacy and acknowledging its own physiological limitations, 
          before being combined in our Late Multimodal Fusion Engine.
        </p>
      </div>

      {/* Ethical Guardrail Banner */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Ethical AI Guardrail:</strong> Emotional state predictions are reflective indicators to foster self-awareness, NOT medical or psychiatric diagnoses. You always retain epistemic authority over your internal feelings.
        </div>
      </div>

      {/* 3 Pipeline Cards + Fusion Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pipeline 1: Text */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#8B7BE8]/15 text-[#8B7BE8] flex items-center justify-center">
              <MessageSquareText className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-slate-400">Pipeline A</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
              Text Emotion Analysis
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Based on GoEmotions taxonomy and DistilBERT architecture. Evaluates subjective descriptions across 8 discrete affective states.
            </p>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <div>• 8 classes: Happiness, Sadness, Anger, Fear, Anxiety, Frustration, Surprise, Neutral</div>
            <div>• Calibrated confidence scores with self-reflection prompts</div>
          </div>
          <Link
            to="/app/emotions/text"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B7BE8] hover:underline pt-2"
          >
            <span>Analyze Text Emotion</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Pipeline 2: Voice */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#70B8AA]/15 text-[#70B8AA] flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-slate-400">Pipeline B</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
              Voice Acoustic Analysis
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Acoustic feature extractor examining fundamental frequency (pitch), vocal energy (RMS), speech tempo, and hesitation pause rates.
            </p>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <div>• Real-time Web Audio API waveform visualizer</div>
            <div>• Somatic arousal estimation without permanent audio storage</div>
          </div>
          <Link
            to="/app/emotions/voice"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#70B8AA] hover:underline pt-2"
          >
            <span>Analyze Voice Acoustics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Pipeline 3: Facial */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono text-slate-400">Pipeline C</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
              Facial Landmark Analysis
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Evaluates visible facial muscle coordinates (smiling curvature, corrugator brow furrowing, raised eyebrows) with quantified uncertainty.
            </p>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <div>• Zero raw image or biometric template storage</div>
            <div>• Explicit disclaimer that visible expression ≠ internal emotion</div>
          </div>
          <Link
            to="/app/emotions/facial"
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-500 hover:underline pt-2"
          >
            <span>Analyze Facial Landmarks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Pipeline 4: Multimodal Fusion */}
        <div className="p-6 bg-gradient-to-br from-[#8B7BE8]/15 via-white to-white dark:via-slate-800 dark:to-slate-800 rounded-2xl border border-[#8B7BE8]/30 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#8B7BE8] text-white flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-xs font-mono font-bold text-[#8B7BE8]">Synthesizer</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
              Multimodal Late Fusion Engine
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Combines available inputs with weighted confidence. Gracefully detects discordance (e.g. typing grief while smiling) and poses empathetic questions.
            </p>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <div>• Dynamic weights handle missing modalities</div>
            <div>• Gentle reflection inquiries without accusations</div>
          </div>
          <Link
            to="/app/emotions/fusion"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B7BE8] hover:underline pt-2"
          >
            <span>Open Fusion Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
