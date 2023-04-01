import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {initializeApp} from 'firebase/app';
import {initializeAppCheck, ReCaptchaV3Provider, getToken} from 'firebase/app-check';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID 
};

const app = initializeApp(firebaseConfig);

const appCheck = initializeAppCheck(
  app,
    {provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true}
);

const url = `https://us-central1-${firebaseConfig.projectId}.cloudfunctions.net/app`;

export const fetchRandomShow = async(setShow) => {
  let appCheckTokenResponse;
  try {
    appCheckTokenResponse = await getToken(appCheck, /* forceRefresh=*/ false);
  } catch (err) {
    return;
  }

  const options = {
    method: 'GET',
    url: url,
    params: {category: 'trending'},
    headers: {
        'X-Firebase-AppCheck': appCheckTokenResponse.token,
    }
};

axios.request(options)
    .then((list) => {
        setShow(list.data.results[Math.floor(Math.random() * list.data.results.length)]);
    });
};

export const fetchShows = async(setShows, category) => {
  let appCheckTokenResponse;
  try {
    appCheckTokenResponse = await getToken(appCheck, /* forceRefresh=*/ false);
  } catch (err) {
    return;
  }

  const options = {
    method: 'GET',
    url: url,
    params: {category: category},
    headers: {
      'X-Firebase-AppCheck': appCheckTokenResponse.token,
  }
};
axios.request(options)
    .then((list) => {
        setShows(list.data.results);
    });
};

export const fetchVideo = async(show, setTrailerUrl) => {
  let appCheckTokenResponse;
  try {
    appCheckTokenResponse = await getToken(appCheck, /* forceRefresh=*/ false);
  } catch (err) {
    return;
  }
  const mediaType = (show?.hasOwnProperty('release_date')) ? "movie": "tv";
  const options = {
      method: 'GET',
      url: url + '/videos',
      params: {media_type: mediaType, id: show?.id},
      headers: {
        'X-Firebase-AppCheck': appCheckTokenResponse.token,
    }
  };

  axios.request(options)
    .then((video) => {
        const videos = video.data.results;
        const url = videos[videos.length-1].key;
        setTrailerUrl(url);
    })
    .catch((error) => console.log(error));
};



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
