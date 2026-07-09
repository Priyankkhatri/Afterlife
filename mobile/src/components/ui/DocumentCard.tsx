import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import Card from './Card';

type Props = {
  name: string;
  size: string;
  date: string;
  status: 'Processing' | 'Analyzed' | 'Verified';
  onPress?: () => void;
};

export default function DocumentCard({ name, size, date, status, onPress }: Props) {
  const { colors } = useTheme();

  const getStatusColor = () => {
    switch (status) {
      case 'Verified':
      case 'Analyzed':
        return colors.primary;
      case 'Processing':
        return colors.warning;
      default:
        return colors.secondaryText;
    }
  };

  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card}>
        <View style={styles.container}>
          <View style={[styles.iconContainer, { backgroundColor: colors.border }]}>
            <Ionicons name="document-text-outline" size={24} color={colors.primary} />
          </View>
          <View style={styles.details}>
            <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
              {name}
            </Text>
            <Text style={[styles.meta, { color: colors.secondaryText }]}>
              {size} • {date}
            </Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={[styles.badge, { backgroundColor: getStatusColor() + '15' }]}>
              <Text style={[styles.badgeText, { color: getStatusColor() }]}>{status}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} style={styles.chevron} />
          </View>
        </View>
      </Card>
    </Pressable>
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
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
  meta: {
    fontFamily: 'Inter',
    fontSize: 11,
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '700',
  },
  chevron: {
    marginLeft: 6,
  },
});
