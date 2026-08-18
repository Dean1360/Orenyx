import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Request received',
  description: 'Your request for access to Orenyx AI Engine™ has been received.',
  path: '/thank-you',
  noIndex: true,
});

export default function ThankYouPage() {
  return (
    <>
      <PageHero
        crumb="Request received"
        title="Thanks — we have it."
        lead="Someone from Orenyx Labs will follow up by email."
      />
      <Section>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/developers">Read the API docs</ButtonLink>
          <ButtonLink href="/" variant="outline">
            Back to home
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
