import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Rect, G, Line, Circle } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';

const BAR_DATA = [
  { day: 'M', tasks: 4 },
  { day: 'T', tasks: 6 },
  { day: 'W', tasks: 3 },
  { day: 'T', tasks: 8 },
  { day: 'F', tasks: 5 },
  { day: 'S', tasks: 2 },
  { day: 'S', tasks: 1 },
];

export default function ProgressScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  // Find max task for scaling
  const maxTasks = Math.max(...BAR_DATA.map(d => d.tasks));
  const chartHeight = 120;
  const chartWidth = 260;

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.navRow}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.navTitle, { color: colors.text }]}>Analytics</Text>
      </View>

      <Header title="Progress Dashboard" subtitle="Visual overview of estate accomplishments" />

      {/* SVG Bar Chart Card */}
      <Card style={styles.chartCard}>
        <Text style={[styles.chartTitle, { color: colors.text }]}>Completed Tasks (Weekly)</Text>
        <Text style={[styles.chartSub, { color: colors.secondaryText }]}>Total this week: 29 tasks</Text>

        <View style={styles.chartContainer}>
          <Svg height={chartHeight} width={chartWidth}>
            {/* Grid helper lines */}
            <Line x1="0" y1="30" x2={chartWidth} y2="30" stroke={colors.border} strokeWidth="1" strokeDasharray="4" />
            <Line x1="0" y1="60" x2={chartWidth} y2="60" stroke={colors.border} strokeWidth="1" strokeDasharray="4" />
            <Line x1="0" y1="90" x2={chartWidth} y2="90" stroke={colors.border} strokeWidth="1" strokeDasharray="4" />

            <G>
              {BAR_DATA.map((item, index) => {
                const barWidth = 22;
                const gap = 14;
                const x = index * (barWidth + gap) + 12;
                const pct = item.tasks / maxTasks;
                const barHeight = Math.max(pct * 90, 8); // min height
                const y = chartHeight - barHeight - 15;

                return (
                  <G key={item.day}>
                    {/* Bar */}
                    <Rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      rx="4"
                      fill={colors.primary}
                    />
                    {/* Label */}
                    <Text
                      style={[
                        styles.barLabelText,
                        { 
                          position: 'absolute',
                          left: x + 4,
                          top: chartHeight - 12,
                          color: colors.secondaryText 
                        }
                      ]}
                    >
                      {item.day}
                    </Text>
                  </G>
                );
              })}
            </G>
          </Svg>
        </View>
      </Card>

      {/* Progress Breakdown Lists */}
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Milestones Completed</Text>

      <Card style={styles.statCell}>
        <View style={styles.statRow}>
          <View style={[styles.statIconBadge, { backgroundColor: colors.primary + '12' }]}>
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.statDetails}>
            <Text style={[styles.statText, { color: colors.text }]}>Certificates Uploaded</Text>
            <Text style={[styles.statSub, { color: colors.secondaryText }]}>All required vital documents verified</Text>
          </View>
          <View>
            <Text style={[styles.statValue, { color: colors.primary }]}>100%</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.statCell}>
        <View style={styles.statRow}>
          <View style={[styles.statIconBadge, { backgroundColor: colors.warning + '12' }]}>
            <Ionicons name="card-outline" size={20} color={colors.warning} />
          </View>
          <View style={styles.statDetails}>
            <Text style={[styles.statText, { color: colors.text }]}>Benefits Claims Filed</Text>
            <Text style={[styles.statSub, { color: colors.secondaryText }]}>3 identified claims active in filing</Text>
          </View>
          <View>
            <Text style={[styles.statValue, { color: colors.warning }]}>67%</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.statCell}>
        <View style={styles.statRow}>
          <View style={[styles.statIconBadge, { backgroundColor: colors.danger + '12' }]}>
            <Ionicons name="business-outline" size={20} color={colors.danger} />
          </View>
          <View style={styles.statDetails}>
            <Text style={[styles.statText, { color: colors.text }]}>Estate Accounts Settled</Text>
            <Text style={[styles.statSub, { color: colors.secondaryText }]}>4 bank & asset transfers pending</Text>
          </View>
          <View>
            <Text style={[styles.statValue, { color: colors.danger }]}>20%</Text>
          </View>
        </View>
      </Card>

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
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    marginBottom: 14,
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
  chartCard: {
    marginBottom: 24,
  },
  chartTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    fontWeight: '700',
  },
  chartSub: {
    fontFamily: 'Inter',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  barLabelText: {
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '700',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  statCell: {
    marginBottom: 10,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statDetails: {
    flex: 1,
  },
  statText: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '700',
  },
  statSub: {
    fontFamily: 'Inter',
    fontSize: 11,
    marginTop: 2,
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    fontWeight: '700',
  },
});
