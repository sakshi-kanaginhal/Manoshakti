import React, { useState } from 'react';
import { Users, Search, MapPin, Globe, Star, Calendar, ShieldCheck, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { Professional } from '../../types';

export const ProfessionalDirectoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [professionals] = useState<Professional[]>(() => apiService.getProfessionals());
  const [cityFilter, setCityFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = professionals.filter((p) => {
    const matchesCity = cityFilter === 'all' || p.city.toLowerCase() === cityFilter.toLowerCase();
    const matchesMode = modeFilter === 'all' || p.consultation_modes.includes(modeFilter);
    const matchesSearch =
      p.full_name.toLowerCase().includes(search.toLowerCase()) ||
      p.specializations.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      p.title.toLowerCase().includes(search.toLowerCase());
    return matchesCity && matchesMode && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#8B7BE8] uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Accredited Support Network</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
          Verified Youth Mental Health Professionals
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Connect with registered clinical psychologists, psychiatrists, and adolescent counselors specializing in student academic pressure and emotional resilience.
        </p>
      </div>

      {/* Mandatory Demo Profiles Notice */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/25 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Transparency Notice:</strong> All profiles below are clearly marked fictional demonstration profiles for system verification and evaluation purposes until practicing clinicians complete statutory board credentialing on ManoShakti.
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, exam anxiety, CBT..."
            className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
          />
        </div>

        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
        >
          <option value="all">All Cities</option>
          <option value="Bengaluru">Bengaluru</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="New Delhi">New Delhi</option>
        </select>

        <select
          value={modeFilter}
          onChange={(e) => setModeFilter(e.target.value)}
          className="text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
        >
          <option value="all">All Consultation Modes</option>
          <option value="online">Online Telehealth</option>
          <option value="in_person">In-Person Clinic</option>
        </select>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((pro) => (
          <div
            key={pro.id}
            className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#292A35] dark:text-[#FAF9F6]">
                      {pro.full_name}
                    </h3>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                      Demo Profile
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#8B7BE8]">
                    {pro.title} · {pro.experience_years} yrs exp
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{pro.rating}</span>
                  <span className="text-slate-400 text-[10px]">({pro.review_count})</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {pro.bio}
              </p>

              {/* Specialization Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {pro.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              {/* Location & Languages */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {pro.city}, {pro.state}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  {pro.languages.join(', ')}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Consultation Fee</span>
                <div className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">
                  ₹{pro.consultation_fee} / session
                </div>
              </div>

              <Link
                to={`/app/appointments?pro=${pro.id}`}
                className="px-4 py-2 bg-[#8B7BE8] hover:bg-[#7968db] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Session</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
