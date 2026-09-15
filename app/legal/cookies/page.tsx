import { LegalPage } from '@/components/legal-page';
import { cookies } from '@/content/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: cookies.titleTag,
  title: cookies.title,
  description: cookies.description,
  path: cookies.path,
});

export default function Page() {
  return <LegalPage outline={cookies} />;
}
