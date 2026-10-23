'use client';

import { useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n/language';

/**
 * Homepage hero ad. Uses the browser's native play controls (the play/pause,
 * the volume, the fullscreen) — the reliable play button on every device,
 * including the phones. Plays with sound when the visitor taps play.
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
  const [, setEnded] = useState(false);

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
        onEnded={() => { videoRef.current?.pause(); }}
        aria-label="Orenyx 15-second overview: answers calls, books appointments 24/7, dispatches technicians, takes payments, and handles follow-ups in one engine."
      />
    </div>
  );
}
