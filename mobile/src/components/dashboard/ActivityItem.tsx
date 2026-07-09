import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ActivityItem({ title, time }: { title: string; time: string }) {
  return (
    <View style={styles.row}>
      <View style={styles.dot} />
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#e2e8f0' },
  title: { fontWeight: '600', color: '#0f172a' },
  time: { color: '#64748b', fontSize: 12, marginTop: 2 },
});
