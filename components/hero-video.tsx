'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n/language';

/**
 * Homepage hero ad. Tries to start WITH sound. Browsers often block
 * autoplay with sound until the visitor interacts with the page, so if
 * that happens it starts muted and turns sound on (from the beginning)
 * at the visitor's first tap, click, or key press anywhere on the page.
 * Plays once and holds on the final "Get Started Today" frame.
 * Visitors can mute/unmute at any time and replay once it finishes.
 */
export function HeroVideo({
  src = '/videos/orenyx-home-ad.mp4',
  poster = '/videos/orenyx-home-ad-poster.jpg',
}: {
  src?: string;
  poster?: string;
}) {
  const { lang } = useLanguage();
  const videoSrc = lang === 'es' ? '/videos/orenyx-home-ad-es.mp4' : src;
  const videoPoster = lang === 'es' ? '/videos/orenyx-home-ad-es-poster.jpg' : poster;
  const videoRef = useRef<HTMLVideoElement>(null);
  const userChoseRef = useRef(false);
  const [muted, setMuted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [phoneGate, setPhoneGate] = useState(false);

  // All devices: never autoplay. Show a big Play button; one click/tap starts with sound.
  useEffect(() => {
    setPhoneGate(true);
  }, []);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    userChoseRef.current = true;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next && ended) {
      video.currentTime = 0;
      video.play();
      setEnded(false);
    }
  }

  function playWithSound() {
    const video = videoRef.current;
    if (!video) return;
    userChoseRef.current = true;
    video.muted = false;
    setMuted(false);
    video.currentTime = 0;
    video.play().catch(() => {});
    setEnded(false);
    setPhoneGate(false);
  }

  function replay() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setEnded(false);
  }

  const btn =
    'rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold text-white backdrop-blur hover:bg-black/80 md:px-4 md:py-2 md:text-sm';

  return (
    <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[20px] border border-line-violet bg-black shadow-2xl">
      <video
        ref={videoRef}
        className="block aspect-video h-auto w-full"
        key={videoSrc}
        src={videoSrc}
        poster={videoPoster}
        playsInline
        preload="auto"
        onEnded={() => setEnded(true)}
        aria-label="Orenyx 15-second overview: answers calls, books appointments 24/7, dispatches technicians, takes payments, and handles follow-ups in one engine."
      />
      {phoneGate && (
        <button
          type="button"
          onClick={playWithSound}
          aria-label="Play video with sound"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-violet-900 shadow-2xl">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-1 h-9 w-9">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="rounded-full bg-black/60 px-4 py-1.5 text-sm font-bold text-white">
            Tap to watch with sound
          </span>
        </button>
      )}
      <div className={`${phoneGate ? 'hidden ' : ''}absolute right-2 top-2 flex gap-2 md:top-auto md:bottom-4 md:right-4`}>
        {ended && (
          <button type="button" onClick={replay} className={btn}>
            Replay
          </button>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSound();
          }}
          onPointerUp={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          aria-pressed={muted}
          className={btn}
        >
          <span className="inline-flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
              <path d="M3 9v6h4l5 5V4L7 9H3z" />
              {muted ? (
                <path d="M16 9l5 5m0-5l-5 5" stroke="currentColor" strokeWidth="2" fill="none" />
              ) : (
                <path d="M16 8a5 5 0 010 8M18.5 5.5a8.5 8.5 0 010 13" stroke="currentColor" strokeWidth="2" fill="none" />
              )}
            </svg>
            {muted ? 'Tap for sound' : 'Mute'}
          </span>
        </button>
      </div>
    </div>
  );
}
