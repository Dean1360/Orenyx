'use client';

import { useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n/language';

/**
 * Homepage hero ad. Uses the browser's native play controls (the play/pause,
 * the volume, the fullscreen) — the reliable play button on every device,
 * including the phones. When the video ends it holds the final frame and
 * shows a "Book now" overlay (the CTA — the booking).
 */
export function HeroVideo({
  src = '/videos/orenyx-home-ad.mp4',
  poster = '/videos/orenyx-home-ad-poster.jpg',
}: {
  src?: string;
  poster?: string;
}) {
  const { lang } = useLanguage();
  const videoSrc = lang === 'es' ? src.replace(/\.mp4$/, '-es.mp4') : src;
  const videoPoster = lang === 'es' ? poster.replace(/-poster\.jpg$/, '-es-poster.jpg') : poster;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  return (
    <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[20px] border-[6px] border-violet-bright bg-black shadow-2xl">
      <video
        ref={videoRef}
        className="block aspect-video h-auto w-full"
        key={videoSrc}
        src={videoSrc}
        poster={videoPoster}
        playsInline
        controls
        preload="auto"
        onEnded={() => { setEnded(true); videoRef.current?.pause(); }}
        aria-label="Orenyx 15-second overview: answers calls, books appointments 24/7, dispatches technicians, takes payments, and handles follow-ups in one engine."
      />
      {ended && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <a
            href="/pricing"
            className="rounded-full bg-violet-bright px-8 py-4 text-xl font-bold text-white shadow-2xl transition-transform hover:scale-105 hover:bg-violet-600"
          >
            {lang === 'es' ? 'Reservar ahora' : 'Book now'}
          </a>
        </div>
      )}
    </div>
  );
}
