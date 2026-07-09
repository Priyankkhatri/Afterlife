import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title: string;
  date: string;
  isLast?: boolean;
  priority?: 'critical' | 'urgent' | 'gentle';
  completed?: boolean;
};

export default function TimelineCard({ 
  title, 
  date, 
  isLast = false, 
  priority = 'gentle',
  completed = false
}: Props) {
  const { colors } = useTheme();

  const getPriorityColor = () => {
    switch (priority) {
      case 'critical':
        return colors.danger;
      case 'urgent':
        return colors.warning;
      case 'gentle':
        return colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      {/* Node column */}
      <View style={styles.nodeColumn}>
        <View 
          style={[
            styles.node, 
            { 
              backgroundColor: completed ? colors.primary : colors.card,
              borderColor: completed ? colors.primary : getPriorityColor() 
            }
          ]}
        >
          {completed && <Ionicons name="checkmark" size={10} color="#FFFFFF" />}
        </View>
        {!isLast && <View style={[styles.line, { backgroundColor: colors.border }]} />}
      </View>

      {/* Content column */}
      <View style={styles.contentColumn}>
        <Text 
          style={[
            styles.title, 
            { 
              color: colors.text,
              textDecorationLine: completed ? 'line-through' : 'none',
              opacity: completed ? 0.6 : 1
            }
          ]}
        >
          {title}
        </Text>
        <Text style={[styles.date, { color: colors.secondaryText }]}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 58,
  },
  nodeColumn: {
    alignItems: 'center',
    width: 24,
    marginRight: 12,
  },
  node: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  line: {
    width: 2,
    flex: 1,
    marginVertical: 4,
  },
  contentColumn: {
    flex: 1,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
  date: {
    fontFamily: 'Inter',
    fontSize: 11,
    marginTop: 2,
  },
});
