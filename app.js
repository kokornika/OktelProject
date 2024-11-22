// Állapot kezelése
const state = {
    reminders: JSON.parse(localStorage.getItem('reminders')) || [],
    notes: JSON.parse(localStorage.getItem('notes')) || []
};

// Értesítések kezelése
function requestNotificationPermission() {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            document.getElementById('notification-permission').classList.add('hidden');
        }
    });
}

// Oldal betöltésekor ellenőrizzük az értesítések állapotát
document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== 'granted') {
        document.getElementById('notification-permission').classList.remove('hidden');
    }
});

// Emlékeztető űrlap kezelése
function toggleReminderForm() {
    const form = document.getElementById('reminder-form');
    const btn = document.getElementById('new-reminder-btn');
    const isHidden = form.classList.contains('hidden');
    
    form.classList.toggle('hidden');
    btn.classList.toggle('hidden');
    
    if (!isHidden) {
        form.reset();
    }
}

document.getElementById('new-reminder-btn').addEventListener('click', toggleReminderForm);

document.getElementById('reminder-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const reminder = {
        id: Date.now().toString(),
        title: e.target.title.value,
        description: e.target.description.value,
        datetime: e.target.datetime.value,
        completed: false
    };
    
    state.reminders.push(reminder);
    saveState();
    renderReminders();
    toggleReminderForm();
});

// Jegyzetek űrlap kezelése
document.getElementById('note-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const content = e.target['note-content'].value.trim();
    if (!content) return;
    
    const note = {
        id: Date.now().toString(),
        content,
        createdAt: new Date().toISOString()
    };
    
    state.notes.push(note);
    saveState();
    renderNotes();
    e.target.reset();
});

// Emlékeztetők megjelenítése
function renderReminders() {
    const container = document.getElementById('reminders-list');
    container.innerHTML = '';
    
    state.reminders
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
        .forEach(reminder => {
            const card = document.createElement('div');
            card.className = `card ${reminder.completed ? 'bg-gray-50' : ''}`;
            
            card.innerHTML = `
                <div class="card-header">
                    <div>
                        <h3 class="card-title">${reminder.title}</h3>
                        <p class="card-description">${reminder.description}</p>
                        <p class="card-datetime">${formatDate(reminder.datetime)}</p>
                    </div>
                    <div class="card-actions">
                        ${!reminder.completed ? `
                            <button onclick="completeReminder('${reminder.id}')" class="icon-button complete" title="Elvégezve">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </button>
                        ` : ''}
                        <button onclick="deleteReminder('${reminder.id}')" class="icon-button delete" title="Törlés">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
}

// Jegyzetek megjelenítése
function renderNotes() {
    const container = document.getElementById('notes-list');
    container.innerHTML = '';
    
    state.notes
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .forEach(note => {
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <div class="card-header">
                    <div>
                        <p class="card-description">${note.content}</p>
                        <p class="card-datetime">${formatDate(note.createdAt)}</p>
                    </div>
                    <button onclick="deleteNote('${note.id}')" class="icon-button delete" title="Törlés">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            `;
            
            container.appendChild(card);
        });
}

// Emlékeztető műveletek
function completeReminder(id) {
    const reminder = state.reminders.find(r => r.id === id);
    if (reminder) {
        reminder.completed = true;
        saveState();
        renderReminders();
    }
}

function deleteReminder(id) {
    state.reminders = state.reminders.filter(r => r.id !== id);
    saveState();
    renderReminders();
}

// Jegyzet műveletek
function deleteNote(id) {
    state.notes = state.notes.filter(n => n.id !== id);
    saveState();
    renderNotes();
}

// Segédfüggvények
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('hu-HU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function saveState() {
    localStorage.setItem('reminders', JSON.stringify(state.reminders));
    localStorage.setItem('notes', JSON.stringify(state.notes));
}

// Emlékeztetők ellenőrzése
setInterval(() => {
    const now = new Date();
    state.reminders.forEach(reminder => {
        if (!reminder.completed && new Date(reminder.datetime) <= now) {
            const audio = document.getElementById('notification-sound');
            audio.play().catch(console.error);
            
            if (Notification.permission === 'granted') {
                new Notification('Emlékeztető', {
                    body: reminder.title,
                    requireInteraction: true
                });
            }
            
            completeReminder(reminder.id);
        }
    });
}, 1000);

// Kezdeti renderelés
renderReminders();
renderNotes();