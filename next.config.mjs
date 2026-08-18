/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Every next/image is negotiated per-browser: AVIF first (smallest),
    // WebP fallback, original only for ancient browsers. Plain <img> tags
    // bypass this entirely — don't add new ones for content images.
    formats: ['image/avif', 'image/webp'],
  },
  // NOTE: if the Request Access form moves to an external service
  // (Formspree / Web3Forms), delete app/api/request-access/route.ts and
  // uncomment the line below for a fully static export.
  // output: 'export',
  //
  // If you enable static export, next/image optimisation is unavailable and the
  // build will fail on the logo. Add images: { unoptimized: true } at the same
  // time — the PNG then ships as-is, so keep its file size honest.
};

export default nextConfig;
