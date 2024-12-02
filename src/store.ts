import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Reminder, Note, Maintenance, Dispatcher } from './types';

interface AppState {
  reminders: Reminder[];
  notes: Note[];
  maintenances: Maintenance[];
  currentDispatcher: Dispatcher;
  setDispatcher: (dispatcher: Dispatcher) => void;
  addReminder: (reminder: Omit<Reminder, 'id' | 'completed'>) => void;
  completeReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
  addNote: (content: string) => void;
  completeNote: (id: string) => void;
  deleteNote: (id: string) => void;
  deleteCompletedNotes: () => void;
  addMaintenance: (content: string) => void;
  completeMaintenance: (id: string) => void;
  deleteMaintenance: (id: string) => void;
  deleteCompletedMaintenances: () => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      reminders: [],
      notes: [],
      maintenances: [],
      currentDispatcher: 'Kornél',
      setDispatcher: (dispatcher) => set({ currentDispatcher: dispatcher }),
      addReminder: (reminder) =>
        set((state) => ({
          reminders: [
            ...state.reminders,
            { ...reminder, id: crypto.randomUUID(), completed: false },
          ],
        })),
      completeReminder: (id) =>
        set((state) => ({
          reminders: state.reminders.map((reminder) =>
            reminder.id === id ? { ...reminder, completed: true } : reminder
          ),
        })),
      deleteReminder: (id) =>
        set((state) => ({
          reminders: state.reminders.filter((reminder) => reminder.id !== id),
        })),
      addNote: (content) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              id: crypto.randomUUID(),
              content,
              createdAt: new Date().toISOString(),
              completed: false,
            },
          ],
        })),
      completeNote: (id) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, completed: !note.completed } : note
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
      deleteCompletedNotes: () =>
        set((state) => ({
          notes: state.notes.filter((note) => !note.completed),
        })),
      addMaintenance: (content) =>
        set((state) => ({
          maintenances: [
            ...state.maintenances,
            {
              id: crypto.randomUUID(),
              content,
              createdAt: new Date().toISOString(),
              completed: false,
            },
          ],
        })),
      completeMaintenance: (id) =>
        set((state) => ({
          maintenances: state.maintenances.map((maintenance) =>
            maintenance.id === id ? { ...maintenance, completed: !maintenance.completed } : maintenance
          ),
        })),
      deleteMaintenance: (id) =>
        set((state) => ({
          maintenances: state.maintenances.filter((maintenance) => maintenance.id !== id),
        })),
      deleteCompletedMaintenances: () =>
        set((state) => ({
          maintenances: state.maintenances.filter((maintenance) => !maintenance.completed),
        })),
    }),
    {
      name: 'reminder-notes-storage',
    }
  )
);