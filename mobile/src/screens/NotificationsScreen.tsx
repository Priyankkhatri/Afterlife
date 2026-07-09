import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import Header from '../components/ui/Header';
import Card from '../components/ui/Card';

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
  type: 'critical' | 'alert' | 'general';
};

export default function NotificationsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: '1', title: 'MetLife Claim Deadline', body: 'Filing period for MetLife policy #98221-A ends in 2 days.', time: '2 hours ago', unread: true, type: 'critical' },
    { id: '2', title: 'New Document Extracted', body: 'Chase bank statement.pdf parsed successfully. 1 checking account identified.', time: 'Yesterday', unread: true, type: 'general' },
    { id: '3', title: 'Probate Court Task Due', body: 'Remember to locate original will documents before visiting clerk.', time: '2 days ago', unread: false, type: 'alert' },
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.navRow}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.navTitle, { color: colors.text }]}>Alerts</Text>
        {notifications.some(n => n.unread) && (
          <Pressable onPress={markAllRead} style={styles.readAllBtn}>
            <Text style={[styles.readAllText, { color: colors.primary }]}>Mark all read</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card style={[styles.card, item.unread && { borderLeftColor: colors.primary, borderLeftWidth: 4 }]}>
            <View style={styles.row}>
              <View style={styles.iconCol}>
                <View style={[
                  styles.iconBadge, 
                  { 
                    backgroundColor: item.type === 'critical' 
                      ? colors.danger + '12' 
                      : item.type === 'alert' 
                        ? colors.warning + '12' 
                        : colors.primary + '12' 
                  }
                ]}>
                  <Ionicons 
                    name={item.type === 'critical' ? 'alarm' : item.type === 'alert' ? 'alert' : 'checkmark-done'} 
                    size={16} 
                    color={item.type === 'critical' ? colors.danger : item.type === 'alert' ? colors.warning : colors.primary} 
                  />
                </View>
              </View>
              
              <View style={styles.bodyCol}>
                <Text style={[styles.title, { color: colors.text }, item.unread && { fontWeight: '700' }]}>
                  {item.title}
                </Text>
                <Text style={[styles.body, { color: colors.secondaryText }]}>{item.body}</Text>
                <Text style={[styles.time, { color: colors.secondaryText }]}>{item.time}</Text>
              </View>

              <Pressable onPress={() => deleteNotification(item.id)} style={styles.deleteBtn} hitSlop={8}>
                <Ionicons name="trash-outline" size={14} color={colors.secondaryText} />
              </Pressable>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="notifications-off-outline" size={48} color={colors.secondaryText} />
            <Text style={[styles.emptyText, { color: colors.secondaryText }]}>All caught up</Text>
          </View>
        }
      />
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
    flex: 1,
  },
  readAllBtn: {
    paddingVertical: 4,
  },
  readAllText: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  card: {
    marginBottom: 12,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconCol: {
    marginRight: 12,
  },
  iconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyCol: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
  body: {
    fontFamily: 'Inter',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  time: {
    fontFamily: 'Inter',
    fontSize: 10,
    marginTop: 6,
  },
  deleteBtn: {
    padding: 4,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontFamily: 'Inter',
    fontSize: 13,
    marginTop: 12,
  },
});
