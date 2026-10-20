import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { Section } from '@/components/ui/section';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Thank you',
  description: 'Your Orenyx order has been received.',
  path: '/thank-you',
  noIndex: true,
});

/**
 * The post-checkout landing page. Two very different customers arrive here:
 *
 *  - A paying customer (?paid=1): Stripe sent them back after a completed
 *    checkout session. They have bought a plan and now need an account.
 *  - An inquirer: they submitted a request-access form and are waiting on a
 *    reply.
 *
 * Showing the inquirer's copy to a paying customer ("someone will follow up
 * by email") reads like their payment did not go through, so the two cases
 * are separated here.
 */
export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { paid?: string };
}) {
  const paid = searchParams?.paid === '1';

  if (paid) {
    return (
      <>
        <PageHero
          crumb="Order complete"
          title="Your payment went through."
          lead="Welcome to Orenyx. Your plan is active — one step left: create the login you will use every day."
        />
        <Section>
          <div className="max-w-[640px] space-y-6">
            <div className="rounded-2xl border border-line-violet bg-violet-soft/10 p-6">
              <h2 className="text-xl font-bold">Create your account</h2>
              <p className="mt-2 text-fg-soft">
                Your subscription is live. Set up the username and password for
                your Orenyx dashboard — it takes about a minute.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="https://portal.orenyxengine.com/signup">
                  Create my account
                </ButtonLink>
                <ButtonLink href="/" variant="outline">
                  Back to home
                </ButtonLink>
              </div>
            </div>
            <p className="text-sm text-fg-soft">
              A receipt for this purchase is on its way to the email you used
              at checkout.
            </p>
          </div>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHero
        crumb="Request received"
        title="Thanks for reaching out."
        lead="We aim to respond promptly. Someone from Orenyx Labs, LLC will follow up by email."
      />
      <Section>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="https://portal.orenyxengine.com">
            Go to Your Dashboard
          </ButtonLink>
          <ButtonLink href="/" variant="outline">
            Back to home
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
