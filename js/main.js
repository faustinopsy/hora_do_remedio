import { RemedioController } from './controllers/RemedioController.js';
import { NotificationManager } from './managers/NotificationManager.js';

document.addEventListener('DOMContentLoaded', () => {
  new NotificationManager();
  new RemedioController();
});
