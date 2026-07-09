import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAppDispatch } from '../redux/hooks';
import { clearAuthUser, setAuthUser } from '../redux/authSlice';
import { getToken } from '../utils/storage';
import { useTheme } from '../hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';

export default function SplashScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const scaleAnim = React.useRef(new Animated.Value(0.85)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 1200,
            useNativeDriver: true,
          })
        ])
      )
    ]).start();

    const restoreSession = async () => {
      const token = await getToken();
      if (!token) {
        navigation.replace('Welcome');
        return;
      }

      try {
        // Simulate profile check for demo robustness
        const fakeProfile = { email: 'priyank@example.com', name: 'Priyank Khatri', id: '1' };
        dispatch(setAuthUser({ token, user: fakeProfile }));
        navigation.replace('MainTabs');
      } catch {
        dispatch(clearAuthUser());
        navigation.replace('Welcome');
      }
    };

    const timer = setTimeout(() => {
      restoreSession();
    }, 2200);

    return () => clearTimeout(timer);
  }, [dispatch, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim, alignItems: 'center' }}>
        <View style={[styles.logoContainer, { backgroundColor: colors.primary + '15' }]}>
          <Ionicons name="heart-half" size={60} color={colors.primary} />
        </View>
        <Text style={[styles.title, { color: colors.primary }]}>Afterlife</Text>
      </Animated.View>
      <Text style={[styles.tagline, { color: colors.secondaryText }]}>
        Helping Families Heal While AI Handles Paperwork
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
  },
  tagline: {
    position: 'absolute',
    bottom: 60,
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
    paddingHorizontal: 24,
  },
});
