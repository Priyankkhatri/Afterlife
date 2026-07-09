import React from 'react';
import { View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

type Props = { data: number[]; color?: string; height?: number };

export default function MiniChart({ data, color = '#6366f1', height = 40 }: Props) {
  if (!data || data.length === 0) return <View style={{ height }} />;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = Math.max(1, max - min);
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = ((1 - (v - min) / range) * 100).toFixed(2);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <View style={{ height }}>
      <Svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ flex: 1 }}>
        <Polyline points={points} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      </Svg>
    </View>
  );
}
