import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/ui/Header';
import TaskCard from '../components/ui/TaskCard';
import { Task } from '../types';

type FilterType = 'all' | 'pending' | 'completed' | 'overdue';

export default function TasksScreen() {
  const { colors } = useTheme();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Call MetLife Insurance', description: 'Policy #98221-A claiming assistance', category: 'financial', duration: 'Overdue (Due 2d ago)', completed: false, group: 'financial' },
    { id: '2', title: 'Request copies of Certificate', description: 'Contact local vital records office', category: 'certificates', duration: 'Due in 2 days', completed: false, group: 'certificates' },
    { id: '3', title: 'Submit Bereavement Leave to HR', description: 'Request 5 days bereavement leave', category: 'personal', duration: 'Completed', completed: true, group: 'personal' },
    { id: '4', title: 'Notify Utility Provider (Comcast)', description: 'Request account hold or transfer', category: 'bills', duration: 'Due in 6 days', completed: false, group: 'bills' },
    { id: '5', title: 'Locate original Will documents', description: 'Check safety deposit box at Chase bank', category: 'legal', duration: 'Due in 12 days', completed: false, group: 'legal' },
  ]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const nextState = !task.completed;
        if (nextState) {
          Alert.alert('Task Completed', 'Administrative task cleared. You are doing great.');
        }
        return { ...task, completed: nextState };
      }
      return task;
    }));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'completed') return task.completed;
      if (activeFilter === 'pending') return !task.completed;
      if (activeFilter === 'overdue') return !task.completed && task.duration.includes('Overdue');
      return true;
    });
  }, [tasks, activeFilter]);

  const getPriorityForTask = (task: Task) => {
    if (task.duration.includes('Overdue')) return 'critical';
    if (task.duration.includes('Due in 2 days')) return 'urgent';
    return 'gentle';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerContainer}>
        <Header 
          title="Tasks" 
          subtitle="Keep track of estate chores & legal details" 
        />
        
        {/* Filter Scroll Pills row */}
        <View style={styles.filterRow}>
          {(['all', 'pending', 'completed', 'overdue'] as FilterType[]).map((filter) => (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[
                styles.filterPill,
                { 
                  backgroundColor: activeFilter === filter ? colors.primary : colors.card,
                  borderColor: colors.border
                }
              ]}
            >
              <Text 
                style={{ 
                  color: activeFilter === filter ? '#FFFFFF' : colors.text,
                  fontWeight: '600',
                  fontSize: 11,
                  textTransform: 'capitalize'
                }}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TaskCard
            title={item.title}
            description={item.description}
            deadline={item.duration}
            completed={item.completed}
            priority={getPriorityForTask(item)}
            onToggle={() => toggleTask(item.id)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <IoniconsIcon name="checkmark-done-circle" size={48} color={colors.secondaryText} />
            <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
              No tasks found in this section
            </Text>
          </View>
        }
      />
    </View>
  );
}

// Quick inline icon component to avoid bundle size issues
const IoniconsIcon = ({ name, size, color }: { name: string; size: number; color: string }) => {
  const { Ionicons } = require('@expo/vector-icons');
  return <Ionicons name={name as any} size={size} color={color} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 8,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontFamily: 'Inter',
    fontSize: 13,
    marginTop: 10,
  },
});
