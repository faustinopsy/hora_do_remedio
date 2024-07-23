self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  event.waitUntil(self.clients.claim().then(() => {
    initializeBackgroundCheck();
  }));
});

function initializeBackgroundCheck() {
  setInterval(checkMedications, 60000); // Verifica os medicamentos a cada minuto
}

async function checkMedications() {
  const dbPromise = indexedDB.open('remedioDB', 1);

  dbPromise.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(['remedios'], 'readonly');
    const store = transaction.objectStore('remedios');
    const request = store.getAll();

    request.onsuccess = (event) => {
      const medications = event.target.result;
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      medications.forEach((med) => {
        if (med.time === currentTime) {
          showNotification(med.name);
          speak(`é hora do remédio: ${med.name} at ${med.time}`)
        }
      });
    };
  };

  dbPromise.onerror = (event) => {
    console.error('Database error:', event.target.errorCode);
  };
}

function showNotification(medicationName) {
  self.registration.showNotification('Medication Alert', {
    body: `É hora do remédio: ${medicationName}`,
    icon: '/assets/images/icon-192x192.png'
  });
}
function speak(message) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  } else {
    console.log('Speech synthesis not supported in this browser.');
  }
}