import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Appointment, Doctor, ActivityLog, UserState } from '../types';
import { useI18n } from '../i18nContext';

interface DashboardProps {
  appointments: Appointment[];
  doctors: Doctor[];
  activityLogs: ActivityLog[];
  currentUser: UserState;
  onSelectAppointment: (appointmentId: string) => void;
  onAddAppointment: (appointment: Omit<Appointment, 'id' | 'status' | 'priceBreakdown' | 'timeline'>) => void;
  onNavigateToTab: (tab: 'Calendar' | 'Clinic Settings') => void;
}

export default function Dashboard({
  appointments,
  doctors,
  activityLogs,
  currentUser,
  onSelectAppointment,
  onAddAppointment,
  onNavigateToTab
}: DashboardProps) {
  const { language, t } = useI18n();
  const [showAlertCard, setShowAlertCard] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for scheduling a new appointment
  const [newTitle, setNewTitle] = useState('Teeth Cleaning & Oral Wellness');
  const [newPatient, setNewPatient] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDoctorId, setNewDoctorId] = useState(doctors[0]?.id || 'dr-aris');
  const [newTime, setNewTime] = useState('10:00 AM — 11:00 AM');
  const [newDate, setNewDate] = useState('Tuesday, Oct 24, 2023');
  const [newRoom, setNewRoom] = useState('Room 04');

  const todayAppointments = appointments.filter(appt => appt.status !== 'Cancelled');

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.trim() || !newPhone.trim()) {
      alert('Please fill out the patient name and phone number!');
      return;
    }
    onAddAppointment({
      title: newTitle,
      patientName: newPatient,
      patientPhone: newPhone,
      doctorId: newDoctorId,
      time: newTime,
      date: newDate,
      dateRaw: '2023-10-24',
      duration: '60 min',
      location: 'SmileBook Downtown Clinic',
      suite: 'Suite 405, Medical Center Plaza',
      room: newRoom,
      paymentStatus: 'Unpaid'
    });
    setIsModalOpen(false);
    // Reset form
    setNewPatient('');
    setNewPhone('');
  };

  return (
    <div id="dashboard-canvas" className="space-y-8 p-4 sm:p-8 max-w-[1400px] mx-auto">
      {/* Header Info Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-on-surface">{t('welcomeTitle')}, {currentUser.name.split(' ')[1] || currentUser.name}</h2>
          <p className="text-sm text-on-surface-variant mt-1">{t('happeningToday')}</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-md transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          {t('newAppointment')}
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Side:Stay Updated alert and upcoming lists */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Dismissible Alert Card */}
          <AnimatePresence>
            {showAlertCard && (
              <motion.div 
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-xl relative bg-primary-container text-white p-6 sm:p-8 flex flex-col justify-between min-h-[250px] md:h-[280px] gap-4 shadow-sm"
              >
                {/* Visual mesh overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/45 to-transparent pointer-events-none" />
                
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-tertiary-fixed-dim text-[#002113] rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                    {t('systemUpdate')}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight max-w-md">
                    {t('intelligentCanvas')}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-80 mt-2 max-w-lg">
                    {t('intelligentDesc')}
                  </p>
                </div>
                
                <div className="relative z-10 flex gap-4">
                  <button 
                    onClick={() => alert("SmileBook v4.2 Release Notes:\n1. Instant Dental Charting Autocompletion\n2. Real-time Laboratory Integration & Shipment Tracking\n3. Patient Portal Enhanced Security (HIPAA Guard v3.1)")}
                    className="bg-white hover:bg-slate-100 text-[#131b2e] px-6 py-2 rounded-lg font-bold text-xs transition-colors cursor-pointer shadow-sm"
                  >
                    {t('whatsNew')}
                  </button>
                  <button 
                    onClick={() => setShowAlertCard(false)}
                    className="border border-white/30 hover:bg-white/10 text-white px-6 py-2 rounded-lg font-semibold text-xs transition-colors cursor-pointer"
                  >
                    {t('dismiss')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upcoming Checks Block */}
          <div className="bg-white border border-surface-border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#009668]">clinical_notes</span>
                <h4 className="text-lg font-bold text-on-surface">{t('upcomingChecks')}</h4>
              </div>
              <button 
                onClick={() => onNavigateToTab('Calendar')}
                className="text-secondary hover:text-blue-700 text-xs font-bold hover:underline cursor-pointer"
              >
                {t('viewCalendar')}
              </button>
            </div>
            
            <div className="space-y-3">
              {todayAppointments.length === 0 ? (
                <p className="text-center py-6 text-xs text-on-surface-variant font-medium">{t('noUpcoming')}</p>
              ) : (
                todayAppointments.slice(0, 4).map((appt) => {
                  const doctor = doctors.find(doc => doc.id === appt.doctorId);
                  const initials = appt.patientName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                  
                  return (
                    <div 
                      key={appt.id}
                      onClick={() => onSelectAppointment(appt.id)}
                      className="p-4 rounded-lg bg-surface-container-low flex items-center justify-between border border-transparent hover:border-secondary-container transition-all cursor-pointer group shadow-sm hover:shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-secondary-container text-white flex items-center justify-center font-bold text-sm shadow-inner group-hover:scale-105 transition-transform">
                          {initials || 'SB'}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-on-surface group-hover:text-[#009668] transition-colors">
                            {appt.patientName}
                          </p>
                          <p className="text-xs text-on-surface-variant">
                            {appt.title} • <span className="font-semibold text-slate-500">{doctor?.name || 'Dr. Jonathan Aris'}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-on-surface">{appt.time.split(' — ')[0]}</p>
                        <p className="text-[10px] text-[#009668] font-bold uppercase tracking-wider">{appt.room}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Pulse / Stats & Activity Stream */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Summary Stats (Clinic Pulse) */}
          <div className="bg-white border border-surface-border rounded-xl p-6 flex flex-col justify-between min-h-[250px] md:h-[280px] shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#009668]">settings_input_component</span>
                <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  {t('clinicPulse')}
                </h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold text-on-surface-variant">{t('dailyRevenue')}</span>
                    <span className="text-[#009668] font-bold text-sm">$4,280</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                    <div className="h-full bg-[#009668] w-[75%] rounded-full transition-all duration-1000" />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold text-on-surface-variant">{t('appointments')}</span>
                    <span className="text-secondary font-bold text-sm">18 / 24</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                    <div className="h-full bg-secondary w-[65%] rounded-full transition-all duration-1000" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center gap-2 text-on-surface-variant border-t border-slate-100 pt-4 text-xs font-medium">
              <span className="material-symbols-outlined text-lg text-[#009668]">trending_up</span>
              <span>
                <span className="text-[#009668] font-bold">+12%</span> {t('fromLastWeek')}
              </span>
            </div>
          </div>

          {/* Recent Notifications (Activity Stream) */}
          <div className="bg-white border border-surface-border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">notifications_active</span>
                <h4 className="text-sm font-bold text-on-surface">{t('activityStream')}</h4>
              </div>
              <button 
                onClick={() => alert("Activity filtered by all logs")}
                className="text-on-surface-variant hover:text-on-surface flex items-center p-1 rounded hover:bg-slate-50 transition-colors"
                title="Filter Logs"
              >
                <span className="material-symbols-outlined text-lg">filter_list</span>
              </button>
            </div>
            
            <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto pr-1">
              {activityLogs.map((log) => {
                let iconName = 'check_circle';
                let iconColorClass = 'bg-emerald-50 text-[#009668]';
                if (log.type === 'payment_received') {
                  iconName = 'payments';
                  iconColorClass = 'bg-blue-50 text-secondary';
                } else if (log.type === 'system_update') {
                  iconName = 'system_update';
                  iconColorClass = 'bg-amber-50 text-[#F59E0B]';
                }
                
                return (
                  <div key={log.id} className="py-3.5 flex items-start gap-3.5 first:pt-0">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${iconColorClass}`}>
                      <span className="material-symbols-outlined text-base">{iconName}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-xs font-bold text-on-surface truncate">{log.title}</p>
                        <span className="text-[10px] text-on-surface-variant font-medium whitespace-nowrap">{log.time}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-snug mt-0.5">
                        {log.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* FAB - Quick Action button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className={`fixed bottom-8 ${language === 'ar' ? 'left-8' : 'right-8'} w-14 h-14 rounded-full bg-secondary hover:bg-blue-700 text-white shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 group transition-all duration-200 z-[100] cursor-pointer`}
        title={t('quickBooking')}
      >
        <span className="material-symbols-outlined text-2xl font-bold">event</span>
        <span className={`absolute ${language === 'ar' ? 'left-16' : 'right-16'} bg-slate-950 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150`}>
          {t('quickBooking')}
        </span>
      </button>

      {/* New Appointment Dialog/Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-slate-200 shadow-2xl"
            >
              <div className="bg-[#009668] text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    dentistry
                  </span>
                  <h3 className="text-lg font-bold">{t('scheduleAppointment')}</h3>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              <form onSubmit={handleCreateAppointment} className="p-6 space-y-4 text-right rtl:text-right ltr:text-left">
                {/* Appointment Title */}
                <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    {t('treatmentTitle')}
                  </label>
                  <select 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#009668] outline-none"
                  >
                    <option value="Teeth Cleaning & Oral Wellness">Teeth Cleaning &amp; Oral Wellness</option>
                    <option value="Root Canal Surgery">Root Canal Surgery</option>
                    <option value="Oral Consultation">Oral Consultation</option>
                    <option value="Crown Fitting & Polish">Crown Fitting &amp; Polish</option>
                    <option value="Orthodontics Adjustments">Orthodontics Adjustments</option>
                  </select>
                </div>

                {/* Patient Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      {t('patientName')}
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={newPatient}
                      onChange={(e) => setNewPatient(e.target.value)}
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#009668] outline-none"
                    />
                  </div>
                  <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      {t('patientPhone')}
                    </label>
                    <input 
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#009668] outline-none"
                    />
                  </div>
                </div>

                {/* Attending Doctor */}
                <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    {t('practitioner')}
                  </label>
                  <select 
                    value={newDoctorId}
                    onChange={(e) => setNewDoctorId(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#009668] outline-none"
                  >
                    {doctors.map(doc => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} - {doc.specialty} ({doc.status})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date and Time slots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      {t('dateSelected')}
                    </label>
                    <input 
                      type="text"
                      placeholder="Tuesday, Oct 24, 2023"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-[#009668] outline-none"
                    />
                  </div>
                  <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                      {t('timeSlot')}
                    </label>
                    <select 
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#009668] outline-none"
                    >
                      <option value="09:00 AM — 10:00 AM">09:00 AM — 10:00 AM</option>
                      <option value="10:00 AM — 11:00 AM">10:00 AM — 11:00 AM</option>
                      <option value="11:15 AM — 12:15 PM">11:15 AM — 12:15 PM</option>
                      <option value="02:00 PM — 03:00 PM">02:00 PM — 03:00 PM</option>
                      <option value="04:00 PM — 05:00 PM">04:00 PM — 05:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Room */}
                <div className="space-y-1.5 text-right rtl:text-right ltr:text-left">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    {t('roomAssignment')}
                  </label>
                  <select 
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-[#009668] outline-none"
                  >
                    <option value="Room 01">Room 01 - Oral Lab</option>
                    <option value="Room 02">Room 02 - Consultation Lab</option>
                    <option value="Room 03">Room 03 - Pediatric Care</option>
                    <option value="Room 04">Room 04 - Surgery Suite</option>
                  </select>
                </div>

                {/* Footer buttons */}
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 text-sm">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    {t('cancel')}
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 bg-[#009668] hover:bg-[#007b55] text-white font-bold rounded-lg transition-all cursor-pointer shadow"
                  >
                    {t('confirmAppt')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
