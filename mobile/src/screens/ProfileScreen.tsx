import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';
import ProfileCard from '../components/ui/ProfileCard';
import Button from '../components/ui/Button';
import { useAppSelector } from '../redux/hooks';
import { useTheme } from '../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user } = useAppSelector((state) => state.auth);
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const handleAddMember = () => {
    Alert.alert('Invite Family Member', 'Enter their email to share access to this estate folder.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Send Invite', onPress: () => Alert.alert('Success', 'Invite sent successfully.') }
    ]);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerRow}>
        <Header title="Family Profile" subtitle="Manage estate representatives and family access" />
        <Pressable 
          onPress={() => navigation.navigate('Settings')}
          style={[styles.settingsBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          hitSlop={8}
        >
          <Ionicons name="settings-outline" size={20} color={colors.text} />
        </Pressable>
      </View>

      {/* Estate Executor Primary Card */}
      <Card style={styles.primaryCard}>
        <View style={styles.primaryHeader}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>PK</Text>
          </View>
          <View style={styles.primaryInfo}>
            <Text style={[styles.primaryName, { color: colors.text }]}>Priyank Khatri</Text>
            <Text style={[styles.primaryRole, { color: colors.secondaryText }]}>Primary Executor & Representative</Text>
          </View>
        </View>
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.estateDetails}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>Estate of</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>Ramesh Chandra Khatri</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>Status</Text>
            <Text style={[styles.detailValue, { color: colors.primary, fontWeight: '700' }]}>Probate Pending</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: colors.secondaryText }]}>Case Number</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>#PR-2026-982</Text>
          </View>
        </View>
      </Card>

      {/* Family Representatives list */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Family Members (2)</Text>
        <Pressable onPress={handleAddMember}>
          <Text style={[styles.sectionLink, { color: colors.primary }]}>+ Add Member</Text>
        </Pressable>
      </View>

      <ProfileCard 
        name="Rita Khatri" 
        relation="Spouse / Beneficiary"
        role="Nominee"
        phone="+1 (555) 0182"
        email="rita.khatri@example.com"
      />

      <ProfileCard 
        name="Amit Khatri" 
        relation="Brother / Co-Executor"
        role="Access Level: Edit"
        phone="+1 (555) 0199"
        email="amit.khatri@example.com"
      />

      {/* Primary Legal Nominee details */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Legal Address & Nominee Info</Text>
      <Card style={styles.addressCard}>
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={20} color={colors.secondaryText} style={styles.addressIcon} />
          <View>
            <Text style={[styles.addressLabel, { color: colors.secondaryText }]}>Primary Estate Address</Text>
            <Text style={[styles.addressText, { color: colors.text }]}>
              1042 Oakwood Circle, Suite B{'\n'}San Francisco, CA 94105
            </Text>
          </View>
        </View>
      </Card>

      <Button 
        title="Invite Estate Lawyer" 
        onPress={() => Alert.alert('Legal Access', 'Lawyer invitation form loaded.')}
        variant="outline"
        style={styles.lawyerBtn}
      />
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
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 40,
    marginBottom: 8,
  },
  settingsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: 10,
  },
  primaryCard: {
    marginBottom: 24,
  },
  primaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Poppins-Bold',
  },
  primaryInfo: {
    marginLeft: 14,
    flex: 1,
  },
  primaryName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '700',
  },
  primaryRole: {
    fontFamily: 'Inter',
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  estateDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontFamily: 'Inter',
    fontSize: 13,
  },
  detailValue: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionLink: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '600',
  },
  addressCard: {
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  addressLabel: {
    fontFamily: 'Inter',
    fontSize: 11,
  },
  addressText: {
    fontFamily: 'Inter',
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  lawyerBtn: {
    width: '100%',
    marginTop: 8,
  },
});
