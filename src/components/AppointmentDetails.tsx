import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Appointment, Doctor } from '../types';
import { useI18n } from '../i18nContext';

interface AppointmentDetailsProps {
  appointment: Appointment;
  doctor: Doctor;
  onBack: () => void;
  onUpdateAppointment: (appt: Appointment) => void;
}

export default function AppointmentDetails({
  appointment,
  doctor,
  onBack,
  onUpdateAppointment
}: AppointmentDetailsProps) {
  const { language, t } = useI18n();
  const [isRescheduling, setIsRescheduling] = useState(false);
  
  // Reschedule Form State
  const [reschedDate, setReschedDate] = useState('Tuesday, Oct 24, 2023');
  const [reschedTime, setReschedTime] = useState('11:00 AM — 12:00 PM');

  const handleTogglePaymentStatus = () => {
    const nextStatus = appointment.paymentStatus === 'Paid' ? 'Unpaid' : 'Paid';
    onUpdateAppointment({
      ...appointment,
      paymentStatus: nextStatus
    });
  };

  const handleCancelAppointment = () => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      onUpdateAppointment({
        ...appointment,
        status: 'Cancelled',
        timeline: {
          ...appointment.timeline,
          sessionStart: 'Cancelled by User'
        }
      });
      alert("Appointment has been marked as Cancelled!");
    }
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAppointment({
      ...appointment,
      date: reschedDate,
      time: reschedTime,
      timeline: {
        ...appointment.timeline,
        confirmed: `Rescheduled on ${new Date().toLocaleDateString()}`
      }
    });
    setIsRescheduling(false);
    alert("Appointment successfully rescheduled!");
  };

  const handleShare = () => {
    alert(`Appointment link copied to clipboard!\nhttps://smilebook.clinic/appointments/${appointment.id}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleGoogleCalendar = () => {
    alert("Redirecting to Google Calendar...\nSmileBook has successfully provisioned a slot for Teeth Cleaning.");
  };

  return (
    <div id="appointment-details-canvas" className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6">
      {/* Back navigation header anchor */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <button 
          onClick={onBack}
          className="text-sm font-semibold text-on-surface-variant hover:text-[#009668] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          {language === 'en' ? 'Back to list' : 'الرجوع للقائمة'}
        </button>
        
        <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
          {language === 'en' ? 'Demo Context: Appointment Details Viewer' : 'سياق تجريبي: عارض تفاصيل الموعد'}
        </span>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Column: Primary Details (8/12 width) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Status & Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                  appointment.status === 'Confirmed' 
                    ? 'bg-emerald-50 text-[#009668] border border-emerald-100'
                    : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {appointment.status === 'Confirmed' ? 'check_circle' : 'cancel'}
                  </span>
                  {appointment.status === 'Confirmed' ? (language === 'en' ? 'Confirmed' : 'مؤكد') : (language === 'en' ? 'Cancelled' : 'ملغي')}
                </span>
                <span className="text-on-surface-variant font-bold text-xs tracking-tight">
                  {language === 'en' ? 'Appointment ID' : 'معرف الموعد'}: #{appointment.id}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface leading-tight">
                {appointment.title}
              </h2>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={handleShare}
                className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 cursor-pointer shadow-sm"
                title="Share link"
              >
                <span className="material-symbols-outlined text-lg">share</span>
              </button>
              <button 
                onClick={handlePrint}
                className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600 cursor-pointer shadow-sm"
                title="Print slip"
              >
                <span className="material-symbols-outlined text-lg">print</span>
              </button>
            </div>
          </div>

          {/* Date/Time and Location Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Date Card */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-blue-50 rounded-lg text-secondary">
                <span className="material-symbols-outlined">calendar_month</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{language === 'en' ? 'Date & Time' : 'التاريخ والوقت'}</p>
                <p className="font-bold text-sm text-on-surface mt-1">{appointment.date}</p>
                <p className="text-xs text-on-surface-variant mt-0.5">{appointment.time} ({appointment.duration})</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white border border-slate-200 p-5 rounded-xl flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3 bg-emerald-50 rounded-lg text-[#009668]">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{language === 'en' ? 'Location' : 'الموقع'}</p>
                <p className="font-bold text-sm text-on-surface mt-1">{appointment.location}</p>
                <p className="text-xs text-on-surface-variant mt-0.5">{appointment.suite}</p>
              </div>
            </div>

          </div>

          {/* Practitioner Profile */}
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3.5 border-b border-slate-150 bg-slate-50">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t('practitioner')}</h3>
            </div>
            <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-sm flex-shrink-0">
                  <img 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    alt={doctor.name}
                    src={doctor.avatar}
                  />
                </div>
                <div className="text-left rtl:text-right">
                  <h4 className="text-lg font-bold text-on-surface leading-snug">{doctor.name}</h4>
                  <p className="text-xs text-on-surface-variant font-semibold">{doctor.specialty}</p>
                  
                  <div className="flex items-center gap-3 text-xs font-medium mt-1.5 flex-wrap">
                    <span className="flex items-center gap-1 text-amber-500">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      {doctor.rating || 4.9} <span className="text-slate-400 font-normal">({doctor.reviewsCount || '1.2k'} {language === 'en' ? 'Reviews' : 'تقييم'})</span>
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1 text-[#009668]">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      {doctor.experience} {language === 'en' ? 'Exp.' : 'خبرة'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => alert(`Showing schedule for ${doctor.name}...`)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-[#009668] hover:bg-[#007b55] text-white text-xs font-bold rounded-lg hover:shadow transition-all cursor-pointer text-center"
                >
                  {language === 'en' ? 'View Profile' : 'عرض الملف'}
                </button>
                <button 
                  onClick={() => alert(`Opening secure HIPAA chat thread with ${doctor.name}...`)}
                  className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center"
                >
                  {language === 'en' ? 'Message' : 'مراسلة'}
                </button>
              </div>
            </div>
          </section>

          {/* Booking Timeline */}
          <section className="bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="px-5 py-3.5 border-b border-slate-150 bg-slate-50">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{language === 'en' ? 'Booking Timeline' : 'الجدول الزمني للحجز'}</h3>
            </div>
            
            <div className="p-6 space-y-6 text-left rtl:text-right">
              {/* Created */}
              <div className="relative flex gap-4">
                <div className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-6 bottom-0 w-[2px] bg-slate-100`} />
                <div className="z-10 bg-[#009668] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[10px] font-bold">done</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">{language === 'en' ? 'Appointment Created' : 'تم إنشاء الموعد'}</p>
                  <p className="text-[11px] text-on-surface-variant font-medium">{appointment.timeline.created}</p>
                  <p className="text-[10px] text-[#0058be] font-bold mt-0.5 italic">{language === 'en' ? 'Initiated via Client Portal' : 'بدأت عبر بوابة العميل'}</p>
                </div>
              </div>

              {/* Confirmed */}
              <div className="relative flex gap-4">
                <div className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-6 bottom-0 w-[2px] bg-slate-100`} />
                <div className="z-10 bg-[#009668] text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[10px] font-bold">done</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">{language === 'en' ? 'Provider Confirmed' : 'تم التأكيد من مقدم الخدمة'}</p>
                  <p className="text-[11px] text-on-surface-variant font-medium">{appointment.timeline.confirmed || 'Oct 12, 2023 · 04:15 PM'}</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">{doctor.name} {language === 'en' ? 'accepted the slot' : 'قبل الوقت المحدد'}</p>
                </div>
              </div>

              {/* Reminders */}
              <div className="relative flex gap-4">
                <div className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-6 bottom-0 w-[2px] bg-slate-100`} />
                <div className={`z-10 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                  appointment.status === 'Confirmed' ? 'bg-secondary' : 'bg-slate-300'
                }`}>
                  <span className="material-symbols-outlined text-[10px] font-bold">mail</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">{language === 'en' ? 'Reminders Sent' : 'تم إرسال التذكيرات'}</p>
                  <p className="text-[11px] text-on-surface-variant font-medium">{appointment.timeline.remindersSent === 'Pending Session Date' ? (language === 'en' ? 'Pending Session Date' : 'في انتظار تاريخ الجلسة') : appointment.timeline.remindersSent}</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">{language === 'en' ? 'Email and SMS notifications dispatched' : 'تم إرسال تنبيهات البريد والرسائل النصية'}</p>
                </div>
              </div>

              {/* Session Start */}
              <div className="flex gap-4">
                <div className={`z-10 text-slate-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                  appointment.status === 'Confirmed' ? 'bg-slate-200' : 'bg-red-100 text-red-600'
                }`}>
                  <span className="material-symbols-outlined text-[10px] font-bold">hourglass_empty</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface">{language === 'en' ? 'Session Start' : 'بدء الجلسة'}</p>
                  <p className="text-[11px] text-on-surface-variant font-medium">{appointment.timeline.sessionStart === 'Scheduled for Oct 24, 2023' ? (language === 'en' ? 'Scheduled for Oct 24, 2023' : 'مجدول في 24 أكتوبر 2023') : appointment.timeline.sessionStart}</p>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Sidebar Panels (4/12 width) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Manage Booking Actions */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 space-y-3">
              <h3 className="text-xs font-extrabold text-on-surface uppercase tracking-wider mb-2">{language === 'en' ? 'Manage Booking' : 'إدارة الحجز'}</h3>
              
              {appointment.status === 'Confirmed' ? (
                <>
                  <button 
                    onClick={() => setIsRescheduling(!isRescheduling)}
                    className="w-full py-3 bg-[#009668] hover:bg-[#007b55] text-white rounded-lg flex items-center justify-center gap-2 font-bold text-xs transition-all hover:shadow cursor-pointer active:scale-[0.98]"
                  >
                    <span className="material-symbols-outlined text-sm">event_repeat</span>
                    {language === 'en' ? 'Reschedule Appointment' : 'إعادة جدولة الموعد'}
                  </button>

                  <button 
                    onClick={handleGoogleCalendar}
                    className="w-full py-3 border border-[#009668] hover:bg-emerald-50/50 text-[#009668] rounded-lg flex items-center justify-center gap-2 font-bold text-xs transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                    {language === 'en' ? 'Add to Google Calendar' : 'إضافة إلى تقويم Google'}
                  </button>

                  <button 
                    onClick={handleCancelAppointment}
                    className="w-full py-2.5 text-red-500 hover:bg-red-50 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                  >
                    <span className="material-symbols-outlined text-sm">cancel</span>
                    {language === 'en' ? 'Cancel Appointment' : 'إلغاء الموعد'}
                  </button>
                </>
              ) : (
                <div className="p-4 bg-red-50/60 rounded-xl border border-red-100 text-center">
                  <p className="text-xs font-bold text-red-600">{language === 'en' ? 'This appointment has been cancelled.' : 'تم إلغاء هذا الموعد.'}</p>
                  <button
                    onClick={() => {
                      onUpdateAppointment({ ...appointment, status: 'Confirmed', timeline: { ...appointment.timeline, sessionStart: 'Scheduled for Oct 24, 2023' } });
                      alert("Appointment successfully re-activated!");
                    }}
                    className="mt-2 text-[11px] font-bold text-[#0058be] hover:underline cursor-pointer"
                  >
                    {language === 'en' ? 'Re-activate Booking' : 'إعادة تفعيل الحجز'}
                  </button>
                </div>
              )}
            </div>

            {/* Quick Rescheduling Popover panel */}
            <AnimatePresence>
              {isRescheduling && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 pb-5 border-t border-slate-100 bg-slate-50/50 space-y-3 pt-3"
                >
                  <p className="text-[11px] font-bold text-slate-700 uppercase">{language === 'en' ? 'Select New Slot' : 'اختر موعداً جديداً'}</p>
                  <form onSubmit={handleRescheduleSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold">{language === 'en' ? 'New Date' : 'التاريخ الجديد'}</label>
                      <input 
                        type="text" 
                        required
                        value={reschedDate} 
                        onChange={(e) => setReschedDate(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-xs px-2 py-1.5 rounded outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold">{language === 'en' ? 'New Time Range' : 'الوقت الجديد'}</label>
                      <input 
                        type="text" 
                        required
                        value={reschedTime} 
                        onChange={(e) => setReschedTime(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-xs px-2 py-1.5 rounded outline-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button 
                        type="button" 
                        onClick={() => setIsRescheduling(false)}
                        className="flex-1 py-1.5 text-center border border-slate-200 text-slate-500 font-bold text-[10px] bg-white rounded cursor-pointer"
                      >
                        {t('dismiss') || 'Dismiss'}
                      </button>
                      <button 
                        type="submit" 
                        className="flex-1 py-1.5 text-center bg-[#009668] hover:bg-[#007b55] text-white font-bold text-[10px] rounded cursor-pointer"
                      >
                        {language === 'en' ? 'Save Slot' : 'حفظ الموعد'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="px-5 py-4 bg-slate-50 border-t border-slate-150 text-center">
              <p className="text-[10px] text-on-surface-variant leading-relaxed font-semibold">
                {language === 'en' ? 'Cancellations within 24 hours of the appointment may incur a fee as per clinic policy.' : 'قد تترتب رسوم على الإلغاء قبل أقل من 24 ساعة حسب سياسة العيادة.'}
              </p>
            </div>
          </div>

          {/* Pricing Breakdown Card */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 text-left rtl:text-right">
            <h3 className="text-xs font-extrabold text-on-surface uppercase tracking-wider mb-4">{language === 'en' ? 'Pricing Breakdown' : 'تفاصيل الأسعار'}</h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant font-medium">{language === 'en' ? 'Standard Cleaning' : 'تنظيف قياسي'}</span>
                <span className="font-bold text-slate-800">${appointment.priceBreakdown.standardCleaning.toFixed(2)}</span>
              </div>
              {appointment.priceBreakdown.xRay && (
                <div className="flex justify-between">
                  <span className="text-on-surface-variant font-medium">{language === 'en' ? 'X-Ray (Routine)' : 'أشعة سينية روتينية'}</span>
                  <span className="font-bold text-slate-800">${appointment.priceBreakdown.xRay.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-on-surface-variant font-medium">{language === 'en' ? 'Service Fee' : 'رسوم الخدمة'}</span>
                <span className="font-bold text-slate-800">${appointment.priceBreakdown.serviceFee.toFixed(2)}</span>
              </div>
              
              <div className="h-px bg-slate-150 my-2" />
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-extrabold">{language === 'en' ? 'Total Amount' : 'المبلغ الإجمالي'}</p>
                  <p className="text-xl font-black text-on-surface leading-tight">${appointment.priceBreakdown.total.toFixed(2)}</p>
                </div>
                
                {/* PAYMENT STATUS TOGGLE CHIP */}
                <button
                  type="button"
                  onClick={handleTogglePaymentStatus}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer select-none border shadow-sm transition-all hover:scale-[1.03] ${
                    appointment.paymentStatus === 'Paid'
                      ? 'bg-emerald-50 text-[#009668] border-emerald-100'
                      : 'bg-amber-50 text-amber-700 border-amber-100'
                  }`}
                  title="Click to toggle Paid/Unpaid"
                >
                  <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    payments
                  </span>
                  {appointment.paymentStatus === 'Paid' ? (language === 'en' ? 'Paid' : 'مدفوع') : (language === 'en' ? 'Unpaid' : 'غير مدفوع')}
                </button>
              </div>
              <p className="text-[9px] text-center text-slate-400 font-medium">{language === 'en' ? 'Click the status chip to toggle payment state.' : 'انقر على حالة الدفع لتعديلها.'}</p>
            </div>
          </div>

          {/* Pre-Visit Instructions Card */}
          <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-5 shadow-sm text-left rtl:text-right">
            <div className="flex items-center gap-2 mb-3 text-[#009668]">
              <span className="material-symbols-outlined text-lg">info</span>
              <h3 className="text-xs font-extrabold uppercase tracking-wider">{language === 'en' ? 'Pre-Visit Instructions' : 'تعليمات ما قبل الزيارة'}</h3>
            </div>
            
            <ul className="space-y-2.5 text-xs text-on-surface-variant list-disc pl-5 rtl:pr-5 rtl:pl-0 font-medium leading-relaxed">
              {appointment.preVisitInstructions ? (
                appointment.preVisitInstructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))
              ) : (
                <>
                  <li>{language === 'en' ? 'Please arrive 15 minutes early for paperwork.' : 'يرجى الحضور قبل الموعد بـ 15 دقيقة لإنهاء المعاملات الورقية.'}</li>
                  <li>{language === 'en' ? 'Bring your valid insurance card.' : 'يرجى إحضار بطاقة التأمين السارية.'}</li>
                  <li>{language === 'en' ? 'Avoid eating heavy meals 2 hours prior.' : 'يرجى تجنب تناول الوجبات الثقيلة قبل الموعد بساعتين.'}</li>
                </>
              )}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
