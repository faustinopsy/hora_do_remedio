chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'speak') {
      speak(request.message);
      sendResponse({status: 'completed'});
    }
  });
  
  function speak(message) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Speech synthesis not supported in this browser.');
    }
  }
  