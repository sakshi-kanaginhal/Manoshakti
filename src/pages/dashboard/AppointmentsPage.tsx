import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarCheck, Clock, Video, MapPin, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import { apiService } from '../../services/api';
import { Appointment, Professional } from '../../types';

export const AppointmentsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedProId = searchParams.get('pro');

  const [appointments, setAppointments] = useState<Appointment[]>(() => apiService.getAppointments());
  const [professionals] = useState<Professional[]>(() => apiService.getProfessionals());

  const [isBookingOpen, setIsBookingOpen] = useState(!!preselectedProId);
  const [selectedProId, setSelectedProId] = useState(preselectedProId || 'p1');
  const [date, setDate] = useState('2026-11-09');
  const [startTime, setStartTime] = useState('16:00');
  const [mode, setMode] = useState('online');
  const [notes, setNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (preselectedProId) {
      setSelectedProId(preselectedProId);
      setIsBookingOpen(true);
    }
  }, [preselectedProId]);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const pro = professionals.find((p) => p.id === selectedProId) || professionals[0];

    const newApt = apiService.bookAppointment({
      professional_id: pro.id,
      professional_name: pro.full_name,
      professional_title: pro.title,
      appointment_date: date,
      start_time: startTime,
      end_time: `${parseInt(startTime.slice(0, 2), 10) + 1}:00`,
      consultation_mode: mode,
      status: 'confirmed',
      client_notes: notes
    });

    setAppointments(apiService.getAppointments());
    setBookingSuccess(true);
    setIsBookingOpen(false);
    setNotes('');
    setTimeout(() => setBookingSuccess(false), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#70B8AA] uppercase tracking-wider">
            <CalendarCheck className="w-4 h-4" />
            <span>Consultation Schedule</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#292A35] dark:text-[#FAF9F6]">
            Appointment Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Schedule and manage confidential 1-on-1 sessions with accredited clinical professionals.
          </p>
        </div>

        <button
          onClick={() => setIsBookingOpen(!isBookingOpen)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#8B7BE8] text-white text-xs font-semibold hover:bg-[#7968db] shadow-sm transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          <span>{isBookingOpen ? 'Close Booking Form' : 'Book New Consultation'}</span>
        </button>
      </div>

      {bookingSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Your appointment has been confirmed! Telehealth video room details are listed below.</span>
        </div>
      )}

      {/* Booking Form Card */}
      {isBookingOpen && (
        <form onSubmit={handleBook} className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Select Counselor & Time Slot
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Professional
              </label>
              <select
                value={selectedProId}
                onChange={(e) => setSelectedProId(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              >
                {professionals.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.full_name} ({p.title})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Consultation Mode
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              >
                <option value="online">Online Video Consultation</option>
                <option value="in_person">In-Person Clinic Visit</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Time Slot
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              >
                <option value="10:00">10:00 AM - 10:50 AM</option>
                <option value="11:30">11:30 AM - 12:20 PM</option>
                <option value="14:00">02:00 PM - 02:50 PM</option>
                <option value="16:00">04:00 PM - 04:50 PM</option>
                <option value="18:00">06:00 PM - 06:50 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Private Topic or Goal (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Guidance on handling chronic exam anxiety and sleep issues..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-[#FAF9F6] dark:bg-slate-900 text-slate-800 dark:text-slate-200"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsBookingOpen(false)}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#8B7BE8] hover:bg-[#7968db] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      )}

      {/* Upcoming Sessions List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Scheduled Consultations ({appointments.length})
        </h3>

        <div className="space-y-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {apt.professional_name}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                      Confirmed
                    </span>
                  </div>
                  <p className="text-xs text-[#8B7BE8] font-medium">
                    {apt.professional_title}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {apt.appointment_date} · {apt.start_time} - {apt.end_time}
                  </span>
                </div>
              </div>

              {apt.client_notes && (
                <p className="text-xs text-slate-500 italic bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  Focus: "{apt.client_notes}"
                </p>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  {apt.consultation_mode === 'online' ? (
                    <>
                      <Video className="w-3.5 h-3.5 text-indigo-500" />
                      Encrypted Telehealth Session
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      In-Person Clinic Appointment
                    </>
                  )}
                </span>

                {apt.meeting_link && apt.consultation_mode === 'online' && (
                  <a
                    href={apt.meeting_link}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
                  >
                    Join Video Room
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
