import React from 'react';
import { Wave, useDraw } from './Drawn';

export default function WaveRule({ variant = 0 }) {
  const draw = useDraw();
  return <Wave w={draw?.waves[variant % 2]} />;
}
