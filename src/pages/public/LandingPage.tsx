import React from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  MessageSquareHeart,
  Wind,
  GraduationCap,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Activity,
  HeartHandshake
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B7BE8] bg-[#8B7BE8]/10 dark:bg-[#8B7BE8]/20 px-3 py-1.5 rounded-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI-Powered Youth Mental Strength</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#292A35] dark:text-[#FAF9F6] font-display text-balance leading-tight">
                Understand Your Emotions. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#8B7BE8] via-[#70B8AA] to-[#8B7BE8] bg-clip-text text-transparent">
                  Strengthen Your Mind.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                A dedicated mental wellness companion built for students and young adults. 
                Explore your emotional patterns with multimodal AI, manage academic burnout with 
                vagal breathwork, and connect with certified counselors—safely, privately, and with zero judgment.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/register"
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#8B7BE8] hover:bg-[#7968db] rounded-lg shadow-sm transition-all flex items-center gap-2"
                >
                  <span>Start Your Wellness Journey</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/app/dashboard"
                  className="px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xs transition-all"
                >
                  Open Live Dashboard
                </Link>
              </div>

              {/* Trust markers */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Strict Data Privacy</span>
                </div>
                <div>·</div>
                <div>Zero Biometric Camera Storage</div>
                <div>·</div>
                <div>Evidence-Based Mindfulness</div>
              </div>
            </div>

            {/* Visual Hero Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 group">
                <img
                  src="/src/assets/images/hero_youth_wellness_1793628013174.jpg"
                  alt="Young adults practicing mindfulness and support on campus"
                  className="w-full h-[380px] sm:h-[440px] object-cover transition-transform duration-500 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-xs uppercase tracking-wider text-[#A9C7E8] font-semibold mb-1">
                    Daily Campus Pulse
                  </div>
                  <h3 className="text-lg font-bold">
                    Transforming Academic Pressure into Mindful Resilience
                  </h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Over 14,000 students tracking mood trends, vagal breathing, and exam peace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
            Architected for the Realities of Student Life
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            ManoShakti bridges the gap between everyday stress and clinical care with scientific, compassionate self-reflection tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#8B7BE8]/15 text-[#8B7BE8] flex items-center justify-center">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#292A35] dark:text-[#FAF9F6]">
              Multimodal Emotion Engine
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Three independent ML pipelines examine your typed reflections, speech acoustic tempo, and facial movement cues with late fusion logic that never judges or assumes smiling means happiness.
            </p>
            <Link
              to="/app/emotions"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B7BE8] hover:underline"
            >
              Explore Emotion Hub <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#70B8AA]/15 text-[#70B8AA] flex items-center justify-center">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#292A35] dark:text-[#FAF9F6]">
              Vagal Breathwork & Mindfulness
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Box Breathing 4-4-4-4, 4-7-8 deep relaxers, and 5-4-3-2-1 sensory grounding. Interactive visual pacers to physically downregulate your central nervous system before tests or presentations.
            </p>
            <Link
              to="/app/mindfulness"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#70B8AA] hover:underline"
            >
              Start Breathing Practice <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white dark:bg-slate-800/80 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-lg bg-[#A9C7E8]/25 text-indigo-600 dark:text-[#A9C7E8] flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-[#292A35] dark:text-[#FAF9F6]">
              Academic Wellness & Support
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pomodoro study blocks, exam anxiety trackers, and verified adolescent counselor directory. Seamlessly book consultations with licensed clinical psychologists when human care is needed.
            </p>
            <Link
              to="/app/academics"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-500 hover:underline"
            >
              Explore Academic Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid with Pictures */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            <img
              src="/src/assets/images/meditation_mindfulness_1793628015635.jpg"
              alt="Person practicing peaceful mindful meditation in morning sunlight"
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#70B8AA]">
              Vagus Nerve Activation
            </div>
            <h2 className="text-2xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
              Science-Backed Somatic Stress Relief
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              When study deadlines loom, intellectualizing calm is rarely enough. Our guided breathing exercises alter physiological heart-rate variability (HRV), triggering autonomic calm within 180 seconds.
            </p>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#70B8AA]"></span>
                Visual pulsing ring synchronized to 4-4-4-4 inhalation holding cadence
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#70B8AA]"></span>
                5-4-3-2-1 Sensory Grounding for sudden cognitive overwhelm
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#70B8AA]"></span>
                Private logs track your pre- and post-session heart rate and mood scores
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 md:order-1 order-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8B7BE8] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Positive Vibes & Mental Strength Companion</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
              Chat with Mano: Powered by Gemini 3.8 Flash
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Have warm, uplifting conversations anytime. Mano listens without judgment, celebrates your small victories, offers soothing perspective shifts when study stress mounts, and radiates genuine positive vibes to strengthen your mindset every day.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/app/assistant"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B7BE8] text-white text-xs font-semibold hover:bg-[#7968db] shadow-xs transition-all"
              >
                <MessageSquareHeart className="w-4 h-4" />
                <span>Chat for Positive Vibes ✨</span>
              </Link>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm md:order-2 order-1">
            <img
              src="/src/assets/images/student_study_zen_1793628014763.jpg"
              alt="Relaxed student studying at desk with books and tablet"
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Emergency Hotline Alert Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/20 dark:to-amber-950/20 p-8 rounded-2xl border border-rose-200 dark:border-rose-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-semibold text-sm">
              <PhoneCall className="w-4 h-4" />
              <span>24/7 Free & Confidential Crisis Support</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed">
              If you or someone you know is feeling suicidal or in acute emotional distress, help is available right now. You are never alone.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono font-medium text-slate-800 dark:text-slate-200 pt-1">
              <span>Tele-MANAS: <strong>14416</strong></span>
              <span>·</span>
              <span>KIRAN: <strong>1800-599-0019</strong></span>
              <span>·</span>
              <span>US/Intl: <strong>988</strong></span>
            </div>
          </div>
          <Link
            to="/crisis"
            className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs whitespace-nowrap transition-colors"
          >
            Access Safety Support Plan
          </Link>
        </div>
      </section>
    </div>
  );
};
