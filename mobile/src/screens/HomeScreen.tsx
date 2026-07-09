import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Header title="Home" subtitle="Your planning dashboard" />
      <Card>
        <Text style={styles.cardTitle}>Welcome</Text>
        <Text style={styles.cardText}>Keep your important documents and decisions in one calm place.</Text>
      </Card>
      <View style={{ height: 12 }} />
      <Card>
        <Text style={styles.cardTitle}>Next steps</Text>
        <Text style={styles.cardText}>• Upload key documents</Text>
        <Text style={styles.cardText}>• Review your tasks</Text>
        <Text style={styles.cardText}>• Update your profile</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 6 },
  cardText: { color: '#475569', marginTop: 4 },
});
