import React, { useState } from 'react';
import { BookOpen, Lock, Sparkles, Plus, Search, Tag, Check, Shield } from 'lucide-react';
import { apiService } from '../../services/api';
import { JournalEntry } from '../../types';

export const EmotionalJournalPage: React.FC = () => {
  const [journals, setJournals] = useState<JournalEntry[]>(() => apiService.getStoredJournals());
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Reflection']);
  const [selectedPrompt, setSelectedPrompt] = useState<string>('');
  const [search, setSearch] = useState('');

  const promptOptions = [
    'What is one heavy thought I am ready to set down before going to sleep?',
    'What went right today, even if it was as simple as drinking enough water?',
    'If a close friend were in my exact academic situation, what gentle advice would I give them?',
    'Where in my body am I holding physical tension right now, and what does it need?'
  ];

  const handleUsePrompt = (p: string) => {
    setSelectedPrompt(p);
    setTitle(p.slice(0, 40) + '...');
    setIsWriting(true);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    apiService.saveJournal({
      title,
      content,
      is_encrypted: true,
      prompt_used: selectedPrompt,
      tags
    });

    setJournals(apiService.getStoredJournals());
    setIsWriting(false);
    setTitle('');
    setContent('');
    setSelectedPrompt('');
  };

  const filtered = journals.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Private Sanctuary</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
            Emotional Journal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A safe space to untangle your inner world. Protected with client-side privacy encryption.
          </p>
        </div>

        <button
          onClick={() => setIsWriting(!isWriting)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#8B7BE8] text-white text-xs font-semibold hover:bg-[#7968db] shadow-sm transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          <span>{isWriting ? 'Close Journal Form' : 'Write New Entry'}</span>
        </button>
      </div>

      {/* Writing Box Form */}
      {isWriting && (
        <form onSubmit={handleSave} className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-1.5 text-emerald-600 font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span>Zero-Knowledge Private Storage</span>
            </div>
            {selectedPrompt && (
              <span className="text-slate-400 truncate max-w-xs text-[11px]">
                Prompt: {selectedPrompt}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Unwinding after the midterm exam..."
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#8B7BE8]/40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Reflective Writing
            </label>
            <textarea
              rows={6}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write freely. Your words are private and never evaluated as clinical data..."
              className="w-full text-xs p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#8B7BE8]/40 leading-relaxed"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag (e.g. Exams, Growth)..."
                className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Add Tag
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsWriting(false)}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#8B7BE8] hover:bg-[#7968db] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              Save Private Journal
            </button>
          </div>
        </form>
      )}

      {/* Prompt Inspiration Drawer */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Prompt Inspirations for Reflection</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {promptOptions.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleUsePrompt(p)}
              className="text-left text-xs p-2.5 rounded-lg border border-slate-200/70 dark:border-slate-700/80 hover:border-[#8B7BE8] text-slate-600 dark:text-slate-300 hover:text-[#8B7BE8] transition-colors"
            >
              "{p}"
            </button>
          ))}
        </div>
      </div>

      {/* Saved Entries List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#292A35] dark:text-[#FAF9F6]">
            Your Entries ({filtered.length})
          </h3>
          <div className="relative w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search journals..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((j) => (
            <div
              key={j.id}
              className="p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {j.title}
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">
                  {new Date(j.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                {j.content}
              </p>
              {j.tags && j.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {j.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
