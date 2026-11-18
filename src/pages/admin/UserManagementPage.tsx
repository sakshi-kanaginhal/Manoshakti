import React, { useState } from 'react';
import { Users, Search, Shield, UserX, Check, RefreshCw, Phone, Fingerprint } from 'lucide-react';
import { UserRole } from '../../types';

interface MinimalManagedUser {
  id: string;
  full_name: string;
  email: string;
  contact_number: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

export const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<MinimalManagedUser[]>([
    {
      id: 'c1111111-1111-4111-8111-111111111111',
      full_name: 'Sakshi Sharma',
      email: 'sakshi.student@manoshakti.org',
      contact_number: '+919876543210',
      role: 'student',
      isActive: true,
      createdAt: '2026-10-15'
    },
    {
      id: 'c2222222-2222-4222-8222-222222222222',
      full_name: 'Dr. Priya Varma',
      email: 'priya.varma@manoshakti.org',
      contact_number: '+919811122334',
      role: 'professional',
      isActive: true,
      createdAt: '2026-09-20'
    },
    {
      id: 'c3333333-3333-4333-8333-333333333333',
      full_name: 'Rohan Mehta',
      email: 'rohan.mehta@iitd.ac.in',
      contact_number: '+919844455566',
      role: 'student',
      isActive: true,
      createdAt: '2026-10-28'
    },
    {
      id: 'c4444444-4444-4444-8444-444444444444',
      full_name: 'Kavita Nair',
      email: 'kavita.nair@bhu.ac.in',
      contact_number: '+919855566677',
      role: 'student',
      isActive: false,
      createdAt: '2026-10-02'
    }
  ]);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const toggleUserStatus = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)));
  };

  const filtered = users.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesSearch =
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.contact_number.includes(search);
    return matchesRole && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8B7BE8] uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>User Directory & Permissions</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          User Management Console
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Review accounts registered in Supabase PostgreSQL. Notice that only minimal attributes (Name, Email, Contact Number) are stored.
        </p>
      </div>

      {/* Filter controls */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or contact number..."
            className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8B7BE8]"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
        >
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="professional">Counselors</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-700 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-5 py-3.5">User (Minimal Schema)</th>
                <th className="px-5 py-3.5">Contact Number</th>
                <th className="px-5 py-3.5">Role</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{u.full_name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{u.email}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-slate-600 dark:text-slate-400">{u.contact_number}</span>
                  </td>
                  <td className="px-5 py-3.5 capitalize">
                    <span className="font-medium">{u.role}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        u.isActive
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                      }`}
                    >
                      {u.isActive ? 'Active' : 'Suspended'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className="text-xs text-[#8B7BE8] hover:underline font-semibold cursor-pointer"
                    >
                      {u.isActive ? 'Suspend' : 'Reactivate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
