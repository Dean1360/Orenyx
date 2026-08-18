import { LegalPage } from '@/components/legal-page';
import { terms } from '@/content/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: terms.titleTag,
  title: terms.title,
  description: terms.description,
  path: terms.path,
});

export default function Page() {
  return <LegalPage outline={terms} />;
}
