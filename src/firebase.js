// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBsJIiXhDIfLnqxBgXjHw1HpbQhOAm1pB0",
  authDomain: "petrolink-venezuela.firebaseapp.com",
  projectId: "petrolink-venezuela",
  storageBucket: "petrolink-venezuela.firebasestorage.app",
  messagingSenderId: "189620197024",
  appId: "1:189620197024:web:3ad202eeba01810dff9bc5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { db, storage, analytics };