import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import Card from './Card';

type Props = {
  title: string;
  description?: string;
  deadline?: string;
  completed: boolean;
  priority?: 'critical' | 'urgent' | 'gentle';
  onToggle: () => void;
  onPressDetails?: () => void;
};

export default function TaskCard({ 
  title, 
  description, 
  deadline, 
  completed, 
  priority = 'gentle', 
  onToggle,
  onPressDetails 
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
    <Card style={[styles.card, completed && { opacity: 0.65 }]}>
      <View style={styles.container}>
        {/* Checkbox */}
        <Pressable onPress={onToggle} style={styles.checkboxContainer} hitSlop={12}>
          <View 
            style={[
              styles.checkbox, 
              { 
                borderColor: completed ? colors.primary : colors.secondaryText + '50',
                backgroundColor: completed ? colors.primary : 'transparent' 
              }
            ]}
          >
            {completed && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
          </View>
        </Pressable>

        {/* Task Details */}
        <Pressable 
          onPress={onPressDetails || onToggle} 
          style={styles.detailsContainer}
        >
          <Text 
            style={[
              styles.title, 
              { 
                color: colors.text,
                textDecorationLine: completed ? 'line-through' : 'none' 
              }
            ]}
          >
            {title}
          </Text>
          {description ? (
            <Text 
              style={[
                styles.description, 
                { 
                  color: colors.secondaryText,
                  textDecorationLine: completed ? 'line-through' : 'none'
                }
              ]} 
              numberOfLines={2}
            >
              {description}
            </Text>
          ) : null}
          {deadline && (
            <Text style={[styles.deadline, { color: getPriorityColor() }]}>
              {deadline}
            </Text>
          )}
        </Pressable>

        {/* Priority Indicator Dot / Arrow */}
        <View style={styles.rightAction}>
          {!completed && (
            <View style={[styles.priorityDot, { backgroundColor: getPriorityColor() }]} />
          )}
          {onPressDetails && (
            <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} style={styles.arrow} />
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 14,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontFamily: 'Inter',
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  deadline: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  rightAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  arrow: {
    marginLeft: 6,
  },
});
