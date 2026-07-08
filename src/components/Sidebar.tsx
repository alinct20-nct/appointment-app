import React from 'react';
import { ActiveTab, UserState } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useI18n } from '../i18nContext';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  currentUser: UserState;
  onSignOut: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, currentUser, onSignOut, isOpen, onClose }: SidebarProps) {
  const { language, t } = useI18n();
  const isPatient = currentUser.role === 'patient';
  const isRtl = language === 'ar';

  // Navigation Items with keys
  const navItems: { id: ActiveTab; key: 'dashboard' | 'calendar' | 'bookings' | 'notifications' | 'clinicSettings'; icon: string }[] = [
    { id: 'Dashboard', key: 'dashboard', icon: 'dashboard' },
    { id: 'Calendar', key: 'calendar', icon: 'calendar_today' },
    { id: 'Bookings', key: 'bookings', icon: 'event_note' },
    { id: 'Notifications', key: 'notifications', icon: 'notifications' },
    { id: 'Clinic Settings', key: 'clinicSettings', icon: 'settings' }
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Branding Header */}
      <div className="mb-8 px-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#009668] flex items-center justify-center rounded-lg shadow-md">
              <span className="material-symbols-outlined text-white text-lg font-semibold" style={{ fontVariationSettings: "'FILL' 1" }}>
                dentistry
              </span>
            </div>
            <h1 className="text-xl font-bold text-[#009668] tracking-tight">{t('appName')}</h1>
          </div>
          <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider opacity-70 mt-1">
            {language === 'en' ? 'Dental Care System' : 'نظام رعاية الأسنان المتكامل'}
          </p>
        </div>
        {/* Mobile close button */}
        <button 
          onClick={onClose}
          className="lg:hidden p-1.5 text-on-surface-variant hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          title={isRtl ? 'إغلاق القائمة' : 'Close Sidebar'}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                onClose(); // Auto close on mobile
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-blue-50 text-[#009668] border border-blue-100/50 shadow-sm scale-[0.98]'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-[#009668]'
              }`}
            >
              <span 
                className={`material-symbols-outlined transition-transform`}
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span>{t(item.key)}</span>
              {item.id === 'Notifications' && (
                <span className={`${isRtl ? 'mr-auto ml-1' : 'ml-auto mr-1'} w-2 h-2 bg-red-500 rounded-full`} />
              )}
            </button>
          );
        })}
      </nav>

      {/* User Information Card */}
      <div className="mt-auto border-t border-surface-border pt-6 px-2">
        <div className="flex items-center gap-3 p-2 bg-slate-50/50 rounded-xl border border-slate-100">
          <div className="w-10 h-10 rounded-full border-2 border-[#009668] overflow-hidden bg-slate-100 flex-shrink-0 shadow-sm">
            <img 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              alt={currentUser.name}
              src={
                isPatient
                  ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAml4BDV156h8gRAucguhZTgymDA4wRaGwMkzfJ5uP0Bc6GKbqEuCHcsZWqTTsGi__bkuxLAJEeyHt0Dvrexf45B-OoAkZjC9WGgqYaexx87Z96jCyDpmFTsFysDP-3ULrUBEa8pDK-iELVd65S-x8gS3OCF206tkmHrt6YHxgLqtZRo_wEZaQKHokSJNb69I5OGXKz8jjjfqdeoSYPF9rAZPEDBfEyeFvzd2LtZ08nbf0LV5cPXuorZg'
                  : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe5VDDU9prvbanuCm1YKM2jCRerEE21_-_C5MgaNpm45VY7uqHhRXPj4H8yIK3ZfZkNfl6LS9EUO4QHV4Pyfcz72gTTtS_DUFPbjRIfDHWTok3UngGTugOAOJbZHT2XMNQs00nELPsxLnS086xUTQIfeGKZAxjeCAEb1rsh7y1c5Oz76dpEmIeuVLwJxuj3uHU6n1GwRlbdNmt5Zb9Yy-Y1b7mp3My8MXWHokZIqiaJHMCgfH7edbRDQ'
              }
            />
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-bold text-on-surface truncate">{currentUser.name}</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider truncate font-semibold">
              {isPatient ? t('patientMember') : t('clinicAdmin')}
            </p>
          </div>
        </div>
        
        {/* Sign Out Trigger */}
        <button 
          onClick={onSignOut}
          className="mt-3 w-full py-2 px-4 border border-red-100 hover:bg-red-50 text-red-600 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          {t('signOut')}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside 
        id="smilebook-sidebar-desktop"
        className={`hidden lg:flex fixed ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} top-0 h-screen flex-col py-6 px-4 bg-white border-surface-border w-64 z-50 transition-all shadow-sm`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black z-50"
            />
            {/* Drawer Panel */}
            <motion.aside 
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className={`lg:hidden fixed ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} top-0 h-screen flex flex-col py-6 px-4 bg-white border-surface-border w-64 z-55 shadow-xl`}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
