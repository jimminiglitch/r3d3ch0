# Red Echo

This repository contains the static assets for the **Red Echo** interactive narrative.
All of the HTML, CSS and JavaScript lives at the repository root so it can be
served directly by [GitHub Pages](https://pages.github.com/).

Open `index.html` in your browser or enable GitHub Pages for this repository and
point it at the `main` branch to see the site online.

A small Fastify server (`app/server.js`) is included for local development. Run
`npm install` inside the `app` directory and then `npm start` to serve the
files locally.

## Voice Cloning

To generate new narration in the same voice as the original audio, a small Python helper script is provided in `scripts/voice_clone.py`. The script relies on the [Coqui TTS](https://github.com/coqui-ai/TTS) library and its XTTS speaker-adaptive model.

### Installation

Install the required Python package:

```bash
pip install TTS
```

### Usage

Provide a short reference clip of the narrator (a WAV file) and the text you want spoken:

```bash
python scripts/voice_clone.py --reference narrator_sample.wav --text "Your text here" --output new_clip.wav
```

The generated audio will be saved to `new_clip.wav`.
