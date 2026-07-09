export const lightColors = {
  primary: '#E29A76',
  secondary: '#F2AA86',
  background: '#F7F9FB',
  card: '#FFFFFF',
  accent: '#8CA596',
  text: '#1A1A1A',
  secondaryText: '#7A7A7A',
  danger: '#EF5350',
  warning: '#FFA726',
  border: '#E8ECEF',
};

export const darkColors = {
  primary: '#F2AA86',
  secondary: '#E29A76',
  background: '#121212',
  card: '#1E1E1E',
  accent: '#8CA596',
  text: '#F5F5F5',
  secondaryText: '#9E9E9E',
  danger: '#E57373',
  warning: '#FFB74D',
  border: '#2E2E2E',
};

export type ColorsType = typeof lightColors;
export type ColorKey = keyof ColorsType;
export type ColorSchemeName = 'light' | 'dark';
export type ThemeColors = typeof lightColors;
