function attachTranscription(audio, transcriptUrl) {
  if (!audio || !transcriptUrl) return;
  fetch(transcriptUrl)
    .then((resp) => resp.text())
    .then((text) => {
      const container = document.getElementById('transcript');
      if (!container) return;
      let index = 0;
      let timer;
      const type = () => {
        if (index <= text.length) {
          container.textContent = text.slice(0, index);
          index += 1;
        } else {
          clearInterval(timer);
        }
      };
      audio.addEventListener('play', () => {
        timer = setInterval(type, 50);
      });
      const stop = () => clearInterval(timer);
      audio.addEventListener('pause', stop);
      audio.addEventListener('ended', stop);
    })
    .catch((err) => {
      const container = document.getElementById('transcript');
      if (container) {
        container.textContent = 'Transcript unavailable';
      }
      console.error('Failed to load transcript:', err);
    });
}
window.attachTranscription = attachTranscription;
