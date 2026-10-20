import { redirect } from 'next/navigation';

/**
 * The working dashboard lives in the Orenyx portal. This route redirects
 * there (e.g. the post-checkout thank-you page) so customers land in the
 * real product, not a marketing description of it.
 */
export default function DashboardPage() {
  redirect('https://portal.orenyxengine.com');
}
