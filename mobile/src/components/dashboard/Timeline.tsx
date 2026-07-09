import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Item = { title: string; date: string };

export default function Timeline({ items }: { items: Item[] }) {
  return (
    <View>
      {items.map((it, idx) => (
        <View key={idx} style={styles.row}>
          <View style={styles.marker} />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.title}>{it.title}</Text>
            <Text style={styles.date}>{it.date}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  marker: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#4f46e5' },
  title: { fontWeight: '600', color: '#0f172a' },
  date: { color: '#64748b', fontSize: 12, marginTop: 2 },
});
