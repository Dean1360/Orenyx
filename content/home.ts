/** Home page copy — verbatim from the client Figma. */

import { ecosystem } from './site';

/* Built from the shared product list rather than typed out, so the banner
   always names exactly what the diagram boxes and the marquee name. */
const productNames = ecosystem.map((p) => p.label).join(', ');

export const hero = {
  titleBefore: 'The ',
  titleAccent: 'AI engine',
  titleAfter: ' behind intelligent dispatch, payments & automation.',
  lead: `Power ${productNames}, and your own systems with one unified AI infrastructure.`,
  primary: { label: 'Request Access', href: '/contact' },
  secondary: { label: 'View Pricing', href: '/pricing' },
};

/*
  ⚠ The Figma labels this block "Solution" but every line in it is a problem
  statement. Either the eyebrow should read "Problem" or the list is wrong.
  Kept verbatim; flagged for the client.
*/
export const problems = {
  eyebrow: 'Solution',
  title: ['One engine.', 'Every decision.'],
  items: [
    'Fragmented automation across disconnected tools',
    'Manual routing that doesn’t scale',
    'Slow, one-off integrations for every new system',
    'No central intelligence layer connecting decisions across products',
  ],
};

/*
  ⚠ This heading is identical to the block above it in the Figma — the same
  sentence runs twice in consecutive sections. Flagged for the client.
*/
export const solution = {
  eyebrow: 'Solution',
  title: 'One engine. Every decision.',
  lead: 'Orenyx AI Engine™ becomes the single decision layer for dispatch, payments, bots, and enterprise workflows — so every product in your stack shares the same intelligence instead of reinventing it.',
  capabilities: [
    { name: 'Intelligent dispatch routing', icon: '/bg/del.png' },
    { name: 'Bot orchestration', icon: '/bg/bot.png' },
    { name: 'Payment decisioning', icon: '/bg/craditcard.png' },
    { name: 'API-first architecture', icon: '/bg/apiImage.png' },
    { name: 'Context + state management', icon: '/bg/engineering.png' },
  ],
};

export const ecosystemBlock = {
  eyebrow: 'Ecosystem',
  // Figma reads "Availableto everyone else." — missing space corrected.
  title: ['Built inside the Orenyx ecosystem.', 'Available to everyone else.'],
  lead: 'The same engine powering the Orenyx ecosystem is available as a standalone platform.',
};

export const businessValue = {
  eyebrow: 'Solution',
  title: 'Business Value',
  items: [

    { name: 'Reduce manual operations', icon: '/bg/downarrow.png' },
    { name: 'Increase throughput', icon: '/bg/uparrows.png' },
    { name: 'Standardize logic across products', icon: '/bg/sheld.png' },
    { name: 'Monetize automation as a first-class capability', icon: '/bg/netwrok.png' },
  ],
  // Figma reads "Reduce manual operationsIncrease throughputStandardize logic across productsMonetize automation as a first-class capability" — missing spaces corrected.

};

export const testimonials = {
  eyebrow: 'Testimonials',
  title: ['Trusted by teams building on', 'Orenyx infrastructure.'],
  items: [
    {
      quote:
        'Orenyx AI Engine™ is the single source of truth for our dispatch and payment decisions. It’s the intelligence layer that connects our products and makes them work together.',
      name: 'Jane Doe',
      title: 'CTO, Orenyx Dispatch',
      image: '/bg/authImage.jpg',
    },
    {
      quote:
        'With Orenyx AI Engine™, we can automate complex workflows across multiple systems without writing custom code for each integration. It’s a game-changer for our operations.',
      name: 'John Smith',
      title: 'Head of Operations, Orenyx Engine',
       image: '/bg/authImage.jpg',
    },
    {
      quote:
        'With Orenyx AI Engine™, we can automate complex workflows across multiple systems without writing custom code for each integration. It’s a game-changer for our operations.',
      name: 'John Smith',
      title: 'Head of Operations, Orenyx Engine',
       image: '/bg/authImage.jpg',
    },
  ],
};

export const closingCta = {
  title: 'Ready to put one engine behind everything you build?',
  primary: { label: 'Talk to Sales', href: '/contact' },
  secondary: { label: 'Request Access', href: '/contact' },
};
