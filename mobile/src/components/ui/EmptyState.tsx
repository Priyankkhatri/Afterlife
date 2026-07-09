import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  message: string;
};

export default function EmptyState({ title, message }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  message: {
    marginTop: 6,
    color: '#64748b',
    textAlign: 'center',
  },
});
