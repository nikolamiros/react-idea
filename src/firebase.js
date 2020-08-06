import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBBxv0Gy3qWgxYf8u4m27OegdCc4ta2uTA',
  authDomain: 'react-idea-8ac5d.firebaseapp.com',
  databaseURL: 'https://react-idea-8ac5d.firebaseio.com',
  projectId: 'react-idea-8ac5d',
  storageBucket: 'react-idea-8ac5d.appspot.com',
  messagingSenderId: '252650190894',
  appId: '1:252650190894:web:1cc50ffc2b4f855a7087bf',
  measurementId: 'G-1ZMKD0NP53',
});

const db = firebaseApp.firestore();

export default db;
