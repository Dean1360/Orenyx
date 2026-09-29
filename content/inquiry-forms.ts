/**
 * Questions for the Private License and Compliance inquiry forms.
 * They match the Orenyx Pricing Calculator and section 8 of the Pricing
 * Handbook, so every submission has what we need to calculate a price.
 * Prices are never shown on these public forms.
 */

export type Option = { value: string; label: string };

export type InquiryField =
  | { name: string; label: string; type: 'text' | 'email'; required?: boolean; placeholder?: string; autoComplete?: string }
  | { name: string; label: string; type: 'number'; required?: boolean; min?: number; placeholder?: string; hint?: string }
  | { name: string; label: string; type: 'select'; required?: boolean; placeholder: string; options: Option[]; hint?: string }
  | { name: string; label: string; type: 'textarea'; required?: boolean; placeholder?: string };

const plain = (labels: string[]): Option[] => labels.map((l) => ({ value: l, label: l }));

const contactFields: InquiryField[] = [
  { name: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter Full Name', autoComplete: 'name' },
  { name: 'workEmail', label: 'Work Email', type: 'email', required: true, placeholder: 'Enter Work Email', autoComplete: 'email' },
  { name: 'phone', label: 'Phone — optional', type: 'text', placeholder: 'Enter Phone Number', autoComplete: 'tel' },
  { name: 'companyName', label: 'Company Name', type: 'text', required: true, placeholder: 'Enter Company Name', autoComplete: 'organization' },
];

const supportOptions: Option[] = [
  { value: 'standard', label: 'Standard support' },
  { value: 'priority', label: 'Priority support' },
];

const timelineField: InquiryField = {
  name: 'timeline',
  label: 'Timeline',
  type: 'select',
  required: true,
  placeholder: 'Select a timeline',
  options: plain(['Immediate (0–30 days)', '1–3 months', '3–6 months', '6+ months', 'Just exploring']),
};

const referralField: InquiryField = {
  name: 'referralSource',
  label: 'How did you hear about us? — optional',
  type: 'select',
  placeholder: 'Select one',
  options: plain([
    'Search Engine',
    'Referral / Word of Mouth',
    'LinkedIn',
    'Social Media',
    'Existing Orenyx Customer',
    'Industry Event / Conference',
    'Other',
  ]),
};

export const privateLicenseFields: InquiryField[] = [
  ...contactFields,
  {
    name: 'industry',
    label: 'Industry',
    type: 'select',
    required: true,
    placeholder: 'Select your industry',
    options: plain(['HVAC', 'Plumbing', 'Electrical', 'Pest Control', 'Landscaping / Lawn Care', 'Cleaning Services', 'Roofing', 'Multi-Service', 'Other']),
  },
  { name: 'technicians', label: 'How many technicians do you have?', type: 'number', required: true, min: 1, placeholder: 'e.g. 60' },
  { name: 'locations', label: 'How many locations?', type: 'number', required: true, min: 1, placeholder: 'e.g. 2' },
  {
    name: 'deployment',
    label: 'Where should your private copy run?',
    type: 'select',
    required: true,
    placeholder: 'Select one',
    options: [
      { value: 'orenyx_hosted', label: 'Hosted by Orenyx (recommended)' },
      { value: 'client_cloud', label: 'In our own cloud account (AWS, Azure or Google Cloud)' },
    ],
  },
  {
    name: 'customIntegrations',
    label: 'How many custom connections do you need?',
    type: 'number',
    required: true,
    min: 0,
    placeholder: '0',
    hint: 'Stripe, Twilio, Google and email/text are standard. Count any other software you need Orenyx to connect to.',
  },
  {
    name: 'customIntegrationList',
    label: 'Which software? — optional',
    type: 'text',
    placeholder: 'e.g. QuickBooks, ServiceTitan',
  },
  {
    name: 'spanish',
    label: 'Do you need Spanish-language support?',
    type: 'select',
    required: true,
    placeholder: 'Select one',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no', label: 'No' },
    ],
  },
  { name: 'supportLevel', label: 'Support level', type: 'select', required: true, placeholder: 'Select one', options: supportOptions },
  {
    name: 'contractYears',
    label: 'Contract length',
    type: 'select',
    required: true,
    placeholder: 'Select one',
    options: [
      { value: '1', label: '1 year' },
      { value: '2', label: '2 years' },
      { value: '3', label: '3 years' },
    ],
  },
  timelineField,
  referralField,
  { name: 'notes', label: 'Anything else we should know? — optional', type: 'textarea', placeholder: 'Anything that helps us scope your deployment' },
];

export const complianceFields: InquiryField[] = [
  ...contactFields,
  {
    name: 'currentPlan',
    label: 'Are you already on Orenyx?',
    type: 'select',
    required: true,
    placeholder: 'Select one',
    options: [
      { value: 'ai_engine', label: 'Yes — Orenyx AI Engine' },
      { value: 'private_license', label: 'Yes — Orenyx Private License' },
      { value: 'none', label: 'Not yet' },
    ],
  },
  { name: 'users', label: 'How many users need access?', type: 'number', required: true, min: 1, placeholder: 'e.g. 30' },
  {
    name: 'auditLogYears',
    label: 'How long do you need audit logs kept?',
    type: 'select',
    required: true,
    placeholder: 'Select one',
    options: [
      { value: '1', label: '1 year' },
      { value: '3', label: '3 years' },
    ],
  },
  { name: 'supportLevel', label: 'Support level', type: 'select', required: true, placeholder: 'Select one', options: supportOptions },
  timelineField,
  referralField,
  { name: 'notes', label: 'Anything else we should know? — optional', type: 'textarea', placeholder: 'Anything that helps us scope your setup' },
];

/** Turns a stored value back into the words the client picked. */
export function displayValue(fields: InquiryField[], name: string, value: string): string {
  const f = fields.find((x) => x.name === name);
  if (f && f.type === 'select') return f.options.find((o) => o.value === value)?.label ?? value;
  return value;
}

/** Maps form answers to the pricing calculator's inputs. */
export function toPricingLead(kind: 'private-license' | 'compliance', d: Record<string, string>) {
  if (kind === 'private-license') {
    return {
      product: 'private_license',
      companyName: d.companyName,
      technicians: d.technicians,
      locations: d.locations,
      deployment: d.deployment,
      customIntegrations: d.customIntegrations,
      spanish: d.spanish === 'yes',
      supportLevel: d.supportLevel,
      contractYears: d.contractYears,
      extraDiscountPct: 0,
    };
  }
  return {
    product: 'compliance',
    companyName: d.companyName,
    onAIEngine: d.currentPlan === 'ai_engine',
    hasPrivateLicense: d.currentPlan === 'private_license',
    users: d.users,
    auditLogYears: Number(d.auditLogYears),
    supportLevel: d.supportLevel,
  };
}
