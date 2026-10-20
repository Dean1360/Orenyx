import { redirect } from 'next/navigation';

/**
 * The customer login lives in the Orenyx portal, not on the marketing site.
 * This route redirects there so no link ever dead-ends.
 */
export default function LoginPage() {
  redirect('https://portal.orenyxengine.com');
}
