import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BrainCircuit,
  MessageSquareText,
  Mic,
  Camera,
  Layers,
  SmilePlus,
  BookOpen,
  Bot,
  Activity,
  Wind,
  GraduationCap,
  Sparkles,
  Users,
  CalendarCheck,
  HeartHandshake,
  ShieldAlert,
  User,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Sidebar: React.FC = () => {
  const { user, role, switchDemoRole } = useAuth();

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
      isActive
        ? 'bg-[#8B7BE8]/15 text-[#8B7BE8] dark:bg-[#8B7BE8]/25 dark:text-[#A9C7E8] font-semibold'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
    }`;

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col border-r border-slate-200/80 dark:border-slate-800 bg-[#FAF9F6] dark:bg-[#1A1B24] min-h-[calc(100vh-4rem)] p-4 transition-colors">
      <div className="flex-1 space-y-6 overflow-y-auto pr-1">
        {/* Section 1: Overview */}
        <div>
          <div className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 px-3 mb-2">
            Workspace
          </div>
          <div className="space-y-1">
            <NavLink to="/app/dashboard" end className={navItemClass}>
              <LayoutDashboard className="w-4 h-4 text-[#8B7BE8]" />
              <span>User Dashboard</span>
            </NavLink>
          </div>
        </div>

        {/* Section 2: Multimodal Emotion Engine */}
        <div>
          <div className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 px-3 mb-2">
            Emotion Detection Engine
          </div>
          <div className="space-y-1">
            <NavLink to="/app/emotions" end className={navItemClass}>
              <BrainCircuit className="w-4 h-4 text-[#70B8AA]" />
              <span>Detection Hub</span>
            </NavLink>
            <NavLink to="/app/emotions/text" className={navItemClass}>
              <MessageSquareText className="w-4 h-4" />
              <span>Text Analysis (GoEmotions)</span>
            </NavLink>
            <NavLink to="/app/emotions/voice" className={navItemClass}>
              <Mic className="w-4 h-4" />
              <span>Voice Acoustic Analysis</span>
            </NavLink>
            <NavLink to="/app/emotions/facial" className={navItemClass}>
              <Camera className="w-4 h-4" />
              <span>Facial Landmark Analysis</span>
            </NavLink>
            <NavLink to="/app/emotions/fusion" className={navItemClass}>
              <Layers className="w-4 h-4 text-[#8B7BE8]" />
              <span>Multimodal Late Fusion</span>
            </NavLink>
          </div>
        </div>

        {/* Section 3: Daily Reflection & Companion */}
        <div>
          <div className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 px-3 mb-2">
            Reflective Self-Care
          </div>
          <div className="space-y-1">
            <NavLink to="/app/mood" className={navItemClass}>
              <SmilePlus className="w-4 h-4 text-amber-500" />
              <span>Mood Tracker</span>
            </NavLink>
            <NavLink to="/app/journal" className={navItemClass}>
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span>Emotional Journal</span>
            </NavLink>
            <NavLink to="/app/assistant" className={navItemClass}>
              <Bot className="w-4 h-4 text-[#8B7BE8]" />
              <span>Mano AI Companion</span>
            </NavLink>
          </div>
        </div>

        {/* Section 4: Resilience & Academics */}
        <div>
          <div className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 px-3 mb-2">
            Youth Mental Fitness
          </div>
          <div className="space-y-1">
            <NavLink to="/app/stress" className={navItemClass}>
              <Activity className="w-4 h-4 text-rose-500" />
              <span>Stress Self-Assessment</span>
            </NavLink>
            <NavLink to="/app/mindfulness" className={navItemClass}>
              <Wind className="w-4 h-4 text-[#70B8AA]" />
              <span>Breathing & Meditation</span>
            </NavLink>
            <NavLink to="/app/academics" className={navItemClass}>
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              <span>Student Academic Wellness</span>
            </NavLink>
            <NavLink to="/app/insights" className={navItemClass}>
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Personalized Insights</span>
            </NavLink>
          </div>
        </div>

        {/* Section 5: Support & Community */}
        <div>
          <div className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 px-3 mb-2">
            Support Network
          </div>
          <div className="space-y-1">
            <NavLink to="/app/professionals" className={navItemClass}>
              <Users className="w-4 h-4 text-[#8B7BE8]" />
              <span>Counselor Directory</span>
            </NavLink>
            <NavLink to="/app/appointments" className={navItemClass}>
              <CalendarCheck className="w-4 h-4 text-[#70B8AA]" />
              <span>Appointments</span>
            </NavLink>
            <NavLink to="/app/community" className={navItemClass}>
              <HeartHandshake className="w-4 h-4 text-teal-600" />
              <span>Peer Community</span>
            </NavLink>
            <NavLink
              to="/crisis"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
            >
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
              <span>Crisis Support (24/7)</span>
            </NavLink>
          </div>
        </div>

        {/* Section 6: Admin (only visible if admin role) */}
        {role === 'admin' && (
          <div>
            <div className="text-[10px] font-semibold tracking-wider uppercase text-amber-500 px-3 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </div>
            <div className="space-y-1">
              <NavLink to="/admin" end className={navItemClass}>
                <span>Admin Dashboard</span>
              </NavLink>
              <NavLink to="/admin/verifications" className={navItemClass}>
                <span>Doctor Verifications</span>
              </NavLink>
              <NavLink to="/admin/users" className={navItemClass}>
                <span>User Management</span>
              </NavLink>
              <NavLink to="/admin/moderation" className={navItemClass}>
                <span>Community Moderation</span>
              </NavLink>
            </div>
          </div>
        )}

        {/* Section 7: Account & Settings */}
        <div>
          <div className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 px-3 mb-2">
            Account
          </div>
          <div className="space-y-1">
            <NavLink to="/app/profile" className={navItemClass}>
              <User className="w-4 h-4" />
              <span>User Profile</span>
            </NavLink>
            <NavLink to="/app/settings" className={navItemClass}>
              <Lock className="w-4 h-4" />
              <span>Privacy & Consents</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Role Switcher Toolbar for Evaluation / Testing */}
      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
        <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mb-1.5 px-1">
          Active Role (Click to switch preview):
        </div>
        <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg">
          {(['student', 'professional', 'admin'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => switchDemoRole(r)}
              className={`py-1 text-[11px] font-medium rounded capitalize transition-all ${
                role === r
                  ? 'bg-white dark:bg-slate-700 text-[#8B7BE8] dark:text-[#A9C7E8] shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {r === 'professional' ? 'Counselor' : r}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
