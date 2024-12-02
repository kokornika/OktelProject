import React, { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { Check, X } from 'lucide-react';
import { useStore } from '../store';
import { NotificationManager } from './NotificationManager';

export function ReminderList() {
  const reminders = useStore((state) => state.reminders);
  const completeReminder = useStore((state) => state.completeReminder);
  const deleteReminder = useStore((state) => state.deleteReminder);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Előre létrehozzuk az audio elemet
    audioRef.current = new Audio('data:audio/wav;base64,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');
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const checkReminders = () => {
      reminders.forEach((reminder) => {
        if (!reminder.completed && new Date(reminder.datetime) <= new Date()) {
          // Hang lejátszása
          if (audioRef.current) {
            audioRef.current.play().catch(() => {
              console.log('Hang lejátszása nem sikerült');
            });
          }
          
          // Értesítés megjelenítése
          if (Notification.permission === 'granted') {
            try {
              new Notification('Emlékeztető', {
                body: reminder.title,
                icon: '/favicon.ico',
                requireInteraction: true // Az értesítés nem tűnik el magától
              });
            } catch (error) {
              console.log('Értesítés megjelenítése nem sikerült');
            }
          }

          // Automatikus megjelölés elvégzettként
          completeReminder(reminder.id);
        }
      });
    };

    const interval = setInterval(checkReminders, 1000);
    return () => clearInterval(interval);
  }, [reminders, completeReminder]);

  return (
    <div className="space-y-4">
      <NotificationManager />
      {reminders.length === 0 ? (
        <p className="text-gray-500">Nincsenek emlékeztetők</p>
      ) : (
        <div className="space-y-2">
          {reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={`p-4 rounded-lg shadow-md ${
                reminder.completed ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`font-medium text-gray-900 ${
                    reminder.completed ? 'line-through' : ''
                  }`}>{reminder.title}</h3>
                  <p className={`text-sm text-gray-500 ${
                    reminder.completed ? 'line-through' : ''
                  }`}>{reminder.description}</p>
                  <p className={`text-sm text-indigo-600 mt-1 ${
                    reminder.completed ? 'line-through' : ''
                  }`}>
                    {format(new Date(reminder.datetime), 'yyyy. MMMM d. HH:mm', { locale: hu })}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!reminder.completed && (
                    <button
                      onClick={() => completeReminder(reminder.id)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                      title="Elvégezve"
                    >
                      <Check size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Törlés"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}