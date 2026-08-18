'use client';

import { useState } from 'react';
import { Placeholder } from '@/components/ui/placeholder';

export type FaqItem = { q: string; a: string | null };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  // The Figma shows the second item open on load.
  const [open, setOpen] = useState<number | null>(1);

  return (
    <div className="space-y-3 accordion-custom">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="overflow-hidden rounded-[8px] bg-bg-inset">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left"
              >
                <span className="text-base text-white">{item.q}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className={`shrink-0 text-fg-soft transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h3>
            <div id={`faq-panel-${i}`} hidden={!isOpen} className="px-5 pb-5 text-fg-soft">
              {item.a ?? <Placeholder>answer for “{item.q}”</Placeholder>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
