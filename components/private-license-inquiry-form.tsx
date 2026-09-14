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

const textareaField = `${field} min-h-[100px] resize-y`;

const industries = [
  'HVAC',
  'Plumbing',
  'Electrical',
  'Pest Control',
  'Landscaping / Lawn Care',
  'Cleaning Services',
  'Roofing',
  'Multi-Service / Franchise Group',
  'Other',
];

const scaleOptions = ['1–25', '26–100', '101–500', '501–2,000', '2,000+'];

const deploymentOptions = ['Cloud', 'On-Premise', 'Not sure yet'];

const timelineOptions = [
  'Immediate (0–30 days)',
  '1–3 months',
  '3–6 months',
  '6+ months',
  'Just exploring',
];

const referralOptions = [
  'Search Engine',
  'Referral / Word of Mouth',
  'LinkedIn',
  'Social Media',
  'Existing Orenyx Customer',
  'Industry Event / Conference',
  'Other',
];

/**
 * Private License discovery form. Posts to /api/private-license, which sends
 * a confirmation email to the submitter and a structured routing email to
 * private@orenyxengine.com for the sales team to review before follow-up.
 */
export function PrivateLicenseInquiryForm() {
  const router = useRouter();
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit() {
    const form = document.getElementById('private-license-inquiry') as HTMLFormElement | null;
    if (!form) return;
    if (!form.reportValidity()) return;

    setState('sending');
    setMessage('');

    try {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const res = await fetch('/api/private-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(await res.text());

      router.push('/thank-you');
    } catch {
      setState('error');
      setMessage(
        'That request did not go through. Try again, or email private@orenyxengine.com directly.',
      );
    }
  }

  return (
    <form id="private-license-inquiry" className="w-full">
      <div>
        <label htmlFor="fullName" className={label}>
          Full Name <span className="text-[#f87171]">*</span>
        </label>
        <input
          id="fullName"
          name="fullName"
          required
          autoComplete="name"
          placeholder="Enter Full Name"
          className={field}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="workEmail" className={label}>
          Work Email <span className="text-[#f87171]">*</span>
        </label>
        <input
          id="workEmail"
          name="workEmail"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter Work Email"
          className={field}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="companyName" className={label}>
          Company Name <span className="text-[#f87171]">*</span>
        </label>
        <input
          id="companyName"
          name="companyName"
          required
          autoComplete="organization"
          placeholder="Enter Company Name"
          className={field}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="industry" className={label}>
          Industry <span className="text-[#f87171]">*</span>
        </label>
        <SelectWrap>
          <select id="industry" name="industry" required className={selectField} defaultValue="">
            <option value="" disabled>
              Select your industry
            </option>
            {industries.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </SelectWrap>
      </div>

      <div className="mt-5">
        <label htmlFor="expectedScale" className={label}>
          Expected Scale (Nodes/Users) <span className="text-[#f87171]">*</span>
        </label>
        <SelectWrap>
          <select
            id="expectedScale"
            name="expectedScale"
            required
            className={selectField}
            defaultValue=""
          >
            <option value="" disabled>
              Select expected scale
            </option>
            {scaleOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </SelectWrap>
      </div>

      <div className="mt-5">
        <label htmlFor="deploymentType" className={label}>
          Deployment Type <span className="text-[#f87171]">*</span>
        </label>
        <SelectWrap>
          <select
            id="deploymentType"
            name="deploymentType"
            required
            className={selectField}
            defaultValue=""
          >
            <option value="" disabled>
              Cloud or On-Premise?
            </option>
            {deploymentOptions.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </SelectWrap>
      </div>

      <div className="mt-5">
        <label htmlFor="timeline" className={label}>
          Timeline <span className="text-[#f87171]">*</span>
        </label>
        <SelectWrap>
          <select id="timeline" name="timeline" required className={selectField} defaultValue="">
            <option value="" disabled>
              Select a timeline
            </option>
            {timelineOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </SelectWrap>
      </div>

      <div className="mt-5">
        <label htmlFor="referralSource" className={label}>
          How did you hear about us? — optional
        </label>
        <SelectWrap>
          <select id="referralSource" name="referralSource" className={selectField} defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            {referralOptions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </SelectWrap>
      </div>

      <div className="mt-5">
        <label htmlFor="notes" className={label}>
          Anything else we should know? — optional
        </label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Integrations, locations, security requirements, etc."
          className={textareaField}
        />
      </div>

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
        {state === 'sending' ? 'Sending' : 'Request Private License Info'}
      </Button>

      <p className="mt-4 text-center text-[13px] text-white/55">
        We'll send a confirmation to your inbox and connect you with the Orenyx team for
        private-license pricing.
      </p>

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
