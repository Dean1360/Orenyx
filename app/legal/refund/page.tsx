import { LegalPage } from '@/components/legal-page';
import { refund } from '@/content/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: refund.titleTag,
  title: refund.title,
  description: refund.description,
  path: refund.path,
});

export default function Page() {
  return <LegalPage outline={refund} />;
}
