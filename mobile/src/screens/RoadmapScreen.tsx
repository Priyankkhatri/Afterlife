import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';
import TimelineCard from '../components/ui/TimelineCard';
import ProgressCard from '../components/ui/ProgressCard';
import Button from '../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

type Milestone = {
  id: string;
  title: string;
  date: string;
  priority: 'critical' | 'urgent' | 'gentle';
  completed: boolean;
};

export default function RoadmapScreen() {
  const { colors } = useTheme();

  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: '1', title: 'Request Certified Copies of Death Certificate', date: 'Immediate (Due in 2 days)', priority: 'critical', completed: false },
    { id: '2', title: 'Notify Life Insurance Provider (MetLife #98221-A)', date: 'Immediate (Due in 3 days)', priority: 'critical', completed: false },
    { id: '3', title: 'Submit Bereavement Leave Form to HR', date: 'This week (Due in 5 days)', priority: 'urgent', completed: true },
    { id: '4', title: 'Notify Social Security Administration', date: 'This week (Due in 7 days)', priority: 'urgent', completed: false },
    { id: '5', title: 'Close Credit Card & Utility Accounts', date: 'Next week', priority: 'gentle', completed: false },
    { id: '6', title: 'Initiate Probate with Probate Clerk', date: 'Within 30 days', priority: 'gentle', completed: false },
  ]);

  const toggleMilestone = (id: string) => {
    setMilestones(prev => prev.map(m => {
      if (m.id === id) {
        const nextState = !m.completed;
        if (nextState) {
          Alert.alert('Milestone Cleared', 'You have marked this milestone complete. Administrative relief!');
        }
        return { ...m, completed: nextState };
      }
      return m;
    }));
  };

  const completedCount = milestones.filter(m => m.completed).length;
  const progressPercent = milestones.length > 0 ? completedCount / milestones.length : 0;

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Header 
          title="Administrative Path" 
          subtitle="Chronological roadmap to guide you step-by-step" 
        />
      </View>

      {/* Progress tracker */}
      <ProgressCard 
        progress={progressPercent} 
        title="Path Progress" 
        subtitle={`${completedCount} of ${milestones.length} milestones accomplished.`}
      />

      {/* Timeline view block */}
      <Card style={styles.timelineCard}>
        <View style={styles.milestoneHeader}>
          <Ionicons name="map-outline" size={18} color={colors.primary} />
          <Text style={[styles.milestoneTitle, { color: colors.text }]}>Chronological Timeline</Text>
        </View>

        <View style={styles.list}>
          {milestones.map((item, index) => (
            <Pressable key={item.id} onPress={() => toggleMilestone(item.id)}>
              <TimelineCard 
                title={item.title}
                date={item.date}
                priority={item.priority}
                completed={item.completed}
                isLast={index === milestones.length - 1}
              />
            </Pressable>
          ))}
        </View>
      </Card>

      <Text style={[styles.infoText, { color: colors.secondaryText }]}>
        Tap on any timeline node or milestone card above to toggle its completion state.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 110,
    paddingTop: 50,
  },
  header: {
    marginBottom: 8,
  },
  timelineCard: {
    paddingTop: 20,
    paddingBottom: 8,
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    gap: 8,
  },
  milestoneTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    fontWeight: '700',
  },
  list: {
    marginTop: 4,
  },
  infoText: {
    fontFamily: 'Inter',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 16,
    paddingHorizontal: 20,
  },
});
