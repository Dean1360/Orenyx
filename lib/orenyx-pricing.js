/* Server-side copy of the Orenyx pricing calculator rules (same numbers as
   the private calculator and the Pricing Handbook). Used only by the inquiry
   API routes to put a calculated price in the internal email. Never shown
   to the client. */

/**
 * Orenyx pricing step for the workflow-engine.
 *
 * Pure, dependency-free module. It takes the answers collected by the
 * intake / qualification bots and returns a quote, plus review flags.
 * It never sends anything itself: the workflow-engine decides what to do
 * with the result (mail bot for standard quotes, email + SMS alert to the
 * owner for flagged deals).
 *
 * All prices live in pricing-config.json so they can be changed without
 * touching code.
 */

const DEFAULT_CONFIG = {
  "version": "2026-09-29",
  "quoteValidDays": 30,
  "maxExtraDiscountPct": 10,
  "payment": {
    "schedule": [
      { "label": "At signing", "pct": 50 },
      { "label": "At go-live", "pct": 50 }
    ],
    "method": "ACH bank transfer via Stripe invoice"
  },
  "privateLicense": {
    "minTechnicians": 20,
    "maxTechnicians": 200,
    "tiers": [
      { "name": "20-50 technicians", "minTechs": 20, "maxTechs": 50, "firstYear": 90000, "renewal": 45000 },
      { "name": "51-100 technicians", "minTechs": 51, "maxTechs": 100, "firstYear": 150000, "renewal": 75000 },
      { "name": "101-200 technicians", "minTechs": 101, "maxTechs": 200, "firstYear": 180000, "renewal": 90000 }
    ],
    "includedLocations": 3,
    "extraLocation": { "firstYear": 2500, "renewal": 2500 },
    "clientOwnCloud": { "firstYear": 15000, "renewal": 5000 },
    "customIntegrationOneTime": 5000,
    "prioritySupportPerYear": 15000,
    "spanishIncluded": true,
    "renewalDiscountPctByContractYears": { "1": 0, "2": 5, "3": 10 },
    "floor": { "firstYear": 80000, "renewal": 40000 },
    "highAnchorPct": 10
  },
  "compliance": {
    "addOnMonthly": 499,
    "standaloneMonthly": 899,
    "standaloneSetup": 1500,
    "includedUsers": 25,
    "perExtraUserBlock": { "blockSize": 25, "monthly": 100 },
    "auditLogs3YearsMonthly": 150,
    "prioritySupportMonthly": 150,
    "starterPlanMonthly": 749
  },
  "alerts": { "channels": ["email", "sms"] }
}
;

const FLAG_TEXT = {
  client_own_cloud: 'Client wants it deployed in their own cloud account (hands-on setup).',
  over_200_technicians: 'Client has more than 200 technicians, outside the standard Private License range.',
  discount_over_limit: 'Requested extra discount is above the 10% limit; it was capped at 10%.',
  below_floor: 'Price would fall below the floor; it was raised to the floor.',
  invalid_input: 'Some answers were missing or invalid.',
};

function roundDollars(n) {
  return Math.round(n);
}

function toInt(v) {
  const n = Number(v);
  return Number.isFinite(n) ? Math.floor(n) : NaN;
}

function addDays(date, days) {
  const d = new Date(date.getTime());
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function paymentSchedule(amount, cfg) {
  return cfg.payment.schedule.map((s) => ({
    label: s.label,
    pct: s.pct,
    amount: roundDollars((amount * s.pct) / 100),
  }));
}

function clampDiscount(requestedPct, cfg, flags) {
  const pct = Number(requestedPct) || 0;
  if (pct < 0) return 0;
  if (pct > cfg.maxExtraDiscountPct) {
    flags.add('discount_over_limit');
    return cfg.maxExtraDiscountPct;
  }
  return pct;
}

/* ---------------- Private License ---------------- */

function quotePrivateLicense(a, cfg) {
  const pl = cfg.privateLicense;
  const flags = new Set();
  const lines = [];

  const techs = toInt(a.technicians);
  if (!Number.isFinite(techs) || techs < 1) {
    flags.add('invalid_input');
    return { product: 'private_license', status: 'needs_info', missing: ['technicians'], flags: [...flags] };
  }

  if (techs < pl.minTechnicians) {
    return {
      product: 'private_license',
      status: 'route_to_subscription',
      message: `Client has ${techs} technicians. A Private License is sized for ${pl.minTechnicians}+ technicians; recommend Starter ($749/mo) or Professional ($1,499/mo).`,
      flags: [],
    };
  }

  let tier = pl.tiers.find((t) => techs >= t.minTechs && techs <= t.maxTechs);
  if (!tier) {
    // Over 200: use the top tier as a reference price only, and flag for the owner.
    flags.add('over_200_technicians');
    tier = pl.tiers[pl.tiers.length - 1];
  }

  let firstYear = tier.firstYear;
  let renewal = tier.renewal;
  lines.push({ item: `Private License base (${tier.name})`, firstYear: tier.firstYear, renewal: tier.renewal });

  const locations = Math.max(1, toInt(a.locations) || 1);
  const extraLocations = Math.max(0, locations - pl.includedLocations);
  if (extraLocations > 0) {
    const fy = extraLocations * pl.extraLocation.firstYear;
    const rn = extraLocations * pl.extraLocation.renewal;
    firstYear += fy;
    renewal += rn;
    lines.push({ item: `Extra locations (${extraLocations} beyond ${pl.includedLocations})`, firstYear: fy, renewal: rn });
  }

  if (a.deployment === 'client_cloud') {
    firstYear += pl.clientOwnCloud.firstYear;
    renewal += pl.clientOwnCloud.renewal;
    flags.add('client_own_cloud');
    lines.push({ item: 'Deployment in client-owned cloud', firstYear: pl.clientOwnCloud.firstYear, renewal: pl.clientOwnCloud.renewal });
  }

  const customIntegrations = Math.max(0, toInt(a.customIntegrations) || 0);
  if (customIntegrations > 0) {
    const fy = customIntegrations * pl.customIntegrationOneTime;
    firstYear += fy;
    lines.push({ item: `Custom integrations (${customIntegrations}, one-time)`, firstYear: fy, renewal: 0 });
  }

  if (a.spanish) {
    lines.push({ item: 'Spanish-language support', firstYear: 0, renewal: 0, note: 'Included' });
  }

  if (a.supportLevel === 'priority') {
    firstYear += pl.prioritySupportPerYear;
    renewal += pl.prioritySupportPerYear;
    lines.push({ item: 'Priority support', firstYear: pl.prioritySupportPerYear, renewal: pl.prioritySupportPerYear });
  }

  // Contract-length discount applies to renewals only, never the first year.
  const years = [1, 2, 3].includes(toInt(a.contractYears)) ? toInt(a.contractYears) : 1;
  const renewalDiscPct = pl.renewalDiscountPctByContractYears[String(years)] || 0;
  if (renewalDiscPct > 0) {
    const cut = renewal * (renewalDiscPct / 100);
    renewal -= cut;
    lines.push({ item: `${years}-year contract (${renewalDiscPct}% off renewals)`, firstYear: 0, renewal: -roundDollars(cut) });
  }

  // Extra negotiated discount (applies to both), capped and never below floor.
  const discPct = clampDiscount(a.extraDiscountPct, cfg, flags);
  const listFirstYear = firstYear;
  const listRenewal = renewal;
  if (discPct > 0) {
    firstYear *= 1 - discPct / 100;
    renewal *= 1 - discPct / 100;
    lines.push({
      item: `Extra discount (${discPct}%)`,
      firstYear: -roundDollars(listFirstYear - firstYear),
      renewal: -roundDollars(listRenewal - renewal),
    });
  }
  if (firstYear < pl.floor.firstYear) {
    flags.add('below_floor');
    firstYear = pl.floor.firstYear;
  }
  if (renewal < pl.floor.renewal) {
    flags.add('below_floor');
    renewal = pl.floor.renewal;
  }

  firstYear = roundDollars(firstYear);
  renewal = roundDollars(renewal);

  const low = {
    firstYear: roundDollars(Math.max(pl.floor.firstYear, listFirstYear * (1 - cfg.maxExtraDiscountPct / 100))),
    renewal: roundDollars(Math.max(pl.floor.renewal, listRenewal * (1 - cfg.maxExtraDiscountPct / 100))),
  };
  const high = {
    firstYear: roundDollars(listFirstYear * (1 + pl.highAnchorPct / 100)),
    renewal: roundDollars(listRenewal * (1 + pl.highAnchorPct / 100)),
  };

  const contractTotal = firstYear + renewal * (years - 1);

  return {
    product: 'private_license',
    status: 'quoted',
    tier: tier.name,
    technicians: techs,
    contractYears: years,
    recommended: { firstYear, renewal },
    range: { low, high },
    contractTotal,
    lines,
    payment: { method: cfg.payment.method, firstYearSchedule: paymentSchedule(firstYear, cfg) },
    includes: 'Private isolated deployment, full Field Ops Engine (11 modules), Technician Routing, Appointment Booking, Payment Engine, Compliance Bot, Orenyx Credits Ledger, Upsell & Follow-Up Bots, API Builder Packet, multi-tenant isolation, 12-month support. Compliance is included; do not add it separately.',
    notIncluded: 'No SOC 2, ISO or HIPAA certification. Orenyx does not offer certifications.',
    flags: [...flags],
  };
}

/* ---------------- Standalone Operational Compliance ---------------- */

function quoteCompliance(a, cfg) {
  const c = cfg.compliance;
  const flags = new Set();
  const lines = [];

  if (a.hasPrivateLicense) {
    return {
      product: 'compliance',
      status: 'included',
      message: 'Compliance is already included in the Private License. Do not charge for it separately.',
      flags: [],
    };
  }

  const onEngine = Boolean(a.onAIEngine);
  let monthly = onEngine ? c.addOnMonthly : c.standaloneMonthly;
  const setup = onEngine ? 0 : c.standaloneSetup;
  lines.push({ item: onEngine ? 'Compliance (AI Engine add-on)' : 'Compliance (standalone)', monthly, setup });

  const users = Math.max(0, toInt(a.users) || 0);
  if (users > c.includedUsers) {
    const blocks = Math.ceil((users - c.includedUsers) / c.perExtraUserBlock.blockSize);
    const add = blocks * c.perExtraUserBlock.monthly;
    monthly += add;
    lines.push({ item: `Extra users (${users - c.includedUsers} over ${c.includedUsers}, ${blocks} block(s) of ${c.perExtraUserBlock.blockSize})`, monthly: add, setup: 0 });
  }
  if (a.auditLogYears === 3) {
    monthly += c.auditLogs3YearsMonthly;
    lines.push({ item: 'Audit logs kept 3 years', monthly: c.auditLogs3YearsMonthly, setup: 0 });
  }
  if (a.supportLevel === 'priority') {
    monthly += c.prioritySupportMonthly;
    lines.push({ item: 'Priority support', monthly: c.prioritySupportMonthly, setup: 0 });
  }

  const listMonthly = monthly;
  const discPct = clampDiscount(a.extraDiscountPct, cfg, flags);
  const baseFloor = onEngine ? c.addOnMonthly : c.standaloneMonthly;
  if (discPct > 0) {
    monthly *= 1 - discPct / 100;
    lines.push({ item: `Extra discount (${discPct}%)`, monthly: -roundDollars(listMonthly - monthly), setup: 0 });
  }
  if (monthly < baseFloor) {
    flags.add('below_floor');
    monthly = baseFloor;
  }
  monthly = roundDollars(monthly);

  const result = {
    product: 'compliance',
    status: 'quoted',
    mode: onEngine ? 'add_on' : 'standalone',
    recommended: { monthly, setup },
    range: {
      low: { monthly: roundDollars(Math.max(baseFloor, listMonthly * (1 - cfg.maxExtraDiscountPct / 100))), setup },
      high: { monthly: roundDollars(listMonthly * 1.1), setup },
    },
    lines,
    notIncluded: 'No SOC 2, ISO or HIPAA certification. Orenyx does not offer certifications.',
    flags: [...flags],
  };

  if (!onEngine) {
    const bundle = c.starterPlanMonthly + c.addOnMonthly;
    result.upsell = {
      offer: 'AI Engine Starter + Compliance add-on',
      monthly: bundle,
      message: `For $${bundle.toLocaleString('en-US')}/mo the client gets the full AI Engine Starter plan plus Compliance, versus $${monthly.toLocaleString('en-US')}/mo for Compliance alone.`,
    };
  }
  return result;
}

function usd(n) {
  return '$' + Number(n).toLocaleString('en-US');
}

function describePrice(quote) {
  const r = quote.recommended;
  if (!r) return '';
  if (quote.product === 'private_license') {
    return `Calculated price: ${usd(r.firstYear)} first year, ${usd(r.renewal)}/year renewal.`;
  }
  return `Calculated price: ${usd(r.monthly)}/month` + (r.setup ? ` plus ${usd(r.setup)} setup.` : '.');
}

/* ---------------- Workflow-engine step ---------------- */

/**
 * Entry point for the workflow-engine.
 * @param {object} lead  answers gathered by intake/qualification, e.g.
 *   { leadId, companyName, product: 'private_license' | 'compliance', technicians, locations,
 *     deployment: 'orenyx_hosted' | 'client_cloud', customIntegrations, spanish,
 *     supportLevel: 'standard' | 'priority', contractYears, extraDiscountPct,
 *     onAIEngine, users, auditLogYears, hasPrivateLicense }
 * @param {object} [options] { config, now }
 * @returns {object} { quote, requiresReview, reviewReasons, nextAction, alert, validUntil }
 */
function pricingStep(lead, options = {}) {
  const cfg = options.config || DEFAULT_CONFIG;
  const now = options.now ? new Date(options.now) : new Date();
  const a = lead || {};

  let quote;
  if (a.product === 'private_license') quote = quotePrivateLicense(a, cfg);
  else if (a.product === 'compliance') quote = quoteCompliance(a, cfg);
  else {
    quote = { product: a.product || null, status: 'needs_info', missing: ['product'], flags: ['invalid_input'] };
  }

  const reviewFlags = quote.flags || [];
  const requiresReview = quote.status === 'quoted' && reviewFlags.length > 0;
  const reviewReasons = reviewFlags.map((f) => FLAG_TEXT[f] || f);

  let nextAction;
  if (quote.status === 'needs_info') nextAction = 'ask_qualification_bot';
  else if (quote.status === 'route_to_subscription') nextAction = 'offer_subscription_plans';
  else if (quote.status === 'included') nextAction = 'no_charge';
  else if (requiresReview) nextAction = 'hold_for_owner_review';
  else nextAction = 'send_proposal';

  const out = {
    leadId: a.leadId || null,
    companyName: a.companyName || null,
    configVersion: cfg.version,
    quotedAt: now.toISOString(),
    validUntil: quote.status === 'quoted' ? addDays(now, cfg.quoteValidDays) : null,
    quote,
    requiresReview,
    reviewReasons,
    nextAction,
  };

  if (requiresReview) {
    out.alert = {
      channels: cfg.alerts.channels,
      subject: `Orenyx deal needs review: ${a.companyName || a.leadId || 'new lead'}`,
      body: [
        `${a.companyName || 'A lead'} needs your review before a quote is sent.`,
        ...reviewReasons.map((r) => `- ${r}`),
        describePrice(quote),
      ].filter(Boolean).join('\n'),
    };
  }
  return out;
}

export { pricingStep, DEFAULT_CONFIG, describePrice };
