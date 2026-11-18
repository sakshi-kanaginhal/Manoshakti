import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Trash2,
  Minimize2,
  Maximize2,
  Heart,
  Copy,
  Check,
  Bot,
  User as UserIcon,
  Wind,
  ShieldCheck,
  AlertCircle,
  Flame,
  ArrowRight
} from 'lucide-react';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isCrisis?: boolean;
  recommendedActions?: string[];
  isAffirmation?: boolean;
}

const STORAGE_CHAT_KEY = 'manoshakti_positive_vibe_chat_history';

export const PositiveVibeChatbot: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [vibeLoading, setVibeLoading] = useState(false);
  const [activeTopic, setActiveTopic] = useState<string>('positivity');

  // Load chat messages from localStorage or initialize with warm greeting
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CHAT_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    const firstName = user?.full_name ? user.full_name.split(' ')[0] : 'friend';
    return [
      {
        id: 'welcome-1',
        sender: 'assistant',
        content: `Hey ${firstName}! ✨ I am Mano, your positive vibes companion. Whether you need a boost of encouragement, a calm breath to handle study pressure, or just someone warm to chat with—I'm right here with you. How are you feeling right now?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedActions: ['Send Positive Vibes ✨', 'Feeling Overwhelmed 🌱', 'Study Motivation 📚']
      }
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CHAT_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  // Text to speech function
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    // Strip markdown or extra symbols for clean speech
    const clean = text.replace(/[*_#•✨🌟💛🌿]/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 0.95; // Gentle, calming pace
    utterance.pitch = 1.05; // Friendly, warm tone
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string, topic?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      // Pass recent messages as history for multi-turn conversational context
      const historyPayload = messages.slice(-6).map((m) => ({
        sender: m.sender,
        content: m.content
      }));

      const res = await apiService.chatWithMano(text, historyPayload, topic || activeTopic);

      const botMessage: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        sender: 'assistant',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCrisis: res.isCrisis,
        recommendedActions: res.recommendedActions
      };

      setMessages((prev) => [...prev, botMessage]);

      if (voiceEnabled) {
        speakText(res.reply);
      }
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Instant Vibe Booster Generator
  const handleGeneratePositiveVibe = async (category: string = 'uplift', feelingPrompt?: string) => {
    setVibeLoading(true);
    try {
      const res = await apiService.getPositiveVibe(category, feelingPrompt);
      const vibeMessage: ChatMessage = {
        id: 'vibe-' + Date.now(),
        sender: 'assistant',
        content: `✨ **Here is your personalized positive vibe:**\n\n${res.vibe}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAffirmation: true,
        recommendedActions: ['I needed this 💛', 'Another vibe please 🌟', 'Let’s talk more']
      };
      setMessages((prev) => [...prev, vibeMessage]);
      if (voiceEnabled) {
        speakText(res.vibe);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setVibeLoading(false);
    }
  };

  const handleClearChat = () => {
    const firstName = user?.full_name ? user.full_name.split(' ')[0] : 'friend';
    const resetMessages: ChatMessage[] = [
      {
        id: 'reset-1',
        sender: 'assistant',
        content: `Chat history refreshed! Ready for fresh positive vibes, ${firstName}? Tell me what's on your mind. ✨`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedActions: ['Send Positive Vibes ✨', 'Feeling Overwhelmed 🌱', 'Study Motivation 📚']
      }
    ];
    setMessages(resetMessages);
    localStorage.removeItem(STORAGE_CHAT_KEY);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickVibes = [
    { label: '✨ Send positive vibes', text: 'Please send me some uplifting positive vibes and encouragement today!' },
    { label: '🌱 Feeling overwhelmed', text: 'I am feeling overwhelmed with everything on my plate. Can you help me calm my mind?' },
    { label: '📚 Study & exam motivation', text: 'I need some focus and motivation for my studies without burning out.' },
    { label: '💛 Self-compassion boost', text: 'I am being really harsh on myself today. How can I practice self-compassion?' },
    { label: '🎯 Celebrate a win', text: 'I completed a task I was avoiding! Can we celebrate this small win?' }
  ];

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Friendly prompt bubble for first-time visitors */}
          <div className="hidden sm:flex items-center gap-2 py-2 px-3.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-lg text-xs font-medium text-slate-700 dark:text-slate-200 animate-bounce">
            <Sparkles className="w-4 h-4 text-[#8B7BE8] animate-spin" />
            <span>Need positive vibes? Chat with Mano!</span>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            aria-label="Open Positive Vibes Chatbot"
          >
            {/* Pulsing ring animation */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] opacity-40 blur-xs group-hover:opacity-60 transition-opacity animate-pulse" />
            <Bot className="w-7 h-7 relative z-10" />
            <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full z-20" />
          </button>
        </div>
      )}

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col transition-all duration-200 overflow-hidden ${
            isMinimized ? 'h-16' : 'h-[620px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-[#8B7BE8]/10 via-[#70B8AA]/10 to-transparent border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] flex items-center justify-center text-white font-bold text-base shadow-xs">
                  M
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Mano AI
                  </h3>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#8B7BE8]/15 text-[#8B7BE8] dark:text-[#A9C7E8] text-[10px] font-semibold">
                    Positive Vibes
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span>Always here to listen & uplift</span>
                </p>
              </div>
            </div>

            {/* Header Tools */}
            <div className="flex items-center gap-1 text-slate-400">
              {/* Voice Readout Toggle */}
              <button
                type="button"
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled);
                  if (voiceEnabled && 'speechSynthesis' in window) {
                    window.speechSynthesis.cancel();
                  }
                }}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  voiceEnabled
                    ? 'text-[#8B7BE8] bg-[#8B7BE8]/10'
                    : 'hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                title={voiceEnabled ? 'Mute voice read-out' : 'Enable voice read-out'}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Clear History */}
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 rounded-lg hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                title="Clear conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Minimize/Expand */}
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                title={isMinimized ? 'Expand chat' : 'Minimize chat'}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>

              {/* Close */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Quick Vibe Chips Bar */}
              <div className="px-3 py-2 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {quickVibes.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(v.text)}
                    disabled={loading}
                    className="whitespace-nowrap px-2.5 py-1 text-[11px] font-medium rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#8B7BE8] hover:text-[#8B7BE8] text-slate-600 dark:text-slate-300 transition-colors shrink-0 shadow-2xs cursor-pointer"
                  >
                    {v.label}
                  </button>
                ))}
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/40">
                {messages.map((m) => {
                  const isUser = m.sender === 'user';
                  return (
                    <div
                      key={m.id}
                      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-2xs">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div className={`max-w-[85%] space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}>
                        {/* Bubble */}
                        <div
                          className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                            isUser
                              ? 'bg-[#8B7BE8] text-white rounded-br-xs shadow-xs'
                              : m.isCrisis
                              ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-800 rounded-bl-xs'
                              : m.isAffirmation
                              ? 'bg-gradient-to-br from-amber-50 to-purple-50 dark:from-slate-800 dark:to-purple-950/30 text-slate-800 dark:text-slate-100 border border-amber-200/80 dark:border-purple-800/50 rounded-bl-xs shadow-xs'
                              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700 rounded-bl-xs shadow-2xs'
                          }`}
                        >
                          <div className="whitespace-pre-wrap">{m.content}</div>

                          {/* Message Footer Actions */}
                          {!isUser && (
                            <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 dark:border-slate-700/60 text-[10px] text-slate-400">
                              <span>{m.timestamp}</span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => speakText(m.content)}
                                  className="hover:text-[#8B7BE8] transition-colors"
                                  title="Listen to this message"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(m.id, m.content)}
                                  className="hover:text-[#8B7BE8] transition-colors"
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

                        {/* Recommended Action Buttons */}
                        {m.recommendedActions && m.recommendedActions.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {m.recommendedActions.map((act, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSendMessage(act)}
                                disabled={loading}
                                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-[#8B7BE8]/10 text-[#8B7BE8] dark:text-[#A9C7E8] border border-slate-200 dark:border-slate-700 hover:border-[#8B7BE8] transition-all flex items-center gap-1 shadow-2xs cursor-pointer"
                              >
                                <span>{act}</span>
                                <ArrowRight className="w-3 h-3 opacity-60" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Loading / Typing Indicator */}
                {loading && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 animate-fadeIn">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] flex items-center justify-center text-white shrink-0 shadow-2xs">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="px-3.5 py-2.5 bg-white dark:bg-slate-800 rounded-2xl rounded-bl-xs border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-2xs">
                      <span className="w-1.5 h-1.5 bg-[#8B7BE8] rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-[#70B8AA] rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-[#A9C7E8] rounded-full animate-bounce" />
                      <span className="text-[11px] text-slate-400 font-medium pl-1">
                        Mano is crafting warm positive vibes...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700/80 shrink-0 space-y-2">
                {/* Instant Affirmation Generator Bar */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleGeneratePositiveVibe('uplift')}
                    disabled={vibeLoading || loading}
                    className="text-[11px] font-semibold text-[#8B7BE8] hover:text-[#70B8AA] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{vibeLoading ? 'Generating Vibe...' : 'Instant Positive Vibe Boost ✨'}</span>
                  </button>
                  <span className="text-[10px] text-slate-400">Powered by Gemini 3.8 Flash</span>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Talk with Mano... share how you feel"
                    disabled={loading}
                    className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8B7BE8] transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="p-2.5 rounded-xl bg-[#8B7BE8] hover:bg-[#7968db] disabled:opacity-40 text-white shadow-xs transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-[10px] text-center text-slate-400">
                  Mano is an empathetic companion for mental strength. In crisis, call 14416 (India) or 988.
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
