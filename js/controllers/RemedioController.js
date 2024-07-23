import { Database } from '../models/Database.js';
import { Remedios } from '../models/Remedios.js';
import { RemedioView } from '../views/RemedioView.js';
import { NotificationManager } from '../managers/NotificationManager.js';
import { SpeechManager } from '../managers/SpeechManager.js';

export class RemedioController {
  constructor() {
    this.database = new Database();
    this.view = new RemedioView(this);
    this.loadRemedios();
    this.checkRemedios();
  }

  async addRemedios(name, time) {
    const remedios = new Remedios(name, time);
    await this.database.addRemedios(remedios);
    this.loadRemedios();
  }

  async loadRemedios() {
    const remedios = await this.database.getRemedios();
    this.view.renderRemedios(remedios);
  }

  async removeRemedios(id) {
    await this.database.deleteRemedios(id);
    this.loadRemedios();
  }

  async checkRemedios() {
    const remedios = await this.database.getRemedios();
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    remedios.forEach((med) => {
      if (med.time === currentTime) {
        NotificationManager.showNotification(med.name);
        SpeechManager.announceMedication(med.name, med.time);
      }
    });

    setTimeout(() => this.checkRemedios(), 60000); 
  }
}
