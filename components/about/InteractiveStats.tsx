"use client";

import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/reveal';

export default function InteractiveStats({
  items,
}: {
  items: { name: string; label: string }[];
}) {
  const [hasCounted, setHasCounted] = useState(false);
  const [counts, setCounts] = useState<number[]>(items.map(() => 0));
  const statsRef = useRef<HTMLDListElement | null>(null);

  useEffect(() => {
    const element = statsRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasCounted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasCounted) return;

    const targets = items.map((item) => parseInt(item.name, 10) || 0);
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCounts(targets.map((target) => Math.floor(target * progress)));
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCounts(targets);
      }
    };

    requestAnimationFrame(animate);
  }, [hasCounted, items]);

  return (
    <Reveal>
      <h2 className="mt-20 max-w-[520px] newFont-Parra text-fg-silver">
        Lorem ipsum dolor sit amet,
        consectetur adipiscing elit
      </h2>

      {/* 2-up on phones. gap-10 both ways left each column at 148px, which is
          tight for a stat plus its label — narrow the horizontal gutter only. */}
      <dl ref={statsRef} className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-10 lg:grid-cols-4">
        {items.map((value, index) => {
          const target = parseInt(value.name, 10) || 0;
          const suffix = value.name.replace(/[0-9]/g, '');
          const displayCount = counts[index] >= target ? value.name : `${counts[index]}${suffix}`;

          return (
            <div key={value.name}>
              <h3 className="font-bold text-fg-silver font-bg-count">{displayCount}</h3>
              <div className="mt-2 text-lg text-fg-soft ">{value.label}</div>
            </div>
          );
        })}
      </dl>
    </Reveal>
  );
}
