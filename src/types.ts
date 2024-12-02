export interface Reminder {
  id: string;
  title: string;
  description: string;
  datetime: string;
  completed: boolean;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  completed: boolean;
}

export interface Maintenance {
  id: string;
  content: string;
  createdAt: string;
  completed: boolean;
}

export type Dispatcher = 'Kornél' | 'Kati' | 'Gyuri' | 'Írisz' | 'Niki';