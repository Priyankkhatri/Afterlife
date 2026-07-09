import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Task = any;

export default function TaskCard({ task, onAction }: { task: Task; onAction: (action: string, task: any) => void }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.deadline}>{task.deadline}</Text>
      </View>
      <Text style={styles.desc}>{task.description}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Institution:</Text>
        <Text style={styles.metaValue}>{task.institution || '—'}</Text>
      </View>
      <View style={styles.metaRow}>
        <Text style={styles.metaLabel}>Required:</Text>
        <Text style={styles.metaValue}>{(task.requiredDocuments || []).join(', ') || 'None'}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => onAction('complete', task)}>
          <Text style={styles.actionText}>Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.skip]} onPress={() => onAction('skip', task)}>
          <Text style={styles.actionText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.reschedule]} onPress={() => onAction('reschedule', task)}>
          <Text style={styles.actionText}>Reschedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.note]} onPress={() => onAction('note', task)}>
          <Text style={styles.actionText}>Note</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, elevation: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontWeight: '700', color: '#0f172a' },
  deadline: { color: '#64748b', fontSize: 12 },
  desc: { color: '#475569', marginTop: 8 },
  metaRow: { flexDirection: 'row', marginTop: 8 },
  metaLabel: { fontWeight: '600', color: '#0f172a', marginRight: 6 },
  metaValue: { color: '#64748b' },
  actions: { flexDirection: 'row', marginTop: 12, justifyContent: 'space-between' },
  actionBtn: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#eef2ff' },
  actionText: { color: '#4f46e5', fontWeight: '700' },
  skip: { backgroundColor: '#fef3c7' },
  reschedule: { backgroundColor: '#e6eefc' },
  note: { backgroundColor: '#e6f5ea' },
});
