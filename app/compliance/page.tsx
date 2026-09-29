import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { Section, SectionHead } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import { operationalCompliance } from '@/content/pricing';

export const metadata = pageMeta({
  titleTag: 'Standalone Operational Compliance — Orenyx AI Engine™',
  title: 'Standalone Operational Compliance',
  description:
    'Basic operational protections for your Orenyx deployment: data isolation, tenant protection, API-key security, bot sandboxing, audit logs, and zero cross-tenant access.',
  path: '/compliance',
});

const included = operationalCompliance.features.filter((f) => !f.startsWith('No '));
const notIncluded = operationalCompliance.features.filter((f) => f.startsWith('No '));

export default function CompliancePage() {
  return (
    <>
      <PageHero
        crumb="Compliance"
        title={`${operationalCompliance.name} — ${operationalCompliance.price}`}
        lead="Basic protections that keep your data, your bots, and your customers separated and secure. Available as an add-on to Orenyx AI Engine or on its own."
      />

      <Section>
        <Reveal>
          <SectionHead eyebrow="What's included" title={operationalCompliance.subtitle} align="left" />
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {included.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[15px] text-fg-soft">
                <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-1 h-4 w-4 shrink-0 fill-violet-bright">
                  <path d="M6.5 11.5 3 8l1.06-1.06L6.5 9.38l5.44-5.44L13 5l-6.5 6.5Z" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <p className="mt-10 text-sm font-bold uppercase tracking-wide text-violet-soft">Not included</p>
          <ul className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {notIncluded.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[15px] text-fg-soft">
                <span aria-hidden="true" className="w-4 shrink-0 text-center text-violet-bright">–</span>
                {f}
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[720px] text-[15px] leading-relaxed text-fg-soft">
            Pricing depends on whether you run Orenyx AI Engine, how many users you have, how long
            audit logs are kept, and your support level. Contact us and the Orenyx team will follow up
            with pricing.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="primary">
              Contact Sales
            </ButtonLink>
            <ButtonLink href="/pricing" variant="outline" arrow={false}>
              View Pricing
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
