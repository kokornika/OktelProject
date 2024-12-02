import React, { useEffect, useState } from 'react';
import { Bell, BellOff } from 'lucide-react';

export function NotificationManager() {
  const [permission, setPermission] = useState(Notification.permission);

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  return (
    <div className="mb-4">
      {permission !== 'granted' && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {permission === 'denied' ? (
                <BellOff className="text-yellow-400" size={24} />
              ) : (
                <Bell className="text-yellow-400" size={24} />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {permission === 'denied' ? (
                  <>
                    Az értesítések le vannak tiltva. Kérjük, engedélyezze őket a böngésző beállításaiban
                    az emlékeztetők megfelelő működéséhez.
                  </>
                ) : (
                  <>
                    Az emlékeztetők működéséhez engedélyezni kell az értesítéseket.
                    <button
                      onClick={requestPermission}
                      className="ml-2 text-yellow-700 underline hover:text-yellow-600"
                    >
                      Értesítések engedélyezése
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}