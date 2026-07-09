import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../hooks/useTheme';
import Button from '../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();

  const slideAnim = React.useRef(new Animated.Value(height * 0.3)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 30,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Graphic Logo Block */}
      <Animated.View style={[styles.graphicContainer, { opacity: fadeAnim }]}>
        <View style={[styles.emblem, { backgroundColor: colors.primary + '15' }]}>
          <Ionicons name="heart-half-outline" size={68} color={colors.primary} />
        </View>
        <Text style={[styles.tagline, { color: colors.primary }]}>Afterlife</Text>
      </Animated.View>

      {/* Welcome Message Card */}
      <Animated.View 
        style={[
          styles.card, 
          { 
            backgroundColor: colors.card,
            borderColor: colors.border,
            transform: [{ translateY: slideAnim }] 
          }
        ]}
      >
        <Text style={[styles.headline, { color: colors.text }]}>
          Everything after loss, organized.
        </Text>
        <Text style={[styles.description, { color: colors.secondaryText }]}>
          We help you coordinate estate accounts, compile necessary paperwork, and claims, so you can focus on healing.
        </Text>

        <View style={styles.buttonGroup}>
          <Button 
            title="Log In" 
            onPress={() => navigation.navigate('Login')} 
            variant="primary"
            style={styles.button}
          />
          <Button 
            title="Create Account" 
            onPress={() => navigation.navigate('Signup')} 
            variant="outline"
            style={[styles.button, { marginTop: 12 }]}
          />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  graphicContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emblem: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  tagline: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  card: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: 30,
    paddingBottom: 48,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.03,
    shadowRadius: 16,
    elevation: 10,
  },
  headline: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Inter',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  buttonGroup: {
    width: '100%',
  },
  button: {
    width: '100%',
  },
});
