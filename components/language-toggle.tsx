'use client';

import { useLanguage } from '@/lib/i18n/language';

/** Stacked language buttons: English on top, Español underneath. */
export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const base =
    'block w-full rounded-full border px-2 py-[2px] text-center text-[12px] font-bold leading-[1.15] tracking-[0.02em] transition-colors';
  const on = 'border-[#0F172A] bg-[#0F172A] text-white';
  const off = 'border-[#0F172A]/60 bg-white/70 text-[#0F172A] hover:bg-white';
  return (
    <div
      data-no-translate
      role="group"
      aria-label="Language / Idioma"
      className={`flex shrink-0 flex-col gap-[3px] ${className}`}
    >
      <button
        type="button"
        lang="en"
        aria-pressed={lang === 'en'}
        onClick={() => lang !== 'en' && setLang('en')}
        className={`${base} ${lang === 'en' ? on : off}`}
      >
        English
      </button>
      <button
        type="button"
        lang="es"
        aria-pressed={lang === 'es'}
        onClick={() => lang !== 'es' && setLang('es')}
        className={`${base} ${lang === 'es' ? on : off}`}
      >
        Español
      </button>
    </div>
  );
}
