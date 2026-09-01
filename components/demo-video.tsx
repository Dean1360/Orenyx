'use client';

import { useRef, useState } from 'react';

/**
 * Same visual video block as before, but:
 * - No native tap-controls overlay while playing (was covering the content).
 * - Pauses briefly before looping instead of restarting instantly.
 * - Shows a simple replay control only once the video has fully finished,
 *   during that pause — not while it's playing.
 */
export function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  function handleEnded() {
    setEnded(true);
    const video = videoRef.current;
    if (!video) return;
    setTimeout(() => {
      video.currentTime = 0;
      video.play();
      setEnded(false);
    }, 1500);
  }

  function handleReplayClick() {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setEnded(false);
  }

  return (
    <div className="relative">
      <video
        ref={videoRef}
        className="block h-auto w-full"
        src="/videos/automation-demo.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
      />
      {ended && (
        <button
          type="button"
          onClick={handleReplayClick}
          aria-label="Replay"
          className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-violet-900">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
