import Image from 'next/image';

/**
 * Cross-promotion section: links to the other two Orenyx companies.
 * Spanish text comes from lib/i18n/es.json (site-wide EN | ESP switch).
 */
export function OtherCompanies() {
  return (
    <section className="xp" id="other-orenyx-companies" aria-labelledby="xp-title">
      <div className="xp__bar">
        <Image src="/brand/motus-ai-engine.png" alt="Orenyx AI Engine™" width={131} height={90} />
      </div>
      <div className="xp__in">
        <h2 id="xp-title">Explore Our Other Orenyx Companies</h2>
        <p className="xp__sub">More ways to support your business and your crew.</p>
        <div className="xp__grid">
          <div className="xp__card">
            <div className="xp__ic xp__ic--s">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3>Orenyx Safety AI</h3>
            <p>Help your team report hazards, spot risk patterns, and track corrective actions.</p>
            <a className="xp__btn" href="https://orenyx-safety-ai.vercel.app/index.html" target="_blank" rel="noopener">
              Explore Safety AI →
            </a>
          </div>
          <div className="xp__card">
            <div className="xp__ic xp__ic--w">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </div>
            <h3>Orenyx Wellness</h3>
            <p>Support your crew with simple daily wellness check-ins by text or voice.</p>
            <a className="xp__btn" href="https://momentum-wellness-brown.vercel.app/index.html" target="_blank" rel="noopener">
              Explore Wellness →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
