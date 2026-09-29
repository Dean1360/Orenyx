import { handleInquiry } from '@/lib/inquiry';

/** Compliance inquiry form (/compliance). See lib/inquiry.ts. */
export async function POST(request: Request) {
  return handleInquiry(request, 'compliance');
}
