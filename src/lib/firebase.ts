
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC6m3N8EhBCXFNBLtdIBjJMF7tWNdrFAlA",
  authDomain: "tts-app-95f47.firebaseapp.com",
  projectId: "tts-app-95f47",
  storageBucket: "tts-app-95f47.firebasestorage.app",
  messagingSenderId: "461352706866",
  appId: "1:461352706866:web:7fd238a136de95fc332d2b",
  measurementId: "G-FLC9LGK7S0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
