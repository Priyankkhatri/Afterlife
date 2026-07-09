import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import MainTabs from './MainTabs';
import AIAnalysisScreen from '../screens/AIAnalysisScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LetterGeneratorScreen from '../screens/LetterGeneratorScreen';
import BenefitsScreen from '../screens/BenefitsScreen';
import { RootStackParamList } from '../types/navigation';
import { ThemeProvider } from '../hooks/useTheme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="AIAnalysis" component={AIAnalysisScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="ProgressDashboard" component={ProgressScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="LetterGenerator" component={LetterGeneratorScreen} />
          <Stack.Screen name="BenefitsDetection" component={BenefitsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
