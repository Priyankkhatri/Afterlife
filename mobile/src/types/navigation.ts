export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  MainTabs: { screen?: keyof MainTabParamList } | undefined;
  AIAnalysis: { fileUri?: string; fileName?: string } | undefined;
  Notifications: undefined;
  Calendar: undefined;
  ProgressDashboard: undefined;
  Settings: undefined;
  LetterGenerator: undefined;
  BenefitsDetection: undefined;
};

export type MainTabParamList = {
  Dashboard: undefined;
  Documents: undefined;
  Roadmap: undefined;
  AIAssistant: undefined;
  Profile: undefined;
};
