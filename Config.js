// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyBsA1Kp96YqVR7fyFtu-R9-qP_qLSL9Bgk",
  authDomain: "e-commerce-app-23cfb.firebaseapp.com",
  projectId: "e-commerce-app-23cfb",
  storageBucket: "e-commerce-app-23cfb.appspot.com",
  messagingSenderId: "586194843647",
  appId: "1:586194843647:web:05e025c81118380e5059ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);