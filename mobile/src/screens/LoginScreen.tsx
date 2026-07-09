import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Header from '../components/ui/Header';
import { RootStackParamList } from '../types/navigation';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setAuthError, setAuthLoading, setAuthUser } from '../redux/authSlice';
import { getProfile, login } from '../services/authApi';
import { clearToken, saveToken } from '../utils/storage';
import { useTheme } from '../hooks/useTheme';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' }
  });

  const handleLogin = async ({ email, password }: LoginFormValues) => {
    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));

    try {
      // Simulate API call for hackathon demo robustness
      await new Promise(resolve => setTimeout(resolve, 1000));
      const fakeToken = 'mock-access-token-12345';
      const fakeProfile = { email, name: 'Priyank Khatri', id: '1' };
      
      await saveToken(fakeToken);
      dispatch(setAuthUser({ token: fakeToken, user: fakeProfile }));
      navigation.replace('MainTabs');
    } catch (err: any) {
      dispatch(setAuthError('Unable to sign in. Please verify your credentials.'));
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerArea}>
        <Header title="Welcome Back" subtitle="Sign in to your transitional companion app" />
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          rules={{ 
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email address' }
          }}
          render={({ field: { onChange, value } }) => (
            <Input 
              value={value} 
              onChangeText={onChange} 
              label="Email Address"
              placeholder="e.g. priyank@example.com" 
              icon="mail-outline"
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, value } }) => (
            <Input 
              value={value} 
              onChangeText={onChange} 
              label="Password"
              placeholder="Enter your password" 
              icon="lock-closed-outline"
              secureTextEntry 
              error={errors.password?.message}
            />
          )}
        />

        {error ? (
          <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>
        ) : null}

        <Pressable 
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotContainer}
          hitSlop={8}
        >
          <Text style={[styles.forgotText, { color: colors.primary }]}>Forgot Password?</Text>
        </Pressable>

        <Button 
          title={loading ? 'Signing in...' : 'Log In'} 
          onPress={handleSubmit(handleLogin)} 
          loading={loading}
          style={styles.button}
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.secondaryText }]}>
          Don't have an account?{' '}
          <Text 
            style={{ color: colors.primary, fontWeight: '700' }}
            onPress={() => navigation.navigate('Signup')}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  headerArea: {
    marginBottom: 16,
  },
  form: {
    width: '100%',
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: 4,
  },
  forgotText: {
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '600',
  },
  button: {
    marginTop: 8,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter',
    fontSize: 13,
  },
  error: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
});
