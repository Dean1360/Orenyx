'use client';

import { InquiryForm } from '@/components/inquiry-form';
import { privateLicenseFields } from '@/content/inquiry-forms';

/** Private License discovery form. Posts to /api/private-license. */
export function PrivateLicenseInquiryForm() {
  return (
    <InquiryForm
      id="private-license-inquiry"
      endpoint="/api/private-license"
      fields={privateLicenseFields}
      submitLabel="Request Private License Info"
      footnote="We'll send a confirmation to your inbox and follow up with private-license pricing."
      fallbackEmail="private@orenyxengine.com"
    />
  );
}
