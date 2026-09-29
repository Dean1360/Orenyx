import { ButtonLink } from '@/components/ui/button';
import { Reveal } from '@/components/reveal';
import { plans } from '@/content/pricing';

function ArrowBullet() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-1 shrink-0 text-violet-bright">
      <path d="M2 8h10M8.5 4.5L12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Orenyx AI Engine plan cards. Used on /pricing and /ai-engine. */
export function AiEnginePlans() {
  return (
        <div className="mt-12 grid gap-5 lg:grid-cols-3 pricechnasgeFont">
          {plans.map((plan, i) => (
            <Reveal key={plan.id}  delay={i * 70}>
              <div className="pricechnageFont flex h-full flex-col rounded-[14px] border border-line-violet bg-bg-2/50 p-6">
                <p className="text-lg font-bold text-violet-bright">{plan.name}</p>
                {plan.subtitle ? (
                  <p className="mt-1 text-sm text-fg-soft">{plan.subtitle}</p>
                ) : null}

                <p className="mt-3 pricens font-bold">
                  {plan.price}
                  {plan.priceSuffix ? (
                    <span className="text-lg font-medium vaiolatecolor">{plan.priceSuffix}</span>
                  ) : null}
                </p>
                <p className="mt-1 text-xs text-fg-soft">{plan.onboarding}</p>

                <ButtonLink href={plan.cta.href} className="mt-6 w-full">
                  {plan.cta.label}
                </ButtonLink>

                <dl className="mt-7 space-y-3 border-b border-line pb-6 text-sm">
                  {plan.metered.map((row) => (
                    <div key={row.label} className="flex items-baseline justify-between gap-4">
                      <dt className="text-fg-soft">{row.label}</dt>
                      <dd
                        className={`text-right font-medium ${
                          row.accent ? 'text-violet-bright' : 'text-white'
                        }`}
                      >
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-6 space-y-3 text-sm font-srs">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 text-fg-soft">
                      <ArrowBullet />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
  );
}
