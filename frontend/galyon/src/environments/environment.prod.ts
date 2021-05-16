import { version } from '../../package.json';

export const environment = {
  production: true,
  appName: 'Galyon',
  appVersion: version,
  baseURL: 'https://api.galyon.app',
  appPrefix: 'galyon_',
  firebase: {
    apiKey: "AIzaSyDBy1btu2_RUN2r4tWTtUY2Zhw4oJsum6E",
    authDomain: "businext-app.firebaseapp.com",
    projectId: "businext-app",
    storageBucket: "businext-app.appspot.com",
    messagingSenderId: "71633264934",
    appId: "1:71633264934:web:97e024337f1a70b4e6e1e7",
    measurementId: "G-X4D1D5TXDX"
  }
};
