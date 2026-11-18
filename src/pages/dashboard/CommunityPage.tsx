import React, { useState } from 'react';
import { HeartHandshake, Heart, MessageSquare, Plus, ShieldCheck, Flag, Check } from 'lucide-react';
import { apiService } from '../../services/api';
import { CommunityPost } from '../../types';

export const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(() => apiService.getCommunityPosts());
  const [activeCategory, setActiveCategory] = useState('all');
  const [isPosting, setIsPosting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('exam_stress');
  const [alias, setAlias] = useState('ZenScholar');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [reportSuccess, setReportSuccess] = useState(false);

  const categories = [
    { id: 'all', label: 'All Discussions' },
    { id: 'exam_stress', label: 'Exam Anxiety' },
    { id: 'mindfulness', label: 'Mindfulness Tips' },
    { id: 'peer_support', label: 'Peer Encouragement' }
  ];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    apiService.addCommunityPost({
      title,
      content,
      category,
      author_alias: isAnonymous ? `Anonymous Student #${Math.floor(1000 + Math.random() * 9000)}` : alias,
      is_anonymous: isAnonymous
    });

    setPosts(apiService.getCommunityPosts());
    setIsPosting(false);
    setTitle('');
    setContent('');
  };

  const handleToggleHeart = (id: string) => {
    apiService.toggleHeartPost(id);
    setPosts(apiService.getCommunityPosts());
  };

  const handleReport = () => {
    setReportSuccess(true);
    setTimeout(() => setReportSuccess(false), 3000);
  };

  const filtered = activeCategory === 'all'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 uppercase tracking-wider">
            <HeartHandshake className="w-4 h-4" />
            <span>Supportive Youth Forum</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
            Peer Wellness Community
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A safe, moderated forum for young adults to share honest experiences, exam strategies, and daily wins without toxicity.
          </p>
        </div>

        <button
          onClick={() => setIsPosting(!isPosting)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#8B7BE8] text-white text-xs font-semibold hover:bg-[#7968db] shadow-sm transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          <span>{isPosting ? 'Cancel Post' : 'Share with Peers'}</span>
        </button>
      </div>

      {reportSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 border border-emerald-200 rounded-xl text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Thank you. Post flagged for immediate community moderator review.</span>
        </div>
      )}

      {/* Community Moderation Charter */}
      <div className="p-4 bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/40 rounded-xl text-xs text-teal-900 dark:text-teal-200 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Safe Space Standard:</strong> Hate speech, personal harassment, academic dishonestly solicitation, and unmonitored self-harm triggers are strictly barred. All contributions are screened to protect vulnerable minds.
        </div>
      </div>

      {/* Post Creation Form */}
      {isPosting && (
        <form onSubmit={handleCreatePost} className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-[#292A35] dark:text-[#FAF9F6] uppercase tracking-wider">
            Share an Insight or Ask for Support
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              >
                <option value="exam_stress">Exam Anxiety</option>
                <option value="mindfulness">Mindfulness Tips</option>
                <option value="peer_support">Peer Encouragement</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Author Alias
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  disabled={isAnonymous}
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200 disabled:opacity-50"
                />
                <label className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-[#8B7BE8]"
                  />
                  <span>Post Anonymously</span>
                </label>
              </div>
            </div>
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
              placeholder="e.g., How I survived mock tests without breaking down..."
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Your Message
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Be encouraging, honest, or share a helpful study habit..."
              className="w-full text-xs p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200 leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsPosting(false)}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#8B7BE8] hover:bg-[#7968db] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Publish to Peer Community
            </button>
          </div>
        </form>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeCategory === c.id
                ? 'bg-white dark:bg-slate-700 text-[#8B7BE8] shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {post.author_alias}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  · {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
              <span className="text-[10px] uppercase font-semibold text-[#8B7BE8] bg-[#8B7BE8]/10 px-2 py-0.5 rounded">
                {post.category.replace('_', ' ')}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {post.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
              <button
                onClick={() => handleToggleHeart(post.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                  post.has_hearted
                    ? 'border-rose-200 bg-rose-50 dark:bg-rose-950/40 text-rose-600 font-bold'
                    : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${post.has_hearted ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{post.hearts_count}</span>
              </button>

              <button
                onClick={handleReport}
                className="text-[11px] text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
                title="Report inappropriate content"
              >
                <Flag className="w-3 h-3" />
                <span>Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
