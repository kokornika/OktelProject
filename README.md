## Reminder & Notes App

### Telepítési útmutató

1. Hozz létre egy új mappát a projektnek:
```bash
mkdir reminder-notes-app
cd reminder-notes-app
```

2. Inicializáld a projektet:
```bash
npm create vite@latest . -- --template react-ts
```

3. Telepítsd a függőségeket:
```bash
npm install date-fns zustand lucide-react
```

4. Másold be a következő fájlokat a megfelelő helyekre:

```
src/
  ├── components/
  │   ├── NotificationManager.tsx
  │   ├── QuickNotes.tsx
  │   ├── ReminderForm.tsx
  │   └── ReminderList.tsx
  ├── App.tsx
  ├── index.css
  ├── main.tsx
  ├── store.ts
  ├── types.ts
  └── vite-env.d.ts
```

5. Indítsd el a fejlesztői szervert:
```bash
npm run dev
```

### Funkciók

- ⏰ Emlékeztetők létrehozása dátummal és időponttal
- 🔔 Böngésző értesítések és hangjelzés
- 📝 Gyorsjegyzetek készítése és kezelése
- 💾 Automatikus mentés a böngészőben
- 🎨 Modern, reszponzív felület