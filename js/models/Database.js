export class Database {
    constructor() {
      this.dbName = 'remedioDB';
      this.dbVersion = 1;
      this.db = null;
    }
  
    async open() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.dbVersion);
  
        request.onupgradeneeded = (event) => {
          this.db = event.target.result;
          if (!this.db.objectStoreNames.contains('remedios')) {
            this.db.createObjectStore('remedios', { keyPath: 'id', autoIncrement: true });
          }
        };
  
        request.onsuccess = (event) => {
          this.db = event.target.result;
          resolve(this.db);
        };
  
        request.onerror = (event) => {
          reject('Database error: ' + event.target.errorCode);
        };
      });
    }
  
    async addRemedios(remedios) {
      const db = await this.open();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(['remedios'], 'readwrite');
        const store = transaction.objectStore('remedios');
        const request = store.add(remedios);
  
        request.onsuccess = () => resolve();
        request.onerror = (event) => reject('Add medication error: ' + event.target.errorCode);
      });
    }
  
    async getRemedios() {
      const db = await this.open();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(['remedios'], 'readonly');
        const store = transaction.objectStore('remedios');
        const request = store.getAll();
  
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject('Get medications error: ' + event.target.errorCode);
      });
    }

    async deleteRemedios(id) {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const transaction = db.transaction(['remedios'], 'readwrite');
          const store = transaction.objectStore('remedios');
          const request = store.delete(id);
    
          request.onsuccess = () => resolve();
          request.onerror = (event) => reject('Delete remedios error: ' + event.target.errorCode);
        });
      }
  }
  