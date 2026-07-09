import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type Props = {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0..1
};

export default function ProgressRing({ size = 80, strokeWidth = 8, progress = 0.5 }: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const animated = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animated, { toValue: progress, duration: 800, useNativeDriver: true }).start();
  }, [progress]);

  const strokeDashoffset = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  const AnimatedCircle = Animated.createAnimatedComponent(Circle as any);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e6eefc"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#4f46e5"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset as any}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({});
