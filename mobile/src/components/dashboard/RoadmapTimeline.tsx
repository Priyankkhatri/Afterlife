import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TaskCard from './TaskCard';

type Task = {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description?: string;
  deadline?: string;
  requiredDocuments?: string[];
  institution?: string;
  status?: string;
  estimatedHours?: string;
};

export default function RoadmapTimeline({ tasks, onAction }: { tasks: Task[]; onAction: (a: string, t: Task) => void }) {
  const groups = {
    high: tasks.filter((t) => t.priority === 'high'),
    medium: tasks.filter((t) => t.priority === 'medium'),
    low: tasks.filter((t) => t.priority === 'low'),
  };

  return (
    <View>
      <Section title="High Priority">{groups.high.map((t) => <TaskCard key={t.id} task={t as any} onAction={onAction} />)}</Section>
      <Section title="Medium Priority">{groups.medium.map((t) => <TaskCard key={t.id} task={t as any} onAction={onAction} />)}</Section>
      <Section title="Low Priority">{groups.low.map((t) => <TaskCard key={t.id} task={t as any} onAction={onAction} />)}</Section>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({ sectionTitle: { fontWeight: '800', color: '#0f172a', marginBottom: 8 } });
