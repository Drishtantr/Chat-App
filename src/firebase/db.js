import * as firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAULFPRX3zcuKrL7yZe16CmlKoxQturaKQ",
    authDomain: "chat-app-5b9cd.firebaseapp.com",
    databaseURL: "https://chat-app-5b9cd.firebaseio.com",
    projectId: "chat-app-5b9cd",
    storageBucket: "chat-app-5b9cd.appspot.com",
    messagingSenderId: "111623630453",
    appId: "1:111623630453:web:cb358a941906f8007c523c",
    measurementId: "G-GG6Z4ZHX8F"
};

// Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig).firestore();
export default 0;
// firebase.analytics();
