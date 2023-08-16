import { generatePlaylistBasedOnKeywords } from "songpt";
import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";
import { logger } from "firebase-functions";

import { SPOTIFY_CREDENTIALS, SPOTIFY_REFRESH_TOKEN, SPOTIFY_USER_ID } from "./constants.js";

initializeApp();

/**
 * Creates a playlist based on the text input input.
 * Calls OpenAI's API to generate a list of songs based on the input,
 * then calls Spotify's API to create a playlist with those songs.
 * @param {Request} req The HTTP request.
 * @param {Response} res The HTTP response.
 */
export const createplaylist = onRequest(async (req, res) => {
    const {
      input,
      openAiApiKey,
    } = req.body;

    if (!input || !openAiApiKey || typeof input !== "string" || typeof openAiApiKey !== "string") {
      res.status(400).send({ error: "Missing input or openAiApiKey" });
      return;
    }

    if (input.length > 100) {
      res.status(400).send({ error: "Input is too long" });
      return;
    }

    if (openAiApiKey.length > 60) {
      res.status(400).send({ error: "openAiApiKey is too long" });
      return;
    }

    try {
      const playlistId = await generatePlaylistBasedOnKeywords(
        openAiApiKey,
        SPOTIFY_CREDENTIALS,
        SPOTIFY_REFRESH_TOKEN,
        SPOTIFY_USER_ID,
        input,
        `A playlist generated with the input "${input}".`,
        input,
      );
      res.status(200).send({ playlistId });
    } catch (e) {
      logger.error(e);
      res.status(500).send({
        error: e.message,
      });
    }

    return;
  });
