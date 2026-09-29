import { handleInquiry } from '@/lib/inquiry';

/** Private License inquiry form (/private-license). See lib/inquiry.ts. */
export async function POST(request: Request) {
  return handleInquiry(request, 'private-license');
}
