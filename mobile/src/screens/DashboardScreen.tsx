import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../hooks/useTheme';
import { useAppSelector } from '../redux/hooks';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';
import ProgressCard from '../components/ui/ProgressCard';
import TaskCard from '../components/ui/TaskCard';
import BenefitCard from '../components/ui/BenefitCard';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../types/navigation';

export default function DashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList | any>>();
  const { colors, isDark } = useTheme();
  const user = useAppSelector((state) => state.auth.user);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Banner Row */}
      <View style={styles.headerRow}>
        <Header 
          title={`Hello, ${user?.full_name?.split(' ')[0] || 'Priyank'}`} 
          subtitle="There is no rush. Take things step-by-step." 
        />
        <Pressable 
          onPress={() => navigation.navigate('Notifications')}
          style={[styles.notificationBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          hitSlop={8}
        >
          <Ionicons name="notifications-outline" size={20} color={colors.text} />
          <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]} />
        </Pressable>
      </View>

      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        
        {/* Today's Progress Ring Card */}
        <ProgressCard progress={0.67} />

        {/* AI Assistant Chat Shortcut Banner */}
        <Pressable onPress={() => navigation.navigate('MainTabs', { screen: 'AIAssistant' })}>
          <Card style={[styles.aiCard, { backgroundColor: colors.primary + '12', borderColor: colors.primary + '20' }]}>
            <View style={styles.aiRow}>
              <View style={[styles.aiIcon, { backgroundColor: colors.primary }]}>
                <Ionicons name="sparkles" size={18} color="#FFFFFF" />
              </View>
              <View style={styles.aiTextContainer}>
                <Text style={[styles.aiTitle, { color: colors.text }]}>Ask Afterlife Copilot</Text>
                <Text style={[styles.aiSubtitle, { color: colors.secondaryText }]}>
                  "What claims do I file first?" or "Help draft an email"
                </Text>
              </View>
              <Ionicons name="arrow-forward" size={18} color={colors.primary} />
            </View>
          </Card>
        </Pressable>

        {/* Quick Bento Stats Section */}
        <View style={styles.bentoRow}>
          <Card style={styles.bentoCell}>
            <Text style={[styles.bentoLabel, { color: colors.secondaryText }]}>Active Tasks</Text>
            <Text style={[styles.bentoNumber, { color: colors.text }]}>5</Text>
            <Text style={[styles.bentoSubtext, { color: colors.secondaryText }]}>2 due this week</Text>
          </Card>
          <Card style={styles.bentoCell}>
            <Text style={[styles.bentoLabel, { color: colors.secondaryText }]}>Verified claims</Text>
            <Text style={[styles.bentoNumber, { color: colors.primary }]}>3</Text>
            <Text style={[styles.bentoSubtext, { color: colors.secondaryText }]}>$48,500 detected</Text>
          </Card>
        </View>

        {/* Quick Upload Panel */}
        <Pressable 
          onPress={() => navigation.navigate('MainTabs', { screen: 'Documents' })}
          style={styles.quickUpload}
        >
          <Card style={[styles.uploadCard, { borderStyle: 'dashed', borderWidth: 1.5, borderColor: colors.primary + '30' }]}>
            <View style={styles.uploadRow}>
              <Ionicons name="cloud-upload-outline" size={24} color={colors.primary} />
              <Text style={[styles.uploadText, { color: colors.text }]}>Tap to quickly upload new document</Text>
              <Ionicons name="add" size={20} color={colors.secondaryText} />
            </View>
          </Card>
        </Pressable>

        {/* Urgent Deadlines Timeline Section */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Deadlines</Text>
          <Pressable onPress={() => navigation.navigate('Calendar')}>
            <Text style={[styles.sectionLink, { color: colors.primary }]}>Calendar</Text>
          </Pressable>
        </View>

        <Card style={styles.sectionCard}>
          <View style={styles.deadlineRow}>
            <View style={[styles.deadlineLeft, { borderLeftColor: colors.danger }]}>
              <Text style={[styles.deadlineTitle, { color: colors.text }]}>Life Insurance Claim</Text>
              <Text style={[styles.deadlineSubtitle, { color: colors.secondaryText }]}>MetLife Policy #98221-A</Text>
            </View>
            <View style={styles.deadlineRight}>
              <Text style={[styles.daysLeft, { color: colors.danger }]}>In 2 days</Text>
            </View>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.deadlineRow}>
            <View style={[styles.deadlineLeft, { borderLeftColor: colors.warning }]}>
              <Text style={[styles.deadlineTitle, { color: colors.text }]}>Submit Bereavement Leave</Text>
              <Text style={[styles.deadlineSubtitle, { color: colors.secondaryText }]}> Sarah Chen (Manager)</Text>
            </View>
            <View style={styles.deadlineRight}>
              <Text style={[styles.daysLeft, { color: colors.warning }]}>In 5 days</Text>
            </View>
          </View>
        </Card>

        {/* Benefits Highlight */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Detected Benefits</Text>
          <Pressable onPress={() => navigation.navigate('BenefitsDetection')}>
            <Text style={[styles.sectionLink, { color: colors.primary }]}>View All</Text>
          </Pressable>
        </View>

        <BenefitCard 
          title="Life Insurance Claim"
          institution="MetLife Provider"
          amount="$35,000"
          status="unclaimed"
          onAction={() => navigation.navigate('LetterGenerator')}
        />

      </Animated.View>
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
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    position: 'relative',
    marginTop: 10,
  },
  unreadBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  aiCard: {
    padding: 16,
    marginBottom: 16,
  },
  aiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  aiIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTextContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  aiTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
  },
  aiSubtitle: {
    fontFamily: 'Inter',
    fontSize: 11,
    marginTop: 2,
  },
  bentoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  bentoCell: {
    flex: 1,
    padding: 16,
  },
  bentoLabel: {
    fontFamily: 'Inter',
    fontSize: 11,
    fontWeight: '600',
  },
  bentoNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 4,
  },
  bentoSubtext: {
    fontFamily: 'Inter',
    fontSize: 10,
    marginTop: 4,
  },
  quickUpload: {
    marginBottom: 20,
  },
  uploadCard: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  uploadText: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionLink: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionCard: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: 20,
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  deadlineLeft: {
    flex: 1,
    borderLeftWidth: 3,
    paddingLeft: 12,
  },
  deadlineTitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
  deadlineSubtitle: {
    fontFamily: 'Inter',
    fontSize: 11,
    marginTop: 2,
  },
  deadlineRight: {},
  daysLeft: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    height: 1,
  },
});
