# Section background assets

Drop exported Figma artwork here, then reference it from a `Section`:

```tsx
<Section pattern="glow" bg={{ src: '/bg/solution.png', opacity: 0.28 }}>
```

## Rules

- **Export PNG** (or JPG for photographic art). `next/image` negotiates
  AVIF/WebP per request — do not hand-export WebP.
- **2560px wide** is enough for any viewport. Larger is wasted bytes.
- **Keep opacity at or below ~0.35.** These sit behind body copy; anything
  louder and the text fails contrast.
- Decorative only. Never put information in a background — it is `alt=""` and
  hidden from assistive tech by design.
- If CSS can express it, use `pattern` instead and ship no asset at all.
  Available: `dots`, `grid`, `rings`, `glow`.
