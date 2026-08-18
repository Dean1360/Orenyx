import { ButtonLink } from '@/components/ui/button';
import { Section, Shell } from '@/components/ui/section';

export default function NotFound() {
  return (
    <>
      {/* Inner-page banner, same hook as PageHero so it styles with the rest. */}
      <div className="hero-band ring-motif relative overflow-hidden innerPageBanner">
        <Shell className="relative z-10 py-24 text-center">
          <p className="text-sm text-violet-soft">404</p>
          <h1 className="heading-silver mt-3 text-4xl font-bold md:text-6xl">
            That page isn&rsquo;t here.
          </h1>
          <p className="mx-auto mt-5 max-w-[520px] text-lg text-white/85">
            The link may be out of date. Head back to the home page, or go straight to the API docs.
          </p>
        </Shell>
      </div>
      <Section>
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Go to home</ButtonLink>
          <ButtonLink href="/developers" variant="outline">
            Read the API docs
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
