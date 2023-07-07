import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDNEQVhjJAx1MTo8QfQWnRv5eEXinfYh-s",
  authDomain: "affordable-1a64b.firebaseapp.com",
  projectId: "affordable-1a64b",
  databaseURL: "https://affordable-1a64b-default-rtdb.firebaseio.com",
  storageBucket: "affordable-1a64b.appspot.com",
  messagingSenderId: "30295631686",
  appId: "1:30295631686:web:1b41c8bbf7129933f1a747",
  measurementId: "G-DSWP1NV1HB"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;