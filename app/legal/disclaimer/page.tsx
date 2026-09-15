import { LegalPage } from '@/components/legal-page';
import { disclaimer } from '@/content/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: disclaimer.titleTag,
  title: disclaimer.title,
  description: disclaimer.description,
  path: disclaimer.path,
});

export default function Page() {
  return <LegalPage outline={disclaimer} />;
}
