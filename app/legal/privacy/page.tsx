import { LegalPage } from '@/components/legal-page';
import { privacy } from '@/content/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: privacy.titleTag,
  title: privacy.title,
  description: privacy.description,
  path: privacy.path,
});

export default function Page() {
  return <LegalPage outline={privacy} />;
}
