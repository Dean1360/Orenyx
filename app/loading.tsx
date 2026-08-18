import Image from 'next/image';

/** Route-transition fallback — same logo treatment as the splash loader. */
export default function Loading() {
  return (
    <div role="status" aria-label="Loading" className="site-loader site-loader--route">
      <div className="site-loader__stack">
        <div className="site-loader__glow" aria-hidden="true" />
        <Image
          src="/brand/motus-ai-engine.png"
          alt="Orenyx AI Engine™"
          width={528}
          height={318}
          priority
          className="site-loader__logo"
        />
        <div className="site-loader__bar" aria-hidden="true">
          <span />
        </div>
      </div>
    </div>
  );
}
