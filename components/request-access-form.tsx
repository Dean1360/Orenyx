'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

type State = 'idle' | 'sending' | 'error';

const label = 'block text-[15px] font-medium text-white/90';

const field =
  'mt-2 w-full rounded-[8px] border border-white/15 bg-[#2E2A63] px-4 py-3.5 text-[15px] ' +
  'text-white placeholder:text-white/45 focus:border-violet-bright focus:outline-none';

/** Native select arrows are unstyleable, so the control is bare and we draw one. */
const selectField = `${field} appearance-none pr-11`;

const useCases = [
  'Dispatch Operations',
  'Bot Orchestration',
  'Payments & Risk',
  'Enterprise Workflows',
  'Something else',
];

const volumes = ['Under 25,000', '25,000 – 250,000', '250,000 – 1 million', 'Over 1 million'];

/**
 * Posts to the internal route handler. If the client chooses an external form
 * service instead, swap the fetch target and delete app/api/request-access.
 */
export function RequestAccessForm() {
  const router = useRouter();
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit() {
    const form = document.getElementById('request-access') as HTMLFormElement | null;
    if (!form) return;
    if (!form.reportValidity()) return;

    setState('sending');
    setMessage('');

    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch('/api/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(await res.text());
      router.push('/thank-you');
    } catch {
      setState('error');
      setMessage(
        'That request did not go through. Try again, or email support@motuslabs.co directly.',
      );
    }
  }

  return (
    <form id="request-access" className="w-full">
      <div>
        <label htmlFor="name" className={label}>
          Full Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          placeholder="Enter Full Name"
          className={field}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter Your Email"
          className={field}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="company" className={label}>
          Company
        </label>
        <input
          id="company"
          name="company"
          required
          autoComplete="organization"
          placeholder="Enter Company Name"
          className={field}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="useCase" className={label}>
          Use Case
        </label>
        <SelectWrap>
          <select id="useCase" name="useCase" className={selectField} defaultValue="">
            <option value="" disabled>
              Select
            </option>
            {useCases.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </SelectWrap>
      </div>

      <div className="mt-5">
        <label htmlFor="volume" className={label}>
          Estimated Monthly Volume
        </label>
        <SelectWrap>
          <select id="volume" name="volume" className={selectField} defaultValue="">
            <option value="" disabled>
              Select
            </option>
            {volumes.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </SelectWrap>
      </div>

      {/* Bot trap. Real people never see it, so anything in it is spam. */}
      <input
        type="text"
        name="company_website"
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
        {state === 'sending' ? 'Sending' : 'Request Access'}
      </Button>

      {message ? (
        <p role="alert" className="mt-4 text-sm text-white">
          {message}
        </p>
      ) : null}
    </form>
  );
}

/** Positions the drawn chevron over an `appearance-none` select. */
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
