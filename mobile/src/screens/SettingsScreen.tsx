import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { useAppDispatch } from '../redux/hooks';
import { clearAuthUser } from '../redux/authSlice';
import { clearToken } from '../utils/storage';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { RootStackParamList } from '../types/navigation';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const [notifsEnabled, setNotifsEnabled] = useState(true);

  const handleLogout = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out from Afterlife?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Sign Out', 
        style: 'destructive',
        onPress: async () => {
          await clearToken();
          dispatch(clearAuthUser());
          navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          });
        } 
      }
    ]);
  };

  const handleExport = () => {
    Alert.alert('Export Data', 'All uploaded estate documents and roadmaps will be compiled into an encrypted ZIP file and sent to your email.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Confirm Export', onPress: () => Alert.alert('Export Triggered', 'Processing ZIP compilation. Check your inbox in a few minutes.') }
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.navRow}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.navTitle, { color: colors.text }]}>Settings</Text>
      </View>

      <View style={styles.content}>
        <Header title="Settings" subtitle="Manage your preferences and security details" />

        <Card style={styles.card}>
          {/* Dark Mode Switch item */}
          <View style={styles.settingItem}>
            <View style={styles.left}>
              <Ionicons name="moon-outline" size={20} color={colors.primary} style={styles.icon} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={isDark ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          {/* Notifications Switch item */}
          <View style={styles.settingItem}>
            <View style={styles.left}>
              <Ionicons name="notifications-outline" size={20} color={colors.primary} style={styles.icon} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>Reminders & Alerts</Text>
            </View>
            <Switch
              value={notifsEnabled}
              onValueChange={setNotifsEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={notifsEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </Card>

        {/* Legal and Data Control */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Data & Security</Text>
        <Card style={styles.card}>
          <Pressable onPress={handleExport} style={styles.pressableItem}>
            <View style={styles.settingItem}>
              <View style={styles.left}>
                <Ionicons name="download-outline" size={20} color={colors.text} style={styles.icon} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>Export All Estate Data</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} />
            </View>
          </Pressable>

          <View style={[styles.divider, { backgroundColor: colors.border }]} />

          <Pressable onPress={() => navigation.navigate('ProgressDashboard')} style={styles.pressableItem}>
            <View style={styles.settingItem}>
              <View style={styles.left}>
                <Ionicons name="bar-chart-outline" size={20} color={colors.text} style={styles.icon} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>Analytics & Statistics</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} />
            </View>
          </Pressable>
        </Card>

        {/* Logout CTA button */}
        <Button 
          title="Sign Out" 
          onPress={handleLogout} 
          variant="danger" 
          style={styles.logoutBtn} 
        />

        <Text style={[styles.disclaimerText, { color: colors.secondaryText }]}>
          Afterlife is an AI copilot. All documentation draft generation and analysis should be cross-verified with qualified legal counsel. Version 1.0.0 (Hackathon Build)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 14,
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    marginBottom: 24,
    paddingVertical: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  pressableItem: {
    width: '100%',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  settingLabel: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    marginHorizontal: 8,
  },
  logoutBtn: {
    width: '100%',
    marginTop: 10,
  },
  disclaimerText: {
    fontFamily: 'Inter',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 15,
    paddingHorizontal: 16,
  },
});
