import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { Placeholder } from '@/components/ui/placeholder';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Log in',
  description: 'Sign in to the Orenyx AI Engine™ customer and developer dashboard.',
  path: '/login',
  noIndex: true,
});

/*
  UNRESOLVED — the packet's §7 gated-access model contradicts §11 self-serve
  signup, and the Figma shows a LOG IN link without ever drawing a login screen.
  If the dashboard does not exist, delete this route and the utility-bar link
  rather than shipping a dead end.
*/

export default function LoginPage() {
  return (
    <>
      <PageHero crumb="Log in" title="Log in" />
      <Section>
        <div className="max-w-[520px]">
          <p className="text-fg-soft">
            <Placeholder>
              dashboard URL — confirm whether the customer/developer dashboard exists and where
              this should redirect
            </Placeholder>
          </p>
          <ButtonLink href="/contact" variant="outline" className="mt-8">
            Request access instead
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
