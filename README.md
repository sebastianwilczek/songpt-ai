# songpt-ai
The songpt.ai platform powered by songpt.

<p align="center">
  <img src="https://songpt-ai.web.app/songpt.webp" alt="songpt" height="128"/>
</p>

## What is songpt?

songpt is a Node.js module for generating song suggestions based on text input or other songs. The main module can be found [here](https://github.com/sebastianwilczek/songpt).

This repository contains the source code for the songpt.ai platform. The platform is a web application that allows users to generate song suggestions based on text input. The platform is powered by songpt. You can find a hosted version here: [songpt.ai](https://songpt-ai.web.app).

## How does it work?

The platform consists of a website offering text input, which in turn calls a Google Cloud function that uses songpt to generate song suggestions. The generated songs added to a Spotify playlist, which is then returned to the website, opened in a new tab.
