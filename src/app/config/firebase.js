// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBU3FC5e8Nteij1irZgizgXFHBb0FNTkic",
  authDomain: "project-management-7fb58.firebaseapp.com",
  projectId: "project-management-7fb58",
  storageBucket: "project-management-7fb58.appspot.com",
  messagingSenderId: "865739830563",
  appId: "1:865739830563:web:87be9f23fa1e7042bc8896",
  measurementId: "G-59SVLE91C4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

