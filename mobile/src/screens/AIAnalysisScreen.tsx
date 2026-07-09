import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, Pressable } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Header from '../components/ui/Header';
import { RootStackParamList } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RouteProps = RouteProp<RootStackParamList, 'AIAnalysis'>;

export default function AIAnalysisScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  
  const [scanning, setScanning] = useState(true);
  const scanLineAnim = React.useRef(new Animated.Value(0)).current;

  const fileName = route.params?.fileName || 'death_certificate_certified.pdf';

  useEffect(() => {
    if (scanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      const timer = setTimeout(() => {
        setScanning(false);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [scanning]);

  const translateY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 150],
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Back Nav row */}
      <View style={styles.navRow}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.navTitle, { color: colors.text }]}>AI Scan Report</Text>
      </View>

      {scanning ? (
        <View style={styles.scanContainer}>
          <View style={[styles.mockDoc, { borderColor: colors.primary + '50', backgroundColor: colors.card }]}>
            <Ionicons name="document-text" size={60} color={colors.primary} />
            <Text style={[styles.scanText, { color: colors.text }]} numberOfLines={1}>
              {fileName}
            </Text>
            <Animated.View style={[styles.scanLine, { backgroundColor: colors.primary, transform: [{ translateY }] }]} />
          </View>
          <Text style={[styles.scanningStatus, { color: colors.secondaryText }]}>
            AI Copilot is indexing and analyzing claims...
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Header title="Extraction Complete" subtitle="Key assets and deadlines extracted securely" />

          {/* Priority Score Summary Card */}
          <Card style={styles.summaryCard}>
            <View style={styles.scoreRow}>
              <View>
                <Text style={[styles.summaryLabel, { color: colors.secondaryText }]}>Priority Actions Score</Text>
                <Text style={[styles.scoreValue, { color: colors.primary }]}>High Priority</Text>
              </View>
              <View style={[styles.scoreBadge, { backgroundColor: colors.danger + '15' }]}>
                <Text style={[styles.scoreBadgeText, { color: colors.danger }]}>9.2 / 10</Text>
              </View>
            </View>
            <Text style={[styles.summaryDesc, { color: colors.secondaryText }]}>
              This document contains critical legal deadlines. Specifically, MetLife claims must be notified within the next 2 days to prevent coverage holds.
            </Text>
          </Card>

          {/* Extracted timeline */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Extracted Deadlines</Text>
          <Card style={styles.timelineCard}>
            <View style={styles.timelineItem}>
              <View style={[styles.dot, { backgroundColor: colors.danger }]} />
              <View style={styles.timelineDetails}>
                <Text style={[styles.itemTitle, { color: colors.text }]}>Life Insurance Claim Deadline</Text>
                <Text style={[styles.itemSub, { color: colors.secondaryText }]}>Required within 30 days of passing (Due in 2 days)</Text>
              </View>
            </View>
            <View style={[styles.timelineConnector, { backgroundColor: colors.border }]} />
            <View style={styles.timelineItem}>
              <View style={[styles.dot, { backgroundColor: colors.warning }]} />
              <View style={styles.timelineDetails}>
                <Text style={[styles.itemTitle, { color: colors.text }]}>Notify Social Security (SSA)</Text>
                <Text style={[styles.itemSub, { color: colors.secondaryText }]}>Report passing to halt benefit overdrafts (Due in 7 days)</Text>
              </View>
            </View>
          </Card>

          {/* Detected Organizations */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Detected Agencies</Text>
          <Card style={styles.agenciesCard}>
            <View style={styles.agencyRow}>
              <Ionicons name="business" size={18} color={colors.primary} />
              <View style={styles.agencyInfo}>
                <Text style={[styles.agencyName, { color: colors.text }]}>MetLife Insurance Corp</Text>
                <Text style={[styles.agencyType, { color: colors.secondaryText }]}>Financial / Claim Provider</Text>
              </View>
            </View>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <View style={styles.agencyRow}>
              <Ionicons name="shield-checkmark" size={18} color={colors.primary} />
              <View style={styles.agencyInfo}>
                <Text style={[styles.agencyName, { color: colors.text }]}>Social Security Admin</Text>
                <Text style={[styles.agencyType, { color: colors.secondaryText }]}>Government Entity</Text>
              </View>
            </View>
          </Card>

          {/* Action trigger */}
          <Button 
            title="Generate Notification Letter" 
            onPress={() => navigation.navigate('LetterGenerator')} 
            variant="primary"
            style={styles.actionBtn}
          />
          <Button 
            title="Back to Documents" 
            onPress={() => navigation.navigate('MainTabs', { screen: 'Documents' })} 
            variant="outline"
            style={[styles.actionBtn, { marginTop: 10 }]}
          />

        </ScrollView>
      )}
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
    marginRight: 12,
  },
  navTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '700',
  },
  scanContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  mockDoc: {
    width: 180,
    height: 240,
    borderRadius: 20,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  scanText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 14,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 4,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  scanningStatus: {
    fontFamily: 'Inter',
    fontSize: 14,
    marginTop: 24,
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  summaryCard: {
    marginBottom: 20,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter',
    fontSize: 11,
  },
  scoreValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    fontWeight: '700',
  },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  scoreBadgeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    fontWeight: '800',
  },
  summaryDesc: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 18,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 8,
  },
  timelineCard: {
    marginBottom: 20,
    paddingVertical: 18,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 12,
  },
  timelineDetails: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '700',
  },
  itemSub: {
    fontFamily: 'Inter',
    fontSize: 11,
    marginTop: 2,
    lineHeight: 15,
  },
  timelineConnector: {
    width: 2,
    height: 24,
    marginLeft: 4,
    marginVertical: 4,
  },
  agenciesCard: {
    marginBottom: 26,
  },
  agencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  agencyInfo: {
    marginLeft: 12,
  },
  agencyName: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '600',
  },
  agencyType: {
    fontFamily: 'Inter',
    fontSize: 11,
  },
  divider: {
    height: 1,
  },
  actionBtn: {
    width: '100%',
  },
});
