import { LegalPage } from '@/components/legal-page';
import { paymentTerms } from '@/content/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  titleTag: paymentTerms.titleTag,
  title: paymentTerms.title,
  description: paymentTerms.description,
  path: paymentTerms.path,
});

export default function Page() {
  return <LegalPage outline={paymentTerms} />;
}
