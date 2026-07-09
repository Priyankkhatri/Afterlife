import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ children, style }: Props) {
  const { colors, isDark } = useTheme();

  return (
    <View 
      style={[
        styles.card, 
        { 
          backgroundColor: colors.card,
          borderColor: colors.border,
          shadowColor: isDark ? '#000000' : '#000000',
          shadowOpacity: isDark ? 0.25 : 0.04,
        }, 
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20, // 20px Radius requested
    padding: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 3,
  },
});
