'use client';

import { useRef, useState } from 'react';

/**
 * Homepage hero ad. Autoplays muted (browsers block autoplay with sound),
 * plays once and holds on the final "Get Started Today" frame.
 * Visitors can turn sound on, and replay once it finishes.
 */
export function HeroVideo({
  src = '/videos/orenyx-home-ad.mp4',
  poster = '/videos/orenyx-home-ad-poster.jpg',
}: {
  src?: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [ended, setEnded] = useState(false);

  function toggleSound() {
    const video = videoRef.current;
    if (!video) return;
    const next = !muted;
    video.muted = next;
    setMuted(next);
    if (!next && ended) {
      video.currentTime = 0;
      video.play();
      setEnded(false);
    }
  }

  function replay() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setEnded(false);
  }

  return (
    <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[20px] border border-line-violet bg-black shadow-2xl">
      <video
        ref={videoRef}
        className="block aspect-video h-auto w-full"
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setEnded(true)}
        aria-label="Orenyx 15-second overview: answers calls, books appointments 24/7, dispatches technicians, takes payments, and handles follow-ups in one engine."
      />
      <div className="absolute right-2 top-2 flex gap-2 md:top-auto md:bottom-4 md:right-4">
        {ended && (
          <button
            type="button"
            onClick={replay}
            className="rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold md:px-4 md:py-2 md:text-sm text-white backdrop-blur hover:bg-black/80"
          >
            Replay
          </button>
        )}
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          className="rounded-full bg-black/60 px-3 py-1.5 text-xs font-bold md:px-4 md:py-2 md:text-sm text-white backdrop-blur hover:bg-black/80"
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
            {muted ? 'Tap for sound' : 'Sound on'}
          </span>
        </button>
      </div>
    </div>
  );
}
