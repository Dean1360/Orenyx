import { LegalPage } from '@/components/legal-page';
import { dpa } from '@/content/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: dpa.titleTag,
  title: dpa.title,
  description: dpa.description,
  path: dpa.path,
});

export default function Page() {
  return <LegalPage outline={dpa} />;
}
