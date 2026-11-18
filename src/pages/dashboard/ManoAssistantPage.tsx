import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  ShieldAlert,
  PhoneCall,
  RefreshCw,
  HeartHandshake,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Flame,
  Wind,
  Heart,
  Smile,
  Zap,
  ArrowRight
} from 'lucide-react';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isCrisis?: boolean;
  recommendedActions?: string[];
  isAffirmation?: boolean;
}

export const ManoAssistantPage: React.FC = () => {
  const { user } = useAuth();
  const firstName = user?.full_name ? user.full_name.split(' ')[0] : 'friend';

  const [vibeTheme, setVibeTheme] = useState<string>('uplift');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [generatingVibe, setGeneratingVibe] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      content: `Hello ${firstName}! ✨ I am Mano, your positive vibes companion. I'm here to chat through whatever you are experiencing, celebrate your unique strengths, and help you find calm focus. How is your mind and energy feeling today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recommendedActions: ['Send Me Positive Vibes ✨', 'Overwhelmed with Exams 🌱', 'Need Focus & Momentum 🚀']
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*_#•✨🌟💛🌿]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const vibeThemes = [
    { id: 'uplift', label: '✨ General Positivity', prompt: 'I need an uplifting positive vibe boost to brighten my spirits today.' },
    { id: 'calm', label: '🌿 Calm Academic Anxiety', prompt: 'I am stressed about my studies and need gentle reassurance and focus.' },
    { id: 'courage', label: '💪 Inner Strength & Confidence', prompt: 'I am feeling self-doubt and need a boost of inner courage and mental strength.' },
    { id: 'self_care', label: '💛 Self-Compassion', prompt: 'I am being very harsh on myself and need help treating myself with patience and kindness.' },
    { id: 'celebrate', label: '🎯 Celebrate a Small Win', prompt: 'I want to celebrate a win today, no matter how small it might seem!' }
  ];

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        sender: m.sender,
        content: m.content
      }));

      const res = await apiService.chatWithMano(text, historyPayload, vibeTheme);
      const asstMsg: Message = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCrisis: res.isCrisis,
        recommendedActions: res.recommendedActions
      };
      setMessages((prev) => [...prev, asstMsg]);

      if (voiceEnabled) {
        speakText(res.reply);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInstantVibe = async () => {
    setGeneratingVibe(true);
    try {
      const res = await apiService.getPositiveVibe(vibeTheme);
      const vibeMsg: Message = {
        id: 'vibe-' + Date.now(),
        sender: 'assistant',
        content: `✨ **Personalized Positive Vibe Boost:**\n\n${res.vibe}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAffirmation: true,
        recommendedActions: ['I needed this 💛', 'Another vibe please 🌟', 'Let’s talk more']
      };
      setMessages((prev) => [...prev, vibeMsg]);
      if (voiceEnabled) {
        speakText(res.vibe);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingVibe(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 flex flex-col h-[calc(100vh-6.5rem)]">
      {/* Top Header Card */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#8B7BE8]/10 via-[#70B8AA]/10 to-transparent rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              M
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
                Mano Positive Vibes Companion
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#8B7BE8]/15 text-[#8B7BE8] dark:text-[#A9C7E8] rounded-full">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Conversational wellness guide for calm reflection, optimism, and mental strength.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Voice Readout Toggle */}
          <button
            type="button"
            onClick={() => {
              setVoiceEnabled(!voiceEnabled);
              if (voiceEnabled && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
            }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
              voiceEnabled
                ? 'bg-[#8B7BE8]/15 text-[#8B7BE8] border-[#8B7BE8]'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#8B7BE8]'
            }`}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>{voiceEnabled ? 'Voice On' : 'Voice Off'}</span>
          </button>

          {/* Instant Vibe Button */}
          <button
            type="button"
            onClick={handleGenerateInstantVibe}
            disabled={generatingVibe || loading}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#8B7BE8] hover:bg-[#7968db] text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-60"
          >
            <Sparkles className="w-4 h-4" />
            <span>{generatingVibe ? 'Spreading Vibes...' : 'Instant Vibe ✨'}</span>
          </button>
        </div>
      </div>

      {/* Vibe Mode Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 px-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 shrink-0">
          Vibe Mode:
        </span>
        {vibeThemes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => {
              setVibeTheme(theme.id);
              handleSend(theme.prompt);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
              vibeTheme === theme.id
                ? 'bg-white dark:bg-slate-800 border-[#8B7BE8] text-[#8B7BE8] shadow-2xs font-semibold'
                : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            {theme.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6 shadow-2xs space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs mt-0.5">
                  M
                </div>
              )}

              <div className="max-w-[85%] sm:max-w-[78%] space-y-2">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#8B7BE8] text-white rounded-br-xs shadow-xs'
                      : m.isCrisis
                      ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200 rounded-bl-xs font-medium'
                      : m.isAffirmation
                      ? 'bg-gradient-to-br from-amber-50 to-purple-50 dark:from-slate-850 dark:to-purple-950/30 text-slate-800 dark:text-slate-100 border border-amber-200 dark:border-purple-800/50 rounded-bl-xs shadow-2xs'
                      : 'bg-[#FAF9F6] dark:bg-slate-900/80 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.content}</div>

                  {/* Message Tools (Listen / Copy) */}
                  {!isUser && (
                    <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-400">
                      <span>{m.timestamp}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => speakText(m.content)}
                          className="hover:text-[#8B7BE8] transition-colors p-1"
                          title="Listen to message"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(m.id, m.content)}
                          className="hover:text-[#8B7BE8] transition-colors p-1"
                          title="Copy text"
                        >
                          {copiedId === m.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Crisis Emergency Callout */}
                {m.isCrisis && (
                  <div className="p-3 bg-rose-100 dark:bg-rose-950/60 rounded-xl border border-rose-300 dark:border-rose-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 font-bold text-rose-800 dark:text-rose-200">
                      <PhoneCall className="w-4 h-4" />
                      <span>Call Tele-MANAS: 14416 (24/7 Toll-Free)</span>
                    </div>
                    <a
                      href="tel:14416"
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded font-semibold text-[11px]"
                    >
                      Dial Now
                    </a>
                  </div>
                )}

                {/* Recommended Positive Actions / Prompts */}
                {m.recommendedActions && m.recommendedActions.length > 0 && !m.isCrisis && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {m.recommendedActions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(act)}
                        disabled={loading}
                        className="text-[11px] px-3 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-[#8B7BE8]/10 text-[#8B7BE8] dark:text-[#A9C7E8] border border-slate-200 dark:border-slate-700 hover:border-[#8B7BE8] font-medium transition-all shadow-2xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>{act}</span>
                        <ArrowRight className="w-3 h-3 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3 animate-fadeIn">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] text-white flex items-center justify-center text-xs font-bold shadow-2xs">
              M
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl rounded-bl-xs border border-slate-200 dark:border-slate-700 text-xs text-slate-500 flex items-center gap-2 shadow-2xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#8B7BE8]" />
              <span>Mano is radiating thoughtful positive reflection...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 shrink-0 bg-white dark:bg-slate-800 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Talk with Mano... share how you're feeling or ask for positive vibes"
          className="flex-1 text-xs px-3.5 py-2.5 bg-transparent focus:outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2.5 rounded-xl bg-[#8B7BE8] hover:bg-[#7968db] disabled:opacity-40 text-white transition-colors cursor-pointer disabled:cursor-not-allowed shadow-xs"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
