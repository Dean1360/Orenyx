import { PageHero } from '@/components/page-hero';
import { RequestAccessForm } from '@/components/request-access-form';
import { Reveal } from '@/components/reveal';
import { Section } from '@/components/ui/section';
import { plans, voiceDispatchPlans } from '@/content/pricing';
import { checkoutIntro } from '@/content/checkout';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: 'Checkout — Orenyx AI Engine™',
  title: 'Checkout',
  description: 'Confirm your Orenyx plan and get your account set up.',
  path: '/checkout',
  noIndex: true,
});

function findPlan(id?: string) {
  if (!id) return null;
  const aiPlan = plans.find((p) => p.id === id);
  if (aiPlan) return { name: aiPlan.name, price: `${aiPlan.price}${aiPlan.priceSuffix ?? ''}` };
  const voicePlan = voiceDispatchPlans.find((p) => p.id === id);
  if (voicePlan) return { name: `Voice Dispatch — ${voicePlan.name}`, price: voicePlan.price };
  return null;
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan: planId } = await searchParams;
  const plan = findPlan(planId);

  return (
    <>
      <PageHero crumb="Checkout" title="Checkout" lead={checkoutIntro} />

      <Section>
        <Reveal>
          <div className="contact-panel rounded-panel px-6 py-10 sm:px-10 md:px-12 md:py-14 lg:px-16">
            <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                {plan ? (
                  <div className="mb-8 w-fit rounded-[14px] border border-line-violet bg-white/10 px-6 py-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-white/60">
                      Selected plan
                    </p>
                    <p className="mt-1 text-xl font-bold text-white">
                      {plan.name} — {plan.price}
                    </p>
                  </div>
                ) : null}
                <h2 className="h2Newfont font-bold leading-[1.15] text-white">
                  Let&apos;s get your
                  <br />
                  account set up.
                </h2>
                <p className="mt-6 max-w-[520px] text-lg font-bold leading-relaxed text-white newFont-Parra">
                  Online payment is being finalized. Submit your details and we&apos;ll set up your
                  account and billing directly — no delay in getting started.
                </p>

              </div>
              <RequestAccessForm submitLabel="Submit" source="checkout" selectedPlan={planId} />
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
