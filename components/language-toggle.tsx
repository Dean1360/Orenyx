'use client';

import { useLanguage } from '@/lib/i18n/language';

/** Inline language switch: EN | ESP */
export function LanguageToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const base = 'bg-transparent px-1 py-[1px] text-[13px] font-bold leading-[1.2] !tracking-[0.04em] normal-case transition-opacity';
  const on = '!text-[#0F172A] opacity-100 font-extrabold';
  const off = '!text-[#0F172A] opacity-50 hover:opacity-100';
  return (
    <div
      data-no-translate
      role="group"
      aria-label="Language / Idioma"
      className={`inline-flex shrink-0 items-center gap-[2px] rounded-full border-[1.5px] border-[#0F172A] bg-white px-3 py-[3px] ${className}`}
    >
      <button
        type="button"
        lang="en"
        aria-label="English"
        aria-pressed={lang === 'en'}
        onClick={() => lang !== 'en' && setLang('en')}
        className={`${base} ${lang === 'en' ? on : off}`}
      >
        EN
      </button>
      <span aria-hidden="true" className="text-[#0F172A] text-[13px] opacity-40">|</span>
      <button
        type="button"
        lang="es"
        aria-label="Español"
        aria-pressed={lang === 'es'}
        onClick={() => lang !== 'es' && setLang('es')}
        className={`${base} ${lang === 'es' ? on : off}`}
      >
        ESP
      </button>
    </div>
  );
}
