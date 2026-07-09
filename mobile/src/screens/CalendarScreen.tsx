import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';

type Event = {
  id: string;
  title: string;
  desc: string;
  priority: 'critical' | 'urgent' | 'gentle';
};

const CALENDAR_EVENTS: Record<number, Event[]> = {
  2: [
    { id: '1', title: 'Comcast Account Security Liquidate', desc: 'Call billing to freeze accounts', priority: 'gentle' }
  ],
  10: [
    { id: '2', title: 'MetLife Policy #98221-A Claim Deadline', desc: 'Required claiming notification window ends today.', priority: 'critical' }
  ],
  15: [
    { id: '3', title: 'Notify Social Security Administration', desc: 'Submit passing form 2872-A to local branch office.', priority: 'urgent' }
  ],
};

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_IN_JULY = 31;
const START_DAY_OFFSET = 3; // July 2026 starts on a Wednesday

export default function CalendarScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = useState(10);

  const getDayEvents = (day: number) => {
    return CALENDAR_EVENTS[day] || [];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return colors.danger;
      case 'urgent':
        return colors.warning;
      case 'gentle':
        return colors.primary;
      default:
        return colors.secondaryText;
    }
  };

  // Build grid blocks
  const gridCells = [];
  // Empty blocks before month starts
  for (let i = 0; i < START_DAY_OFFSET; i++) {
    gridCells.push(<View key={`empty-${i}`} style={styles.gridCellEmpty} />);
  }
  // Days of the month
  for (let day = 1; day <= DAYS_IN_JULY; day++) {
    const hasEvents = getDayEvents(day).length > 0;
    const isSelected = selectedDay === day;

    gridCells.push(
      <Pressable 
        key={`day-${day}`} 
        onPress={() => setSelectedDay(day)}
        style={[
          styles.gridCell,
          isSelected && { backgroundColor: colors.primary }
        ]}
      >
        <Text style={[
          styles.dayText,
          { color: isSelected ? '#FFFFFF' : colors.text },
          isSelected && { fontWeight: '700' }
        ]}>
          {day}
        </Text>
        {hasEvents && !isSelected && (
          <View style={[
            styles.dot, 
            { backgroundColor: getDayEvents(day)[0].priority === 'critical' ? colors.danger : colors.primary }
          ]} />
        )}
      </Pressable>
    );
  }

  const selectedEvents = getDayEvents(selectedDay);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.navRow}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.navTitle, { color: colors.text }]}>Calendar</Text>
      </View>

      <Header title="July 2026" subtitle="Review scheduled legal filings & task milestones" />

      {/* Calendar Grid Container */}
      <Card style={styles.calendarCard}>
        {/* Weekday Titles */}
        <View style={styles.weekdaysHeader}>
          {WEEKDAYS.map(day => (
            <Text key={day} style={[styles.weekdayText, { color: colors.secondaryText }]}>
              {day}
            </Text>
          ))}
        </View>

        {/* Days Grid */}
        <View style={styles.grid}>
          {gridCells}
        </View>
      </Card>

      {/* Selected Day details list */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Schedule for July {selectedDay}
      </Text>

      {selectedEvents.length > 0 ? (
        selectedEvents.map(event => (
          <Card key={event.id} style={styles.eventCard}>
            <View style={styles.eventRow}>
              <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(event.priority) }]} />
              <View style={styles.eventDetails}>
                <Text style={[styles.eventTitle, { color: colors.text }]}>{event.title}</Text>
                <Text style={[styles.eventDesc, { color: colors.secondaryText }]}>{event.desc}</Text>
              </View>
            </View>
          </Card>
        ))
      ) : (
        <Card style={styles.emptyCard}>
          <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
            No deadlines or notifications scheduled for this date.
          </Text>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 50,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    marginBottom: 14,
  },
  backBtn: {
    padding: 4,
  },
  navTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
  calendarCard: {
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  weekdaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  weekdayText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
    width: '14.2%',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridCell: {
    width: '14.2%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: 2,
    position: 'relative',
  },
  gridCellEmpty: {
    width: '14.2%',
    height: 40,
  },
  dayText: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '600',
  },
  dot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  eventCard: {
    marginBottom: 10,
    padding: 16,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  priorityIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 2,
    marginRight: 12,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
  },
  eventDesc: {
    fontFamily: 'Inter',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  emptyCard: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'Inter',
    fontSize: 12,
    textAlign: 'center',
  },
});
