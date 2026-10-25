import React, { useEffect, useState } from 'react';
import { rng } from './random';
import { pageSeed } from './seed';

// The same page seed and pen-stroke approach as APM's section rules.
function outline(seed) {
  const random = rng(seed ^ 0x27d4eb2d);
  const jitter = (value, spread = 2) => (value + (random() - .5) * spread).toFixed(1);
  const corners = [[4, 4], [96, 4], [96, 96], [4, 96]].map(([x, y]) => [Number(jitter(x)), Number(jitter(y))]);
  let path = `M${corners[0].join(' ')}`;
  corners.forEach(([x, y], index) => {
    const [nextX, nextY] = corners[(index + 1) % corners.length];
    path += ` C${jitter(x + (nextX - x) / 3, 4)} ${jitter(y + (nextY - y) / 3, 4)} ${jitter(x + (nextX - x) * 2 / 3, 4)} ${jitter(y + (nextY - y) * 2 / 3, 4)} ${nextX} ${nextY}`;
  });
  return `${path} Z`;
}

export default function PortraitOutline() {
  const [path, setPath] = useState(() => outline(1));
  useEffect(() => setPath(outline(pageSeed())), []);
  return (
    <svg className="portrait-outline" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <path d={path} fill="#fbf1c7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
