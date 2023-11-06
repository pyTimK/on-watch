// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcRXWudM9af5aKBCOoB8VTMmDzfOXkzv8",
  authDomain: "on-watch.firebaseapp.com",
  projectId: "on-watch",
  storageBucket: "on-watch.appspot.com",
  messagingSenderId: "185886883177",
  appId: "1:185886883177:web:e59b1d08f642a428ead1f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initializeFirestore(app, { localCache: persistentLocalCache(/*settings*/ {}) });

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
