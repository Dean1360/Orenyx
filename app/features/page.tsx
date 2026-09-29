import { PageHero } from '@/components/page-hero';
import { FeaturesSections } from '@/components/features-sections';
import { pageMeta } from '@/lib/seo';
import { featuresHero } from '@/content/features';

export const metadata = pageMeta({
  titleTag: 'Features — Orenyx AI Engine™',
  title: 'Features',
  description:
    'Dispatch intelligence, bot orchestration, payment decisioning, and API-first architecture in one engine.',
  path: '/features',
});

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        crumb="Features"
        lead={featuresHero.lead}
        title={
          <>
            {featuresHero.titleBefore}
            <br className="hidden md:block" />
            <span className="text-violet-soft">{featuresHero.titleAccent}</span>
            {featuresHero.titleAfter}
          </>
        }
      />
      <FeaturesSections />
    </>
  );
}
