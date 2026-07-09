import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import Card from './Card';

type Props = {
  onPress: () => void;
  title?: string;
  subtitle?: string;
  category?: string;
};

export default function UploadCard({ 
  onPress, 
  title = "Secure Document Upload", 
  subtitle = "Death Certificates, Insurance Policies, Wills, Bills",
  category
}: Props) {
  const { colors } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <Card style={[styles.dashedCard, { borderColor: colors.primary + '40', backgroundColor: colors.primary + '05' }]}>
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
            <Ionicons name="cloud-upload" size={26} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: colors.secondaryText }]}>{subtitle}</Text>
          {category && (
            <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          )}
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dashedCard: {
    borderStyle: 'dashed',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 26,
    marginBottom: 16,
  },
  content: {
    alignItems: 'center',
    textAlign: 'center',
  },
  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  categoryBadge: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
});
