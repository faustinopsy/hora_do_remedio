# Medication Alert

Medication Alert é uma aplicação web que ajuda os usuários a lembrar de tomar seus medicamentos em horários programados. A aplicação utiliza notificações de navegador para alertar o usuário, mesmo quando a página não está aberta.

## Propósito

O propósito desta aplicação é fornecer uma solução simples e eficaz para gerenciar lembretes de medicação. Muitas pessoas têm dificuldade em lembrar de tomar seus medicamentos nos horários corretos, e esta aplicação visa resolver esse problema com notificações pontuais.

## Funcionalidades

- Adicionar e gerenciar medicamentos com horários específicos.
- Receber notificações no navegador para lembrar de tomar os medicamentos.
- Funciona em segundo plano, mesmo quando a página não está aberta, utilizando Service Workers.
- Armazenamento de dados no IndexedDB para persistência local.

## Tecnologias Utilizadas

- **HTML/CSS/JavaScript**: Estrutura básica da aplicação.
- **IndexedDB**: Banco de dados local no navegador para armazenar os medicamentos.
- **Service Workers**: Permite que a aplicação funcione em segundo plano e envie notificações.
- **Notification API**: Envia notificações para o usuário.
- **Periodic Background Sync (Experimental)**: Verifica periodicamente os lembretes de medicação (Nota: esta API ainda está em fase experimental e pode não ser suportada em todos os navegadores).

## Estrutura de Pastas

```plaintext
/hora_do_remedio
│
├── /assets
│   ├── /css
│   └── /images
│
├── /js
│   ├── /controllers
│   │   └── RemedioController.js
│   ├── /managers
│   │   └── NotificationManager.js
│   │   └── SpeechManager.js
│   ├── /models
│   │   ├── Database.js
│   │   └── Remedios.js
│   ├── /views
│   │   └── RemedioView.js
│   ├── main.js
│   └── serviceWorker.js
│
├── index.html
└── manifest.json


```
## Como Executar
Clone o repositório:
```
git clone https://github.com/faustinopsy/hora_do_remedio.git
cd hora_do_remedio
```
## Notas
A API de Periodic Background Sync é experimental e pode não funcionar em todos os navegadores. Certifique-se de habilitar chrome://flags/#enable-experimental-web-platform-features no Chrome para testar.
A aplicação deve estar servida por um servidor web ou live serve para que os Service Worker funcione corretamente. Não abrir diretamente via file://.
