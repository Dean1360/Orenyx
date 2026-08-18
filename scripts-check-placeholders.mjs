/**
 * Launch gate. Fails if any unresolved packet content is still in the build.
 * Run with: node scripts-check-placeholders.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const roots = ['app', 'components', 'content', 'lib'];
const hits = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) {
      walk(p);
      continue;
    }
    if (!/\.(tsx?|css)$/.test(p)) continue;
    readFileSync(p, 'utf8')
      .split('\n')
      .forEach((line, i) => {
        if (line.includes('PLACEHOLDER')) hits.push(`${p}:${i + 1}  ${line.trim()}`);
      });
  }
}

roots.forEach(walk);

if (hits.length === 0) {
  console.log('✓ No placeholders. Cleared for launch.');
  process.exit(0);
}

console.log(`✗ ${hits.length} unresolved placeholder(s):\n`);
hits.forEach((h) => console.log('  ' + h));
process.exit(1);
