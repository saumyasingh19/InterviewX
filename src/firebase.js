import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAddWA9ljdJPEl9NZ_Xqj8vDS3wF1W7_20",
  authDomain: "interviewx-a14ac.firebaseapp.com",
  projectId: "interviewx-a14ac",
  storageBucket: "interviewx-a14ac.firebasestorage.app",
  messagingSenderId: "494103891504",
  appId: "1:494103891504:web:f7991c22af92418c9727f5",
  measurementId: "G-HF0YR2BVC3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);