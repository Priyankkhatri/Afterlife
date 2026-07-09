import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text, Pressable, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';

interface InputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  label?: string;
  error?: string;
  icon?: string;
}

export default function Input({ 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry = false,
  label,
  error,
  icon,
  ...props
}: InputProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}
      
      <View 
        style={[
          styles.inputWrapper, 
          { 
            borderColor: error ? colors.danger : isFocused ? colors.primary : colors.border,
            backgroundColor: colors.card 
          }
        ]}
      >
        {icon && (
          <Ionicons 
            name={icon as any} 
            size={18} 
            color={error ? colors.danger : isFocused ? colors.primary : colors.secondaryText} 
            style={styles.icon} 
          />
        )}
        
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          placeholderTextColor={colors.secondaryText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {secureTextEntry && (
          <Pressable 
            onPress={() => setIsPasswordVisible(!isPasswordVisible)} 
            style={styles.passwordToggle}
            hitSlop={8}
          >
            <Ionicons 
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
              size={18} 
              color={colors.secondaryText} 
            />
          </Pressable>
        )}
      </View>

      {error ? (
        <Text style={[styles.errorText, { color: colors.danger }]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 14,
    height: 50,
    paddingHorizontal: 14,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter',
    fontSize: 14,
    height: '100%',
  },
  passwordToggle: {
    marginLeft: 8,
  },
  errorText: {
    fontFamily: 'Inter',
    fontSize: 11,
    marginTop: 4,
    marginLeft: 4,
  },
});
