import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import Card from './Card';

type Props = {
  name: string;
  relation: string;
  role: string;
  phone?: string;
  email?: string;
};

export default function ProfileCard({ name, relation, role, phone, email }: Props) {
  const { colors } = useTheme();

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primary + '15' }]}>
          <Text style={[styles.avatarText, { color: colors.primary }]}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
          <Text style={[styles.relation, { color: colors.secondaryText }]}>
            {relation} • {role}
          </Text>
        </View>
      </View>

      {(phone || email) && (
        <View style={[styles.contacts, { borderTopColor: colors.border }]}>
          {phone && (
            <View style={styles.contactRow}>
              <Ionicons name="call-outline" size={14} color={colors.secondaryText} style={styles.icon} />
              <Text style={[styles.contactText, { color: colors.text }]}>{phone}</Text>
            </View>
          )}
          {email && (
            <View style={styles.contactRow}>
              <Ionicons name="mail-outline" size={14} color={colors.secondaryText} style={styles.icon} />
              <Text style={[styles.contactText, { color: colors.text }]}>{email}</Text>
            </View>
          )}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
  },
  relation: {
    fontFamily: 'Inter',
    fontSize: 12,
    marginTop: 2,
  },
  contacts: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 8,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  contactText: {
    fontFamily: 'Inter',
    fontSize: 12,
  },
});
