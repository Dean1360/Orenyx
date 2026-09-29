import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/reveal';
import { voiceDispatchPlans } from '@/content/pricing';
import { costComparisonNote } from '@/content/voice-dispatch';

function ArrowBullet() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-1 shrink-0 text-violet-bright">
      <path d="M2 8h10M8.5 4.5L12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Voice Dispatch plan cards (Starter, Growth, Scale, Enterprise) + cost note.
 *  Used on /pricing and /voice-dispatch so both always show the same plans. */
export function VoiceDispatchPlans() {
  return (
    <>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 pricechnasgeFont">
          {voiceDispatchPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 70} className="h-full">
              <div className="pricechnageFont flex h-full flex-col rounded-[14px] border-2 border-white/30 bg-bg/50 p-8">
                {plan.mostPopular ? (
                  <span className="mb-2 w-fit rounded-full bg-violet-bright px-3 py-1 text-xs font-bold text-bg">
                    Most popular
                  </span>
                ) : null}
                <p className="text-xl font-bold text-white">{plan.name}</p>
                <p className="mt-1 text-sm text-white/70">{plan.minutes}</p>
                <p className="mt-1 text-xs text-white/60">{plan.overage}</p>

                <p className="mt-3 whitespace-nowrap text-3xl font-bold text-white sm:text-[2rem]">
                  {plan.price}
                </p>
                <p className="mt-1 text-xs text-white/60">{plan.onboarding}</p>

                <ButtonLink href={`/checkout?plan=${plan.id}`} className="mt-6 w-full">
                  Check Out
                </ButtonLink>

                <ul className="mt-6 space-y-3 text-sm font-srs">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 font-medium text-white/90">
                      <ArrowBullet />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-[640px] text-center text-base font-bold text-white">
          {costComparisonNote}
        </p>
    </>
  );
}
