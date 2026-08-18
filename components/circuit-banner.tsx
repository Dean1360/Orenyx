'use client';

import { useEffect, useRef } from 'react';

/**
 * The signature element: traces feeding a central processor, with pulses
 * running inbound along each trace and a neural lattice firing inside the die.
 *
 * It reads as "events routed into one engine", which is what the product does.
 *
 * Canvas rather than DOM so hundreds of pulses cost nothing, and so teardown is
 * a single cancelAnimationFrame — critical in the App Router, where navigating
 * away unmounts this without a page reload.
 */

const VIOLET = '#8B7CFF';
const NAVY = '#0F172A';
const LINE = '#E2E8F0';

type Trace = {
  pts: { x: number; y: number }[];
  len: number;
  pulses: number[];
  speed: number;
};

export function CircuitBanner({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let traces: Trace[] = [];
    let dieR = 0;
    let cx = 0;
    let cy = 0;

    const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
      Math.hypot(a.x - b.x, a.y - b.y);

    /** Build orthogonal traces from the edges toward the die. */
    function build() {
      traces = [];
      cx = w / 2;
      cy = h / 2;
      dieR = Math.min(w, h) * 0.13;

      const count = w < 640 ? 10 : 18;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + 0.2;
        const startR = Math.max(w, h) * 0.62;
        const sx = cx + Math.cos(angle) * startR;
        const sy = cy + Math.sin(angle) * startR;
        const ex = cx + Math.cos(angle) * (dieR + 6);
        const ey = cy + Math.sin(angle) * (dieR + 6);

        // Elbow: travel on one axis, then the other. Circuit-board grammar.
        const horizontalFirst = i % 2 === 0;
        const mid = horizontalFirst ? { x: ex, y: sy } : { x: sx, y: ey };

        const pts = [{ x: sx, y: sy }, mid, { x: ex, y: ey }];
        const len = dist(pts[0], pts[1]) + dist(pts[1], pts[2]);

        traces.push({
          pts,
          len,
          speed: 0.0009 + Math.random() * 0.0011,
          pulses: Array.from({ length: 2 }, () => Math.random()),
        });
      }
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    /** Position along a polyline at 0..1 of its total length. */
    function pointAt(trace: Trace, t: number) {
      const target = trace.len * t;
      let walked = 0;
      for (let i = 0; i < trace.pts.length - 1; i++) {
        const a = trace.pts[i];
        const b = trace.pts[i + 1];
        const seg = dist(a, b);
        if (walked + seg >= target) {
          const k = seg === 0 ? 0 : (target - walked) / seg;
          return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
        }
        walked += seg;
      }
      return trace.pts[trace.pts.length - 1];
    }

    function drawTraces() {
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = LINE;
      for (const tr of traces) {
        ctx!.beginPath();
        ctx!.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (let i = 1; i < tr.pts.length; i++) ctx!.lineTo(tr.pts[i].x, tr.pts[i].y);
        ctx!.stroke();

        // Solder pad where the trace meets the die.
        const end = tr.pts[tr.pts.length - 1];
        ctx!.fillStyle = LINE;
        ctx!.beginPath();
        ctx!.arc(end.x, end.y, 2.5, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function drawPulses(dt: number) {
      for (const tr of traces) {
        for (let i = 0; i < tr.pulses.length; i++) {
          if (!reduced) {
            tr.pulses[i] += tr.speed * dt;
            if (tr.pulses[i] > 1) tr.pulses[i] -= 1;
          }
          const t = tr.pulses[i];
          const p = pointAt(tr, t);

          // Short comet tail so direction of travel is legible.
          const tail = pointAt(tr, Math.max(0, t - 0.06));
          const grad = ctx!.createLinearGradient(tail.x, tail.y, p.x, p.y);
          grad.addColorStop(0, 'rgba(139,124,255,0)');
          grad.addColorStop(1, VIOLET);
          ctx!.strokeStyle = grad;
          ctx!.lineWidth = 2;
          ctx!.beginPath();
          ctx!.moveTo(tail.x, tail.y);
          ctx!.lineTo(p.x, p.y);
          ctx!.stroke();

          ctx!.fillStyle = VIOLET;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function drawDie(time: number) {
      const s = dieR * 1.25;
      ctx!.save();
      ctx!.translate(cx, cy);

      // Die body.
      ctx!.fillStyle = NAVY;
      roundRect(ctx!, -s, -s, s * 2, s * 2, 8);
      ctx!.fill();

      // Neural lattice: three columns, connections brightening in sequence.
      const cols = 3;
      const rows = 3;
      const gap = (s * 1.2) / (cols - 1);
      const nodes: { x: number; y: number }[][] = [];
      for (let c = 0; c < cols; c++) {
        const col: { x: number; y: number }[] = [];
        for (let r = 0; r < rows; r++) {
          col.push({ x: -s * 0.6 + c * gap, y: -s * 0.5 + r * ((s * 1.0) / (rows - 1)) });
        }
        nodes.push(col);
      }

      for (let c = 0; c < cols - 1; c++) {
        for (let a = 0; a < rows; a++) {
          for (let b = 0; b < rows; b++) {
            const phase = reduced ? 0.4 : (Math.sin(time * 0.002 + c * 1.4 + a + b) + 1) / 2;
            ctx!.strokeStyle = `rgba(139,124,255,${0.12 + phase * 0.5})`;
            ctx!.lineWidth = 0.8;
            ctx!.beginPath();
            ctx!.moveTo(nodes[c][a].x, nodes[c][a].y);
            ctx!.lineTo(nodes[c + 1][b].x, nodes[c + 1][b].y);
            ctx!.stroke();
          }
        }
      }

      for (const col of nodes) {
        for (const n of col) {
          ctx!.fillStyle = VIOLET;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, 2.4, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      ctx!.restore();
    }

    function roundRect(
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      wd: number,
      ht: number,
      r: number,
    ) {
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + wd, y, x + wd, y + ht, r);
      c.arcTo(x + wd, y + ht, x, y + ht, r);
      c.arcTo(x, y + ht, x, y, r);
      c.arcTo(x, y, x + wd, y, r);
      c.closePath();
    }

    let last = performance.now();

    function frame(now: number) {
      const dt = Math.min(now - last, 50);
      last = now;

      ctx!.clearRect(0, 0, w, h);
      drawTraces();
      drawPulses(dt);
      drawDie(now);

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    resize();
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
