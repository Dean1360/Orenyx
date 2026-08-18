import { PageHero } from '@/components/page-hero';
import { Placeholder } from '@/components/ui/placeholder';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Status',
  description: 'Service status and historical uptime for Orenyx AI Engine™.',
  path: '/status',
});

/* No Figma comp for this page. Layout follows the established inner-page
   pattern; all copy awaits the Builder Packet or the client. */

export default function Page() {
  return (
    <>
      <PageHero crumb="Status" title="Status" />
      <Section>
        <Reveal>
          <div className="max-w-[760px] space-y-4 leading-relaxed text-fg-soft">
            <p>
              <Placeholder>status page content</Placeholder>
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
