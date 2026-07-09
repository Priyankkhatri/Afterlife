import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import Card from './Card';
import Button from './Button';

type Props = {
  title: string;
  institution: string;
  amount: string;
  status: 'unclaimed' | 'processing' | 'claimed';
  onAction?: () => void;
  actionTitle?: string;
};

export default function BenefitCard({ 
  title, 
  institution, 
  amount, 
  status, 
  onAction,
  actionTitle = 'File Claim'
}: Props) {
  const { colors } = useTheme();

  const getStatusConfig = () => {
    switch (status) {
      case 'unclaimed':
        return { text: 'Unclaimed', bg: '#FFF4E5', color: '#FFA726', icon: 'alert-circle' };
      case 'processing':
        return { text: 'Processing', bg: '#E3F2FD', color: '#1E88E5', icon: 'time-outline' };
      case 'claimed':
        return { text: 'Claimed', bg: '#E8F5E9', color: '#4CAF50', icon: 'checkmark-circle' };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.institution, { color: colors.secondaryText }]}>{institution}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: statusConfig.bg }]}>
          <Ionicons name={statusConfig.icon as any} size={12} color={statusConfig.color} style={styles.badgeIcon} />
          <Text style={[styles.badgeText, { color: statusConfig.color }]}>{statusConfig.text}</Text>
        </View>
      </View>

      <View style={[styles.separator, { backgroundColor: colors.border }]} />

      <View style={styles.footer}>
        <View>
          <Text style={[styles.amountLabel, { color: colors.secondaryText }]}>Estimated Amount</Text>
          <Text style={[styles.amount, { color: colors.primary }]}>{amount}</Text>
        </View>
        {status === 'unclaimed' && onAction && (
          <Button 
            title={actionTitle} 
            onPress={onAction} 
            variant="secondary"
            style={styles.claimButton}
            textStyle={styles.claimButtonText}
          />
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerText: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: '700',
  },
  institution: {
    fontFamily: 'Inter',
    fontSize: 13,
    marginTop: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    marginVertical: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabel: {
    fontFamily: 'Inter',
    fontSize: 11,
  },
  amount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
  },
  claimButton: {
    minHeight: 36,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  claimButtonText: {
    fontSize: 13,
  },
});
