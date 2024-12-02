import React from 'react';
import { ReminderForm } from './components/ReminderForm';
import { ReminderList } from './components/ReminderList';
import { QuickNotes } from './components/QuickNotes';
import { MaintenanceNotes } from './components/MaintenanceNotes';
import { BellRing, Mail, Zap, Map, User } from 'lucide-react';
import { useStore } from './store';
import type { Dispatcher } from './types';

function App() {
  const { currentDispatcher, setDispatcher } = useStore();
  const emailBody = `Szia Gábor!\n\nFeladatlap csatolva.\n\n${currentDispatcher}.`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BellRing className="text-indigo-600" size={24} />
              <h1 className="text-2xl font-bold text-gray-900">Emlékeztető & Jegyzetek</h1>
              <div className="flex items-center gap-2">
                <User className="text-gray-500" size={20} />
                <select
                  value={currentDispatcher}
                  onChange={(e) => setDispatcher(e.target.value as Dispatcher)}
                  className="block w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="Kornél">Kornél</option>
                  <option value="Kati">Kati</option>
                  <option value="Gyuri">Gyuri</option>
                  <option value="Írisz">Írisz</option>
                  <option value="Niki">Niki</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://outlook.office.com/mail/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail size={20} />
                <span>Outlook</span>
              </a>
              <a
                href="https://www.eon.hu/hu/lakossagi/aram/aramszunet-informaciok.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Zap size={20} />
                <span>Áramszünet</span>
              </a>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Map size={20} />
                <span>Térkép</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <BellRing className="text-indigo-600" size={20} />
              <h2 className="text-xl font-semibold text-gray-800">Emlékeztetők</h2>
            </div>
            <ReminderForm />
            <ReminderList />
          </section>

          <section className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <QuickNotes />
            </div>
            <div className="space-y-6">
              <MaintenanceNotes />
            </div>
            <div className="col-span-2 flex justify-end mt-4">
              <a
                href={`https://outlook.office.com/mail/deeplink/compose?to=vegh@oktel.hu&subject=${encodeURIComponent('Feladatlap')}&body=${encodeURIComponent(emailBody)}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Mail size={20} />
                <span>Végh G. Outlook</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;