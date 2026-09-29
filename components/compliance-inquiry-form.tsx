'use client';

import { InquiryForm } from '@/components/inquiry-form';
import { complianceFields } from '@/content/inquiry-forms';

/** Standalone Operational Compliance form. Posts to /api/compliance. */
export function ComplianceInquiryForm() {
  return (
    <InquiryForm
      id="compliance-inquiry"
      endpoint="/api/compliance"
      fields={complianceFields}
      submitLabel="Request Compliance Info"
      footnote="We'll send a confirmation to your inbox and follow up with compliance pricing."
      fallbackEmail="private@orenyxengine.com"
    />
  );
}
