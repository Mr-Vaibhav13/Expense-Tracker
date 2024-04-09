import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDxA8FOvY8oF7X22RTK58H3PyV6pvWCrD4",
  authDomain: "react---expense-tracker-app.firebaseapp.com",
  projectId: "react---expense-tracker-app",
  storageBucket: "react---expense-tracker-app.appspot.com",
  messagingSenderId: "443343698246",
  appId: "1:443343698246:web:ec45f86bc62a87a1af4d47",
  measurementId: "G-4TW2V5LHFL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider()
export const db = getFirestore(app)