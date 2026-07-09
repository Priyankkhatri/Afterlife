import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Header from '../components/ui/Header';
import { RootStackParamList } from '../types/navigation';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setAuthError, setAuthLoading, setAuthUser } from '../redux/authSlice';
import { signup } from '../services/authApi';
import { saveToken } from '../utils/storage';
import { useTheme } from '../hooks/useTheme';

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
};

export default function SignupScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { loading, error } = useAppSelector((state) => state.auth);
  const { control, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    defaultValues: { name: '', email: '', password: '' }
  });

  const handleSignup = async ({ name, email, password }: SignupFormValues) => {
    dispatch(setAuthLoading(true));
    dispatch(setAuthError(null));

    try {
      // Simulate API call for hackathon demo robustness
      await new Promise(resolve => setTimeout(resolve, 1000));
      const fakeToken = 'mock-access-token-12345';
      const fakeProfile = { email, name, id: '1' };
      
      await saveToken(fakeToken);
      dispatch(setAuthUser({ token: fakeToken, user: fakeProfile }));
      navigation.replace('MainTabs');
    } catch (err: any) {
      dispatch(setAuthError('Unable to create an account. Email might already be in use.'));
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  return (
    <ScrollView 
      style={{ backgroundColor: colors.background }} 
      contentContainerStyle={styles.container}
    >
      <View style={styles.headerArea}>
        <Header title="Create Account" subtitle="Join Afterlife and start organizing estate tasks" />
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="name"
          rules={{ required: 'Full Name is required' }}
          render={({ field: { onChange, value } }) => (
            <Input 
              value={value} 
              onChangeText={onChange} 
              label="Full Name"
              placeholder="e.g. Priyank Khatri" 
              icon="person-outline"
              error={errors.name?.message}
            />
          )}
        />

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
          rules={{ 
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
          }}
          render={({ field: { onChange, value } }) => (
            <Input 
              value={value} 
              onChangeText={onChange} 
              label="Password"
              placeholder="Min. 6 characters" 
              icon="lock-closed-outline"
              secureTextEntry 
              error={errors.password?.message}
            />
          )}
        />

        {error ? (
          <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>
        ) : null}

        <Button 
          title={loading ? 'Registering...' : 'Create Account'} 
          onPress={handleSubmit(handleSignup)} 
          loading={loading}
          style={styles.button}
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.secondaryText }]}>
          Already have an account?{' '}
          <Text 
            style={{ color: colors.primary, fontWeight: '700' }}
            onPress={() => navigation.navigate('Login')}
          >
            Log In
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
    paddingVertical: 60,
  },
  headerArea: {
    marginBottom: 16,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: 16,
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
