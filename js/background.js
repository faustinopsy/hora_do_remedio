chrome.runtime.onInstalled.addListener(() => {
    console.log('Medication Alert Extension Installed');
    chrome.alarms.create('checkMedications', { periodInMinutes: 1 });
  });
  
  chrome.alarms.onAlarm.addListener(alarm => {
    if (alarm.name === 'checkMedications') {
      checkMedications();
    }
  });
  
  function checkMedications() {
    const dbRequest = indexedDB.open('remedioDB', 1);
  
    dbRequest.onsuccess = (event) => {
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
            injectAndSendMessage({
              action: 'speak',
              message: `é hora do remédio: ${med.name} at ${med.time}`
            });
          }
        });
      };
    };
  
    dbRequest.onerror = (event) => {
      console.error('Database error:', event.target.errorCode);
    };
  }
  
  function showNotification(medicationName) {
    chrome.notifications.create('', {
      type: 'basic',
      iconUrl: '/assets/images/icon-192x192.png',
      title: 'Medication Alert',
      message: `é hora do remédio: ${medicationName}`
    }, () => {
      console.log('Notification shown for', medicationName);
    });
  }
  
  function injectAndSendMessage(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            files: ['js/content.js']
          },
          () => {
            chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
              if (chrome.runtime.lastError) {
                console.error('Error sending message to tab:', chrome.runtime.lastError);
              } else {
                console.log('Message sent to tab:', response);
              }
            });
          }
        );
      }
    });
  }
  