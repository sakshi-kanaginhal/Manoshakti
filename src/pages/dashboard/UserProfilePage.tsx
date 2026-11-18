import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Clock,
  Shield,
  ShieldCheck,
  Edit2,
  Save,
  X,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Lock,
  LogOut,
  Fingerprint
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const UserProfilePage: React.FC = () => {
  const { user, updateAccount, deleteAccount, logout } = useAuth();
  const navigate = useNavigate();

  // Edit Mode State
  const [isEditing, setIsEditing] = useState(false);
  const [editFullName, setEditFullName] = useState(user?.full_name || '');
  const [editContactNumber, setEditContactNumber] = useState(user?.contact_number || '');
  const [saveLoading, setSaveLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Delete Confirmation Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleStartEdit = () => {
    setEditFullName(user?.full_name || '');
    setEditContactNumber(user?.contact_number || '');
    setStatusMessage(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setStatusMessage(null);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!editFullName.trim()) {
      setStatusMessage({ type: 'error', text: 'Full Name cannot be empty.' });
      return;
    }

    const phoneRegex = /^[+]?[\d\s-]{8,20}$/;
    if (!editContactNumber.trim() || !phoneRegex.test(editContactNumber.trim())) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid contact number (at least 8 digits).' });
      return;
    }

    setSaveLoading(true);
    const result = await updateAccount({
      full_name: editFullName.trim(),
      contact_number: editContactNumber.trim()
    });
    setSaveLoading(false);

    if (result.success) {
      setIsEditing(false);
      setStatusMessage({ type: 'success', text: 'Account details updated successfully in PostgreSQL database.' });
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to update account details.' });
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      return;
    }
    setDeleteLoading(true);
    const result = await deleteAccount();
    setDeleteLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setStatusMessage({ type: 'error', text: result.error || 'Failed to delete account.' });
      setShowDeleteModal(false);
    }
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Active session';
    try {
      return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8B7BE8] uppercase tracking-wider">
          <UserIcon className="w-4 h-4" />
          <span>Account Settings & Data Privacy</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          User Profile & Minimal Account Record
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          In strict compliance with our youth data-minimization architecture, ManoShakti records only essential account attributes in Supabase PostgreSQL.
        </p>
      </div>

      {/* Status Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center gap-2.5 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Main Account Details Card */}
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-700/80">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#8B7BE8] to-[#70B8AA] flex items-center justify-center text-white font-bold text-2xl shadow-sm">
              {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {user?.full_name || 'ManoShakti User'}
              </h2>
              <p className="text-xs text-slate-500 font-mono flex items-center gap-1.5 mt-0.5">
                <Mail className="w-3.5 h-3.5 text-[#8B7BE8]" />
                <span>{user?.email}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                type="button"
                onClick={handleStartEdit}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#8B7BE8] hover:text-[#8B7BE8] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Account Details</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            )}

            <button
              type="button"
              onClick={async () => {
                await logout();
                navigate('/login');
              }}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Account Fields Form / View */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={editFullName}
                    onChange={(e) => setEditFullName(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#8B7BE8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Contact Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={editContactNumber}
                    onChange={(e) => setEditContactNumber(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#8B7BE8]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveLoading}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#8B7BE8] hover:bg-[#7968db] rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {saveLoading ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Field 1: User ID */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                <Fingerprint className="w-3 h-3 text-[#8B7BE8]" />
                <span>Account UUID (Supabase Auth ID)</span>
              </span>
              <p className="text-xs font-mono text-slate-700 dark:text-slate-300 break-all select-all">
                {user?.id || 'c1111111-1111-4111-8111-111111111111'}
              </p>
            </div>

            {/* Field 2: Full Name */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                <UserIcon className="w-3 h-3 text-[#8B7BE8]" />
                <span>Full Name</span>
              </span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {user?.full_name}
              </p>
            </div>

            {/* Field 3: Email Address */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                <Mail className="w-3 h-3 text-[#8B7BE8]" />
                <span>Email Address (Unique Key)</span>
              </span>
              <p className="text-xs font-mono text-slate-800 dark:text-slate-200">
                {user?.email}
              </p>
            </div>

            {/* Field 4: Contact Number */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#70B8AA]" />
                <span>Contact Number (Protected by RLS)</span>
              </span>
              <p className="text-xs font-mono text-slate-800 dark:text-slate-200">
                {user?.contact_number || 'Not provided'}
              </p>
            </div>

            {/* Field 5: Account Created At */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Created At</span>
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {formatDate(user?.created_at)}
              </p>
            </div>

            {/* Field 6: Last Updated At */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>Last Updated At</span>
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {formatDate(user?.updated_at || user?.created_at)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Database Schema Transparency Card */}
      <div className="p-6 bg-[#FAF9F6] dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Minimal User Database Compliance Guarantee
          </h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          The ManoShakti PostgreSQL database stores <strong>only 6 columns</strong> in the <code className="text-[#8B7BE8] font-mono px-1 py-0.5 bg-white dark:bg-slate-900 rounded">users</code> table:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
          <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[#8B7BE8] font-bold">id</span>: UUID (PK)
          </div>
          <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[#8B7BE8] font-bold">full_name</span>: VARCHAR
          </div>
          <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[#8B7BE8] font-bold">email</span>: VARCHAR (UQ)
          </div>
          <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[#8B7BE8] font-bold">contact_number</span>: VARCHAR
          </div>
          <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[#8B7BE8] font-bold">created_at</span>: TIMESTAMP
          </div>
          <div className="p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="text-[#8B7BE8] font-bold">updated_at</span>: TIMESTAMP
          </div>
        </div>
        <p className="text-[11px] text-slate-500 italic">
          No passwords, dates of birth, home addresses, or academic dossiers are retained in PostgreSQL. Passwords are cryptographically salted and isolated by Supabase Auth.
        </p>
      </div>

      {/* Account Deletion / GDPR Danger Zone */}
      <div className="p-6 bg-rose-50/50 dark:bg-rose-950/20 rounded-2xl border border-rose-200/80 dark:border-rose-900/60 space-y-4">
        <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
          <AlertTriangle className="w-4 h-4" />
          <h3 className="text-sm font-bold">Danger Zone: Permanent Account Deletion</h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Exercising your data rights deletes your record from the PostgreSQL <code className="font-mono">users</code> table, revokes your Supabase Auth credentials, and terminates your active session. This action cannot be undone.
        </p>
        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2.5 text-xs font-semibold text-rose-600 hover:text-white bg-white hover:bg-rose-600 dark:bg-slate-900 dark:hover:bg-rose-600 border border-rose-300 dark:border-rose-800 rounded-xl transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete My Account Permanently</span>
        </button>
      </div>

      {/* Confirmation Modal for Account Deletion */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Permanently Delete Account?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                This will delete your record for <strong>{user?.email}</strong> and completely remove your data.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                To confirm, type <span className="font-mono font-bold text-rose-600">DELETE</span> below:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText('');
                }}
                className="flex-1 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteConfirmText !== 'DELETE' || deleteLoading}
                onClick={handleDeleteAccount}
                className="flex-1 py-2 text-xs font-semibold rounded-xl text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {deleteLoading ? 'Deleting...' : 'Confirm Deletion'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
