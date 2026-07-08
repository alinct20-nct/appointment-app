import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Doctor, WorkingDayHours, BookingLogic } from '../types';
import { useI18n } from '../i18nContext';

interface ClinicSettingsProps {
  doctors: Doctor[];
  workingHours: WorkingDayHours[];
  bookingLogic: BookingLogic;
  onAddDoctor: (doctor: Doctor) => void;
  onUpdateDoctor: (doctor: Doctor) => void;
  onUpdateWorkingHours: (hours: WorkingDayHours[]) => void;
  onUpdateBookingLogic: (logic: BookingLogic) => void;
  onSaveAllChanges: () => void;
}

export default function ClinicSettings({
  doctors,
  workingHours,
  bookingLogic,
  onAddDoctor,
  onUpdateDoctor,
  onUpdateWorkingHours,
  onUpdateBookingLogic,
  onSaveAllChanges
}: ClinicSettingsProps) {
  const { language, t } = useI18n();
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [savingAnim, setSavingAnim] = useState(false);

  // New Doctor Form State
  const [docName, setDocName] = useState('');
  const [docEmail, setDocEmail] = useState('');
  const [docSpecialty, setDocSpecialty] = useState('Orthodontics');
  const [docExp, setDocExp] = useState('5 Years');
  const [docStatus, setDocStatus] = useState<'On Duty' | 'Away'>('On Duty');
  const [docAvatar, setDocAvatar] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuAEeReKzjLFNZcVu8JppKAR1Zk6OJ4ZYz-a27kZ1eTJls6QDPgrRDpXBIGOm5orkNJJ_VJX_QUsp26txRDMkkJEHOao7Csa1Rp8EkKJyc-2AcRafLIZVG6UkDJW15SZ7MwFahjkz_Ztx4YNn398kCu1KqAV2ja4RWunsmv6pKHU9x2czzdq-rkc2_IQVKIyAUBH8YHy9K_bYLZ_m4WDiyE8XhfuNJXF6lN28sfAVa9qEc-aph177RlvEQ');

  const handleDayActiveToggle = (index: number) => {
    const updated = [...workingHours];
    updated[index] = { ...updated[index], active: !updated[index].active };
    onUpdateWorkingHours(updated);
  };

  const handleTimeChange = (index: number, field: 'start' | 'end', val: string) => {
    const updated = [...workingHours];
    updated[index] = { ...updated[index], [field]: val };
    onUpdateWorkingHours(updated);
  };

  const handleDurationChange = (duration: '30 min' | '45 min' | '60 min') => {
    onUpdateBookingLogic({ ...bookingLogic, defaultSlotDuration: duration });
  };

  const handleConcurrentChange = (change: number) => {
    const newVal = Math.max(1, bookingLogic.maxConcurrentBookings + change);
    onUpdateBookingLogic({ ...bookingLogic, maxConcurrentBookings: newVal });
  };

  const handleToggleLogic = (field: 'instantBooking' | 'patientPortalAccess') => {
    onUpdateBookingLogic({ ...bookingLogic, [field]: !bookingLogic[field] });
  };

  const handleAddDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim() || !docEmail.trim()) {
      alert('Please fill out Name and Email fields!');
      return;
    }
    
    // Select dynamic avatar if user hasn't modified it to diversify
    let finalAvatar = docAvatar;
    if (docSpecialty === 'Pedodontics') {
      finalAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxWgD5cQBUY4hh619IYSWOAhhRy4WKPVJdNuMXKSEgNbiRVHW6TcjKft9RCNIJbVJredmZ_c3scwuvGwljJj_z-B02Eq2rDLXdjYmdYXHbcmH60SHc9BjZd6UGlogpozTJqy-M2upLRfE666HWVFv2evkGeTApKm0eOdZwff5eMfuJ4VEBLCCInEnWd_Q_GSfWe0E7nCuruVglNmr2naF8S1FBva1tAReY_GqGTc10vcLhUv0VamO7CA';
    } else if (docSpecialty === 'Oral Surgery') {
      finalAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwPduslch5_sJHyeUtl0VTvmR4yKgrUIo05b14lRURDaru-sMm1E6iXEde6PDrKlx4nXrkMhMHlGPwF76A08pKrg6umOI10JWrxddIoJQkjAeYtA9fkSkFGz4omfhdvq7GcTRCl-prMPZXMC60i_iaN_1IqPn6mm8p-6CqAPbYRNmn7pLoc22mCAb-aXbcpyfCBGHJ9tM3kKIwY6D8ZMdy6Kkp-AjULeD31_sUlus5ybD49HezwU9LIQ';
    }

    onAddDoctor({
      id: `dr-${Date.now()}`,
      name: docName,
      email: docEmail,
      specialty: docSpecialty,
      experience: docExp,
      status: docStatus,
      avatar: finalAvatar,
      rating: 4.8,
      reviewsCount: 12,
      yearsExp: parseInt(docExp) || 5
    });

    setIsDoctorModalOpen(false);
    setDocName('');
    setDocEmail('');
  };

  const handleSaveWithAnimation = () => {
    setSavingAnim(true);
    setTimeout(() => {
      setSavingAnim(false);
      onSaveAllChanges();
    }, 1000);
  };

  return (
    <div id="settings-canvas" className="space-y-8 p-4 sm:p-8 max-w-[1400px] mx-auto">
      
      {/* Visual Header Trigger Integration with the parent header layout */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-slate-50 p-4 rounded-xl border border-slate-200 gap-4">
        <div>
          <h3 className="text-xl font-bold text-on-surface">{t('practiceConfig')}</h3>
          <p className="text-xs text-on-surface-variant">{t('practiceConfigDesc')}</p>
        </div>
        <button 
          onClick={handleSaveWithAnimation}
          disabled={savingAnim}
          className="bg-[#009668] hover:bg-[#007b55] text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:shadow transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          {savingAnim ? (
            <>
              <span className="material-symbols-outlined text-lg animate-spin">sync</span>
              {t('saving') || 'Saving...'}
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
              {t('saveSettings')}
            </>
          )}
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Working Hours Card (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-surface-border p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-[#009668] text-xl font-bold">schedule</span>
            <h4 className="text-base font-bold text-on-surface">{t('workingHours')}</h4>
          </div>

          <div className="space-y-4">
            {workingHours.map((wh, idx) => {
              const isSunday = wh.day === 'Sunday';
              const isSaturday = wh.day === 'Saturday';
              const isWeekend = isSunday || isSaturday;
              const translatedDayName = t(wh.day.toLowerCase() as any) || wh.day;
              
              return (
                <div 
                  key={wh.day}
                  className={`flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-lg transition-all gap-4 border ${
                    wh.active 
                      ? wh.isLateHours 
                        ? 'bg-blue-50/50 border-[#009668]' 
                        : 'bg-slate-50 border-transparent hover:border-slate-300'
                      : 'bg-slate-100 opacity-60 border-transparent'
                  }`}
                >
                  {/* Day Toggles */}
                  <div className="flex items-center gap-3 w-full md:w-1/4">
                    <input 
                      type="checkbox" 
                      checked={wh.active}
                      onChange={() => handleDayActiveToggle(idx)}
                      className="w-5 h-5 rounded border-surface-border text-[#009668] focus:ring-[#009668] cursor-pointer"
                    />
                    <span className="font-bold text-sm text-on-surface">{translatedDayName}</span>
                  </div>

                  {/* Time Ranges */}
                  {wh.active ? (
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 w-full md:w-auto">
                      <input 
                        type="text" 
                        value={wh.start}
                        onChange={(e) => handleTimeChange(idx, 'start', e.target.value)}
                        className="bg-white border border-slate-200 rounded-md px-2 py-1.5 w-24 text-center text-xs font-bold outline-none focus:ring-1 focus:ring-[#009668]"
                      />
                      <span className="text-outline text-[11px] uppercase">{language === 'en' ? 'to' : 'إلى'}</span>
                      <input 
                        type="text" 
                        value={wh.end}
                        onChange={(e) => handleTimeChange(idx, 'end', e.target.value)}
                        className="bg-white border border-slate-200 rounded-md px-2 py-1.5 w-24 text-center text-xs font-bold outline-none focus:ring-1 focus:ring-[#009668]"
                      />
                    </div>
                  ) : (
                    <div className="text-xs italic text-on-surface-variant font-medium">
                      {isWeekend ? t('closedWeekends') : t('notOperational')}
                    </div>
                  )}

                  {/* Operational Notes / Badges */}
                  <div className="flex items-center gap-2 text-xs font-bold min-w-[120px] justify-end w-full md:w-auto text-slate-500">
                    {wh.active ? (
                      wh.isLateHours ? (
                        <div className="flex items-center gap-1 text-[#009668]">
                          <span className="material-symbols-outlined text-sm">bedtime</span>
                          <span className="text-[10px] uppercase tracking-wider font-extrabold">{t('lateHours')}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-slate-600">
                          <span className="material-symbols-outlined text-sm">restaurant</span>
                          <span className="text-[10px] uppercase font-bold">{wh.note || '13:00 - 14:00'}</span>
                        </div>
                      )
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Logic Card (1/3 width) */}
        <div className="bg-white rounded-xl border border-surface-border p-6 shadow-sm flex flex-col justify-between gap-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#009668] text-xl font-bold">settings_input_component</span>
              <h4 className="text-base font-bold text-on-surface">{t('bookingLogic')}</h4>
            </div>

            {/* Default slot duration selection */}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-2.5">
                {t('defaultSlotDuration')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['30 min', '45 min', '60 min'] as const).map((dur) => {
                  const isSelected = bookingLogic.defaultSlotDuration === dur;
                  return (
                    <button
                      key={dur}
                      onClick={() => handleDurationChange(dur)}
                      className={`py-2 px-3 text-xs font-bold rounded-lg transition-all border cursor-pointer ${
                        isSelected 
                          ? 'bg-[#009668] border-transparent text-white shadow-sm' 
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {dur}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Counter logic */}
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-2.5">
                {t('maxConcurrent')}
              </label>
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <button 
                  onClick={() => handleConcurrentChange(-1)}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-[#009668] hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm font-bold">remove</span>
                </button>
                <span className="text-lg font-extrabold text-slate-800">
                  {bookingLogic.maxConcurrentBookings.toString().padStart(2, '0')}
                </span>
                <button 
                  onClick={() => handleConcurrentChange(1)}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-[#009668] hover:text-white transition-all cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm font-bold">add</span>
                </button>
              </div>
              <p className="text-[10px] text-on-surface-variant mt-2 italic font-medium leading-normal text-center">
                {t('maxConcurrentDesc')}
              </p>
            </div>
          </div>

          {/* Interactive Checkbox Toggles */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-xs font-bold text-slate-700 group-hover:text-on-surface">{t('instantBooking')}</span>
              <input 
                type="checkbox" 
                checked={bookingLogic.instantBooking}
                onChange={() => handleToggleLogic('instantBooking')}
                className="w-5 h-5 rounded border-surface-border text-[#009668] focus:ring-[#009668] cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-xs font-bold text-slate-700 group-hover:text-on-surface">{t('patientPortal')}</span>
              <input 
                type="checkbox" 
                checked={bookingLogic.patientPortalAccess}
                onChange={() => handleToggleLogic('patientPortalAccess')}
                className="w-5 h-5 rounded border-surface-border text-[#009668] focus:ring-[#009668] cursor-pointer"
              />
            </label>
          </div>
        </div>

      </div>

      {/* Medical Staff Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-[#009668] border border-[#009668]/15">
              <span className="material-symbols-outlined text-lg">clinical_notes</span>
            </div>
            <h4 className="text-lg font-bold text-on-surface">{t('medicalStaff')}</h4>
          </div>
          <button 
            onClick={() => setIsDoctorModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 border-2 border-[#009668] text-[#009668] font-bold text-xs rounded-lg hover:bg-[#009668] hover:text-white transition-all cursor-pointer group shadow-sm"
          >
            <span className="material-symbols-outlined text-base group-hover:rotate-90 transition-transform">
              person_add
            </span>
            {t('addDoctor')}
          </button>
        </div>

        {/* Doctors Table */}
        <div className="bg-white rounded-xl border border-surface-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rtl:text-right ltr:text-left">
              <thead className="bg-slate-50 border-b border-surface-border">
                <tr>
                  <th className="px-6 py-3.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider rtl:text-right ltr:text-left">
                    {t('doctorName')}
                  </th>
                  <th className="px-6 py-3.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider rtl:text-right ltr:text-left">
                    {t('specialty')}
                  </th>
                  <th className="px-6 py-3.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider rtl:text-right ltr:text-left">
                    {t('experience')}
                  </th>
                  <th className="px-6 py-3.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider rtl:text-right ltr:text-left">
                    {t('status')}
                  </th>
                  <th className="px-6 py-3.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider text-right rtl:text-left ltr:text-right">
                    {t('actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {doctors.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                          alt={doc.name}
                          src={doc.avatar}
                        />
                        <div className="text-left rtl:text-right">
                          <p className="font-bold text-sm text-on-surface">{doc.name}</p>
                          <p className="text-xs text-on-surface-variant">{doc.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-blue-50 text-[#0058be] rounded-full text-[11px] font-bold border border-blue-100">
                        {doc.specialty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-700">
                      {doc.experience}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <span 
                          className={`w-2.5 h-2.5 rounded-full ${
                            doc.status === 'On Duty' ? 'bg-[#009668]' : 'bg-slate-400'
                          }`} 
                        />
                        <span className={doc.status === 'On Duty' ? 'text-[#009668]' : 'text-slate-500'}>
                          {doc.status === 'On Duty' ? t('onDuty') : t('away')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right rtl:text-left">
                      <div className="flex justify-end rtl:justify-start gap-3 text-slate-400">
                        <button 
                          onClick={() => {
                            const newStatus = doc.status === 'On Duty' ? 'Away' : 'On Duty';
                            onUpdateDoctor({ ...doc, status: newStatus });
                          }}
                          className="hover:text-secondary cursor-pointer"
                          title="Toggle Status"
                        >
                          <span className="material-symbols-outlined text-lg">sync_alt</span>
                        </button>
                        <button 
                          onClick={() => alert(`Direct configuration for ${doc.name} requires complete super-admin login privileges.`)}
                          className="hover:text-on-surface cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-lg">edit_square</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Doctor Modal Dialog */}
      <AnimatePresence>
        {isDoctorModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-[9999]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-2xl max-w-md w-full overflow-hidden border border-slate-200 shadow-2xl"
            >
              <div className="bg-[#009668] text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">person_add</span>
                  <h3 className="text-md font-bold">{t('addNewDoctor')}</h3>
                </div>
                <button 
                  onClick={() => setIsDoctorModalOpen(false)}
                  className="text-white/85 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleAddDoctorSubmit} className="p-6 space-y-4 text-right rtl:text-right ltr:text-left">
                {/* Name */}
                <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase">{t('fullName')}</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Dr. Arthur Pendelton"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009668] outline-none"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase">{t('emailAddress')}</label>
                  <input 
                    type="email"
                    required
                    placeholder="e.g. arthur.p@smilebook.com"
                    value={docEmail}
                    onChange={(e) => setDocEmail(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009668] outline-none"
                  />
                </div>

                {/* Specialty */}
                <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                  <label className="block text-xs font-bold text-on-surface-variant uppercase">{t('clinicalSpecialty')}</label>
                  <select 
                    value={docSpecialty}
                    onChange={(e) => setDocSpecialty(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009668] outline-none"
                  >
                    <option value="Orthodontics">Orthodontics (Braces &amp; Alignment)</option>
                    <option value="Pedodontics">Pedodontics (Child Dentistry)</option>
                    <option value="Oral Surgery">Oral Surgery &amp; Implants</option>
                    <option value="General Dentistry">General Dentistry</option>
                  </select>
                </div>

                {/* Experience & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase">{t('experience')}</label>
                    <input 
                      type="text"
                      placeholder="e.g. 10 Years"
                      value={docExp}
                      onChange={(e) => setDocExp(e.target.value)}
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009668] outline-none"
                    />
                  </div>
                  <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                    <label className="block text-xs font-bold text-on-surface-variant uppercase">{t('currentDuty')}</label>
                    <select 
                      value={docStatus}
                      onChange={(e) => setDocStatus(e.target.value as 'On Duty' | 'Away')}
                      className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009668] outline-none font-semibold text-slate-800"
                    >
                      <option value="On Duty">{t('onDuty')}</option>
                      <option value="Away">{t('away')}</option>
                    </select>
                  </div>
                </div>

                {/* Submit actions */}
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5 text-sm">
                  <button 
                    type="button"
                    onClick={() => setIsDoctorModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg cursor-pointer"
                  >
                    {t('cancel')}
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 bg-[#009668] hover:bg-[#007b55] text-white font-bold rounded-lg cursor-pointer shadow"
                  >
                    {t('registerDoctor')}
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
