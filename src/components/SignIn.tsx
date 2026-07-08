import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserState } from '../types';
import { useI18n } from '../i18nContext';

interface SignInProps {
  onSignIn: (user: UserState) => void;
}

export default function SignIn({ onSignIn }: SignInProps) {
  const { language, setLanguage, t } = useI18n();
  const [role, setRole] = useState<'patient' | 'staff'>('staff');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRoleChange = (selectedRole: 'patient' | 'staff') => {
    setRole(selectedRole);
    if (selectedRole === 'staff') {
      setPhone('+1 (555) 123-4567');
      setPassword('admin123');
    } else {
      setPhone('+1 (555) 000-0000');
      setPassword('patient123');
    }
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) {
      setErrorMsg(language === 'en' ? 'Please enter your phone number' : 'يرجى إدخال رقم الهاتف الخاص بك');
      return;
    }
    
    // Auto login based on roles
    if (role === 'staff') {
      onSignIn({
        role: 'staff',
        phone: phone,
        name: 'Admin Sarah'
      });
    } else {
      onSignIn({
        role: 'patient',
        phone: phone,
        name: 'Sarah Jenkins'
      });
    }
  };

  // Quick autofill helper
  const handleAutofill = (type: 'staff' | 'patient') => {
    handleRoleChange(type);
  };

  return (
    <div id="signin-root" className="flex h-screen w-full bg-surface-background font-sans text-on-surface overflow-hidden relative">
      {/* Absolute Floating Language Switcher */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-[#009668] hover:text-[#007b55] text-xs font-bold rounded-full shadow-md border border-slate-200 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">translate</span>
          <span>{language === 'en' ? 'العربية' : 'English'}</span>
        </button>
      </div>

      {/* Left Section: Brand & Value Proposition */}
      <section className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-10 bg-[#009668] text-white overflow-y-auto">
        {/* Decorative background element */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_45%)] pointer-events-none" />

        <div className="relative z-10">
          {/* Branding Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-lg shadow-lg">
              <span className="material-symbols-outlined text-[#009668] text-2xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                dentistry
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">{t('appName')}</h1>
          </div>

          {/* Value Proposition */}
          <div className="mt-12 max-w-lg">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-extrabold leading-tight mb-6"
            >
              {t('subtitle')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-tertiary-fixed leading-relaxed opacity-90"
            >
              {t('tagline')}
            </motion.p>
          </div>
        </div>

        {/* Features Bento-lite */}
        <div className="relative z-10 grid grid-cols-2 gap-4 my-6">
          <motion.div 
            whileHover={{ y: -2 }}
            className="glass-card p-4 rounded-xl text-white"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="material-symbols-outlined text-[#6ffbbe]">verified_user</span>
              <span className="font-semibold text-sm">{t('secureAndCompliant')}</span>
            </div>
            <p className="text-xs opacity-80 leading-snug">{t('secureDesc')}</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -2 }}
            className="glass-card p-4 rounded-xl text-white"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="material-symbols-outlined text-[#6ffbbe]">insights</span>
              <span className="font-semibold text-sm">{t('efficiency')}</span>
            </div>
            <p className="text-xs opacity-80 leading-snug">{t('efficiencyDesc')}</p>
          </motion.div>
        </div>

        {/* Showcase Image Card */}
        <div className="relative z-10 w-full max-w-xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 group">
            <img 
              referrerPolicy="no-referrer"
              className="w-full h-48 xl:h-56 object-cover transform transition-transform duration-700 group-hover:scale-105" 
              alt="Dental reception desk area with computer" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIjBzr-bXoj6c8kHuzjI_EE2KE4U59wgUXZucJxqBYk8q808bgrMSt28l5GHxfBRGN_1GEpMyIpmUth9uuJoGRhNO2ZUIgQ0r0u9SYCC1vzfyFeTVeDiQh0NF5T2HssKZrSTF0nwQpqPZ5BQi4FA7OdS__ozpVr3Ej85m_j_qb5KYhFHUuk5uIejPr1vjDToG6ZlM73K1h4OaWOwj3VjRG6imLaoTBd0YP-3sbC3U7zpo8YBaqeW95dA"
            />
          </div>
          <div className="mt-3 flex justify-center items-center gap-2 text-white/75 text-xs font-semibold">
            <span className="material-symbols-outlined text-base">groups</span>
            <span>{t('joinClinics')}</span>
          </div>
        </div>
      </section>

      {/* Right Section: Login Form */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 bg-surface-background overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          {/* Welcome Header */}
          <div className="text-center lg:text-left space-y-1.5">
            <h2 className="text-3xl font-bold tracking-tight text-on-background">{t('welcomeBack')}</h2>
            <p className="text-sm text-on-surface-variant">{t('welcomeDesc')}</p>
          </div>

          {/* Patient/Clinic Toggle */}
          <div className="bg-surface-container-low p-1 rounded-lg flex gap-1 w-full border border-surface-border">
            <button 
              type="button"
              className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                role === 'patient' 
                  ? 'bg-white text-[#009668] shadow-sm ring-1 ring-black/5' 
                  : 'text-on-surface-variant hover:bg-white/50'
              }`}
              onClick={() => handleRoleChange('patient')}
            >
              {t('patient')}
            </button>
            <button 
              type="button"
              className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                role === 'staff' 
                  ? 'bg-white text-[#009668] shadow-sm ring-1 ring-black/5' 
                  : 'text-on-surface-variant hover:bg-white/50'
              }`}
              onClick={() => handleRoleChange('staff')}
            >
              {t('staff')}
            </button>
          </div>

          {/* Preset Fill badging to ease testing */}
          <div className="p-3 bg-[#e5eeff]/50 rounded-lg border border-[#dce9ff] text-xs flex flex-wrap gap-2 items-center">
            <span className="font-semibold text-[#0058be]">{t('autofill')}</span>
            <button 
              type="button" 
              onClick={() => handleAutofill('staff')}
              className="px-2 py-1 bg-white hover:bg-blue-50 border border-[#c6c6cd] rounded font-medium text-slate-700 cursor-pointer transition-colors text-xs"
            >
              {t('staffAdmin')}
            </button>
            <button 
              type="button" 
              onClick={() => handleAutofill('patient')}
              className="px-2 py-1 bg-white hover:bg-blue-50 border border-[#c6c6cd] rounded font-medium text-slate-700 cursor-pointer transition-colors text-xs"
            >
              {t('patientPortal')}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-semibold border border-red-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-base">error</span>
                {errorMsg}
              </div>
            )}

            {/* Phone Number Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-on-surface" htmlFor="phone">{t('phoneNumber')}</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-outline">
                  call
                </span>
                <input 
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rtl:pl-4 rtl:pr-11 bg-white border border-surface-border rounded-lg focus:ring-2 focus:ring-[#009668] focus:border-[#009668] transition-all outline-none text-on-surface placeholder:text-outline-variant text-sm font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-on-surface" htmlFor="password">{t('password')}</label>
                <button 
                  type="button"
                  onClick={() => alert(t('simulatedReset'))}
                  className="text-xs font-semibold text-[#0058be] hover:underline"
                >
                  {t('forgotPassword')}
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-outline">
                  lock
                </span>
                <input 
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 pl-11 pr-11 rtl:pl-11 rtl:pr-11 bg-white border border-surface-border rounded-lg focus:ring-2 focus:ring-[#009668] focus:border-[#009668] transition-all outline-none text-on-surface placeholder:text-outline-variant text-sm font-medium"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-outline cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input 
                id="remember" 
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded border-surface-border text-[#009668] focus:ring-[#009668] transition-all cursor-pointer"
              />
              <label className="text-xs font-medium text-on-surface-variant cursor-pointer select-none" htmlFor="remember">
                {t('rememberDevice')}
              </label>
            </div>

            {/* Sign In Button */}
            <button 
              type="submit"
              className="w-full h-12 bg-[#009668] hover:bg-[#007b55] text-white font-semibold text-base rounded-lg shadow-lg hover:shadow-xl transition-all transform active:scale-[0.98] cursor-pointer"
            >
              {t('signInBtn')}
            </button>
          </form>

          {/* Signup Prompt */}
          <p className="text-center text-xs text-on-surface-variant font-medium">
            {t('newToPlatform')}{' '}
            <button 
              type="button"
              onClick={() => alert(t('simulationIntake'))}
              className="text-[#009668] font-bold hover:underline cursor-pointer"
            >
              {t('createAccount')}
            </button>
          </p>

          {/* Footer Links */}
          <div className="pt-8 flex justify-center gap-6 text-xs text-outline opacity-75">
            <button onClick={() => alert("Privacy Policy Details")} className="hover:text-on-surface cursor-pointer">{t('privacyPolicy')}</button>
            <button onClick={() => alert("Terms of Service Agreement")} className="hover:text-on-surface cursor-pointer">{t('termsOfService')}</button>
            <button onClick={() => alert("Redirecting to help desk...")} className="hover:text-on-surface cursor-pointer">{t('support')}</button>
          </div>
        </div>
      </section>
    </div>
  );
}
