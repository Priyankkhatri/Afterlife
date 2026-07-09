export interface UserProfile {
  id: string;
  full_name?: string | null;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  completed: boolean;
  group: string;
}

export interface Document {
  id: string;
  name: string;
  size: string;
  date: string;
  status: 'Processing' | 'Analyzed' | 'Verified';
}
