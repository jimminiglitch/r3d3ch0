# Red Echo

This repository contains the static assets for the **Red Echo** interactive narrative.
All of the HTML, CSS and JavaScript lives at the repository root so it can be
served directly by [GitHub Pages](https://pages.github.com/).

Open `index.html` in your browser or enable GitHub Pages for this repository and
point it at the `main` branch to see the site online.

A small Fastify server (`app/server.js`) is included for local development. Run
`npm install` inside the `app` directory and then `npm start` to serve the
files locally.

An experimental page `3drave.html` is included for exploring the world in 3D.
It uses the [A-Frame](https://aframe.io/) library with ambient audio. Run the
server and visit `/3drave` or open the file directly in your browser.
