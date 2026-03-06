// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyzY3STnLk6NzHiG-nEmhqQmY-2Sc78tA",
  authDomain: "pulseiq-16cf9.firebaseapp.com",
  projectId: "pulseiq-16cf9",
  storageBucket: "pulseiq-16cf9.firebasestorage.app",
  messagingSenderId: "1050267255447",
  appId: "1:1050267255447:web:7e16dffbfa55b51e5f9fd2",
  measurementId: "G-MWD6VRQKYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
export const db = getFirestore(app);