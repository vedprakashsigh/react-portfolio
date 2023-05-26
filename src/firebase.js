import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg5sHrpaNWJrDxzYR_oOQyf28aFzTV0Tk",
  authDomain: "protfolio-projects-80a75.firebaseapp.com",
  projectId: "protfolio-projects-80a75",
  storageBucket: "protfolio-projects-80a75.appspot.com",
  messagingSenderId: "688651666959",
  appId: "1:688651666959:web:1fcc8d3953b5c39a9b457a",
  measurementId: "G-5D0XL440SL",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore(app);

export const signInWithGoogle = () => signInWithPopup(auth, provider);
