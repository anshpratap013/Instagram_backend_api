import firebase from 'firebase';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDSQFxigvmoBhwGkH2cTmRQcg1kzTba3AI",
    authDomain: "instagram-clone-8e2dc.firebaseapp.com",
    databaseURL: "https://instagram-clone-8e2dc-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-8e2dc",
    storageBucket: "instagram-clone-8e2dc.appspot.com",
    messagingSenderId: "1089877709260",
    appId: "1:1089877709260:web:7785c5792681943bf34d69",
    measurementId: "G-XW6KCK45VF"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db,auth,storage };
