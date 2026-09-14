import { PageHero } from '@/components/page-hero';
import { PrivateLicenseInquiryForm } from '@/components/private-license-inquiry-form';
import { Reveal } from '@/components/reveal';
import { Section, SectionHead } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import { privateLicense } from '@/content/pricing';

export const metadata = pageMeta({
  titleTag: 'Private License — Orenyx AI Engine™',
  title: 'Private License',
  description:
    'Request a private, isolated Orenyx deployment for your organization. Share a few details and the Orenyx team will follow up with private-license pricing.',
  path: '/private-license',
});

export default function PrivateLicensePage() {
  return (
    <>
      <PageHero
        crumb="Private License"
        title="Private License — Contact for Pricing"
        lead="For companies wanting their own private ORENYX deployment. Tell us a bit about your organization and the Orenyx team will follow up with scoped pricing."
      />

      {/* ── Offer summary ─────────────────────────────────────── */}
      <Section>
        <Reveal>
          <SectionHead
            eyebrow="What's included"
            title={privateLicense.subtitle}
            align="left"
          />
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {privateLicense.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-[15px] text-fg-soft">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="mt-1 h-4 w-4 shrink-0 fill-violet-bright"
                >
                  <path d="M6.5 11.5 3 8l1.06-1.06L6.5 9.38l5.44-5.44L13 5l-6.5 6.5Z" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[720px] text-[15px] leading-relaxed text-fg-soft">
            Private License pricing is based on the deployment scope, number of locations,
            integrations, operational requirements, and support needs. Share a few details below
            and the Orenyx team will follow up with private-license pricing and next steps.
          </p>
        </Reveal>
      </Section>

      {/* ── Inquiry form ─────────────────────────────────────── */}
      <Section tone="violet">
        <Reveal>
          <div className="contact-panel rounded-panel px-6 py-10 sm:px-10 md:px-12 md:py-14 lg:px-16">
            <h2 className="h2Newfont text-center font-bold leading-[1.15] text-white">
              REQUEST PRIVATE LICENSE INFO
            </h2>
            <p className="mx-auto mt-3 max-w-[560px] text-center text-[15px] text-white/70">
              Every field below helps the Orenyx team scope your deployment before your first
              call.
            </p>

            <div className="mx-auto mt-10 max-w-[640px]">
              <PrivateLicenseInquiryForm />
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
