import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import DashboardScreen from '../screens/DashboardScreen';
import UploadScreen from '../screens/UploadScreen';
import RoadmapScreen from '../screens/RoadmapScreen';
import AIAssistantScreen from '../screens/AIAssistantScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { MainTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter',
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: string = 'home-outline';

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'Documents':
              iconName = focused ? 'document-text' : 'document-text-outline';
              break;
            case 'Roadmap':
              iconName = focused ? 'map' : 'map-outline';
              break;
            case 'AIAssistant':
              iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
              break;
            case 'Profile':
              iconName = focused ? 'people' : 'people-outline';
              break;
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Documents" component={UploadScreen} />
      <Tab.Screen name="Roadmap" component={RoadmapScreen} />
      <Tab.Screen name="AIAssistant" component={AIAssistantScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
