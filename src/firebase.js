import firebase from 'firebase';
import "firebase/auth";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBW5desyyoXAUYgr4l-2ltOx_fjmzK1TT0",
    authDomain: "mirrage-5c119.firebaseapp.com",
    databaseURL: "https://mirrage-5c119.firebaseio.com",
    projectId: "mirrage-5c119",
    storageBucket: "mirrage-5c119.appspot.com",
    messagingSenderId: "193019358101",
    appId: "1:193019358101:web:25f018afc735907492a49c",
    measurementId: "G-76PFTMHBD3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export const auth = firebase.auth();
  export const db = firebase.firestore();
  export const rdb = firebase.database();

  export default firebase;