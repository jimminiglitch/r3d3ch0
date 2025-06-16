const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  let finalTranscript = '';

  recognition.onresult = (event) => {
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const text = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += text + ' ';
      } else {
        interim += text;
      }
    }
    const container = document.getElementById('transcript');
    if (container) {
      container.textContent = finalTranscript + interim;
    }
  };

  const attach = (audio) => {
    if (!audio) return;
    audio.addEventListener('play', () => recognition.start());
    audio.addEventListener('pause', () => recognition.stop());
    audio.addEventListener('ended', () => recognition.stop());
  };

  window.attachTranscription = attach;
} else {
  window.attachTranscription = () => {
    console.warn('Speech recognition not supported');
  };
}
