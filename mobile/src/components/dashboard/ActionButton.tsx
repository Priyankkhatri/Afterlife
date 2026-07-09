import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
};

export default function ActionButton({ title, onPress, variant = 'primary' }: Props) {
  return (
    <Pressable style={({ pressed }) => [styles.button, variant === 'secondary' && styles.secondary, variant === 'ghost' && styles.ghost, pressed && styles.pressed]} onPress={onPress}>
      <Text style={[styles.text, variant !== 'primary' && styles.textSecondary]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: '#e2e8f0',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  pressed: {
    opacity: 0.9,
  },
  text: {
    color: '#ffffff',
    fontWeight: '700',
  },
  textSecondary: {
    color: '#0f172a',
  },
});
