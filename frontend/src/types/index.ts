export interface Variable {
  key: string;
  label: string;
  value: string;
}

export interface UrgentTask {
  id: string;
  title: string;
  description: string;
  time: string;
  documentName: string;
  variables: Variable[];
  defaultDraft: string;
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
  status: 'Analyzed' | 'Processing' | 'Verified';
}

export interface GroupItem {
  id: string;
  name: string;
  defaultOpen: boolean;
}

export interface GroupMap {
  immediate: GroupItem[];
  thisWeek: GroupItem[];
  whenReady: GroupItem[];
}
