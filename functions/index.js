/* eslint-disable max-len */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();


const app = express();

admin.initializeApp();

const baseURL = "https://api.themoviedb.org/3/";

const appCheckVerification = async (req, res, next) => {
  const appCheckToken = req.header("X-Firebase-AppCheck");

  if (!appCheckToken) {
    res.status(401);
    return next("Unauthorized");
  }
  await admin.appCheck().verifyToken(appCheckToken);

  // If verifyToken() succeeds,continue with the next middleware function in the stack
  return next();
};

app.use(cors());
app.use(appCheckVerification);

app.get("/", (req, res) => {
  const category = req.query.category;
  const requests = {
    "trending": `${baseURL}trending/all/week?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
    "top_movies": `${baseURL}movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
    "action_movies": `${baseURL}discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=28`,
    "comedy_movies": `${baseURL}discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=35`,
    "horror_movies": `${baseURL}discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=27`,
    "romance_movies": `${baseURL}discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=10749`,
    "documentaries": `${baseURL}discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=99`,
  };

  axios.get(requests[category]).then((response) => {
    res.json(response.data);
  });
});

app.get("/videos", (req, res) => {
  const mediaType = req.query.media_type;
  const showID = req.query.id;
  const url = `${baseURL}${mediaType}/${showID}/videos?api_key=${process.env.TMDB_API_KEY}`;
  axios.get(url).then((response) => {
    res.json(response.data);
  });
});

exports.app = functions.https.onRequest(app);

