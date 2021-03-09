import * as firebase from 'firebase/app';
import 'firebase/firestore';

const {
  VUE_APP_DB_API_KEY,
  VUE_APP_AUTH_DOMAIN,
  VUE_APP_DB_URL,
  VUE_APP_PROJECT,
  VUE_APP_STORAGE,
  VUE_APP_MESSAGING_SENDER,
  VUE_APP_APP_ID,
  VUE_APP_SENDER_ID,
} = process.env;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VUE_APP_DB_API_KEY,
  authDomain: VUE_APP_AUTH_DOMAIN,
  databaseURL: VUE_APP_DB_URL,
  projectId: VUE_APP_PROJECT,
  storageBucket: VUE_APP_STORAGE,
  messagingSenderId: VUE_APP_MESSAGING_SENDER,
  appId: VUE_APP_APP_ID,
  measurementId: VUE_APP_SENDER_ID,
};

// Initialize Firebase
export const db = firebase.initializeApp(firebaseConfig).firestore();
export default 0;
// firebase.analytics();
