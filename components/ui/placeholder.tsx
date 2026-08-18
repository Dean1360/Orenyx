import type { ReactNode } from 'react';

/**
 * Marks content neither the Figma nor the Builder Packet supplied.
 * Deliberately loud. scripts-check-placeholders.mjs is the launch gate.
 */
export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span
      data-placeholder="true"
      className="font-mono text-[0.85em] uppercase tracking-wide text-placeholder"
    >
      [PLACEHOLDER — {children}]
    </span>
  );
}
