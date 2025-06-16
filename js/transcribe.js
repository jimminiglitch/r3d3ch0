function attachTranscription(audio, transcriptUrl) {
  if (!audio || !transcriptUrl) return;
  fetch(transcriptUrl)
    .then((resp) => resp.text())
    .then((text) => {
      const container = document.getElementById('transcript');
      if (!container) return;

      const parseTime = (t) => {
        const [hms, ms] = t.split(',');
        const [h, m, s] = hms.split(':').map(Number);
        return h * 3600 + m * 60 + parseFloat(s) + (ms ? parseInt(ms, 10) / 1000 : 0);
      };

      const captions = [];
      const blocks = text.trim().split(/\n\n+/);
      for (const block of blocks) {
        const lines = block.split(/\n+/);
        if (lines.length >= 3) {
          const times = lines[1].split('-->');
          const start = parseTime(times[0].trim());
          const end = parseTime(times[1].trim());
          const captionText = lines.slice(2).join(' ');
          captions.push({ start, end, text: captionText });
        }
      }

      let active = -1;

      const update = () => {
        const t = audio.currentTime;
        let found = false;
        for (let i = 0; i < captions.length; i++) {
          const c = captions[i];
          if (t >= c.start && t <= c.end) {
            if (i !== active) {
              container.textContent = '';
              active = i;
            }
            const progress = (t - c.start) / (c.end - c.start);
            const len = Math.floor(progress * c.text.length);
            container.textContent = c.text.slice(0, len);
            found = true;
            break;
          }
        }

        if (!found && active !== -1) {
          container.textContent = '';
          active = -1;
        }
      };

      audio.addEventListener('timeupdate', update);
      audio.addEventListener('seeked', update);
      update();
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
