export class RemedioView {
  constructor(controller) {
    this.controller = controller;
    this.app = document.getElementById('app');
    this.app.innerHTML = this.getTemplate();
    this.form = this.app.querySelector('#medication-form');
    this.nameInput = this.app.querySelector('#nome');
    this.timeInput = this.app.querySelector('#time');

    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.controller.addRemedios(this.nameInput.value, this.timeInput.value);
    });
  }

  getTemplate() {
    return `
      <div class="container">
        <h1>Remédios X</h1>
        <form id="medication-form" class="form">
          <div class="input-field">
            <input type="text" id="nome" placeholder required>
            <label for="nome">Remédio:</label>
          </div>
          <div class="input-field">
            <input type="time" id="time" placeholder required>
            <label for="time">Hora (HH:MM):</label>
          </div>
          <button type="submit" class="btn">Novo Horario</button>
        </form>
        <ul id="medication-list" class="medication-list"></ul>
      </div>
    `;
  }

  renderRemedios(remedios) {
    const list = this.app.querySelector('#medication-list');
    list.innerHTML = '';
    remedios.forEach((med) => {
      const listItem = document.createElement('li');
      listItem.className = 'medication-item';
      listItem.innerHTML = `
        <div class="medication-info">
          <span class="medication-name">${med.name}</span>
          <span class="medication-time">${med.time}</span>
        </div>
        <button class="delete-btn" data-id="${med.id}"> Excluir</button>
      `;
      listItem.querySelector('.delete-btn').addEventListener('click', () => this.controller.removeRemedios(med.id));
      list.appendChild(listItem);
    });
  }
}
