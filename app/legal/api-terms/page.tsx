import { LegalPage } from '@/components/legal-page';
import { apiTerms } from '@/content/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: apiTerms.titleTag,
  title: apiTerms.title,
  description: apiTerms.description,
  path: apiTerms.path,
});

export default function Page() {
  return <LegalPage outline={apiTerms} />;
}
