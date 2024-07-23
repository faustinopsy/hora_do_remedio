export class SpeechManager {
    static speak(message) {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
      } else {
        console.log('Speech synthesis not supported in this browser.');
      }
    }
  
    static announceMedication(name, time) {
      const message = `Agora é a hora do remédio: ${name} e o horario é ${time}`;
      this.speak(message);
    }
  }
  