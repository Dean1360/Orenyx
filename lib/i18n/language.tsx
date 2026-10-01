'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import ES from './es.json';

/**
 * Site-wide English / Spanish switch.
 *
 * English is the source text in the components. When Spanish is chosen, every
 * visible text node and the readable attributes (placeholder, aria-label,
 * title, alt) are swapped for their Spanish version from `es.json`. A
 * MutationObserver keeps new content (route changes, form states, menus)
 * translated too. Choosing English reloads the page so React renders the
 * original text. The choice is saved in localStorage + a cookie.
 */

export type Lang = 'en' | 'es';
const KEY = 'orenyx-lang';
const DICT = ES as Record<string, string>;
const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'] as const;

// Partial phrases for numbers/prices built at runtime (e.g. "$749/mo").
const RULES: [RegExp, string][] = [
  [/\/mo\b\.?/g, '/mes'],
  [/ \/ month\b/g, ' / mes'],
  [/ per month\b/g, ' al mes'],
  [/ per additional minute\b/g, ' por minuto adicional'],
  [/ one-time setup\b/g, ' de configuración (pago único)'],
  [/ one-time implementation\b/g, ' de implementación (pago único)'],
  [/ AI call minutes\b/g, ' minutos de llamadas con IA'],
];

const norm = (s: string) => s.replace(/\s+/g, ' ').trim();

function lookup(raw: string, ctx?: string | null): string | null {
  const core = raw.trim();
  if (!core || !/[A-Za-z]/.test(core)) return null;
  const hit = (ctx ? DICT[`${ctx}|${core}`] : undefined) ?? DICT[core] ?? DICT[norm(core)];
  let out: string | null = hit ?? null;
  if (out == null) {
    let t = core;
    for (const [re, rep] of RULES) t = t.replace(re, rep);
    if (t !== core) out = t;
  }
  if (out == null) return null;
  const lead = raw.match(/^\s*/)![0];
  const trail = raw.match(/\s*$/)![0];
  return lead + out + trail;
}

const lastSet = new WeakMap<Node, string>();
const lastAttr = new WeakMap<Element, Record<string, string>>();

function skip(el: Element | null) {
  return !el || !!el.closest('script,style,noscript,[data-no-translate]');
}

function translateTextNode(n: Text) {
  const v = n.nodeValue ?? '';
  if (lastSet.get(n) === v) return;
  if (skip(n.parentElement)) return;
  const t = lookup(v, n.parentElement?.closest('[data-i18n-ctx]')?.getAttribute('data-i18n-ctx'));
  if (t != null && t !== v) {
    n.nodeValue = t;
    lastSet.set(n, t);
  } else {
    lastSet.set(n, v);
  }
}

function translateAttrs(el: Element) {
  if (skip(el)) return;
  const seen = lastAttr.get(el) ?? {};
  for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (v == null || seen[a] === v) continue;
    const t = lookup(v);
    if (t != null && t !== v) {
      el.setAttribute(a, t);
      seen[a] = t;
    } else seen[a] = v;
  }
  lastAttr.set(el, seen);
}

function translateTree(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root as Text);
    return;
  }
  if (root.nodeType !== Node.ELEMENT_NODE) return;
  const el = root as Element;
  translateAttrs(el);
  el.querySelectorAll('[placeholder],[aria-label],[title],[alt]').forEach(translateAttrs);
  const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let n: Node | null;
  while ((n = w.nextNode())) translateTextNode(n as Text);
}

function translateHead() {
  const t = lookup(document.title);
  if (t && t !== document.title) document.title = t;
  const md = document.querySelector('meta[name="description"]');
  const c = md?.getAttribute('content');
  if (md && c) {
    const tc = lookup(c);
    if (tc && tc !== c) md.setAttribute('content', tc);
  }
}

let observer: MutationObserver | null = null;

function startSpanish() {
  document.documentElement.lang = 'es';
  translateTree(document.body);
  translateHead();
  if (observer) return;
  observer = new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'characterData') translateTextNode(m.target as Text);
      else if (m.type === 'attributes') translateAttrs(m.target as Element);
      else m.addedNodes.forEach(translateTree);
    }
    translateHead();
  });
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: [...ATTRS],
  });
  const title = document.querySelector('title');
  if (title) observer.observe(title, { childList: true, characterData: true, subtree: true });
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LanguageContext = createContext<Ctx>({ lang: 'en', setLang: () => {} });

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    if (saved !== 'es') {
      document.documentElement.classList.remove('i18n-es-pending');
      return;
    }
    setLangState('es');
    // Wait until React has finished hydrating every part of the page
    // (including streamed/Suspense sections) before swapping text.
    const go = () =>
      setTimeout(() => {
        startSpanish();
        document.documentElement.classList.remove('i18n-es-pending');
      }, 60);
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
  }, []);

  const setLang = useCallback((l: Lang) => {
    try {
      localStorage.setItem(KEY, l);
    } catch {}
    document.cookie = `${KEY}=${l}; path=/; max-age=31536000; samesite=lax`;
    if (l === 'en') {
      window.location.reload();
      return;
    }
    setLangState('es');
    startSpanish();
  }, []);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

/** Inline <head> script: hides the page briefly for Spanish visitors so English doesn't flash. */
export const LANG_BOOT_SCRIPT = `try{if(localStorage.getItem('${KEY}')==='es'){var d=document.documentElement;d.lang='es';d.classList.add('i18n-es-pending');setTimeout(function(){d.classList.remove('i18n-es-pending')},2500)}}catch(e){}`;
