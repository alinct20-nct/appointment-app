import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Doctor, 
  Appointment, 
  WorkingDayHours, 
  BookingLogic, 
  ActivityLog, 
  ActiveTab, 
  UserState 
} from './types';
import {
  INITIAL_DOCTORS,
  INITIAL_APPOINTMENTS,
  INITIAL_WORKING_HOURS,
  INITIAL_BOOKING_LOGIC,
  INITIAL_ACTIVITY_LOGS
} from './data';

// Components
import SignIn from './components/SignIn';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ClinicSettings from './components/ClinicSettings';
import AppointmentDetails from './components/AppointmentDetails';
import { useI18n } from './i18nContext';

export default function App() {
  const { language, t } = useI18n();
  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserState | null>(() => {
    const saved = localStorage.getItem('smilebook_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Database States
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('smilebook_doctors');
    return saved ? JSON.parse(saved) : INITIAL_DOCTORS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('smilebook_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [workingHours, setWorkingHours] = useState<WorkingDayHours[]>(() => {
    const saved = localStorage.getItem('smilebook_working_hours');
    return saved ? JSON.parse(saved) : INITIAL_WORKING_HOURS;
  });

  const [bookingLogic, setBookingLogic] = useState<BookingLogic>(() => {
    const saved = localStorage.getItem('smilebook_booking_logic');
    return saved ? JSON.parse(saved) : INITIAL_BOOKING_LOGIC;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('smilebook_activity_logs');
    return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
  });

  // Layout Navigation States
  const [activeTab, setActiveTab] = useState<ActiveTab>('Dashboard');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingFilter, setBookingFilter] = useState<'All' | 'Confirmed' | 'Cancelled'>('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync back to LocalStorage whenever database state updates
  useEffect(() => {
    localStorage.setItem('smilebook_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('smilebook_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('smilebook_working_hours', JSON.stringify(workingHours));
  }, [workingHours]);

  useEffect(() => {
    localStorage.setItem('smilebook_booking_logic', JSON.stringify(bookingLogic));
  }, [bookingLogic]);

  useEffect(() => {
    localStorage.setItem('smilebook_activity_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Handle Log In & Sign Out
  const handleSignIn = (user: UserState) => {
    setCurrentUser(user);
    localStorage.setItem('smilebook_user', JSON.stringify(user));
    // If patient logged in, direct them to Bookings or Calendar
    if (user.role === 'patient') {
      setActiveTab('Bookings');
    } else {
      setActiveTab('Dashboard');
    }
    setSelectedAppointmentId(null);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('smilebook_user');
  };

  // Add/Update database triggers
  const handleAddDoctor = (newDoc: Doctor) => {
    setDoctors([...doctors, newDoc]);
    // Create log
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      type: 'custom',
      title: 'Doctor Registered',
      description: `${newDoc.name} (${newDoc.specialty}) has joined the SmileBook practice group.`,
      time: 'Just now'
    };
    setActivityLogs([newLog, ...activityLogs]);
  };

  const handleUpdateDoctor = (updatedDoc: Doctor) => {
    setDoctors(doctors.map(d => d.id === updatedDoc.id ? updatedDoc : d));
  };

  const handleUpdateAppointment = (updatedAppt: Appointment) => {
    setAppointments(appointments.map(a => a.id === updatedAppt.id ? updatedAppt : a));
    // Check status difference for logs
    const oldAppt = appointments.find(a => a.id === updatedAppt.id);
    if (oldAppt && oldAppt.status !== updatedAppt.status) {
      const newLog: ActivityLog = {
        id: `log-${Date.now()}`,
        type: updatedAppt.status === 'Cancelled' ? 'custom' : 'appointment_confirmed',
        title: `Appointment ${updatedAppt.status}`,
        description: `Patient ${updatedAppt.patientName}'s ${updatedAppt.title} slot was marked as ${updatedAppt.status}.`,
        time: 'Just now'
      };
      setActivityLogs([newLog, ...activityLogs]);
    }
  };

  const handleAddAppointment = (newApptData: Omit<Appointment, 'id' | 'status' | 'priceBreakdown' | 'timeline'>) => {
    const newId = `SB-${Math.floor(10000 + Math.random() * 90000)}-C`;
    const newAppt: Appointment = {
      ...newApptData,
      id: newId,
      status: 'Confirmed',
      priceBreakdown: {
        standardCleaning: 120,
        serviceFee: 10,
        total: 130
      },
      timeline: {
        created: `Today · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        confirmed: `Today · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      }
    };
    setAppointments([newAppt, ...appointments]);
    // Create log
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      type: 'appointment_confirmed',
      title: 'Appointment Booked',
      description: `New slot provisioned for ${newAppt.patientName} (${newAppt.title}) successfully.`,
      time: 'Just now'
    };
    setActivityLogs([newLog, ...activityLogs]);
  };

  const handleSaveAllChanges = () => {
    alert("SmileBook Settings Saved!\nClinic Hours and Booking Parameters successfully synced with high-security HIPAA backups.");
  };

  // If not logged in, render Sign In Page
  if (!currentUser) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  // Active view determination
  // Active view determination
  let mainContent = null;
  let activeHeaderTitle = activeTab;
  if (activeTab === 'Dashboard') activeHeaderTitle = t('dashboard');
  else if (activeTab === 'Calendar') activeHeaderTitle = t('calendar');
  else if (activeTab === 'Bookings') activeHeaderTitle = t('bookings');
  else if (activeTab === 'Notifications') activeHeaderTitle = t('notifications');
  else if (activeTab === 'Clinic Settings') activeHeaderTitle = t('clinicSettings');

  if (selectedAppointmentId) {
    const selectedAppt = appointments.find(a => a.id === selectedAppointmentId);
    const selectedDoc = doctors.find(d => d.id === selectedAppt?.doctorId) || doctors[0];
    if (selectedAppt) {
      mainContent = (
        <AppointmentDetails 
          appointment={selectedAppt}
          doctor={selectedDoc}
          onBack={() => setSelectedAppointmentId(null)}
          onUpdateAppointment={handleUpdateAppointment}
        />
      );
    } else {
      setSelectedAppointmentId(null);
    }
  } else {
    switch (activeTab) {
      case 'Dashboard':
        mainContent = (
          <Dashboard 
            appointments={appointments}
            doctors={doctors}
            activityLogs={activityLogs}
            currentUser={currentUser}
            onSelectAppointment={setSelectedAppointmentId}
            onAddAppointment={handleAddAppointment}
            onNavigateToTab={(tab) => {
              if (tab === 'Calendar' || tab === 'Clinic Settings') {
                setActiveTab(tab);
              }
            }}
          />
        );
        break;

      case 'Clinic Settings':
        mainContent = (
          <ClinicSettings 
            doctors={doctors}
            workingHours={workingHours}
            bookingLogic={bookingLogic}
            onAddDoctor={handleAddDoctor}
            onUpdateDoctor={handleUpdateDoctor}
            onUpdateWorkingHours={setWorkingHours}
            onUpdateBookingLogic={setBookingLogic}
            onSaveAllChanges={handleSaveAllChanges}
          />
        );
        break;

      case 'Calendar':
        // Custom Calendar Grid rendering for October 2023
        const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
        const startOffset = 0; // Oct 1, 2023 was a Sunday
        
        mainContent = (
          <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <h3 className="text-xl font-bold">Interactive Clinic Calendar</h3>
                <p className="text-xs text-on-surface-variant">Click on scheduled slots inside October 2023 to view direct patient details.</p>
              </div>
              <div className="flex gap-2 text-xs font-bold bg-slate-100 p-1 rounded-lg">
                <button className="px-3 py-1.5 bg-white text-slate-800 rounded shadow-sm">October 2023</button>
                <button className="px-3 py-1.5 text-slate-500 cursor-not-allowed" disabled>November 2023</button>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Actual Calendar Block */}
              <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs uppercase tracking-wider text-slate-500 mb-3 border-b border-slate-100 pb-3">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {/* Empty offsets */}
                  {Array.from({ length: startOffset }).map((_, i) => (
                    <div key={`offset-${i}`} className="h-24 bg-slate-50 rounded-lg opacity-40 border border-slate-100" />
                  ))}

                  {/* Day cells */}
                  {calendarDays.map((day) => {
                    const dateStr = `2023-10-${day.toString().padStart(2, '0')}`;
                    const dayAppointments = appointments.filter(a => a.dateRaw === dateStr && a.status !== 'Cancelled');
                    const isTodayMock = day === 24; // Visual focus on Oct 24
                    
                    return (
                      <div 
                        key={day} 
                        className={`h-24 p-2 rounded-lg border flex flex-col justify-between transition-all ${
                          isTodayMock 
                            ? 'bg-blue-50/50 border-[#009668] ring-1 ring-[#009668]' 
                            : 'bg-white border-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <span className={`text-xs font-bold ${
                          isTodayMock ? 'text-[#009668]' : 'text-slate-800'
                        }`}>
                          {day}
                          {isTodayMock && <span className="ml-1 text-[9px] font-black uppercase bg-[#009668] text-white px-1 py-0.5 rounded">Today</span>}
                        </span>

                        <div className="space-y-1 overflow-y-auto">
                          {dayAppointments.map(appt => (
                            <button
                              key={appt.id}
                              onClick={() => setSelectedAppointmentId(appt.id)}
                              className="w-full text-left truncate text-[9px] font-bold bg-[#009668] text-white px-1.5 py-0.5 rounded cursor-pointer hover:opacity-90 block"
                            >
                              {appt.time.split(' — ')[0]} {appt.patientName.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Info Pane */}
              <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Scheduled Today (Oct 24)</h4>
                  <div className="space-y-3">
                    {appointments.filter(a => a.dateRaw === '2023-10-24').map(appt => {
                      const doctor = doctors.find(d => d.id === appt.doctorId);
                      return (
                        <div 
                          key={appt.id}
                          onClick={() => setSelectedAppointmentId(appt.id)}
                          className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-150 rounded-lg cursor-pointer transition-all flex justify-between items-center"
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-800">{appt.patientName}</p>
                            <p className="text-[10px] text-slate-500 font-semibold">{appt.title} ({doctor?.name || 'Practitioner'})</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-black text-slate-700 bg-white border px-2 py-0.5 rounded shadow-sm">
                              {appt.time.split(' — ')[0]}
                            </span>
                            <span className={`block text-[9px] font-bold uppercase tracking-wider mt-1 ${
                              appt.status === 'Cancelled' ? 'text-red-500' : 'text-[#009668]'
                            }`}>
                              {appt.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-xs font-semibold text-slate-700 leading-normal mt-6">
                  <span className="material-symbols-outlined text-[#0058be] text-sm mr-1">info</span>
                  Clinic Staff can add, reschedule, or cancel directly. Patients can review schedules in read-only mode.
                </div>
              </div>
            </div>
          </div>
        );
        break;

      case 'Bookings':
        // Tabular grid of all system bookings
        const filteredBookings = appointments.filter(appt => {
          // Search query check
          const matchSearch = searchQuery.trim() === '' || 
            appt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            appt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            appt.id.toLowerCase().includes(searchQuery.toLowerCase());
          
          // Status filter check
          const matchFilter = bookingFilter === 'All' || appt.status === bookingFilter;
          
          return matchSearch && matchFilter;
        });

        mainContent = (
          <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-xl font-bold">Comprehensive Bookings Registry</h3>
                <p className="text-xs text-on-surface-variant">View details, modify payment tags, and click on any row to open the active timeline.</p>
              </div>

              {/* Status Filters */}
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg text-xs font-bold">
                {(['All', 'Confirmed', 'Cancelled'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setBookingFilter(f)}
                    className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
                      bookingFilter === f ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/40">
                <span className="material-symbols-outlined text-outline">search</span>
                <input 
                  type="text"
                  placeholder="Filter bookings by patient name, treatment, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs font-medium outline-none text-on-surface placeholder:text-outline-variant"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase">Appointment ID</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase">Patient</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase">Date &amp; Time</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase">Treatment</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase">Payment</th>
                      <th className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-10 text-slate-400 font-bold">No matching bookings found.</td>
                      </tr>
                    ) : (
                      filteredBookings.map(appt => (
                        <tr 
                          key={appt.id}
                          onClick={() => setSelectedAppointmentId(appt.id)}
                          className="hover:bg-slate-50/50 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4 font-bold text-[#0058be]">#{appt.id}</td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-800">{appt.patientName}</p>
                            <p className="text-slate-400 text-[10px]">{appt.patientPhone}</p>
                          </td>
                          <td className="px-6 py-4 font-medium text-slate-700">
                            <p>{appt.date}</p>
                            <p className="text-slate-400 text-[10px] font-semibold">{appt.time.split(' — ')[0]} ({appt.room})</p>
                          </td>
                          <td className="px-6 py-4 font-semibold text-slate-800">{appt.title}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              appt.paymentStatus === 'Paid' ? 'bg-emerald-50 text-[#009668]' : 'bg-amber-50 text-amber-700'
                            }`}>
                              {appt.paymentStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              appt.status === 'Confirmed' ? 'bg-[#009668] text-white' : 'bg-slate-200 text-slate-500'
                            }`}>
                              {appt.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        break;

      case 'Notifications':
        mainContent = (
          <div className="p-8 space-y-6 max-w-[1400px] mx-auto">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div>
                <h3 className="text-xl font-bold">Security Alerts &amp; Auditing Log</h3>
                <p className="text-xs text-on-surface-variant">Real-time tracking of clinic registrations, rescheduled treatments, and active database triggers.</p>
              </div>
              <button 
                onClick={() => {
                  setActivityLogs(INITIAL_ACTIVITY_LOGS);
                  alert("Audit log successfully reset!");
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
              >
                Reset Logs
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm divide-y divide-slate-100">
              {activityLogs.map((log) => (
                <div key={log.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                    log.type === 'payment_received' 
                      ? 'bg-blue-50 text-secondary' 
                      : log.type === 'system_update' 
                        ? 'bg-amber-50 text-[#F59E0B]' 
                        : 'bg-emerald-50 text-[#009668]'
                  }`}>
                    <span className="material-symbols-outlined text-lg">
                      {log.type === 'payment_received' ? 'payments' : log.type === 'system_update' ? 'system_update' : 'check_circle'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-800">{log.title}</h4>
                      <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-500">{log.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{log.description}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 font-bold">Facility Code: SmileBook-Downtown-01</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;
    }
  }

  // Action Button for Header
  let headerActionButton = null;
  if (activeTab === 'Clinic Settings' && !selectedAppointmentId) {
    headerActionButton = (
      <button 
        onClick={handleSaveAllChanges}
        className="bg-[#009668] hover:bg-[#007b55] text-white px-5 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 hover:shadow transition-all active:scale-95 cursor-pointer"
      >
        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
        {language === 'en' ? 'Save Changes' : 'حفظ التغييرات'}
      </button>
    );
  }

  return (
    <div id="smilebook-app-root" className="min-h-screen bg-surface-background">
      {/* Sidebar navigation */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedAppointmentId(null);
        }}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content shell (padded to make space for fixed Sidebar) */}
      <div className={`${language === 'ar' ? 'mr-0 lg:mr-64 ml-0' : 'ml-0 lg:ml-64 mr-0'} min-h-screen transition-all`}>
        <Header 
          title={selectedAppointmentId ? (language === 'en' ? 'Appointment Details' : 'تفاصيل الموعد') : activeHeaderTitle}
          showSearch={activeTab === 'Dashboard' && !selectedAppointmentId}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onBack={selectedAppointmentId ? () => setSelectedAppointmentId(null) : undefined}
          backLabel={selectedAppointmentId ? (language === 'en' ? 'Back' : 'رجوع') : undefined}
          actionButton={headerActionButton}
          currentUser={currentUser}
          onSignOut={handleSignOut}
          onMenuToggle={() => setIsSidebarOpen(true)}
        />

        {/* Content Canvas */}
        <main className="pt-16 min-h-[calc(100vh-4rem)]">
          {mainContent}
        </main>
      </div>
    </div>
  );
}
