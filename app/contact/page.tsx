import { PageHero } from '@/components/page-hero';
import { Placeholder } from '@/components/ui/placeholder';
import { RequestAccessForm } from '@/components/request-access-form';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';
import { site } from '@/content/site';

export const metadata = pageMeta({
  titleTag: 'Talk to Orenyx — Sales and Support',
  title: 'Contact Us',
  description: 'Contact Orenyx about Voice Dispatch, AI Engine, Private License, or Standalone Operational Compliance. Tell us about your business and the workflows you want to improve.',
  path: '/contact',
});
const channels = [
  { heading: 'Sales Inquiries:', email: 'info@orenyxengine.com', highlight: false },
  { heading: 'Contact Support', email: site.supportEmail, highlight: false },
  { heading: 'Security Disclosures', email: 'legal@orenyxengine.com', highlight: true },
];
export default function ContactPage() {
  return (
    <>
      <PageHero crumb="Contact Us" title="Contact Us" />
      <Section>
        <Reveal>
          <div className="contact-panel rounded-panel px-6 py-10 sm:px-10 md:px-12 md:py-14 lg:px-16">
            <h2 className="h2Newfont text-center font-bold leading-[1.15] text-white">Talk to Orenyx</h2>
            <p className="mx-auto mt-6 max-w-[640px] text-center text-lg leading-relaxed text-white/90">Ask about Voice Dispatch, AI Engine, Private License, or Standalone Operational Compliance. Tell us what you need, and our team will help you discuss the right next step.</p>
            <p className="mx-auto mt-4 max-w-[640px] text-center text-base text-white/90">Prefer email? <a href="mailto:info@orenyxengine.com" className="underline">info@orenyxengine.com</a></p>
            <div className="mx-auto mt-10 max-w-[640px]"><RequestAccessForm submitLabel="Send Inquiry" /></div>
          </div>
        </Reveal>
      </Section>
      <Section className="newpadding0">
        <Reveal>
          <div className="grid border-l border-t border-line-violet sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((c) => (
              <div key={c.heading} className={`flex min-h-[260px] flex-col justify-between border-b border-r border-line-violet p-8 md:min-h-[320px] md:p-10 ${c.highlight ? 'bg-violet-bright sm:col-span-2 lg:col-span-1' : 'bg-bg'}`}>
                <h3 className={`font0size font-bold leading-tight ${c.highlight ? 'text-bg' : 'text-violet-bright'}`}>{c.heading}</h3>
                <div className="mt-10 flex items-end justify-between gap-4">
                  {c.email ? <a href={`mailto:${c.email}`} className={`text-20px break-all hover:underline ${c.highlight ? 'text-bg' : 'text-white'}`}>{c.email}</a> : <span className="text-20px"><Placeholder>{c.heading.replace(':', '')} address</Placeholder></span>}
                  {c.highlight ? <svg aria-hidden="true" viewBox="0 0 16 16" className="h-5 w-5 shrink-0 stroke-bg" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12 12 4M6 4h6v6" /></svg> : null}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
