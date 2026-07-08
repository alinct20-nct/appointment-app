import React from 'react';
import { UserState } from '../types';
import { useI18n } from '../i18nContext';

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
  onBack?: () => void;
  backLabel?: string;
  actionButton?: React.ReactNode;
  currentUser: UserState;
  onSignOut: () => void;
  onMenuToggle?: () => void;
}

export default function Header({
  title,
  showSearch = false,
  searchQuery = '',
  setSearchQuery,
  onBack,
  backLabel,
  actionButton,
  currentUser,
  onSignOut,
  onMenuToggle
}: HeaderProps) {
  const { language, setLanguage, t } = useI18n();

  return (
    <header 
      id="smilebook-header"
      className={`fixed ${language === 'ar' ? 'right-0 lg:right-64 left-0' : 'left-0 lg:left-64 right-0'} top-0 h-16 bg-white flex justify-between items-center px-4 sm:px-6 border-b border-surface-border z-40 shadow-sm`}
    >
      {/* Left side: Menu toggle (mobile) + Back button OR Title OR Search */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
        {onMenuToggle && (
          <button 
            onClick={onMenuToggle}
            className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg text-on-surface-variant transition-colors cursor-pointer flex-shrink-0"
            title={language === 'en' ? 'Open Menu' : 'فتح القائمة'}
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
        )}

        {onBack ? (
          <button 
            onClick={onBack}
            className="hover:text-[#009668] transition-colors flex items-center gap-1.5 font-semibold text-sm text-on-surface-variant cursor-pointer flex-shrink-0"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span className="hidden xs:inline">{backLabel || (language === 'en' ? 'Back' : 'رجوع')}</span>
          </button>
        ) : showSearch ? (
          <div className="relative w-full max-w-xs sm:max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input 
              type="text"
              placeholder={language === 'en' ? "Search patients, records..." : "البحث عن المرضى والسجلات..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-1.5 text-xs font-medium focus:ring-2 focus:ring-[#009668] focus:border-[#009668] outline-none transition-all text-on-surface"
            />
          </div>
        ) : (
          <h2 className="text-base sm:text-xl font-bold text-on-background truncate">{title}</h2>
        )}
      </div>

      {/* Right side: Utilities & CTA */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        {/* Language Switcher */}
        <button 
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1 px-2.5 py-1 hover:bg-slate-100 rounded-full text-xs font-bold text-[#009668] border border-slate-200 transition-colors cursor-pointer"
          title={language === 'en' ? 'Switch to Arabic' : 'التحويل إلى الإنجليزية'}
        >
          <span className="material-symbols-outlined text-base">translate</span>
          <span>{language === 'en' ? 'العربية' : 'English'}</span>
        </button>

        {/* Help & Notification Badges */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button 
            onClick={() => alert(language === 'en' ? "SmileBook Help Center: For support call +1 (555) HELP-000" : "مركز مساعدة سميل بوك: للدعم اتصل على +1 (555) HELP-000")}
            className="p-1.5 hover:bg-slate-100 rounded-full text-on-surface-variant transition-colors cursor-pointer"
            title={language === 'en' ? 'Help Support' : 'الدعم والمساعدة'}
          >
            <span className="material-symbols-outlined text-lg sm:text-xl">help</span>
          </button>
          
          <button 
            onClick={() => alert(language === 'en' ? "No new notifications at this time." : "لا توجد تنبيهات جديدة في الوقت الحالي.")}
            className="relative p-1.5 hover:bg-slate-100 rounded-full text-on-surface-variant transition-colors cursor-pointer"
            title={language === 'en' ? 'Notifications' : 'التنبيهات'}
          >
            <span className="material-symbols-outlined text-lg sm:text-xl">notifications</span>
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 mx-0.5 sm:mx-1" />

        {/* Quick logout link */}
        <button 
          onClick={onSignOut}
          className="text-xs font-semibold text-on-surface-variant hover:text-red-500 transition-colors cursor-pointer flex items-center gap-1"
          title={t('signOut')}
        >
          <span className="material-symbols-outlined text-base">logout</span>
          <span className="hidden md:inline">{t('signOut')}</span>
        </button>

        {/* Context-aware Action Button */}
        {actionButton && (
          <div className="ml-1 sm:ml-2 animate-fade-in">
            {actionButton}
          </div>
        )}
      </div>
    </header>
  );
}
