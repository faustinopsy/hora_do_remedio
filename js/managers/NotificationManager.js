export class NotificationManager {
  constructor() {
    this.registerServiceWorker();
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/serviceWorker.js', { scope: '/' })
        .then(reg => {
          console.log('Service Worker registered!', reg);

          if (Notification.permission !== 'granted') {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                console.log('Notification permission granted.');
              } else {
                console.log('Notification permission denied.');
              }
            });
          }
        })
        .catch(err => console.log('Service Worker registration failed: ', err));
    }
  }

  static showNotification(nomeRemedio) {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg) {
          console.log('Showing notification for:', nomeRemedio);
          reg.showNotification('Remedios Alert', {
            body: `É hora do remédio: ${nomeRemedio}`,
            icon: '/assets/images/icon-192x192.png'
          });
        } else {
          console.log('Service Worker registration not found.');
        }
      }).catch(err => {
        console.error('Error getting Service Worker registration:', err);
      });
    } else {
      console.log('Notification permission not granted.');
    }
  }

}
