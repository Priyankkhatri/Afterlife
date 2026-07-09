import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false, 
  loading = false,
  style,
  textStyle
}: Props) {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return [styles.primary, { backgroundColor: colors.primary }];
      case 'secondary':
        return [styles.secondary, { backgroundColor: colors.secondary + '15', borderColor: colors.secondary + '25' }];
      case 'outline':
        return [styles.outline, { borderColor: colors.border, backgroundColor: colors.card }];
      case 'danger':
        return [styles.danger, { backgroundColor: colors.danger }];
      default:
        return [styles.primary, { backgroundColor: colors.primary }];
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
      case 'danger':
        return '#FFFFFF';
      case 'secondary':
        return colors.primary;
      case 'outline':
        return colors.text;
      default:
        return '#FFFFFF';
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        ...getButtonStyle(),
        disabled && styles.disabled,
        pressed && styles.pressed,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20, // 20px radius
    paddingVertical: 15,
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    borderWidth: 1,
    borderColor: 'transparent',
    flexDirection: 'row',
  },
  primary: {
    // Primary green gradient simulation
  },
  secondary: {
    borderWidth: 1,
  },
  outline: {
    borderWidth: 1,
  },
  danger: {},
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  text: {
    fontWeight: '600',
    fontSize: 15,
    fontFamily: 'Inter',
  },
});
