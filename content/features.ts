/** Features page copy — verbatim from the client Figma. */

export const featuresHero = {
  titleBefore: 'One Engine, ',
  titleAccent: 'Five',
  titleAfter: ' Core Modules.',
  lead: 'Everything you need to route, decide, and orchestrate — accessible through a single API.',
};

export type Module = { name: string; body: string; icon: string };

export const coreModules: Module[] = [
  {
    name: 'Dispatch Intelligence',
    body: 'Routes calls, tasks, tickets, and workflows using rules + AI. Combines deterministic business rules with model-driven scoring so routing decisions improve over time without manual rule maintenance',
    icon: '/bg/del.png',
  },
  {
    name: 'Bot Builder Logic Layer',
    body: 'Executes flows, conditions, and actions for bots across channels (voice, SMS, chat, social). Acts as the shared "brain" so each bot product doesn’t need its own logic engine.',
    icon: '/bg/bot.png',
  },
  {
    name: 'Payment Decision Engine',
    body: 'Scores and routes payment events (paired with Orenyx Payment). Evaluates risk signals and routes transactions to the correct processing path in real time.',
    icon: '/bg/craditcard.png',
  },
  {
    name: 'Context + state management',
    body: 'Maintains workflow and conversation state across products, so a customer’s context (open ticket, in flight payment, active bot conversation) persists across every touchpoint.',
    icon: '/bg/engineering.png',
  },
  {
    name: 'API & Webhooks',
    body: 'Full programmatic access to all engine functions — every capability above is available as a REST endpoint or webhook event, not locked behind a UI',
    icon: '/bg/apiImage.png',
  },
];

export const technicalHighlights = [
  { name: 'Scalable Architecture', body: 'Horizontally scalable, multi-region ready' },
  {
    name: 'Rules + AI hybrid Decisioning',
    body: 'Deterministic where you need certainty, model-driven where you need adaptability',
  },
  { name: 'Logging & Observability', body: 'Every decision is logged and queryable' },
  {
    name: 'Security + Tenant Isolation',
    body: 'Strict per-tenant data isolation no cross-tenant data leakage',
  },
];

/*
  ⚠ The Figma draws this table with row labels but every cell is empty.
  Rows are verbatim; the two columns of values are outstanding.
*/
export const comparisonRows = [
  'Time-to-launch',
  'Maintenance burden',
  'Cross-product consistency',
];
