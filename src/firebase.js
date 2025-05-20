// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5f_6HsBwItpBmwBuhBiHw32Zxoli8qkc",
  authDomain: "dbi-2025.firebaseapp.com",
  projectId: "dbi-2025",
  storageBucket: "dbi-2025.firebasestorage.app",
  messagingSenderId: "132766601363",
  appId: "1:132766601363:web:7ff2a996f4366d1ef17d66",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db };
