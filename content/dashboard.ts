/** Dashboard page copy — what a tenant gets access to on signup. */

export const dashboardHero = {
  title: 'Every Tenant Gets a Full ORENYX Dashboard',
  lead:
    'When your company signs up, ORENYX automatically creates a tenant environment and gives you access to a secure dashboard where you can control:',
};

export type DashboardCategory = { name: string; items: string[] };

export const dashboardCategories: DashboardCategory[] = [
  {
    name: 'Jobs',
    items: [
      'View all active, pending, and completed jobs',
      'See job details, notes, pricing, and technician assignment',
      'Approve or reject Compliance Bot flags',
      'Manage cancellations, reschedules, and follow-ups',
    ],
  },
  {
    name: 'Technicians',
    items: [
      'Add/edit technicians',
      'Set skills, licenses, service areas',
      'Manage availability',
      'View routing decisions',
    ],
  },
  {
    name: 'Scheduling & Dispatch',
    items: [
      'See calendar holds',
      'View dispatch events',
      'See routing engine decisions',
      'Override assignments manually if needed',
    ],
  },
  {
    name: 'Payments',
    items: [
      'Connect their Stripe account',
      'View deposits, job charges, refunds',
      'Track payouts',
      'See Orenyx Credits ledger entries',
    ],
  },
  {
    name: 'Customers',
    items: ['Customer profiles', 'Contact info', 'Job history', 'Memberships', 'Warranties'],
  },
  {
    name: 'Bots',
    items: [
      'See bot activity logs',
      'Enable/disable certain automation flows',
      'View follow-up attempts',
      'View upsell triggers',
      'View maintenance reminders',
    ],
  },
  {
    name: 'Reporting',
    items: [
      'Revenue',
      'Job volume',
      'Technician performance',
      'Compliance issues',
      'Payment success/failure',
      'Dispatch efficiency',
      'Call-to-job conversion (if using Voice Dispatch)',
    ],
  },
  {
    name: 'Settings',
    items: [
      'Business hours',
      'Service areas',
      'Pricebook',
      'Job codes',
      'Notification settings',
      'API keys',
      'Integrations',
    ],
  },
];
