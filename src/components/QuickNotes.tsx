import React, { useState } from 'react';
import { format } from 'date-fns';
import { hu } from 'date-fns/locale';
import { Pencil, Save, X, Trash2 } from 'lucide-react';
import { useStore } from '../store';

export function QuickNotes() {
  const [newNote, setNewNote] = useState('');
  const { notes, addNote, completeNote, deleteNote, deleteCompletedNotes } = useStore();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    addNote(newNote);
    setNewNote('');
  };

  const hasCompletedNotes = notes.some(note => note.completed);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Pencil className="text-indigo-600" size={20} />
          <h2 className="text-xl font-semibold text-gray-800">Gyorsjegyzetek</h2>
        </div>
        {hasCompletedNotes && (
          <button
            onClick={deleteCompletedNotes}
            className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Kihúzottak törlése"
          >
            <Trash2 size={16} />
            Kihúzottak törlése
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Írj egy új jegyzetet..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={3}
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Save size={20} />
          Mentés
        </button>
      </form>
      <div className="space-y-2">
        {notes.map((note) => (
          <div 
            key={note.id} 
            className={`bg-white p-4 rounded-lg shadow-md transition-colors ${
              note.completed ? 'bg-red-50' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className={`whitespace-pre-wrap ${
                  note.completed ? 'line-through text-red-600' : ''
                }`}>{note.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {format(new Date(note.createdAt), 'yyyy. MMMM d. HH:mm', { locale: hu })}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => completeNote(note.id)}
                  className={`p-1 hover:bg-gray-100 rounded ${
                    note.completed ? 'text-red-600' : 'text-gray-600'
                  }`}
                  title={note.completed ? 'Visszaállítás' : 'Kihúzás'}
                >
                  <X size={20} />
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  title="Végleges törlés"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}