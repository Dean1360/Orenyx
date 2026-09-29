'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { InquiryField } from '@/content/inquiry-forms';

type State = 'idle' | 'sending' | 'error';

const label = 'block text-[15px] font-medium text-white/90';
const field =
  'mt-2 w-full rounded-[8px] border border-white/15 bg-[#2E2A63] px-4 py-3.5 text-[15px] ' +
  'text-white placeholder:text-white/45 focus:border-violet-bright focus:outline-none';
const selectField = `${field} appearance-none pr-10`;
const textareaField = `${field} min-h-[100px] resize-y`;

/**
 * Shared inquiry form. Questions come from content/inquiry-forms.ts and
 * match the Orenyx Pricing Calculator. No prices are shown here.
 */
export function InquiryForm({
  id,
  endpoint,
  fields,
  submitLabel,
  footnote,
  fallbackEmail,
}: {
  id: string;
  endpoint: string;
  fields: InquiryField[];
  submitLabel: string;
  footnote: string;
  fallbackEmail: string;
}) {
  const router = useRouter();
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit() {
    const form = document.getElementById(id) as HTMLFormElement | null;
    if (!form || !form.reportValidity()) return;
    setState('sending');
    setMessage('');
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      router.push('/thank-you');
    } catch {
      setState('error');
      setMessage(`That request did not go through. Try again, or email ${fallbackEmail} directly.`);
    }
  }

  return (
    <form id={id} className="w-full">
      {fields.map((f, i) => {
        const req = f.required ? <span className="text-[#f87171]"> *</span> : null;
        const hint = 'hint' in f && f.hint ? <p className="mt-1.5 text-[13px] text-white/55">{f.hint}</p> : null;
        return (
          <div key={f.name} className={i === 0 ? '' : 'mt-5'}>
            <label htmlFor={`${id}-${f.name}`} className={label}>
              {f.label}
              {req}
            </label>
            {f.type === 'select' ? (
              <SelectWrap>
                <select
                  id={`${id}-${f.name}`}
                  name={f.name}
                  required={f.required}
                  className={selectField}
                  defaultValue=""
                >
                  <option value="" disabled>
                    {f.placeholder}
                  </option>
                  {f.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </SelectWrap>
            ) : f.type === 'textarea' ? (
              <textarea
                id={`${id}-${f.name}`}
                name={f.name}
                required={f.required}
                placeholder={f.placeholder}
                className={textareaField}
              />
            ) : f.type === 'number' ? (
              <input
                id={`${id}-${f.name}`}
                name={f.name}
                type="number"
                inputMode="numeric"
                min={f.min}
                step={1}
                required={f.required}
                placeholder={f.placeholder}
                className={field}
              />
            ) : (
              <input
                id={`${id}-${f.name}`}
                name={f.name}
                type={f.type}
                required={f.required}
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
                className={field}
              />
            )}
            {hint}
          </div>
        );
      })}

      {/* Bot trap. Real people never see it, so anything in it is spam. */}
      <input
        type="text"
        name="hp_field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px]"
      />

      <Button
        type="button"
        variant="light"
        arrow={false}
        onClick={handleSubmit}
        disabled={state === 'sending'}
        className="mt-7 w-full py-4"
      >
        {state === 'sending' ? 'Sending' : submitLabel}
      </Button>

      <p className="mt-4 text-center text-[13px] text-white/55">{footnote}</p>

      {message ? (
        <p role="alert" className="mt-4 text-sm text-white">
          {message}
        </p>
      ) : null}
    </form>
  );
}

function SelectWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 12 8"
        className="pointer-events-none absolute right-4 top-1/2 mt-1 h-2.5 w-3 -translate-y-1/2 fill-white/70"
      >
        <path d="M6 8 0 0h12z" />
      </svg>
    </div>
  );
}
