import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import ProgressRing from '../dashboard/ProgressRing';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  progress: number; // 0..1
  title?: string;
  subtitle?: string;
};

export default function ProgressCard({ 
  progress, 
  title = "Overall Progress", 
  subtitle = "Administrative tasks complete." 
}: Props) {
  const { colors } = useTheme();

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>{subtitle}</Text>
          <Text style={[styles.percentage, { color: colors.primary }]}>
            {Math.round(progress * 100)}% Complete
          </Text>
        </View>
        <ProgressRing 
          size={78} 
          strokeWidth={8} 
          progress={progress} 
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  percentage: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
  },
});
