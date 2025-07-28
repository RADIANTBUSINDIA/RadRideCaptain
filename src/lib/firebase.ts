
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    projectId: "radcaptian",
    appId: "1:412648933770:web:f59b280266644c705e6073",
    storageBucket: "radcaptian.firebasestorage.app",
    apiKey: "AIzaSyDQ9vv9b6cua7UmPmEh9xXVl-LYbT6I6X4",
    authDomain: "radcaptian.firebaseapp.com",
    measurementId: "",
    messagingSenderId: "412648933770",
    databaseURL: "https://radcaptian-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

export { app, database };
