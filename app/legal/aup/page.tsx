import { LegalPage } from '@/components/legal-page';
import { aup } from '@/content/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: aup.titleTag,
  title: aup.title,
  description: aup.description,
  path: aup.path,
});

export default function Page() {
  return <LegalPage outline={aup} />;
}
