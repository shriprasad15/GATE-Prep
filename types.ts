export interface Task {
  id: string;
  title: string;
  category: 'core' | 'drill' | 'mock';
  completed: boolean;
}

export interface ResourceItem {
  name: string;
  description: string;
  url?: string;
  tags: string[];
  type: 'paid' | 'open-source';
}

export interface StudyPhase {
  name: string;
  tasks: Task[];
}

export type ViewState = 'dashboard' | 'workflow' | 'resources' | 'coach' | 'schedule';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface DaySchedule {
  date: string; // e.g., "Jan 05"
  day: string; // e.g., "Sun"
  phase: string;
  topic: string;
  session1: { title: string; desc: string }; // 09:00 - 12:00
  session2: { title: string; desc: string }; // 13:30 - 16:30
  session3: { title: string; desc: string }; // 17:00 - 20:00
  resource: { name: string; link: string };
  isRest?: boolean;
}