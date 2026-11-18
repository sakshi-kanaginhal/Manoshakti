import React, { useState, useEffect, useRef } from 'react';
import { Wind, Play, Pause, RotateCcw, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';

export const MindfulnessPage: React.FC = () => {
  // Breathing state
  const [activeTab, setActiveTab] = useState<'box' | '478' | 'grounding' | 'affirmations'>('box');
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Hold Empty'>('Inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  // Box Breathing cycle: Inhale 4s -> Hold 4s -> Exhale 4s -> Hold Empty 4s
  useEffect(() => {
    let timer: any = null;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            // Transition phase
            if (activeTab === 'box') {
              if (breathPhase === 'Inhale') { setBreathPhase('Hold'); return 4; }
              if (breathPhase === 'Hold') { setBreathPhase('Exhale'); return 4; }
              if (breathPhase === 'Exhale') { setBreathPhase('Hold Empty'); return 4; }
              if (breathPhase === 'Hold Empty') {
                setBreathPhase('Inhale');
                setCyclesCompleted((c) => c + 1);
                return 4;
              }
            } else if (activeTab === '478') {
              if (breathPhase === 'Inhale') { setBreathPhase('Hold'); return 7; }
              if (breathPhase === 'Hold') { setBreathPhase('Exhale'); return 8; }
              if (breathPhase === 'Exhale') {
                setBreathPhase('Inhale');
                setCyclesCompleted((c) => c + 1);
                return 4;
              }
            }
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive, breathPhase, activeTab]);

  const toggleBreathing = () => {
    if (isBreathingActive) {
      setIsBreathingActive(false);
    } else {
      setIsBreathingActive(true);
      setBreathPhase('Inhale');
      setSecondsLeft(4);
    }
  };

  const resetBreathing = () => {
    setIsBreathingActive(false);
    setBreathPhase('Inhale');
    setSecondsLeft(4);
    setCyclesCompleted(0);
  };

  // 5-4-3-2-1 Grounding State
  const [groundingStep, setGroundingStep] = useState(0);
  const groundingSteps = [
    { count: 5, title: '5 Things You Can See', prompt: 'Look around your room. Name 5 distinct objects, colors, or shadows.' },
    { count: 4, title: '4 Things You Can Feel', prompt: 'Notice 4 physical textures (e.g. your feet on floor, sweater fabric, desk wood).' },
    { count: 3, title: '3 Things You Can Hear', prompt: 'Listen carefully. Identify 3 distant sounds (e.g. ambient breeze, clock tick, hum).' },
    { count: 2, title: '2 Things You Can Smell', prompt: 'Inhale gently. Notice 2 aromas around you (e.g. tea, fresh air, books).' },
    { count: 1, title: '1 Self-Compassion Truth', prompt: 'Speak or think: "I am safe in this present moment. I am doing my best."' }
  ];

  // Affirmations
  const affirmations = [
    'My grades and speed do not define my worth as a human being.',
    'I can take things one gentle breath at a time.',
    'Resting is not wasted time; it is how my brain organizes wisdom.',
    'I am resilient, capable of learning, and worthy of peace.',
    'Anxiety is just an internal alarm, not a prophecy of failure.'
  ];
  const [affirmationIdx, setAffirmationIdx] = useState(0);

  // Audio Ambience Player (Web Audio API synthesis for Rain & Binaural)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  const toggleSoundscape = () => {
    if (isPlayingAudio) {
      audioContextRef.current?.close();
      audioContextRef.current = null;
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Create pink noise for gentle rain sound
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          data[i] = (b0 + b1 + b2) * 0.05;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800;

        const gain = ctx.createGain();
        gain.gain.value = 0.15;

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();

        setIsPlayingAudio(true);
      } catch (err) {
        console.warn('Audio synthesis not supported:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#70B8AA] uppercase tracking-wider">
          <Wind className="w-4 h-4" />
          <span>Vagal Regulation & Mindfulness</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Mindfulness & Vagus Nerve Regulation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Evidence-based somatic exercises designed to physiologically reduce heart-rate variability (HRV) stress markers and clear cognitive brain fog.
        </p>
      </div>

      {/* Segmented Control Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => { setActiveTab('box'); resetBreathing(); }}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'box'
              ? 'bg-white dark:bg-slate-700 text-[#8B7BE8] shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Box Breathing (4-4-4-4)
        </button>
        <button
          onClick={() => { setActiveTab('478'); resetBreathing(); }}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === '478'
              ? 'bg-white dark:bg-slate-700 text-[#70B8AA] shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          4-7-8 Deep Vagal Relaxer
        </button>
        <button
          onClick={() => setActiveTab('grounding')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'grounding'
              ? 'bg-white dark:bg-slate-700 text-indigo-500 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          5-4-3-2-1 Sensory Grounding
        </button>
        <button
          onClick={() => setActiveTab('affirmations')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'affirmations'
              ? 'bg-white dark:bg-slate-700 text-amber-500 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Positive Affirmations
        </button>
      </div>

      {/* Tab 1 & 2: Breathing Pacer */}
      {(activeTab === 'box' || activeTab === '478') && (
        <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs flex flex-col items-center justify-center space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
              {activeTab === 'box' ? 'Box Breathing (Sama Vritti)' : '4-7-8 Deep Vagus Nerve Relaxation'}
            </h3>
            <p className="text-xs text-slate-500">
              {activeTab === 'box'
                ? 'Equal count breathing: Inhale 4s, Hold 4s, Exhale 4s, Hold Empty 4s.'
                : 'Inhale quietly for 4s, hold for 7s, exhale whoosh through mouth for 8s.'}
            </p>
          </div>

          {/* Animated Visual Pulsing Ring */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer pulsating glow ring */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out ${
                isBreathingActive && breathPhase === 'Inhale'
                  ? 'scale-110 bg-[#8B7BE8]/20 border-2 border-[#8B7BE8]'
                  : isBreathingActive && breathPhase === 'Exhale'
                  ? 'scale-85 bg-[#70B8AA]/15 border-2 border-[#70B8AA]'
                  : 'scale-95 bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700'
              }`}
            />

            {/* Inner Core */}
            <div className="relative z-10 text-center space-y-1">
              <div className="text-2xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
                {isBreathingActive ? breathPhase : 'Ready'}
              </div>
              <div className="text-4xl font-extrabold font-mono text-[#8B7BE8]">
                {isBreathingActive ? `${secondsLeft}s` : '4s'}
              </div>
              {isBreathingActive && (
                <div className="text-[11px] text-slate-400 font-mono">
                  Cycles: {cyclesCompleted}
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleBreathing}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold text-white shadow-sm transition-all flex items-center gap-2 ${
                isBreathingActive
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : 'bg-[#8B7BE8] hover:bg-[#7968db]'
              }`}
            >
              {isBreathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isBreathingActive ? 'Pause Session' : 'Start Paced Breathing'}</span>
            </button>

            <button
              onClick={resetBreathing}
              className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title="Reset timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Ambient Soundscape Toggle */}
            <button
              onClick={toggleSoundscape}
              className={`p-2.5 rounded-full border transition-colors flex items-center gap-1.5 text-xs font-medium ${
                isPlayingAudio
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-600'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
              }`}
              title="Toggle rain audio soundscape"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">{isPlayingAudio ? 'Rain Sound On' : 'Rain Sound'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: 5-4-3-2-1 Sensory Grounding */}
      {activeTab === 'grounding' && (
        <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
              5-4-3-2-1 Sensory Grounding Technique
            </h3>
            <p className="text-xs text-slate-500">
              When panic or racing exam thoughts hijack your attention, sensory grounding forces your brain back into the physiological present.
            </p>
          </div>

          <div className="max-w-lg mx-auto p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-indigo-500 text-white font-bold font-mono text-xl flex items-center justify-center shadow-xs">
              {groundingSteps[groundingStep].count}
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {groundingSteps[groundingStep].title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {groundingSteps[groundingStep].prompt}
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-indigo-100 dark:border-indigo-900/40">
              <button
                disabled={groundingStep === 0}
                onClick={() => setGroundingStep((s) => Math.max(0, s - 1))}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-30"
              >
                Previous Step
              </button>
              <span className="text-[11px] font-mono text-slate-400">
                Step {groundingStep + 1} of 5
              </span>
              <button
                onClick={() => setGroundingStep((s) => (s + 1) % 5)}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
              >
                {groundingStep === 4 ? 'Restart Grounding' : 'Next Step'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Affirmations */}
      {activeTab === 'affirmations' && (
        <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-6 text-center">
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
              Positive Cognitive Reframing
            </h3>
            <p className="text-xs text-slate-500">
              Ground your mind in compassionate truths when self-criticism arises.
            </p>
          </div>

          <div className="max-w-xl mx-auto p-8 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-4">
            <Sparkles className="w-6 h-6 text-amber-500 mx-auto" />
            <p className="text-base sm:text-lg font-display font-semibold text-slate-800 dark:text-slate-100 italic leading-relaxed">
              "{affirmations[affirmationIdx]}"
            </p>
            <div className="pt-2">
              <button
                onClick={() => setAffirmationIdx((i) => (i + 1) % affirmations.length)}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Show Next Affirmation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
