import React from 'react';
import { Wave, useDraw } from './Drawn';

export default function WaveRule({ variant = 0 }) {
  const draw = useDraw('home');
  return <Wave w={draw?.wave(variant)} />;
}
