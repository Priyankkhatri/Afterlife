import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/ui/Header';
import BenefitCard from '../components/ui/BenefitCard';
import Card from '../components/ui/Card';
import { RootStackParamList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';

type Benefit = {
  id: string;
  title: string;
  institution: string;
  amount: string;
  status: 'unclaimed' | 'processing' | 'claimed';
};

export default function BenefitsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const [benefits, setBenefits] = useState<Benefit[]>([
    { id: '1', title: 'MetLife Term Life Insurance', institution: 'MetLife Policy #98221-A', amount: '$35,000', status: 'unclaimed' },
    { id: '2', title: 'SSA Survivor Death Benefit', institution: 'Social Security Administration', amount: '$255', status: 'unclaimed' },
    { id: '3', title: 'Fidelity 401(k) Asset Transfer', institution: 'Fidelity Investments', amount: '$12,400', status: 'processing' },
    { id: '4', title: 'Comcast Account Security Liquidate', institution: 'Comcast Billing Dept', amount: '$85', status: 'claimed' },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  const handleClaimAction = (benefitId: string) => {
    navigation.navigate('LetterGenerator');
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
      }
    >
      <View style={styles.header}>
        <Header 
          title="Detected Benefits" 
          subtitle="Claims identified by AI parsing of uploaded policies" 
        />
      </View>

      {/* Summary Stat Box */}
      <Card style={[styles.statsCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '20' }]}>
        <View style={styles.statsRow}>
          <Ionicons name="sparkles" size={24} color={colors.primary} />
          <View style={styles.statsInfo}>
            <Text style={[styles.statsTitle, { color: colors.text }]}>$47,655 Detected Total</Text>
            <Text style={[styles.statsSubtitle, { color: colors.secondaryText }]}>
              File letter notifications to start claiming these assets.
            </Text>
          </View>
        </View>
      </Card>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Active Claims</Text>

      {benefits.map((benefit) => (
        <BenefitCard
          key={benefit.id}
          title={benefit.title}
          institution={benefit.institution}
          amount={benefit.amount}
          status={benefit.status}
          onAction={() => handleClaimAction(benefit.id)}
        />
      ))}
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
    paddingTop: 50,
  },
  header: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 10,
  },
  statsCard: {
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statsInfo: {
    flex: 1,
  },
  statsTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    fontWeight: '700',
  },
  statsSubtitle: {
    fontFamily: 'Inter',
    fontSize: 12,
    marginTop: 2,
  },
});
