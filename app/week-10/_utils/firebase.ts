import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS7M259GyQseZ9w2jNyTc3wuvQUynS1q4",
  authDomain: "cprg306-assignments-9264d.firebaseapp.com",
  projectId: "cprg306-assignments-9264d",
  storageBucket: "cprg306-assignments-9264d.firebasestorage.app",
  messagingSenderId: "223262171742",
  appId: "1:223262171742:web:24a1b6952c202289130acf",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);