import type { ReactNode } from 'react';

/** Bordered violet-edged panel used across the dark sections. */
export function Card({
  title,
  children,
  className = '',
  icon,
}: {
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <div className={`border border-line-violet bg-bg-2/60 p-7 ${className}`}>
      {icon ? (
        <div className="mb-5 grid h-11 w-11 place-items-center rounded-[8px] border border-line-violet text-violet-bright">
          {icon}
        </div>
      ) : null}
      {title ? (
        <h3 className="text-xl font-bold leading-tight text-violet-bright">{title}</h3>
      ) : null}
      {children ? <div className="mt-3 text-sm leading-relaxed text-fg-soft">{children}</div> : null}
    </div>
  );
}
